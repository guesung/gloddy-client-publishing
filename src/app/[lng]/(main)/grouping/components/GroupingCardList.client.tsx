'use client';
import { useGetGroups } from '@/apis/groups';
import { postFCMToken } from '@/apis/notifications';
import { GroupingCard } from '@/components/Card';
import { ItemList } from '@/components/List';
import { useDidMount } from '@/hooks/common/useDidMount';
import { useBlockStore } from '@/store/useBlockStore';
import { getLocalCookie } from '@/utils/cookieController';
import axios from 'axios';
import { useEffect, useLayoutEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function GroupingCardList() {
  const { blockGroupIds } = useBlockStore();
  const { data, fetchNextPage } = useGetGroups();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
    alert(1);
    const fcmToken = getLocalCookie('fcm');
    alert(fcmToken);

    postFCMToken({ token: fcmToken || '' })
      .then(() => {
        alert(fcmToken);
      })
      .catch((err) => {
        alert(err);
      });
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
