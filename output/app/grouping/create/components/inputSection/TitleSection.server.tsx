import { useCreateMeetingContext } from '../CreateMettingContext';
import { Input } from '@/components/common/Input';

export default function TitleSection() {
  const { register } = useCreateMeetingContext();

  return (
    <section>
      <div className="mb-5 text-14">방 제목</div>
      <Input
        placeholder="제목을 입력해주세요"
        {...register('title', {
          required: true,
          maxLength: 20,
        })}
      />
    </section>
  );
}
