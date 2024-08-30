import { Button, Typography } from "@mui/material"
import { FlexContainer } from "../components/ui/flex-container"

export const TrainingPage = () => {

    return (
        <FlexContainer
            sx={{
                width: '100%',
                height: '100%',
                flexDirection: 'column'
            }}
        >
            <FlexContainer
                sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography 
                sx={{
                    fontWeight: 700,
                    fontSize: 50
                }}
                >
                    Treinamento do Modelo
                    </Typography>
                <Typography>
                    Clique abaixo para realizar o treinamento do modelo.
                    Recomenda-se que novos treinamentos sejam realizados a partir da
                    importação de novos dados no banco de dados.
                </Typography>
            </FlexContainer>
            <FlexContainer
                sx={{
                    justifyContent: 'space-around',
                    width: '50%',
                    alignSelf: 'center',
                    marginTop: '2%'
                }}
            >
                <Button variant="contained">TREINAR MODELO</Button>
                <Button variant="contained">PARAR TREINAMENTO</Button>
                <Button variant="contained">RETOMAR TREINAMENTO</Button>
            </FlexContainer>
        </FlexContainer>
    )
}