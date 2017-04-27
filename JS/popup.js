var extensitonUrl;

$(document).ready(function() {
	
	extensitonUrl = window.location.href.replace("/popup.html", "");
	
	loginCheck();
	
	requestTopTen();
})

function loginCheck(){
	$.ajax({
		url: "https://dig.chouti.com/flow/state",
		type: "Get",
		success: function(data, status){
			if(status === "success" && data != null && data !== ""){
				//var obj = eval('(' + data + ')');
				var obj = JSON.parse(data);;
				if(obj.result.code === "9999"){
					return;
				}
			}
			
			login();
		}
	});
}

function login(){
	
	var localStorage = window.localStorage;
	if(!localStorage){
		alert("不支持localStorage！")
		return;
	}
	
	var id = DecodeStr(localStorage.Id);
	var pwd = DecodeStr(localStorage.Pwd);
	
	if(typeof(id) === "undefined" || typeof(pwd) === "undefined")
		return;
	
	$.ajax({
		url: "https://dig.chouti.com/login",
		type: "Post",
		data: {
			jid: id,
			oneMonth: 1,
			password: pwd
		},
		success: function(data, status){
			if(status === "success" && data != null && data !== "")
			{
				var obj = eval('(' + data + ')');
				if(obj.result.code === "9999"){
					return;
				}
			}
		}
	});
}

function requestTopTen(){
	$.ajax({
		url:"https://dig.chouti.com/hot/json", 
		type: "Get",
		success: function(data, status) {
		if(status == "success") {
			$("#loadMsg").remove();

			var obj = eval('(' + data + ')');

			$(".content-list").css("height", "600px").append(obj.result.data.dataList);

			$(".timeIntoPool").remove();
			$(".a-hidden").remove();
			$(".time-into").remove();
			$(".s-source").remove();
			$(".news-pic").css("cursor", "-webkit-zoom-out");
			var $img = $(".content-list .item .news-pic img");
			$img.click(function() {
				chouti.showBigImg($(this));
				return false
			});

			$(".content-source").before("<br>");

			$("a").attr("target", "_blank").each(function(i) {
				if(this.href.indexOf('chrome-extension') >= 0) {
					this.href = this.href.replace(extensitonUrl, "https://dig.chouti.com");
				}
				if(this.href.indexOf('javascript') >= 0) {
					$(this).removeAttr("href");
				}
				$(this).removeAttr("onmousedown");
			});

			$(".discus-a").click(function() {
				cc = $(this);
				var linkId = $(this).attr("lang");
				chouti.hidePlayVido(linkId);
				var $box = $("#comment-box-area-" + linkId);
				if($box.is(":hidden")) {
					//$(".comment-box-area").hide();
					//					$box.show().find("#loading-comment-top-" + linkId).css({
					//						display: "inline"
					//					});
					$box.show().find("#loading-comment-top-" + linkId).css("margin-left", "160px");
					$("#comment-box-top-" + linkId).hide();
					$("#yaoyan-sel-area-" + linkId).hide();
					//$("#huifu-top-box-" + linkId).hide();
					$("#comment-list-top-" + linkId).html("");
					$("#write-error-desc-" + linkId).hide();
					$("#hidden-comt-" + linkId).hide();
					var Larrow = $(this).position().left + 5;
					$("#comt-arrow-" + linkId).css("left", Larrow + "px")
				} else {
					$box.hide();
					return
				}
				showCommentsTop(linkId, "");
				$(".huifu-top-box").remove();
				//$("a").attr("target", "_blank");
				$(".hiddenCom-Btn, .close-comt").click(function() {
					var linkid = $(this).attr("lang");
					$("#comment-box-area-" + linkid).hide()
				});
			});

			chouti.addCollect();
			chouti.removeCollect();
			chouti.vote();
			chouti.cancelVote();

			//			var itemList = $(data.result.data).find(".item");
			//			
			//			if(itemList.length <= 0)
			//				return;
			//				
			//			var contentObj = $("#content-list");
			//			
			//			$.each(itemList, function(i,item){
			//				
			//				var itemObj = $("<div class='item'></div>");
			//				
			//				itemObj.append("<div class='news-content'>111</div>");
			//				
			//				itemObj.append("<div class='news-pic'>111</div>")
			//				
			//				$("#content-list").append(itemObj);
			//			})

		}

	}
	});
}

