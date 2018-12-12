export const userTable = `
  CREATE TABLE IF NOT EXISTS Users (
    id SERIAL,
    firstname varchar(255),
    lastname varchar(255),
    othernames varchar(255),
    username varchar(255) UNIQUE,
    phonenumber varchar(15),
    password varchar(90),
    email varchar(50) UNIQUE,
    registered varchar(30),
    isadmin boolean
  );
`;

export const recordTable = `
  CREATE TABLE IF NOT EXISTS Records (
    id SERIAL,
    createdOn date,
    createdby int,
    location varchar(50),
    type varchar(50),
    status varchar(50),
    Images text[][],
    Videos text[][],
    comment varchar(5000)
  )
`;
