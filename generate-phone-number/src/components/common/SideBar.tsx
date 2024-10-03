import { Divider, Flex, Heading, Highlight, IconButton, Image, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { upperFirst } from "lodash";
import { FiTable, FiCrosshair, FiHome, FiLogOut, FiUsers } from "react-icons/fi";
import * as apis from "../../apis";
import { WEB_PATHS } from "../../constant";
import { useAuth } from "../../hooks";
import NavItem from "./NavItem";

type propTypes = {
  currentPath: string;
  navSize: string;
};

const SideBar = ({ currentPath, navSize, ...rest }: propTypes) => {
  const me = useAuth();
  const { isAdmin, picture, name } = me;

  const logoutMutation = useMutation(
    {
      mutationFn: () => {
        return apis.auth.logout()
      },
      onSuccess: () => {
        console.log("Logout success")
      }
    }
  )
  return (
    <Flex
      pos="sticky"
      h="100%"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      flexDir="column"
      justifyContent="space-between"
      {...rest}
    >
      <Flex flexDir="column">
        <NavItem
          active={currentPath === WEB_PATHS.ADMIN.DASHBOARD}
          path={WEB_PATHS.ADMIN.DASHBOARD}
          navSize={navSize}
          icon={FiCrosshair}
          title={"Get Phone Number"}
        />
        {isAdmin && (
          <>
            <NavItem
              active={currentPath === WEB_PATHS.ADMIN.SPREADSHEET}
              path={WEB_PATHS.ADMIN.SPREADSHEET}
              navSize={navSize}
              icon={FiTable}
              title={"Spreadsheets"}
            />
          </>
        )}
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex gap={4} my={4} align="center">
          <Image
            borderRadius='full'
            boxSize='3em'
            src={picture || "/2years.jpeg"}
            alt='Dan Abramov'
          />
          <Flex
            transition="all .2s ease"
            flexDir="column"
            flex={1}
            gap={1}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading px={2} as="h3" size="sm">
              {upperFirst(name)}
            </Heading>
            <Text color="gray">
              <Highlight query={['Admin', "SalerPerson"]}
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'primary', textColor: "white" }}
              >
                {isAdmin ? "Admin" : "SalerPerson"}
              </Highlight>
            </Text>
          </Flex>
          <IconButton
            background="none"
            aria-label=""
            onClick={() => logoutMutation.mutate()}
            icon={<FiLogOut />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
