import cn from '@/utils/cn';
import Image from 'next/image';

import type { StrictPropsWithChildren } from '@/types';
import type { PropsWithChildren } from 'react';

interface AvatarProps {
  /**
   * 아바타의 이미지 URL을 지정합니다. (필수)
   */
  imageUrl: string;
  /**
   * 아바타의 크기를 지정합니다. small: 40x40, medium: 56x56, large: 96x96 (기본값: medium)
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 인증된 사용자면 우측 상단에 인증 아이콘이 표시됩니다.
   */
  isCertified?: boolean;
  /**
   * 아바타를 클릭했을 때 실행할 함수를 지정합니다.
   */
  onclick?: () => void;
}
export default function Avatar({
  imageUrl,
  isCertified,
  onclick,
  size = 'medium',
  children,
}: PropsWithChildren<AvatarProps>) {
  return (
    <span className="flex flex-col items-center gap-1">
      <div
        className={cn('relative inline-block', {
          'h-40 w-40': size === 'small',
          'h-56 w-56': size === 'medium',
          'h-96 w-96': size === 'large',
        })}
        onClick={onclick}
      >
        <Image
          src={imageUrl}
          alt="avatar"
          className="cursor-pointer rounded-full bg-sub object-cover"
          fill
        />
        {isCertified && (
          <Image
            src="/icons/24/education.svg"
            alt="education"
            width={size === 'large' ? 32 : 24}
            height={size === 'large' ? 32 : 24}
            className={cn('absolute', {
              '-right-6 -top-6': size === 'small',
              '-right-2 -top-2': size === 'medium',
              '-right-1 -top-1': size === 'large',
            })}
          />
        )}
      </div>
      {children}
    </span>
  );
}

interface NameProps {
  /**
   * 호스트면 이름 왼쪽에 호스트 아이콘이 표시됩니다.
   */
  isCaptain?: boolean;
}

function Name({ children, isCaptain = false }: StrictPropsWithChildren<NameProps>) {
  return (
    <div className="flex items-center">
      {isCaptain && <Image src="/icons/16/host.svg" alt="host" width={16} height={16} />}
      <p className="truncate text-caption text-sign-tertiary">{children}</p>
    </div>
  );
}

Avatar.Name = Name;