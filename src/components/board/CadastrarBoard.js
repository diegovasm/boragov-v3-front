import { Button, Form, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CadastrarBoard.css";
import { api } from "../../api/api.js";
import { AuthContext } from "../../contexts/authContext";

export default function CadastrarBoard({ apiUrl }) {
  const { loggedUser } = useContext(AuthContext);
  const id = loggedUser.user?._id
  const toolbarOptions = {
    toolbar: [
      [{ font: [] }, { size: ["small", false, "large", "huge"] }],
      [{ align: [] }, "direction"],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "code-block"],
      ["clean"],
    ],
  };

  const navigate = useNavigate();
  const [orgaos, setOrgaos] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsIds, setTagsIds] = useState([])
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    categoria: "",
    titulo: "",
    conteudo: "",
    orgao: "",
    tags: [],
  });

  useEffect(() => {
    try {
      const fetchOrgaos = async () => {
        const response = await api.get("/orgao");
        setOrgaos(response.data);
      };

      fetchOrgaos();
    } catch (error) {
      console.log(error);
    }
    try {
      const fetchGetTag = async () => {
        const response = await api.get("/tag/alltag");
        setTags(response.data);
      };
      fetchGetTag();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeQuill = async (content, delta, source, editor) => {
    await setForm({ ...form, conteudo: editor.getContents() });
  };

  const handleAdicionaTags = () => {
    setForm({ ...form, tags: tagsIds});
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeTags = (tagId) => {
    setTagsIds(tagId);
  } 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/board/cadastrar/${id}`, form);
      setForm({
        categoria: "",
        titulo: "",
        conteudo: "",
      });
      navigate('/board')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className="card-detalhe" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formQuestao">
        <Form.Label>Título:</Form.Label>
        <Form.Control
          className="titulo-board"
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Categoria:</Form.Label>
        <Form.Control
          className="categoria-board"
          as="select"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        >
          <option value="Questão">Questão</option>
          <option value="Artigo">Artigo</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Órgão:</Form.Label>
        <Form.Control
          className="orgao-board"
          as="select"
          name="orgao"
          value={form.orgao}
          onChange={handleChange}
        >
          {
            orgaos.map((orgao) => {
              return <option value={orgao._id}>{orgao.nome}</option>
            })
          }          
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <ReactQuill
          theme="snow"
          value={form.conteudo}
          onChange={handleChangeQuill}
          modules={toolbarOptions}
        ></ReactQuill>
      </Form.Group>
      <Form.Group>
        <Form.Label>Tags:</Form.Label>
        <Form.Group className="tags-div-board">
          <Button onClick={handleShow}>Adicionar Tag</Button>
        </Form.Group>
        <Form.Group className="tags-lista">
          {
            tags
              .filter((tag) => tagsIds.includes(tag._id))
              .map((tag) => `${tag.nome} `)
          }
        </Form.Group>
      </Form.Group>

      <Button
        type="submit"
        variant="success"
        className="btn-salvar"
        onClick={handleSubmit}
      >
        Salvar
      </Button>
      <Button
        variant="danger"
        className="btn-cancelar"
        onClick={() => navigate("/board")}
      >
        Cancelar
      </Button>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Escolha as tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ToggleButtonGroup type="checkbox" value={tagsIds} onChange={handleChangeTags}>
              {
                tags.map((tag, index) => {
                  return <ToggleButton id={`tbg-btn-${index}`} value={tag._id}> {tag.nome} </ToggleButton>
                })
              }
              </ToggleButtonGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {
                setTagsIds([])
                handleClose()
              }}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleAdicionaTags}>
                Concluir
              </Button>
            </Modal.Footer>
          </Modal>
    </Form>
  );
}
