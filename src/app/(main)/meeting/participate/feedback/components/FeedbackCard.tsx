'use client';

import { useFeedbackContext } from '../../../../grouping/[groupId]/feedback/FeedbackContext';
import { Spacing } from '@/components/common/Spacing';
import cn from '@/utils/cn';
import Image from 'next/image';
import { memo, useState } from 'react';

import type { FeedbackType, User } from '../../../../grouping/[groupId]/feedback/type';

const feedbacks: Array<{
  name: string;
  type: FeedbackType;
}> = [
  {
    name: '차분',
    type: 'calm',
  },
  {
    name: '친절',
    type: 'kind',
  },
  {
    name: '적극',
    type: 'active',
  },
  {
    name: '유머',
    type: 'humor',
  },
];

interface FeedbackCardProps {
  user: User;
}

function FeedbackCard({ user }: FeedbackCardProps) {
  const { setValue, getValues } = useFeedbackContext();

  const currentSelectedFeedback = getValues('feedbackUserList').find(
    (feedback) => feedback.id === user.id
  );

  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackType | null>(
    currentSelectedFeedback?.feedbackType ?? null
  );

  const handleKickClick = () => {
    // TODO: 불참 모달 띄우기
  };

  const handleFeedbackClick = (type: FeedbackType) => {
    const filteredFeedbackUserList = getValues('feedbackUserList').filter(
      (feedback) => feedback.id !== user.id
    );

    if (selectedFeedback === type) {
      setSelectedFeedback(null);
      setValue('feedbackUserList', filteredFeedbackUserList);
      return;
    }

    setSelectedFeedback(type);
    setValue('feedbackUserList', [
      ...filteredFeedbackUserList,
      {
        id: user.id,
        feedbackType: type,
      },
    ]);
  };

  return (
    <div className="rounded-8 bg-gray6 p-16">
      <div className="flex items-center">
        <div className="relative h-38 w-38">
          <Image src={user.imageUrl} alt="member" className="rounded-full object-cover" fill />
        </div>
        <Spacing size={12} direction="horizontal" />
        <p className="font-700 grow">{user.name}</p>
        <Image
          src="/assets/close_red.svg"
          alt="kick"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleKickClick}
        />
      </div>
      <Spacing size={20} />
      <div className="flex">
        {feedbacks.map(({ name, type }) => (
          <div
            key={type}
            className="flex grow cursor-pointer flex-col items-center"
            onClick={() => handleFeedbackClick(type)}
          >
            <Image
              src={`/assets/${type}${selectedFeedback === type ? '_selected' : ''}.svg`}
              width={70}
              height={70}
              alt="feedback"
            />
            <Spacing size={5} />
            <p className={cn('text-12', selectedFeedback === type ? 'text-blue' : 'text-gray')}>
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(FeedbackCard);
