import { IconButton } from '@/components/Button';
import { Header } from '@/components/Header';
import { Icon } from '@/components/Icon';
import Link from 'next/link';

export default function SettingHeader() {
  return (
    <Header>
      <Header.Left className="px-4">
        <Link href="/profile">
          <IconButton size="large">
            <Icon id="24-arrow_back" />
          </IconButton>
        </Link>
        <p className="text-subtitle-1">환경설정</p>
      </Header.Left>
    </Header>
  );
}
