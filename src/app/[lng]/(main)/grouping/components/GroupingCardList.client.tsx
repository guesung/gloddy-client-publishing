'use client';
import { useGetGroups } from '@/apis/groups';
import { postFCMToken } from '@/apis/notifications';
import { GroupingCard } from '@/components/Card';
import { ItemList } from '@/components/List';
import { useDidMount } from '@/hooks/common/useDidMount';
import { useBlockStore } from '@/store/useBlockStore';
import { getLocalCookie } from '@/utils/cookieController';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function GroupingCardList() {
  const { blockGroupIds } = useBlockStore();
  const { data, fetchNextPage } = useGetGroups();

  const { ref, inView } = useInView();

  useDidMount(async () => {
    alert(1);
    const fcmToken = getLocalCookie('fcm');
    alert(fcmToken);
    const a = await postFCMToken({ token: fcmToken || '' });
    alert(a);
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <>
      <ItemList
        data={data}
        renderItem={(grouping) =>
          !blockGroupIds.includes(grouping.groupId) && <GroupingCard groupingData={grouping} />
        }
      />
      <div ref={ref} />
    </>
  );
}
