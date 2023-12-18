from flask import Flask ,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  # crear el objeto app de la clase Flask
#CORS(app, resources={r"/pets": {"origins": "http://127.0.0.1:5500"}}) 
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"]}})

#modulo cors es para que me permita acceder desde el frontend al backend

# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:root@localhost/bigotes' #esto lo voy a cambiar cuando lo hostee en pythonanywhere
#poniendo usuario y contraseña de ahi
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
app.config['DEBUG'] = True
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow

##
# defino las tablas
class pet(db.Model):   # la clase pet hereda de db.Model    
    id=db.Column(db.Integer, primary_key=True) 
    especie=db.Column(db.String(30))  #define los campos de la tabla
    nombre=db.Column(db.String(30))
    sexo=db.Column(db.String(1))
    foto=db.Column(db.String(256))
    nacimiento=db.Column(db.DateTime)
    ingreso=db.Column(db.DateTime)
    si_ninos=db.Column(db.String(2))
    si_gatos=db.Column(db.String(2))
    si_perros=db.Column(db.String(2))
    diagnostico=db.Column(db.String(400))
    perfil=db.Column(db.String(256))
    def __init__(self, especie, nombre, sexo, foto, nacimiento, ingreso, si_ninos, si_gatos, si_perros, diagnostico, perfil):
        self.especie = especie
        self.nombre = nombre
        self.sexo = sexo
        self.foto = foto
        self.nacimiento = nacimiento
        self.ingreso = ingreso
        self.si_ninos = si_ninos
        self.si_gatos = si_gatos
        self.si_perros = si_perros
        self.diagnostico = diagnostico
        self.perfil = perfil

    #  si hay que crear mas tablas , se hace aqui

with app.app_context():
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************
class petSchema(ma.Schema):
    class Meta:
         fields = ('id', 'especie', 'nombre', 'sexo', 'foto', 'nacimiento',  'ingreso',
                    'si_ninos', 'si_gatos', 'si_perros', 'diagnostico', 'perfil')


pet_schema=petSchema()            # El objeto pet_schema es para traer un pet
pets_schema=petSchema(many=True)  # El objeto pet_schema es para traer multiples registros de pet




# crea los endpoint o rutas (json)
@app.route('/pets',methods=['GET'])
def get_pets():
    all_pets=pet.query.all() # el metodo query.all() lo hereda de db.Model
    print(all_pets)  # para debugging      
    result=pets_schema.dump(all_pets)  # el metodo dump() lo hereda de ma.schema y
    print(result)                                             # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla




@app.route('/pets/<id>',methods=['GET'])
def get_pet(id):
    pet=pet.query.get(id)
    return pet_schema.jsonify(pet)   # retorna el JSON de un producto recibido como parametro


""" @app.route('/pets/<id>',methods=['DELETE'])
def delete_pet(id):
    pet=pet.query.get(id)
    db.session.delete(pet)
    db.session.commit()                     # confirma el delete
    return pet_schema.jsonify(pet) # me devuelve un json con el registro eliminado
 """

@app.route('/pets/<id>', methods=['DELETE'])
def delete_pet(id):
    try:
        pet_to_delete = pet.query.get(id)
        if pet_to_delete:
            db.session.delete(pet_to_delete)
            db.session.commit()
            return pet_schema.jsonify(pet_to_delete)
        else:
            return jsonify({'error': 'Pet not found'}), 404
    except Exception as e:
        print(str(e))  # i9mprimir excepcion
        return jsonify({'error': str(e)}), 500

@app.route('/pets', methods=['POST']) # crea ruta o endpoint
def create_pet():
    especie = request.json['especie']
    nombre = request.json['nombre']
    sexo = request.json['sexo']
    foto = request.json['foto']
    nacimiento = request.json['nacimiento']
    ingreso = request.json['ingreso']
    si_ninos = request.json['si_ninos']
    si_gatos = request.json['si_gatos']
    si_perros = request.json['si_perros']
    diagnostico = request.json['diagnostico']
    perfil = request.json['perfil']

    new_pet=pet(especie, nombre, sexo, foto, nacimiento, ingreso, si_ninos, si_gatos, si_perros, diagnostico, perfil)
    db.session.add(new_pet)
    db.session.commit() # confirma el alta
    return pet_schema.jsonify(new_pet)


@app.route('/pets/<id>' ,methods=['PUT']) # es la ruta para la modificacion. Recibe el id como parametro
def update_pet(id):
    pet=pet.query.get(id)
    especie=request.json['especie']
    nombre=request.json['nombre']
    sexo=request.json['sexo']
    foto=request.json['foto']
    nacimiento = request.json['nacimiento']
    ingreso = request.json['ingreso']
    si_ninos = request.json['si_ninos']
    si_gatos = request.json['si_gatos']
    si_perros = request.json['si_perros']
    diagnostico = request.json['diagnostico']
    perfil=request.json['perfil']

    pet.especie=especie
    pet.nombre=nombre
    pet.sexo=sexo
    pet.foto=foto
    pet.nacimiento=nacimiento
    pet.ingreso=ingreso
    pet.si_ninos=si_ninos
    pet.si_gatos=si_gatos
    pet.si_perros=si_perros
    pet.diagnostico=diagnostico
    pet.perfil=perfil

    db.session.commit()    # confirma el cambio
    return pet_schema.jsonify(pet)    # y retorna un json con el producto
 


# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)    # ejecuta el servidor Flask en el puerto 5000