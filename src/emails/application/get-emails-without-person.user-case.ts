import { Inject } from '@nestjs/common';
import { Email } from 'src/shared/domain/email';
import { Person } from '../domain/person';
import { EMAIL_REPOSITORY_ALIAS, EmailRepository } from '../domain/repositories/email.repository';
import { PERSON_REPOSITORY_ALIAS, PersonRepository } from '../domain/repositories/person.repository';

export class GetEmailsWithoutPerson {
	constructor(
        @Inject(EMAIL_REPOSITORY_ALIAS) private readonly repository: EmailRepository,
        @Inject(PERSON_REPOSITORY_ALIAS) private readonly personRepository: PersonRepository
    ) {	}

	async run(): Promise<string[]> {
		const validEmails = this.filterValidEmails(await this.repository.getAll());
		const personsWithValidEmail = this.filterPersonsWithValidEmail(await this.personRepository.getAll());

		return validEmails.filter((email)=>!personsWithValidEmail.some((person) => person.email === email));
	}

	private filterValidEmails(emails:string[]): string[] {
		return emails.filter(Email.validate);
	}
	
	private filterPersonsWithValidEmail(persons:Person[]): Person[] {
		return persons.filter((person)=>Email.validate(person.email));
	}
}