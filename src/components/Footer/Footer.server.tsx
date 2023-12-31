import { ButtonAnimation } from '../Animation';
import { Icon } from '../Icon';
import { serverTranslation } from '@/app/i18n';
import cn from '@/utils/cn';
import Link from 'next/link';

import type { PageType } from '@/types';

interface TabType {
  id: string;
  name: PageType;
  title: string;
  url: string;
}

const tabList: TabType[] = [
  {
    id: '1',
    name: 'grouping',
    title: '매칭',
    url: '/grouping',
  },
  {
    id: '2',
    name: 'meeting',
    title: '나의모임',
    url: '/meeting/participate?tab=participating',
  },
  // {
  //   id: '3',
  //   name: 'community',
  //   title: '커뮤니티',
  //   url: '/community?tab=all',
  // },
  {
    id: '3',
    name: 'profile',
    title: '프로필',
    url: '/profile',
  },
];

interface FooterProps {
  lng: string;
  page?: PageType;
  isSpacing?: boolean;
  spacingColor?: string;
}

export default async function Footer({ lng, page, isSpacing = true, spacingColor }: FooterProps) {
  const { t } = await serverTranslation(lng, 'common');
  const isSelected = (tab: TabType) => tab.name === page;

  return (
    <>
      <footer className="fixed inset-x-0 bottom-0 mx-auto flex max-w-450 touch-pan-x rounded-t-24 bg-white pb-8 pt-12 shadow-navigation">
        {tabList.map((tab: TabType) => (
          <ButtonAnimation
            key={tab.id}
            className={cn('flex w-full flex-col text-center text-caption', {
              'text-sign-brand': isSelected(tab),
              'text-sign-tertiary': !isSelected(tab),
            })}
          >
            <Link replace href={tab.url} scroll={false}>
              <Icon
                id={`32-footer-${tab.name}${isSelected(tab) ? '_selected' : '_default'}`}
                width={32}
                height={32}
                className="mx-auto"
              />
              <p>{t(tab.name)}</p>
            </Link>
          </ButtonAnimation>
        ))}
      </footer>
      {isSpacing && <div className="h-70" style={{ backgroundColor: spacingColor }} />}
    </>
  );
}
