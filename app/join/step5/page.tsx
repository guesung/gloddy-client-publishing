'use client';
import { useState } from 'react';

import Button from '@/components/common/Button';
import TopNavigationBar from '@/components/common/NavigationBar/TopNavigationBar';
import PersonalityItem from '@/components/join/PersonalityItem';
import { AuthTitleTextMessage } from '@/components/TextMessage/AuthTextMessage';
import { personalityList } from '@/constants/personalityList';

export default function Step5Page() {
  const [selectedPersonalityList, setSelectedPersonalityList] = useState<number[]>([]);
  const handlePersonalityClick = (index: number) => {
    if (selectedPersonalityList.includes(index)) {
      setSelectedPersonalityList(selectedPersonalityList.filter((item) => item !== index));
    } else {
      setSelectedPersonalityList([...selectedPersonalityList, index]);
    }
  };

  return (
    <div className="relative h-full ">
      <TopNavigationBar text="회원가입" />

      <section>
        <AuthTitleTextMessage text={`사용자님의 성격을\n선택해주세요!`} />
      </section>

      <p className="text-14 text-gray2">3개를 선택해주세요.</p>

      <div className="h-30" />

      <section className="flex flex-wrap gap-12">
        {personalityList.map((personality, index: number) => (
          <PersonalityItem
            key={personality.id}
            personality={personality}
            isSelected={selectedPersonalityList.includes(index)}
            onClick={() => {
              handlePersonalityClick(index);
            }}
          />
        ))}
      </section>

      <section className="absolute bottom-0 w-full">
        <Button text="완료" disabled={selectedPersonalityList.length === 0} href="/login" />
      </section>
    </div>
  );
}