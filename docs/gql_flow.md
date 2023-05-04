# What is GraphQL?

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

You can learn more about it [here](https://graphql.org/).

# Code Generation

We use graphql code generator to generate TypeScript types for our GraphQL schema. This allows us to have type safety when writing our resolvers.

The output is stored in `graphql/generated/graphql.ts`.

To run, make sure you are in the root directory of the project and run the following command:

```
yarn gql:gen
```

# Defining a schema

The schema is located in `graphql/schema`. This is where you define your GraphQL schema. It consists of `*.gql` files that that define necessary types and inputs as well as related queries and mutations.


# How to write a resolver

All resolvers are located in `graphql/resolvers`. Follow the existing resolvers as a guide.

Ideally, we want each resolver to call on a service function that is located in `services/`. This allows us to keep our resolvers clean and simple, reuse the service functions in other resolvers, and maintain testable code.

Make sure to include your resolver in `graphql/resolvers/index.ts` so that it gets exported.


