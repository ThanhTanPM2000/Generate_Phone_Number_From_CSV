import { Component } from "react";
import { Grid, GridItem, Show, HStack, Text } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { NavBar, SideBar, Footer } from "../components/common";

import { useState } from "react";

const AdminLayout = () => {
  const [navSize, setNavSize] = useState("large");
  const location = useLocation();
  const currentPath = location.pathname;

  const handleChangeNavSize = () => {
    setNavSize(navSize === "small" ? "large" : "small");
  };

  return (
    <Grid
      bg="white"
      templateAreas={{
        base: `"header header"
                  "main main"
                  "footer footer"`,
        lg: `"header header" "aside main" "aside footer"`,
      }}
      transition={".2s ease"}
      gridTemplateRows={"70px 1fr 30px"}
      gridTemplateColumns={`${navSize === "small" ? "75px" : "250px"} 1fr`}
      h="full"
      gap="1"
      fontWeight="bold"
    >
      <GridItem
        bg="primary"
        display="flex"
        alignItems="center"
        pl="2"
        area={"header"}
      >
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"}>
          <SideBar currentPath={currentPath} navSize={navSize} />
        </GridItem>
      </Show>
      <GridItem bg="white" mt={4} pl="2" area={"main"}>
        <Outlet />
      </GridItem>
      <GridItem
        bg="gray.100"
        color="black"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pl="2"
        area={"footer"}
      >
        <HStack alignItems="center">
          <Text fontSize="sm" >
            Powered by Kitawa Solutions
          </Text>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default AdminLayout;
