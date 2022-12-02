import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Alert, Box, Button, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const TREINAMENTO_ENDPOINT = `http://localhost:8000/treinarModelo`;

export default function TreinamentoModelo() {

    const [resultMessage, setResultMessage] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await fetch(TREINAMENTO_ENDPOINT, {
            method: "POST",
        })
        .then(r => r.json().then(data => ({ status: r.status })))
        .then(obj => {
            if(obj.status===200){
                setResultMessage(<Alert variant='filled' severity='success' onClose={() => {setResultMessage()}}>Modelo treinado com sucesso</Alert>);
            }else{
                setResultMessage(<Alert variant='filled' severity='error' onClose={() => {setResultMessage()}}>Ocorreu um erro no treinamento do modelo. Código {obj.status}</Alert>);
            }
            setIsLoading(false)
        });
    };

    return (
        <div>
            <Navbar />
            {isLoading ? <LoadingSpinner /> : 
            <Box p={{ xs: 8, sm: 6, md: 9 }} height='80vh' width='80vh' m="auto">
                {resultMessage}
                <Box pb={5}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        rowSpacing={1}
                        alignItems="center"
                    >
                        <Box pt={5} pb={1} textAlign="center">
                            <Typography variant="h3">
                                Treinamento do Modelo
                            </Typography>
                        </Box>

                        <Box p={2} pb={8} textAlign="center">
                            <Typography variant="h8">
                                Clique abaixo para realizar o treinamento do modelo.
                                Recomenda-se que novos treinamentos sejam realizados
                                 a partir da importação de novos dados no banco de dados.
                            </Typography>
                        </Box>

                        <Box pt={7}>
                            <Grid item>
                                <Button component={Link} to={"/"} onClick={handleSubmit} disabled={isLoading} variant="contained">
                                    Treinar Modelo
                                </Button>
                            </Grid>
                        </Box>

                    </Grid>
                </Box>
            </Box>}
        </div>
    )
}
