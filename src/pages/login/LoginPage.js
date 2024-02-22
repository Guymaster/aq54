import { useState } from "react";
import "./../../fonts/ubuntu.css";
import "./LoginPage.css";
import { AuthService } from "../../auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsDenied(false);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsDenied(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let user = await AuthService.signIn(email, password);
    setIsLoading(false);
    if(user){
      navigate("/map");
    }
    else{
      setIsDenied(true);
    }
  };

  return (
    <main className="LoginPage">
      <form>
          <div className="formTitle">Entrez vos identifiants</div>
          <label>Email</label>
          <input 
            type="text"
            value={email} 
            onChange={handleEmailChange}
          />
          <label>Mot de Passe</label>
          <input 
            type="password" 
            value={password}
            required
            onChange={handlePasswordChange}
          />
          <input className={isDenied? "submitBTN denied" : "submitBTN"} type="submit" onClick={handleSubmit} value={isDenied? "Accès refusé" : (isLoading? "..." : "Connexion")} disabled={isDenied} required />
      </form>
    </main>
  );
}
  
export default LoginPage;
  