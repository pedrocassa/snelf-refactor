from controleDeTreinamento import ControleDeTreinamento
from . import pre_proc_anvisa, pre_proc_anvisa_augmented, pre_proc_medicamentos_augmented, mapeamento_ean_chave
from _data_augmentation import init_data_augmentation
from _move_file import move_file
from _oversampling import oversampling
from _training import train_test_split
import _log_debug.logger as logger

def run(forceRestart=False):
    def processa_etapa(condicao, inicio_msg, fim_msg, func):
        if ControleDeTreinamento.running and (condicao in logger.lastLine() or forceRestart):
            logger.log(inicio_msg)
            func()
            if ControleDeTreinamento.running:
                logger.log(fim_msg)

    logger.erase() if forceRestart else None

    processa_etapa("", "pre_proc_anvisa iniciado", "pre_proc_anvisa finalizado", pre_proc_anvisa.run)
    processa_etapa("pre_proc_anvisa finalizado", "init_data_augmentation iniciado", "init_data_augmentation finalizado", init_data_augmentation.run)
    
    if ControleDeTreinamento.running and "pre_proc_anvisa finalizado" in logger.lastLine():
        move_file.move("datasets/medicamentos/medicamentos_aumentado.csv", "datasets/medicamentos/augmented/medicamentos_aumentado.csv")
        logger.log("move_file 1")
        move_file.move("datasets/anvisa/anvisa_principio_ativo_aumentado.csv", "datasets/anvisa/augmented/anvisa_principio_ativo_aumentado.csv")
        logger.log("move_file 2")
        move_file.move("datasets/anvisa/anvisa_produto_aumentado.csv", "datasets/anvisa/augmented/anvisa_produto_aumentado.csv")
        logger.log("move_file 3")

    processa_etapa("move_file 3", "pre_proc_anvisa_augmented iniciado", "pre_proc_anvisa_augmented finalizado", pre_proc_anvisa_augmented.run)
    processa_etapa("pre_proc_anvisa_augmented finalizado", "pre_proc_medicamentos_augmented iniciado", "pre_proc_medicamentos_augmented finalizado", pre_proc_medicamentos_augmented.run)
    processa_etapa("pre_proc_medicamentos_augmented finalizado", "mapeamento_ean_chave iniciado", "mapeamento_ean_chave finalizado", mapeamento_ean_chave.run)
    processa_etapa("mapeamento_ean_chave finalizado", "oversampling iniciado", "oversampling finalizado", oversampling.run)
    processa_etapa("oversampling finalizado", "train_test_split iniciado", "train_test_split finalizado", train_test_split.run)
