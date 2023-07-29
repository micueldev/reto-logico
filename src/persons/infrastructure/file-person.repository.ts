import * as personsData from './../../../data/persons.json';

import { PersonRepository } from '../domain/repositories/person.repository';
import { PersonInterface } from '../domain/interfaces/person.interface';
import { Person } from '../domain/person';

export class FilePersonRepository implements PersonRepository{

    private persons: Person[];

    constructor() {
        this.persons = personsData.map((personData: PersonInterface) => personData as Person);
    }
    
    async getAll(): Promise<Person[]> {
        return this.persons;
    }
}