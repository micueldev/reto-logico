import { PersonInterface } from "./interfaces/person.interface";
import { Friend } from "./friend";

export class Person implements PersonInterface {
    _id: string;
    index: number;
    guid: string;
    isActive: boolean;
    balance: string;
    picture: string;
    age: number;
    eyeColor: string;
    name: string;
    gender: string;
    company: string;
    email: string;
    phone: string;
    about: string;
    registered: string;
    latitude: number;
    longitude: number;
    tags: string[];
    friends: Friend[];
    greeting: string;
    favoriteFruit: string;
    address?: string;
}
