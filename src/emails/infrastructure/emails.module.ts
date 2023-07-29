import { Module, forwardRef } from '@nestjs/common';
import { EmailsResolver } from './emails.resolver';
import { UsesCases } from '../application';
import { FileEmailRepository } from './file-email.repository';
import { AdapterPersonRepository } from './adapter-person.repository';
import { EMAIL_REPOSITORY_ALIAS } from '../domain/repositories/email.repository';
import { PERSON_REPOSITORY_ALIAS } from '../domain/repositories/person.repository';
import { PersonsModule } from 'src/persons/infrastructure/persons.module';

@Module({
  imports: [forwardRef(() => PersonsModule)],
  providers: [
    EmailsResolver,
    ...UsesCases,
    {
      provide: EMAIL_REPOSITORY_ALIAS,
      useClass: FileEmailRepository,
    },
    {
      provide: PERSON_REPOSITORY_ALIAS,
      useClass: AdapterPersonRepository,
    }
  ],
  exports: [EMAIL_REPOSITORY_ALIAS]
})
export class EmailsModule {}
