import axios from "axios"

export class TrainningService {
    baseUrl: string = "https://3947-177-12-8-102.ngrok-free.app"

    startModelTrainning = (data: { csv_file?: File, forceRestart?: boolean }) => {
        const formData = new FormData();

        if (data.csv_file) formData.append("csv_file", data.csv_file);

        formData.append("forceRestart", String(data.forceRestart || false));
        
        return axios.post(`${this.baseUrl}/treinar-modelo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
    
    stopModelTrainning = () => {
        return axios.post(`${this.baseUrl}/parar-treinamento`)
    }
    
    getModelTrainningStatus = () => {
        return axios.get(`${this.baseUrl}/obter-status-treinamento`)
    }
}   