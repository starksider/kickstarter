function Login(){
	this.isLogged = false;
};

Login.prototype = {
	logout: function(storageAuth){
		if (localStorage.getItem(storageAuth) == 'true'){
			$("#login").hide();
			$("#signin").hide();
			$("#logout").show();
			$("#logout").click(function(){
				$(this).hide();
				$("#login").show();
				$("#signin").show();
				localStorage.removeItem(storageAuth);
			});			
		}
		this.isLogged = false;
	}
};

$(document).ready(function() {
	
	var login = new Login();
	
	$("#login, #signin").click(function(e){
		if($(this).is(e.target)){
			$(this).toggleClass("active");
		}
		clickOutside(this);
	});
	
	var $loginForm = $("#login-form");
	var $signinForm = $("#signin-form");
	
	$loginForm.on('submit', 'form', function(event){
		event.preventDefault();
		sendAjax(this, "login/");
	});
	
	$signinForm.on('blur', 'input[type="email"]', function(){
		var inEmail = $(this).val();
		if (inEmail != ''){
			$.get("email/", function(emails){
				for (var index in emails){
					var email = emails[index];
					if (inEmail.toUpperCase() === email.toUpperCase()){
						if (!$signinForm.has('p').length) {
							$signinForm.prepend('<p class="wrong-input-text">Email ' + 
									email + ' exist, please try another');
						}
						break;
					} else {
						$signinForm.find("p").remove();
					}
				}
			});
		}
	});
	
	$signinForm.on('submit', 'form', function(event){
		event.preventDefault();
		var password = $(this).find('#password').val();
		var confirmPassword = $(this).find('#confirm_password').val();
		
		if (password === confirmPassword){
			sendAjax(this, "add/");
		} else {
			if (!$(this).has('p').length) {
				$(this).append("<p class=\"wrong-input-text\">Wrong repeated password</p>");
			}
		}
	});

	var access = function (data) {
		
		if ($.type(data) === "boolean") {
			checkLogin(data);
		} else {
			$signinForm.hide().parent().removeClass("active");
			localStorage.setItem("authorize", true);
			login.logout("authorize");
			$("#popup").show().find("div").find("p").text("Thank you " + data.firstName + ", for registration!");
		}
	};
	
	function checkLogin(data){
		if (data){
			$loginForm.hide().parent().removeClass("active");
			$loginForm.find('p').remove().end().find('input').removeClass();
			localStorage.setItem("authorize", data);
			login.logout("authorize");
		} else {
			$loginForm.find("input")
				.not('input[type="submit"]').addClass("wrong-input");
			$loginForm.find('p').remove();
			$loginForm.prepend('<p class="wrong-input-text">Wrong email or password</p>');
		}
	}
	
	$("#popup").on('click', 'button', function(){
		$("#popup").hide();
	});
});

function clickOutside(container, handler, extraCondition){
	container = tojQueryObj(container);
	if (typeof handler === "boolean"){
		extraCondition = handler;
		handler = undefined;
	}
	extraCondition = extraCondition || true;
	
	$(document).click(function(e){
		if (!container.is(e.target)	&& container.has(e.target).length === 0 && extraCondition) {
			if (handler){
				handler();
			} else {
				container.removeClass("active");				
			}
			$(this).off(e);
		}
	});	
}

function tojQueryObj(el){
	return (el instanceof jQuery) ? el : $(el);
}

function sendAjax(form, url) {
	$.ajax({
	    url: url, 
	    type: 'POST', 
	    dataType: 'json', 
	    data: toJSON(form), 
	    contentType: 'application/json',
	    mimeType: 'application/json',
        success: access
	});
}

function toJSON(form){
	var values = $(form).serializeArray(),
		obj = {};
	$.each(values, function(k,v){
		obj[v.name] = v.value;			
	});
	return JSON.stringify(obj);
}