$(document).ready(function () {
    if(sessionStorage.length === 0){
        window.location.href = "http://cop4331.hosted.nfoservers.com";
    }else if(sessionStorage.length >= 1){
          var firstName = sessionStorage.getItem('firstName');
          var lastName = sessionStorage.getItem('lastName');

          document.getElementById('Fname').textContent = firstName;
          document.getElementById('Lname').textContent =lastName;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", urlBase + 'getContacts.php', true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    var jsonPayload = JSON.stringify({
      userId: userId
    });
    try {
            xhr.send(jsonPayload);
            xhr.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 200)
                {
        				var i;
        				var jsonList = JSON.parse('[' + xhr.responseText.replace(/}{/g, '},{') + ']');

       					 if(jsonList.length === 0){
          					 document.getElementById('contactTable').style.visibility = "hidden";
           					 document.getElementById('noContact').style.visibility = "visible";
        				 }

       					 for(i = 0; i < jsonList.length; i++)
      					  {
        					var fname = jsonList[i].firstName;
       						var lname = jsonList[i].lastName;
       						var phone = jsonList[i].phoneNumber;
        					var email = jsonList[i].email;
        					var contactId = jsonList[i].contactId;
        					var table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
        					var row = table.insertRow(0);
        					row.contactId = contactId;



        					var delbutton = row.insertCell(0);
        					var editbutton = row.insertCell(1);
        					var firstn = row.insertCell(2);
        					var lastn = row.insertCell(3);
        					var cell = row.insertCell(4);
        					var em = row.insertCell(5);


        					delbutton.innerHTML = "<span class = 'removeContact' onclick='deleteRow(this);'>&times;</span>";
        					editbutton.innerHTML = "<span class = 'editContact'>&#43;</span>";
        					firstn.innerHTML = fname;
        					lastn.innerHTML = lname;
        					cell.innerHTML = phone;
        					em.innerHTML = email;
                            $(".editContact").bind("click", editRow);
      					}
                    }
                }
        xhr.onerror = function (error) {
         throw error;
        };
        //xhr.send();
    } catch (err) {
        console.error(err);
    }


});
$('#contactInput').keyup(function() {
    var $rows = $('#contactTable tbody tr');
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase().split(' ');

  $rows.hide().filter(function() {
    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
    var matchesSearch = true;
    $(val).each(function(index, value) {
      matchesSearch = (!matchesSearch) ? false : ~text.indexOf(value);
    });
    return matchesSearch;
  }).show();
});


var modal = document.getElementById('id01');
var userId = sessionStorage.getItem('userID');
var urlBase = 'http://COP4331.hosted.nfoservers.com/';

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function saveRow(r){
    var row = r.parentNode.parentNode;

  //  var par = $(this).parent().parent();
    var contactId = row.contactId;
    var dButton = row.cells[0];
    var eButton = row.cells[1];

    var fName = row.cells[2];
    var lName = row.cells[3];
    var Phone = row.cells[4];
    var Email = row.cells[5];
    dButton.innerHTML = "<span class = 'removeContact' onclick='deleteRow(this)'>&times;</span>";
    eButton.innerHTML = "<span class = 'editContact' onclick='editRow()'>&#43;</span>";

    var fname = fName.getElementsByTagName("input")[0].value;
    var lname = lName.getElementsByTagName("input")[0].value;
    var phone = Phone.getElementsByTagName("input")[0].value;
    var email = Email.getElementsByTagName("input")[0].value;

    try {

        var xhr = new XMLHttpRequest();
        var jsonPayload = JSON.stringify({
            fname: fname,
            lname: lname,
            phone: phone,
            email: email,
            contactId: contactId
        });
        xhr.open('POST', urlBase + 'UpdateContact.php', true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.send(jsonPayload);
            xhr.onerror = function(err)
            {
                console.log(err);
            }
        } catch (err) {
            console.error(err);
        }
    } catch (err) {

        console.error(err);
    }

    fName.innerText = fname;
    lName.innerText = lname;
    Phone.innerText = phone;
    Email.innerText = email;

    $(".editContact").bind("click", editRow);
}

