import Image from 'next/image';
import { useRef } from 'react';
import Sheet, { type SheetRef } from 'react-modal-sheet';

interface BottomUpModalProps {
  isModalOpen: boolean;
  snap: number;
  children: React.ReactNode;
  onClose: () => void;
  disableDrag?: boolean;
  text?: React.ReactNode;
  isLeftButton?: boolean;
  isRightButton?: boolean;
  handleLeftButtonClick?: () => void;
}

export default function BottomUpModal({
  children,
  isModalOpen,
  handleLeftButtonClick,
  onClose,
  snap,
  text,
  disableDrag = false,
  isLeftButton = false,
  isRightButton = false,
}: BottomUpModalProps) {
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <Sheet
      ref={ref}
      isOpen={isModalOpen}
      onClose={onClose}
      snapPoints={[snap, 0]}
      initialSnap={0}
      disableDrag={disableDrag}
      className="fixed inset-x-0 m-auto max-w-[28.125rem]"
      tweenConfig={{
        ease: 'easeInOut',
        duration: 0.5,
      }}
    >
      <Sheet.Backdrop className="fixed inset-x-0 m-auto max-w-[28.125rem] !bg-[rgba(0,0,0,0.6)]" />
      <Sheet.Container className="relative !rounded-t-30 bg-white p-25">
        <Sheet.Header>
          <div className="relative h-50 items-center justify-center">
            {isLeftButton && (
              <Image
                alt="close"
                src="/assets/arrow_back.svg"
                width={10}
                height={10}
                className="absolute inset-y-0  left-0 m-auto"
                onClick={() => (handleLeftButtonClick ? handleLeftButtonClick() : snapTo(1))}
              />
            )}
            <div className="flex h-full items-center justify-center">{text}</div>
            {isRightButton && (
              <Image
                alt="close"
                src="/assets/close.svg"
                width={30}
                height={30}
                onClick={onClose}
                className="absolute inset-y-0 right-0 m-auto"
              />
            )}
            <div />
          </div>
        </Sheet.Header>
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
