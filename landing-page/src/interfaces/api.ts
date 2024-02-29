// Event handler for each status
export type TOnSuccess = () => void;
export type TOnError = (message: string) => void;
export type TOnSettled = () => void;

// Parameter for services handler
export type TApiEventHandlerOption = {
  onSuccess?: TOnSuccess;
  onError?: TOnError;
  onSettled?: TOnSettled;
};
