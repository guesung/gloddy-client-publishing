import type { ReliabilityType } from '@/types';

export interface CreateArticleRequest {
  categoryId: number;
  title: string;
  content: string;
  images: string[];
}

export interface CreateArticleResponse {
  meta: {
    statusCode: number;
    message: string;
  };
  data: {
    articleId: number;
  };
}

export interface GetArticlesRequest {
  categoryId?: number;
  pageParam: number;
}

export interface GetArticlesResponse {
  meta: {
    statusCode: number;
    message: string;
  };
  data: {
    totalCount: number;
    currentCount: number;
    totalPage: number;
    currentPage: number;
    contents: CommunityArticle[];
  };
}

export interface CommunityArticle {
  article: {
    id: number;
    userId: number;
    isWriter: boolean;
    isLiked: boolean;
    category: {
      id: number;
      name: CategoryType;
    };
    title: string;
    content: string;
    thumbnail: string;
    images: string[];
    likeCount: number;
    commentCount: number;
    createdAt: string;
  };

  writer: {
    id: number;
    isCertifiedStudent: boolean;
    profileImage: string;
    nickName: string;
    countryName: string;
    countryImage: string;
    reliabilityLevel: ReliabilityType;
  };
}

export interface GetArticleDetail {
  meta: {
    statusCode: number;
    message: string;
  };
  data: CommunityArticle;
}

export interface GetCommunityCommentsResponse {
  meta: {
    statusCode: number;
    message: string;
  };
  data: {
    comments: Comment[];
  };
}

export interface CreateCommentRequest {
  params: { articleId: number };
  payload: {
    content: string;
  };
}

export interface Comment {
  comment: {
    id: number;
    isWriter: boolean;
    isLiked: boolean;
    userId: number;
    articleId: number;
    content: string;
    likeCount: number;
    commentCount: number;
    createdAt: string;
    updatedAt: string;
  };
  writer: {
    id: number;
    isCertifiedStudent: boolean;
    profileImage: string;
    nickName: string;
    countryName: string;
    countryImage: string;
    reliabilityLevel: ReliabilityType;
  };
}

export interface GetReplyResponse {
  meta: {
    statusCode: number;
    message: string;
  };
  data: {
    childComments: Reply[];
  };
}

export interface CreateReplyRequest {
  params: { articleId: number; commentId: number };
  payload: {
    content: string;
  };
}

export interface Reply {
  childComment: {
    id: number;
    isWriter: boolean;
    isLiked: boolean;
    userId: number;
    articleId: number;
    content: string;
    likeCount: number;
    commentCount: number;
    createdAt: string;
    updatedAt: string;
  };
  writer: {
    id: number;
    isCertifiedStudent: boolean;
    profileImage: string;
    nickName: string;
    countryName: string;
    countryImage: string;
    reliabilityLevel: ReliabilityType;
  };
}

export type CategoryType = 'K-POP' | 'Q&A' | 'Language';
