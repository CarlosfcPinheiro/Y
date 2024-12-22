CREATE SCHEMA yweb;

SET search_path TO yweb;

CREATE TABLE
    yweb.users (
                   id SERIAL NOT NULL,
                   name CHARACTER VARYING(40) NOT NULL,
                   password CHARACTER VARYING(60) NOT NULL,
                   email CHARACTER VARYING(40) NOT NULL,
                   posts_qnt INTEGER NOT NULL DEFAULT 0,
                   created_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT current_timestamp,
                   CONSTRAINT users_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

CREATE TABLE
    yweb.posts (
                   id SERIAL NOT NULL,
                   description CHARACTER VARYING(200) NULL,
                   img_data TEXT NULL,
                   created_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT current_timestamp,
                   userid INTEGER NOT NULL,

                   CONSTRAINT posts_pkey PRIMARY KEY (id),
                   CONSTRAINT posts_userid_fkey FOREIGN KEY (userid) REFERENCES yweb.users (id)
) TABLESPACE pg_default;