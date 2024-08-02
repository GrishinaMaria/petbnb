import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Box, Image } from '@chakra-ui/react'



const PetSitterCard= ({sitter}): JSX.Element =>{
return (
<Box maxW='xs' height='500px' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image width='100%' height='70%' src={sitter.photo} alt='' />

      <Box p='6'>
          <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {sitter.username}
        </Box>
        <Box display='flex' alignItems='baseline'>
                {sitter.availableServices.map((availService) => 
            <Box key={availService.id}  color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
                        ml='2'>{availService.petType}&bull;{availService.price }р/час</Box>)}
          
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
      <Link to={`/aboutpetsitter/${sitter.id}`}><Box as='button' borderRadius='md' bg='blue' color='white' px={6} h={8}>
  Подробнее
</Box></Link>
    </Box>


 );

}
export default PetSitterCard
{/* <div style={{ display: 'flex', borderColor: 'black', backgroundColor: 'white', color: 'black', width: '700px', height: '100px', borderRadius: '20px', justifyContent: 'space-between', marginBottom: '20px'}}>
    <img src={sitter.photo} alt=' ' style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
    <div>
    <h2 style={{color: 'black'}}>{sitter.username}</h2>
    
            {sitter.availableServices.map((availableService) => <p style={{ color: 'black', display: 'block', margin: '0 10px' }} key={availableService.id}>{availableService.petType}</p>)}
            
    </div>
        <Link to={`/aboutpetsitter/${sitter.id}`}><Button variant="primary">Подробнее</Button></Link>
 </div> */}