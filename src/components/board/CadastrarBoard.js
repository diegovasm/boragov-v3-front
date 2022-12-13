import axios from "axios"
import { Button, Card, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CadastrarBoard.css'

export default function CadastrarBoard({ apiUrl, form, setForm }) {
    const [value, setValue] = useState('');
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
//   const navigate = useNavigate()

//   const dataatual = new Date()

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {

//       const tags = form.tags.toUpperCase().split(" ")
//       form.tags = [...tags]
//       form.datacadastro = dataatual.toLocaleString("pt-BR")
//       await axios.post(`${apiUrl}`, form);
//       setForm({
//         titulo: "",
//         problema: "",
//         resultadoesperado: "",
//         tags: [],
//         datacadastro: "",
//         orgao: "",
//         respostas: 0,
//         views: 0,
//         votos:0
//       })
//       navigate('/questoes')

//     } catch (error) {
//       console.log(error)
//     }
//   }

  return (
    <Container className="container-newboard">
    <div> <h1> Colabora!</h1></div>
    <Form className="card-detalhe">
          <Form.Group className="mb-3" controlId="formQuestao">
            <Form.Label>Título:</Form.Label>
            <Form.Control
              className="titulo-board"
              type="text"
            //   name="titulo"
            //   value={form.titulo}
            //   onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Órgão:</Form.Label>
            <Form.Control
              className="orgao-board"
              type="text"
            //   name="orgao"
            //   value={form.orgao}
            //   onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
                 <ReactQuill theme="snow" value={value} onChange={setValue} modules={toolbarOptions}>
                 </ReactQuill>
          </Form.Group>
          <Form.Group>
          <Form.Label>Resultado Esperado</Form.Label>
            <Form.Control
              className="det-board"
              as="textarea"
              rows={3}
              type="text"
            //   name="resultadoesperado"
            //   value={form.resultadoesperado}
            //   onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tags:</Form.Label>
            <Form.Control
              className="tag-board"
              type="text"
            //   name="tags"
              placeholder="Adicione as tags separadas por um espaço"
            //   value={form.tags}
            //   onChange={handleChange}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="success"
            className="btn-salvar"
            // onClick={handleSubmit}
          >
            Salvar
          </Button>
          <Button
            variant="danger"
            className="btn-cancelar"
            // onClick={() => navigate("/questoes")}
          >
            Cancelar
          </Button>
       </Form>
    </Container>
  )
}