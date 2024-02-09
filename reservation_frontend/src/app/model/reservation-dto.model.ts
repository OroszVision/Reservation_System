import {Additional} from "./additional.model";

export interface ReservationDto {
  id?: number;
  name: string;
  arrival: Date;
  departure: Date;
  additionalIds: number[]; // Assuming you have an Additional model as well
}
