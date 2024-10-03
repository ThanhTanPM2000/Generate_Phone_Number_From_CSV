import { Component } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "../components/common";

const Layout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"header"
                  "main"
                  "footer"`,
      }}
      gridTemplateRows={"3em 1fr 3em"}
      gridTemplateColumns={`1fr`}
      h="full"
      w="full"
      gap="1"
      fontWeight="bold"
    >
      <GridItem
        bg="primary"
        display="flex"
        alignItems="center"
        pl="5"
        area={"header"}
      >
        <NavBar />
      </GridItem>
      <GridItem bg="white" pl="2" area={"main"}>
        <Outlet />
      </GridItem>
      <GridItem
        bg="primary"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="2xl"
        pl="2"
        area={"footer"}
      >
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Layout;
