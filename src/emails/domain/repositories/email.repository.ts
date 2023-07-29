export const EMAIL_REPOSITORY_ALIAS = Symbol('EmailRepository');

export interface EmailRepository {
	getAll(): Promise<string[]>;
}
