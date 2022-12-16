import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Form, Spinner, Modal } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api.js";
import { toast } from "react-toastify";
import "./DetalhesBoard.css";
import { AuthContext } from "../../contexts/authContext";

export default function DetalhesBoard() {
  const { loggedUser } = useContext(AuthContext);
  const idUser = loggedUser.user?._id;
  const [board, setBoard] = useState({});
  const [show, setShow] = useState(false);
  const [showCriarComentario, setShowCriarComentario] = useState(false);
  const [showCriarResposta, setShowCriarResposta] = useState(false);
  const [comentario, setComentario] = useState({
    comContent: "",
    userComment_id: idUser,
  });
  const [resposta, setResposta] = useState({
    resContent: "",
    userAnswer_id: idUser,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formularioAtivo, setFormularioAtivo] = useState(false);
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
  const [estadoEditor, setEstadoEditor] = useState(true);

  const incrementaView = () => {
    const clone = board;
    delete clone._id;
    if (!clone.visualizacoes) clone.visualizacoes = 0;
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

    if (!formularioAtivo) {
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

    setFormularioAtivo(!formularioAtivo);
  };

  const handleChange = (e) => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  };

  const handleChangeQuill = async (content, delta, source, editor) => {
    await setBoard({ ...board, conteudo: editor.getContents() });
  };

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
  const handleCloseCriarComentario = () => setShowCriarComentario(false);
  const handleShowCriarComentario = () => setShowCriarComentario(true);
  const handleCloseCriarResposta = () => setShowCriarResposta(false);
  const handleShowCriarResposta = () => setShowCriarResposta(true);

  const handleChangeComentario = (e) =>
    setComentario(prevState => {
      return {...prevState, comContent: e.target.value}
    })

  const handleSubmitComentario = async (e) => {
    e.preventDefault();
    try {
      const clone = { ...board, comentarios: comentario };
      delete clone._id;
      await api.put(`board/edit/${id}`, clone);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeQuillResposta = async (content, delta, source, editor) => {
    await setResposta({ resposta, resContent: editor.getContents() });
  };

  const handleSubmitResposta = async (e) => {
    e.preventDefault();
    try {
      const clone = { ...board, respostas: resposta };
      delete clone._id;
      await api.put(`board/edit/${id}`, clone);
    } catch (error) {
      console.log(error);
    }
  };

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
                <ReactQuill
                  className="editor"
                  onChange={handleChangeQuill}
                  theme="snow"
                  value={board.conteudo}
                  readOnly={estadoEditor}
                  modules={toolbarOptions}
                ></ReactQuill>
              </Form.Group>
            </Form.Group>
            <Card.Text className="det-mais-info">
              Data de Cadastro: {board.createdAt || ""}{" "}
              <span> &nbsp; &nbsp; &nbsp; </span>Órgão: {board.orgao.nome || ""}
            </Card.Text>
            <Card.Text className="det-mais-info">
              Tags:{" "}
              <span className="det-tags">
                {board.tags.map((tag) => `${tag.nome} `) || ""}
              </span>{" "}
            </Card.Text>
            <Form.Group className="comentarios">
              {board.comentarios.map((comentario) => {
                return (
                  <div>
                    <p>
                      # {comentario.userComment_id} # em{" "}
                      {Date.now().toLocaleString("pt-br")}:{" "}
                    </p>
                    <p>{comentario.comContent}</p>
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group>
              <Button onClick={handleShowCriarComentario}>Fazer comentário</Button>

              <Modal
                show={showCriarComentario}
                onHide={handleCloseCriarComentario}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Fazer Comentário:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form className="card-comentario">
                    <Form.Group>
                      <Form.Control
                        className="det-comentario"
                        as="textarea"
                        rows={3}
                        type="text"
                        name="comContent"
                        value={comentario.comContent}
                        onChange={handleChangeComentario}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={handleCloseCriarComentario}
                  >
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleSubmitComentario}>
                    Fazer Comentário
                  </Button>
                </Modal.Footer>
              </Modal>

              <Button onClick={handleShowCriarResposta}>Oferecer resposta</Button>

              <Modal show={showCriarResposta} onHide={handleCloseCriarResposta}>
                <Modal.Header closeButton>
                  <Modal.Title>Oferecer Resposta:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form className="card-resposta">
                    <ReactQuill
                      className="editor"
                      onChange={handleChangeQuillResposta}
                      theme="snow"
                      value={resposta.resContent}
                      modules={toolbarOptions}
                    ></ReactQuill>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={handleCloseCriarResposta}
                  >
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleSubmitResposta}>
                    Fazer Comentário
                  </Button>
                </Modal.Footer>
              </Modal>
            </Form.Group>
            <Form.Group>
              {board.respostas.map((resposta) => {
                <ReactQuill
                  className="editor"
                  theme="snow"
                  value={resposta.resContent}
                  readOnly={true}
                ></ReactQuill>;
              })}
            </Form.Group>
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
                onClick={() => {
                  mudaFormulario();
                  document.location.reload(false);
                }}
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
