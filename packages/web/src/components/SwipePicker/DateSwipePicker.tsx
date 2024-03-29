'use client';
import SwipePicker from './SwipePicker';

import type { DateType } from '@/types';

const YEAR_COUNT = 31;
const MONTH_COUNT = 12;
const DATE_COUNT = 31;

const yearList = Array.from({ length: YEAR_COUNT }, (_, i) => i + 1980 + '년');

const monthList = Array.from({ length: MONTH_COUNT }, (_, i) => i + 1 + '월');
const dateList = Array.from({ length: DATE_COUNT }, (_, i) => i + 1 + '일');

interface DateSwipePickerProps {
  dateValue: DateType;
  setDateValue: (props: DateType) => void;
}

export default function DateSwipePicker({ dateValue, setDateValue }: DateSwipePickerProps) {
  return (
    <div className="h-180 relative flex">
      <SwipePicker.Bar />
      <SwipePicker
        selectList={yearList}
        value={dateValue.year}
        setValue={(value) => setDateValue({ ...dateValue, year: value })}
      />
      <SwipePicker
        selectList={monthList}
        value={dateValue.month}
        setValue={(value) => setDateValue({ ...dateValue, month: value })}
      />
      <SwipePicker
        selectList={dateList}
        value={dateValue.date}
        setValue={(value) => setDateValue({ ...dateValue, date: value })}
      />
    </div>
  );
}
