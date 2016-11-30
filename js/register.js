;

$(document).ready(function() {
	//等待短信验证计时
	function sendTimer(intSecond) {
		var timer = setInterval(function() {
			if(intSecond <= 9) intSecond = '0' + intSecond;
			$('#sendMsg').val(intSecond + '  已发送成功');
			if(intSecond-- == 0) {
				clearInterval(timer);
				$('#sendMsg').val('重新发送').click(function(e) {
					$(e.target).unbind("click");
					sendMsg(e);
				});
			}
		}, 1000);
	}
	//发送验证短信
	function sendMsg(e) {
		var cellPhone = $("#cellPhone").val();
		var result = validatemobile(cellPhone);
		//		console.log(result);
		if(result !== true) {
			alert(result);
		} else {
			var data = {
				cellPhone: cellPhone,
			};
			//	alert(data.cellPhone);

			//发送成功测试代码

			$(e.target).unbind("click");
			sendTimer(5);

			//	$.ajax({
			//		url: "main.php",
			//		type: "POST",
			//		data: {
			//			command: "sendMsg",
			//			cellPhone: cellPhone,
			//		},
			//		dataType: "JSON",
			//		success: function(data) {
			//			var data = jQuery.parseJSON(data);
			//			if(data.errno != 0) {
			//				alert(data.errmsg);
			//			} else {
			//			//请求成功；
			//			$(e.target).unbind("click");
			//			sendTimer(5);	
			//			}
			//		},
			//		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//			alert("发送失败，请重新发送");
			//			console.log(XMLHttpRequest);
			//			console.log(textStatus);
			//			console.log(errorThrown);
			//
			//		}
			//	});
		}

	};

	// 验证手机号码，返回 true / waring;
	function validatemobile(mobile) {
		var warning = "";
		// 验证130-139,150-159,180-189,170-179号码段的手机号码
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

		if(mobile.length == 0) {
			warning = '请输入手机号码！';
		} else if(mobile.length != 11) {
			warning = '请输入11位的手机号码！';
		} else if(!myreg.test(mobile)) {
			warning = '请输入有效的手机号码！';
		} else {
			//号码有效，返回true;
			return true;
		}
		//号码无效
		return warning;
	}

	//验证注册表单 intPageNum:1 第1页，2 第2页
	function validateRegMsg(intPageNum) {
		var $warning = $(".warning").eq(0);
		var data = {
			cellPhone: $("#cellPhone").val(),
			verNum: $("#registerForm input[name='verNum']").val(),
			pwd: $("#pwd").val(),
			rePwd: $("#registerForm input[name='rePwd']").val(),
			realName: $("#registerForm input[name='realName']").eq(0).val() || $("#registerForm input[name='realName']").eq(1).val(),
			address: $("#registerForm input[name='address']").eq(0).val() || $("#registerForm input[name='address']").eq(1).val(),
			certificate: $("textarea[name='certificate']").val(),
			expericence: $("textarea[name='expericence']").val(),
			introduce: $("textarea[name='introduce']").eq(0).val() || $("textarea[name='introduce']").eq(1).val(),
		};
		var result = true;

		//	alert(data.cellPhone);
		Cookies.set("intRealCode", "1234");
		//	alert(typeof data);
		switch(intPageNum) {
			case 1:
				var vResult = validatemobile(data.cellPhone);
				if(vResult !== true) {
					$warning.text(vResult);
					//				alert(vResult);
					$("#cellPhone").focus();
					result = false;
				} else if(!data.verNum) {
					$warning.text("请输入短信验证码");
					result = false;
				} else if(data.pwd !== data.rePwd) {
					$warning.text("密码不一致，请重新输入");
					result = false;
				} else {
					result = true;
					Cookies.set(data.cellPhone, data.pwd);
				}
				break;
			case 2:
				if(data.realName === "") {
					result = false;
					alert("请输入您的姓名");
				} else if(data.address == "") {
					alert("请输入您的地址");
					result = false;
				} else {
					result = true;
				}
				break;
		}
		return result;
	};

	//注册页面 初始化
	(function init() {
		var $goBack = $(".goBack").eq(0),
			$sendMsg = $("#sendMsg"),
			$nextPage = $(".nextPage").eq(0),
			$identify = $(".go-identify").eq(0),
			$register = $(".register").eq(0),
			$warning = $(".warning").eq(0),
			$pwsVisibled = $(".togglePwdView").eq(0);

		//交互优化
		$("input,textarea").focus(function() {
			this.select();
		});
		$("#cellPhone").blur(function(e) {
			var phoneNum = $(this).val();
			var result = validatemobile(phoneNum);
			if(result !== true) {
				$warning.text(result);
			}
		});
		//必要事件绑定

		$("role-wrapper button").click(function(e) {
			e.preventDefault();

		})

		$goBack.click(function() {
			if($(this).hasClass("go-login")) {
				window.location = "login.html";
			} else {
				$(".register-1").removeClass("hidden");
				$(".register-2").addClass("hidden");
				$(".goBack").addClass("go-login");

				//				$("header>p").text("> 登录");

			}
		});
		$sendMsg.click(function(e) {
			sendMsg(e);
		});
		$pwsVisibled.click(function() {
			var rePwdEle = $("input[name='rePwd']")[0],
				pwdEle = document.getElementById("pwd");
			pwdEle.type = (pwdEle.type === "password") ? "text" : "password";
			rePwdEle.type = (rePwdEle.type === "password") ? "text" : "password";
		});
		$nextPage.click(function(e) {
			e.preventDefault();
			if(validateRegMsg(1) === true) {

				//验证通过，进入下一页
				$(".register-1").addClass("hidden");
				$(".register-2").removeClass("hidden");
				//				$("header>p").text(">上一步");
				$(".goBack").removeClass("go-login");
				$(document.getElementsByTagName("body")).css("background-image", "url('img/bgRegister.jpg')");
			}
		});

		//点击认证
		$identify.click(function(e) {
			e.preventDefault();
			self.location = 'identify.html';
		});

		//点击 注册
		$register.click(function(e) {
			e.preventDefault();
			var data = $("#registerForm").serialize();
			data = decodeURIComponent(data, true); //解决中文乱码
			alert(data);
			if(validateRegMsg(2) === true) {
				//				$.post(
				//					"/teacher/register", data,
				//					function(rData) {
				//						alert("");
				//						//注册成功
				//						if(rData.errno === 1) {
				//							alert(fData.errmsg);
				//						} else {
				var isGoIdentify = confirm("注册成功，是否前往验证身份？");
				if(isGoIdentify) {
					self.location = 'identify.html';
				}else{
					self.location = 'login.html';
					
				}
				//						}
				//					}, "json");
			}
		});
		$(".role-wrapper span").click(function() {
			$(this).addClass("active")
				.siblings().removeClass("active");
			$(".mask,.role-wrapper").hide();
			var role = $(this).text();
			if(role == "学生") {
				$(".rteacher").hide();
			} else if(role == "老师") {
				$(".rstudent").hide();
			}
		});

		$(".role-wrapper button").click(function(e) {
				var role = $(".role-wrapper .active").text();
				if(role == "学生") {
					$(".rteacher").hide();
				} else if(role == "老师") {
					$(".rstudent").hide();
				}
				$(".mask,.role-wrapper").hide();
			})
			//		$cellPhone.focus();

		//	$("#registerForm").css("opacity","0");
	})();

})