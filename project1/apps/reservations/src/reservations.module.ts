import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRespository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './model/reservation.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGODB_URI: Joi.string().required(),
});
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    })
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRespository],
})
export class ReservationsModule {}
