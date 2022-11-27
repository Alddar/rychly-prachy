import { DateTime } from "luxon";
import { User } from "./user";
import {LatLngExpression} from "leaflet";

export interface Offer {
    id: number;
    title: string;
    description: string;
    requirements: string[];
    location: string;
    price: number; // czk / h
    duration: number; // hours
    position: LatLngExpression
    distance: number;
    date: DateTime;
    ownerId: number;
}