function deleteRow(r) {
    var row = r.parentNode.parentNode;
    var i = row.rowIndex;
    var contactId = row.contactId;

    try {
       var xhr = new XMLHttpRequest();

        xhr.open("POST", urlBase + 'deleteContact.php', true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.send(JSON.stringify({ contactId: contactId }));
            xhr.onerror = function(err)
            {
                console.log(err);
            }
        } catch (err) {
            console.error(err);
        }
    } catch (err) {
        console.error(err);
    }

    if(document.getElementById("contactTable").rows.length === 2 ){
        document.getElementById('contactTable').style.visibility = "hidden";
        document.getElementById('noContact').style.visibility = "visible";
    }
    document.getElementById("contactTable").deleteRow(i);
}

function editRow(){
    var par = $(this).parent().parent();
    var dbutton = par.children("td:nth-child(1)");
    var sButton = par.children("td:nth-child(2)");
    var fName = par.children("td:nth-child(3)");
    var lName = par.children("td:nth-child(4)");
    var phone = par.children("td:nth-child(5)");
    var email = par.children("td:nth-child(6)");

    dbutton.html("<span class = 'removeContact'></span>");
    sButton.html("<span class = 'saveContact' onclick='saveRow(this)'>&#9745;</span>");

    fName.html("<input type='text' id='tdfname' style='text-align:center; width: 70px;' value='"+fName.text()+"'/>");
    lName.html("<input type='text' id='tdlname' style='text-align:center; width: 80px;' value='"+lName.text()+"'/>");
    phone.html("<input type='text' id='tdphone' style='text-align:center; width: 100px;' value='"+phone.text()+"'/>");
    email.html("<input type='text' id='tdemail' style='text-align:center; width: 150px;' value='"+email.text()+"'/>");


};

function addContact(contact) {
    var fname = contact.fname;
    var lname = contact.lname;
    var phone = contact.phone;
    var email = contact.email;

    var jsonPayload = JSON.stringify({
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        userId: userId
    });
    var url = urlBase + 'addContact.php';

    var xhr = new XMLHttpRequest();
    var contactId;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {

        xhr.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200)
            {

                var jsonObject = JSON.parse( xhr.responseText );
                var table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
                var row = table.insertRow(0);
                contactId = jsonObject.contactId;
                row.contactId = contactId;
                console.log(jsonObject);

                var delbutton = row.insertCell(0);
                var editbutton = row.insertCell(1);
                var firstn = row.insertCell(2);
                var lastn = row.insertCell(3);
                var cell = row.insertCell(4);
                var em = row.insertCell(5);

                delbutton.innerHTML = "<span class = 'removeContact' onclick='deleteRow(this);'>&times;</span>";
                editbutton.innerHTML = "<span class = 'editContact' onclick='editRow();'>&#43;</span>";
                firstn.innerHTML = fname;
                lastn.innerHTML = lname;
                cell.innerHTML = phone;
                em.innerHTML = email;

    	        $(".editContact").bind("click", editRow);
                document.getElementById('contactTable').style.visibility = "visible";
                document.getElementById('noContact').style.visibility = "hidden";
                $('#mod').get(0).reset();
            }
        }
	
        xhr.send(jsonPayload);
        xhr.onerror = function (error) {
            throw error;
        };

    }
    catch (err) {
        document.getElementById('id01').style.display = "block";
        document.getElementById('errorDiv').textContent = "There was an error saving your contact";
        document.getElementById('errorDiv').style.visibility = "visible";
        console.error(err);
        return;
    }
}
function addContactFromModal(){
    var contact = {};
    var modal = document.getElementById('id01');
    modal.style.display = "none";
    contact.fname = document.getElementById('fname').value;
    contact.lname = document.getElementById('lname').value;
    contact.phone = document.getElementById('number').value;
    contact.email = document.getElementById('email').value;

    addContact(contact);
}

$(function(){
    $(".editContact").bind("click", editRow);
    $("#done").bind("click", addContactFromModal);
    return false;
});
