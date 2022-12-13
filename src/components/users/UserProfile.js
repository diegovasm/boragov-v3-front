import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api.js";

function UserProfile({ id, userForm, setUserForm }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await api.get(`/user/${id}`);
      setUserForm(response.data);
    };

    fetchUserProfile();
  }, [id, setUserForm]);

  const handleChange = (e) => {
  

    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/user/edit/${id}`, userForm);

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
      <Button variant="primary" onClick={handleShow}>
        Editar Perfil
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
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
              <Form.Select name="Papel" onChange={handleChange}>
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
            <Form.Group className="mb-3">
              <Form.Label>Departamento</Form.Label>
              <Form.Select name="department" onChange={handleChange}>
                <option value="0">Selecione uma opção</option>
                <option value="People">People</option>
                <option value="Front-end">Front-end</option>
                <option value="Back-end">Back-end</option>
                <option value="Mobile">Mobile</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Marketing">Marketing</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de admissão</Form.Label>
              <Form.Control
                type="date"
                placeholder="Insira o valor da remuneração mensal"
                name="admissionDate"
                value={userForm.admissionDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" onChange={handleChange}>
                <option value="0">Selecione uma opção</option>
                <option value="Disponível">Disponível</option>
                <option value="Alocado">Alocado</option>
                <option value="De Férias">De Férias</option>
                <option value="De Licença">De Licença</option>
              </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit">
              Atualizar funcionário
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserProfile;