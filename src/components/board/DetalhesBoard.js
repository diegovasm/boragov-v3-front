import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form, Spinner, Modal } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api.js";
import { toast } from "react-toastify";
import "./DetalhesBoard.css";

export default function DetalhesBoard(){

  const [board, setBoard] = useState({});
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formularioAtivo, setFormularioAtivo] = useState(false);
  const toolbarOptions = {toolbar: [
    [{font: []}, { size: [ 'small', false, 'large', 'huge' ]}],
    [{ align: [] }, 'direction' ],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{ color: [] }, { background: [] }],
    [{ script: 'super' }, { script: 'sub' }],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image','code-block'],
    ['clean']
  ]}
  const [estadoEditor, setEstadoEditor] = useState(true)

  const incrementaView = () => {
    const clone = board;
    delete clone._id;
    if(!clone.visualizacoes) clone.visualizacoes = 0
    clone.visualizacoes++;
    api.put(`board/edit/${id}`, clone);
    navigate("/board");
  };

  useEffect(() => {
    try {
      const fetchQuestao = async () => {
        const response = await api.get(`board/${id}`);
        setBoard(response.data);
        setIsLoading(false);
      };

      fetchQuestao();
    } catch (error) {
      console.log(error);
    }
  }, [id]);


  const mudaFormulario = () => {
    let formQuestao = document.querySelectorAll(".formQuestao");
    let btnAtualizar = document.querySelector(".btn-atualizar");
    let btnSalvar = document.querySelector(".btn-salvar");
    let btnExcluir = document.querySelector(".btn-excluir");
    let btnCancelar = document.querySelector(".btn-cancelar");
    let btnVoltar = document.querySelector(".btn-voltar");
    

    if (!formularioAtivo){      
      formQuestao.forEach((element) => {
        element.removeAttribute("disabled");
      });
      setEstadoEditor(false);
    } else {      
      formQuestao.forEach((element) => {
        element.setAttribute("disabled", "");
      });
      setEstadoEditor(true);
    }
    btnAtualizar.classList.toggle("hide");
    btnSalvar.classList.toggle("hide");
    btnExcluir.classList.toggle("hide");
    btnCancelar.classList.toggle("hide");
    btnVoltar.classList.toggle("hide");

    setFormularioAtivo(!formularioAtivo)
  };

  const handleChange = (e) => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  };

  const handleChangeQuill = async (content, delta, source, editor) => {
    await setBoard({...board, conteudo: editor.getContents()}) 
  }

  const handleSubmit = async (e) => {   
    mudaFormulario();
    e.preventDefault();    
    try {
      const clone = { ...board };
      delete clone._id;
      await api.put(`board/edit/${id}`, clone);
    } catch (error) {
      console.log(error);
    }   
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteBoard = async () => {
    await api.delete(`board/delete/${id}`);
    navigate("/board");

    toast.success("Board deletado com sucesso!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <Form className="card-detalhe">
      {isLoading && (
        <div className="questoes-spinner">
          <Spinner className="mt-4" animation="border" />
        </div>
      )}
      {!isLoading && (
        <Card className="text-center">
          <Card.Header as="h5" className="card-header">
            Board
          </Card.Header>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja excluir o board?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Uma vez excluído não será possível recuperar as informações.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deleteBoard(id)}>
            Excluir Board
          </Button>
        </Modal.Footer>
      </Modal>
          <Card.Body>
            <Form.Group className="mb-3" controlId="formQuestao1">
              <Form.Control
                disabled
                className="det-titulo formQuestao"
                type="text"
                name="titulo"
                value={board.titulo || ""}
                onChange={handleChange}
              />
                <Form.Group>
                    <ReactQuill className="editor" onChange={handleChangeQuill}  theme="snow" value={board.conteudo} readOnly={estadoEditor} modules={toolbarOptions}>
                    </ReactQuill>
                </Form.Group>
            </Form.Group>
            <Card.Text className="det-mais-info">
              Data de Cadastro: {board.createdAt || ""}{" "}
              <span> &nbsp; &nbsp; &nbsp; </span>Órgão: {board.orgao || ""}
            </Card.Text>
            <Card.Text className="det-mais-info">
              Tags: <span className="det-tags">{board.tags || ""}</span>{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted det-footer">
            <p>
              <Button
                variant="success"
                className="btn-salvar hide"
                onClick={handleSubmit}
              >
                Salvar
              </Button>
              <Button
                variant="primary"
                className="btn-atualizar"
                onClick={mudaFormulario}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                className="btn-excluir"
                onClick={handleShow}
              >
                Excluir
              </Button>
              <Button
                variant="danger"
                className="btn-cancelar hide"
                onClick={()=>navigate(`/board/`)}
              >
                Cancelar
              </Button>
            </p>
            <Button
              variant="primary"
              className="btn-voltar"
              onClick={incrementaView}
            >
              Voltar
            </Button>
          </Card.Footer>
        </Card>
      )}
    </Form>
  );
}
    
