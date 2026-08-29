import { r as createServerFn } from "./ssr.mjs";
import { L as getTrainedWeather, P as authMiddleware, R as listRegionMetrics, V as serializeWeights } from "./weather-model-DSA3cxeb.mjs";
import { n as isAdminIdentity, t as ADMIN_PHONES } from "./admin-ids-Dastpfcy.mjs";
import { r as getSql } from "./db-dqju8xX7.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-BnLnMdeB.js
async function loadAuthUser(userId) {
	return (await (await getSql())`
    select id, email, name from "user" where id = ${userId}
  `)[0] ?? {
		id: userId,
		email: "",
		name: ""
	};
}
async function bootstrapProfile(userId) {
	const sql = await getSql();
	const authUser = await loadAuthUser(userId);
	const shouldAdmin = isAdminIdentity(authUser.email, authUser.name);
	const existing = await sql`
    select user_id, role from app_profiles where user_id = ${userId}
  `;
	if (shouldAdmin) {
		if (existing[0]) {
			if (existing[0].role !== "admin") await sql`update app_profiles set role = 'admin', updated_at = now() where user_id = ${userId}`;
		} else await sql`insert into app_profiles (user_id, role) values (${userId}, 'admin') on conflict (user_id) do update set role = 'admin'`;
		const others = await sql`select id, email, name from "user"`;
		for (const u of others) {
			if (u.id === userId) continue;
			if (isAdminIdentity(u.email, u.name)) continue;
			await deleteUserRow(sql, u.id);
		}
		return {
			userId,
			role: "admin",
			email: authUser.email,
			name: authUser.name
		};
	}
	if (existing[0]) return {
		userId,
		role: existing[0].role === "admin" ? "admin" : "user",
		email: authUser.email,
		name: authUser.name
	};
	const role = ((await sql`select count(*)::int as n from app_profiles where role = 'admin'`)[0]?.n ?? 0) === 0 ? "admin" : "user";
	await sql`insert into app_profiles (user_id, role) values (${userId}, ${role}) on conflict (user_id) do nothing`;
	return {
		userId,
		role,
		email: authUser.email,
		name: authUser.name
	};
}
async function requireAdmin(userId) {
	const p = await bootstrapProfile(userId);
	if (p.role !== "admin") {
		const err = /* @__PURE__ */ new Error("Forbidden");
		err.status = 403;
		throw err;
	}
	return p;
}
var ensureProfile_createServerFn_handler = createServerRpc({
	id: "a0ec1d1bdda5c62a5dfd022570f55048695026105150e1c3748156982a5197da",
	name: "ensureProfile",
	filename: "src/lib/server/app.ts"
}, (opts) => ensureProfile.__executeServer(opts));
var ensureProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(ensureProfile_createServerFn_handler, async ({ context }) => bootstrapProfile(context.userId));
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "19a93ccf262792baf4150111740d53b39c754c0d756bddfc22f13361cf8b5b79",
	name: "getMyProfile",
	filename: "src/lib/server/app.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => bootstrapProfile(context.userId));
