import { useState } from "react";
import { Container, Text, VStack, Box, Select, List, ListItem, Spinner } from "@chakra-ui/react";
import { useVenues, useEvents } from "../integrations/supabase/index.js";

const Events = () => {
  const { data: venues, isLoading: isLoadingVenues } = useVenues();
  const [selectedVenue, setSelectedVenue] = useState("");
  const { data: events, isLoading: isLoadingEvents, refetch } = useEvents(selectedVenue ? { venue_id: selectedVenue } : null);

  const handleVenueChange = (e) => {
    setSelectedVenue(e.target.value);
    refetch(); // Refetch events when the selected venue changes
  };

  return (
    <Container centerContent maxW="container.md" py={8} mt={16}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Events</Text>
        {isLoadingVenues ? (
          <Spinner />
        ) : (
          <Select placeholder="Select venue" onChange={handleVenueChange} value={selectedVenue}>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </Select>
        )}
        <Box width="100%" mt={8}>
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
      </VStack>
    </Container>
  );
};

export default Events;