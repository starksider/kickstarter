$(document).ready(function() {
	var logout = function(){
		if (localStorage.getItem("authorize")){
			$("#login").hide();
			$("#navigation").append('<li id="logout">Logout</li>')
			$("#logout").click(function(){
				$(this).remove();
				$("#login").show();
				localStorage.removeItem("authorize");
			});
		}
	}
	
	logout();
	var $loginForm = $("#login-form");
	
	$("#login").on('click', function(){
		$(this).toggleClass("active");
		$loginForm.toggle();
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
	
	//TODO find out about localStorage, sessionStorage - if close browser all data clears

	$loginForm.on('submit', 'form', function(event){
		event.preventDefault();
		var email = $(this).find('input[type="email"]').val();
		var password = $(this).find('input[type="password"]').val();
		var user = {"email": email, "password": password}
		sendAjax(user);
	});

	var access = function (data) {
		if (data === true){
			$loginForm.hide().parent().removeClass("active");
			$loginForm.find('p').remove().end().find('input').removeClass();
			localStorage.setItem("authorize", data);
			logout();
		} else {
			$loginForm.find("input")
				.not('input[type="submit"]').addClass("wrong-input");
			$loginForm.find('p').remove();
			$loginForm.prepend('<p class="wrong-input-text">Wrong email or password</p>');
			
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