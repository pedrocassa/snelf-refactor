import { makeObservable, observable, action, runInAction } from "mobx";
import { ProductsService } from "../services/products.service";
import { ProductsType } from "../types/enums";

const productsService = new ProductsService();

class ProductsStore {
  rows: string[][] = [];
  columns: string[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  search: string = "";
  offset: number = 0;
  limit: number = 10;

  constructor() {
    makeObservable(this, {
      rows: observable,
      columns: observable,
      isLoading: observable,
      error: observable,
      search: observable,
      offset: observable,
      limit: observable,
      setRows: action,
      setColumns: action,
      setLoading: action,
      setError: action,
      setSearch: action,
      setOffset: action,
      setLimit: action,
      loadTableColumns: action,
      loadTableRows: action,
    });

    this.loadTableColumns();
  }

  setRows = (nextRows: string[][]) => {
    this.rows = nextRows;
  };

  setColumns = (nextColumns: string[]) => {
    this.columns = nextColumns;
  };

  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setError = (error: string | null) => {
    this.error = error;
  };

  setSearch = (search: string) => {
    this.search = search;
    this.setOffset(0);
    this.loadTableRows(); 
  };

  setOffset = (offset: number) => {
    this.offset = offset;
    this.loadTableRows();
  };

  setLimit = (limit: number) => {
    this.limit = limit;
    this.setOffset(0);
    this.loadTableRows();
  };

  loadTableColumns = () => {
    this.setLoading(true);

    productsService
      .getTableColumns(ProductsType.MEDICAMENTOS)
      .then((response) => {
        runInAction(() => {
          this.setColumns(response["colunas"]);
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.setError("Erro ao carregar as colunas da tabela.");
        });
      })
      .finally(() => {
        runInAction(() => {
          this.setLoading(false);
        });
      });
  };

  loadTableRows = () => {
    this.setLoading(true);
    
    productsService
      .getTableRows({ search: this.search, offset: this.offset, limit: this.limit })
      .then((response) => {
        runInAction(() => {
          this.setRows(response["medicamentos"]);
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.setError("Erro ao carregar as linhas da tabela.");
        });
      })
      .finally(() => {
        runInAction(() => {
          this.setLoading(false);
        });
      });
  };
}

export default ProductsStore;
