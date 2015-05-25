$(document).ready(function() {
	$("#login").on('click', function(){
		$(this).toggleClass("active");
		$("#login-form").toggle();
	});
	
	$("#login").on('click', 'div', function(event){
		event.stopPropagation();
	});
	
	$(document).mouseup(function (event){
		var div = $("#login");
		if (!div.is(event.target)
				&& div.has(event.target).length === 0) {
			div.find("#login-form").hide().end().removeClass("active");
		}
	});
	
	//TODO find out about localStorage
	$("#login-form").find("input[type=\"email\"]").val(localStorage.getItem("localData"));

	$("#login-form").on('submit', 'form', function(event){
		event.preventDefault();
		var email = $(this).find('input[type="email"]').val();
		var password = $(this).find('input[type="password"]').val();
		var user = {"email": email, "password": password}
		
		//TODO find out about localStorage
		localStorage.setItem("localData", email);
		sendAjax(user);
	});

	var access = function (data) {
		if (data === true){
			$("#login-form").hide().parent().removeClass("active");
			$("#login-form").find('p').remove().end().find('input').removeClass();
		} else {
			$("#login-form").find("input")
				.not('input[type="submit"]').addClass("wrong-input");
			$("#login-form").find('p').remove();
			$("#login-form").prepend('<p class="wrong-input-text">Wrong email or password</p>');
			
		}
	}
	
	function sendAjax(user) {
		$.ajax({ 
		    url: "login/", 
		    type: 'POST', 
		    dataType: 'json', 
		    data: JSON.stringify(user), 
		    contentType: 'application/json',
		    mimeType: 'application/json',
	        success: access
		});
	}
});