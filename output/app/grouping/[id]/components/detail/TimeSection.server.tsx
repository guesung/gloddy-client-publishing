import { GroupResponse } from '@/apis/groups';
import { Spacing } from '@/components/common/Spacing';
import { format, getDay, parseISO } from 'date-fns';

interface TimeSectionProps extends Pick<GroupResponse, 'meetDate' | 'startTime' | 'endTime'> {}

const displayDate = (meetDate: string, startTime: string, endTime: string) => {
  const formattedDate = format(parseISO(meetDate), 'yyyy. MM. dd.');

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeekIndex = getDay(parseISO(meetDate));
  const formattedDayOfWeek = days[dayOfWeekIndex];

  const formattedStartTime = format(parseISO(meetDate + ' ' + startTime), 'hh:mm a');
  const formattedEndTime = format(parseISO(meetDate + ' ' + endTime), 'hh:mm a');

  return `${formattedDate} ${formattedDayOfWeek} ${formattedStartTime} ~ ${formattedEndTime}`;
};

export default function TimeSection({ meetDate, startTime, endTime }: TimeSectionProps) {
  return (
    <section>
      <h2 className="text-14">모임 일시</h2>
      <Spacing size={10} />
      <div className="rounded-8 bg-gray6 p-16">
        <p className="text-14">{displayDate(meetDate, startTime, endTime)}</p>
      </div>
    </section>
  );
}
