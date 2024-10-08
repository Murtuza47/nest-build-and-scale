import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Prop()
  timestamp: Date;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: String;

  @Prop()
  placeId: String;  

  @Prop()
  invocieId: String;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument);
