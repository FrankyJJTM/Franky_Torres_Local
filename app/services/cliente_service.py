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


def validarUsuario(usuario_o_correo, password):
    conexion = obtenerConexion()
    cursor = conexion.cursor()

    # Busca por nombre de usuario o por correo electrónico en la tabla `login`
    sql = """
        SELECT password FROM login
        WHERE usuario = %s OR correo = %s
    """

    cursor.execute(sql, (usuario_o_correo, usuario_o_correo))
    resultado = cursor.fetchone()

    cursor.close()
    conexion.close()

    if resultado:
        password_bd = resultado[0]
        # Compara la contraseña ingresada con la de la BD
        # Nota: Si usas hashing (ej. werkzeug.security o bcrypt), reemplaza esta línea por:
        # return check_password_hash(password_bd, password)
        return password_bd == password

    return False