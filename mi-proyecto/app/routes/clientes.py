from flask import Blueprint, render_template

clientes_bp = Blueprint('clientes', __name__)

@clientes_bp.route('/')
def home():
    return render_template('clientes/index.html')

@clientes_bp.route('/producto')
def producto():
    return render_template('clientes/producto.html')

@clientes_bp.route('/nosotros')
def nosotros():
    return render_template('clientes/nosotros.html')