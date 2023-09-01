import FeedbackCard from './FeedbackCard';

import type { User } from '../../../grouping/[groupId]/feedback/type';

interface FeedbackCardListProps {
  userList: User[];
}

export default function FeedbackCardList({ userList }: FeedbackCardListProps) {
  return (
    <div className="flex flex-col gap-12">
      {userList.map((user) => (
        <FeedbackCard key={user.id} user={user} />
      ))}
    </div>
  );
}
