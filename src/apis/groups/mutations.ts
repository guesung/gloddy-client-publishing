import {
  deleteArticle,
  deleteComment,
  deleteScrap,
  patchApply,
  postApply,
  postArticle,
  postComment,
  postCreateGroup,
  postScrap,
} from './apis';
import { Keys } from './keys';
import { GroupDetailResponse } from './type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostCreateGroup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(postCreateGroup, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(Keys.getGroupDetail(data.groupId));
      router.replace(`/grouping/${data.groupId}`);
    },
  });
};

export const usePostArticle = (groupId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(postArticle, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(Keys.getArticles(groupId));
      queryClient.invalidateQueries(Keys.getNotice(groupId));
      router.replace(`/grouping/${groupId}/articles/${data.articleId}`);
    },
  });
};

export const useDeleteArticle = (groupId: number, articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteArticle(groupId, articleId), {
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.getArticles(groupId));
      queryClient.invalidateQueries(Keys.getNotice(groupId));
    },
  });
};

export const usePostComment = (groupId: number, articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.getComments(groupId, articleId));
      queryClient.invalidateQueries(Keys.getArticle(groupId, articleId));
    },
  });
};

export const useDeleteComment = (groupId: number, articleId: number, commentId: number) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteComment(groupId, articleId, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.getComments(groupId, articleId));
      queryClient.invalidateQueries(Keys.getArticle(groupId, articleId));
    },
  });
};

export const usePostApply = (groupId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(postApply, {
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.getGroupDetail(groupId));
      queryClient.invalidateQueries(Keys.getGroupMembers(groupId));
      router.replace('/meeting/participate?tab=waiting');
    },
  });
};

export const usePatchApply = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation(patchApply, {
    onSuccess: () => {
      queryClient.invalidateQueries(Keys.getApplies(groupId));
      queryClient.invalidateQueries(Keys.getGroupDetail(groupId));
      queryClient.invalidateQueries(Keys.getGroupMembers(groupId));
    },
  });
};

export const usePostScrap = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation(() => postScrap(groupId), {
    onMutate: async () => {
      await queryClient.cancelQueries(Keys.getGroupDetail(groupId));

      const previousData = queryClient.getQueryData<GroupDetailResponse>(
        Keys.getGroupDetail(groupId)
      );

      queryClient.setQueryData<Partial<GroupDetailResponse>>(Keys.getGroupDetail(groupId), {
        ...previousData,
        isScraped: true,
      });

      return { previousData };
    },

    onSuccess: () => {
      queryClient.invalidateQueries(Keys.getGroupDetail(groupId));
    },
  });
};

export const useDeleteScrap = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteScrap(groupId), {
    onMutate: async () => {
      await queryClient.cancelQueries(Keys.getGroupDetail(groupId));

      const previousData = queryClient.getQueryData<GroupDetailResponse>(
        Keys.getGroupDetail(groupId)
      );

      queryClient.setQueryData<Partial<GroupDetailResponse>>(Keys.getGroupDetail(groupId), {
        ...previousData,
        isScraped: false,
      });

      return { previousData };
    },

    onSuccess: () => {
      queryClient.invalidateQueries(Keys.getGroupDetail(groupId));
    },
  });
};
