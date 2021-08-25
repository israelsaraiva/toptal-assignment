import { Role } from 'auth/enums/role.enum';
import { Restaurant } from 'components/restaurant/restaurant.entity';
import { User } from 'components/user/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword } from 'utils/functions';

export class createTestUsers1626893620941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.connection.getRepository(User);

    await userRepo.insert({
      name: 'Israel Saraiva',
      email: 'israelspm@gmail.com',
      password: hashPassword('123456'),
      roles: [Role.Admin]
    });

    await userRepo.insert({
      name: 'Juliana Saraiva',
      email: 'jsaraiva15@gmail.com',
      password: hashPassword('123456'),
      roles: [Role.User]
    });

    await userRepo.insert({
      name: 'Restaurant Owner',
      email: 'owner@restaurant.com',
      password: hashPassword('123456'),
      roles: [Role.RestaurantOwner]
    });

    const restaurantRepo = queryRunner.connection.getRepository(Restaurant);

    await restaurantRepo.insert([
      {
        name: 'Jansz',
        description:
          'Classics with a modern twist are the name of the game in this former apothecary’s shop with a canal view. Spread across a number of rooms boasting simple yet tasteful décor, there’s an understated elegance to everything here, from the food to the imported marble tabletops. Whether it’s the dover sole, hanger steak or lobster risotto, chef Jeroen Robberegt’s cooking is robust and flavourful, and while dinner is the real star, they also do a mean lunch and happily cater for kids.'
      },
      {
        name: 'De Kas',
        description:
          'If the finest, freshest produce, beautifully cooked, is what you’re after, then a trip to De Kas is a must. Tucked inside a set of greenhouses that date to 1926, they serve a fixed daily menu – you simply choose how many courses you want – prepared with vegetables and herbs grown in their own nursery. Their farm-to-table credentials are impeccable, and the dishes showcase each ingredient at its best.'
      },
      {
        name: 'Wilde Zwijnen',
        description:
          'The industrial, shabby-chic interior and ever-changing daily menu of modern Dutch cuisine have made the ‘Wild Boar’ a trendy (and increasingly popular) haunt in Oost. The idea is simple – choose three or four courses, order some wine, and let the kitchen work their magic with fresh, seasonal produce (do try the boar though). And if something a little lighter is required, head next door to their Eetbar, where they offer smaller, individual plates from just €7.'
      },
      {
        name: 'Sotto Pizza',
        description:
          'Surprisingly for a city with so many Italian restaurants, quality pizza used to be something of a rarity. Not any more. Delicate dough with a perfectly charred crust, sauces made with San Marzano tomatoes, and gooey puddles of Buffalo mozzarella have given way to two further branches and membership of the prestigious Associazione Verace Pizza Napoletana – one of only two pizzerias in the country to be accepted. Pizza doesn’t get much better than this.'
      },
      {
        name: 'Stork',
        description:
          'There are few better places to get stuck into fresh fish and seafood than Stork, a cavernous, south-facing space on the banks of the River IJ. A free ferry shuttles you across the water to Noord and this former factory that now serves up whole lobster, oysters, ‘catch of the day’ specials and a sumptuous seafood platter. If it’s sunny, order some ice-cold white wine, grab a spot on the terrace, and watch the river traffic bustle back and forth.'
      }
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
