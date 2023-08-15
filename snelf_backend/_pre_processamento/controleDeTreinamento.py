class ControleDeTreinamento:
    """
    Classe singleton responsável por controlar se o pré-processamento está em andamento ou não.

    Esta classe contém uma variável estática `running` que guarda o status do pré-processamento.

    :ivar running: Variavel responsável por dizer se o pré-processamento está em execução ou não
    :vartype running: bool
    """

    _self = None

    running = False

    def __new__(cls):
        if cls._self is None:
            cls._self = super().__new__(cls)
        return cls._self