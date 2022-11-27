import {DateTime} from "luxon";
import {LatLngExpression} from "leaflet";
import { Offer, Provider } from "../models/app";

function getRandomFloat(min: number, max: number, decimals: number) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
}

function generatePraguePosition(): LatLngExpression {
    return [getRandomFloat(49.95, 50.10, 6),
        getRandomFloat(14.30, 14.60, 6)];
}

export const providerList: Provider[] = [
    {
        id: 1,
        name: "Jan Novák",
        email: "jan@novak.cz",
        phone: "+420 721 345 897",
        address: {
            street: "U Bořislavky 3",
            city: "Praha",
            postCode: "160 00",
        },
        rating: 3.9
    },
    {
        id: 2,
        name: "Václav Nejedlý",
        email: "vasicek1969@seznam.cz",
        phone: "+420 416 741 206",
        address: {
            street: "Na Příkopech 22",
            city: "Praha",
            postCode: "151 00",
        },
        rating: 4.5
    },
    {
        id: 3,
        name: "Evžena Lakatoška",
        email: "lakatoska@seznam.cz",
        phone: "+420 733 741 098",
        address: {
            street: "Na Petřinách 58",
            city: "Praha",
            postCode: "162 00",
        },
        rating: 2.7
    }
]

export const offerList: Offer[] = [
    {
        id: 1,
        title: "Sekání trávy",
        description:
            "Potřebuju posekat trávu na pozemku o velkosti 20m x 10m. Spěchá!",
        requirements: ["Znalost práce se sekačkou"],
        location: "Praha",
        distance: 3,
        date: DateTime.local(2022, 5, 12, 16, 30),
        position: [50.026372, 14.517759],
        price: 500,
        duration: 2,
        ownerId: 1
    },
    {
        id: 2,
        title: "Hlídání dětí",
        description:
            "Potřebuju pohlídat děti, ale jakože co nejdřív, už mě fakt štvou.",
        requirements: ["Zdravý selský rozum", "Znalost dětí", "Nebýt čorka"],
        location: "Praha",
        distance: 10,
        date: DateTime.local(2022, 12, 20, 12, 0),
        position: [50.020514, 14.499634],
        price: 100,
        duration: 6,
        ownerId: 3
    },
    {
        id: 3,
        title: "Házení lopatou",
        description:
            "Potřebuju někoho na přeházení uhlí, které mi přivezou",
        requirements: ["Výdrž", "Mozek", "Nebýt čorka"],
        location: "Praha",
        distance: 10,
        date: DateTime.local(2023, 1, 20, 10, 30),
        position: [50.051647, 14.479273],
        price: 90,
        duration: 3,
        ownerId: 1
    }
]


export function getProvider(providerList: Provider[], id: number): Provider {
    return providerList.find((x) => x.id == id) ?? providerList[0]
}

export function getOffer(offerList: Offer[], id: number): Offer {
    return offerList.find((x) => x.id == id) ?? offerList[0]
}