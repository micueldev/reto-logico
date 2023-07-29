import { Person } from '../person';

export const PERSON_REPOSITORY_ALIAS = Symbol('PersonRepository');

export interface PersonRepository {
	getAll(): Promise<Person[]>;
}
