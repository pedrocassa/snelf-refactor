import { Button, Typography } from "@mui/material"
import { FlexContainer } from "../components/ui/flex-container"

export const TrainingPage = () => {

    return (
        <FlexContainer flexDirection={"column"} alignItems={"center"} gap={2} marginX={2}>
            <Typography fontWeight={700} fontSize={50}>
                Treinamento do Modelo
            </Typography>
            <Typography textAlign={"center"}>
                Clique abaixo para realizar o treinamento do modelo.
                Recomenda-se que novos treinamentos sejam realizados a partir da
                importação de novos dados no banco de dados.
            </Typography>

            <FlexContainer justifyContent={"center"} gap={2}>
                <Button variant="contained">TREINAR MODELO</Button>
                <Button variant="contained">PARAR TREINAMENTO</Button>
                <Button variant="contained">RETOMAR TREINAMENTO</Button>
            </FlexContainer>
        </FlexContainer>
    )
}