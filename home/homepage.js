/*Author: ELoy Gonzalez & Alexander Alvarez */
var modal = document.getElementById('id01');

var urlBase = 'http://COP4331.hosted.nfoservers.com';
var extension = "php";


function loginUser() 
{
  var username = document.getElementById("uname").value;
  var password = document.getElementById("psw").value;

  //document.getElementById("loginResult").innerHTML = "";
	
	var jsonPayload = '{"username" : "' + username + '", "password" : "' + password + '"}';
	var url = urlBase + '/login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
    
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
        
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse(xhr.responseText);
        
		
		var userId = jsonObject.id;
        console.log(jsonObject.firstName);
		
		if( userId === 0 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
			
        }		
        else
        {
        console.log("logged in");
        window.location.href = 'mainpage.html';
        }
    }
	catch(err)
	{
		//document.getElementById("loginResult").innerHTML = err.message;
	}

	return false;
}

function signUp() 
{
  var firstName = document.getElementById("firstname").value;
  var lastName = document.getElementById("lastname").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  

  /*
  var jsonPayload = JSON.stringify ({
	  firstName: firstName,
	  lastName: lastName,
	  email: email,
	  password: password
	 
  });
  */

  	var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "email" : "' + email + '", "password" : "' + password + '"}';
	var url = urlBase + '/create.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId == 0 )
		{
			document.getElementById("signUpResult").innerHTML = "Error in Sign Up";
			return;
        }		
        
        else
        window.location.href = 'mainpage.html';
    }
	catch(err)
	{
		//
	}
}

function logOut() 
{
    userId = 0;
	firstName = "";
	lastName = "";	
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) 
{
    if (event.target == modal) 
    {
        modal.style.display = "none";
    }
}
