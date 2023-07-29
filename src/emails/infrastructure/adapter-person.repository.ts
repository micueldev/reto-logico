import { Inject } from '@nestjs/common';
import { PersonRepository } from '../domain/repositories/person.repository';
import { Person } from '../domain/person';

import { PERSON_REPOSITORY_ALIAS, PersonRepository as ExternalPersonRepository } from 'src/persons/domain/repositories/person.repository';

export class AdapterPersonRepository implements PersonRepository {

    constructor(
        @Inject(PERSON_REPOSITORY_ALIAS) private readonly externalRepository: ExternalPersonRepository
    ) {
	}
    
    async getAll(): Promise<Person[]> {
        const externalPersons = await this.externalRepository.getAll();
        return externalPersons.map(({_id, name, email})=>({_id, name, email} as Person));
    }
}