;

function GoNextPage() {
	$(".register-1").addClass("hidden");
	$(".register-2").removeClass("hidden");
	$("header>p").text(">上一步");
};

function SwithPages(ele) {
	if($("ele:contains('登录')").length > 0) {
		window.location = "login.html";
		alert("登录");
	}else if($("ele:contains('上一步')").length > 0) {
		$(".register-1").removeClass("hidden");
		$(".register-2").addClass("hidden");
	}
	console.log($("ele:contains('登录')"));
}

$(document).ready(function() {
	var $mobile = $("#mobile"),
		$password = $("#password"),
		$warning = $(".warning").eq(0);
	$logIn = $(".logIn").eq(0);
	$register = $(".register").eq(0);

	//验证手机号
	function validatemobile(mobile) {
		var warning = "";
		if(mobile.length == 0) {
			warning = '请输入手机号码！';
		} else if(mobile.length != 11) {
			warning = '请输入11位的手机号码！';
		} else {
			// 验证130-139,150-159,180-189,170-179号码段的手机号码
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
			if(!myreg.test(mobile)) {
				warning = '请输入有效的手机号码！';
			}
		}
		if(warning === "") {
			//						alert("ok");
			return true;
		} else {
			$warning.text(warning);
			//						$mobile.focus();
			//						alert("error");
			return false;
		}
	}

	(function init() {
		//绑定事件
		$mobile.focus(function() {
			this.select();
		});
		$mobile.blur(function() {
			validatemobile($mobile.val());
		});
		$password.focus(function() {
			var pw = CookieUtil.getCookie($mobile.val());
			if(pw !== null) {
				this.value = pw;
			}
			this.select();
		});
		$logIn.click(function(e) {
			e.preventDefault();
			if(validatemobile($mobile.val())) {
				//账号密码登录
				var data = {
						cellPhone: $mobile.val(),
						pwd: $password.val()
					}
					//						alert("ok");
				console.log(data);
				//						$.post(url,data,function(data,textStatus,jqXHR){
				//							    $warning.html(data);
				//						},json)
			}

		});
		$register.click(function(e) {
			e.preventDefault();
			self.location = 'index.html';
		});
		$mobile.focus();

	})();

});
/*
 * Cookies-API, 保存格式：name1=value1；name2=value2；
 * @param name
 * @param value
 */
var CookieUtil = {
	setCookie: function(name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},

	getCookie: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	delCookie: function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if(cval != null) {
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	}
};