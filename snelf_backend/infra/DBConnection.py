import psycopg2

class DBConnection:
    _self = None
    connection = None
    cursor = None

    def __new__(cls):
        if cls._self is None:
            cls._self = super().__new__(cls)

            database = "testejp"
            user = "testejp"
            password = "testejp"
            host = "snelf-postgres"
            port = "5432"

            try:
                cls._self.connection = psycopg2.connect(database=database, user=user, password=password, host=host, port=port)
            except Exception as e:
                cls._self.connection = psycopg2.connect(database=database, user=user, password=password, host="localhost", port="54320")

            cls._self.connection.autocommit = True
            cls._self.cursor = cls._self.connection.cursor()

        return cls._self


