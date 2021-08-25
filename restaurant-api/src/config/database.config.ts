import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormConfig from './ormconfig';

export default function DatabaseOrmModule() {
  return TypeOrmModule.forRootAsync({
    useFactory: (config: ConfigService) =>
      ({
        ...ormConfig,
        ...{
          database: config.get('DATABASE_NAME'),
          username: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASSWORD')
        }
      } as any),
    inject: [ConfigService]
  });
}
