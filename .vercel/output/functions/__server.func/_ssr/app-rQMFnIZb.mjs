import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { B as serializeWeights, R as getTrainedWeather } from "./weather-model-J6X1ULVT.mjs";
import { t as authMiddleware } from "./middleware-GVIdwLyz.mjs";
import { r as getSql } from "./db-dqju8xX7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-rQMFnIZb.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
async function bootstrapProfile(userId) {
	const sql = await getSql();
	const existing = await sql`
    select user_id, role from app_profiles where user_id = ${userId}
  `;
	if (existing[0]) return {
		userId,
		role: existing[0].role === "admin" ? "admin" : "user"
	};
	const role = ((await sql`select count(*)::int as n from app_profiles where role = 'admin'`)[0]?.n ?? 0) === 0 ? "admin" : "user";
	await sql`insert into app_profiles (user_id, role) values (${userId}, ${role}) on conflict (user_id) do nothing`;
	return {
		userId,
		role
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
		weights
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
		weights: JSON.stringify(serializeWeights(report))
	};
});
//#endregion
export { adminListFeedback_createServerFn_handler, ensureProfile_createServerFn_handler, getMyProfile_createServerFn_handler, getWeatherMetrics_createServerFn_handler, listMyFeedback_createServerFn_handler, runWeatherTraining_createServerFn_handler, submitFeedback_createServerFn_handler };
