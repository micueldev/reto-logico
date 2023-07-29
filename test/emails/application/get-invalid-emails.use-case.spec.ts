import { EmailRepository } from 'src/emails/domain/repositories/email.repository';
import { GetInvalidEmails } from "src/emails/application/get-invalid-emails.use-case";

describe('GetInvalidEmails', () => {
	it('should return invalid emails', async () => {

		const email1 = '@hotmail.com';
		const email2 = 'ghfghfgh@.com';
		const email3 = 'asdsdsda@gmail.com';
		const email4 = 'aasxvc@google.com';
		const email5 = 'ddfds@google';
		const emails = [email1, email2, email3, email4, email5];

		const repository: Partial<EmailRepository> = {
			getAll: jest.fn().mockResolvedValueOnce(emails)
		}

		const getInvalidEmails = new GetInvalidEmails(repository as EmailRepository);
		const invalidEmails = await getInvalidEmails.run();

		expect(invalidEmails).toEqual(expect.arrayContaining([email1, email2, email5]));
		expect(repository.getAll).toBeCalledTimes(1);
	});
});