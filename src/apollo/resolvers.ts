import { Resolvers } from "@apollo/client";

export const resolvers: Resolvers = {
  Query: {
    services: async (_, {}, { dataSources }) => {
      return dataSources.serviceAPI.getServices();
    },
    service: async (_test, params, { dataSources }) => {
      const urlParams = new URLSearchParams(params);
      return dataSources.serviceAPI.getService(urlParams);
    },
  },
};
