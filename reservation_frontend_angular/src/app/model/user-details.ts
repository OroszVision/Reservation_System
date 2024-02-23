import {Reservation} from "./reservation.model";

export interface UserDetails {
  id: number;
  username: string;
  reservations: Reservation[];
}
