import os
import threading
from _model import treinar_modelo
from _pre_processamento import init_pre_processamento
from classes.controleDeTreinamento import ControleDeTreinamento

class Treinamento:
    """
    Singleton responsável pelo treinamento do modelo.
    """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def pararTreinamento(self):
        """
        Interrompe o treinamento do modelo.
        """
        self.pararInstanciasTreinamentoThread()
        treinar_modelo.pararTreinamentoModelo()

    def iniciarTreinamento(self, forceRestart=False):
        """
        Inicia ou retoma o treinamento do modelo.
        """
        thread = _ThreadTreinamento(forceRestart)
        thread.start()

    def estaEmTreinamento(self) -> bool:
        """
        Verifica se há treinamento em andamento.
        """
        return bool(_ThreadTreinamento.instancias_ativas)

    def obterStatusTreinamento(self) -> str:
        """
        Obtém o status atual do treinamento.
        """
        status = "[RUNNING] " if self.estaEmTreinamento() else "[STOPPED] "
        statusPreProcessamento = self.obterStatusPreProcessamento()

        if statusPreProcessamento:
            status += statusPreProcessamento
            if 'train_test_split finalizado' in statusPreProcessamento:
                statusTreinamentoModelo = self.obterStatusTreinamentoModelo()
                if statusTreinamentoModelo:
                    status = statusTreinamentoModelo

        return status or "O modelo não está treinado."

    def obterStatusPreProcessamento(self) -> str:
        """
        Obtém o status do pré-processamento.
        """
        return self._obterUltimaLinhaArquivo('_log_debug/log.txt')

    def obterStatusTreinamentoModelo(self) -> str:
        """
        Obtém o status da geração do modelo.
        """
        return self._obterUltimaLinhaArquivo('_model/model.log')

    def _obterUltimaLinhaArquivo(self, caminho: str) -> str:
        """
        Retorna a última linha de um arquivo ou None.
        """
        if os.path.exists(caminho):
            with open(caminho, 'r') as f:
                linhas = f.readlines()
                if linhas:
                    return linhas[-1].strip()
        return None

    def pararInstanciasTreinamentoThread(self):
        """
        Interrompe todas as instâncias de pré-processamento.
        """
        ControleDeTreinamento.running = False
        while self.estaEmTreinamento():
            pass

class _ThreadTreinamento(threading.Thread):
    """
    Executa o treinamento em uma thread separada.
    """
    instancias_ativas = []

    def __init__(self, forceRestart=False):
        super().__init__()
        self.forceRestart = forceRestart
        _ThreadTreinamento.instancias_ativas.append(self)

    def run(self):
        try:
            ControleDeTreinamento.running = True
            init_pre_processamento.run(self.forceRestart)
            if ControleDeTreinamento.running:
                treinar_modelo.run(os.path.dirname(os.path.abspath(__file__)))
        finally:
            _ThreadTreinamento.instancias_ativas.remove(self)