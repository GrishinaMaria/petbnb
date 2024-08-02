import React from 'react';



const AccountSitterServices = ({ oneSitter }): JSX.Element => {
    console.log(oneSitter?.availableServices
);
    
return (
<div>
        {oneSitter?.availableServices && oneSitter?.availableServices?.map((availableService) => <div key={availableService?.id}><p>{availableService?.petType}</p><p>{availableService?.price}</p>
            <p>{availableService?.service?.title }</p>
        </div>)}  
 </div>
 );

}
export default AccountSitterServices
