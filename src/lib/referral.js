/**
 * Partner referral carried by the site (FPT-DOMAIN-HANDOFF § 5): a partner shares `https://fptraders.app/ar?ref=CODE`; the code is read from
 * the first URL of the visit, kept for the browser session (client-side navigation drops the query) and appended as `?ref=CODE` to every link
 * into the client app, whose middleware sets the 90-day `fpt_ref` cookie. Nothing is sent anywhere else; invalid codes are ignored.
 */
import { REF_RE } from '../config/site.js';

const KEY = 'fpt-ref';

/** The referral code of this visit (query first, then the session copy) — '' on the server and when none is valid. */
export function readReferral() {
  if (typeof window === 'undefined') return '';
  try {
    const fromQuery = new URLSearchParams(window.location.search).get('ref') || '';
    if (REF_RE.test(fromQuery)) {
      const code = fromQuery.toUpperCase();
      try { sessionStorage.setItem(KEY, code); } catch (_) {}
      return code;
    }
    const stored = sessionStorage.getItem(KEY) || '';
    return REF_RE.test(stored) ? stored : '';
  } catch (_) {
    return '';
  }
}
