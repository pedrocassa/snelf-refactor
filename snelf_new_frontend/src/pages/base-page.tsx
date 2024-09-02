import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { FlexContainer } from "../components/ui/flex-container"
import { observer } from "mobx-react"
import { useContext, useState } from "react"
import { RootStoreContext } from "../stores/root-store"
import { toJS } from "mobx"

export const BasePage = observer(() => {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | undefined>(undefined);

    const rootStore = useContext(RootStoreContext);

    const baseStore = rootStore?.baseStore;

    const columns = baseStore?.columns;

    const handleOpenDialog = () => setIsOpen(true);
    const handleCloseDialog = () => setIsOpen(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if(file) setFile(file);
    }

    const handleImportCSV = () => {
        if(file) baseStore?.importCsv(file);
    }

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
                    <FlexContainer flexDirection={'column'} marginTop={1}>
                        {
                            columns?.map((column) => <Typography key={column}> - {column}</Typography>)
                        }
                    </FlexContainer>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleOpenDialog}>IMPORTAR</Button>
                </CardActions>
            </Card>

            <Dialog open={isOpen} onClose={handleCloseDialog}>
                <DialogTitle>Importar Base de Dados</DialogTitle>
                <DialogContent>
                    <input type="file" onChange={handleFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleImportCSV}>IMPORTAR</Button>
                </DialogActions>
            </Dialog>
        </FlexContainer>
    )
})