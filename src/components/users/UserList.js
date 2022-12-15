import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { api } from "../../api/api.js";

function UserList() {
  const [ users, setUsers ] = useState([]);

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
    <div className="cardlist">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          {users.map((data) => {
            return (
              <>
                <Card.Title>{data.nome}</Card.Title>
                <Card.Text>{data.image}</Card.Text>
                <Card.Text> {data.nickName}</Card.Text>
                <Card.Text> {data.emailInstitucional}</Card.Text>
              </>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserList;
