import * as emailsData from '../../../data/emails.json';

import { EmailRepository } from '../domain/repositories/email.repository';

export class FileEmailRepository implements EmailRepository{

    private emails: string[];

    constructor() {
        this.emails = emailsData;
    }
    
    async getAll(): Promise<string[]> {
        return this.emails;
    }
}