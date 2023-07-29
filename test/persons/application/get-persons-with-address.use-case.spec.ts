import { GetPersonsWithAddress } from 'src/persons/aplication/get-persons-with-address.use-case';
import { Person } from 'src/persons/domain/person';
import { PersonRepository } from 'src/persons/domain/repositories/person.repository';

describe('GetPersonsWithAddress', () => {
	it('should return ordened persons with address', async () => {
		const person1: Person = {name: 'Cdfdf'} as Person;
		const person2: Person = {name: 'Fghgh', address: null} as Person;
		const person3: Person = {name: 'Afgdfgdfg', address: "gdfgdf"} as Person;
		const person4: Person = {name: 'Zgfhghf', address: "cvcvxv"} as Person;
		const person5: Person = {name: 'Luke Zdfggf', address: "oipo"} as Person;
		const persons = [person1, person2, person3, person4, person5];

		const repository: Partial<PersonRepository> = {
			getAll: jest.fn().mockResolvedValueOnce(persons)
		}

		const getPersonsWithAddress = new GetPersonsWithAddress(repository as PersonRepository);
		const personsWithAddress = await getPersonsWithAddress.run();

		expect(personsWithAddress).toEqual([person3, person5, person4]);
		expect(repository.getAll).toBeCalledTimes(1);
	});
});