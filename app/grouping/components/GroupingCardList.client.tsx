'use client';
import { Grouping } from '@/apis/groups/type';
import GroupingCard from './GroupingCard.client';
import { useGetGroups } from '@/apis/groups/queries.client';

const DUMMY_GROUPING_DATA: Grouping[] = [
  {
    groupId: 1,
    imageUrl: '/assets/location.svg',
    title: 'Let’s go for a walk!',
    content: 'It’s a group that walks around, talks, and learns languages.',
    memberCount: 2,
    maxUser: 2,
    place: '동대문구 회기동',
    meetDate: '04.27.FRI 7PM',
    startTime: '13:00',
    endTime: '15:00',
    place_latitude: 37.579,
    place_longitude: 127.056,
  },
  {
    groupId: 2,
    imageUrl: '/assets/location.svg',
    title: 'Let’s go for a walk!',
    content: 'It’s a group that walks around, talks, and learns languages.',
    memberCount: 2,
    maxUser: 3,
    place: '동대문구 회기동',
    meetDate: '04.27.FRI 7PM',
    startTime: '13:00',
    endTime: '15:00',
    place_latitude: 37.579,
    place_longitude: 127.056,
  },
  {
    groupId: 3,
    imageUrl: '/assets/location.svg',
    title: 'Let’s go for a walk!',
    content: 'It’s a group that walks around, talks, and learns languages.',
    memberCount: 0,
    maxUser: 5,
    place: '동대문구 회기동',
    meetDate: '04.27.FRI 7PM',
    startTime: '13:00',
    endTime: '15:00',
    place_latitude: 37.579,
    place_longitude: 127.056,
  },
];

export default function GroupingCardList() {
  const { data } = useGetGroups(0);
  console.log(data);

  return (
    <section className="mx-20 flex flex-col gap-8">
      {DUMMY_GROUPING_DATA.map((groupingData) => (
        <GroupingCard groupingData={groupingData} key={groupingData.groupId} />
      ))}
    </section>
  );
}
