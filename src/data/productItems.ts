// productItems.js
export const productItems = [
  {
    item_no: 122997,
    item_name: "스탠리 클래식 런치박스",
    detail_image_url:
      "https://img.29cm.co.kr/contents/itemDetail/201702/cut4_320170216150109.jpg?width=500",
    price: 75000,
    score: 200,
  },
  {
    item_no: 768848,
    item_name: "[STANLEY] GO CERAMIVAC 진공 텀블러/보틀 473ml",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2020/11/23/18a5303591f446e79b806945347e7473_20201123143211.jpg?width=500",
    price: 42000,
    score: 300,
  },
  {
    item_no: 552913,
    item_name: "LEXON 렉슨 MINA 미니 조명 - LH60",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2020/08/05/11ba8acd4ca645729666088309248920_20200805083231.jpg?width=500",
    price: 240000,
    score: 350,
  },
  {
    item_no: 1045738,
    item_name: "[STANLEY] 스탠리 클래식 포어 오버 커피 드리퍼 세트",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2021/04/13/88f7fc4808e3420a94bd3364276f7a46_20210413171920.jpg?width=500",
    price: 65000,
    score: 120,
    availableCoupon: false,
  },
  {
    item_no: 927850,
    item_name: "메이커스 투명케이스",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2020/12/14/3cfbcfb2cd5842939861b4add12397fe_20201214160430.jpg?width=500",
    price: 23000,
    score: 640,
  },
  {
    item_no: 661347,
    item_name: "카드 포켓 에어쿠션 투명 폰 케이스(아이폰 갤럭시 핸드폰)",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2020/10/14/eaddd1ba3d374a789a5084da0ea485d4_20201014205258.jpg?width=500",
    price: 37600,
    score: 200,
  },
  {
    item_no: 870160,
    item_name:
      "위키오 3in1 거치대형 무선충전기 아이폰, 갤럭시, 스마트워치, 무선이어폰 동시충전",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2021/01/21/af916f6191f24a84b076e74e613a4795_20210121114833.jpg?width=500",
    price: 39900,
    score: 190,
    availableCoupon: false,
  },
  {
    item_no: 995684,
    item_name: "FRAME CASE Air Bumper",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2021/02/24/8cba9f3ec5594042bf9abf83a5a2de29_20210224175633.jpg?width=500",
    price: 25000,
    score: 453,
  },
  {
    item_no: 1051973,
    item_name: "신지마운트 톡 탈부착 핸드폰 스마트톡 그립톡",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2020/11/23/82731cfe8a6a41d6a775556333432c93_20201123165022.jpg?width=500",
    price: 12900,
    score: 300,
    availableCoupon: false,
  },
  {
    item_no: 132527,
    item_name: "[STANLEY] 스탠리 클래식 진공 캠프머그 473미리",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2021/04/01/5c8a29b5a4f34e4eabee087a607a9365_20210401173056.jpg?width=500",
    price: 44000,
    score: 300,
  },
  {
    item_no: 652192,
    item_name: "신지루프 실리콘 핸드폰 핑거스트랩",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2020/11/16/a85c5f1ad3fd4daea71d74ab8384fabe_20201116130403.jpg?width=500",
    price: 5900,
    score: 150,
  },
  {
    item_no: 363559,
    item_name: "WOOD GLOVES",
    detail_image_url:
      "https://img.29cm.co.kr/next-product/2019/04/25/4fe7eda3069d4cdb867636faf36ad5a3_20190425135058.jpg?width=500",
    price: 3000,
    score: 220,
  },
];

export function getProducts() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(productItems);
    }, 1000);
  });
}
