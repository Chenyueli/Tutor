$(document).ready(function() {
	$teacherInfor = $(".teacher-Info").eq(0);

	function switchPanel(role) {
		if(typeof role === "string") {
			if(role === "teacher") {
				$(".teacher-Info").addClass("active");
				$(".tutoring-Info").removeClass("active");
				$("#teacher-Info").removeClass("hidden");
				$("#tutoring-Info").addClass("hidden");
			} else if(role === "tutor") {
				$(".teacher-Info").removeClass("active");
				$(".tutoring-Info").addClass("active");
				$("#teacher-Info").addClass("hidden");
				$("#tutoring-Info").removeClass("hidden");
			} else {
				console.log("Error: information do not exist; ")
			}
		} else {
			console.log("TypeError: Wrong Parameter;");
		}
	}
	//	switchPanel("me");
	$(document).click(function(e) {
		var element = e.target,
			$target = $(element);
		console.log(element);
		//		alert(element);

		//user manage
		if($target.hasClass("fa-user")) {
			$(".userPanel").toggleClass("hidden");
			return;
		} else {
			$(".userPanel").addClass("hidden");
		}

		if($target.hasClass("go-identify")) {
			window.location = "identify.html";
		} else if($target.hasClass("go-tutorDetail")) {
			window.location = "tutorDetail.html"
		} else if($target.hasClass("goBack")) {
			if($(".home-content").length === 0) {
				history.go(-1);
			} else {
				//返回首頁
				$("#tutoring-Info,nav").removeClass("hidden");
				$("#tutoring-detail,.goBack").addClass("hidden");
			}
		}

		/*----------------home page----------------------*/
		//switch panel
		if($target.hasClass("teacher-Info")) {
			switchPanel("teacher");
			return;
		} else if($target.hasClass("tutoring-Info")) {
			switchPanel("tutor");
			return;
		}
		if($target.hasClass("more-tutor-info")) {
			//			$.post(url,"more",function(){
			//			
			//			})
			alert("没有更多信息，请随时关注我们的更新");
			return;
		}
		/*---------------tutor Detail page----------------*/
		if($target.hasClass("reserve")) {
			$("#tutoring-detail").addClass("hidden");
			$("#reservation-Form").removeClass("hidden");
		} else if($target.hasClass("submit-reserve")) {
			var input = $("#reservation-Form  textarea").val();
			if(input === "") {
				alert("请您输入您的说明！")
			} else if(input.length > 200) {
				alert("输入不得超过200字，请重新输入");
				$("textarea").eq(0).focus().select();
			} else {
				var data = {};
				data = {
					"tutorInforID": $(".tutorInfoID").text(),
					"description": $("#reservation-Form  textarea").val(),
				}
				console.log(data);
				alert("提交成功");
			}

		}
		
		
		/*---------------identify page----------------*/
		if(){
			
		}
		
	})
});