import EditHeader from './components/EditHeader';
import EditProvider from './components/EditProvider.client';
import InputForm from './components/InputForm.client';
import { Keys, getProfile } from '@/apis/profile';
import { RejectedFallback } from '@/components/common/ErrorBoundary';
import { HydrationProvider } from '@/components/common/Provider/HydrationProvider';
import { QueryAsyncBoundary } from '@suspensive/react-query';

export default function page() {
  return (
    <>
      <EditHeader />
      <QueryAsyncBoundary rejectedFallback={RejectedFallback} pendingFallback={null}>
        <HydrationProvider queryKey={Keys.getProfile()} queryFn={getProfile}>
          <EditProvider>
            <InputForm />
          </EditProvider>
        </HydrationProvider>
      </QueryAsyncBoundary>
    </>
  );
}