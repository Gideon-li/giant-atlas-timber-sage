import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { getTrainedWeather, serializeWeights } from "@/lib/qimen/weather-model";
import { ADMIN_PHONES, isAdminIdentity } from "@/lib/admin-ids";

export type Profile = { userId: string; role: "admin" | "user"; email: string; name: string };

async function loadAuthUser(userId: string) {
  const sql = await getSql();
  const rows = await sql<{ id: string; email: string; name: string }>`
    select id, email, name from "user" where id = ${userId}
  `;
  return rows[0] ?? { id: userId, email: "", name: "" };
}

async function bootstrapProfile(userId: string): Promise<Profile> {
  const sql = await getSql();
  const authUser = await loadAuthUser(userId);
  const shouldAdmin = isAdminIdentity(authUser.email, authUser.name);
  const existing = await sql<{ user_id: string; role: string }>`
    select user_id, role from app_profiles where user_id = ${userId}
  `;
  if (shouldAdmin) {
    if (existing[0]) {
      if (existing[0].role !== "admin") {
        await sql`update app_profiles set role = 'admin', updated_at = now() where user_id = ${userId}`;
      }
    } else {
      await sql`insert into app_profiles (user_id, role) values (${userId}, 'admin') on conflict (user_id) do update set role = 'admin'`;
    }
    const others = await sql<{ id: string; email: string; name: string }>`select id, email, name from "user"`;
    for (const u of others) {
      if (u.id === userId) continue;
      if (isAdminIdentity(u.email, u.name)) continue;
      await deleteUserRow(sql, u.id);
    }
    return { userId, role: "admin", email: authUser.email, name: authUser.name };
  }
  if (existing[0]) {
    return {
      userId,
      role: existing[0].role === "admin" ? "admin" : "user",
      email: authUser.email,
      name: authUser.name,
    };
  }
  const admins = await sql<{ n: number }>`select count(*)::int as n from app_profiles where role = 'admin'`;
  const role = (admins[0]?.n ?? 0) === 0 ? "admin" : "user";
  await sql`insert into app_profiles (user_id, role) values (${userId}, ${role}) on conflict (user_id) do nothing`;
  return { userId, role, email: authUser.email, name: authUser.name };
}

async function requireAdmin(userId: string) {
  const p = await bootstrapProfile(userId);
  if (p.role !== "admin") {
    const err = new Error("Forbidden");
    (err as Error & { status: number }).status = 403;
    throw err;
  }
  return p;
}

export const ensureProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => bootstrapProfile(context.userId));

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => bootstrapProfile(context.userId));

export type FeedbackInput = {
  civilTime: string;
  juLabel: string;
  eventId: string;
  eventName: string;
  predictedScore: number;
  predictedLevel: string;
  predictedProb: number;
  accuracy: string;
  realizedLuck: string;
  happened: string;
  note: string;
  province: string;
  city: string;
  district: string;
  casting: string;
  chartSnapshot: string;
};

export const submitFeedback = createServerFn({ method: "POST" })
  .validator((d: FeedbackInput) => d)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await bootstrapProfile(context.userId);
    const note = data.note.slice(0, 2000);
    await sql`
      insert into prediction_feedback (
        user_id, civil_time, ju_label, event_id, event_name,
        predicted_score, predicted_level, predicted_prob,
        accuracy, realized_luck, happened, note,
        province, city, district, casting, chart_snapshot
      ) values (
        ${context.userId}, ${data.civilTime}, ${data.juLabel}, ${data.eventId}, ${data.eventName},
        ${data.predictedScore}, ${data.predictedLevel}, ${data.predictedProb},
        ${data.accuracy}, ${data.realizedLuck}, ${data.happened}, ${note},
        ${data.province}, ${data.city}, ${data.district}, ${data.casting}, ${data.chartSnapshot}
      )
    `;
    return { ok: true };
  });

export type FeedbackRow = {
  id: number;
  user_id: string;
  created_at: string;
  civil_time: string;
  ju_label: string;
  event_id: string;
  event_name: string;
  predicted_score: number;
  predicted_level: string;
  predicted_prob: number;
  accuracy: string;
  realized_luck: string;
  happened: string;
  note: string;
  province: string;
  city: string;
  district: string;
  casting: string;
};

