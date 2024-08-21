class ControleDeTreinamento:
    """
    Singleton para controlar o status do pré-processamento.
    """
    _instance = None
    running = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
