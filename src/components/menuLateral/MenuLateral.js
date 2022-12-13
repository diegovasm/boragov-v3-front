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

export default function MenuLateral() {
  return (

    <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
      <CDBSidebarHeader  prefix={<CDBIcon icon="bars" size="lg" />}>
        Questões            
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem 
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
