import { useState, useEffect } from "react";
import { Container, Text, VStack, Box, Button, List, ListItem, Spinner } from "@chakra-ui/react";
import { useVenues } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: venues, isLoading: isLoadingVenues } = useVenues();
  const [selectedVenue, setSelectedVenue] = useState(null);
  

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
  };

  

  return (
    <Container centerContent maxW="container.md" py={8} mt={16}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Venues</Text>
        {isLoadingVenues ? (
          <Spinner />
        ) : (
          <List spacing={3} width="100%">
            {venues.map((venue) => (
              <ListItem key={venue.id}>
                <Button width="100%" onClick={() => handleVenueClick(venue)}>
                  {venue.name}
                </Button>
              </ListItem>
            ))}
          </List>
        )}
        
      </VStack>
    </Container>
  );
};

export default Index;