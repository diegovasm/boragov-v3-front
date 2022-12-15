import { useEffect, useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api.js";
import { AuthContext } from "../../contexts/authContext.js";


function UserProfile() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [userForm, setUserForm] = useState({
    nome: "",
    emailPessoal: "",
    emailInstitucional: "",
    password: "",
    codSiape: "",
    profileImg: "",
    nickName:"",
    role:"",
    isAdmin: false
  });

  const { loggedUser } = useContext(AuthContext)
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await api.get(`/user/${loggedUser.id}`);
      setUserForm(response.data);
    };

    fetchUserProfile();
  }, [loggedUser.id, setUserForm]);

  const handleChange = (e) => {
  

    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleClose = () =>{
    setShow(false)
    navigate("/board");
    window.location.reload()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(false)
    try {
      await api.put(`/user/edit/${loggedUser.id}`, userForm);

      toast.success("Perfil do usuário atualizado!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/board");
        window.location.reload()
    } catch (error) {
      console.log(error);

      toast.error("Não foi possível editar o perfil do usuário.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Editar Perfil do Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome do usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o nome completo do usuário"
                name="nome"
                value={userForm.nome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-mail Pessoal</Form.Label>
              <Form.Control
                type="email"
                placeholder="Insira o e-mail pessoal"
                name="emailPessoal"
                value={userForm.emailPessoal}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-mail Institucional</Form.Label>
              <Form.Control
                type="email"
                placeholder="Insira o e-mail institucional"
                name="emailInstitucional"
                value={userForm.emailInstitucional}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>SIAPE</Form.Label>
              <Form.Control
                type="number"
                placeholder="Insira o código SIAPE"
                name="codSiape"
                value={userForm.codSiape}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nick</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira o seu nickname"
                name="nickName"
                value={userForm.nickName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Papel</Form.Label>
              <Form.Select name="role" onChange={handleChange}>
                <option value="0">Selecione uma opção</option>
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Inserir imagem</Form.Label>
              <Form.Control
                type="file"
                name="profileImg"
                value={userForm.profileImg}
                onChange={handleChange}
              />
            </Form.Group>
           
            <Button variant="success" type="submit" onSubmit={handleSubmit}>
              Atualizar Usuário
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserProfile;