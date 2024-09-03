import axios from "axios"
import { ProductsType } from "../types/enums";

export class ProductsService {
    baseUrl: string = "https://3947-177-12-8-102.ngrok-free.app"

    getTableColumns = (type: ProductsType): Promise<Record<string, string[]>> => {
        const params = new URLSearchParams({ tipo: type });

        return axios.get(`${this.baseUrl}/obter-colunas?${params}`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        });
    }
    
    getTableRows= ({search, offset, limit}: { search: string, offset: number, limit: number }): Promise<Record<string, string[][]>> => {
        const params = new URLSearchParams({ busca: search, offset: offset.toString(), limit: limit.toString() });
        
        return axios.get(`${this.baseUrl}/suprimentos/descricao?${params}, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': true
            }
        }`);
    }
}   