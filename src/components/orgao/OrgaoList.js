import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { api } from "../../api/api.js";

function OrgaoList() {
  const [ orgaos, setOrgaos ] = useState([]);

  useEffect(() => {
    try {
        const fetchOrgaos = async () => {
        const response = await api.get("/orgao");
        console.log(response)
        setOrgaos(response.data);
      };

      fetchOrgaos();
      console.log(`Variavel orgaos setada ${orgaos}`)
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="cardlist">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          {orgaos.map((data) => {
            return (
              <>
                <Card.Title>{data.nome}</Card.Title>
                <Card.Text>{data.image}</Card.Text>
                <Card.Text> {data.localizacao}</Card.Text>
                <Card.Text> {data.descricao}</Card.Text>
              </>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
}

export default OrgaoList;
