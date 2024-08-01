import React, { useEffect, useState } from 'react';
import PetSitterCard from '../PetSitterCard/PetSitterCard';
import SittersMap from '../SittersMap/SittersMap';
import { useAppSelector } from '../../redux/hooks';
import axiosInstance from '../../axiosInstance';

const arraySitters = [
  {
    id: 1,
    title: 'Катя',
    animal: 'кошки',
    corX: 55.8,
    corY: 36.8,
    'Services': [{прогулка: true}, {кормление: true}, {игра: false}],
    img: 'https://upload.wikimedia.org/wikipedia/ru/5/55/%D0%93%D0%BD%D0%B5%D0%B2_%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%28%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80%29.png',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
  {
    id: 2,
    title: 'Маша',
    animal: 'кошки',
    corX: 54.8,
    corY: 37.8,
    'Services': [{прогулка: false}, {кормление: true}, {игра: false}],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6TaQhArLyOOaYf4lKogZWD8U6g-8aB0iHWw&s',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
  {
    id: 3,
    title: 'Ира',
    animal: 'кошки',
    corX: 55.9,
    corY: 37.8,
    'Services': [{прогулка: true}, {кормление: true}, {игра: false}],
    img: 'https://www.kino-teatr.ru/movie/posters/big/3/24073.jpg',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
  {
    id: 4,
    title: 'Дима',
    animal: 'собаки',
    corX: 56.8,
    corY: 37.8,
    'Services': [{прогулка: true}, {кормление: false}, {игра: false}],
    img: 'https://upload.wikimedia.org/wikipedia/ru/4/4b/Avatar-2009.jpg',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
  {
    id: 5,
    title: 'Гоша',
    animal: 'собаки',
    corX: 55.8,
    corY: 37.9,
    'Services': [{прогулка: true}, {кормление: true}, {игра: false}],
    img: 'https://www.kino-teatr.ru/movie/posters/big/0/24930.jpg',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
    },
  {
    id: 6,
    title: 'Паша',
    animal: 'кошки',
    corX: 55.8,
    corY: 37.9,
    'Services': [{прогулка: true}, {кормление: true}, {игра: true}],
    img: 'https://www.kino-teatr.ru/movie/posters/big/0/24930.jpg',
    createdAt: '2024-06-11T08:18:10.039Z',
    updatedAt: '2024-06-11T08:18:10.039Z',
  },
];

const PeSittersList = (): JSX.Element => {
    // const user = useAppSelector((store) => store.userSlice.user);
    // console.log(user.id);
    
    const [sitters, setSitters] = useState(arraySitters);
    const [servicesFilter, setServicesFilter] = useState('')
    const [value, setValue] = useState('')
    // const [services, setServices] = useState([]);
//     useEffect(() => {
//         if (user.id) {
//             axiosInstance
//                 .get(`${import.meta.env.VITE_API}/petsitterServices/${user.id}`)
//                 .then((res) => {
//                     // console.log(res.data)
//                     setServices(res.data);

//                     console.log(res.data);
//                 })
//                 .catch((err) => console.error(err));
//         }
//   }, [user]);

        const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setValue(event.target.name); 
        } else {
            setValue(''); 
        }
        

        };
    const had = (event) => {
        if (event.target.checked) {
            setValue('')
        }
    }
    const handleServicesSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setServicesFilter(event.target.value);
    };
    const filteredSitters = sitters.filter((sitter) => {
        return value === '' || sitter.animal.toLowerCase() === value.toLowerCase();
        
    }).filter((sitter) => {
        if (!servicesFilter) {
            return true;
        } else {
            return sitter['Services'].some(service => {
    const keys = Object.keys(service);
    if (keys.length > 0) {
        const firstKey = keys[0];
        return firstKey === servicesFilter && service[firstKey] === true;
    }
    return false;
});
        }
    });

    return (
    <>
        <form>
               <label>
                <input type='radio' value={'все'} name='все' checked={value == '' ? true : false} onChange={had}/>
                <p>все</p>
            </label>
            <label>
                <input type='radio' value={'кошки'} name='кошки' checked={value == 'кошки' ? true : false} onChange={handleCheckboxChange}/>
                <p>кошки</p>
            </label>
               <label>
                <input type='radio' value={'собаки'} name='собаки' checked={value == 'собаки' ? true : false} onChange={handleCheckboxChange}/>
                <p>собаки</p>
            </label>
            <label>
                    
                    <select  value={servicesFilter} onChange={handleServicesSelectChange} style={{color: 'black', width: '200px'}}>
                        <option value=''>все виды услуг</option>
                        <option value='прогулка'>прогулка</option>
                        <option value='кормление'>кормление</option>
                        <option value='игра'>игра</option>
                    </select>
                </label>
        </form>
        <div style={{display: 'flex'}}>
        
        <div style={{marginRight: '200px', backgroundColor: 'white'}}>
            {filteredSitters ? (filteredSitters.map((sitter)=> <PetSitterCard key={sitter.id} sitter={sitter}/>)) : <div>no sitters found</div>}
            
        </div>
                
                <SittersMap sitters={sitters} filtredSitters={filteredSitters } />
 </div>
 </>
 );

}
export default PeSittersList
 