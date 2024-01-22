import Language from './components/Language';
import LangaugeHeader from './components/LanguageHeader';
import { Suspense } from 'react';

export default function page() {
  return (
    <>
      <LangaugeHeader />

      <Suspense>
        <Language />
      </Suspense>
    </>
  );
}
