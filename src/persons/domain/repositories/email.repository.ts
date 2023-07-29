export const EMAIL_REPOSITORY_ALIAS = Symbol('EmailRepository-Person');

export interface EmailRepository {
	getAll(): Promise<string[]>;
}
