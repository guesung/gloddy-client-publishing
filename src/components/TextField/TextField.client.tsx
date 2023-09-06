'use client';
import { Spacing } from '../Spacing';
import cn from '@/utils/cn';
import { forwardRef, useState } from 'react';

import type { UseFormRegisterReturn } from 'react-hook-form';

export interface TextFieldProps<T extends React.ElementType = 'input'>
  extends React.HTMLAttributes<T> {
  as?: T;
  register?: UseFormRegisterReturn<string>;
  label?: string;
  leftCaption?: string;
  rightCaption?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isSuccess?: boolean;
  isLeftError?: boolean;
  isRightError?: boolean;
  isSpacing?: boolean;
  readOnly?: boolean;
  className?: string;
}

let elementId = 1;

function TextField<T extends React.ElementType = 'input'>(
  {
    as,
    register,
    label,
    leftCaption,
    rightCaption,
    leftIcon,
    rightIcon,
    isLeftError = false,
    isRightError = false,
    isSpacing = true,
    readOnly = false,
    className,
    ...props
  }: TextFieldProps<T> & React.ComponentPropsWithoutRef<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const isError = isLeftError || isRightError;
  const [isFocus, setIsFocus] = useState(false);
  const Element = as || 'input';

  const [id] = useState(() => String(elementId++));

  return (
    <label htmlFor={id} className="relative">
      <section
        className={cn(
          'w-full rounded-8 border-1 p-16',
          {
            'border-border-pressed bg-white': isFocus,
            'border-transparent bg-sub': !isFocus,
            'border-warning bg-warning-color': isError,
            'border-transparent bg-divider': readOnly,
            'h-142': as === 'textarea',
          },
          className
        )}
      >
        {label && (
          <>
            <Label text={label} />
            <Spacing size={2} />
          </>
        )}
        <div className="relative flex h-full w-full items-center justify-around">
          {leftIcon}
          <Element
            ref={ref}
            className={cn(
              'w-full resize-none text-paragraph-1 outline-none placeholder:text-paragraph-1 placeholder:text-sign-caption',
              {
                'bg-white': isFocus,
                'bg-sub': !isFocus,
                'bg-warning-color': isError,
                'bg-divider placeholder:text-sign-tertiary': readOnly,
                'indent-8': !!leftIcon,
                'h-24': as === 'input',
                'h-full scroll-my-100 overflow-y-scroll ': as === 'textarea',
              }
            )}
            onFocusCapture={() => !readOnly && setIsFocus(true)}
            onBlurCapture={() => setIsFocus(false)}
            id={id}
            readOnly={readOnly}
            {...register}
            {...props}
          />
          {rightIcon}
        </div>
      </section>
      {(!!leftCaption || !!rightCaption) && (
        <section
          className={cn('flex w-full justify-between px-8 pt-4 text-caption text-sign-tertiary', {
            absolute: !isSpacing,
          })}
        >
          <LeftCaption isError={isLeftError} text={leftCaption}></LeftCaption>
          <RightCaption isError={isRightError} text={rightCaption}></RightCaption>
        </section>
      )}
    </label>
  );
}

interface LabelProps {
  text?: string;
}

function Label({ text }: LabelProps) {
  if (!text) return;
  return <p className="block text-caption text-sign-tertiary">{text}</p>;
}

interface LeftCaptionProps {
  isError?: boolean;
  text?: string;
}

function LeftCaption({ isError, text }: LeftCaptionProps) {
  if (!text) return <div />;
  return <span className={cn({ 'whitespace-nowrap text-warning': isError })}>{text}</span>;
}
interface RightCaptionProps {
  isError?: boolean;
  text?: string;
}

function RightCaption({ isError, text }: RightCaptionProps) {
  if (!text) return <div />;
  return <span className={cn({ 'whitespace-nowrap text-warning': isError })}>{text}</span>;
}

export default forwardRef(TextField) as <T extends React.ElementType = 'input'>(
  props: TextFieldProps<T> &
    React.ComponentPropsWithoutRef<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;
