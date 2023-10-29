'use client';
import LocationSection from './LocationSection.client';
import MemberSection from './MemberSection.client';
import TimeSection from './TimeSection.client';
import { useGetGroupDetail } from '@/apis/groups';
import { useTranslation } from '@/app/i18n/client';
import { Button, ButtonGroup } from '@/components/Button';
import useAppRouter from '@/hooks/useAppRouter';
import { useNumberParams } from '@/hooks/useNumberParams';
import { usePathname } from 'next/navigation';

export default function DetailContent() {
  const { t } = useTranslation('groupDetail');
  const { groupId } = useNumberParams<['groupId']>();
  const pathname = usePathname();
  const { push } = useAppRouter();
  const { data: groupDetailData } = useGetGroupDetail(groupId);
  const { isApplyWaited, myGroup } = groupDetailData;

  return (
    <>
      <MemberSection {...groupDetailData} />
      <TimeSection {...groupDetailData} />
      <LocationSection {...groupDetailData} />
      {!myGroup && (
        <ButtonGroup>
          <Button onClick={() => push(`${pathname}/apply`)} disabled={isApplyWaited}>
            {t(isApplyWaited ? 'details.wait' : 'details.join')}
          </Button>
        </ButtonGroup>
      )}
    </>
  );
}
