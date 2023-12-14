import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import Register from "./components/account/Register";
import Login from "./components/account/Login";
import DicasCuidados from "./components/DicasCuidados";
import MausTratos from "./components/MausTratos";
import Account from "./components/account/Account";
import AccountEdit from "./components/account/AccountEdit";
import ShowPetInfo from "./components/home/ShowPetInfo";
import RegisterPet from "./components/account/RegisterPet";
import FormularioEdit from "./components/account/RegisterPetEdit";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/account-edit/:id" element={<AccountEdit/>}/>
        <Route path="/dicas-cuidados" element={<DicasCuidados/>}/>
        <Route path="/maus-tratos" element={<MausTratos/>}/>
        <Route path="/pet-info/:id" element={<ShowPetInfo/>}/>
        <Route path="/register-pet/:id" element={<RegisterPet/>}/>
        <Route path="/pet-edit/:id" element={<FormularioEdit/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;