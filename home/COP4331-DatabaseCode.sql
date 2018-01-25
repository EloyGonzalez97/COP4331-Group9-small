/*
William Gross
COP 4331
Last Edited: January 25, 2018

This file contains all of the SQL code that should be required to create the
database for the small webalex_project_one.. It should be run using the root account. The
website should use the account that is created in this file to access the
database.  
*/


#Here, the tables for the database are created.
CREATE TABLE IF NOT EXISTS webalex_project_one.Users(
	User_ID VARCHAR(36) NOT NULL,
    U_Email VARCHAR(50) NOT NULL,
	U_Password VARCHAR(32) NOT NULL,
    U_FirstName VARCHAR(35) NOT NULL,
    U_LastName VARCHAR(35) NOT NULL,
    PRIMARY KEY (User_ID),
	UNIQUE (User_ID),
    UNIQUE (U_Email)
);

CREATE TABLE IF NOT EXISTS webalex_project_one.Contacts(
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
	webalex_project_one.CheckIfTaken(Email);
	webalex_project_one.NewUser(Email, Password, First Name, Last Name);
	webalex_project_one.GetID(Email, Password);
	webalex_project_one.NewContact(User_ID, First Name, Last Name, Phone Number, Email);
	webalex_project_one.DeleteContact(Contact_ID);
	webalex_project_one.GetContacts(User_ID);
*/

DELIMITER //

#Checks if a given email has already been use to make an account
CREATE PROCEDURE webalex_project_one.CheckIfTaken(IN U_Email_Input VARCHAR(50))
BEGIN
	SELECT COUNT(U_Email) FROM Users WHERE U_Email_Input = U_Email;
END//

#Creates a new user
CREATE PROCEDURE webalex_project_one.NewUser(
IN
	U_Email_Input VARCHAR(50),
	Password_Input VARCHAR(35),
    FirstName_Input VARCHAR(35),
    LastName_Input VARCHAR(35)
)
BEGIN
	INSERT INTO webalex_project_one.Users(User_ID, U_Email, U_Password, U_FirstName, U_LastName)
    VALUES(UUID(), U_Email_Input, Password_Input, FirstName_Input, LastName_Input);
END//

#Gives an ID if the email and password combination is valid
CREATE PROCEDURE webalex_project_one.GetID(
IN 
	U_Email_Input VARCHAR(50),
	Password_Input VARCHAR(35)
)
BEGIN
	SELECT User_ID FROM webalex_project_one.Users WHERE U_Email = U_Email_Input AND U_Password = Password_Input; 
END//

CREATE PROCEDURE webalex_project_one.GetName(
IN
	U_ID_Input VARCHAR(36)
)
BEGIN
	SELECT U_FirstName, U_LastName FROM webalex_project_one.Users Where User_ID = U_ID_Input;
END//

#Creates a new contact for a given user ID
CREATE PROCEDURE webalex_project_one.NewContact(
IN
    User_ID_Input VARCHAR(36),
    FirstName_Input VARCHAR(35),
    LastName_Input VARCHAR(35),
    PhoneNumber_Input VARCHAR(11),
    Email_Input VARCHAR(50)
)
BEGIN
	DECLARE New_ID VARCHAR(36);
    SET New_ID = UUID();
	INSERT INTO webalex_project_one.Contacts(Contact_ID, User_ID, C_FirstName, C_LastName, C_PhoneNumber, C_Email)
    VALUES(New_ID, User_ID_Input, FirstName_Input, LastName_Input, PhoneNumber_Input, Email_Input); 
    SELECT New_ID;
END//

#Edits the contact information for a given contact ID
CREATE PROCEDURE webalex_project_one.EditContact(
IN
	Contact_ID_Input VARCHAR(36),
    FirstName_Input VARCHAR(35),
    LastName_Input VARCHAR(35),
    PhoneNumber_Input VARCHAR(11),
    Email_Input VARCHAR(50)
)
BEGIN
	UPDATE webalex_project_one.Contacts
    SET
        C_FirstName = FirstName_Input,
        C_LastName = LastName_Input,
        C_PhoneNumber = PhoneNumber_Input,
        C_Email = Email_Input
    WHERE
		Contact_ID = Contact_ID_Input;
END//

#Deletes the contact with the given contact ID
CREATE PROCEDURE webalex_project_one.DeleteContact(
IN
	Contact_ID_Input VARCHAR(36)
)
BEGIN
	DELETE FROM Contacts WHERE Contact_ID = Contact_ID_Input;
END//

#Retrieves all the contacts for a given user ID
CREATE PROCEDURE webalex_project_one.GetContacts(IN User_ID_Input VARCHAR(36))
BEGIN
	SELECT * FROM webalex_project_one.Contacts WHERE User_ID_Input = User_ID; 
END//

DELIMITER ;