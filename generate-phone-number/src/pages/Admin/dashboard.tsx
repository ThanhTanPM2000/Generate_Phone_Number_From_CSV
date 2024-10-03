import { Center, Box, Heading, Text, Button } from "@chakra-ui/react"

const Dashboard = () => {
  return <>
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
      </Box>
    </Center>
  </>
}

export default Dashboard
