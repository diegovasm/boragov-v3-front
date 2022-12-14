import "./NavigationBar.css"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import logo from "../../image/boraGOV.png"
import Dropdown from "react-bootstrap/Dropdown"
import { Button, DropdownButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/authContext.js"

export default function NavigationBar() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  
  const { loggedUser} = useContext(AuthContext)
  const id = loggedUser?.user._id;
  
  const handleOnSearch = (e) => {

    try{
        setSearch(e.target.value);
    }catch(error){
        console.log(error)
    }
  }

  const handleOnQuestion = () => {
    try {
      
      navigate('/board/cadastrar', { replace: true })
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnImageClick = () => {

    try {
      
        navigate('/board', { replace: true })
    } catch (error) {
        console.log(error)
    }
  }

  const handlePerfil = () => {

    try {
      
      navigate(`/user/profile/${id}`, { replace: true })
    } catch (error) {
      console.log(error)
    }
  }

  const handleConfigs = () => {

    //ainda não há tela para alteração das configuraçõe.
  }

  const handleLogout = () => {

    localStorage.removeItem("loggedUser");
    navigate("/");
    window.location.reload()

  }

  const handleSubmitBusca = (e) => {
    e.preventDefault()
    console.log(search)

  }
  // useEffect(() => {

  //   try{

  //     const keyDownHandler = async (event) => {
  //       if (event.key === "Enter" && event.target === "input.me-4.form-control") {
  //         event.preventDefault();
  //         console.log(search)
  //         navigate(`/board/buscar/${search}`);
  //       }
  //     }
  
  //     document.addEventListener("keydown", keyDownHandler);
  
  //     return () => {
  //       document.removeEventListener("keydown", keyDownHandler);
  //     }
      
  //   }catch (error){
  //     console.log(error)
  //   }
  // })
  if(!loggedUser){
    return( 
      <>
      </>
    )
  }
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
          <Button onClick={handleSubmitBusca} variant="outline-secondary">Buscar</Button>
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