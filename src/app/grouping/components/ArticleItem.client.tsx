'use client';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Spacing } from '@/components/common/Spacing';
import { Divider } from '@/components/Divider';
import { Flex } from '@/components/Layout';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import type { Article } from '@/apis/groups/type';

interface ArticleItemProps {
  article: Article;
  isBoardDetail?: boolean;
  isCaptain: boolean;
}

export default function ArticleItem({
  article,
  isCaptain,
  isBoardDetail = false,
}: ArticleItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const pathname = usePathname();

  const handleOkClick = () => {};

  return (
    <>
      <div className="px-20 pb-24 pt-16">
        <div className="px-4">
          <Flex align="center" className="gap-12 pb-4 pt-6">
            <Avatar
              imageUrl={article.userImageUrl ?? '/dummy_avatar.png'}
              size="small"
              isCertified={article.isCertifiedStudent}
            />
            <div className="grow">
              <Flex align="center">
                <p className="text-paragraph-2 text-sign-secondary">{article.name}</p>
                <Spacing size={2} direction="horizontal" />
                {article.isCaptain && (
                  <Image src="/icons/16/host.svg" alt="host" width={16} height={16} />
                )}
                {/* TODO: 등급 아이콘 추가 */}
              </Flex>
              <p className="text-caption text-sign-tertiary">{article.date}</p>
            </div>
            {isCaptain && (
              <Image
                src="/icons/24/more_secondary.svg"
                alt="more"
                width={24}
                height={24}
                onClick={() => setIsDeleteModalOpen(true)}
              />
            )}
          </Flex>
          <Spacing size={16} />
          <div className="text-paragraph-2 text-sign-primary">{article.content}</div>
          {isBoardDetail && (
            <>
              <Spacing size={16} />
              <Button
                variant="solid-secondary"
                as="a"
                href={`
                ${pathname}/board/${article.articleId}
              `}
              >
                댓글 {article.commentCount}개
              </Button>
              <Spacing size={24} />
            </>
          )}
        </div>
      </div>
      <Modal
        variant="warning"
        isOpen={isDeleteModalOpen}
        onCancelClick={() => setIsDeleteModalOpen(false)}
        onOkClick={handleOkClick}
      >
        <Spacing size={32} />
        <Image src="/icons/48/warning.svg" alt="warning" width={48} height={48} />
        <Spacing size={12} />
        <p>해당 게시글을 삭제하시겠습니까?</p>
        <Spacing size={16} />
      </Modal>
      {isBoardDetail && <Divider />}
    </>
  );
}
