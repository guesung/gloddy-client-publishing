import InputSection from './InputSection.client';
import SettingSection from './SettingSection.client';
import UploadSection from './UploadSection.client';
import { useCreateGroupContext } from '../../components/CreateGroupContext';
import CreateModal from '../../components/CreateModal.client';
import { usePostCreateGroup } from '@/apis/groups';
import { Button, ButtonGroup } from '@/components/Button';
import { Spacing } from '@/components/common/Spacing';
import { Divider } from '@/components/Divider';
import { Toast } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';
import { format } from 'date-fns';

import type { CreateGroupContextValue } from '../../type';
import type { TimeType } from '@/types';
import type { SubmitHandler } from 'react-hook-form';

function formatTime(time: TimeType) {
  time.fromHour =
    time.fromAmPm === 'AM' ? time.fromHour : ((Number(time.fromHour) + 12) % 24).toString();

  return time.fromHour.padStart(2, '0') + ':' + time.fromMin.padStart(2, '0');
}

interface MainStepProps {
  onSelectMeetDate: () => void;
}

export default function MainStep({ onSelectMeetDate }: MainStepProps) {
  const hookForm = useCreateGroupContext();
  const { handleSubmit, formState } = hookForm;

  const { mutate: mutateCreateGroup } = usePostCreateGroup();
  const { open: openCreateModal, close: closeCreateModal } = useModal();
  const { open: openToast } = useModal({
    delay: 3000,
  });

  const isAllInput = Object.values(hookForm.watch()).every((value) => {
    if (typeof value === 'object') {
      return Object.values(value).every((v) => !!v);
    }
    return !!value;
  });

  const onsubmit: SubmitHandler<CreateGroupContextValue> = (data) => {
    mutateCreateGroup(
      {
        placeName: data.place.name,
        placeAddress: data.place.address,
        placeLatitude: data.place.latitude,
        placeLongitude: data.place.longitude,
        content: data.content,
        maxUser: data.maxUser,
        meetDate: format(data.meetDate, 'yyyy-MM-dd'),
        title: data.title,
        imageUrl: data.imageUrl,
        startTime: formatTime(data.time),
      },
      {
        onError: () => {
          openToast(<Toast>모임 개설에 실패했습니다.</Toast>);
        },
        onSettled: () => {
          closeCreateModal();
        },
      }
    );
  };

  const handleCreateClick = () => {
    openCreateModal(
      <CreateModal
        onCancelClick={closeCreateModal}
        onOkClick={handleSubmit(onsubmit)}
        okDisabled={formState.isSubmitting}
      />
    );
  };

  return (
    <>
      <UploadSection />
      <InputSection />
      <Divider thickness="thick" />
      <SettingSection onSelectMeetDate={onSelectMeetDate} />
      <Spacing size={60} />
      <ButtonGroup>
        <Button onClick={handleCreateClick} disabled={!isAllInput || !formState.isValid}>
          완료
        </Button>
      </ButtonGroup>
    </>
  );
}
