'use client';

import { Suspense } from 'react';

import AllContent from './AllContent.client';
import KpopContent from './KpopContent';
import LanguageContent from './LanguageContent.client';
import QuestionContent from './QuestionContent.client';

import { useTranslation } from '@/app/i18n/client';
import { Tabs } from '@/components/Tabs';

export interface CommunityChannelMessage {
  categoryId: number;
}

export default function ContentSection() {
  const { t } = useTranslation('community');

  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Tab text={t('category.All')} value="all" />
        <Tabs.Tab text={t('category.K-POP')} value="kpop" />
        <Tabs.Tab text={t('category.Q&A')} value="question" />
        <Tabs.Tab text={t('category.Language')} value="language" />
      </Tabs.List>
      <Tabs.Panel value="all">
        <Suspense>
          <AllContent />
        </Suspense>
      </Tabs.Panel>
      <Tabs.Panel value="kpop">
        <Suspense>
          <KpopContent />
        </Suspense>
      </Tabs.Panel>
      <Tabs.Panel value="question">
        <Suspense>
          <QuestionContent />
        </Suspense>
      </Tabs.Panel>
      <Tabs.Panel value="language">
        <Suspense>
          <LanguageContent />
        </Suspense>
      </Tabs.Panel>
    </Tabs>
  );
}
