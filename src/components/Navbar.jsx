import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="xl" fontWeight="bold" color="white">
            MyApp
          </Text>
        </Box>
        <Flex alignItems="center">
          <Link as={RouterLink} to="/" px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "teal.600" }} color="white">
            Home
          </Link>
          <Link as={RouterLink} to="/events" px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "teal.600" }} color="white">
            Events
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;