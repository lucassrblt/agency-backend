import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ad } from './modules/ad/ad.entity';
import { AdImage } from './modules/ad_image/ad_image.entity';
import { AdMetadata } from './modules/ad_metadata/ad_metadata.entity';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { AdModule } from './modules/ad/ad.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('DB_HOST'),
        port: 3306,
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
        sync: { alter: true },
        dialectOptions: {
          connectTimeout: 30000
        },
        models: [Ad, AdImage, AdMetadata, User]
      }),
    }),
    UserModule,
    AdModule,
  ],
})
export class AppModule {}