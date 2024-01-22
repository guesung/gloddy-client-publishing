import Service from './components/Service';
import ServiceHeader from './components/ServiceHeader';
import { Loading } from '@/components/Loading';
import { Suspense } from 'react';

interface PageProps {
  params: {
    lng: string;
  };
}

export default function page({ params: { lng } }: PageProps) {
  return (
    <>
      <ServiceHeader />

      <Suspense fallback={<Loading />}>
        <Service lng={lng} />
      </Suspense>
    </>
  );
}
