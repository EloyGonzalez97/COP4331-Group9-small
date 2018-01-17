var $rows = $('#contactTable tr');
$('#contactInput').keyup(function() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    
    $rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
});

var modal = document.getElementById('id01');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function saveRow(){ 
var par = $(this).parent().parent();
var dButton = par.children("td:nth-child(1)");
var eButton = par.children("td:nth-child(2)");
var fName = par.children("td:nth-child(3)");
var lName = par.children("td:nth-child(4)");
var phone = par.children("td:nth-child(5)"); 
var email = par.children("td:nth-child(6)"); 
var business = par.children("td:nth-child(7)");

dButton.html("<span class = 'removeContact' onclick='deleteRow(this)'>&times;</span>");
eButton.html("<span class = 'editContact' onclick='editRow()'>&#43;</span>"); 
    
fName.html(fName.children("input[type=text]").val()); 
lName.html(lName.children("input[type=text]").val());
phone.html(phone.children("input[type=text]").val()); email.html(email.children("input[type=text]").val()); 
business.html(business.children("input[type=text]").val());

$(".editContact").bind("click", editRow);  
};

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("contactTable").deleteRow(i);
};

function editRow(){
    var par = $(this).parent().parent();
    var dbutton = par.children("td:nth-child(1)");
    var sButton = par.children("td:nth-child(2)");
    var fName = par.children("td:nth-child(3)");
    var lName = par.children("td:nth-child(4)");
    var phone = par.children("td:nth-child(5)"); 
    var email = par.children("td:nth-child(6)"); 
    var business = par.children("td:nth-child(7)");
    
    dbutton.html("<span class = 'removeContact'></span>");
    sButton.html("<span class = 'saveContact' onclick='saveRow()'>&#9745;</span>");
    
    fName.html("<input type='text' id='tdfname' style='text-align:center;' value='"+fName.text()+"'/>");
    lName.html("<input type='text' id='tdlname' style='text-align:center;' value='"+lName.text()+"'/>");
    phone.html("<input type='text' id='tdphone' style='text-align:center;' value='"+phone.text()+"'/>");
    email.html("<input type='text' id='tdemail' style='text-align:center;' value='"+email.text()+"'/>");
    business.html("<input type='text' id='tdbusiness' style='text-align:center;' value='"+business.text()+"'/>");
    
    
    $(".saveContact").bind("click", saveRow); 
    
};

function addContact(){ 
    var modal = document.getElementById('id01');
    modal.style.display = "none";
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var phone = document.getElementById('number').value;
    var email = document.getElementById('email').value;
    var business = document.getElementById('business').value;
    
    var table = document.getElementById('contactTable');
    var row = table.insertRow(0);

    var delbutton = row.insertCell(0);
    var editbutton = row.insertCell(1);
    var firstn = row.insertCell(2);
    var lastn = row.insertCell(3);
    var cell = row.insertCell(4);
    var em = row.insertCell(5);
    var bus = row.insertCell(6);

    delbutton.innerHTML = "<span class = 'removeContact' onclick='deleteRow(this);'>&times;</span>";
    editbutton.innerHTML = "<span class = 'editContact'>&#43;</span>";
    firstn.innerHTML = fname;
    lastn.innerHTML = lname;
    cell.innerHTML = phone;
    em.innerHTML = email;
    bus.innerHTML = business;
    
    $('#mod').get(0).reset();
    
}; 

$(function(){ 
    $(".editContact").bind("click", editRow); 
    $("#done").bind("click", addContact);
});
/*function insertRow() {
   /* Write code using ajax to add to table 
}*/