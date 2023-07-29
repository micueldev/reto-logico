import { Inject } from '@nestjs/common';
import { Person } from '../domain/person';
import { PERSON_REPOSITORY_ALIAS, PersonRepository } from '../domain/repositories/person.repository';
import { EMAIL_REPOSITORY_ALIAS, EmailRepository } from '../domain/repositories/email.repository';
import { Email } from 'src/shared/domain/email';

export class GetPersonsToSendEmail {
	constructor(
		@Inject(PERSON_REPOSITORY_ALIAS) private readonly repository: PersonRepository,
		@Inject(EMAIL_REPOSITORY_ALIAS) private readonly emailRepository: EmailRepository
	) { }

	async run(): Promise<Person[]> {
		const personsWithValidEmail = this.filterPersonsWithValidEmail(await this.repository.getAll());
		const validEmails = this.filterValidEmails(await this.emailRepository.getAll());
		
		return personsWithValidEmail.filter((person)=>validEmails.includes(person.email));
	}

	private filterValidEmails(emails:string[]): string[] {
		return emails.filter(Email.validate);
	}
	
	private filterPersonsWithValidEmail(persons:Person[]): Person[] {
		return persons.filter((person)=>Email.validate(person.email));
	}
}