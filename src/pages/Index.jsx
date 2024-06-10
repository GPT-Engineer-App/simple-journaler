import React, { useState, useEffect } from "react";
import { Container, VStack, Text, Textarea, Button, Box, Heading, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleAddEntry = () => {
    if (newEntry.trim() === "") return;
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setNewEntry("");
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">
          Journal App
        </Heading>
        <Textarea placeholder="Write your journal entry here..." value={newEntry} onChange={(e) => setNewEntry(e.target.value)} />
        <Button colorScheme="teal" onClick={handleAddEntry}>
          Add Entry
        </Button>
        <VStack spacing={4} width="100%">
          {entries.map((entry, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%" position="relative">
              <Text>{entry}</Text>
              <IconButton aria-label="Delete entry" icon={<FaTrash />} size="sm" position="absolute" top="4px" right="4px" onClick={() => handleDeleteEntry(index)} />
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
