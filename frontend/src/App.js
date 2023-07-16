import './App.css';
import { Route , Routes} from 'react-router-dom';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ReactDOM from "react-dom/client";
import Registrazione from "./Pages/Registrazione";
import FileViewer from "./Pages/FileViewer";
import ImgAI from "./Pages/ImgAI";
import AIControl from "../src/components/Tempo Libero/modules/AIControl";

export default function App() {
 
  //richiesta pagine con React-Router-Dom
  
  return (

      <Routes>
        <Route>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
          <Route path="/Registrazione" element={<Registrazione />} />
          <Route path="/FileViewer" element={<FileViewer />} />
          
          <Route path="/ImgAI" element={<ImgAI />} />
          <Route path="/success" element={<Home />} />
          <Route path="/AiControl" element={<AIControl />} />
          </Route>
      </Routes>
   
  );
}
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);