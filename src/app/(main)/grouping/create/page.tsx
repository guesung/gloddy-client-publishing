import CreateGroupContextProvider from './components/CreateGroupContext';
import CreateGroupFunnel from './funnels/CreateGroupFunnel.client';
import { PageAnimation } from '@/components/PageAnimation';
import { ModalProvider } from '@/hooks/useModal';

export default function CreateGroupPage() {
  return (
    <PageAnimation>
      <ModalProvider>
        <CreateGroupContextProvider>
          <CreateGroupFunnel />
        </CreateGroupContextProvider>
      </ModalProvider>
    </PageAnimation>
  );
}
