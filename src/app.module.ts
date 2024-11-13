// import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AdModule } from './modules/ad/ad.module';
import { Ad } from './modules/ad/ad.entity';
import { AdImage } from './modules/ad_image/ad_image.entity';
import { AdMetadata } from './modules/ad_metadata/ad_metadata.entity';
import { User } from './modules/user/user.entity';
@Module({
  imports: [
    SequelizeModule.forRoot({
      autoLoadModels: true, // Automatically load models
      synchronize: true, // Synchronize models with the database - Not for production
      sync: { alter: true }, // Alter tables to fit models - Not for production
      dialect: 'mariadb', // Specify our database type
      host: 'localhost', // Database host
      port: 3308, // Database port
      username: 'root', // Database username
      password: 'root', // Database password
      database: 'agency', // Database name
      dialectOptions : {
        connectTimeout : 30000
      },
      models : [Ad, AdImage, AdMetadata, User]
    }),
    UserModule,
    AdModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
