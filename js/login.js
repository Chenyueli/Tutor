;
$(document).ready(function() {
	var $cellPhone = $("#cellPhone"),
		$pwd = $("#pwd"),
		$warning = $(".warning").eq(0);

	//验证手机号
	function validatemobile(cellPhone) {
		var warning = "";
		// 验证130-139,150-159,180-189,170-179号码段的手机号码
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

		if(cellPhone.length == 0) {
			warning = '请输入手机号码！';
		} else if(cellPhone.length != 11) {
			warning = '请输入11位的手机号码！';
		} else if(!myreg.test(cellPhone)) {
			warning = '请输入有效的手机号码！';
		} else {
			return true;
		}
		return warning;
	};

	//登录验证，返回 true /warning 
	function validateLogin() {
		var warning = "";
		var cellPhone = $cellPhone.val(),
			pwd = $pwd.val(),
			role = $("[name='role']").filter(":checked").val();
		//			alert(role);
		var result = validatemobile(cellPhone);
		if(result !== true) {
			warning = result;
		} else if(pwd === "") {
			warning = "请输入密码";
		} else if(role === undefined) {
			warning = "请选择学生 或者 老师";
		} else {
			return true;
		}
		return warning;
	}

	//登录页面  初始化
	(function init() {
		var $logIn = $(".logIn").eq(0),
			$pwsVisibled = $(".togglePwdView").eq(0),
			$goRegister = $(".go-register").eq(0);

		//交互优化
		$("input").focus(function() {
			this.select();
		});
		$cellPhone.blur(function(e) {
			var phoneNum = $(this).val();
			var result = validatemobile(phoneNum);
			if(result !== true) {
				$warning.text(result);
			}
		});

		$pwd.focus(function() {
			var pw = Cookies.get($cellPhone.val());
			if(pw !== null) {
				this.value = pw;
			}
			this.select();
			$pwsVisibled.show();
		});

		$pwsVisibled.click(function() {
			var pwdEle = document.getElementById("pwd");
			pwdEle.type = (pwdEle.type === "password") ? "text" : "password";
		});

		//必要事件绑定

		$logIn.click(function(e) {
			e.preventDefault();
			var result = validateLogin();
			if(result !== true) {
				alert(result);
			} else {

				//验证成功 , 发送登录请求
				var data = $("#loginForm").serialize();
				data = decodeURIComponent(data, true); //解决中文乱码
				alert(data);
				Cookies.set(data.cellPhone,data.pwd);
				window.location = "index.html";
				var data = {
					cellPhone: $cellPhone.val(),
					pwd: $pwd.val(),
					role: $("[name='role']").filter(":checked").val(),
				};
				//				$.post("/teacher/login", data, function(data) {
				//					if(data.errno !== 0){
				//						alert(data.errmsg);
				//					}else{

				//					Cookies.set(data.cellPhone,data.pwd);
				//	                window.location = "index.html";
				//					}

				//				}, json);
			}
		});

		$goRegister.click(function(e) {
			e.preventDefault();
			self.location = 'register.html';
		});

	})();
});