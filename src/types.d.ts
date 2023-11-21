export type TPayButtonProps = {};

export type LoginFormInput = {
  email: string;
  password: string;
};

export type User = {
  email: string;
};

export type TAmountCardProps = {
  amount: number;
  tax: number | null;
  user: User | null;
};

export type TSuccessProps = {
  message: string;
  reset: CallableFunction;
};

export type TAfroPayProps = {
  onSuccess: CallableFunction;
  onClose: CallableFunction;
};

export type TBottomSheetUIProps = {
  onSuccess: CallableFunction;
  onClose: CallableFunction;
};
