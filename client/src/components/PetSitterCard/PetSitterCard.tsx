import { Link } from 'react-router-dom';
import { Box, Image, Button, Badge, Text, HStack } from '@chakra-ui/react';

const PetSitterCard = ({ sitter }): JSX.Element => {
  return (
    <Box>
 <Link to={`/aboutpetsitter/${sitter.id}`}>
      <Image src={sitter.photo} borderRadius="18px" width="96%" m="4" />
      </Link>

      <Box ml="7">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="2xl">
            {sitter.username}
            <br></br>
            <Badge colorScheme="cyan">{sitter.city}</Badge>
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default PetSitterCard;
