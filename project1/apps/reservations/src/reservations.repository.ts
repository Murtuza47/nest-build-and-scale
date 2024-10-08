import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from '@app/common';
import { ReservationDocument } from "./model/reservation.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ReservationsRespository extends AbstractRepository<ReservationDocument> {
  protected readonly logger: Logger = new Logger(ReservationDocument.name);

  constructor(
    @InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>
  ){
    super(reservationModel);
  }
}