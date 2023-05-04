// import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { GraphQLSchemaWithContext, YogaServerInstance, createYoga } from 'graphql-yoga';
import createContext, { GraphQLContext } from './context';
import createLogging from './logging';

export type YogaInstance = YogaServerInstance<
  {
    req: FastifyRequest;
    reply: FastifyReply;
  },
  GraphQLContext
>;

export const createConfiguredYoga = (
  server: FastifyInstance,
  schema: GraphQLSchemaWithContext<GraphQLContext>
) => {
  return createYoga({
    context: createContext,
    logging: createLogging(server),
    schema
  });
};
