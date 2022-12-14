import {Card} from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { api } from "../../api/api.js";

export default function TagList(){

    const [apiData, setApiData] = useState([]);
    
    
    useEffect(() => {
        
        try {
            const fetchGetTag = async () => {

                const response = await api.get("/tag/alltag")
                console.log(response)
                setApiData(response.data);
            }
            fetchGetTag()
        } catch (error) {
            console.log(error)
        }
    }, [])


       return(

        <div className="cardlist">     
    
    <Card  style={{ width: '18rem' }}>      
       <Card.Body>
      {apiData.map((data) =>{
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

