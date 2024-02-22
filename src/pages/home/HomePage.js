import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

    return (
      <main className="HomePage">
        <div className="title">Projet AQ54</div>
        <div className="description">
          Etudions la qualité de l'air à Abidjan en mesurant la quantité de particules fines grâces à des capteurs Airqino de 300m de rayon chacun.
        </div>
        <div className="goBTN" onClick={(e) => {navigate("/map")}}>Visualiser les données</div>
      </main>
    );
}
  
  export default HomePage;
  