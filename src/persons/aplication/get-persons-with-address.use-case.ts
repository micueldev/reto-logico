import { Inject } from '@nestjs/common';
import { Person } from '../domain/person';
import { PERSON_REPOSITORY_ALIAS, PersonRepository } from '../domain/repositories/person.repository';

export class GetPersonsWithAddress {
	constructor(
		@Inject(PERSON_REPOSITORY_ALIAS) private readonly repository: PersonRepository
	) {	}

	async run(): Promise<Person[]> {
		let persons = await this.repository.getAll();

		persons = this.filterValidAddress(persons);

		persons = this.orderByName(persons);

		return persons;
	}

	private filterValidAddress (persons: Person[]): Person[]{
		return persons.filter((person)=>!!person.address)
	}

	private orderByName (persons: Person[]): Person[]{
		return persons.sort((a, b) => {
			if (a.name < b.name) {
			  return -1;
			} else if (a.name > b.name) {
			  return 1;
			} else {
			  return 0;
			}
		});
	}
}