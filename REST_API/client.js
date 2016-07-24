function getData(params)
{
	$.ajax({
        url: params.url,
        type: params.type,
        contentType: 'application/x-www-form-urlencoded',
        data: params.data,
        dataType: "json",
        success: function (data) {
			params.populateFunction(data);
        },
        error: function (result) {
			console.log(result);
            alert("Error");
        }
    });
}

function displayResult(data)
{
	$("#ContactLists").show();
	document.getElementById("contacts").innerHTML = "";
	var row = "";
    $.each(data, function(index, item){
		row+="<tr><td>"+item.id+"</td><td>"+item.name+"</td><td>"+item.profession+"</td></tr>";
	});
	$("#contacts").html(row);
}

function GetContact() {  
	$('#panel div').not("#ContactLists").hide();
    var param = {};
	param.url = "/GetAllContacts";
	param.data = {};
	param.populateFunction = displayResult;
	param.type = "GET";
	getData(param);
}

function GetSpecificContact(id){
	var param = {};
	param.url = "/GetSpecificContact";
	param.data = {"id" : id};
	param.populateFunction = displayResult;
	param.type = "GET";
	getData(param);
}

function saveContact(name,pass,prof)
{
	var param = {};
	param.url = "/SaveContact";
	param.data = {"name" : name , "password" : pass , "profession" : prof};
	param.populateFunction = GetContact;
	param.type = "POST";
	getData(param);
}

function DeleteSpecificContact(id){
	var param = {};
	param.url = "/DeleteSpecificContact";
	param.data = {"id" : id};
	param.populateFunction = GetContact;
	param.type = "GET";
	getData(param);
}

$('#getSpecificContact').click(function(){
      var id = document.getElementById("user_id").value
	  GetSpecificContact(id);
});

$('#getContacts').click(function(){
	GetContact();
});

$('#saveContact').click(function(){
      var name = document.getElementById("user_name").value;
	  var pass = document.getElementById("user_password").value
	  var prof = document.getElementById("user_prof").value
	  saveContact(name,pass,prof);
});

$('#deleteSpecificContact').click(function(){
      var id = document.getElementById("del_user_id").value;
	  DeleteSpecificContact(id);
});

$('#showContactFilter').click(function(){
	$('#panel div').not("#filterContactForm").hide();
	$("#filterContactForm").show();
});

$('#showAddContactfilter').click(function(){
	$('#panel div').not("#addContactForm").hide();
	$("#addContactForm").show();
});

$('#showDeleteContactfilter').click(function(){
	$('#panel div').not("#deleteContactForm").hide();
	$("#deleteContactForm").show();
});

$(document).ready(function(){
	$('#panel div').not("#ContactLists").hide();
	openNav();
	GetContact();
});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
	$("#options").hide();
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
	$("#options").show();
}