function showCommentsTop(linkId, hui) {
	var sortType = "score";
	var submitUrl = "https://dig.chouti.com/comments";
	$.ajax({
		url: submitUrl,
		type: "POST",
		data: G.param({
			linkId: linkId,
			sortType: sortType,
			id: 0
		}),
		success: function(res) {
			info = jQuery.parseJSON(res).result;
			if(info.code == "9999") {
				var dataItems = parseInt(info.data.items);
				var moreItems = parseInt(info.data.remain);
				var noComments = info.data.noComments;
				$("#discus-a-" + linkId).find("b").html(dataItems);
				$("#newestCount-" + linkId).html(dataItems);
				if(dataItems >= 1) {
					loadCommentsTop(info, linkId)
				}
				var $templab = $("#lab-comment-top-" + linkId);
				$templab.hide();
				$("#loading-comment-top-" + linkId).hide().siblings().show();
				$("#pub-btn-top-" + linkId).unbind().bind("click", function() {
					publish(linkId, "comment", "")
				});
				setButtonDisabled(linkId);
				$("#write-error-desc-" + linkId).hide();
				$("#txt-huifu-top-" + linkId).data("parentid", "").css({
					"text-indent": "0px",
					height: "20px",
					resize: "none"
				});
				if(hui == "huifu" && userAgentInfo.indexOf("AppleWebKit") < 0) {
					$("#txt-huifu-top-" + linkId).focus()
				}
				$("#txt-huifu-top-" + linkId).val(" ").val("");
				if(hui == "huifu" && userAgentInfo.indexOf("AppleWebKit") >= 0) {
					$("#txt-huifu-top-" + linkId).focus()
				}
				$("#hidden-comt-" + linkId).show();
				//$.inputComment("txt-huifu-top-" + linkId, linkId, inputState);
				//oprateDigg();
				chouti.oprateJuBao();
				var $coloseComment = $("#coloseComment" + linkId);
				if(noComments) {
					var colComStr = "<div class='coloseComment' id='coloseComment" + linkId + "'>此评论已关闭</div>";
					if($coloseComment.length > 0) {
						$coloseComment.show()
					} else {
						//$("#huifu-top-box-" + linkId).after(colComStr)
					}
					//$("#huifu-top-box-" + linkId).hide()
				} else {
					//$("#huifu-top-box-" + linkId).show();
					$coloseComment.hide()
				}

				$("a").attr("target", "_blank").each(function(i) {
					if(this.href.indexOf('chrome-extension') >= 0) {
						this.href = this.href.replace(extensitonUrl, "https://dig.chouti.com");
					}
					if(this.href.indexOf('javascript') >= 0) {
						$(this).removeAttr("href")
					}
				});

				chouti.oprateDigg();

			} else {
				L.showTopTips(L.TIPS_TYPE.error, info.message);
				$("#loading-comment-top-" + linkId).hide();
				return false
			}
			$(".into-time").hide();
		}
	})
}

