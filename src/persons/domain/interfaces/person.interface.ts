import { FriendInterface } from "./friend.interface";

export interface PersonInterface {
    _id:           string;
    index:         number;
    guid:          string;
    isActive:      boolean;
    balance:       string;
    picture:       string;
    age:           number;
    eyeColor:      string;
    name:          string;
    gender:        string;
    company:       string;
    email:         string;
    phone:         string;
    about:         string;
    registered:    string;
    latitude:      number;
    longitude:     number;
    tags:          string[];
    friends:       FriendInterface[];
    greeting:      string;
    favoriteFruit: string;
    address?:      string | null;
}
