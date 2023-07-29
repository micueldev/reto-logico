import { Resolver, Query} from '@nestjs/graphql';
import { GetInvalidEmails } from '../application/get-invalid-emails.use-case';
import { GetEmailsWithoutPerson } from '../application/get-emails-without-person.user-case';

@Resolver(() => String)
export class EmailsResolver {
  constructor(
    private readonly getInvalidEmails: GetInvalidEmails,
    private readonly getEmailsWithoutPerson: GetEmailsWithoutPerson,
  ) {}

  @Query(() => [String], { name: 'getInvalidEmails' })
  getAllInvalidEmails() {
    return this.getInvalidEmails.run();
  }

  @Query(() => [String], { name: 'getEmailsWithoutPerson' })
  getAllEmailsWithoutPerson() {
    return this.getEmailsWithoutPerson.run();
  }
}
