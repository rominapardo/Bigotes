alter user 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
# CREATE DATABASE bigotes;
USE bigotes;

CREATE TABLE pet (
	id INT NOT NULL AUTO_INCREMENT,
    especie VARCHAR(30),
    nombre VARCHAR(30),
    sexo VARCHAR(1),
    foto VARCHAR(256),
	nacimiento DATE,
    ingreso DATE,
    si_ninos VARCHAR(2),
    si_gatos VARCHAR(2),
    si_perros VARCHAR(2),
    diagnostico VARCHAR(256),
    perfil VARCHAR(256),
    PRIMARY KEY (id));
        
#DROP TABLE pet;
    
INSERT INTO pet VALUES (1,'PERRO','TOBY', 'M','./img/TOBY.jpeg' ,'2020-12-01','2023-08-15','SI','SI','SI','ASMA','Tiene aproximadamente 3 años, muy cariñoso y obediente. Se lleva bien con todos.');
INSERT INTO pet VALUES (2,'PERRO','LEON', 'M','./img/LEON.jpg' ,'2019-12-01','2023-08-15','SI','NO','NO','SANO','Muy lindo y amigable, pero temeroso de los extraños. Tiene 4 años de edad.');
INSERT INTO pet VALUES (3,'PERRO','LUNA', 'F','./img/LUNA.jpeg' ,'2019-12-01','2023-08-15','SI','NO','NO','SANA','Nunca tuvo una casa. Necesita una familia para jugar y divertirse. Es guardiana.');
INSERT INTO pet VALUES (4,'GATO','OTTO', 'M','./img/OTTO.jpeg' ,'2020-12-05','2023-08-15','SI','SI','SI','SANO','Es el gato perfecto. Super compañero, se lleva bien con todos y ama dormir.');

INSERT INTO pet VALUES (5,'GATO','GARFIELD', 'M','./img/GARFIELD.jpg' ,'2021-03-03','2023-07-15','SI','NO','SI','SANO', 'Es un gatito lleno de amor para dar y recibir. Se deja agarrar, alzar y bañar. Es muy curioso.');
INSERT INTO pet VALUES (6,'GATO','MILA', 'F','./img/MILA.jpeg' ,'2023-10-01','2023-12-01','SI','SI','SI','SANA','Es obediente, independiente, juguetona y mimosa.');
INSERT INTO pet VALUES (7,'PERRO','NANDINI','M','./img/NANDINI.jpg','2017-01-01','2023-09-15','SI','SI','SI', 'INTOLERANCIA AL GLUTEN', 'Sociable, tranquilo y educado. Ama la compañia');
INSERT INTO pet VALUES (8,'PERRO','DIYA', 'F', './img/DIYA.png','2016-01-01','2023-07-15','SI','NO','SI', 'SECUELAS PARVOVIRUS','Guardiana. Ama a los niños. Siempre vivió en exrterior.');

SELECT* FROM pet;
SELECT ESPECIE FROM PET;
SELECT DISTINCT ESPECIE FROM PET;
SELECT NOMBRE, ESPECIE FROM PET;
    
    
    
	;