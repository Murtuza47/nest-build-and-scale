import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestJSConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';

const validationSchema = Joi.object({
  MONGODB_URI: Joi.string().required(),
});

@Module({
  imports: [
    NestJSConfigModule.forRoot({
      validationSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
