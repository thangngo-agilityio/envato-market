export interface TChat {
  messages: string;
  isSend: boolean;
  uid: string;
  content: string;
}

export type TMessages = {
  date: { nanoseconds: number; seconds: number };
  id: string;
  senderId: string;
  text: string;
};
