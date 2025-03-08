CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    role VARCHAR(50) NOT NULL CHECK (role IN ('superadmin', 'admin', 'moderator')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins (email, password, role)
VALUES ('mahmoud@gmail.com', 'creed123', 'admin');




CREATE TABLE users ( 

     id SERIAL PRIMARY KEY, 
     name VARCHAR(50) NOT NULL, 
     email VARCHAR(150) UNIQUE NOT NULL,
     password TEXT NOT NULL,
     role VARCHAR(50) NOT NULL CHECK (role IN ('user') ),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
INSERT  INTO users (name , email , password, role) VALUES ('mahmoud', 'mahmoud1@gmail.com', 'creed123', 'user');




