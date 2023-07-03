import Image from 'next/image';
import { useRef } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';

import ModalWrapper from './ModalWrapper';

interface BottomUpModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  children: React.ReactNode;
  snap: number;
  disableDrag?: boolean;
  isLeftButton?: boolean;
  text?: React.ReactNode;
  isRightButton?: boolean;
}

export default function BottomUpModal({
  children,
  isModalOpen,
  setIsModalOpen,
  snap,
  disableDrag = false,
  isLeftButton = false,
  text,
  isRightButton = false,
}: BottomUpModalProps) {
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <div>
      {isModalOpen && <ModalWrapper />}
      <Sheet
        ref={ref}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        snapPoints={[snap, 0]}
        initialSnap={0}
        disableDrag={disableDrag}
        className="animate-slideUp"
      >
        <Sheet.Container className="!rounded-t-30">
          <div className="flex justify-center w-full">
            <div className="relative h-full w-[26.25rem]  bg-white rounded-t-30">
              <Sheet.Content>
                <div className="p-25">
                  <Sheet.Header>
                    <div className="flex justify-between h-50 items-center">
                      {isLeftButton ? (
                        <Image
                          alt="close"
                          src="/assets/arrow_back.svg"
                          width={10}
                          height={10}
                          onClick={() => snapTo(1)}
                        />
                      ) : (
                        <div />
                      )}
                      {text}
                      {isRightButton ? (
                        <Image
                          alt="close"
                          src="/assets/close.svg"
                          width={30}
                          height={30}
                          onClick={() => snapTo(1)}
                        />
                      ) : (
                        <div />
                      )}
                    </div>
                  </Sheet.Header>
                  {children}
                </div>
              </Sheet.Content>
            </div>
          </div>
        </Sheet.Container>
      </Sheet>
    </div>
  );
}