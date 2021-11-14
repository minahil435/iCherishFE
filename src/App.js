import './App.css';
import Header from "./components/header/header";
import Login from "./components/Login/Login"
import Home from "./components/Home/home"
import Form from "./components/form/form"
import AuthContextWrapper from "./context/AuthContext"

function App() {
  return (
    <AuthContextWrapper>
     
        <Header />
      {/* <Login /> */}
      {/* <Home /> */}
      <Form/>        
      </AuthContextWrapper>

  );
}

export default App;
