/*Author: ELoy Gonzalez & Alexander Alvarez */
var modal = document.getElementById('id01');

var urlBase = 'http://COP4331.hosted.nfoservers.com';
var extension = "php";


function loginUser() 
{
	if(document.getElementById("uname").validity.valid && document.getElementById("psw").validity.valid){
		var username = document.getElementById("uname").value;
		var password = document.getElementById("psw").value;
		
		
		var jsonPayload = '{"login" : "' + username + '", "password" : "' + password + '"}';
		var url = urlBase + '/login.' + extension;
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.send(jsonPayload);
			var jsonObject = JSON.parse( xhr.responseText );
			var userId = jsonObject.id;
			
			if( userId !== 0)
			{
				sessionStorage.setItem('userID', userId);
				sessionStorage.setItem('firstName', jsonObject.firstName);
				sessionStorage.setItem('lastName', jsonObject.lastName);
				document.getElementById('id01').style.display= "none";
				window.location.href = "http://cop4331.hosted.nfoservers.com/mainpage.html";
			}		
			
			else
			{
				document.getElementById('id01').style.display= "block";
				document.getElementById("errorDiv").textContent = "*User/Password combination incorrect*";
				document.getElementById("errorDiv").style.visibility = "visible";
				return;
			}
		}
		catch(err)
		{
			//document.getElementById("loginResult").innerHTML = err.message;
		}
		return false;
    }else{
        document.getElementById("errorDiv").textContent = "*Please fill out all the fields*";
        document.getElementById("errorDiv").style.visibility = "visible";
    }
}

function signUp() 
{
	if(document.getElementById("firstname").validity.valid && document.getElementById("lastname").validity.valid &&
	 document.getElementById("email").validity.valid && document.getElementById("password").validity.valid) 
 	{
  
		var firstName = document.getElementById("firstname").value;
		var lastName = document.getElementById("lastname").value;
		var email = document.getElementById("email").value;
		var password = document.getElementById("password").value;

		var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "email" : "' + email + '", "password" : "' + password + '"}';
		var url = urlBase + '/create.' + extension;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.send(jsonPayload);
			var jsonObject = JSON.parse( xhr.responseText );
			userId = jsonObject.id;
			
			if( userId == 0 )
			{
				
				return;
			}		
			
			else
			{
				sessionStorage.setItem('userID', userId);
				sessionStorage.setItem('firstName', firstName);
				sessionStorage.setItem('lastName', lastName);
				window.location.href = "http://cop4331.hosted.nfoservers.com/mainpage.html";
			}
		}
		catch(err)
		{
			
		}
	}else{
        document.getElementById("errorDiv2").textContent = "*Please fill out all the fields*";
        document.getElementById("errorDiv2").style.visibility = "visible";
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