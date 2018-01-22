$('#contactInput').keyup(function() {
    var $rows = $('#contactTable tr');
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

    $rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
});

// $('#acknowledgeButton').bind('click', function () {
//     document.getElementById('errorDiv').textContent = '';
// })

var modal = document.getElementById('id01');
var userId = 0;
var urlBase = 'http://COP4331.hosted.nfoservers.com/';

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function saveRow(){
    var par = $(this).parent().parent();
    var contactId = par.contactId;
    var dButton = par.children("td:nth-child(1)");
    var eButton = par.children("td:nth-child(2)");
    var fName = par.children("td:nth-child(3)");
    var lName = par.children("td:nth-child(4)");
    var phone = par.children("td:nth-child(5)");
    var email = par.children("td:nth-child(6)");

    dButton.html("<span class = 'removeContact' onclick='deleteRow(this)'>&times;</span>");
    eButton.html("<span class = 'editContact' onclick='editRow()'>&#43;</span>");

    var fname = fName.children("input[type=text]").val();
    var lname = lName.children("input[type=text]").val();
    var phone = phone.children("input[type=text]").val();
    var email = email.children("input[type=text]").val();

    try {
        var xhr = new XMLHttpRequest();
        var jsonPayload = JSON.stringify({
            fname: fname,
            lname: lname,
            phone: phone,
            email: email,
            contactId: contactId
        });
        xhr.open('PUT', urlBase + 'UpdateContact.php');
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.send(jsonPayload);
        } catch (err) {
            console.error(err);
        }
    } catch (err) {

        console.error(err);
    }

    fName.html(fname);
    lName.html(lname);
    phone.html(phone);
    email.html(email);

    $(".editContact").bind("click", editRow);
}

function deleteRow(r) {
    var row = r.parentNode.parentNode;
    var i = row.rowIndex;
    var contactId = row.contactId;

    try {
       var xhr = new XMLHttpRequest();

        xhr.open("POST", urlBase + 'DeleteContact.php', false);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.send(JSON.stringify({ contactId: contactId }));
        } catch (err) {
            console.error(err);
        }
    } catch (err) {
        console.error(err);
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
    sButton.html("<span class = 'saveContact' onclick='saveRow()'>&#9745;</span>");

    fName.html("<input type='text' id='tdfname' style='text-align:center;' value='"+fName.text()+"'/>");
    lName.html("<input type='text' id='tdlname' style='text-align:center;' value='"+lName.text()+"'/>");
    phone.html("<input type='text' id='tdphone' style='text-align:center;' value='"+phone.text()+"'/>");
    email.html("<input type='text' id='tdemail' style='text-align:center;' value='"+email.text()+"'/>");


    $(".saveContact").bind("click", saveRow);

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
    var url = urlBase + 'AddContact.php';

    var xhr = new XMLHttpRequest();
    var contactId;
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.send(jsonPayload);
        xhr.onload = function () {
            var jsonObject = JSON.parse( xhr.responseText );
            var table = document.getElementById('contactTable');
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

            $('#mod').get(0).reset();

        };
        xhr.onerror = function (error) {
            throw error;
        };

        contactId = jsonObject.id;
    }
    catch (err) {
        // document.getElementById('errorDiv').textContent = 'There was an error saving your contact';
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
});
/*function insertRow() {
   /* Write code using ajax to add to table
}*/
(function() {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", urlBase + 'GetContacts.php?userId=' + userId);
        xhr.onload = function () {
            JSON.parse(xhr.responseText).forEach(function (contact) {
                addContact(contact);
            });
        };
        xhr.onerror = function (error) {
         throw error;
        };
        xhr.send();
    } catch (err) {
        console.error(err);
    }
})();
