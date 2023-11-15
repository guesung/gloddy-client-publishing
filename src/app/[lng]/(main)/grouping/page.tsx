import CreateGroupButton from './components/CreateGroupButton.client';
import GroupingCardList from './components/GroupingCardList.client';
import GroupingHeader from './components/GroupingHeader';
import { postFCMToken } from '@/apis/notifications';
import { RejectedFallback } from '@/components/ErrorBoundary';
import { Footer } from '@/components/Footer';
import { Loading } from '@/components/Loading';
import { PageAnimation } from '@/components/PageAnimation';
import { Spacing } from '@/components/Spacing';
import { QueryAsyncBoundary } from '@suspensive/react-query';
import { cookies } from 'next/headers';

interface GroupingPageProps {
  params: {
    lng: string;
  };
}

export default async function GroupingPage({ params: { lng } }: GroupingPageProps) {
  const fcmToken = cookies().get('fcm')?.value;

  await postFCMToken({ token: fcmToken || '' }).then(() => {
    console.log(fcmToken);
  });

  return (
    <>
      <GroupingHeader />

      <QueryAsyncBoundary
        rejectedFallback={RejectedFallback}
        pendingFallback={<Loading className="h-[calc(100dvh-178px)]" />}
      >
        <GroupingCardList />
      </QueryAsyncBoundary>
      <CreateGroupButton />
      <Spacing size={60} />
      <Footer page="grouping" lng={lng} />
    </>
  );
}
