



const PetSitterCard= ({sitter}): JSX.Element =>{
return (
<div style={{ display: 'flex', borderColor: 'black', backgroundColor: 'white', color: 'black', width: '700px', height: '100px', borderRadius: '20px', justifyContent: 'space-between', marginBottom: '20px'}}>
    <img src={sitter.img} alt=' ' style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
    <div>
    <h2 style={{color: 'black'}}>{sitter.title}</h2>
    <p style={{color: 'black'}}>{sitter.animal }</p>
    </div>
    <button>Подробнее</button>
 </div>
 );

}
export default PetSitterCard
