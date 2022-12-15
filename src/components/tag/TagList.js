import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { api } from "../../api/api.js";

export default function TagList() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    try {
      const fetchGetTag = async () => {
        const response = await api.get("/tag/alltag");
        setApiData(response.data);
      };
      fetchGetTag();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="cardlist">
      {apiData.map((data) => {
        return (
          <Card>
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginBottom: "30px",
                maxWidth: "50%",
              }}
            >
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
                <Card.Text> {data.descricao}</Card.Text>
              </Card.Body>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
