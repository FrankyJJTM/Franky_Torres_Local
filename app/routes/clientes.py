from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.services.cliente_service import guardarContacto, validarUsuario

clientes_bp = Blueprint('clientes', __name__)

@clientes_bp.route('/')
def home():
    return render_template('clientes/index.html')

@clientes_bp.route('/productos')
def productos():
    return render_template('clientes/productos.html')

@clientes_bp.route('/nosotros')
def nosotros():
    return render_template('clientes/nosotros.html')

@clientes_bp.route('/galeria')
def galeria():
    return render_template('clientes/galeria.html')

@clientes_bp.route('/contacto', methods=['GET', 'POST'])
def contacto():
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        apellido = request.form.get('apellido')
        telefono = request.form.get('telefono')
        correo = request.form.get('correo')
        mensaje = request.form.get('mensaje')

        guardarContacto(nombre, apellido, telefono, correo, mensaje)

        return render_template('clientes/form.html', mensajeEnviado=True)

    return render_template('clientes/form.html')

@clientes_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form.get('usuario')
        password = request.form.get('password')

        # Se llama a la función en cliente_service.py para verificar las credenciales
        es_valido = validarUsuario(usuario, password)

        if es_valido:
            # Si los datos coinciden con la tabla login, redirige al inicio
            return redirect(url_for('clientes.home'))
        else:
            # Si no coinciden, vuelve a cargar la vista con un mensaje de error
            return render_template('clientes/login.html', error="Usuario o contraseña incorrectos")

    return render_template('clientes/login.html')