function loadCommentsTop(dataObj, linkId) {
	var str = "";
	var noComments = dataObj.data.noComments;
	var data = dataObj.data.dataList;
	var jid = $("#hidjid").val();
	for(var i = 0; i < data.length; i++) {
		var act = data[i].action;
		totalChildStr = "", chidStr = "", digui = 1;
		str += "<li class='items'>";
		var createT = data[i].commentTime;
		var content = data[i].content;
		var depth = data[i].depth;
		var downs = data[i].downs;
		var ups = data[i].ups;
		var nickImgUrl = data[i].nickImgUrl;
		if(nickImgUrl.indexOf('/') == 0) {
			nickImgUrl = "https://dig.chouti.com" + nickImgUrl;
		}

		var nick = data[i].nick;
		var isVote = data[i].isVote;
		var id = data[i].id;
		var jid = data[i].jid;
		var state = data[i].assentText;
		var deleteResult = data[i].deleteInfo;
		var sourceType = data[i].sourceType;
		var sourceAppUrl = data[i].sourceAppUrl;
		var destjid = $("#hidjid").val();
		str += "<span class='folder' >";
		str += "<div class='comment-L comment-L-top'>";
		str += "<a href='#' class='icons zhan-ico'></a>";
		str += "<a href='https://dig.chouti.com/user/" + jid + "/submitted/1'><img src='" + nickImgUrl + "' /></a>";
		str += "</div>";
		str += "<div class='comment-R comment-R-top'>";
		str += "<div class='pp'>";
		str += "<a class='name' href='https://dig.chouti.com/user/" + jid + "/submitted/1' target='_blank'>" + nick + "</a>";
		var author = $("#collect-a-" + linkId).attr("jid");
		if(author == jid) {
			str += "<span class='author'>(楼主)</span>"
		}
		str += "<span class='p3'>";
		if(act != 2) {
			str += content
		} else {
			str += "<em style='font-style:oblique;color:#B4B4B4'>该评论因  ''" + deleteResult + "'' 被删除</em>"
		}
		str += "</span>";
		str += "<span class='into-time into-time-top'>" + createT + "发布</span>";
		if(state == "相信") {
			str += "<span class='yaoyan-state-top'>" + state + "</span>"
		} else {
			if(state != "") {
				str += "<span class='yaoyan-state-top' style='color:#CC3300'>" + state + "</span>"
			}
		}
		if(sourceType != undefined) {
			switch(sourceType) {
				case 1:
					sourceAppUrl = "/download/model/iphone";
					break;
				case 3:
					sourceAppUrl = "/download/model/wphone";
					break;
				case 5:
					sourceAppUrl = "/download/model/iphone";
					break;
				case 6:
					sourceAppUrl = "/download/model/iphone";
					break
			}
			//str += "<span class='into-time s-phone'>来自<a class='phone-name' href='" + sourceAppUrl + "' target='_blank'>" + sourcePhone[sourceType] + "</a></span>"
		}
		str += "</div>";
		if(act != 2 && !noComments) {
			str += "<div class='comment-line-top'>";
			str += "<div class='comment-state'>";
			if(isVote == "0") {
				str += "<a  target='_blank' class='ding' lang='" + linkId + "' href='javascript:;'><b>顶</b><span class='ding-num'>[" + ups + "]</span></a><a class='cai' lang='" + linkId + "' href='javascript:;'><b>踩</b><span class='cai-num'>[" + downs + "]</span></a>"
			} else {
				if(isVote == 1) {
					str += "<span class='ding' href='javascript:;'><b>已顶</b><span class='ding-num'>[" + ups + "]</span></span><span class='cai' lang='" + linkId + "' href='javascript:;'><b>踩</b><span class='cai-num'>[" + downs + "]</span></span>"
				} else {
					str += "<span class='ding' lang='" + linkId + "' href='javascript:;'><b>顶</b><span class='ding-num'>[" + ups + "]</span></span><span class='cai' href='javascript:;'><b>已踩</b><span class='cai-num'>[" + downs + "]</span></span>"
				}
			}
			if(destjid != jid) {
				//str += "<span class='line-huifu'>|</span>";
				//str += "<a class='see-a jubao' href='javascript:;' lang='" + id + "'  linkid='" + linkId + "'>举报</a>"
			} else {}
			if($(".isCateAdmin").length > 0) {
				//str += "<span class='line-huifu'>|</span>";
				//str += "<a class='see-a btn-delete-comment' lang='" + id + "'  linkid='" + linkId + "' style='cursor:pointer;'>删除</a>"
			}
			if(depth < 6) {
				if(act != 2) {
					//str += "<span class='line-huifu'>|</span>";
					//str += "<a class='see-a huifu-a' href='javascript:;' id='huifuBtn" + id + "' lang='" + id + "' usernick='" + nick + "'  linkid='" + linkId + "'>回复</a>"
				}
			}
			str += "<input type='hidden' id='hid" + id + "' value='" + id + "' />";
			str += "</div>";
			str += "</div>"
		}
		str += "</div>";
		str += "</span>";
		if(data[i].childs) {
			diguiComments(data[i].childs, linkId, noComments)
		}
		str += totalChildStr;
		str += "</li>"
	}
	$("#comment-list-top-" + linkId).html(str).treeview();
	deleteline(linkId);
	bindHuifuBtn();
	commentListHover()
}

