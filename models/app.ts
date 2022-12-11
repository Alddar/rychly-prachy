import { DateTime } from "luxon";
import {LatLngExpression} from "leaflet";

export interface Provider extends Person {
    name: string;
    rating: number;
}

export enum OfferStatus {
    FREE = "free",
    TAKEN = "taken",
    COMPLETED = "completed",
}

export interface OfferRating {
    score: number;
    comment: string;
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
    ownerId: string;
    status: OfferStatus;
    interested?: User;
    rating?: OfferRating;
    address?: string;
}

export class Address {
    street: string;
    city: string;
    postCode: string;

    constructor(street: string, city: string, postCode: string) {
        this.street = street;
        this.city = city;
        this.postCode = postCode;
    }
}

export interface Person {
    id: string;
    email: string
    phone: string
    address: Address
}

export class User implements Person {
    password: string;
    address: Address;
    email: string;
    id: string;
    phone: string;

    constructor(id: string, email: string, password: string, phone: string, address: Address) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
    }
}