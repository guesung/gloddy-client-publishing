import ProfileEdit from './components/ProfileEdit.client';
import { Keys, getProfile } from '@/apis/profile';
import { RejectedFallback } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';
import { PageAnimation } from '@/components/PageAnimation';
import { HydrationProvider } from '@/components/Provider';
import { QueryAsyncBoundary } from '@suspensive/react-query';

export default function page() {
  return (
    <QueryAsyncBoundary rejectedFallback={RejectedFallback} pendingFallback={<Loading />}>
      <PageAnimation>
        <HydrationProvider queryKey={Keys.getProfile()} queryFn={getProfile}>
          <ProfileEdit />
        </HydrationProvider>
      </PageAnimation>
    </QueryAsyncBoundary>
  );
}
