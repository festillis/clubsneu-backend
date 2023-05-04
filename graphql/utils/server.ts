import { FastifyInstance } from 'fastify';
import { YogaInstance } from './yoga';
import { loadEnv } from '../../utils';

loadEnv();

export type Server = FastifyInstance;

const setupYoga = (server: Server, yoga: YogaInstance) => {
  server.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      const response = await yoga.handleNodeRequest(req, {
        req,
        reply
      });
      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });
      reply.status(response.status);
      reply.send(response.body);

      return reply;
    }
  });
};

const startServer = (server: Server, yoga: YogaInstance) => {
  setupYoga(server, yoga);
  server.listen({ port: parseInt(process.env.GRAPHQL_PORT) }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log(`GraphQL Server is listening on ${process.env.GRAPHQL_ENDPOINT}`);
  });
};

export default startServer;
