import { useState, useEffect } from "react";
import { Container, Text, VStack, Box, Button, List, ListItem, Spinner } from "@chakra-ui/react";

import { useVenues, useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: venues, isLoading: isLoadingVenues } = useVenues();
  const [selectedVenue, setSelectedVenue] = useState(null);
  const { data: events, isLoading: isLoadingEvents, refetch } = useEvents(selectedVenue ? { venue_id: selectedVenue.id } : null);

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
  };

  useEffect(() => {
    if (selectedVenue) {
      refetch(); // Refetch events when the selected venue changes
    }
  }, [selectedVenue, refetch]);

  return (
    <Container centerContent maxW="container.md" py={8}>
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
        {selectedVenue && (
          <Box width="100%" mt={8}>
            <Text fontSize="xl">Events at {selectedVenue.name}</Text>
            {isLoadingEvents ? (
              <Spinner />
            ) : (
              <List spacing={3} width="100%">
                {events.map((event) => (
                  <ListItem key={event.id}>
                    <Box p={4} borderWidth="1px" borderRadius="md">
                      <Text fontSize="lg">{event.name}</Text>
                      <Text>{event.date}</Text>
                      <Text>{event.description}</Text>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}
        
      </VStack>
    </Container>
  );
};

export default Index;