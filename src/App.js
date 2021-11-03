import './App.css';
import Header from "./components/header/header";
import Login from "./components/Login/Login"
import Home from "./components/Home/home"
import AuthContextWrapper from "./context/AuthContext"

function App() {
  return (
    <AuthContextWrapper>
     
        <Header />
      {/* <Login /> */}
      <Home />
        </AuthContextWrapper>

  );
}

export default App;
