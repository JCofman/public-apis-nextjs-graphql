import { ReactNode } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  chakra,
  VisuallyHidden,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaTwitter, FaGithub } from "react-icons/fa";

export const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box
        width="100%"
        maxWidth="1024px"
        bg={useColorModeValue("transparent", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <svg
              width="52"
              height="72"
              viewBox="0 0 210 291"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                r="95"
                transform="matrix(0.859406 -0.511293 -0.213371 0.976971 104.988 145.404)"
                stroke={useColorModeValue("#000", "#fff")}
                stroke-width="5"
              />
              <circle
                r="75"
                transform="matrix(0.859406 -0.511293 -0.213371 0.976971 102.068 148.09)"
                stroke={useColorModeValue("#000", "#fff")}
                stroke-width="5"
              />
              <circle
                cx="101"
                cy="145"
                r="13"
                fill={useColorModeValue("#000", "#fff")}
              />
            </svg>
          </Box>

          <Flex alignItems={"center"}>
            Made with ❤️ by{" "}
            <Link
              isExternal
              color="teal.500"
              href={"https://jcofman.de"}
              marginRight={5}
              marginLeft={2}
            >
              Jacob
            </Link>
            <Stack direction={"row"} spacing={4} alignItems={"center"}>
              <SocialButton
                label={"Twitter"}
                href={"https://twitter.com/JCofman"}
              >
                <FaTwitter />
              </SocialButton>
              <SocialButton
                label={"GitHub"}
                href={"https://github.com/JCofman/public-apis-nextjs-graphql"}
              >
                <FaGithub />
              </SocialButton>

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
