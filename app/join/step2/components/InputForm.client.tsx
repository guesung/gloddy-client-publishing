'use client';
import SearchResultSection from './SearchResultSection.client';
import { InputType, SearchResultType } from '../type';
import { BottomFixedButton } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import useJoinStore from '@/store/useJoinStore';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const DUMMY_SEARCH_RESULT_LIST: SearchResultType[] = [
  {
    id: 1,
    name: '경희대학교 서울캠퍼스',
    address: '서울특별시 동대문구 경희대로 26',
  },
  {
    id: 2,
    name: '경희주유소',
    address: '서울특별시 동대문구 경희대로 26',
  },
  {
    id: 3,
    name: '경희주유소',
    address: '서울특별시 동대문구 경희대로 26',
  },
];

export default function InputForm() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<InputType>();

  const { setJoinValue } = useJoinStore();

  const onSubmit = (data: InputType) => {
    setJoinValue({ school: data.school });
    router.push('/join/step3');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="학교"
        register={register('school', {
          required: true,
        })}
      />

      <SearchResultSection searchResultList={DUMMY_SEARCH_RESULT_LIST} />

      <BottomFixedButton text="완료" type="submit" disabled={!watch('school')} />
    </form>
  );
}
