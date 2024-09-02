import axios from "axios";

export class BaseService {
    baseUrl: string = "https://3947-177-12-8-102.ngrok-free.app"

    getCSVFileColumns = (): string[] => {
        return [
            'CodigoNFe',
            'DataEmissao',
            'MunicipioEmitente',
            'unidadecomercial',
            'quantidadecomercial',
            'valorunitariocomercial',
            'DescricaoProduto',
            'CLEAN'
        ]
    }

    importMedicinesCsv = (csvFile: File) => {
        const formData = new FormData();

        formData.append("csvFile", csvFile);
    
        return axios.post(`${this.baseUrl}/importar-csv-medicamentos`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      };
    
    importSuppliesCsv = (csvFile: File) => {
        const formData = new FormData();

        formData.append("csvFile", csvFile);

        return axios.post(`${this.baseUrl}/importar-csv-suprimentos`, formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });
    };
}