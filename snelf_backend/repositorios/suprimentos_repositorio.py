from dao.suprimentos_dao import SuprimentosDao

class SuprimentosRepositorio():
    def __init__(self):
        self.dao = SuprimentosDao()
        
    def inserir_suprimentos(self, suprimentos):
        return self.dao.inserir_suprimentos(suprimentos)