import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Text, VStack, Box, Button, Input, Textarea, Spinner, Select } from "@chakra-ui/react";
import { useEvent, useAddEvent, useUpdateEvent, useDeleteEvent, useVenues } from "../integrations/supabase/index.js";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { data: event, isLoading: isLoadingEvent } = useEvent(eventId);
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const { data: venues, isLoading: isLoadingVenues } = useVenues();

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
  });
  const [selectedVenue, setSelectedVenue] = useState("");

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        date: event.date || "",
        description: event.description || "",
      });
      setSelectedVenue(event.venue_id || "");
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleVenueChange = (e) => {
    setSelectedVenue(e.target.value);
  };

  const handleSave = () => {
    const eventData = { ...formData, venue_id: selectedVenue };
    if (eventId) {
      updateEvent.mutate({ id: eventId, ...eventData });
    } else {
      addEvent.mutate(eventData);
    }
    navigate("/events");
  };

  const handleDelete = () => {
    deleteEvent.mutate(eventId);
    navigate("/events");
  };

  return (
    <Container centerContent maxW="container.md" py={8} mt={16}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">{eventId ? "Edit Event" : "Add Event"}</Text>
        {isLoadingEvent ? (
          <Spinner />
        ) : (
          <Box width="100%">
            <Input
              placeholder="Event Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              mb={4}
            />
            <Input
              placeholder="Event Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              mb={4}
            />
            <Textarea
              placeholder="Event Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              mb={4}
            />
            {isLoadingVenues ? (
              <Spinner />
            ) : (
              <Select placeholder="Select venue" onChange={handleVenueChange} value={selectedVenue} mb={4}>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </Select>
            )}
            <Button colorScheme="teal" onClick={handleSave} mr={4}>
              Save
            </Button>
            {eventId && (
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default EventDetails;