/** 固定管理员手机号。登录可用手机号或对应邮箱。 */
export const ADMIN_PHONES = ["18858839671"] as const;

export const PHONE_EMAIL_DOMAIN = "qimen.local";

export function isCnMobile(raw: string): boolean {
  return /^1\d{10}$/.test(raw.trim());
}

export function toAuthEmail(raw: string): string {
  const s = raw.trim();
  if (isCnMobile(s)) return `${s}@${PHONE_EMAIL_DOMAIN}`;
  return s;
}

export function isAdminIdentity(email?: string | null, name?: string | null): boolean {
  const blob = `${email ?? ""} ${name ?? ""}`.toLowerCase();
  return ADMIN_PHONES.some((p) => blob.includes(p));
}
