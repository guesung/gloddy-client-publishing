import { clsx } from 'clsx';
import Link from 'next/link';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonColor = 'blue' | 'orange' | 'gray';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: ButtonColor;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export default function Button(props: ButtonProps) {
  const { text, color = 'blue', onClick, href, disabled, type = 'button', ...rest } = props;

  return (
    <div
      className={clsx(
        'flex h-[3.75rem]  w-full items-center justify-center rounded-xl text-center text-16',
        {
          'bg-gray5 text-gray3': disabled,
          'text-white': !disabled,

          'bg-blue': !disabled && color === 'blue',
          'bg-orange': !disabled && color === 'orange',
          'bg-gray3 text-white': !disabled && color === 'gray',
        }
      )}
    >
      {Boolean(href) ? (
        <Link href={href || ''} className="font-bold text-white">
          {text}
        </Link>
      ) : Boolean(onClick) ? (
        <button type={type} onClick={onClick} className="h-full w-full" {...rest}>
          {text}
        </button>
      ) : (
        <button className="h-full w-full" type={type} {...rest}>
          {text}
        </button>
      )}
    </div>
  );
}
