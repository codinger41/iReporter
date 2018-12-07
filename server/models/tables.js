export const userTable = `
  CREATE TABLE IF NOT EXISTS user(
    id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    othernames varchar(255) NOT NULL,
    email varchar(30) NOT NULL,
    password varchat(25) NOT NULL,
    phoneNumber varchar(255),
    registered DATE,
    isAdmin BOOLEAN DEFAULT False,
  );
`;

export const recordTable = `
  id int NOT NULL AUTO_INCREMENT,
  createdOn DATE, 
  createdBy int NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  Images varray,
  Videos varray,
  comment TEXT NOT NULL,
  location TEXT,
`;
