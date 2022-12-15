import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { api } from "../../api/api.js";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const response = await api.get("/user");
        setUsers(response.data);
      };

      fetchUsers();
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
      {users.map((data) => {
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
                  <div>{data.profileImg}</div>
                  <div> {data.emailInstitucional}</div>
                  <div> {data.nickName}</div>
                </Card.Text>
              </Card.Body>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default UserList;
