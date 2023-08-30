'use client';
import { useJoinContext } from '../../../components/JoinContext.client';
import { useFunnelContext } from '../../JoinFunnel';
import { Button, ButtonGroup } from '@/components/Button';
import ImageFrame from '@/components/common/ImageFrame';
import { Spacing } from '@/components/common/Spacing';
import { Flex } from '@/components/Layout';
import BirthdayBottomSheet from '@/components/Modal/BirthdayBottomSheet.client';
import { SegmentGroup } from '@/components/SegmentGroup';
import { TextField, TextFieldController } from '@/components/TextField';
import { useModal } from '@/hooks/useModal';

export default function InputForm() {
  const hookForm = useJoinContext();
  const { watch, handleSubmit, setValue, register, formState } = hookForm;
  const { nextStep } = useFunnelContext();
  const { open: openBirthdayBottomSheet, close: closeBirthdayBottomSheet } = useModal();

  const isAllTyped = !!(
    formState.isValid &&
    watch('birth').year &&
    watch('birth').month &&
    watch('birth').date &&
    watch('gender')
  );
  const onSubmit = () => {
    if (!isAllTyped) return;
    nextStep();
  };

  const birth = watch('birth');
  const isBirthDayEntered = !!birth.year && !!birth.month && !!birth.date;

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit(onSubmit)}>
      <ImageFrame setImageUrl={(imageUrl: string) => setValue('imageUrl', imageUrl)} />

      <p className="text-subtitle-3">닉네임</p>
      <Spacing size={4} />

      <TextFieldController
        as="input"
        placeholder="닉네임을 입력해주세요."
        hookForm={hookForm}
        register={register('nickname', {
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{3,15}$/,
            message: '* 최소 3글자 이상 15자 이하로 작성해주세요.',
          },
        })}
        leftCaption="* 최소 3글자 이상 15자 이하로 작성해주세요."
        maxCount={15}
      />

      <Spacing size={8} />

      <p className="text-subtitle-3">생년월일</p>
      <Spacing size={4} />
      <TextField
        placeholder="생년월일을 선택해주세요."
        onClick={() =>
          openBirthdayBottomSheet(<BirthdayBottomSheet onClose={closeBirthdayBottomSheet} />)
        }
        value={isBirthDayEntered ? `${birth.year} ${birth.month} ${birth.date}` : ''}
        readOnly
      />

      <Spacing size={8} />

      <section className="flex flex-col">
        <p className="text-subtitle-3">성별</p>
        <Spacing size={4} />
        <SegmentGroup
          selectedValue={watch('gender')}
          onChange={(value) => setValue('gender', value)}
        >
          <SegmentGroup.Segment value="MAIL" label="남성" />
          <SegmentGroup.Segment value="FEMAIL" label="여성" />
        </SegmentGroup>
      </section>

      <ButtonGroup>
        <Button type="submit" disabled={!isAllTyped}>
          {isAllTyped ? '완료' : '다음'}
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
