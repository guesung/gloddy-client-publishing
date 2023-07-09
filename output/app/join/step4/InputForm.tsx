'use client';

import { useRef, useState } from 'react';

import Button from '@/components/common/Button';
import ImageFrame from '@/components/common/ImageFrame/ImageFrame';
import { Input } from '@/components/common/Input';
import BottomUpModal from '@/components/common/Modal/BottomUpModal';
import DateSwipePicker from '@/components/common/SwipePicker/DateSwipePicker';
import SexSwipePicker from '@/components/common/SwipePicker/SexSwipePicker';
import { useModal } from '@/hooks/useModal';

import type { BirthdayValueType } from '@/types/date';
import type { ImageType } from '@/types/global';
import type { JoinStep4InputValue } from '@/types/inputValue';

export default function InputForm() {
  const imgRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<JoinStep4InputValue>({
    profileImage: {
      imageFile: null,
      imageBlob: '',
    },
    birthday: {
      year: '',
      month: '',
      date: '',
    },
    sex: '',
  });
  const { isModalOpen, modalName, openModal, closeModal } = useModal<'birthday' | 'sex'>();

  const setProfileImage = (value: ImageType) => {
    setInputValue((prev) => ({
      ...prev,
      profileImage: value,
    }));
  };

  const setBirthdayValue = (value: BirthdayValueType) => {
    setInputValue((prev) => ({
      ...prev,
      birthday: value,
    }));
  };

  const setSexValue = (value: string) => {
    setInputValue((prev) => ({
      ...prev,
      sex: value,
    }));
  };

  const handleModalNextButton = () => {
    if (modalName === 'birthday') {
      openModal('sex');
    }
    if (modalName === 'sex') {
      if (inputValue.sex === '') {
        setInputValue((prev) => ({
          ...prev,
          sex: '남성',
        }));
      }
      closeModal();
    }
  };
  return (
    <div>
      <ImageFrame
        setImage={setProfileImage}
        imgRef={imgRef}
        imageBlob={inputValue.profileImage.imageBlob}
      />

      <section className="flex flex-col gap-10">
        <article className="flex flex-col gap-5">
          <p className="text-14">닉네임</p>
          <Input placeholder="닉네임을 입력해주세요." />
        </article>

        <article className="flex flex-col gap-5">
          <p className="text-14">생년월일</p>
          <Input
            placeholder="생년월일을 선택해주세요."
            onClick={() => openModal('birthday')}
            value={
              inputValue.birthday.year &&
              inputValue.birthday.month &&
              inputValue.birthday.date &&
              `${inputValue.birthday.year} ${inputValue.birthday.month} ${inputValue.birthday.date}`
            }
            readOnly
          />
        </article>

        <article className="flex flex-col gap-5">
          <p className="text-14">성별</p>
          <Input
            placeholder="성별을 선택해주세요."
            onClick={() => openModal('sex')}
            value={inputValue.sex}
            readOnly
          />
        </article>
      </section>

      <section className="absolute bottom-0 w-full ">
        <Button
          text="다음"
          disabled={
            !(
              inputValue.birthday.date &&
              inputValue.birthday.month &&
              inputValue.birthday.year &&
              inputValue.sex
            )
          }
          href="/join/step6"
        />
      </section>

      <BottomUpModal
        isModalOpen={isModalOpen}
        snap={400}
        onClose={closeModal}
        isRightButton
        text={
          <p className="font-500 text-18 text-gray7">
            {modalName === 'birthday' ? '생년월일' : '성별'}
          </p>
        }
        disableDrag
      >
        {modalName === 'birthday' && (
          <DateSwipePicker
            birthdayValue={inputValue.birthday}
            setBirthdayValue={setBirthdayValue}
          />
        )}
        {modalName === 'sex' && (
          <SexSwipePicker sexValue={inputValue.sex} setSexValue={setSexValue} />
        )}
        <Button
          text="다음"
          disabled={
            modalName === 'birthday' &&
            !(inputValue.birthday.year && inputValue.birthday.month && inputValue.birthday.date)
          }
          onClick={handleModalNextButton}
        />
      </BottomUpModal>
    </div>
  );
}