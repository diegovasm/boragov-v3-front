import axios from "axios"
import { Button, Card, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CadastrarBoard.css'
import { api } from "../../api/api.js";

export default function CadastrarBoard({ apiUrl }) {
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

  const navigate = useNavigate()
  const [form, setForm] = useState ({
    categoria: "",
    titulo: "",
    conteudo: ""    
  })


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleChangeQuill = async (content, delta, source, editor) => {

    await setForm({...form, conteudo: editor.getContents()}) 
    console.log(form)
        
  }

  // useEffect(() => {
  //   console.log("Search message inside useEffect: ", form);
  // }, [form]);


    
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      await api.post("/board/cadastrar/6397b3eaef8718faedf1bdf6", form);
      setForm({
        categoria: "",
        titulo: "",
        conteudo: ""    
      })
      // navigate('/questoes')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container className="container-newboard">
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
              className="titulo-board"
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
              type="text"
            //   name="orgao"
            //   value={form.orgao}
            //   onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
                 <ReactQuill theme="snow" value={form.conteudo} onChange={handleChangeQuill} modules={toolbarOptions}>
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
            onClick={handleSubmit}
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