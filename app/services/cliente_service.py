from app.database import obtenerConexion

def guardarContacto(nombre, apellido, telefono, correo, mensaje):
    conexion = obtenerConexion()
    cursor = conexion.cursor()

    sql = """
        INSERT INTO contactos
        (nombre, apellido, telefono, correo, mensaje)
        VALUES (%s, %s, %s, %s, %s)
    """

    valores = (nombre, apellido, telefono, correo, mensaje)

    cursor.execute(sql, valores)
    conexion.commit()

    cursor.close()
    conexion.close()