import React from 'react'
import BlackButton from '../../../core/BlackButton';

export default function AdminFields() {
    return (
      <>
       <div className=" flex justify-start">
            <BlackButton
              to="/fields/create"
              content='add field'
            />
        </div>
        <div>
         
        </div>
      </>
       
    );
}
