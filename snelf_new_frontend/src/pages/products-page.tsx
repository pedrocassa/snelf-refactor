  import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
  import { useForm, SubmitHandler, Controller } from "react-hook-form";
  import { useContext, useEffect } from "react";
  import { TableComponent } from "../components/table";
  import { RootStoreContext } from "../stores/root-store";
  import { observer } from "mobx-react-lite";

  const filters = ["Produto", "CLEAN"];

  type Inputs = {
    filter: string;
    field: string;
  };

  export const ProductsPage = observer(() => {
    const rootStore = useContext(RootStoreContext);

    const productsStore = rootStore?.productsStore;

    const {
      rows,
      columns,
      search,
      offset,
      limit,
      setSearch,
      setOffset,
      setLimit,
      loadTableRows,
    } = productsStore || {};

    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm<Inputs>({
      defaultValues: {
        filter: "Produto",
        field: search || "",
      },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
      setSearch?.(data.field);
    }

    useEffect(() => {
      setValue("field", search || "");
    }, [search, setValue]);

    useEffect(() => {
      loadTableRows?.();
    }, [loadTableRows]);

    return (
      <Grid container justifyContent={"center"} gap={2} marginY={10}>
        <Grid item xs={12} marginX={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent={{ md: "space-between" }}
              alignItems={{ xs: "center" }}
              spacing={{ xs: 3, md: 1 }}
            >
              <Grid item xs={4}>
                <Controller
                  name="filter"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Filtro</InputLabel>
                      <Select {...register("filter")} {...field}>
                        {filters.map((filter) => (
                          <MenuItem key={filter} value={filter}>
                            {filter}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="field"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <TextField
                        {...register("field", { required: true })}
                        {...field}
                        required
                        error={!!errors?.field}
                        label="Pesquise aqui"
                        variant="outlined"
                      />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Button type="submit" variant="contained" fullWidth>
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} marginX={10}>
          <TableComponent
            columns={columns || []}
            rows={rows || []}
            offset={offset ?? 0}
            limit={limit ?? 10}
            onPageChange={(newOffset) => setOffset?.(newOffset)}
            onRowsPerPageChange={(newLimit) => setLimit?.(newLimit)}
          />
        </Grid>
      </Grid>
    );
  });
