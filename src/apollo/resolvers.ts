import { Resolvers } from "@apollo/client";

export const resolvers: Resolvers = {
  Query: {
    services: async (_, {}, ctx) => {
      if (ctx) {
        return ctx.dataSources.serviceAPI.getServices();
      }
    },
    service: async (_test, params, ctx) => {
      const urlParams = new URLSearchParams(params);
      if (ctx) {
        return ctx.dataSources.serviceAPI.getService(urlParams);
      }
    },
  },
};
