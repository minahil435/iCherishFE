import './App.css';
import Header from "./components/header/header";
import Signup from './components/Signup/Signup';
import AuthContextWrapper from "./context/AuthContext"

function App() {
  return (
    <AuthContextWrapper>
        {/* <Header /> */}
        <Signup />
        </AuthContextWrapper>

  );
}

export default App;
