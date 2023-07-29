import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { PersonInterface } from 'src/persons/domain/interfaces/person.interface';
import { FriendInterface } from 'src/persons/domain/interfaces/friend.interface';

@ObjectType()
export class PersonDto implements PersonInterface {
  @Field(() => String)
  _id: string;

  @Field(() => Int)
  index: number;

  @Field(() => String)
  guid: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => String)
  balance: string;

  @Field(() => String)
  picture: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  eyeColor: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  company: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  about: string;

  @Field(() => String)
  registered: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => [String])
  tags: string[];

  @Field(() => [FriendDto])
  friends: FriendDto[];

  @Field(() => String)
  greeting: string;

  @Field(() => String)
  favoriteFruit: string;

  @Field(() => String, {nullable: true})
  address?: string | null;
}

@ObjectType()
export class FriendDto implements FriendInterface {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
