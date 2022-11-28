import {DateTime} from "luxon";
import {LatLngExpression} from "leaflet";
import {Address, Offer, OfferStatus, Provider, User} from "../models/app";
import {v4 as uuidv4} from 'uuid';

function getRandomFloat(min: number, max: number, decimals: number) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
}

function generatePraguePosition(): LatLngExpression {
    return [getRandomFloat(49.95, 50.10, 6),
        getRandomFloat(14.30, 14.60, 6)];
}

export const userList: User[] = [
    new User(
        uuidv4(),
        "admin",
        "admin",
        "+420 987 654 321",
        new Address("Thákurova 9", "Praha", "160 00")
    )
]

export const providerList: Provider[] = [
    {
        id: uuidv4(),
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
        id: uuidv4(),
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
        id: uuidv4(),
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
        ownerId: providerList[0].id,
        status: OfferStatus.TAKEN,
        interested: userList[0]
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
        ownerId: providerList[2].id,
        status: OfferStatus.COMPLETED,
        interested: userList[0]
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
        ownerId: providerList[1].id,
        status: OfferStatus.FREE,
    },
    {
        id: 4,
        title: "Rozvoz novin",
        description:
            "Potřebuju někoho rozvoz novin, ihned",
        requirements: ["Vlastní dopravní prostředek"],
        location: "Praha",
        distance: 7,
        date: DateTime.local(2023, 1, 10, 10, 30),
        position: [50.023486, 14.325756],
        price: 100,
        duration: 2,
        ownerId: providerList[1].id,
        status: OfferStatus.FREE,
    },
    {
        id: 5,
        title: "Prodavač stěračů do ponorek",
        description:
            "Potřebuju někoho na záskok ve stánku s prodejem stěračů do ponorek.",
        requirements: ["Silnou morálku"],
        location: "Praha",
        distance: 10,
        date: DateTime.local(2023, 1, 20, 9, 30),
        position: [50.034561, 14.418539],
        price: 200,
        duration: 8,
        ownerId: providerList[0].id,
        status: OfferStatus.FREE,
    },
    {
        id: 6,
        title: "Prodavač bublifuků",
        description:
            "Potřebuju někoho na záskok ve stánku s prodejem bublifuků",
        requirements: ["Silné plíce"],
        location: "Praha",
        distance: 7,
        date: DateTime.local(2022, 12, 24, 1, 30),
        position: [50.01953, 14.598671],
        price: 90,
        duration: 4,
        ownerId: providerList[0].id,
        status: OfferStatus.FREE,
    },
    {
        id: 7,
        title: "Stavba plotu",
        description:
            "Potřebuju postavit plot okolo svého pozemku kvůli migrantům, spěchá!",
        requirements: ["Silné plíce"],
        location: "Praha",
        distance: 15,
        date: DateTime.local(2022, 12, 2, 1, 30),
        position: [50.046887, 14.599818],
        price: 95,
        duration: 4,
        ownerId: providerList[0].id,
        status: OfferStatus.FREE,
    }
]


export function getProvider(providerList: Provider[], id: string): Provider {
    return providerList.find((x) => x.id === id) ?? providerList[0]
}

export function getOffer(offerList: Offer[], id: number): Offer {
    return offerList.find((x) => x.id === id) ?? offerList[0]
}