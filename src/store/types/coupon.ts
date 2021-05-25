export type Coupon = {
  type: "amount" | "rate";
  title: string;
  discountAmount?: number;
  discountRate?: number;
};
