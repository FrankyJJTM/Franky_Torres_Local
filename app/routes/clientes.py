from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.services.cliente_service import guardarContacto

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