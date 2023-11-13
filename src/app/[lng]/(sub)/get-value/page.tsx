'use client';
import { Flex } from '@/components/Layout';
import { copyToClipboard } from '@/utils/copyToClipboard';

export default function page({ searchParams }: any) {
  const { value } = searchParams;
  return <Flex onClick={() => copyToClipboard(value)}>{value}</Flex>;
}
