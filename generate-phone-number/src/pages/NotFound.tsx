import { Box, Heading, Text, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Center h="100%" flexDirection="column">
      <Box textAlign="center">
        <Heading size="2xl" color="primary">
          404
        </Heading>
        <Text fontSize="xl" color="gray.500" mt={4}>
          Oops! The page you are looking for does not exist.
        </Text>
        <Text fontSize="lg" color="gray.400" mt={2}>
          You might have followed a bad link or mistyped the address, feel free
          to try again.
        </Text>
        <Button bg="primary" color="white" size="lg" mt={6} as={Link} to="/sign-in">
          Back Home
        </Button>
      </Box>
    </Center>
  );
};

export default NotFound;
