'use client';
import { postFCMToken } from '@/apis/notifications';
import { getLocalCookie } from '@/utils/cookieController';

export default function GroupingCardList() {
  // const { blockGroupIds } = useBlockStore();
  // const { data, fetchNextPage } = useGetGroups();

  // const { ref, inView } = useInView();

  // useEffect(() => {
  //   if (inView) fetchNextPage();
  //   const fcmToken = getLocalCookie('fcm');
  // postFCMToken({ token: fcmToken || '' })
  //   .then(() => {
  //     alert(fcmToken);
  //   })
  //   .catch((err) => {
  //     alert(err);
  //   });
  // }, [inView, fetchNextPage]);

  return (
    <>
      {/* <ItemList
        data={data}
        renderItem={(grouping) =>
          !blockGroupIds.includes(grouping.groupId) && <GroupingCard groupingData={grouping} />
        }
      /> */}
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
      {/* <div ref={ref} /> */}
    </>
  );
}
