import { YogaLogger } from 'graphql-yoga';
import { Server } from './server';

export type Logger = YogaLogger;

const createLogging = (server: Server): Logger => ({
  debug: (...args) => args.forEach((arg) => server.log.debug(arg)),
  info: (...args) => args.forEach((arg) => server.log.info(arg)),
  warn: (...args) => args.forEach((arg) => server.log.warn(arg)),
  error: (...args) => args.forEach((arg) => server.log.error(arg))
});

export default createLogging;