function diguiComments(childData, linkId, noComments) {
	if(childData == null || childData.length <= 0) {
		return
	}
	for(var i = 0; i < childData.length; i++) {
		var createT = childData[i].commentTime;
		var content = childData[i].content;
		var depth = childData[i].depth;
		var downs = childData[i].downs;
		var ups = childData[i].ups;
		var nickImgUrl = childData[i].nickImgUrl;
		if(nickImgUrl.indexOf('/') == 0) {
			nickImgUrl = "https://dig.chouti.com" + nickImgUrl;
		}
		var nick = childData[i].nick;
		var isVote = childData[i].isVote;
		var id = childData[i].id;
		var jid = childData[i].jid;
		var act = childData[i].action;
		var deleteResult = childData[i].deleteInfo;
		var sourceType = childData[i].sourceType;
		var sourceAppUrl = childData[i].sourceAppUrl;
		var destjid = $("#hidjid").val();
		chidStr += "<ul><li>";
		chidStr += "<span class='folder'>";
		chidStr += "<div class='comment-L comment-L-top'>";
		chidStr += "<a href='#' class='icons zhan-ico'  target='_blank'></a>";
		chidStr += "<a href='https://dig.chouti.com/user/" + jid + "/submitted/1'  target='_blank'><img src='" + nickImgUrl + "' /></a>";
		chidStr += "</div>";
		chidStr += "<div class='comment-R comment-R-top'>";
		chidStr += "<div class='pp'>";
		chidStr += "<a class='name' href='https://dig.chouti.com/user/" + jid + "/submitted/1'  target='_blank'>" + nick + "</a>";
		var author = $("#collect-a-" + linkId).attr("jid");
		if(author == jid) {
			chidStr += "<span class='author'>(楼主)</span>"
		}
		chidStr += "<span class='p3'>";
		if(act != 2) {
			chidStr += content
		} else {
			chidStr += "<em style='font-style:oblique;color:#B4B4B4'>该评论因  ''" + deleteResult + "'' 被删除</em>"
		}
		chidStr += "</span>";
		chidStr += "<span class='into-time into-time-top'>" + createT + "发布</span>";
		if(sourceType != undefined) {
			switch(sourceType) {
				case 1:
					sourceAppUrl = "/download/model/iphone";
					break;
				case 3:
					sourceAppUrl = "/download/model/wphone";
					break;
				case 5:
					sourceAppUrl = "/download/model/iphone";
					break;
				case 6:
					sourceAppUrl = "/download/model/iphone";
					break
			}
			chidStr += "<span class='into-time s-phone'>来自<a class='phone-name' href='" + sourceAppUrl + "' target='_blank'>" + sourcePhone[sourceType] + "</a></span>"
		}
		chidStr += "</div>";
		if(act != 2 && !noComments) {
			chidStr += "<div class='comment-line-top'>";
			chidStr += "<div class='comment-state'>";
			if(isVote == "0") {
				chidStr += "<a class='ding' lang='" + linkId + "' href='javascript:;'><b>顶</b><span class='ding-num'>[" + ups + "]</span></a><a class='cai' lang='" + linkId + "'  href='javascript:;'><b>踩</b><span class='cai-num'>[" + downs + "]</span></a>"
			} else {
				if(isVote == 1) {
					chidStr += "<span class='ding' href='javascript:;'><b>已顶</b><span class='ding-num'>[" + ups + "]</span></span><span class='cai' lang='" + linkId + "' href='javascript:;'><b>踩</b><span class='cai-num'>[" + downs + "]</span></span>"
				} else {
					chidStr += "<span class='ding' lang='" + linkId + "' href='javascript:;'><b>顶</b><span class='ding-num'>[" + ups + "]</span></span><span class='cai' href='javascript:;'><b>已踩</b><span class='cai-num'>[" + downs + "]</span></span>"
				}
			}
			if(destjid != jid) {
				//chidStr += "<span class='line-huifu'>|</span>";
				//chidStr += "<a class='see-a jubao' href='javascript:;' lang='" + id + "'  linkid='" + linkId + "'>举报</a>"
			}
			if($(".isCateAdmin").length > 0) {
				//chidStr += "<span class='line-huifu'>|</span>";
				//chidStr += "<a class='see-a btn-delete-comment' lang='" + id + "'  linkid='" + linkId + "' style='cursor:pointer;'>删除</a>"
			}
			if(depth < 6) {
				if(act != 2) {
					//chidStr += "<span class='line-huifu'>|</span>";
					//chidStr += "<a class='see-a huifu-a' href='javascript:;' id='huifuBtn" + id + "'  lang='" + id + "' usernick='" + nick + "' linkid='" + linkId + "'>回复</a>"
				}
			}
			chidStr += "<input type='hidden' id='hid" + id + "' value='" + id + "' />";
			chidStr += "</div>";
			chidStr += "</div>"
		}
		chidStr += "</div>";
		chidStr += "</span>";
		if(childData[i].childs) {
			digui++;
			diguiComments(childData[i].childs, linkId, noComments)
		}
		chidStr += "</li></ul>";
		totalChildStr += chidStr;
		chidStr = "";
		digui = 1
	}
}

