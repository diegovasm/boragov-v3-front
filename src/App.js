import { Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Questoes from "./components/questoes/Questoes";
import NavigationBar from "./components/navigationBar/NavigationBar";
import MenuLateral from "./components/menuLateral/MenuLateral";
import DetalhesQuestoes from "./components/detalhesQuestoes/DetalhesQuestoes";
import CadastrarQuestoes from "./components/cadastrarQuestao/CadastrarQuestao";
import Login from "./components/login/Login";
import ErrorPage from "./components/errorPage/ErrorPage";
import { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import BuscaQuestoes from "./buscaQuestoes/BuscaQuestoes";
export default function App() {
  const [form, setForm] = useState({
    titulo: "",
    problema: "",
    resultadoesperado: "",
    tags: [],
    datacadastro: "",
    orgao: "",
    respostas: 0,
    views: 0,
    votos: 0,
  });
  const [login, setLogin] = useState(true);
  return (
    <div className="App">
      <ToastContainer />
      <AuthContextComponent>
        <NavigationBar setLogin={setLogin} />
        <Routes>
          <Route path="/login" element={<Login />}>
            {" "}
          </Route>
          <Route path="/signup" element={<Signup />}>
            {" "}
          </Route>
          <Route path="/perfil" element={<Perfil />}>
            {" "}
          </Route>
          <Route path="/" element={<Board />}>
            {" "}
          </Route>
          <Route path="/detalhes/:id" element={<DetalhesBoard />}>
            {" "}
          </Route>
          <Route path="/cadastrar" element={<CadastrarBoard />}>
            {" "}
          </Route>
          <Route path="/board/:busca" element={<BuscaBoard />}>
            {" "}
          </Route>
          <Route path="/tags" element={<Tags />}>
            {" "}
          </Route>
          <Route path="/users" element={<Users />}>
            {" "}
          </Route>
          <Route path="/orgaos" element={<Orgaos />}>
            {" "}
          </Route>
          <Route path="/orgaos/cadastrar" element={<CadastrarOrgao />}>
            {" "}
          </Route>
          <Route path="*" element={<ErrorPage />}>
            {" "}
          </Route>
        </Routes>
      </AuthContextComponent>
    </div>
  );
}











