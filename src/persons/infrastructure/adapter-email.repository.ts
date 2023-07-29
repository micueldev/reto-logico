import { Inject } from '@nestjs/common';
import { EmailRepository } from '../domain/repositories/email.repository';

import { EMAIL_REPOSITORY_ALIAS, EmailRepository as ExternalEmailRepository } from 'src/emails/domain/repositories/email.repository';

export class AdapterEmailRepository implements EmailRepository{
    constructor(
        @Inject(EMAIL_REPOSITORY_ALIAS) private readonly externalRepository: ExternalEmailRepository
    ) { }
    
    async getAll(): Promise<string[]> {
        return this.externalRepository.getAll();
    }
}