import cn from '@/utils/cn';
import { type Ref, forwardRef } from 'react';

import type { StrictPropsWithChildren } from '@/types';

interface FlexProps {
  direction?: 'row' | 'column';
  justify?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly' | 'stretch';
  align?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly' | 'stretch';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
}

export default forwardRef(function Flex(
  { children, direction, justify, align, wrap }: StrictPropsWithChildren<FlexProps>,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex',
        {
          'justify-center': justify === 'center',
          'justify-start': justify === 'start',
          'justify-end': justify === 'end',
          'justify-between': justify === 'between',
          'justify-around': justify === 'around',
          'justify-evenly': justify === 'evenly',
          'justify-stretch': justify === 'stretch',
        },
        {
          'items-center': align === 'center',
          'items-start': align === 'start',
          'items-end': align === 'end',
          'items-between': align === 'between',
          'items-around': align === 'around',
          'items-evenly': align === 'evenly',
          'items-stretch': align === 'stretch',
        },
        {
          'flex-row': direction === 'row',
          'flex-column': direction === 'column',
        },
        {
          'flex-wrap': wrap === 'wrap',
          'flex-nowrap': wrap === 'nowrap',
          'flex-wrap-reverse': wrap === 'wrap-reverse',
        }
      )}
    >
      {children}
    </div>
  );
});
