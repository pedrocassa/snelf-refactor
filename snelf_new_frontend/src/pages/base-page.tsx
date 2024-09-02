import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material"
import { FlexContainer } from "../components/ui/flex-container"
import { observer } from "mobx-react"
import { useContext } from "react"
import { RootStoreContext } from "../stores/root-store"

export const BasePage = observer(() => {
    const rootStore = useContext(RootStoreContext);

    return (
        <FlexContainer
            sx={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card elevation={10} sx={{
                width: { xs: '90%', md: '80%', lg: '70%' }
            }}>
                <CardHeader title="Importar Base de Dados de Transações" subheader="Importe aqui o arquivo CSV contendo a
                        base de dados a ser utilizada para o treinamento do modelo de inferência." />
                <CardContent>
                    <Typography textAlign={'center'} fontWeight={'bold'}>
                        Arquivo deve conter registros separados por vírgulas, contendo as seguintes colunas:
                    </Typography>
                    <FlexContainer flexDirection={'column'}>
                        {
                            rootStore && rootStore.baseStore && rootStore.baseStore.columns.map((column) => <Typography> - {column}</Typography>)
                        }
                    </FlexContainer>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained">UPLOAD CSV</Button>
                    <Button variant="contained">IMPORTAR</Button>
                </CardActions>
            </Card>
        </FlexContainer>
    )
})