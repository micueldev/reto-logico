import { Inject } from '@nestjs/common';
import { Email } from 'src/shared/domain/email';
import { EMAIL_REPOSITORY_ALIAS, EmailRepository } from '../domain/repositories/email.repository';

export class GetInvalidEmails {
	constructor(
		@Inject(EMAIL_REPOSITORY_ALIAS) private readonly repository: EmailRepository,
	) {	}

	async run(): Promise<string[]> {
		const emails = await this.repository.getAll();

		return this.filterInvalidEmails(emails);
	}

	private filterInvalidEmails(emails:string[]): string[] {
		return emails.filter((string)=>!Email.validate(string));
	}
}