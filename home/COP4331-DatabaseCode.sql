/*
William Gross
COP 4331

This file contains all of the SQL code that should be required to create the
database for the small project. It should be run using the root account. The
website should use the account that is created in this file to access the
database.  
*/

#First, I make sure the database is created.
CREATE DATABASE IF NOT EXISTS Project;

/*
Here I create another user that can access the database. The only privilege that
this user has is to call saved procedures. This is the user that should be used
to access the database from the website.

USERNAME: Visitor
PASSWORD: Password
*/ 

CREATE USER 'Visitor' IDENTIFIED BY 'Password';
GRANT EXECUTE ON Project.* TO 'Visitor';

FLUSH PRIVILEGES;

#Here, the tables for the database are created.
CREATE TABLE IF NOT EXISTS Project.Users(
	User_ID VARCHAR(36) NOT NULL,
    U_Email VARCHAR(50) NOT NULL,
	U_Password VARCHAR(32) NOT NULL,
    U_FirstName VARCHAR(35) NOT NULL,
    U_LastName VARCHAR(35) NOT NULL,
    PRIMARY KEY (User_ID),
	UNIQUE (User_ID),
    UNIQUE (U_Email)
);

CREATE TABLE IF NOT EXISTS Project.Contacts(
	Contact_ID VARCHAR(36) NOT NULL,
    User_ID VARCHAR(36) NOT NULL,
    C_FirstName VARCHAR(35) NOT NULL,
    C_LastName VARCHAR(35) NOT NULL,
    C_PhoneNumber VARCHAR(11) NOT NULL,
    C_Email VARCHAR(50) NOT NULL,
    PRIMARY KEY (Contact_ID),
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
	UNIQUE (Contact_ID)
);

/*
Here are the procedure definitions. They include:
	Project.CheckIfTaken(Email);
	Project.NewUser(Email, Password, First Name, Last Name);
	Project.GetID(Email, Password);
	Project.NewContact(User_ID, First Name, Last Name, Phone Number, Email);
	Project.DeleteContact(Contact_ID);
	Project.GetContacts(User_ID);
*/

DELIMITER //

#Checks if a given email has already been use to make an account
CREATE PROCEDURE Project.CheckIfTaken(IN U_Email_Input VARCHAR(50))
BEGIN
	SELECT COUNT(U_Email) FROM Users WHERE U_Email_Input = U_Email;
END//

#Creates a new user
CREATE PROCEDURE Project.NewUser(
IN
	U_Email_Input VARCHAR(50),
	Password_Input VARCHAR(35),
    FirstName_Input VARCHAR(35),
    LastName_Input VARCHAR(35)
)
BEGIN
	INSERT INTO Project.Users(User_ID, U_Email, U_Password, U_FirstName, U_LastName)
    VALUES(UUID(), U_Email_Input, MD5(Password_Input), FirstName_Input, LastName_Input);
END//

#Gives an ID if the email and password combination is valid
CREATE PROCEDURE Project.GetID(
IN 
	U_Email_Input VARCHAR(50),
	Password_Input VARCHAR(35)
)
BEGIN
	DECLARE temp VARCHAR(32);
    SET temp = MD5(Password_Input);
	SELECT User_ID FROM Project.Users WHERE U_Email = U_Email_Input AND U_Password = temp; 
END//

#Creates a new contact for a given user ID
CREATE PROCEDURE Project.NewContact(
IN
    User_ID_Input VARCHAR(36),
    FirstName_Input VARCHAR(35),
    LastName_Input VARCHAR(35),
    PhoneNumber_Input VARCHAR(11),
    Email_Input VARCHAR(50)
)
BEGIN
	INSERT INTO Project.Contacts(Contact_ID, User_ID, C_FirstName, C_LastName, C_PhoneNumber, C_Email)
    VALUES(UUID(), User_ID_Input, FirstName_Input, LastName_Input, PhoneNumber_Input, Email_Input); 
END//

#Deletes the contact with the given contact ID
CREATE PROCEDURE Project.DeleteContact(
IN
	Contact_ID_Input VARCHAR(36)
)
BEGIN
	DELETE FROM Contacts WHERE Contact_ID = Contact_ID_Input;
END//

#Retrieves all the contacts for a given user ID
CREATE PROCEDURE Project.GetContacts(IN User_ID_Input VARCHAR(36))
BEGIN
	SELECT * FROM Project.Contacts WHERE User_ID_Input = User_ID; 
END//

DELIMITER ;