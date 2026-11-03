import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appUrl, SIGNUP_PATH, SIGNIN_PATH } from '../config/site.js';
import { readReferral } from '../lib/referral.js';

/**
 * The links into the client app for the page language — sign-up («start the evaluation / register») and sign-in — on `app.fptraders.app`
 * (/ar/… for Arabic, /en/… for every other language), carrying `?ref=CODE` when the visit brought a partner code. The referral is read after
 * hydration (useEffect) so the pre-rendered HTML and the first client render stay identical; the links update in place a tick later.
 */
export default function useAppLinks() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const [ref, setRef] = useState('');
  useEffect(() => { setRef(readReferral()); }, []);
  return {
    signup: appUrl(SIGNUP_PATH, lang, ref),
    signin: appUrl(SIGNIN_PATH, lang, ref),
    home: appUrl('/', lang, ref),
  };
}
