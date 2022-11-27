import {Offer} from "./offer";
import {User} from "./user";
import {DateTime} from "luxon";
import {LatLngExpression} from "leaflet";
import {name} from "next/dist/telemetry/ci-info";

function getRandomFloat(min: number, max: number, decimals: number) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
}

function generatePraguePosition(): LatLngExpression {
    return [getRandomFloat(49.95, 50.10, 6),
        getRandomFloat(14.30, 14.60, 6)];
}

const userDatabase: User[] = [
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

const offerDatabase: Offer[] = [
    {
        id: 1,
        title: "Sekání trávy",
        description:
            "Potřebuju posekat trávu na pozemku o velkosti 20m x 10m. Spěchá!",
        requirements: ["Znalost práce se sekačkou"],
        location: "Praha",
        distance: 3,
        date: DateTime.local(2022, 5, 12, 16, 30),
        position: generatePraguePosition(),
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
        date: DateTime.local(2022, 5, 12, 16, 30),
        position: generatePraguePosition(),
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
        date: DateTime.local(2022, 5, 15, 16, 30),
        position: generatePraguePosition(),
        price: 90,
        duration: 3,
        ownerId: 1
    }
]


export function getUser(id: number): User {
    return userDatabase.find((x) => x.id == id) ?? userDatabase[0]
}

export function getOffer(id: number): Offer {
    return offerDatabase.find((x) => x.id == id) ?? offerDatabase[0]
}