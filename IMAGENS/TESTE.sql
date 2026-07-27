/*create database ambiente_teste;*/

/*use ambiente_teste;*/

/*create table teste_not_null (
	id INT,
	nome varchar(50) not null
);*/

/*insert into teste_not_null (id, nome)
	values (1, 'Maria Silva');*/

/*insert INTO teste_not_null (id, nome)
	values (2, NULL);*/

/*create table teste_unique (
	id INT,
	email varchar(100) UNIQUE 
);*/

/*insert into teste_unique (
	id, email)
	values (1, 'contato@empresa.com');*/
    
/*insert into teste_unique (
	id, email)
	values (2, 'contato@empresa.com');*/
    
/*create table setores (id int primary key);*/

/*create table equipe (
	id int,
	setor_id int,
	foreign key (setor_id) references setores(id)
);*/

/*insert into setores (id) values (10);*/

/*insert into equipe (id, setor_id) values (1, 10);*/

/*insert into equipe (id, setor_id) values (2, 99);*/





