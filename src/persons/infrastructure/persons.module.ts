import { Module, forwardRef } from '@nestjs/common';
import { UsesCases } from '../aplication';
import { PersonsResolver } from './persons.resolver';
import { PERSON_REPOSITORY_ALIAS } from '../domain/repositories/person.repository'
import { EMAIL_REPOSITORY_ALIAS } from '../domain/repositories/email.repository'
import { FilePersonRepository } from './file-person.repository'
import { AdapterEmailRepository } from './adapter-email.repository';
import { EmailsModule } from 'src/emails/infrastructure/emails.module';

@Module({
  imports: [forwardRef(() => EmailsModule)],
  providers: [
    PersonsResolver,
    ...UsesCases,
    {
      provide: PERSON_REPOSITORY_ALIAS,
      useClass: FilePersonRepository,
    },
    {
      provide: EMAIL_REPOSITORY_ALIAS,
      useClass: AdapterEmailRepository,
    },
  ],
  exports: [PERSON_REPOSITORY_ALIAS]
})
export class PersonsModule {}
