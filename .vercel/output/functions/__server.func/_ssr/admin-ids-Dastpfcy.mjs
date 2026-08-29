//#region node_modules/.nitro/vite/services/ssr/assets/admin-ids-Dastpfcy.js
/** 固定管理员手机号。登录可用手机号或对应邮箱。 */
var ADMIN_PHONES = ["18858839671"];
var PHONE_EMAIL_DOMAIN = "qimen.local";
function isCnMobile(raw) {
	return /^1\d{10}$/.test(raw.trim());
}
function toAuthEmail(raw) {
	const s = raw.trim();
	if (isCnMobile(s)) return `${s}@${PHONE_EMAIL_DOMAIN}`;
	return s;
}
function isAdminIdentity(email, name) {
	const blob = `${email ?? ""} ${name ?? ""}`.toLowerCase();
	return ADMIN_PHONES.some((p) => blob.includes(p));
}
//#endregion
export { isAdminIdentity as n, toAuthEmail as r, ADMIN_PHONES as t };