var submitFeedback_createServerFn_handler = createServerRpc({
	id: "df8dcfcb2cfb379e1270462e650c62ce1e5bba75977b5927c46de2df369caa6e",
	name: "submitFeedback",
	filename: "src/lib/server/app.ts"
}, (opts) => submitFeedback.__executeServer(opts));
var submitFeedback = createServerFn({ method: "POST" }).validator((d) => d).middleware([authMiddleware]).handler(submitFeedback_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await bootstrapProfile(context.userId);
	const note = data.note.slice(0, 2e3);
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
var listMyFeedback_createServerFn_handler = createServerRpc({
	id: "bb88af8b2b58383634fe504efc9d5d8fd1873b87bc25554092364a7568e60f56",
	name: "listMyFeedback",
	filename: "src/lib/server/app.ts"
}, (opts) => listMyFeedback.__executeServer(opts));
var listMyFeedback = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyFeedback_createServerFn_handler, async ({ context }) => {
	return (await getSql())`
      select id, user_id, created_at::text as created_at, civil_time, ju_label, event_id, event_name,
        predicted_score, predicted_level, predicted_prob, accuracy, realized_luck, happened, note,
        province, city, district, casting
      from prediction_feedback
      where user_id = ${context.userId}
      order by id desc
      limit 100
    `;
});
var adminListFeedback_createServerFn_handler = createServerRpc({
	id: "b72261f7753148deed9c77e5c07e7381dd38592370589574eccdf5cdec3a0687",
	name: "adminListFeedback",
	filename: "src/lib/server/app.ts"
}, (opts) => adminListFeedback.__executeServer(opts));
var adminListFeedback = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListFeedback_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await getSql())`
      select id, user_id, created_at::text as created_at, civil_time, ju_label, event_id, event_name,
        predicted_score, predicted_level, predicted_prob, accuracy, realized_luck, happened, note,
        province, city, district, casting
      from prediction_feedback
      order by id desc
      limit 2000
    `;
});
var adminListAccounts_createServerFn_handler = createServerRpc({
	id: "69f99ee1172c0d5656b62ff61183be10dab05cac3657e9c37924f479e1a19c4a",
	name: "adminListAccounts",
	filename: "src/lib/server/app.ts"
}, (opts) => adminListAccounts.__executeServer(opts));
var adminListAccounts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminListAccounts_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	return (await (await getSql())`
      select u.id, u.name, u.email, u."createdAt"::text as "createdAt",
        coalesce(p.role, 'user') as role
      from "user" u
      left join app_profiles p on p.user_id = u.id
      order by u."createdAt" asc
    `).map((r) => ({
		id: r.id,
		name: r.name,
		email: r.email,
		role: isAdminIdentity(r.email, r.name) ? "admin" : r.role ?? "user",
		createdAt: r.createdAt
	}));
});
async function deleteUserRow(sql, id) {
	await sql`delete from prediction_feedback where user_id = ${id}`;
	await sql`delete from weather_model_runs where user_id = ${id}`;
	await sql`delete from app_profiles where user_id = ${id}`;
	await sql`delete from "user" where id = ${id}`;
}
var adminDeleteAccount_createServerFn_handler = createServerRpc({
	id: "b45844c3329b982f6482e0c7b4054ffbdb5cef7860209285d9cb6266651b5ef1",
	name: "adminDeleteAccount",
	filename: "src/lib/server/app.ts"
}, (opts) => adminDeleteAccount.__executeServer(opts));
var adminDeleteAccount = createServerFn({ method: "POST" }).validator((id) => id).middleware([authMiddleware]).handler(adminDeleteAccount_createServerFn_handler, async ({ context, data: id }) => {
	await requireAdmin(context.userId);
	if (id === context.userId) throw new Error("不能删除当前登录账号");
	const sql = await getSql();
	const target = await sql`
      select email, name from "user" where id = ${id}
    `;
	if (target[0] && isAdminIdentity(target[0].email, target[0].name)) throw new Error("不能删除指定管理员手机号账号");
	await deleteUserRow(sql, id);
	return { ok: true };
});
var adminPurgeOtherAccounts_createServerFn_handler = createServerRpc({
	id: "1054b1b9297494f7440b5d035424ee3b17562c0e520435a41e7bfeec13704ea5",
	name: "adminPurgeOtherAccounts",
	filename: "src/lib/server/app.ts"
}, (opts) => adminPurgeOtherAccounts.__executeServer(opts));
var adminPurgeOtherAccounts = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(adminPurgeOtherAccounts_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	const sql = await getSql();
	const users = await sql`
      select id, email, name from "user"
    `;
	let removed = 0;
	for (const u of users) {
		if (u.id === context.userId) continue;
		if (isAdminIdentity(u.email, u.name)) continue;
		await deleteUserRow(sql, u.id);
		removed += 1;
	}
	return {
		ok: true,
		removed,
		keptPhone: ADMIN_PHONES[0]
	};
});
var runWeatherTraining_createServerFn_handler = createServerRpc({
	id: "de89ceb508318e989eb7eb43c0d78ff4a56c1d60f512160e3e1ceb83ab7ddecf",
	name: "runWeatherTraining",
	filename: "src/lib/server/app.ts"
}, (opts) => runWeatherTraining.__executeServer(opts));
var runWeatherTraining = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(runWeatherTraining_createServerFn_handler, async ({ context }) => {
	await requireAdmin(context.userId);
	const report = getTrainedWeather(true);
	const weights = JSON.stringify(serializeWeights(report));
	await (await getSql())`
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
		weights: JSON.stringify(serializeWeights(report)),
		regions: listRegionMetrics()
	};
});
var getWeatherMetrics_createServerFn_handler = createServerRpc({
	id: "d04e0484c40b5ec252a4b2eeee6bdb71cde9fa3b76501a77d79c65a2bf35e016",
	name: "getWeatherMetrics",
	filename: "src/lib/server/app.ts"
}, (opts) => getWeatherMetrics.__executeServer(opts));
var getWeatherMetrics = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getWeatherMetrics_createServerFn_handler, async ({ context }) => {
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
		regions: listRegionMetrics()
	};
});
//#endregion
export { adminDeleteAccount_createServerFn_handler, adminListAccounts_createServerFn_handler, adminListFeedback_createServerFn_handler, adminPurgeOtherAccounts_createServerFn_handler, ensureProfile_createServerFn_handler, getMyProfile_createServerFn_handler, getWeatherMetrics_createServerFn_handler, listMyFeedback_createServerFn_handler, runWeatherTraining_createServerFn_handler, submitFeedback_createServerFn_handler };
