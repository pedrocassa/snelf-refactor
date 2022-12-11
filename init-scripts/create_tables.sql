-- public.classes definition

-- Drop table

-- DROP TABLE public.classes;

CREATE TABLE public.classes (
	id serial4 NOT NULL,
	class_label text NOT NULL,
	CONSTRAINT classes_pk PRIMARY KEY (id)
);


-- public.produtos definition

-- Drop table

-- DROP TABLE public.produtos;

CREATE TABLE public.produtos (
	id serial4 NOT NULL,
	clean varchar NOT NULL,
	description text NULL,
	CONSTRAINT produtos_pk PRIMARY KEY (id)
);


-- public.transactions definition

-- Drop table

-- DROP TABLE public.transactions;

CREATE TABLE public.transactions (
	id serial4 NOT NULL,
	codigonfe int4 NULL,
	dataemissao date NULL,
	municipioemitente text NULL,
	unidadecomercial text NULL,
	quantidadecomercial float4 NULL,
	valorunitariocomercial float4 NULL,
	descricaoproduto text NULL,
	clean text NULL,
	CONSTRAINT medicine_transactions_pkey PRIMARY KEY (id)
);


-- public.products_classes definition

-- Drop table

-- DROP TABLE public.products_classes;

CREATE TABLE public.products_classes (
	id serial4 NOT NULL,
	id_produto serial4 NOT NULL,
	id_classe serial4 NOT NULL,
	association_type varchar NULL,
	CONSTRAINT products_classes_pk PRIMARY KEY (id_produto, id_classe),
	CONSTRAINT products_classes_fk FOREIGN KEY (id_produto) REFERENCES public.produtos(id),
	CONSTRAINT products_classes_fk_1 FOREIGN KEY (id_classe) REFERENCES public.classes(id)
);


-- public.products_transactions definition

-- Drop table

-- DROP TABLE public.products_transactions;

CREATE TABLE public.products_transactions (
	id serial4 NOT NULL,
	id_product serial4 NOT NULL,
	id_transaction serial4 NOT NULL,
	CONSTRAINT products_transactions_pk PRIMARY KEY (id),
	CONSTRAINT products_transactions_fk FOREIGN KEY (id_product) REFERENCES public.produtos(id),
	CONSTRAINT products_transactions_fk_1 FOREIGN KEY (id_transaction) REFERENCES public.transactions(id)
);