import {Additional} from "./additional.model";

export interface Reservation {
  id?: number;
  name: string;
  arrival: Date;
  departure: Date;
  additionals?: Additional[]; // Assuming you have an Additional model as well
}
