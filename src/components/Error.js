
import React from 'react'
import { useLocation } from 'react-router-dom';


function Error() {
    const location = useLocation();
    const message = location.state?.message;
  return (
    <div>
        <h2>{message}</h2>
    </div>
  )
}

export default Error