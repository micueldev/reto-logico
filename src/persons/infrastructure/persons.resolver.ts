import { Resolver, Query } from '@nestjs/graphql';
import { PersonDto } from './dto/person.dto';

import { GetPersonsWithAddress } from '../aplication/get-persons-with-address.use-case';
import { GetPersonsRange } from '../aplication/get-persons-range.use-case';
import { GetPersonsToSendEmail } from '../aplication/get-persons-to-send-email.use-case';

@Resolver(() => PersonDto)
export class PersonsResolver {
  constructor(
    private readonly getPersonsWithAddress: GetPersonsWithAddress,
    private readonly getPersonsRange: GetPersonsRange,
    private readonly getPersonsToSendEmail: GetPersonsToSendEmail
  ) {}

  @Query(() => [PersonDto], { name: 'getAllPersonsWithAddress' })
  async getAllWithAddress() {
    const persons = await this.getPersonsWithAddress.run();
    return persons.map((person)=>person as PersonDto);
  }

  @Query(() => [PersonDto], { name: 'getAllPersonsInRange' })
  async getAllInRange() {
    const persons = await this.getPersonsRange.run();
    return persons.map((person)=>person as PersonDto);
  }

  @Query(() => [PersonDto], { name: 'getAllPersonsToSendEmail' })
  async getAllToSendEmail() {
    const persons = await this.getPersonsToSendEmail.run();
    return persons.map((person)=>person as PersonDto);
  }
}
