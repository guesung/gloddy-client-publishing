'use client';
import Button from '@/components/common/Button';
import OnboardingSpeechBubble from '@/components/SpeechBubble/OnboardingSpeechBubble';
import { PageIndicator, Swiper } from 'antd-mobile';
import Image from 'next/image';

interface OnboardingMessage {
  id: number;
  messageBubble: string;
  messageComment: string;
}

const onboardingMessageList: OnboardingMessage[] = [
  {
    id: 1,
    messageBubble: `또 홍대야? 너무 먼데..`,
    messageComment: `나와 가까운 외국인 친구들과 \n 모임을 즐겨보세요!`,
  },
  {
    id: 2,
    messageBubble: `모임 시간 지났는데, \n 왜 아직 안 오지?`,
    messageComment: `조금 더 믿을 만한 모임을 \n 할 수 있도록 준비했어요!`,
  },
  {
    id: 3,
    messageBubble: ``,
    messageComment: ``,
  },
];

export default function Onboarding() {
  return (
    <div className="flex items-center">
      <Swiper indicator={() => <></>}>
        {onboardingMessageList.map((onboardingMessage: OnboardingMessage) => {
          return onboardingMessage.id < 3 ? (
            <Swiper.Item key={onboardingMessage.id}>
              <div className="flex flex-col items-center h-screen justify-center">
                <div>
                  <OnboardingSpeechBubble text={onboardingMessage.messageBubble} />
                  <div className="h-220">
                    <Image
                      src={`/assets/onboarding${onboardingMessage.id}.svg`}
                      width={200}
                      height={200}
                      alt="character"
                    />
                  </div>
                  <div className="text-center font-700 my-80 ">
                    {onboardingMessage.messageComment}
                  </div>
                  <PageIndicator
                    total={2}
                    current={onboardingMessage.id - 1}
                    style={{
                      '--dot-color': '#eaeaea',
                      '--active-dot-color': 'blue',
                      '--dot-size': '8px',
                      '--active-dot-size': '22px',
                      '--dot-border-radius': '50%',
                      '--active-dot-border-radius': '15px',
                      '--dot-spacing': '8px',
                    }}
                    className="flex justify-center h-8"
                  />
                </div>
              </div>
            </Swiper.Item>
          ) : (
            <Swiper.Item>
              <div className="h-screen">
                <div className="h-full flex justify-center items-center">
                  <Image alt="logo" src="/assets/main_logo.svg" width={180} height={30} />
                </div>
                <div className="fixed w-full bottom-30">
                  <Button text="시작하기" />
                </div>
              </div>
            </Swiper.Item>
          );
        })}
      </Swiper>
    </div>
  );
}
