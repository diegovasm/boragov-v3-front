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
    <div
      className="cardlist"
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {apiData.map((data) => {
        return (
          <Card style={{ maxWidth: "50%" }}>
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
                <Card.Text> {data.descricao}</Card.Text>
              </Card.Body>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
