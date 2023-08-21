'use client';

import { useJoinContext } from '../../../components/JoinContext.client';
import { useFunnelContext } from '../../JoinFunnel';
import { formatAddress } from '../utils';
import { SchoolSearchResponse, useGetSearchSchool } from '@/apis/auth';
import { Button, ButtonGroup } from '@/components/Button';
import { Spacing } from '@/components/common/Spacing';
import { Flex } from '@/components/Layout';
import { SearchTextField } from '@/components/TextField';
import Image from 'next/image';

export default function SchoolForm() {
  const { handleSubmit, getFieldState, register, watch, setValue } = useJoinContext();
  const { nextStep } = useFunnelContext();

  const searchWord = watch('schoolInfo.school');

  const { data } = useGetSearchSchool(searchWord);

  return (
    <form onSubmit={handleSubmit(nextStep)}>
      <SearchTextField
        register={register('schoolInfo.school', {
          required: true,
          pattern: /[가-힣]+대학교/,
        })}
      />
      {data &&
        data?.schools.map((school) => (
          <SearchResult
            school={school}
            key={school.address}
            onClick={() => {
              console.log(school.address);
              setValue('schoolInfo.school', school.name);
            }}
          />
        ))}
      <ButtonGroup>
        <Button disabled={!getFieldState('schoolInfo.school').invalid}>확인</Button>
      </ButtonGroup>
    </form>
  );
}

interface SearchResultProps extends React.HTMLAttributes<React.ElementType> {
  school: SchoolSearchResponse['schools'][0];
}

function SearchResult({ school, ...props }: SearchResultProps) {
  return (
    <Flex {...props}>
      <Image src="/icons/24/location_on.svg" width={24} height={24} alt="location" />
      <Spacing size={8} direction="horizontal" />
      <Flex className="border-b-1 border-gray6 py-12" direction="column">
        <div className="text-subtitle-2">{school.name}</div>
        <div className="text-paragraph-2 text-sign-tertiary">{formatAddress(school.address)}</div>
      </Flex>
    </Flex>
  );
}