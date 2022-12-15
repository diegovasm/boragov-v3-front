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
      <Card style={{ width: "18rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                     marginBottom: "30px", }}>
        <Card.Body>
          {apiData.map((data) => {
            return (
              <>
                <Card.Title style= {{color: "#4682B4" }}>{data.nome}</Card.Title>
                <Card.Text> {data.descricao}</Card.Text>
              </>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
}
