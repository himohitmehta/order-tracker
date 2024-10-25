import { faker } from "@faker-js/faker";
export function createRandomProducts() {
  return {
    // userId: faker.string.uuid(),

    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),

    // imageUrl: faker.image.urlLoremFlickr({
    //   category: "books",
    // }),
  };
}

