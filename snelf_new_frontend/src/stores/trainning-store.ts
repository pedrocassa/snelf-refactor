import { makeObservable, observable, action, runInAction } from "mobx";
import { TrainningService } from "../services/trainning.service";

const trainningService = new TrainningService();

class TrainningStore {
  isLoading: boolean = false;
  error: string | null = null;
  status: string | null = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      status: observable,
      setLoading: action,
      setError: action,
      setStatus: action,
      startModelTrainning: action,
      stopModelTrainning: action,
      getModelTrainningStatus: action,
    });
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

  startModelTrainning = async (data: { csv_file?: File; forceRestart?: boolean }) => {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await trainningService.startModelTrainning(data);

      runInAction(() => {
        this.setStatus(response.data.status);

        console.log(response.data.texto)
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Erro ao iniciar o treinamento do modelo.");
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  stopModelTrainning = async () => {
    this.setLoading(true);
    this.setError(null);
    try {
      await trainningService.stopModelTrainning();
      runInAction(() => {
        this.setStatus("Treinamento parado com sucesso.");
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Erro ao parar o treinamento.");
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  getModelTrainningStatus = async () => {
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await trainningService.getModelTrainningStatus();
      runInAction(() => {
        this.setStatus(response.data);
      });
    } catch (error) {
      runInAction(() => {
        this.setError("Erro ao obter o status do treinamento.");
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };
}

export default TrainningStore;
