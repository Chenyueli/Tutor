$(document).ready(function() {
	$teacherInfor = $(".teacher-Info").eq(0);

	$(document).click(function(e) {
		var element = e.target;
		console.log(element);
		if(element.nodeName.toLocaleLowerCase() === "i") {
			$(".userPanel").toggleClass("hidden");
		} else {
			if(!$(".userPanel").hasClass("hidden")) {
				$(".userPanel").addClass("hidden");
			}
			//switch panel

			if($(element).hasClass("teacher-Info")) {
				console.log("teacher");
				$(".teacher-Info").addClass("active");
				$(".tutoring-Info").removeClass("active");
				$("#teacher-Info").removeClass("hidden");
				$("#tutoring-Info").addClass("hidden");
			}
			if($(element).hasClass("tutoring-Info")) {
				$(".teacher-Info").removeClass("active");
				$(".tutoring-Info").addClass("active");
				$("#teacher-Info").addClass("hidden");
				$("#tutoring-Info").removeClass("hidden");
			}
			
			if($(element).hasClass("go-identify")){
//				alert("hei");
				$("nav,.content-wrapper>section").addClass("hidden");
				$(".content-wrapper").css("top","50px");
				$("#identity-authentication").removeClass("hidden");
				$("header > h2").text("实名字认证");
				$(".goBack").removeClass("hidden").text("> 返回");
			}

			//open tutoring information detail
			if($(element).hasClass("tutoring-detail")) {
				$("#tutoring-Info,nav").addClass("hidden");
				$("#tutoring-detail,.goBack").removeClass("hidden");
				$("header>h2").text("信息详情");
				$(".content-wrapper").css("top", "50px");
				return;
			}
			if($(element).hasClass("goBack")) {
//				$("#tutoring-Info,nav").removeClass("hidden");
//				$("#tutoring-detail,.goBack").addClass("hidden");
//				$("header>h2").text("厦大家教网");
//				$(".content-wrapper").css("top", "85px");
				window.history.go(-1);
			}

			//open teacher information detail
			if($(element).hasClass("t-description")) {
				

			}

		}

	})

});