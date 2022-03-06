import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  service?: Maybe<Service>;
  services: Array<Service>;
};


export type QueryServiceArgs = {
  title?: InputMaybe<Scalars['String']>;
};

export type Service = {
  __typename?: 'Service';
  auth?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  cors?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  https?: Maybe<Scalars['Boolean']>;
  link: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type AllApisQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllApisQueryQuery = { __typename?: 'Query', services: Array<{ __typename?: 'Service', link: string, description?: string | null | undefined, cors?: string | null | undefined, auth?: string | null | undefined, https?: boolean | null | undefined, category?: string | null | undefined }> };


export const AllApisQueryDocument = gql`
    query AllApisQuery {
  services {
    link
    description
    cors
    auth
    https
    cors
    category
  }
}
    `;

/**
 * __useAllApisQueryQuery__
 *
 * To run a query within a React component, call `useAllApisQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllApisQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllApisQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllApisQueryQuery(baseOptions?: Apollo.QueryHookOptions<AllApisQueryQuery, AllApisQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllApisQueryQuery, AllApisQueryQueryVariables>(AllApisQueryDocument, options);
      }
export function useAllApisQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllApisQueryQuery, AllApisQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllApisQueryQuery, AllApisQueryQueryVariables>(AllApisQueryDocument, options);
        }
export type AllApisQueryQueryHookResult = ReturnType<typeof useAllApisQueryQuery>;
export type AllApisQueryLazyQueryHookResult = ReturnType<typeof useAllApisQueryLazyQuery>;
export type AllApisQueryQueryResult = Apollo.QueryResult<AllApisQueryQuery, AllApisQueryQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    