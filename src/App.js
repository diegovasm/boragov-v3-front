import { Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import MenuLateral from "../src/components/menuLateral/MenuLateral.js";
import NavigationBar from "../src/components/navigationBar/NavigationBar.js";

import BoardList from "../src/components/board/BoardList.js";
import BuscaBoard from "../src/components/board/BuscaBoard.js";
import CadastrarBoard from "../src/components/board/CadastrarBoard.js";
import DetalhesBoard from "../src/components/board/DetalhesBoard.js";

import OrgaoList from "../src/components/orgao/OrgaoList.js";

import TagList from "../src/components/tag/TagList.js";

import UserList from "../src/components/users/UserList.js";
import UserProfile from "./components/users/UserProfile.js";
import LoginSignUp from "../src/components/users/LoginSignUp.js";

import ErrorPage from "../src/components/error/ErrorPage.js";
import { useState } from "react";
import { Container, ToastContainer } from "react-bootstrap";
import { AuthContextComponent } from "./contexts/authContext.js";

export default function App() {

  //const [loggedIn, setLoggedIn] = useState(false);

  let loggedIn = (localStorage.length === 0) ? false : true
  
  
  return (
    <div className="App">
      <ToastContainer />
      <AuthContextComponent>
        {loggedIn && <NavigationBar  />}
        <Container className="principal ms-0">
        {loggedIn && <MenuLateral />}
        <Routes>
          <Route path="/" element={<LoginSignUp />}>
            {" "}
          </Route>
          <Route path="/user/perfil" element={<UserProfile />}>
            {" "}
          </Route>
          <Route path="/board" element={<BoardList />}>
            {" "}
          </Route>
          <Route path="/detalhes/:id" element={<DetalhesBoard />}>
            {" "}
          </Route>
          <Route path="/board/cadastrar" element={<CadastrarBoard />}>
            {" "}
          </Route>
          <Route path="/board/:busca" element={<BuscaBoard />}>
            {" "}
          </Route>
          <Route path="/orgao" element={<OrgaoList />}>
            {" "}
          </Route>
          <Route path="/tag" element={<TagList />}>
            {" "}
          </Route>
          <Route path="/user" element={<UserList />}>
            {" "}
          </Route>
          <Route path="*" element={<ErrorPage />}>
            {" "}
          </Route>
        </Routes>
        </Container>
      </AuthContextComponent>
    </div>
  );
}

