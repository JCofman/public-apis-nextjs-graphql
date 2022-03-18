import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";
import { createContext } from "vm";
import { schema } from "../../apollo/schema";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ServiceAPI } from "../../apollo/public-api";

const apolloServer = new ApolloServer({
  context: createContext,
  schema,
  debug: true,
  introspection: true,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageLocalDefault({
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
  dataSources: () => {
    return {
      serviceAPI: new ServiceAPI(),
    };
  },
});

const startServer = apolloServer.start();

export default async (req: any, res: any) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
