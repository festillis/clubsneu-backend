import { createSchema } from 'graphql-yoga';
import fastify from 'fastify';
import getResolvers from './resolvers';
import { createConfiguredYoga } from './utils/yoga';
import getTypeDefs from './schema';
import { startServer } from './utils';

const server = fastify({ logger: true });

export const log = (obj: unknown, msg?: string, ...args: Array<unknown>) => {
  server.log.info(obj, msg, ...args);
};

const main = () => {
  const schema = createSchema({
    typeDefs: getTypeDefs(),
    resolvers: getResolvers()
  });
  const yoga = createConfiguredYoga(server, schema);

  startServer(server, yoga);
};

main();
