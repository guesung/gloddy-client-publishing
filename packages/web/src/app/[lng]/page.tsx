'use client';
import { useTranslation } from '../i18n/client';
import { cookieName } from '../i18n/settings';

import { useDidMount } from '@/hooks/common/useDidMount';
import useAppRouter from '@/hooks/useAppRouter';
import { hasToken } from '@/utils/auth/tokenController';
import { getLocalCookie, setLocalCookie } from '@/utils/cookieController';
import { afterDay60 } from '@/utils/date';

export default function Home() {
  const { i18n } = useTranslation('common');
  const { replace } = useAppRouter();

  useDidMount(async () => {
    const cookieLanguage = getLocalCookie(cookieName);
    let deviceLanguage;
    switch (navigator.language) {
      case 'ko-KR':
        deviceLanguage = 'ko';
        break;
      case 'zh-CN':
        deviceLanguage = 'zh-CN';
        break;
      case 'zh-TW':
        deviceLanguage = 'zh-TW';
        break;
      default:
        deviceLanguage = 'en';
    }

    const browserLanguage = cookieLanguage || deviceLanguage;

    setLocalCookie(cookieName, browserLanguage, { expires: afterDay60 });
    await i18n.changeLanguage(browserLanguage);

    if (hasToken()) replace(`/${browserLanguage}/grouping`);
    else replace(`/${browserLanguage}/join?step=1`);
  });
}
