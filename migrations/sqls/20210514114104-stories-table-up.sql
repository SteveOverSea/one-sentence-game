CREATE TABLE stories (id SERIAL PRIMARY KEY,  title VARCHAR, sentences text[], last_sentence text, is_end boolean, is_locked boolean, score integer, contributors VARCHAR[]);