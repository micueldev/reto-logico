import { GetPersonsToSendEmail } from 'src/persons/aplication/get-persons-to-send-email.use-case';
import { Person } from 'src/persons/domain/person';
import { PersonRepository } from 'src/persons/domain/repositories/person.repository';
import { EmailRepository } from 'src/persons/domain/repositories/email.repository';

describe('GetPersonsToSendEmail', () => {
	it('should return persons that we can send email', async () => {
		const person1: Person = {email: "luisdsds@hotmail.com"} as Person;
		const person2: Person = {email: "fdfdfs@hotmail.com"} as Person;
		const person3: Person = {email: "fgdg.com"} as Person;
		const person4: Person = {email: "aasxvc@google.com"} as Person;
		const person5: Person = {email: "dsfsdf@fdfd"} as Person;
		const persons = [person1, person2, person3, person4, person5];

		const repository: Partial<PersonRepository> = {
			getAll: jest.fn().mockResolvedValueOnce(persons)
		}

		const email1 = person2.email;
		const email2 = 'ghfghfgh@.com';
		const email3 = person1.email;
		const email4 = person5.email;
		const emails = [email1, email2, email3, email4];

		const emailRepository: Partial<EmailRepository> = {
			getAll: jest.fn().mockResolvedValueOnce(emails)
		}

		const getPersonsToSendEmail = new GetPersonsToSendEmail(repository as PersonRepository, emailRepository as EmailRepository);
		const personsToSendEmail = await getPersonsToSendEmail.run();

		expect(personsToSendEmail).toEqual(expect.arrayContaining([person1, person2]));
		expect(repository.getAll).toBeCalledTimes(1);
		expect(emailRepository.getAll).toBeCalledTimes(1);
	});
});