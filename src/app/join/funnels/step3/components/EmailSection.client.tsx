'use client ';

import { useJoinContext } from '@/app/join/components/JoinContext';
import { TextField } from '@/components/TextField';
import { regexr } from '@/constants/regexr';

export default function EmailSection() {
  const hookForm = useJoinContext();
  const { register } = hookForm;

  return (
    <section>
      <TextField
        label="학교 이메일"
        hookForm={hookForm}
        register={register('schoolInfo.email', {
          required: true,
          pattern: regexr.email,
        })}
      />
    </section>
  );
}
