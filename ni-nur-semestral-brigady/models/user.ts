export interface User {
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