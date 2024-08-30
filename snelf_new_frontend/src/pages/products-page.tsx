import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { FlexContainer } from "../components/ui/flex-container"
import { useForm, SubmitHandler, Form, Controller } from "react-hook-form"
import { useEffect } from "react"
import { TableComponent } from "../components/table"

const filters = ['Produto', 'CLEAN']

type Inputs = {
    filter: string
    field: string
}

export const ProductsPage = () => {
    const columns = ['teste', 'teste1', 'teste2']
    const rows = [['1', '2', '3'], ['1', '2', '3'], ['1', '2', '3']]

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <FlexContainer width={'100%'} height={'100%'} flexDirection={'column'}>
            <FlexContainer
                sx={{
                    height: '20%',
                    width: '100%'
                }}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        width: '100%', display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <FlexContainer
                        sx={{
                            height: '10%',
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Controller
                            name="filter"
                            control={control}
                            render={({ field }) => (
                                <FormControl sx={{ width: '10%' }}>
                                    <InputLabel>Filtro</InputLabel>
                                    <Select
                                        {...register("filter")}
                                        {...field}
                                    >
                                        {
                                            filters.map(filter => (
                                                <MenuItem value={filter}>{filter}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="field"
                            control={control}
                            render={({ field }) => (
                                <FormControl sx={{ width: '50%' }}>
                                    <TextField
                                        {...register("field", { required: true })}
                                        {...field}
                                        required
                                        error={errors?.field ? true : false}
                                        label="Pesquise aqui"
                                        variant="outlined"
                                    />
                                </FormControl>
                            )}
                        />
                        <Button type="submit" size="large" variant="contained">Buscar</Button>
                    </FlexContainer>
                </form>
            </FlexContainer>
            <FlexContainer width={'50%'} alignSelf={'center'}>
                <TableComponent columns={columns} rows={rows}/>
            </FlexContainer>
        </FlexContainer >
    )
}