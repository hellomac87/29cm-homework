// coupons.js
export const coupons = [
  {
    type: "rate",
    title: "10% 할인 쿠폰",
    discountRate: 10,
  },
  {
    type: "amount",
    title: "10,000원 할인 쿠폰",
    discountAmount: 10000,
  },
];

export function getCoupons() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(coupons);
    }, 1000);
  });
}
