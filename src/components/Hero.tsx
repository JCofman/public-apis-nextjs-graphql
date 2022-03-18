import { Flex, Heading, Text, Link, Badge } from "@chakra-ui/react";

export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    direction={"column"}
    mt={10}
    mb={12}
    maxWidth="1200px"
  >
    <Heading fontSize="6vw">{title}</Heading>
    <Text color={"gray.500"}>
      Displays a list of public APIs, uses a wrapped REST API provided by this
      awesome{" "}
      <Badge colorScheme="pink">
        <Link
          isExternal
          color="teal.500"
          href="https://github.com/davemachado/public-api"
        >
          project
        </Link>
      </Badge>
      . The Graphql API for this project can be found{" "}
      <Badge colorScheme="pink">
        <Link
          isExternal
          color="teal.500"
          href="https://public-apis.jcofman.de/api/graphql"
        >
          here.
        </Link>
      </Badge>
    </Text>
  </Flex>
);

Hero.defaultProps = {
  title: "with-chakra-ui-typescript",
};
