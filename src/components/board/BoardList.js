import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./BoardList.css"
import {api} from "../../api/api.js"

export default function BoardList() {
  const [board, setBoard] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const fetchBoards = async () => {
        const response = await api.get("/board")
        setBoard(response.data)
        setIsLoading(false)
      };

      fetchBoards()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const renderBoards = board.map((board) => {
    return (
      <Link to={`/board/detalhes/${board._id}`}>
        <div className="item-questao" id={board._id}>
          <div className="indicadores-questao">
            <p>{board.votos} votos</p>
            <p>{board.respostas} respostas</p>
            <p>{board.views} visualizações</p>
          </div>
          <div className="resumo-questao">
            <h5>{board.titulo}</h5>
            <p className="tags">  </p>
          </div>
        </div>
      </Link>
    )
  })

  return (
    <Container className="lista-questoes">
      {isLoading && (
        <div className="questoes-spinner">
          <Spinner className="mt-4" animation="border" />
        </div>
      )}
      {!isLoading && <div>{renderBoards}</div>}
    </Container>
  )
}