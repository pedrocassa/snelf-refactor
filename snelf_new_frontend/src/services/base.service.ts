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
}