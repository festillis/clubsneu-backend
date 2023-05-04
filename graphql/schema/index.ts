import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { DateTimeTypeDefinition, VoidTypeDefinition } from 'graphql-scalars';

const getTypeDefs = () => {
  const localTypeDefs = loadSchemaSync('*.gql', {
    cwd: __dirname,
    assumeValid: true,
    assumeValidSDL: true,
    skipGraphQLImport: true,
    loaders: [new GraphQLFileLoader()]
  });
  const scalarTypeDefs = [DateTimeTypeDefinition, VoidTypeDefinition];

  return [localTypeDefs, ...scalarTypeDefs];
};

export default getTypeDefs;
