import { GetPersonsRange } from 'src/persons/aplication/get-persons-range.use-case';
import { Person } from 'src/persons/domain/person';
import { PersonRepository } from 'src/persons/domain/repositories/person.repository';

describe('GetPersonsRange', () => {
	it('should return persons with age from 20 to 30 and the name start with H or L', async () => {
		const person1: Person = {name: 'Hittler dfdsf', age: 19} as Person;
		const person2: Person = {name: 'Hail Hydra', age: 21} as Person;
		const person3: Person = {name: 'Ishtar dsfds', age: 25} as Person;
		const person4: Person = {name: 'Luis Ddgdsf', age: 30} as Person;
		const person5: Person = {name: 'Luke Zdfggf', age: 31} as Person;
		const persons = [person1, person2, person3, person4, person5];

		const repository: Partial<PersonRepository> = {
			getAll: jest.fn().mockResolvedValueOnce(persons)
		}

		const getPersonsRange = new GetPersonsRange(repository as PersonRepository);
		const personsInRange = await getPersonsRange.run();

		expect(personsInRange).toEqual(expect.arrayContaining([person2, person4]));
		expect(repository.getAll).toBeCalledTimes(1);
	});
});