export const listMyFeedback = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<FeedbackRow>`
      select id, user_id, created_at::text as created_at, civil_time, ju_label, event_id, event_name,
        predicted_score, predicted_level, predicted_prob, accuracy, realized_luck, happened, note,
        province, city, district, casting
      from prediction_feedback
      where user_id = ${context.userId}
      order by id desc
      limit 100
    `;
  });

export const adminListFeedback = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    return sql<FeedbackRow>`
      select id, user_id, created_at::text as created_at, civil_time, ju_label, event_id, event_name,
        predicted_score, predicted_level, predicted_prob, accuracy, realized_luck, happened, note,
        province, city, district, casting
      from prediction_feedback
      order by id desc
      limit 2000
    `;
  });

export type AccountRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export const adminListAccounts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      name: string;
      email: string;
      createdAt: string;
      role: string | null;
    }>`
      select u.id, u.name, u.email, u."createdAt"::text as "createdAt",
        coalesce(p.role, 'user') as role
      from "user" u
      left join app_profiles p on p.user_id = u.id
      order by u."createdAt" asc
    `;
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      role: isAdminIdentity(r.email, r.name) ? "admin" : (r.role ?? "user"),
      createdAt: r.createdAt,
    }));
  });

async function deleteUserRow(sql: Awaited<ReturnType<typeof getSql>>, id: string) {
  await sql`delete from prediction_feedback where user_id = ${id}`;
  await sql`delete from weather_model_runs where user_id = ${id}`;
  await sql`delete from app_profiles where user_id = ${id}`;
  await sql`delete from "user" where id = ${id}`;
}

export const adminDeleteAccount = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .middleware([authMiddleware])
  .handler(async ({ context, data: id }) => {
    await requireAdmin(context.userId);
    if (id === context.userId) throw new Error("不能删除当前登录账号");
    const sql = await getSql();
    const target = await sql<{ email: string; name: string }>`
      select email, name from "user" where id = ${id}
    `;
    if (target[0] && isAdminIdentity(target[0].email, target[0].name)) {
      throw new Error("不能删除指定管理员手机号账号");
    }
    await deleteUserRow(sql, id);
    return { ok: true };
  });

export const adminPurgeOtherAccounts = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const users = await sql<{ id: string; email: string; name: string }>`
      select id, email, name from "user"
    `;
    let removed = 0;
    for (const u of users) {
      if (u.id === context.userId) continue;
      if (isAdminIdentity(u.email, u.name)) continue;
      await deleteUserRow(sql, u.id);
      removed += 1;
    }
    return { ok: true, removed, keptPhone: ADMIN_PHONES[0] };
  });

export const runWeatherTraining = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const report = getTrainedWeather(true);
    const weights = JSON.stringify(serializeWeights(report));
    const sql = await getSql();
    await sql`
      insert into weather_model_runs (
        user_id, n_days, train_end, test_start,
        daily_acc, xun_acc, daily_acc_test, xun_acc_test, epochs, notes, weights_json
      ) values (
        ${context.userId}, ${report.n}, ${report.samples[report.trainN - 1]?.date ?? ""},
        ${report.samples[report.trainN]?.date ?? ""},
        ${report.dailyAccTrain}, ${report.xunAccTrain}, ${report.dailyAccTest}, ${report.xunAccTest},
        ${report.epochs}, ${report.notes.join(" ")}, ${weights}
      )
    `;
    return {
      n: report.n,
      trainN: report.trainN,
      testN: report.testN,
      dailyAccTrain: report.dailyAccTrain,
      dailyAccTest: report.dailyAccTest,
      rainAccTrain: report.rainAccTrain,
      rainAccTest: report.rainAccTest,
      xunAccTrain: report.xunAccTrain,
      xunAccTest: report.xunAccTest,
      epochs: report.epochs,
      reachedXun90: report.reachedXun90,
      notes: report.notes,
      confusion: report.confusion,
      weights,
    };
  });

export const getWeatherMetrics = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const report = getTrainedWeather();
    return {
      n: report.n,
      trainN: report.trainN,
      testN: report.testN,
      dailyAccTrain: report.dailyAccTrain,
      dailyAccTest: report.dailyAccTest,
      rainAccTrain: report.rainAccTrain,
      rainAccTest: report.rainAccTest,
      xunAccTrain: report.xunAccTrain,
      xunAccTest: report.xunAccTest,
      epochs: report.epochs,
      reachedXun90: report.reachedXun90,
      notes: report.notes,
      confusion: report.confusion,
      weights: JSON.stringify(serializeWeights(report)),
    };
  });
