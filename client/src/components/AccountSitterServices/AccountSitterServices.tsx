import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';



const AccountSitterServices = ({ oneSitter }): JSX.Element => {
    const [oneSitterServices, setOneSitterServices] = useState(null)
    const axiosServices = async () => {
        if (oneSitter) {
                
        const { data } = await axiosInstance.get(`${import.meta.env.VITE_API}/petsitterServices/${oneSitter.id}`)
        console.log(data, '--------------------');
        
        setOneSitterServices(data)
   }
        }
    useEffect(() => {
        axiosServices();
 }, [oneSitter])
    
return (
<div>
        {/* {oneSitter?.availableServices && oneSitter?.availableServices?.map((availableService) => <div key={availableService?.id}><p>{availableService?.petType}</p><p>{availableService?.price}</p>
            <p>{availableService?.service?.title }</p>
        </div>)}   */}
        {oneSitterServices && oneSitterServices.map((oneSitterService) => <div key={oneSitterService.id}><p>{oneSitterService.petType}</p><p>{oneSitterService.service.title }</p><p>{oneSitterService.price }</p></div>)}
 </div>
 );

}
export default AccountSitterServices
