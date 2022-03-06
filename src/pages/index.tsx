import { Box, Center, SimpleGrid } from "@chakra-ui/react";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import Card from "../components/Card";
import { gql, useQuery } from "@apollo/client";
import { AllApisQueryQuery } from "../generated/graphql";
import { initializeApollo, addApolloState } from "../apollo/client";

export const ALL_APIS_QUERY = gql`
  query AllApisQuery {
    services {
      link
      description
      cors
      auth
      https
      cors
      category
      title
    }
  }
`;

const Index = () => {
  const { loading, error, data } = useQuery<AllApisQueryQuery>(ALL_APIS_QUERY, {
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <p>Error :(</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <Container>
      <Hero title="A collection public APIs" />
      <Center>
        <Box p={4}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {data?.services.map((service) => {
              return <Card service={service} />;
            })}
          </SimpleGrid>
        </Box>
      </Center>
      <Footer />
    </Container>
  );
};

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_APIS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: ALL_APIS_QUERY,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }

export default Index;
