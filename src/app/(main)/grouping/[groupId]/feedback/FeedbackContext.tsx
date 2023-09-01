'use client';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import type { FeedbackRequestType } from './type';
import type { StrictPropsWithChildren } from '@/types';

export default function FeedbackContextProvider({ children }: StrictPropsWithChildren) {
  const methods = useForm<FeedbackRequestType>({
    defaultValues: {
      mateId: undefined,
      feedbackUserList: [],
      comment: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export function useFeedbackContext() {
  return useFormContext<FeedbackRequestType>();
}
