import { Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    direction={"column"}
    mb={10}
  >
    <Heading fontSize="6vw">{title}</Heading>
    <Text color={"gray.500"}>
      Displays a list of public APIs, uses a wrapped REST API provided by this
      awesome{" "}
      <Link href="https://github.com/davemachado/public-api">project</Link>. The
      Graphql API can be found here{" "}
      <Link href="https://awesome-apis.jcofman.de">
        awesome-apis.jcofman.de
      </Link>
    </Text>
  </Flex>
);

Hero.defaultProps = {
  title: "with-chakra-ui-typescript",
};
