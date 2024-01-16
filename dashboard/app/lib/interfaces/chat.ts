export interface TChat {
  messages: string;
  isSend: boolean;
  uid: string;
  content: string;
}

export type TMessages = {
  date: { nanoSeconds: number; second: number };
  id: string;
  senderId: string;
  text: string;
};
