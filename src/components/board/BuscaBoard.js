import './BuscaBoard.css'
import { useEffect, useState } from "react"
import { Container, Spinner} from "react-bootstrap"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { api } from "../../api/api.js"


export default function BuscaQuestoes() {

    const [boards, setBoards] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { busca } = useParams()

    useEffect(() => {
        try {
            const fetchBoards = async () => {
                console.log(busca)
                const response = await api.get(`/board/buscar/${busca}`)
                console.log(response.data)
                setBoards(response.data)
                setIsLoading(false)
            }

            fetchBoards()

        } catch (error) {

            console.log(error)
        }
    }, [busca])

          const renderBoards = boards.filter((board) => {

            //const stringTags = board.tags.toString()
            const escopoBusca = ((board.titulo).toLowerCase())
                                .concat((board.conteudo).toLowerCase())
                                .concat((board.respostas.resContent).toLowerCase())
                                //.concat(stringTags.toLocaleLowerCase())
           return (

                escopoBusca.includes(busca.toLocaleLowerCase())
             
           )
           }).map((board) => {
              return (
                  <Link to={`/board/detalhes/${board._id}`} >
                      <div className="item-board" id={board._id}>
                          <div className="indicadores-board">
                              <p>{board.votos} votos</p>
                              <p>{board.respostas} respostas</p>
                              <p>{board.views} visualizações</p>
                          </div>
                          {/* <div className="resumo-board">
                              <h3>{board.titulo}</h3>
                              <p className="tags"> {renderTags} </p>
                          </div> */}
                      </div>
                  </Link>
                 
              )
          })
        
   


    return (
        <Container>
            {isLoading && <Spinner className="mt-4" animation="border" />}
            {!isLoading &&
                <div>
                    {renderBoards}
                </div>
            }
        </Container>

    )

}