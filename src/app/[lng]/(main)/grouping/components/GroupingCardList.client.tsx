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
    alert(1);
    const fcmToken = getLocalCookie('fcm');
    alert(fcmToken);

    axios
      .post(
        'https://api.gloddy.shop/api/v1/notifications/tokens',
        {
          token: fcmToken || '',
        },
        {
          headers: {
            USER_ID: 64,
          },
        }
      )
      .then(() => {
        alert(fcmToken);
      })
      .catch((e) => alert(e));
  }, []);

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
