'use client';

import ProfileDetailSection from './ProfileDetailSection.client';
import { postFCMToken } from '@/apis/notifications';
import { useGetProfile } from '@/apis/profile';
import { getLocalCookie } from '@/utils/cookieController';

export default function ProfileDetail() {
  const { data: profileData } = useGetProfile();

  return (
    <button
      onClick={async () => {
        const fcmToken = getLocalCookie('fcm');
        try {
          const a = await postFCMToken({ token: fcmToken || '' });
          alert(JSON.stringify(a));
        } catch (e) {
          alert(e);
        }
      }}
    >
      클릭해봐
    </button>
  );
}
