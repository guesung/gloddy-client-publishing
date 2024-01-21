'use client';

import BaseError, { BaseErrorProps } from '@/components/Error/BaseError';

interface ErrorProps extends BaseErrorProps {}

export default function Error({ error, reset }: ErrorProps) {
  return <BaseError error={error} reset={reset} />;
}
