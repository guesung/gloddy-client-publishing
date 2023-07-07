'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import CircleCheckbox from '@/components/common/Checkbox/CircleCheckbox';
import { Input } from '@/components/common/Input';
import BottomUpModal from '@/components/common/Modal/BottomUpModal';
import TopNavigationBar from '@/components/common/NavigationBar/TopNavigationBar';
import { AuthTitleTextMessage } from '@/components/TextMessage/AuthTextMessage';
import regexr from '@/constants/regexr';
import { useModal } from '@/hooks/useModal';

type Inputs = {
  email: string;
  certificateNumber: number;
};
export default function Step3Page() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<Inputs>();

  const { isModalOpen, openModal, closeModal } = useModal<'modal'>();

  const onSubmitEmail: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data.email);
    openModal('modal');
    // 인증번호 전송
  };
  const onSubmitCertificateNumber: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data.certificateNumber);
    // 인증번호 확인
    router.push('/join/step4');
  };

  return (
    <div className="relative h-full">
      {isModalOpen && (
        <BottomUpModal isModalOpen={isModalOpen} onClose={closeModal} snap={400} isRightButton>
          <section className="text-20 font-700">
            <p>회원님의 이메일로 </p>
            <p>인증번호를 전송하였습니다.</p>
          </section>

          <form onSubmit={handleSubmit(onSubmitCertificateNumber)}>
            <section className="my-20">
              <Input
                text="인증번호"
                register={register('certificateNumber', {
                  required: true,
                  pattern: {
                    value: regexr.certificateNumber,
                    message: '인증 번호를 다시 확인해주세요.',
                  },
                })}
                maxLength={6}
                type="number"
              />
              <div className="flex justify-between p-10">
                <p className="text-14 text-gray3 underline ">재전송하기</p>
                <p className="text-orange">02:59</p>
              </div>
            </section>

            <section>
              <Button
                text="완료"
                disabled={
                  String(watch('certificateNumber'))?.length < 6 ||
                  watch('certificateNumber') === undefined
                }
                type="submit"
              />
            </section>
          </form>
        </BottomUpModal>
      )}

      <TopNavigationBar text="회원가입" isLeft={true} />

      <section>
        <AuthTitleTextMessage text={`재학생 인증을 위해\n학교 이메일을 입력해주세요`} />
      </section>

      <form onSubmit={handleSubmit(onSubmitEmail)}>
        <section>
          <Input
            text="ID"
            register={register('email', {
              required: true,
              pattern: {
                value: regexr.email,
                message: '학교 이메일을 다시 확인해주세요.',
              },
            })}
          />
        </section>
        <p
          className={clsx('font-500 float flex justify-center gap-5 text-13 text-orange', {
            invisible: !errors.email,
          })}
        >
          <Image alt="alert" src="/assets/alert.svg" width={10} height={30} />
          {errors.email?.message}
        </p>

        <div className="h-10" />

        <section>
          <CircleCheckbox
            text={
              <span className="text-14">
                재학생 인증을 진행하면 <span className="text-14 font-700 text-blue">인증마크</span>
                를 받을 수 있어요
              </span>
            }
            checked
          />
          <div className="h-10" />
          <CircleCheckbox
            text={
              <span className="text-14">신뢰있는 모임을 위해 재학생 인증을 꼭 진행해주세요</span>
            }
            checked
          />
          <div className="h-10" />
          <CircleCheckbox
            text={
              <span className="text-14">
                재학생 이메일 발급 <br />
                https://www.instagram.com/gloddykorea/
              </span>
            }
            checked
          />
        </section>

        <section className="absolute bottom-0 w-full">
          <Button
            text="인증하기"
            type="submit"
            disabled={
              Boolean(errors.email) || watch('email') === undefined || watch('email')?.length === 0
            }
          />

          <div className="h-8" />

          <Button text="다음에 인증하기" color="orange" href="/join/step4" />
        </section>
      </form>
    </div>
  );
}
