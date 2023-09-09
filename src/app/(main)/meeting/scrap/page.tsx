import ContentSection from './components/ContentSection.client';
import MeetingScrapHeader from './components/MeetingScrapHeader';
import { Keys, getMeetingScrap } from '@/apis/meeting';
import { Footer } from '@/components/Footer';
import { Loading } from '@/components/Loading';
import { HydrationProvider } from '@/components/Provider';
import { Suspense } from 'react';

export default function MeetingPage() {
  return (
    <>
      <MeetingScrapHeader />
      <Suspense fallback={<Loading />}>
        <HydrationProvider queryFn={getMeetingScrap} queryKey={Keys.getMeetingScraps()}>
          <ContentSection />
        </HydrationProvider>
      </Suspense>
      <Footer page="meeting" />
    </>
  );
}
