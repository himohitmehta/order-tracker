import { faker } from "@faker-js/faker";
export function createRandomUser() {
  return {
    // userId: faker.string.uuid(),
    username: faker.internet.userName(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    avatar: faker.image.urlPicsumPhotos(),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()}, ${faker.location.country()} - ${faker.location.zipCode()}`,
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 100,
});
