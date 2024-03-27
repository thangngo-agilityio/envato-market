export type TRecentActivities = {
  _id: string;
  actionName: string;
  email: string;
  createdAt: string;
};

export interface TActivitiesRequest {
  currentPage: number | undefined;
  limit: number | undefined;
  _id: string;
  actionName: string;
  email: string;
  createdAt?: string;
}
