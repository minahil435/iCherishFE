import './App.css';
import Header from "./components/header/header";
import Login from "./components/Login/Login"
import AuthContextWrapper from "./context/AuthContext"

function App() {
  return (
    <AuthContextWrapper>
        {/* <Header /> */}
      <Login />
        </AuthContextWrapper>

  );
}

export default App;
