import { DateTimeResolver, VoidResolver } from 'graphql-scalars';
import { Resolver, Resolvers } from '../generated/graphql';
import { GraphQLContext } from '../utils/context';
import userResolvers from './user';
import testResolvers from './test';
import verificationCodeResolvers from './verification_code';

export type Res<TResult, TArgs = object> = Resolver<TResult, unknown, GraphQLContext, TArgs>;
export type AuthRes<TResult, TArgs = object> = Res<TResult, TArgs>;

const getResolvers = (): Resolvers<GraphQLContext> => {
  return {
    // Upload: {},
    // Subscription: {}
    Query: {
      user: userResolvers.user
    },
    Mutation: {
      createUser: userResolvers.createUser,
      setVerificationCode: verificationCodeResolvers.setVerificationCode,
      testAuthContext: testResolvers.testAuthContext,
      verifyCode: verificationCodeResolvers.verifyCode
    },
    DateTime: DateTimeResolver,
    Void: VoidResolver
  };
};

export default getResolvers;
