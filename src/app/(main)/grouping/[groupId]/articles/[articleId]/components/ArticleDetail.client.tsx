'use client';

import CommentList from './CommentList.client';
import { useGetArticle, useGetGroupDetail } from '@/apis/groups';
import ArticleItem from '@/app/(main)/grouping/components/ArticleItem.client';
import { Spacing } from '@/components/common/Spacing';
import { Divider } from '@/components/Divider';
import { useNumberParams } from '@/hooks/useNumberParams';

export default function ArticleDetail() {
  const { articleId, groupId } = useNumberParams<['articleId', 'groupId']>();
  const { data: groupDetailData } = useGetGroupDetail(groupId);
  const { data: articleData } = useGetArticle(groupId, articleId);

  const { isCaptain } = groupDetailData;
  const { commentCount } = articleData;

  return (
    <>
      <ArticleItem
        article={articleData}
        isCaptain={isCaptain}
        groupId={groupId}
        isArticleDetailPage
      />
      <Divider thickness="thick" />
      <Spacing size={20} />
      <p className="px-24">댓글 {commentCount}개</p>
      <Spacing size={8} />
      <Divider thickness="thin" />
      <CommentList />
    </>
  );
}