export type FeedbackType = 'calm' | 'kind' | 'active' | 'humor';

export type FeedbackUser = {
  id: number;
  feedbackType: FeedbackType;
};

export type FeedbackRequestType = {
  feedbackUserList: FeedbackUser[];
  mateId: number;
  comment: string;
};

export interface User {
  id: number;
  name: string;
  imageUrl: string;
}
