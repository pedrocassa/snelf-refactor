import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Link } from 'react-router-dom';

export default function Sobre() {
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
                                Sobre o Projeto
                            </Typography>
                        </Box>

                        <Box p={1} pb={3} textAlign="center">
                            <Typography variant="h8">
                            O SNELF é uma plataforma para detecção de disparidades de preços em compras públicas. O objetivo é auxiliar na auditoria de notas fiscais relacionadas a compras, e verificar possíveis fraudes.
                            </Typography>
                        </Box>

                        <Grid item>
                            <Button component={Link} to="/" variant="contained">
                                Voltar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}
