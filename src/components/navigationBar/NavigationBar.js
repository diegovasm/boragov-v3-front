import "./NavigationBar.css"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import logo from "../../image/boraGOV.png"
import Dropdown from "react-bootstrap/Dropdown"
import { Button, DropdownButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { api } from "../../api/api.js"
import { AuthContext } from "../../contexts/authContext.js";

export default function NavigationBar({setLogin}) {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const { loggedUser } = useContext(AuthContext);

  const handleOnSearch = (e) => {

    try{

        setSearch(e.target.value);
    }catch(error){
        console.log(error)
    }
  }

  const handleOnQuestion = () => {
    navigate('/board/cadastrar', { replace: true })
  }
  const handleOnImageClick = () => {

    try {
      
        navigate('/board', { replace: true })
    } catch (error) {
        
    }
  }

  const handlePerfil = () => {

    navigate('/user/profile', { replace: true })
  }

  const handleConfigs = () => {

    //ainda não há tela para alteração das configuraçõe.
  }

  const handleLogout = () => {
    //setLogin(true)
    localStorage.removeItem(loggedUser);
    localStorage.clear()
    navigate('/', {replace:true})
  }

  useEffect(() => {

    try{

      const keyDownHandler = async (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
            
          const response = await api.get(`/board/${search}`)
          setSearch(response.data)
          navigate(`/board/${search}`, { replace: true });
        }
      }
  
      document.addEventListener("keydown", keyDownHandler);
  
      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      }
      
    }catch (error){
      console.log(error)
    }
  })

  return (
    <Navbar>
      <Container className="navigationBar" fluid>
        <Navbar.Brand>
          <img
            
            alt="BoraGoV logo"
            src={logo}
            width="80"
            height="40"
            className="align-top"
            onClick={handleOnImageClick}
          />
        </Navbar.Brand>

        <Form className="navSearch">
          <Form.Control
            type="search"
            placeholder="Buscar"
            className="me-4"
            aria-label="Search"
            value={search}
            onChange={handleOnSearch}
          />
        </Form>
        <Button onClick={handleOnQuestion} variant="outline-primary">
          Nova Questão
        </Button>
        <DropdownButton align="end" id="dropdown-menu-align-end" title="Menu">
          <Dropdown.Item eventKey="1" onClick={handlePerfil}>Perfil</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={handleConfigs}>Configurações</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4" onClick={handleLogout}>Logout</Dropdown.Item>
        </DropdownButton>
      </Container>
    </Navbar>
  );
}