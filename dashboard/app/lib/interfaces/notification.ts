export interface TNotification {
  _id: string;
  sender: string;
  content: string;
  receiver: string;
  amount: string;
  createdAt?: string;
  isMarkAsRead: boolean;
  userId: string;
  type: string;
}
