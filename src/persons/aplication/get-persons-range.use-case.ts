import { Inject } from '@nestjs/common';
import { Person } from '../domain/person';
import { PERSON_REPOSITORY_ALIAS, PersonRepository } from '../domain/repositories/person.repository';

export class GetPersonsRange {
	constructor(
		@Inject(PERSON_REPOSITORY_ALIAS) private readonly repository: PersonRepository
	) { }

	async run(): Promise<Person[]> {
		let persons = await this.repository.getAll();

		persons = this.filterAgeFromRange(persons, 20, 30);

		persons = this.filterNameWithStartingLetters(persons, ['h', 'l']);

		return persons;
	}

	private filterAgeFromRange(persons: Person[], from: number, to: number): Person[]{
		return persons.filter((person)=>(person.age>=from && person.age<=to));
	}

	private filterNameWithStartingLetters(persons: Person[], letters: string[]): Person[]{
		return persons.filter((person)=>(new RegExp(`^[${letters.join("")}]`, "i")).test(person.name));
	}
}