'use client';
import { useGetGroups } from '@/apis/groups';
import { postFCMToken } from '@/apis/notifications';
import { GroupingCard } from '@/components/Card';
import { ItemList } from '@/components/List';
import { useBlockStore } from '@/store/useBlockStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function GroupingCardList() {
  const { blockGroupIds } = useBlockStore();
  const { data, fetchNextPage } = useGetGroups();

  const { ref, inView } = useInView();

  useEffect(() => {
    postFCMToken({ token: 'a' })
      .then(() => {
        console.log('푸시 알림이 설정되었습니다.');
        alert('푸시 알림이 설정되었습니다.');
      })
      .catch(() => {
        console.log('푸시 알림 설정에 실패했습니다.');
        alert('푸시 알림 설정에 실패했습니다.');
      });
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
