from flask import Blueprint, render_template

clientes_bp = Blueprint('clientes', __name__)

@clientes_bp.route('/')
def index():
    # Renderiza la vista dentro de templates/clientes/
    return render_template('clientes/index.html')