CREATE DATABASE uncocina;
USE uncocina;
CREATE TABLE user (
  user_email VARCHAR(255),
  user_name VARCHAR(64),
  password VARCHAR(64) NOT NULL,
  PRIMARY KEY(user_email, user_name)
);

CREATE TABLE recipe (
  recipe_name VARCHAR(64),
  user_email VARCHAR(255),
  user_name VARCHAR(64),
  steps JSON NOT NULL,
  imageURL VARCHAR(500) NOT NULL,
  estimatedTime INTEGER NOT NULL,
  creationDate DATE NOT NULL,
  difficulty VARCHAR(10) NOT NULL DEFAULT 'Media', CHECK (difficulty IN ('Facil', 'Media', 'Dificil')), 
  ingredients JSON NOT NULL,
  FOREIGN KEY (user_email, user_name) REFERENCES user(user_email, user_name) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY (recipe_name, user_email, user_name)
);

CREATE TABLE category(
  category_name VARCHAR(64) PRIMARY KEY
);

CREATE TABLE haveFav(
  recipe_name VARCHAR(64),
  recipe_user_email VARCHAR(255),
  recipe_user_name VARCHAR(64),
  user_email VARCHAR(255),
  user_name VARCHAR(64),
  FOREIGN KEY (recipe_name, recipe_user_email, recipe_user_name) REFERENCES recipe(recipe_name, user_email, user_name) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (user_email, user_name) REFERENCES user(user_email, user_name) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name)
);

CREATE TABLE qualify(
  recipe_name VARCHAR(64),
  recipe_user_email VARCHAR(255),
  recipe_user_name VARCHAR(64),
  user_email VARCHAR(255),
  user_name VARCHAR(64),
  calification INTEGER NOT NULL, CHECK (calification>=1 AND calification<=5),  
  FOREIGN KEY (recipe_name, recipe_user_email, recipe_user_name) REFERENCES recipe(recipe_name, user_email, user_name) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (user_email, user_name) REFERENCES user(user_email, user_name) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY(recipe_name, recipe_user_email, recipe_user_name, user_email, user_name, calification)
);

CREATE TABLE belongs(
  recipe_name VARCHAR(64),
  recipe_user_email VARCHAR(255),
  recipe_user_name VARCHAR(64),
  category_name VARCHAR(64),
  FOREIGN KEY (recipe_name, recipe_user_email, recipe_user_name) REFERENCES recipe(recipe_name, user_email, user_name) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (category_name) REFERENCES category(category_name) ON UPDATE CASCADE ON DELETE CASCADE,
  PRIMARY KEY(recipe_name, recipe_user_email, recipe_user_name, category_name)
);