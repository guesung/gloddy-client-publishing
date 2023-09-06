'use client';
import { useJoinContext } from '../../../components/JoinContext.client';
import { useFunnelContext } from '../../JoinFunnel';
import { useGetNicknameDuplicate } from '@/apis/auth';
import BirthdayBottomSheet from '@/app/(sub)/join/funnels/step4/components/BirthdayBottomSheet.client';
import { Avatar } from '@/components/Avatar';
import { Button, ButtonGroup } from '@/components/Button';
import { Flex } from '@/components/Layout';
import { SegmentGroup } from '@/components/SegmentGroup';
import { Spacing } from '@/components/Spacing';
import { TextField, TextFieldController } from '@/components/TextField';
import { regexr } from '@/constants/regexr';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';

export default function InputForm() {
  const hookForm = useJoinContext();
  const { watch, handleSubmit, setValue, register, setError, clearErrors, formState } = hookForm;
  const { nextStep } = useFunnelContext();
  const { open: openBirthdayBottomSheet } = useModal();
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const { data = { isExistNickname: false }, refetch } = useGetNicknameDuplicate(watch('nickname'));

  const isAllTyped = !!(
    watch('birth').year &&
    watch('birth').month &&
    watch('birth').date &&
    watch('gender') &&
    watch('imageUrl')
  );

  const onSubmit = () => {
    if (!isAllTyped) return;
    if (!isDuplicateChecked) {
      setError('nickname', {
        type: 'duplicate',
        message: '닉네임 중복 확인을 해주세요.',
      });
      return;
    }
    nextStep();
  };

  const { handleFileUploadClick } = useFileUpload((files) => setValue('imageUrl', files[0]));

  const birth = watch('birth');
  const isBirthDayEntered = !!birth.year && !!birth.month && !!birth.date;

  return (
    <Flex as="form" direction="column" onSubmit={handleSubmit(onSubmit)}>
      <Flex className="py-20" justify="center">
        <Avatar
          imageUrl={watch('imageUrl') || ''}
          size="large"
          iconVariant="add"
          onClick={handleFileUploadClick}
        />
      </Flex>
      <Spacing size={8} />

      <Flex direction="column" gap={16}>
        <Flex direction="column" gap={4}>
          <p className="text-subtitle-3">닉네임</p>
          <Flex align="start" gap={8}>
            <div className="w-full">
              <TextFieldController
                as="input"
                placeholder="닉네임을 입력해주세요."
                hookForm={hookForm}
                register={register('nickname', {
                  required: true,
                  pattern: {
                    value: regexr.nickname,
                    message: `* 올바른 형식이 아닙니다 (최소 3글자\n최대 15글자 이하, 특수문자 금지)`,
                  },
                })}
                leftCaption={
                  isDuplicateChecked ? '사용 가능한 닉네임입니다.' : '* 최소 3글자, 최대 15자 이하'
                }
                maxCount={15}
                onChange={() => setIsDuplicateChecked(false)}
              />
            </div>
            <Button
              variant="solid-default"
              className="w-auto shrink whitespace-nowrap"
              onClick={async () => {
                if (!watch('nickname').match(regexr.nickname)) {
                  setError('nickname', {
                    type: 'pattern',
                    message: `* 올바른 형식이 아닙니다 (최소 3글자\n최대 15글자 이하, 특수문자 금지)`,
                  });
                  return;
                }
                await refetch();
                if (data?.isExistNickname) {
                  console.log(1);
                  setError('nickname', {
                    type: 'duplicate',
                    message: '이미 사용중인 닉네임입니다.',
                  });
                } else {
                  setIsDuplicateChecked(true);
                  clearErrors('nickname');
                }
              }}
              type="button"
            >
              중복 확인
            </Button>
          </Flex>
        </Flex>

        <Flex direction="column" gap={4}>
          <p className="text-subtitle-3">생년월일</p>
          <TextField
            placeholder="생년월일을 선택해주세요."
            onClick={() =>
              openBirthdayBottomSheet(({ close, isOpen }) => (
                <BirthdayBottomSheet onClose={close} isOpen={isOpen} />
              ))
            }
            value={isBirthDayEntered ? `${birth.year} ${birth.month} ${birth.date}` : ''}
            readOnly
          />
        </Flex>

        <Flex direction="column" gap={4}>
          <p className="text-subtitle-3">성별</p>
          <SegmentGroup
            selectedValue={watch('gender')}
            onChange={(value) => setValue('gender', value)}
          >
            <SegmentGroup.Segment value="MAIL" label="남성" />
            <SegmentGroup.Segment value="FEMAIL" label="여성" />
          </SegmentGroup>
        </Flex>
      </Flex>
      <ButtonGroup>
        <Button type="submit" disabled={!isAllTyped}>
          {isAllTyped ? '완료' : '다음'}
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
