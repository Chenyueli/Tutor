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