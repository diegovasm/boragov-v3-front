import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../../contexts/authContext.js"
import { api } from "../../api/api.js"

export default function LoginSignUp({setLoggedIn}) {

  const [authMode, setAuthMode] = useState("signin")
  const { setLoggedUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [authForm, setAuthForm] = useState({
    nome: "",
    emailPessoal: "",
    emailInstitucional: "",
    password: "",
    codSiape: "",
    profileImg: "",
    nickName:"",
    role:"",
    isAdmin: false

  })

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
    setAuthForm(
        {
          nome: "",
          emailPessoal: "",
          emailInstitucional: "",
          password: "",
          codSiape: "",
          profileImg: "",
          nickName:"",
          role:"",
          isAdmin: false
        }
    )
  }

  const handleOnChange = (e) => {
    
    setAuthForm({ ...authForm, [e.target.name]: e.target.value })
    
  }
  const handleOnSubmitSignIn = async (e) => {
        e.preventDefault()
        try{
        
            const response = await api.post("/user/login", authForm)
            setLoggedUser({...response.data})
            localStorage.setItem("loggedUser", JSON.stringify(response.data))
            setLoggedIn(true)
            
            toast.success("Login realizado com sucesso", {
              
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
            
            navigate("/board")
        } catch(error){
            console.log(error)

            toast.error("Não foi possível efetuar o login", {

                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
  }

  const handleOnSubmitSignUp = async (e) => {
    e.preventDefault()
    try {

      if(authForm.nome === ""){
        alert("Favor preencher o nome do usuário")
      }else if(authForm.emailPessoal === ""){
        alert("Favor preencher o e-mail do usuário")
      }else if(authForm.emailInstitucional === ""){
        alert("Favor preencher o e-mail do usuário")
      }else if(authForm.password.length < 6){
        alert("O password deve conter pelo menos 6 dígitos")
      }else if(authForm.codSiape.length !== 7){
        alert("O código SIAPE deve conter 7 dígitos")
      }else if(authForm.nickName === ""){
        alert("O nick deve ser preenchido")
      }else{

        if(authForm.role === "admin"){
          authForm.isAdmin = true;
        }else{
          authForm.isAdmin = false;
        }
        //envia os dados para que o servidor prossiga com o 
        //cadastro

        await api.post("/user/signup", authForm)

        toast.success("Cadastro realizado com sucesso", {
            
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        setAuthMode("signin")
        setAuthForm(
          {
            nome: "",
            emailPessoal: "",
            emailInstitucional: "",
            password: "",
            codSiape: "",
            profileImg: "",
            nickName:"",
            role:"",
            isAdmin: false
          }  
        )
      }
    } catch (error) {
      console.log(error)
      
      toast.success("Não foi possível efetuar o cadastro.", {
            
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                hidden
                name="nome"
                value={""}
                onChange={handleOnChange}
              />
              <input
                hidden
                name="emailPessoal"
                value={""}
                onChange={handleOnChange}
              />
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                name="emailInstitucional"
                value={authForm.emailInstitucional}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name="password"
                value={authForm.password}
                onChange={handleOnChange}
              />
              <input
                hidden
                name="codSiape"
                value={""}
                onChange={handleOnChange}
              />
              <input
                hidden
                name="profileImg"
                value={""}
                onChange={handleOnChange}
              />
              <input
                hidden
                name="nickName"
                value={""}
                onChange={handleOnChange}
              />
              <input
                hidden
                name="role"
                value={""}
                onChange={handleOnChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleOnSubmitSignIn}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="/">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Nome</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                name="nome"
                value={authForm.nome}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email Pessoal</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                name="emailPessoal"
                value={authForm.emailPessoal}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email emailInstitucional</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                name="emailInstitucional"
                value={authForm.emailInstitucional}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                name="password"
                value={authForm.password}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>SIAPE</label>
              <input
                type="number"
                className="form-control mt-1"
                placeholder="000000"
                name="codSiape"
                value={authForm.codSiape}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Imagem do usuário</label>
              <input
                type="img"
                className="form-control mt-1"
                placeholder="img.png"
                name="profileImg"
                value={authForm.profileImg}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Nick</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="abcd"
                name="nickName"
                value={authForm.nickName}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Papel</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="usuario ou admin"
                name="role"
                value={authForm.role}
                onChange={handleOnChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleOnSubmitSignUp}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="/">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}