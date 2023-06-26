import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <Navbar />
            <Box p={{ xs: 0, sm: 0, md: 4 }} height='80vh' width='80vh' m="auto">
                <Box pb={5}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        rowSpacing={1}
                        alignItems="center"
                    >
                        <Box pt={1} pb={1} textAlign="center">
                            <Typography variant="h3">
                                SNELF
                            </Typography>
                        </Box>

                        <Box p={1} pb={7} textAlign="center">
                            <Typography variant="h8">
                            O SNELF é uma ferramenta para identificação disparidades em preços praticados em compras públicas.
                            </Typography>
                        </Box>
                        
                        <Grid item>
                            <Button component={Link} to="/busca" variant="contained">
                                Buscar Produto
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
