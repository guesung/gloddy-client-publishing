import Information from './components/Information';
import InformationHeader from './components/InformationHeader';
import { Suspense } from 'react';

interface PageProps {
  params: {
    lng: string;
  };
}
export default function page({ params: { lng } }: PageProps) {
  return (
    <>
      <InformationHeader />

      <Suspense>
        <Information lng={lng} />
      </Suspense>
    </>
  );
}
