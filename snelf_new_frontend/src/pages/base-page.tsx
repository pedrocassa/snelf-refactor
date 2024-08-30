import { Button, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import { FlexContainer } from "../components/ui/flex-container"
import { cloneElement } from "react";

const columns = [
    'CodigoNFe',
    'DataEmissao',
    'MunicipioEmitente',
    'unidadecomercial',
    'quantidadecomercial',
    'valorunitariocomercial',
    'DescricaoProduto',
    'CLEAN'
]

// adicionar responsividade
export const BasePage = () => {

    return (
        <FlexContainer
            sx={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <FlexContainer
                sx={{
                    height: '70%',
                    width: '50%',
                    flexDirection: 'column',
                    boxShadow: '9',
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontSize: 50,
                        fontWeight: 700
                    }}
                >
                    Importar Base de Dados de Transações
                </Typography>
                <Typography textAlign={'center'} fontWeight={500}>
                    Importe aqui o arquivo CSV contendo a
                    base de dados a ser utilizada para o treinamento do modelo de inferência.
                </Typography>
                <Typography textAlign={'center'} fontWeight={500}>
                    Arquivo deve conter registros separados por vírgulas, contendo as seguintes colunas:
                </Typography>
                <FlexContainer flexDirection={'column'} marginTop={'5%'} marginBottom={'15%'}>
                    {
                        columns.map((column) => <Typography> - {column}</Typography>)
                    }
                </FlexContainer>
                <FlexContainer
                    sx={{
                        justifyContent: 'space-around',
                        width: '100%',
                        position: 'absolute',
                        bottom: 50
                    }}
                >
                    <Button variant="contained" sx={{ maxWidth: '20%' }}>UPLOAD CSV</Button>
                    <Button variant="contained" sx={{ maxWidth: '20%' }}>IMPORTAR</Button>
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    )
}