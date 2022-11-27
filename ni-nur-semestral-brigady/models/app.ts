import { DateTime } from "luxon";
import {LatLngExpression} from "leaflet";

export interface Provider {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        postCode: string;
    }
    rating: number;
}

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

export interface User {
    name: string
}