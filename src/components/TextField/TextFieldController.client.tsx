'use client';
import TextField, { type TextFieldProps } from './TextField.client';
import Image from 'next/image';
import { useRef } from 'react';

import type { UseFormRegisterReturn, UseFormReturn } from 'react-hook-form';

function formatTimer(timer: number) {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

interface TextFieldControllerProps<T extends React.ElementType> extends TextFieldProps<T> {
  as?: T;
  hookForm: UseFormReturn<any>;
  register: UseFormRegisterReturn<string>;
  className?: string;
  readOnly?: boolean;
  /**
   * leftCaption에 문구를 표기하는 경우
   */
  leftCaption?: string;
  /**
   * rightCaption에 글자수를 표기하는 경우
   */
  maxCount?: number;
  /**
   * rightCaption에 타이머를 표기하는 경우
   */
  timer?: number;
}

function getErrorMessage(error: any, name: string) {
  if (name.includes('.')) {
    const [parentName, childName] = name.split('.');
    return error[parentName]?.[childName]?.message;
  }
  return error[name]?.message;
}

export default function TextFieldController<T extends React.ElementType>({
  as,
  hookForm,
  register,
  className,
  readOnly = false,
  leftCaption,
  maxCount,
  timer,
  ...props
}: TextFieldControllerProps<T> & React.ComponentPropsWithoutRef<T>) {
  const textFieldRef = useRef<HTMLLabelElement>(null);

  const { formState, watch, resetField } = hookForm;
  const inputName = register.name;

  const errorMessage = getErrorMessage(formState.errors, inputName);
  const isRightError =
    (maxCount ? watch(inputName).length > maxCount : false) && !formState.isValid;
  const isLeftError = (!!errorMessage || isRightError) && !formState.isValid;
  const isError = isRightError || isLeftError;

  const rightInputIconName = isError ? 'warning' : watch(inputName).length > 0 ? 'backspace' : '';

  return (
    <TextField
      ref={textFieldRef}
      as={as || 'input'}
      register={register}
      leftCaption={(errorMessage as string) ?? leftCaption ?? ''}
      rightCaption={
        maxCount ? `${watch(inputName).length}/${maxCount}` : timer ? `${formatTimer(timer)}` : ''
      }
      rightIcon={
        rightInputIconName &&
        !readOnly &&
        (as === 'input' || as === undefined) && (
          <Image
            src={`/icons/24/${rightInputIconName}.svg`}
            width={24}
            height={24}
            alt={rightInputIconName}
            onClick={() => rightInputIconName === 'backspace' && resetField(inputName)}
          />
        )
      }
      isLeftError={isLeftError}
      isRightError={isRightError}
      readOnly={readOnly}
      className={className}
      {...props}
    />
  );
}
