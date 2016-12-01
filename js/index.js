;

function validateImg(fileElement) {
	var filextension = fileElement.value.substring(fileElement.value.lastIndexOf("."), fileElement.value.length);
	filextension = filextension.toLowerCase();
	if((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
		alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
		fileElement.focus();
	} else {
		var path;
		if(document.all) //IE
		{
			fileElement.select();
			path = document.selection.createRange().text;

			document.getElementById("imgPreview").innerHTML = "";
			document.getElementById("imgPreview").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")"; //使用滤镜效果  
		} else //FF
		{
			//						path = .getAsDataURL();
			path = window.URL.createObjectURL(fileElement.files[0]);
			fileElement.parentElement.previousElementSibling.innerHTML = "<img width='80px' height='80px' src='" + path + "'/>";
			fileElement.parentElement.style.opacity = 0;
			console.log(path);
		}
	}
};
$(document).ready(function() {
	console.log("role:" + testLogIn());
	var $teacherInfor = $(".teacher-Info").eq(0),
		$uPanel = $(".userPanel").eq(0);

	function switchPanel(strRole) {
		if(typeof strRole === "string") {
			if(strRole === "teacher") {
				$(".teacher-Info").addClass("active");
				$(".tutoring-Info").removeClass("active");
				$("#teacher-Info").removeClass("hidden");
				$("#tutoring-Info").addClass("hidden");
			} else if(strRole === "tutor") {
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
	};

	//检测登录
	function testLogIn() {
		var role = "";
		console.log("role"+role);
		role = decodeURI(window.location.href).split("?")[1];
		console.log(role);
		if(role !== undefined) {
			$("header .user-center").text("切换用户");
			if(role == "学生") {
				$("header .pub-requirement").removeClass("hidden");
			} else {
				$("header .go-identify").removeClass("hidden");
			};
		} else {
			console.log("未登录");
			role = "";
		}
		return role;
	}

	function uPanelHidden() {
		$uPanel.addClass("hidden");
		$(document).unbind('click', uPanelHidden);
	}

	(function init() {
		var $goIdentify = $(".go-identify").eq(0),
			$pubReq = $(".pub-requirement"),
			$uCenter = $(".user-center").eq(0),
			$gotDetai = $(".go-tutorDetail").eq(0),
			$goBack = $(".goBack").eq(0),
			$teaInfo = $(".teacher-Info").eq(0),
			$tuInfo = $(".tutoring-Info").eq(0),
			$nav = $("nav").eq(0),
			$moreInfo = $(".more-tutor-info").eq(0),
			$reserve = $(".reserve").eq(0),
			$subReserve = $(".submit-reserve");

		var role = testLogIn();
		console.log("role:" + role);

		//交互优化
		$("input").focus(function() {
			this.select();
		});

		//必要事件绑定	
		//用户页面    隐藏/显示 
		$(document).click(function(e) {
			var $target = $(e.target);
			if($target.hasClass("fa-user")) {
				$(".userPanel").toggleClass("hidden");
				return;
			} else {
				$(".userPanel").addClass("hidden");
				console.log(e.target);
			};
			//			if($target.hasClass("goBack")) {
			//				if($(".home-content").length === 0) {
			//					history.go(-1);
			//				} else {
			//					//返回首頁
			//					$("#tutoring-Info,nav").removeClass("hidden");
			//					$("#tutoring-detail,.goBack").addClass("hidden");
			//				}
			//			}
		});
		//	$uPanel.click(function() {
		//		alert("hei");
		//		if($(this).hasClass("hidden")) {
		//			alert("hei");
		//			$(this).removeClass("hidden");
		//			$(document).on('click', uPanelHidden);
		//		}
		//
		//	});

		$goIdentify.click(function(e) {
			window.location = "identify.html?" + testLogIn();

		});
		$uCenter.click(function() {
			window.location = "login.html?" + testLogIn();
		});
		$pubReq.click(function() {
			window.location = "pubRequirement.html?" + testLogIn();
		})
		$gotDetai.click(function() {
			window.location = "tutorDetail.html?" + testLogIn();
		});
		$goBack.click(function() {
			if($(".home-content").length === 0) {
				history.go(-1);
			} else {
				//返回首頁
				$("#tutoring-Info,nav").removeClass("hidden");
				$("#tutoring-detail,.goBack").addClass("hidden");
			}
		});
		/*----------------home page----------------------*/
		//			//switch panel
		$teaInfo.click(function() {
			switchPanel("teacher");
		});
		$tuInfo.click(function() {
			switchPanel("tutor");
		});

		$moreInfo.click(function() {

			//			$.post(url,"moreInfo",function(){
			//			
			//			});
			alert("没有更多信息，请随时关注我们的更新");
		});

		/*---------------tutor Detail page----------------*/
		$reserve.click(function() {
			$("#tutoring-detail").addClass("hidden");
			$("#reservation-Form").removeClass("hidden");
		});

		$subReserve.click(function() {
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
		});

	})();

});