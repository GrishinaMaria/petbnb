import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";




const PetSitterCard= ({sitter}): JSX.Element =>{
return (
<div style={{ display: 'flex', borderColor: 'black', backgroundColor: 'white', color: 'black', width: '700px', height: '100px', borderRadius: '20px', justifyContent: 'space-between', marginBottom: '20px'}}>
    <img src={sitter.photo} alt=' ' style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
    <div>
    <h2 style={{color: 'black'}}>{sitter.username}</h2>
    {/* <p style={{color: 'black'}}>{sitter.animal }</p> */}
            {sitter.availableServices.map((availableService) => <p style={{ color: 'black', display: 'block', margin: '0 10px' }} key={availableService.id}>{availableService.petType}</p>)}
            
    </div>
        <Link to={`/aboutpetsitter/${sitter.id}`}><Button variant="primary">Подробнее</Button></Link>
 </div>
 );

}
export default PetSitterCard
