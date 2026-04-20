// Device ID resolution order:
// 1. localStorage.getItem('fap_device_id')
// 2. Cookie 'fap_did'
// 3. Generate new via crypto.randomUUID()

export function resolveDeviceId(): string {
  const lsKey = 'fap_device_id';
  const cookieName = 'fap_did';

  // Try localStorage first
  const fromLS = localStorage.getItem(lsKey);
  if (fromLS) return fromLS;

  // Try cookie
  const fromCookie = getCookie(cookieName);
  if (fromCookie) {
    localStorage.setItem(lsKey, fromCookie);
    return fromCookie;
  }

  // Generate new
  const newId = crypto.randomUUID();
  localStorage.setItem(lsKey, newId);
  setCookie(cookieName, newId, 7 * 365); // 7-year expiry
  return newId;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number): void {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};max-age=${maxAge};SameSite=Strict`;
}
