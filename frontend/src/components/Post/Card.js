import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { isItBlank } from '../Utils/Utils';



const Card = ({ post }) => {

    const [isLoading, setIsLoading] = useState(true);
    const usersData                 = useSelector((state) => state.usersReducer);
    const userData                  = useSelector((state) => state.userReducer);
    const dispatch                  = useDispatch();
    
    

    useEffect(() => {

        if (!isItBlank(usersData[0])) {
            setIsLoading(false);
        } 

    }, [usersData]);


    return (
        <li className="card-container" key={post.id}>
          {isLoading ? (
              
              <i className='fas fa-spinner fa-spin'></i>
          ): (
          <p>test</p>    
          )}  
        </li>
    );
};


export default Card;