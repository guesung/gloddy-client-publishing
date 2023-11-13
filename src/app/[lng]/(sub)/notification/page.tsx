import NotificationHeader from './components/NotificationHeader';
import NotificationSection from './components/NotificationSection';
import { PageAnimation } from '@/components/PageAnimation';

export default async function NotificationPage() {
  return (
    <>
      <NotificationHeader />
      <PageAnimation>
        <NotificationSection />
      </PageAnimation>
    </>
  );
}