function deleteline(linkId) {
	var $list = "#comment-list-top-" + linkId;
	var itemobj = $("#comment-list-top-" + linkId + " li.items");
	for(var i = 0; i < itemobj.length; i++) {
		var sp = $(itemobj[i]).children();
		if(sp.length <= 1) {
			$(itemobj[i]).children("span.folder").css("background", "none")
		}
	}
	$($list + " li.items:last").children("div.lastCollapsable-hitarea").css("background-position", "-64px -45px");
	$($list + " li.last span.folder").css("background", "none");
	$($list + " li.last").parent("ul").css("background", "none");
	$($list + " li.items li.lastCollapsable").parent("ul").css("background", "none").prev("ul").css("background", "url('/images/pinglun_line.gif') no-repeat scroll 0 -10px transparent");
	$($list + " li.items li.last").parent("ul").prev("ul").css("background", "url('/images/pinglun_line.gif') no-repeat scroll 0 -10px transparent");
	$($list + " li.collapsable:first ul:last").css("background", "none");
	$($list + " li.items:last").children("div.items-hitarea").click(function() {
		if($(this).hasClass("lastExpandable-hitarea")) {
			$(this).css("background-position", "-80px -13px")
		} else {
			$(this).css("background-position", "-64px -45px")
		}
	});
	$($list + " li.items div.items-hitarea").click(function() {
		$(this).children("ul:first li:first b").focus()
	})
}

function bindHuifuBtn() {
	$(".huifu-a").unbind().bind("click", function() {
		isHuifu = true;
		var id = $(this).attr("lang");
		var nick = $(this).attr("usernick");
		var linkId = $(this).attr("linkid");
		var $lab = $("#lab-comment-top-" + linkId);
		$lab.show().find("span").html(nick);
		var labW = $lab.width();
		var crusorP = (labW + 4);
		if(userAgentInfo.indexOf("AppleWebKit") > 0) {
			$("#txt-huifu-top-" + linkId).data("parentid", id).css({
				"background-color": "#fff"
			}).attr("disabled", false).val(" ").focus()
		} else {
			$("#txt-huifu-top-" + linkId).data("parentid", id).css({
				"background-color": "#fff"
			}).attr("disabled", false).focus().val(" ").val("")
		}
		setButtonDisabled(linkId);
		$("#pub-btn-top-" + linkId).unbind().bind("click", function() {
			publish(linkId, "huifu", id)
		})
	})
}

function commentListHover() {
	$(".comment-list-top-2 .comment-R-top").hover(function() {
		$(this).css({
			"background-color": "#f6ecdc"
		}).find(".comment-line-top").show()
	}, function() {
		$(this).css("background-color", "#F6F6F6").find(".comment-line-top").hide()
	})
}

function setButtonDisabled(n) {
	$("#pub-btn-top-" + n).addClass("add-pub-btn-unvalid").removeClass("add-pub-btn-valid")
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
