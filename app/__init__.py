from flask import Flask

def create_app():
    app = Flask(__name__)

    from app.routes.clientes import clientes_bp
    app.register_blueprint(clientes_bp)

    return app