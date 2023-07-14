'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { TopNavigationBar } from '@/components/common/NavigationBar';

export default function GroupingCreateTopNavigationBar() {
  const router = useRouter();
  return (
    <TopNavigationBar
      leftNode={
        <Image
          alt="back"
          src="/assets/arrow_back.svg"
          width={8}
          height={30}
          onClick={() => {
            router.back();
          }}
        />
      }
      text="모임 개설하기"
    />
  );
}