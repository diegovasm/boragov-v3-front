import "./MenuLateral.css"
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
  CDBIcon,
  CDBBadge
} from "cdbreact"
import { useNavigate } from "react-router-dom"

export default function MenuLateral() {

  const navigate = useNavigate()

  const handleChangeTag = () =>{

    navigate('/tag/alltag')
  }
  const handleChangeUsuarios = () =>{

    navigate('/user')
  }
  const handleChangeOrgaos = () =>{

    navigate('/orgao')
  }
  return (

    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
      <CDBSidebarHeader  prefix={<CDBIcon icon="bars" size="lg" />}>
        Questões            
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem 
          onClick={handleChangeTag} 
           suffix={
            <CDBBadge className="badgeTags" color="primary-gradient" size="small" borderType="pill" textColor="white" intensity={900}>
                130
            </CDBBadge>
            }
            icon="tags"
          >
          Tags
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem 
            onClick={handleChangeUsuarios} 
            suffix={
            <CDBBadge className="badgeUsers" color="info" size="small" borderType="pill" intensity={900}>
                70
            </CDBBadge>
            }
            icon="user"
          >
          Usuários
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            onClick={handleChangeOrgaos} 
            suffix={
            <CDBBadge className="badgeOrgaos" color="info" size="small" borderType="pill" intensity={900}>
                50
            </CDBBadge>
            }
          icon="city"
          >
          Órgãos
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>

      </CDBSidebarFooter>
    </CDBSidebar>
  );
}
