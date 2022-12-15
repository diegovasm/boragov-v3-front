import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { api } from "../../api/api.js";

function OrgaoList() {
  const [orgaos, setOrgaos] = useState([]);

  useEffect(() => {
    try {
      const fetchOrgaos = async () => {
        const response = await api.get("/orgao");
        setOrgaos(response.data);
      };

      fetchOrgaos();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      className="cardlist"
      style={{
        display: "flex",
        justifyContent: "spaceBetween",
        gap: "1rem",
        flexWrap: "wrap",
        marginLeft: "1rem",
      }}
    >
      {orgaos.map((data) => {
        return (
          <Card style={{ width: "48%" }}>
            <div className="">
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#4682B4",
                    backgroundColor: "lightblue",
                    fontWeight: "bold",
                  }}
                >
                  {data.nome}
                </Card.Title>
                <Card.Text>
                  <div>{data.image}</div>
                  <div> {data.localizacao}</div>
                  <div> {data.descricao}</div>
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default OrgaoList;
