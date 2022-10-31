import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import React from "react";
import ListaDeCompras from "./resultado/ListaDeCompras";
import DadosDoPreco from "./resultado/DadosDoPreco";
import GraficoBoxPlot from "./resultado/GraficoBoxplot";

// import dados mock dipirona
import dadosProdutos from "../DADOS_REAIS_MOCK.json";
// var dadosMock = Object.keys(dadosProdutos).map((key) => dadosProdutos[key]);
var dados = [];

// função que retorna a página a ser exibida na tela, tendo como base a opção selecionada na barra superior
export function getResultPage(selectedPageId,dataset,setDataset,selectDataset) {
  if (selectedPageId === 3) {
    // gráfico da variável preço no tempo
    return <GraficoBoxPlot dataset={dataset} />;
  } else if (selectedPageId === 2) {
    //página com os dados da variável preço no tempo
    return <DadosDoPreco dataset={dataset} />;
  } else if (selectedPageId === 1) {
    return (
      <ListaDeCompras
        dataset={dataset}
        setDataset={setDataset}
        selectDataset={selectDataset}
      />
    );
  } else {
    return <div></div>;
  }
}

export default function Resultado({ resultados }) {
  //variável que controla a barra de seleção, e consequentemente qual página está sendo exibida
  const [resultado, setResultado] = React.useState("");
  const [selectedPageId, setSelectedPageId] = React.useState(1);
  const selectPageById = (event, newSelectedPageId) => {
    setSelectedPageId(newSelectedPageId);
  };

  debugger;
  console.log(`resultados: ${resultados}`);
  dados = resultados != null ? Object.keys(resultados).map((key) => resultados[key]) : [];
  //variável que controla o dataset para exclusão de registros

  console.log(`dados: ${dados}`)
  const [dataset, setDataset] = React.useState(dados);
  const selectDataset = (event, newDataset) => {
    setDataset(newDataset);
    console.log(newDataset);
  };

  return (
    <div>
      <Box pt={2} pb={4} textAlign="center">
        <Typography variant="h8">
          <Typography sx={{ fontWeight: "bold" }} variant="h8">
            {resultado ? `Resultado da busca pelo produto ${resultado}` : ''}
          </Typography>
        </Typography>
      </Box>

      {/* Page Selector */}
      <Box
        sx={{
          width: "100%",
          marginBottom: "5%",
          bgcolor: "background.paper",
        }}
      >
        <Tabs value={selectedPageId} onChange={selectPageById} centered>
          <Tab label="Lista de compras" value={1} />
          <Tab label="Dados da variável preço" value={2} />
          <Tab label="Gráfico da variável preço" value={3} />
        </Tabs>
      </Box>

      {/* Resultado */}
      <Box pb={10} height="80vh" width="100%" m="auto">
        {getResultPage(selectedPageId, dataset, setDataset, selectDataset)}
      </Box>
    </div>
  );
}