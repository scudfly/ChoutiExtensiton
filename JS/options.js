$(document).ready(function() {
	load();
	$("#Save").click(save);
	$("#Clear").click(clear);
})

function save() {
	var id = $("#Id").val();
	var pwd = $("#Pwd").val();

	if(id === "" || pwd === "")
		return;

	var localStorage = window.localStorage;

	if(!localStorage) {
		alert("不支持localStorage！")
		return;
	}

	$.ajax({
		url: "https://dig.chouti.com/login",
		type: "Post",
		data: {
			jid: id,
			oneMonth: 1,
			password: pwd
		},
		success: function(data, status) {
			if(status === "success" && data != null && data !== "") {
				var obj = eval('(' + data + ')');
				if(obj.result.code === "9999") {
					alert("登录成功！")
					localStorage.Id = EncodeStr(id);
					localStorage.Pwd = EncodeStr(pwd);
					return;
				}
			}
			alert("登录失败！")
		}
	});
}

function clear() {
	var localStorage = window.localStorage;
	if(!localStorage) {
		alert("不支持localStorage！")
		return;
	}

	localStorage.removeItem("Id");
	localStorage.removeItem("Pwd")

	$("#Id").val("");
	$("#Pwd").val("");
}

function load() {
	var localStorage = window.localStorage;
	if(!localStorage) {
		alert("不支持localStorage！")
		return;
	}

	var id = DecodeStr(localStorage.Id);
	var pwd = DecodeStr(localStorage.Pwd);

	if(typeof(id) === "undefined" || typeof(pwd) === "undefined")
		return;

	$("#Id").val(id);
	$("#Pwd").val(pwd);
}

function EncodeStr(str) {

	if(str == null || str === "")
		return "";

	var resultStr = "";

	for(var i = 0; i < str.length; i++) {
		resultStr += String.fromCharCode(str.charCodeAt(i) - 100);
	}

	return resultStr;
}

function DecodeStr(str){
	if(str == null || str === "")
		return "";

	var resultStr = "";

	for(var i = 0; i < str.length; i++) {
		resultStr += String.fromCharCode(str.charCodeAt(i) + 100);
	}

	return resultStr;
}
