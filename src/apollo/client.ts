import { useMemo } from "react";
import { IncomingMessage, ServerResponse } from "http";

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
export let apolloClient: ApolloClient<NormalizedCacheObject | null>;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

const createIsomorphLink = () => {
  // todo: find out how schemaLink works with ssr
  // const { SchemaLink } = require("@apollo/client/link/schema");
  // const { schema } = require("./schema");
  // console.log(schema);
  // return new SchemaLink({ schema, context });
  const { HttpLink } = require("@apollo/client/link/http");
  return new HttpLink({
    uri: `/api/graphql`,
    credentials: "same-origin",
  });
};

export const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (
  initialState = null // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache as any, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any, sourceArray: any) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) =>
          sourceArray.every((s: any) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data as any);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (client: any, pageProps: any) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};
