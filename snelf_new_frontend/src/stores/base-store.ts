import { makeObservable, observable, action, runInAction } from "mobx"
import { BaseService } from "../services/base.service";
import { ProductsType } from "../types/enums";

const baseService = new BaseService();

class BaseStore {
    columns: string[] = [];
    type: ProductsType = ProductsType.MEDICAMENTOS;
    isLoading: boolean = false;
    error: string | null = null;
    status: string | null = null;
    
    constructor() {
        makeObservable(this, {
            columns: observable,
            error: observable,
            isLoading: observable,
            status: observable,
            type: observable,
            setError: action,
            setLoading: action,
            setColumns: action,
            setStatus: action,
            setType: action,
            importMedicinesCsv: action,
            importSuppliesCsv: action,
            importCsv: action,
        })

        this.loadColumns()
    }

    setColumns(nextColumns: string[]) {
        this.columns = nextColumns;
    }

    setLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
    
    setError = (error: string | null) => {
        this.error = error;
    };
    
    setStatus = (status: string | null) => {
        this.status = status;
    };
    
    setType = (type: ProductsType) => {
        this.type = type;
    };
    
    loadColumns() {
        const columns = baseService.getCSVFileColumns();

        this.setColumns(columns);
    }

    importMedicinesCsv = async (csvFile: File) => {
        this.setLoading(true);
        this.setError(null);

        try {
          await baseService.importMedicinesCsv(csvFile);
    
          runInAction(() => {
            this.setStatus("CSV de medicamentos importado com sucesso.");
          });
        } catch (error) {
          runInAction(() => {
            this.setError("Erro ao importar CSV de medicamentos.");
          });
        } finally {
          runInAction(() => {
            this.setLoading(false);
          });
        }
    };
    
    importSuppliesCsv = async (csvFile: File) => {
        this.setLoading(true);
        this.setError(null);
    
        try {
            await baseService.importSuppliesCsv(csvFile);
        
            runInAction(() => {
                this.setStatus("CSV de suprimentos importado com sucesso.");
            });
        } catch (error) {
            runInAction(() => {
                this.setError("Erro ao importar CSV de suprimentos.");
            });
        } finally {
            runInAction(() => {
            this.setLoading(false);
            });
        }
    };
    
    importCsv = async (csvFile: File) => {
        if(this.type === ProductsType.MEDICAMENTOS) 
            await baseService.importMedicinesCsv(csvFile);
        else await baseService.importSuppliesCsv(csvFile);
    };
    
}

export default BaseStore;