import { Link } from 'react-router-dom';
import { Box, Image, Button, Badge, Text, HStack } from '@chakra-ui/react';

const PetSitterCard = ({ sitter }): JSX.Element => {
  return (
    <Box>

      <Image src={sitter.photo} borderRadius="18px" width="96%" m="4" />

      <Box ml="7">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="2xl">
            {sitter.username}
            <br></br>
            <Badge colorScheme="cyan">{sitter.city}</Badge>
          </Text>
          {/* <Badge colorScheme="cyan">{sitter.city}</Badge> */}

          {/* <Link to={`/aboutpetsitter/${sitter.id}`}>
          <Button
            borderRadius="md"
            bg="cyan.500"
            color="white"
            _hover={{ bg: "cyan.600" }}
          >
            Подробнее
          </Button>
        </Link> */}
        </HStack>
      </Box>
    </Box>
  );
};

export default PetSitterCard;
