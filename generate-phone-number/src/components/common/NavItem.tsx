import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

type propTypes = {
  navSize?: string;
  title?: string;
  path?: string;
  icon?: any;
  active?: boolean;
  description?: string;
};

const NavItem = ({
  navSize,
  title,
  path,
  icon,
  active,
  description,
}: propTypes) => {
  return (
    <Flex
      mt={30}
      px={2}
      flexDir="column"
      alignItems={navSize === "small" ? "center" : "flex-start"}
      w="100%"
    >
      <Menu placement="right">
        <Link
          as={ReactRouterLink}
          to={path}
          backgroundColor={active ? "primary" : undefined}
          p={3}
          borderRadius={8}
          color={active ? "white" : "gray.500"}
          _hover={{
            textDecor: "none",
            backgroundColor: "primary",
            color: "white",
          }}
          w={navSize === "large" ? "100%" : undefined}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                ml={navSize === "small" ? 0 : 5}
                boxSizing="border-box"
                as={icon}
                fontSize="xl"
                color="currentcolor"
              />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        {/* <MenuList display={navSize === 'large' && 'none'} px={0} py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox icon={icon} title={title} description={description}></NavHoverBox>
        </MenuList> */}
      </Menu>
    </Flex>
  );
};

export default NavItem;
