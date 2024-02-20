import { useState } from "react";
import "./../../fonts/ubuntu.css";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="LoginPage">
      <form>
          <div className="formTitle">Enter you credentials</div>
          <label>Username</label>
          <input 
            type="text"
            value={username} 
            onChange={handleUsernameChange}
          />
          <label>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={handlePasswordChange}
          />
          <input className="submitBTN" type="submit" onClick={handleSubmit} value={isLoading? "..." : "Connexion"} />
      </form>
    </main>
  );
}
  
export default LoginPage;
  