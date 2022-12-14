import {Card} from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { api } from "../../api/api.js";

export default function TagList(){

    const [APIData, setAPIData] = useState([]);
    

    useEffect(() => {
        api.get(`/alltag`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])


       return(

        <div className="cardlist">     
    
    <Card  style={{ width: '18rem' }}>      
       <Card.Body>
      {APIData.map((data) =>{
        return (
        <><Card.Title>{data.nome}</Card.Title>
        <Card.Text> {data.descricao}</Card.Text></>  
        )
      })}        
        
    </Card.Body>
    </Card>

    </div>
  

   )

}

