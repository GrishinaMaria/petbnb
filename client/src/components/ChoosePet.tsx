import React, { useEffect, useState } from 'react';
import axiosInstance from ".././axiosInstance";
const { VITE_API } = import.meta.env;

export default function ChoosePet({ pets, setPets, onPetSelect }) {
    // const [mypets, setPets] = useState([]);
    const [chosenPet, setChosenPet] = useState(null); 

    useEffect(() => {
        const fetchPets = async () => {
          try {
            const { data } = await axiosInstance.get(`${VITE_API}/owneraccount`);
            setPets(data.myPets);
          } catch (error) {
            console.log(error);
          }
        };
        fetchPets();
      }, [setPets]);
      console.log(chosenPet);

      const onePetHandler = async (petId) => {
        setChosenPet(petId)
        console.log(petId);
        onPetSelect(petId); 
    };

  return (
    <>

    <label> Выберите питомца:</label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px"  }}>
            {pets.map((pet) => (
              <div
              key={pet.id}
              onClick={() => onePetHandler(pet.id)}
                style={{
                  backgroundImage: `url("${pet.photo}")`,
              
                border: chosenPet === pet.id ? "solid 5px black" : "solid 5px #ccc",
                  borderRadius: "50px",
                  width: "150px",
                  height: "80px",
                  cursor: "pointer",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
          </div>

    </>
  )
}
