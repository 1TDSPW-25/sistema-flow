import './Cabecalho.css'; 
import logo from '../../assets/img/news_icon.png'; 


export const Cabecalho = () => {
  return (
    <header className="cabecalho">
      <div className="logo-container">

        <img src={logo} alt="NewsLab logo" className="logo" /> 
        <h1 className="titulo">NewsLab</h1>
      </div>
      {/* ... */}
    </header>
  );
};