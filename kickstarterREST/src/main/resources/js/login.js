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
	
	$("#login-form").on('submit', 'form', function(event){
		event.preventDefault();
		var email = $(this).find('input[type="text"]').val();
		var password = $(this).find('input[type="password"]').val();
		var user = {"email": email, "password": password}
		sendAjax(user);
	});
	
	var access = function (data) {
		if (data === true){
			$("#login-form").append('Ok');
			$("#login-form").hide().parent().removeClass("active");
			$("#login-form").find('p').remove();
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