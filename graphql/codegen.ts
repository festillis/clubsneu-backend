import type { CodegenConfig } from '@graphql-codegen/cli';
import { join } from 'path';

const config: CodegenConfig = {
  schema: join(__dirname, './schema/*.gql'),
  overwrite: true,
  generates: {
    [join(__dirname, './generated/graphql.ts')]: {
      plugins: ['typescript', 'typescript-resolvers']
    }
  },
  config: {
    arrayInputCoercion: false,
    maybeValue: 'T | undefined',
    namingConvention: {
      enumValues: 'keep'
    }
  }
};
export default config;
