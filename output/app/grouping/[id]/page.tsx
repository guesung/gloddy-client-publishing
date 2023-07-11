import TopNavigationBar from './TopNavigationBar';
import TopSection from './TopSection';
import MemberSection from './MemberSection';
import TimeSection from './TimeSection';
import LocationSection from './LocationSection';
import ApplyButton from './ApplyButton';
import Spacing from '@/components/common/Spacing';

const DETAIL_DUMMY_DATA = {
  image: '/assets/main_logo.png',
  title: 'Let’s go for a walk!',
  description: 'It’s a group that \n🏃walks around, \n🗣talks, \n🌏and learns languages.',
  current: '2',
  total: '4',
  location: '동대문구 회기동',
  time: '04.27.FRI 7PM',
};

export default function DetailPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const { image, title, description, location, time } = DETAIL_DUMMY_DATA;

  return (
    <main>
      <TopNavigationBar />
      <TopSection id={id} title={title} thumbnailUrl={image} description={description} />
      <div className="p-20 pb-100">
        <MemberSection />
        <Spacing size={18} />
        <TimeSection time={time} />
        <Spacing size={18} />
        <LocationSection location={location} />
      </div>
      <ApplyButton />
    </main>
  );
}
