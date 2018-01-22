/*Author: ELoy Gonzalez */
var modal = document.getElementById('id01');

var urlBase = 'http://COP4331.hosted.nfoservers.com';
var extension = "php";


function loginUser() 
{
  var username = document.getElementById("uname").value;
  var password = document.getElementById("psw").value;

  document.getElementById("loginResult").innerHTML = "";
	
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
        }		
        
        else
        Location.replace("mainpage.html")
    }
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function signUp() 
{
    
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
