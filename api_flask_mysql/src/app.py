from flask import Flask ,jsonify ,request
from flask_mysqldb import MYSQL
from config import config
app = Flask(__name__)
@app.route('/')
def index():
    return "Romi-sola en el trabajo probando"
if __name__== '__main__':
    #app.run(debug=True) #asi le indico que estoy en modo desarrollo, y al hacer un cambio se refresca en el servidor. Ver en el navegador
    #con esto tengo un servido con python y flask.
    #ahora vamos a conectarnos a la base de datos
    # vamos a listar las mascotas, leerlas, registar una nueva, actualizar y eliminar.
    # para poder conectar a la base voy a crear una coneccion desde flask y establecer los parametros de conexion
    # servidor, nombre d ela base, usuario y contraseña. 
    #los parametros de depurtación los voy a poner en un archivo aparte creado en src config.py

    app.config.from_object(config['development'])
    app.run()