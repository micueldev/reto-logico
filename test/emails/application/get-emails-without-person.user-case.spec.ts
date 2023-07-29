import { EmailRepository } from 'src/emails/domain/repositories/email.repository';
import { PersonRepository } from 'src/emails/domain/repositories/person.repository';
import { GetEmailsWithoutPerson } from "src/emails/application/get-emails-without-person.user-case";
import { Person } from 'src/emails/domain/person';

describe('GetEmailsWithoutPerson', () => {
	it('should return emails that do not exist in persons', async () => {

		const email1 = 'fdfdfs@hotmail.com';
		const email2 = 'ghfghfgh@.com';
		const email3 = 'asdsdsda@gmail.com';
		const email4 = 'aasxvc@google.com';
		const emails = [email1, email2, email3, email4];

		const repository: Partial<EmailRepository> = {
			getAll: jest.fn().mockResolvedValueOnce(emails)
		}

		const person1: Person = {email: email3} as Person;
		const person2: Person = {email: null} as Person;
		const person3: Person = {email: 'fsdfsdfdfsdf@fdfdsf.com.xy'} as Person;
		const person4: Person = {email: 'asdcvcxvcxvcxv@bvvcbcvb.com.xy'} as Person;
		const persons = [person1, person2, person3, person4];

		const personRepository: Partial<PersonRepository> = {
			getAll: jest.fn().mockResolvedValueOnce(persons)
		}

		const getEmailsWithoutPerson = new GetEmailsWithoutPerson(repository as EmailRepository, personRepository as PersonRepository);
		const emailsWithoutPerson = await getEmailsWithoutPerson.run();

		expect(emailsWithoutPerson).toEqual(expect.arrayContaining([email1, email4]));
		expect(repository.getAll).toBeCalledTimes(1);
		expect(personRepository.getAll).toBeCalledTimes(1);
	});
});