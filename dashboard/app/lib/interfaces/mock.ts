export type TImage = {
  url: string;
  alt: string;
};

export type TImageDetails = TImage & {
  width: number;
  height: number;
};
