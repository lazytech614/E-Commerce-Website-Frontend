import p1_img from "/product_1.png";
import p2_img from "/product_2.png";
import p3_img from "/product_3.png";
import p4_img from "/product_4.png";

const data_copy = [
  {
    id: 1,
    name: "Casual Striped V-Neck Blouse",
    category: "women",
    image: p1_img,
    new_price: 1250.0,
    old_price: 1750.0,
    sizes: [
      { id: 1, size: "XS" },
      { id: 2, size: "S" },
      { id: 3, size: "M" },
      { id: 4, size: "L" },
      { id: 5, size: "XL" },
      { id: 6, size: "XXL" },
    ],
  },
  {
    id: 2,
    name: "Floral Print Wrap Dress",
    category: "women",
    image: p2_img,
    new_price: 1500.0,
    old_price: 1800.0,
    sizes: [
      { id: 1, size: "M" },
      { id: 2, size: "L" },
      { id: 3, size: "XL" },
      { id: 4, size: "XXL" },
    ],
  },
  {
    id: 3,
    name: "Polka Dot Peplum Top",
    category: "women",
    image: p3_img,
    new_price: 1350.0,
    old_price: 1950.0,
    sizes: [
      { id: 1, size: "XS" },
      { id: 2, size: "S" },
      { id: 3, size: "XXL" },
    ],
  },
  {
    id: 4,
    name: "Chiffon Ruffle Hem Blouse",
    category: "women",
    image: p4_img,
    new_price: 1450.0,
    old_price: 1750.0,
    sizes: [
      { id: 1, size: "S" },
      { id: 2, size: "M" },
      { id: 3, size: "L" },
    ],
  },
];

export default data_copy;
