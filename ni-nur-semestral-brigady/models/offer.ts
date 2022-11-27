import { DateTime } from "luxon";

export interface Offer {
    title: string;
    description: string;
    requirements: string[];
    location: string;
    price: number; // czk / h
    duration: number; // hours
    distance: number;
    date: DateTime;
}
