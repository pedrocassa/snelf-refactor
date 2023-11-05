import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Busca from "./pages/Busca";
import Home from "./pages/Home";
import Importacao from "./pages/ImportacaoMedicamento";
import Sobre from "./pages/Sobre";
import Resultado from "./pages/Resultado";
import "./index.css"
import ImportacaoMedicamento from "./pages/ImportacaoMedicamento";
import ImportacaoTransacao from "./pages/ImportacaoTransacao";
import TreinamentoModelo from "./pages/TreinamentoModelo";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
        <BrowserRouter>
            <Routes>
                <Route path="/snelf" element={<Home />} />
                <Route path="/snelf/importacaoMedicamento" element={<ImportacaoMedicamento />} />
                <Route path="/snelf/importacaoTransacao" element={<ImportacaoTransacao/>}/>
                <Route path="/snelf/treinamentoModelo" element={<TreinamentoModelo/>}/>
                <Route path="/snelf/busca" element={<Busca />} />
                <Route path="/snelf/sobre" element={<Sobre />} />
                <Route path="/snelf/resultado" element={<Resultado />} />
            </Routes>
        </BrowserRouter>
);