'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import ArticleItem from './ArticleItem.client';
import Empty from './Empty';

import { useGetCommunityArticles } from '@/apis/community/queries';
import { ItemList } from '@/components/List';
import { Loading } from '@/components/Loading';
import { useBlockStore } from '@/store/useBlockStore';

export default function QuestionContent() {
  const { ref, inView } = useInView();
  const { blockCommunityArticleIds } = useBlockStore();
  const { data: articleList, fetchNextPage, isFetching, hasNextPage } = useGetCommunityArticles(2);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <>
      <ItemList
        data={articleList}
        renderItem={(articleData) => {
          return (
            !blockCommunityArticleIds.includes(articleData.article.id) && (
              <ArticleItem articleData={articleData} />
            )
          );
        }}
        renderEmpty={() => <Empty />}
      />
      <div ref={ref} />
      {isFetching && <Loading className="h-10" />}
    </>
  );
}
