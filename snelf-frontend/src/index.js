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

const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="importacaoMedicamento" element={<ImportacaoMedicamento />} />
                <Route path="importacaoTransacao" element={<ImportacaoTransacao/>}/>
                <Route path="busca" element={<Busca />} />
                <Route path="sobre" element={<Sobre />} />
                <Route path="resultado" element={<Resultado />} />
            </Routes>
        </BrowserRouter>
);