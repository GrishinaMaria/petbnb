// import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Box, Image, Button, Badge, Container } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const PetSitterCard = ({ sitter }): JSX.Element => {
  return (
    // <Box
    //   maxW="xs"
    //   height="500px"
    //   borderWidth="1px"
    //   borderRadius="lg"
    //   overflow="hidden"
    // >
    // <Container maxW='2xl'>
      <Box maxW='md' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image boxSize='250px' src={sitter.photo} alt="" />

      <Box pt="1">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {sitter.username}
        </Box>
        <Box display="flex" alignItems="baseline">
          {sitter.availableServices.map((availService) => (
            <Box
              key={availService.id}
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {/* {availService.petType}&bull;{availService.price }р/час */}
            </Box>
          ))}
        </Box>

        {/* <Box>
          {property.formattedPrice}
          <Box as='span' color='gray.600' fontSize='sm'>
            / wk
          </Box>
        </Box> */}

        {/* <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {property.reviewCount} reviews
          </Box>
        </Box> */}
      </Box>
      <Link to={`/aboutpetsitter/${sitter.id}`}>
        <Button  borderRadius="md" 
            bg="#00B5D8"
            color="white" px={6} h={8}>
          Подробнее
        </Button>
      </Link>
    </Box>
    // </Container>
  );
};
export default PetSitterCard;

// <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
// <Image src={property.imageUrl} alt={property.imageAlt} />

// <Box p='6'>
//   <Box display='flex' alignItems='baseline'>
//     <Badge borderRadius='full' px='2' colorScheme='teal'>
//       New
//     </Badge>
//     <Box
//       color='gray.500'
//       fontWeight='semibold'
//       letterSpacing='wide'
//       fontSize='xs'
//       textTransform='uppercase'
//       ml='2'
//     >
//       {property.beds} beds &bull; {property.baths} baths
//     </Box>
//   </Box>

//   <Box
//     mt='1'
//     fontWeight='semibold'
//     as='h4'
//     lineHeight='tight'
//     noOfLines={1}
//   >
//     {property.title}
//   </Box>

//   <Box>
//     {property.formattedPrice}
//     <Box as='span' color='gray.600' fontSize='sm'>
//       / wk
//     </Box>
//   </Box>

//   <Box display='flex' mt='2' alignItems='center'>
//     {Array(5)
//       .fill('')
//       .map((_, i) => (
//         <StarIcon
//           key={i}
//           color={i < property.rating ? 'teal.500' : 'gray.300'}
//         />
//       ))}
//     <Box as='span' ml='2' color='gray.600' fontSize='sm'>
//       {property.reviewCount} reviews
//     </Box>
//   </Box>
// </Box>
// </Box>
// )
// }

