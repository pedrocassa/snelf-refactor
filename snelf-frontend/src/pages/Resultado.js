import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import ListaDeCompras from "./resultado/ListaDeCompras";
import DadosDoPreco from "./resultado/DadosDoPreco";
import GraficoBoxPlot from "./resultado/GraficoBoxplot";
import { PDFDownloadLink, Image, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import logo from './images/s_logo.png';
import * as XLSX from 'xlsx';
import {calculaMediana, calculaModa} from "./resultado/dispertionFunctions";


var dados = [];

const styles = StyleSheet.create({
  page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
  },
  section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
  },
  image: {
    width: "50%",
    padding: 30,
    textAlign: "-webkit-center",
    alignItems: "center",
    flexGrow: 1
  },
});

function achaMedia(dataset) {
  var tamDataset = Object.entries(dataset).length;
  var media = Object.entries(dataset)
    .map((e) => e[1].valorunitariocomercial)
    .reduce((acc, current) => acc + current / tamDataset, 0);
  return media.toFixed(2);
}

function achaMediana(dataset) {
  var arr = Object.entries(dataset)
    .map((e) => e[1].valorunitariocomercial);
  var mediana = calculaMediana(arr);
  return mediana.toFixed(2);
}

function achaModa(dataset) {
  var arr = Object.entries(dataset)
    .map((e) => e[1].valorunitariocomercial);
  var moda = calculaModa(arr);
  return moda.toFixed(2);
}

const MyDoc = (data) => {
  const rowData = Object.values(data);

  return (
  <Document>
    <Page width={'100%'} wrap>
      <Image style={styles.image} src={logo} />
      <Text render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />

      <Text>
        {rowData.map((row) => 
          <div>
            <View style={styles.section}>
                <Text>CLEAN: {row.CLEAN}{'\n'}</Text>
                <Text>Código NFe: {row.CodigoNFe}{'\n'}</Text>
                <Text>Data Emissão: {row.DataEmissao}{'\n'}</Text>
                <Text>Descrição Produto: {row.DescricaoProduto}{'\n'}</Text>
                <Text>Municipio Emitente: {row.MunicipioEmitente}{'\n'}</Text>
                <Text>Quantidade Comercial: {row.quantidadecomercial}{'\n'}</Text>
                <Text>Unidade Comercial: {row.unidadecomercial}{'\n'}</Text>
                <Text>Valor Unitario Comercial: {row.valorunitariocomercial}{'\n'}{'\n'}</Text>
            </View>
          </div>
        )}
        <Text>Média: {achaMedia(data)}{'\n'}</Text>
        <Text>Moda: {achaModa(data)}{'\n'}</Text>
        <Text>Mediana: {achaMediana(data)}{'\n'}</Text>

      </Text>
    </Page>
  </Document>
)};

// função que retorna a página a ser exibida na tela, tendo como base a opção selecionada na barra superior
export function getResultPage(selectedPageId,dataset,setDataset,selectDataset) {
  if (selectedPageId === 3) {
    return <GraficoBoxPlot dataset={dataset} />;
  } else if (selectedPageId === 2) {
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

const handleExport = (dados) => {
  const rows = dados.map(row => ({
    CLEAN: row.CLEAN,
    CodigoNFe: row.CodigoNFe,
    DataEmissao: row.DataEmissao,
    DescricaoProduto: row.DescricaoProduto,
    MunicipioEmitente: row.MunicipioEmitente,
    id: row.id,
    quantidadecomercial: row.quantidadecomercial,
    unidadecomercial: row.unidadecomercial,
    valorunitariocomercial: row.valorunitariocomercial
  }))

  const worksheet = XLSX.utils.json_to_sheet(rows);

  var workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Medicamentos");
  
  XLSX.utils.sheet_add_aoa(worksheet, [['CLEAN','CodigoNFe','DataEmissao','DescricaoProduto','MunicipioEmitente','id','quantidadecomercial','unidadecomercial','valorunitariocomercial']], { origin: "A1" } );
  
  XLSX.writeFile(workbook, "Result.xlsx", { compression: true });
}


export default function Resultado({ resultados, stringBusca, tipoBusca }) {
  //variável que controla a barra de seleção, e consequentemente qual página está sendo exibida
  const [resultado, setResultado] = React.useState("");
  const [selectedPageId, setSelectedPageId] = React.useState(1);
  const selectPageById = (event, newSelectedPageId) => {
    setSelectedPageId(newSelectedPageId);
  };
  dados = resultados != null ? Object.keys(resultados).map((key) => resultados[key]) : [];
  
  const [dataset, setDataset] = React.useState(dados);
  const selectDataset = (event, newDataset) => {
    setDataset(newDataset);
  };

  
  
  return (
    <div>
      <Box pt={2} pb={4} textAlign="center">
        <Typography variant="h8">
          <Typography sx={{ fontWeight: "bold" }} variant="h8">
            {dataset ? `Resultado da busca pelo ${tipoBusca.toUpperCase()} "${stringBusca}"` : 'Resultado não encontrado.'}
          </Typography>
        </Typography>
      </Box>

      <div style={{textAlign: "-webkit-center"}}>

        <PDFDownloadLink document={<MyDoc {...dados} />} fileName="results.pdf">
          {({ loading }) =>
            <Button variant="contained" color="primary">{loading ? 'Loading document...' : 'Download PDF'}</Button>
          }
        </PDFDownloadLink>

        <Button variant="contained" color="success" onClick={() => handleExport(dados)} style={{margin: '10px'}} >Exportar Excel</Button>

      </div>

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
      <Box height="80vh" width="105%">
        {getResultPage(selectedPageId, dataset, setDataset, selectDataset)}
      </Box>

    </div>
  );
}