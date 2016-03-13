$(document).ready(function() {
	$.get("quote", function(quote) {
		$("#quote").html('<p>' + quote.mainQuote + '</p><p id="author">' + quote.author + '</p>');
	});
	$.get("categories", function(categories) {
		for (var index in categories) {
			var category = categories[index];
			categoriesListener(category);
		}
		if (getHash() == "") {
			var randomIndex = Math.floor(Math.random() * categories.length);
			loadProjectsOfCategory(categories[randomIndex].id);
		}
	});
	
	var scipLoad = false;
	
	var setHash = function(hash){
		scipLoad = true;
		window.location.hash = hash;
	};
	
	var getHash = function(){
		return window.location.hash;
	};
	
	var loadHash = function(hash){
		$("#projects").html('');
		var regexp = /^#categories\/([0-9]+)$/;
		
		if(regexp.test(hash)){
			var result = regexp.exec(hash);
			loadProjectsOfCategory(result[1]);
		}
		
		var regexp = /^#categories\/([0-9]+)\/project\/([0-9]+)$/;
		
		if(regexp.test(hash)){
			var result = regexp.exec(hash);
			var id = result[2];
			loadProjectsOfCategory(result[1]);
			loadProject(id);
		}
	};
	
	function categoriesListener(category) {
		var id = category.id;
		var cssId = 'category' + id;
		
		$("#categories").append('<a id="' + cssId + '" href="#categories/' + id + '">' + category.name + '</a> ');

		$("#" + cssId).click(function(){
			setHash('#categories/' + id);
			$("#projects").html('');
			loadProjectsOfCategory(id);
		});
	};

	function loadProjectsOfCategory(id){
		$.get("categories/" + id, function(projects){
			for (var index in projects) {
				var project = projects[index];
				projectListener(project, id);
			}
		});
	}
	function projectListener(project, categoryId) {
		
		var id = project.id;
		var ccsProjectId = 'project' + id;
		var projectHtml = 
			'<div id="'+ ccsProjectId +'" class="project">' + 
				'<div class="main-info">' +
					'<div class="project-image"></div>' +
					'<h3>' + project.name +	'</h3>' +
					'<p>' + project.description +'</p>' + 
				'</div>' +
			'</div>';
		$("#projects").append(projectHtml);
		$("#" + ccsProjectId).find(".project-image").css('background-image', 'url(resources/css/images/projects/' + project.image + ')');
		
		$("#" + ccsProjectId).on('click', '.main-info', function(){
			var selectProjectClass = $(this).parent();

			selectProjectClass.toggleClass('highlighted');
			loadProject(id);
			if (!selectProjectClass.hasClass('highlighted')){
				$('.project-image').show();
				setHash('#categories/' + categoryId);
			} else {
				$('.project').not("#project" + id).hide();
				$('.project-image').hide();
				setHash('#categories/' + categoryId + '/project/' + id);
			} 
		});
	};
	
	var loadProject = function(id){
		if ($("div").hasClass("info-container")){
			$(".info-container, .video").remove();
			$("#project" + id).one('transitionend webkitTransitionEnd oTransitionEnd', function () {
				$(".project").show();
			});
		} else {
			$.get("project/" + id, function(project){
				var projectContent = 
					'<div class="info-container">' +
						'<p>Money we have: ' + project.moneyHas + '</p>' + 
						'<p>Money wee need: ' + project.moneyNeed + '</p>' + 
						'<p>Days left: ' + project.daysLeft + '</p>' +
					'</div>';
				var video = 
						'<div class="video">' +
							'<iframe width="560" height="315" src="https://www.youtube.com/embed/DJFK43xpEZk" frameborder="0" allowfullscreen></iframe>' +
						'</div>';
				$("#project" + id).prepend(video).append(projectContent);
				var questionHtml = 
					'<div class="faq">' +
						'<form method="POST" action="/">' +
							'<textarea name="question" placeholder="Add your question"></textarea>' +
							'<input type="submit" value="Send">' +
						'</form>'+ 
					'</div>';
				$(".info-container").append(questionHtml);
				getFaqs(id);
				$('.info-container').on('submit', 'form', function(event){
					event.preventDefault();
					if (localStorage.getItem("authorize")){
						var addedQuestion = $(this).find('textarea').val();
						$(this).find('textarea').val('');
						if (addedQuestion !== ''){
							sendAjax(addedQuestion, id);
							$(this).parent('.faq').append('<p>' + addedQuestion + '</p>');
						}
					} else {
						if (!$(this).has('p').length) {
							$(this).append("<p class=\"wrong-input-text\">You need to authorize!</p>");
						}
					}
				});
			}).done(function(){
				$(".project").not("#project"  + id).hide().end().find('.project-image').hide();
				$("#project" + id).addClass("highlighted");
			});
		} 
	};
	
	var getFaqs = function(id){
		$.get("faq/" + id, function(faqs){
			for (var index in faqs){
				var faq = faqs[index];
				$("#project" + id).find(".faq").append('<p>' + faq.question + '</p>');
			}
		});
	};
	
	function sendAjax(content, projectId) {
		$.ajax({ 
		    url: "faq/" + projectId, 
		    type: 'POST', 
		    dataType: 'json', 
		    data: "{\"question\":\"" + content +"\"}", 
		    contentType: 'application/json',
		    mimeType: 'application/json',
		});
	}

	loadHash(getHash());
	
	window.onhashchange = function(){
		if (!scipLoad){
			loadHash(getHash());
		}
		scipLoad = false;
	};
	
});