import FeedbackHeader from './components/FeedbackHeader';
import ProfileFeedbackDetail from './components/ProfileFeedbackDetail.client';
import { Keys, getFeedbacks } from '@/apis/profile';
import { HydrationProvider } from '@/components/common/Provider';
import { QueryAsyncBoundary } from '@suspensive/react-query';

export default function FeedbackPage() {
  return (
    <>
      <FeedbackHeader />
      <QueryAsyncBoundary rejectedFallback={<div>에러</div>} pendingFallback={null}>
        <HydrationProvider queryKey={Keys.getFeedbacks()} queryFn={getFeedbacks}>
          <ProfileFeedbackDetail />
        </HydrationProvider>
      </QueryAsyncBoundary>
    </>
  );
}
