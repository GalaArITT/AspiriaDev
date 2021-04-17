--create database AspiriaDatabase
use AspiriaDatabase
Create table Productos
(
	Id int primary key identity(1,1) not null,
	Nombre varchar(50) not null,
	Descripcion varchar(100) null,
	RestriccionEdad int null,
	Compania varchar(50) not null,
	Precio decimal not null
)