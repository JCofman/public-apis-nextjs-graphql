import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  chakra,
  VisuallyHidden,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { Service } from "../generated/graphql";
import { Icon } from "@chakra-ui/react";
import { HiOutlineShare } from "react-icons/hi";
import { Divider } from "@chakra-ui/react";
// @ts-ignore
import filenamify from "filenamify/browser";
import humanizeUrl from "humanize-url";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ReactNode, useEffect } from "react";

interface CardProps {
  service: Service;
}

export const ShareButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  const { hasCopied, onCopy } = useClipboard(href);
  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Link to Homepage Copied.",
        description: `We've copied the ${href} to your clipboard.`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  }, [hasCopied]);
  return (
    <chakra.button
      pos={"absolute"}
      top={2}
      right={2}
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      onClick={onCopy}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Card = (props: CardProps) => {
  const { service } = props;
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  const imageSrc = `/screenshots/${filenamify(humanizeUrl(service.link))}.png`;
  return (
    <div ref={ref}>
      {inView ? (
        <Box
          key={service.link}
          py={12}
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            margin={-6}
            pos={"relative"}
            height={"230px"}
            overflow={"hidden"}
          >
            <Image layout={"fill"} objectFit="cover" src={imageSrc} />
            <ShareButton
              label={service.description ? service.description : ""}
              href={service.link}
            >
              <Icon
                rounded={"full"}
                backgroundColor={"blackAlpha.100"}
                color={"whiteAlpha.900"}
                pos={"absolute"}
                top={2}
                right={2}
                as={HiOutlineShare}
              ></Icon>
            </ShareButton>
          </Box>
          <Stack pt={10} minWidth={0}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {service.title}
              </Heading>
              <Text color={"gray.500"}> Category - {service.category}</Text>
            </Stack>

            <Stack direction={"row"} align={"center"}>
              <Link
                overflowWrap={"break-word"}
                minWidth={0}
                href={service.link}
                isExternal
              >
                {service.link}
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Stack>

            <Text
              fontWeight={500}
              fontSize={"md"}
              color={"gray.600"}
              overflowWrap={"break-word"}
              minWidth={0}
            >
              {service.description}
            </Text>
          </Stack>
          <Divider mt={4} mb={4} marginRight={-6} marginLeft={-6}></Divider>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            {service.cors ? (
              <Stack spacing={0} align={"center"}>
                <Text fontWeight={600}>
                  {service.cors ? (
                    <Badge
                      rounded="full"
                      px="2"
                      fontSize="0.8em"
                      colorScheme="green"
                    >
                      Yes
                    </Badge>
                  ) : (
                    <Badge
                      rounded="full"
                      px="2"
                      fontSize="0.8em"
                      colorScheme="red"
                    >
                      No
                    </Badge>
                  )}
                </Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  CORS
                </Text>
              </Stack>
            ) : null}

            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>
                {service.https ? (
                  <Badge
                    rounded="full"
                    px="2"
                    fontSize="0.8em"
                    colorScheme="green"
                  >
                    Yes
                  </Badge>
                ) : (
                  <Badge
                    rounded="full"
                    px="2"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    No
                  </Badge>
                )}
              </Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                HTTPS
              </Text>
            </Stack>

            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>
                {service.auth ? (
                  <Badge
                    rounded="full"
                    px="2"
                    fontSize="0.8em"
                    colorScheme="green"
                  >
                    {service.auth}
                  </Badge>
                ) : (
                  <Badge
                    rounded="full"
                    px="2"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    No
                  </Badge>
                )}
              </Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                AUTH
              </Text>
            </Stack>
          </Stack>

          <Button
            w={"full"}
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={() => {
              window.open(service.link, "_blank");
            }}
          >
            Details
          </Button>
        </Box>
      ) : null}
    </div>
  );
};

export default Card;
