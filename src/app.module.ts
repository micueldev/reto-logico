import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { PersonsModule } from './persons/infrastructure/persons.module';
import { EmailsModule } from './emails/infrastructure/emails.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
      exclude: ['/graphql'],
    }),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [],
      inject: [],
      useFactory: async () => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
      }),
    }),
    PersonsModule,
    EmailsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
