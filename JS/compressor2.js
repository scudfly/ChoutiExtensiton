(function($) {
	$.fn.lazyload = function(options) {
		var settings = {
			threshold: 0,
			failurelimit: 0,
			event: "scroll",
			effect: "show",
			container: window
		};
		if (options) {
			$.extend(settings, options)
		}
		var elements = this;
		if ("scroll" == settings.event) {
			$(settings.container).bind("scroll", function(event) {
				var counter = 0;
				elements.each(function() {
					if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {} else {
						if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
							$(this).trigger("appear")
						} else {
							if (counter++ > settings.failurelimit) {
								return false
							}
						}
					}
				});
				var temp = $.grep(elements, function(element) {
					return !element.loaded
				});
				elements = $(temp)
			})
		}
		this.each(function() {
			var self = this;
			if (undefined == $(self).attr("original")) {
				$(self).attr("original", $(self).attr("src"))
			}
			if ("scroll" != settings.event || undefined == $(self).attr("src") || settings.placeholder == $(self).attr("src") || ($.abovethetop(self, settings) || $.leftofbegin(self, settings) || $.belowthefold(self, settings) || $.rightoffold(self, settings))) {
				if (settings.placeholder) {
					$(self).attr("src", settings.placeholder)
				} else {
					$(self).removeAttr("src")
				}
				self.loaded = false
			} else {
				self.loaded = true
			}
			$(self).one("appear", function() {
				if (!this.loaded) {
					$("<img />").bind("load", function() {
						$(self).hide().attr("src", $(self).attr("original"))[settings.effect](settings.effectspeed);
						self.loaded = true
					}).attr("src", $(self).attr("original"))
				}
			});
			if ("scroll" != settings.event) {
				$(self).bind(settings.event, function(event) {
					if (!self.loaded) {
						$(self).trigger("appear")
					}
				})
			}
		});
		$(settings.container).trigger(settings.event);
		return this
	};
	$.belowthefold = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).height() + $(window).scrollTop()
		} else {
			var fold = $(settings.container).offset().top + $(settings.container).height()
		}
		return fold <= $(element).offset().top - settings.threshold
	};
	$.rightoffold = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).width() + $(window).scrollLeft()
		} else {
			var fold = $(settings.container).offset().left + $(settings.container).width()
		}
		return fold <= $(element).offset().left - settings.threshold
	};
	$.abovethetop = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).scrollTop()
		} else {
			var fold = $(settings.container).offset().top
		}
		return fold >= $(element).offset().top + settings.threshold + $(element).height()
	};
	$.leftofbegin = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).scrollLeft()
		} else {
			var fold = $(settings.container).offset().left
		}
		return fold >= $(element).offset().left + settings.threshold + $(element).width()
	};
	$.extend($.expr[":"], {
		"below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
		"above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
		"right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
		"left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
	})
})(jQuery);
(function($, undefined) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n,
		i18nNotice = i18n.notice;
	var ResultCodeSuccess = L.RESULT_CODE.success,
		sumWriteLength = 150,
		sumZixunLength = 512,
		kind = 0,
		classType = 1,
		is_pic_clean = false,
		is_link_clean = false,
		submitTxtContent = "",
		obj = "",
		ispublishing = false,
		imgurlSelect = "",
		identifie = "",
		uploadImgSucess = false,
		isHtPub = false,
		topicId = 0;
	var txtInputNum = {
		"0": "#txt-zixun",
		"1": "#txt-duanzi",
		"2": "#txt-img"
	};

	function init() {
		clearAllTextInput();
		closeDialog();
		chouti.clickClear();
		changeTab();
		$("#pub-btn1").click(function() {
			checkIsHuaTi();
			publish()
		});
		$("#pub-btn0").click(function() {
			checkIsHuaTi();
			zixunPublish()
		});
		$("#pub-btn2").click(function() {
			checkIsHuaTi();
			if (uploadImgSucess) {
				imgPublish();
				return true
			} else {
				var txtContent = $.trim($(txtInputNum[kind]).val());
				if (txtContent == "") {
					return
				}
				$("#write-error-box" + kind + " .write-error-desc").html("请先添加图片，再点击发布").show();
				return false
			}
		});
		$("#add-pub-btn0").click(function() {
			is_link_clean = false;
			addLink()
		});
		$("#txt-zixun").keydown(function(event) {
			if (event.keyCode == 13) {
				$("#add-pub-btn0").click()
			}
		});
		listenZixunPblicButton();
		$("#to-btn-zixun, #to-btn-duanzi, #to-btn-duanzi2, #to-btn-yaoyan, #to-btn-pic, #to-btn-pic2, #to-btn-ask, #to-btn-ask2, #to-btn-ask3").click(function() {
			$(this).addClass("toclass-btn-valid").removeClass("toclass-btn-unvalid");
			$(this).siblings(":not(.un1024,.unfavor)").addClass("toclass-btn-unvalid");
			$(this).siblings(":not(.un1024,.unfavor)").removeClass("toclass-btn-valid");
			$(".unfavor, .un1024").removeClass("toclass-btn-unfavor-valid").addClass("toclass-btn-unfavor-unvalid");
			var num = parseInt($(this).attr("lang"));
			classType = num
		});
		$(".unfavor").click(function() {
			$(this).addClass("toclass-btn-unfavor-valid").removeClass("toclass-btn-unfavor-unvalid");
			$(this).siblings(":not(.un1024,.unfavor)").addClass("toclass-btn-unvalid");
			$(this).siblings(":not(.un1024,.unfavor)").removeClass("toclass-btn-valid");
			$(".un1024").removeClass("toclass-btn-unfavor-valid").addClass("toclass-btn-unfavor-unvalid");
			var num = parseInt($(this).attr("lang"));
			classType = num
		});
		$(".un1024").click(function() {
			$(this).addClass("toclass-btn-unfavor-valid").removeClass("toclass-btn-unfavor-unvalid");
			$(this).siblings().not(".unfavor,.un1024").addClass("toclass-btn-unvalid");
			$(this).siblings().not(".unfavor,.un1024").removeClass("toclass-btn-valid");
			$(".unfavor").removeClass("toclass-btn-unfavor-valid").addClass("toclass-btn-unfavor-unvalid");
			var num = parseInt($(this).attr("lang"));
			classType = num
		});
		var $txtboxs = $("#txt-zixun, #txt-zixun-content, #txt-zhaiyao, #txt-duanzi, #txt-img, #link-zixun-content");
		$txtboxs.focus(function() {
			$(this).css("border", "1px solid #99ccff")
		});
		$txtboxs.blur(function() {
			$(this).css("border", "1px solid #CCDCEF")
		});
		$("#clear-btn-link").bind("click", aclearLink);
		$("#clear-btn-wanzi").bind("click", aclearWenzi);
		$("#clear-btn-pic").bind("click", aclearPic)
	}

	function checkIsHuaTi() {
		var ht = $("#hidHtTag").val();
		if (ht == "huati") {
			isHtPub = true;
			topicId = $("#hidHtTag").attr("topicId")
		} else {
			isHtPub = false
		}
	}

	function aclearWenzi() {
		if (ispublishing) {
			return
		}
		$("#pubTabDuanzi").click();
		$("#write-error-box1 .write-error-desc").html("")
	}

	function aclearLink() {
		if (ispublishing) {
			return
		}
		$("#pubTabZixun").click();
		$("#txt-zixun").focus().val("");
		is_link_clean = true
	}

	function aclearPic() {
		if (ispublishing) {
			return
		}
		$("#pubTabPic").click();
		$("#repeat-upload-btn").click();
		is_pic_clean = true
	}

	function changeTab() {
		$("#pubTabZixun").click(function() {
			clearAllTextInput();
			$(this).addClass("w-active color").siblings().removeClass("w-active color");
			var index = $("#tabs a").index(this);
			$("#dialog-main-content").children().eq(index).show().siblings().hide();
			kind = 0;
			classType = 1;
			is_link_clean = true;
			ispublishing = false;
			$("#txt-zixun").focus().val(" ").val("");
			listenButton(kind);
			var subjectName = $("#publishBtn").attr("lang");
			chouti.showOrHidePubtoBox(subjectName);
			$("#to-btn-duanzi2").addClass("toclass-btn-valid").removeClass("toclass-btn-unvalid")
		});
		$("#pubTabDuanzi").click(function() {
			$(this).addClass("w-active color").siblings().removeClass("w-active color");
			var index = $("#tabs a").index(this);
			$("#dialog-main-content").children().eq(index).show().siblings().hide();
			kind = 1;
			classType = 2;
			ispublishing = false;
			$("#txt-duanzi").focus().val(" ").val("");
			listenButton(kind);
			var subjectName = $("#publishBtn").attr("lang");
			chouti.showOrHidePubtoBox(subjectName);
			$("#to-btn-duanzi2").addClass("toclass-btn-valid").removeClass("toclass-btn-unvalid")
		});
		$("#pubTabPic").click(function() {
			clearAllTextInput();
			$(this).addClass("w-active color").siblings().removeClass("w-active color");
			var index = $("#tabs a").index(this);
			$("#dialog-main-content").children().eq(index).show().siblings().hide();
			kind = 2;
			classType = 4;
			is_pic_clean = true;
			ispublishing = false;
			$("#txt-img").focus().val(" ").val("");
			var subjectName = $("#publishBtn").attr("lang");
			chouti.showOrHidePubtoBox(subjectName);
			uploadImg();
			listenButton(kind);
			repeatUploadImg();
			$("#to-btn-pic2").addClass("toclass-btn-valid").removeClass("toclass-btn-unvalid")
		})
	}

	function uploadImg() {
		$("#add-pub-btn2").click(function() {
			is_pic_clean = false;
			identifie = new Date().getTime();
			$("#timeHidden").val(identifie);
			$("#upload-img").attr("src", "");
			$("#imgUrl").val("");
			$("#imgUrl").unbind().change(function() {
				var fileName = $(this).val();
				var fileSuff = fileName.substring(fileName.lastIndexOf(".") + 1);
				fileSuff = fileSuff.toLowerCase();
				var errbox = "#write-error-box" + kind + " .write-error-desc";
				if (fileSuff != "jpg" && fileSuff != "jpeg" && fileSuff != "gif" && fileSuff != "png") {
					$(errbox).html("您上传的图片格式不合法，请重新上传").show();
					return
				} else {
					$(errbox).hide()
				}
				$("#add-pub-btn" + kind).hide();
				$("#add-pub-loading" + kind).css("display", "block");
				$(".imgRule").hide();
				window.setTimeout(function() {
					IframeEvent();
					$("#uploadPicFrm").submit()
				}, 1);
				$("#txt-img").focus()
			})
		})
	}

	function IframeEvent() {
		if (window.attachEvent) {
			document.getElementById("uploadIframe").attachEvent("onload", uploadCallback)
		} else {
			document.getElementById("uploadIframe").addEventListener("load", uploadCallback, false)
		}
	}

	function uploadCallback() {
		var io = document.getElementById("uploadIframe");
		if (io.contentWindow) {
			responseData = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null
		} else {
			if (io.contentDocument) {
				responseData = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null
			}
		}
		DataProssesing(responseData)
	}

	function DataProssesing(responseData) {
		var d1 = responseData.indexOf("{");
		var d2 = responseData.lastIndexOf("}");
		var values = responseData.substring(d1, d2 + 1);
		values = eval("(" + values + ")");
		var code = values.result.code;
		if (code == ResultCodeSuccess) {
			if (values.result.data.identifie == identifie && !is_pic_clean) {
				$("#img-alt-title").html("预览图片");
				$("#upload-img-area").hide();
				$("#show-img-area").show();
				$("#upload-img").attr({
					src: values.result.data.imgUrl
				});
				uploadImgSucess = true
			}
		} else {
			$("#img-alt-title").html("添加图片");
			$(".imgRule").show();
			$("#upload-img-area").show();
			$("#show-img-area").hide();
			uploadImgSucess = false;
			var tempError = values.result.message;
			var errbox = "#write-error-box" + kind + " .write-error-desc";
			$(errbox).html(tempError).show();
			$("#add-pub-btn" + kind).show();
			$("#add-pub-loading" + kind).css("display", "none")
		}
		$("#add-pub-btn" + kind).show();
		$("#add-pub-loading" + kind).css("display", "none");
		return false
	}

	function repeatUploadImg() {
		$("#repeat-upload-btn").click(function() {
			$("#upload-img-area").show();
			$("#show-img-area").hide();
			$("#img-alt-title").html("添加图片");
			$(".imgRule").show();
			$("#upload-img").attr("src", "");
			$("#add-pub-btn2").addClass("add-pub-btn-valid").css("display", "inline-block");
			$("#add-pub-loading2").hide();
			uploadImgSucess = false;
			is_pic_clean = false;
			$("#write-error-box" + kind + " .write-error-desc").html("").hide()
		})
	}

	function imgPublish() {
		ispublishing = true;
		var txtContent = $.trim($(txtInputNum[kind]).val());
		if (txtContent == "") {
			return
		}
		var thisobj = $("#dialog-buttonpane" + kind + " .write-error");
		if (!chouti.flashErrorTip(thisobj)) {
			return
		}
		$("#pub-btn" + kind).hide();
		$("#pub-loading" + kind).css("display", "inline-block");
		$(txtInputNum[kind]).attr("disabled", true).css("background-color", "#ece9d8");
		var bad = 0;
		var imgurl = $("#upload-img").attr("src");
		var submitUrl = "/link/create";
		if (isHtPub) {
			var dataStr = G.param({
				subjectId: classType,
				title: submitTxtContent,
				yellow: bad,
				imgUrl: imgurl,
				tabType: kind,
				topicId: topicId
			})
		} else {
			var dataStr = G.param({
				subjectId: classType,
				title: submitTxtContent,
				yellow: bad,
				imgUrl: imgurl,
				tabType: kind
			})
		}
		L.ajax({
			url: submitUrl,
			type: "POST",
			data: dataStr,
			success: function(info) {
				if (info.code == ResultCodeSuccess) {
					if (!isHtPub) {
						$(".dialog").hide();
						$(txtInputNum[kind]).attr("disabled", false).css("background-color", "#fff");
						$(txtInputNum[kind]).val("");
						$("#pub-btn" + kind).show();
						$("#pub-loading" + kind).css("display", "none");
						L.showTopTips(L.TIPS_TYPE.success, info.message);
						redirectCommentPage(info.data.linkId);
						L.showTopTips(L.TIPS_TYPE.success, info.message)
					} else {
						goHtPage()
					}
				} else {
					var errMsg = info.message;
					$("#write-error-box" + kind + " .write-error-desc").html(errMsg).show();
					$(txtInputNum[kind]).attr("disabled", false).css("background-color", "#fff");
					$("#pub-btn" + kind).show();
					$("#pub-loading" + kind).css("display", "none");
					ispublishing = false;
					return false
				}
			}
		})
	}

	function zixunPublish() {
		ispublishing = true;
		var txtContent = $.trim($("#txt-zixun-content").val());
		if (txtContent == "" && $("#pub-btn0").hasClass("new-pub-btn-unvalid")) {
			return
		}
		var thisobj = $("#dialog-buttonpane" + kind + " .write-error");
		if (!chouti.flashErrorTip(thisobj)) {
			return
		}
		$("#pub-btn" + kind).hide();
		$("#pub-loading" + kind).css("display", "inline-block");
		$(txtInputNum[kind]).attr("disabled", true).css("background-color", "#ece9d8");
		var httpurl = $("#txt-zixun").val();
		var title = $("#txt-zixun-content").val();
		var content = $("#txt-zhaiyao").val();
		var submitUrl = "/link/create";
		if (isHtPub) {
			var dataStr = G.param({
				subjectId: classType,
				title: title,
				url: httpurl,
				content: content,
				tabType: kind,
				topicId: topicId
			})
		} else {
			var dataStr = G.param({
				subjectId: classType,
				title: title,
				url: httpurl,
				content: content,
				tabType: kind
			})
		}
		L.ajax({
			url: submitUrl,
			type: "POST",
			data: dataStr,
			success: function(info) {
				if (info.code == ResultCodeSuccess) {
					if (!isHtPub) {
						$(".dialog").hide();
						L.showTopTips(L.TIPS_TYPE.success, info.message);
						redirectCommentPage(info.data.linkId)
					} else {
						goHtPage()
					}
				} else {
					var errMsg = info.message;
					$("#write-error-box" + kind + " .write-error-desc").html(errMsg).show();
					$(txtInputNum[kind]).attr("disabled", false).css("background-color", "#fff");
					$("#pub-btn" + kind).show();
					$("#pub-loading" + kind).css("display", "none");
					ispublishing = false;
					return
				}
			}
		})
	}

	function addLink() {
		var txtContent = $.trim($(txtInputNum[kind]).val());
		if (txtContent == "") {
			return
		}
		$("#add-pub-loading" + kind).css("display", "block");
		$("#add-pub-btn0").css("display", "none");
		$(txtInputNum[kind]).attr("disabled", "disabled").css({
			"background-color": "#ece9d8",
			border: "1px solid #CCDCEF"
		});
		$("#url").val($("#txt-zixun").val());
		var submitUrl = "/link/catch/title";
		L.ajax({
			url: submitUrl,
			type: "POST",
			data: G.param({
				url: submitTxtContent
			}),
			error: function(xmlHttp, textStatus) {
				textStatus = textStatus.toLowerCase();
				if (textStatus === "timeout" && !is_link_clean) {
					$(txtInputNum[kind]).attr("disabled", false).css({
						"background-color": "#fff",
						color: "#333"
					});
					$("#add-pub-btn0").css("display", "block");
					$("#add-pub-loading" + kind).css("display", "none");
					L.showTopTips(L.TIPS_TYPE.error, i18n.common.httpError[6]);
					xmlHttp.abort();
					return
				}
				return
			},
			success: function(info) {
				if (info.code == ResultCodeSuccess && !is_link_clean) {
					$("#add-pub-loading" + kind).css("display", "none");
					var titleobj = info.data.title;
					if (titleobj) {
						var titleContent = titleobj
					} else {
						var titleContent = ""
					}
					var summaryobj = info.data.summary;
					if (summaryobj) {
						var summary = summaryobj
					} else {
						var summary = ""
					}
					$(txtInputNum[kind]).attr("disabled", true).css({
						"background-color": "#ece9d8",
						color: "#ccc",
						border: "1px solid #CCDCEF"
					});
					$("#zixun-button-container").hide();
					$("#txt-zixun").css("width", "523px");
					$("#txt-zixun-area").css("width", "530px");
					$("#zixun-big-area").show();
					listenZixunPblicButton();
					$("#txt-zixun-content").val(titleContent).attr("disabled", false).css({
						"background-color": "#fff"
					});
					$("#txt-zhaiyao").val(summary).attr("disabled", false).css({
						"background-color": "#fff"
					});
					$("#pub-btn0").addClass("new-pub-btn-valid").removeClass("new-pub-btn-unvalid")
				} else {
					var errMsg = info.message;
					if (info.code == "30009") {
						L.showTopTips(L.TIPS_TYPE.success, info.message);
						window.setTimeout(function() {
							redirectCommentPage(info.data.linkId)
						}, 800)
					}
					$(txtInputNum[kind]).attr("disabled", false).css({
						"background-color": "#fff",
						color: "#333"
					});
					$("#add-pub-btn0").css("display", "block");
					$("#add-pub-loading" + kind).css("display", "none");
					$("#write-error-box0 .write-error-desc").show().html(errMsg);
					return
				}
			}
		})
	}

	function redirectCommentPage(linkId) {
		var https = window.location.host;
		https = "http://" + https + "/link/" + linkId;
		var userAgentInfo = navigator.userAgent;
		if (userAgentInfo.indexOf("IE") >= 0) {
			var gotoLink = document.createElement("a");
			gotoLink.href = https;
			document.body.appendChild(gotoLink);
			gotoLink.click()
		} else {
			window.location.href = https
		}
	}

	function selectZixunImg(defaultimg, imgCount) {
		$("#zixun-sel-img .inline-img").click(function() {
			imgurlSelect = "";
			var $selImg = $(this).children(".sel-icon");
			$selImg.show().parent().siblings().children(".sel-icon").hide();
			imgurlSelect = $(this).find("img").attr("src")
		});
		if (imgCount > 1) {
			$("#zixun-sel-img .inline-img").eq(1).children(".sel-icon").show()
		} else {
			$("#zixun-sel-img .inline-img").eq(0).children(".sel-icon").show()
		}
		imgurlSelect = defaultimg
	}

	function publish() {
		ispublishing = true;
		var txtContent = $.trim($(txtInputNum[kind]).val());
		if (txtContent == "") {
			return
		}
		var thisobj = $("#dialog-buttonpane" + kind + " .write-error");
		if (!chouti.flashErrorTip(thisobj)) {
			return
		}
		$("#pub-btn" + kind).hide();
		$("#pub-loading" + kind).css("display", "inline-block");
		$(txtInputNum[kind]).attr("disabled", true).css("background-color", "#ece9d8");
		var submitUrl = "/link/create";
		if (isHtPub) {
			var dataStr = G.param({
				subjectId: classType,
				title: submitTxtContent,
				tabType: kind,
				topicId: topicId
			})
		} else {
			var dataStr = G.param({
				subjectId: classType,
				title: submitTxtContent,
				tabType: kind
			})
		}
		L.ajax({
			url: submitUrl,
			type: "POST",
			data: dataStr,
			success: function(info) {
				if (info.code == ResultCodeSuccess) {
					if (!isHtPub) {
						$(".dialog").hide();
						L.showTopTips(L.TIPS_TYPE.success, info.message);
						redirectCommentPage(info.data.linkId)
					} else {
						goHtPage()
					}
				} else {
					$("#write-error-box" + kind + " .write-error-desc").html(info.message).show();
					$("#pub-btn" + kind).show();
					$("#pub-loading" + kind).css("display", "none");
					$(txtInputNum[kind]).attr("disabled", false).css("background-color", "#fff");
					ispublishing = false;
					return false
				}
			}
		})
	}

	function clearBeforeNull(value) {
		var tt1 = /^(\s+)|(\s+)$/;
		var str = value;
		str = str.replace(tt1, "");
		str = str.replace(tt1, "");
		return str
	}

	function clearMidNull(value) {
		var tt2 = /\s+/g;
		var str = value.replace(tt2, " ");
		return str
	}

	function listenZixunPblicButton() {
		$.input("txt-zixun-content", inputStateZixunContent)
	}
	$.extend({
		input: function(objs, fun) {
			var element = document.getElementById(objs);
			if (element != null) {
				if ("\v" == "v") {
					element.attachEvent("onpropertychange", fun)
				} else {
					element.addEventListener("input", fun, false)
				}
			}
		}
	});

	function listenButton(num) {
		setButtonDisabled(num);
		$("#showLength" + num).html(sumWriteLength);
		switch (num) {
			case 0:
				obj = "#txt-zixun";
				$.input("txt-zixun", inputState);
				break;
			case 1:
				obj = "#txt-duanzi";
				$.input("txt-duanzi", inputState);
				break;
			case 2:
				obj = "#txt-img";
				$.input("txt-img", inputState);
				break
		}
	}

	function inputStateZixunContent() {
		var num = kind;
		var duanzi = $("#txt-zixun-content").val();
		if ($.trim(duanzi) == "") {
			setButtonDisabled(num);
			$("#showLength" + num).html(sumWriteLength);
			return
		} else {
			setButtonAbled(num);
			countDuanziLength(duanzi, num)
		}
	}

	function inputState() {
		var num = kind;
		var duanzi = $(obj).val();
		if ($.trim(duanzi) == "") {
			setButtonDisabled(num);
			$("#showLength" + num).html(sumWriteLength);
			return
		} else {
			setButtonAbled(num);
			switch (num) {
				case 0:
					countZixunLength(duanzi, num);
					break;
				case 1:
					countDuanziLength(duanzi, num);
					break;
				case 2:
					countDuanziLength(duanzi, num);
					break;
				case 3:
					countDuanziLength(duanzi, num);
					break
			}
		}
	}

	function checkCharCodeAt(str, objs) {
		str = str.split("");
		var TotalStr = "";
		for (var i = 0; i < str.length; i++) {
			if (str[i].charCodeAt(0) > 65280) {
				var chara = String.fromCharCode(str[i].charCodeAt(0) - 65248);
				TotalStr += chara
			} else {
				TotalStr += str[i]
			}
		}
		return TotalStr
	}

	function countZixunLength(str, n) {
		var str = clearBeforeNull(str);
		str = clearMidNull(str);
		var len = 0;
		for (var i = 0; i < str.length; i++) {
			var c = str.charCodeAt(i);
			if ((c >= 1 && c <= 126) || (65376 <= c && c <= 65439)) {
				len++
			} else {
				len += 2
			}
		}
		var result = parseInt(len / 2);
		var mod = len % 2;
		if (mod != 0) {
			result += 1
		}
		submitTxtContent = str;
		var haveLength = sumZixunLength - result;
		if (haveLength < 0) {
			$("#write-error-box0 .write-error-desc").html("您输入的链接过长，请重新输入").show()
		} else {
			$("#write-error-box0 .write-error-desc").hide()
		}
	}

	function countDuanziLength(str, n) {
		var str = clearBeforeNull(str);
		str = clearMidNull(str);
		var len = 0;
		for (var i = 0; i < str.length; i++) {
			var c = str.charCodeAt(i);
			if ((c >= 1 && c <= 126) || (65376 <= c && c <= 65439)) {
				len++
			} else {
				len += 2
			}
		}
		var result = parseInt(len / 2);
		var mod = len % 2;
		if (mod != 0) {
			result += 1
		}
		submitTxtContent = str;
		var haveLength = sumWriteLength - result;
		$("#showLength" + n).html(haveLength);
		if (haveLength < 0) {
			$("#moreLength" + n).html(-haveLength);
			$("#dialog-buttonpane" + kind + " .write-error").show();
			$("#showLength" + n).html(0);
			$("#dialog-buttonpane" + kind + " .write-length").hide()
		} else {
			$("#dialog-buttonpane" + kind + " .write-error").hide();
			$("#dialog-buttonpane" + kind + " .write-length").show()
		}
	}

	function setButtonAbled(n) {
		$("#pub-btn" + n).addClass("new-pub-btn-valid").removeClass("new-pub-btn-unvalid");
		if ($.trim($("#txt-zixun-content").val()) == "") {
			$("#pub-btn0").addClass("new-pub-btn-unvalid").removeClass("new-pub-btn-valid")
		}
		if (kind == 0) {
			$("#add-pub-btn" + n).addClass("pub-btn-valid").removeClass("pub-btn-unvalid")
		}
	}

	function setButtonDisabled(n) {
		$("#pub-btn" + n).addClass("new-pub-btn-unvalid").removeClass("new-pub-btn-valid");
		if ($.trim($("#txt-zixun-content").val()) != "") {
			$("#pub-btn0").addClass("new-pub-btn-valid").removeClass("new-pub-btn-unvalid")
		}
		if (kind == 0) {
			$("#add-pub-btn" + n).addClass("pub-btn-unvalid").removeClass("pub-btn-valid")
		}
	}

	function closeDialog() {
		$("#dialog-btn-close").click(function() {
			$("#digg-dialog-publish").hide();
			$("#mask").hide().remove();
			$("#chatIframe").css({
				height: "475px",
				width: "300px"
			});
			is_pic_clean = true;
			is_link_clean = true;
			ispublishing = false
		})
	}

	function clearAllTextInput() {
		$("#txt-duanzi").val("").attr("disabled", false).css("background-color", "#fff");
		$("#lab-duanzi").show();
		$("#txt-zixun").val("").attr("disabled", false).css({
			"background-color": "#fff",
			color: "#333"
		});
		$("#txt-zixun-content").val("").attr("disabled", true).css("background-color", "#ece9d8");
		$("#txt-zhaiyao").val("").attr("disabled", true).css("background-color", "#ece9d8");
		$("#zixun-button-container").show();
		$("#add-pub-btn0").show().removeClass("pub-btn-valid").addClass("pub-btn-unvalid");
		$("#pub-btn0, #pub-btn1, #pub-btn2, #pub-btn3").show().removeClass("new-pub-btn-valid").addClass("new-pub-btn-unvalid");
		$("#add-pub-loading0").hide();
		$("#txt-zixun").css("width", "420px");
		$("#txt-zixun-area").css("width", "426px");
		$("#lab-zixun").show();
		$("#txt-img").val("").attr("disabled", false).css("background-color", "#fff");
		$("#lab-img").show();
		$("#upload-img-area").show();
		$("#upload-img-area .imgRule").show();
		$("#show-img-area").hide();
		$("#show-img-area #upload-img").attr("src", "");
		$("#repeat-upload-btn").click();
		$("#add-pub-loading2").hide();
		for (var i = 0; i < 4; i++) {
			$("#write-error-box" + i + " .write-error-desc").html("");
			$(".write-length #showLength" + i).html(sumWriteLength)
		}
		$(".write-error").hide();
		$(".write-length").show();
		sumWriteLength = 150;
		sumZixunLength = 512;
		kind = 0;
		submitTxtContent = "";
		obj = "";
		imgurlSelect = "";
		uploadImgSucess = false;
		is_pic_clean = true;
		is_link_clean = true;
		ispublishing = false
	}

	function goHtPage(id, links) {
		L.showTopTips(L.TIPS_TYPE.success, "发布成功");
		$(".dialog").hide();
		$(txtInputNum[kind]).attr("disabled", false).css("background-color", "#fff");
		$(txtInputNum[kind]).val("");
		$("#pub-btn" + kind).show();
		$("#pub-loading" + kind).css("display", "none");
		$("#mask").hide().remove()
	}
	NS_publish_dialog = {
		init: init,
		clearAllTextInput: clearAllTextInput
	}
})(jQuery);
(function($) {
	var G = $.gozap,
		L = G.labi,
		i18n = L.i18n,
		i18nNotice = i18n.notice;
	var ResultCodeSuccess = L.RESULT_CODE.success;
	var submitTxtContentHuifu = "";
	var pageIndex = 0,
		sumWriteLength = 150,
		sumHuifuWriteLength = 150,
		submitTxtContent = "",
		chidStr = "",
		totalChildStr = "",
		digui = 1,
		sortType = "score",
		isHuifu = false,
		tempLabel = "发布新评论";
	sourcePhone = {
		"1": "iPhone",
		"2": "Android",
		"3": "WPhone",
		"5": "iPad"
	};
	var userAgentInfo = navigator.userAgent;
	var cc;

	function init(lei) {
		changeHeight();
		$("body").click(function(event) {
			if ($(event.target).parents(".main-content").length == 0 && !$(event.target).hasClass("main-content") && !$(event.target).hasClass("big-img") && $(event.target).attr("id") != "gotop") {
				$(".comment-box-area").hide()
			}
		});
		$(".discus-a").click(function() {alert("ss");
			cc = $(this);
			var linkId = $(this).attr("lang");
			chouti.hidePlayVido(linkId);
			var $box = $("#comment-box-area-" + linkId);
			if ($box.is(":hidden")) {
				$box.show().find("#loading-comment-top-" + linkId).css({
					display: "inline"
				});
				$("#comment-box-top-" + linkId).hide();
				$("#yaoyan-sel-area-" + linkId).hide();
				$("#huifu-top-box-" + linkId).hide();
				$("#comment-list-top-" + linkId).html("");
				$("#write-error-desc-" + linkId).hide();
				$("#hidden-comt-" + linkId).hide();
				var Larrow = $(this).position().left + 5;
				$("#comt-arrow-" + linkId).css("left", Larrow + "px")
			} else {
				$box.hide();
				return
			}
			showCommentsTop(linkId, "")
		});
		$(".txt-huifu-top").focus(function() {
			$(this).css({
				border: "1px solid #ffc875",
				height: "40px",
				resize: "vertical"
			});
			if ("\v" == "v") {
				if ($(this).val() == "" && !isHuifu) {
					$(this).val(" ").val("")
				}
			}
			var linkId = $(this).attr("lang");
			var $templab = $("#lab-comment-top-" + linkId);
			if ($templab.is(":hidden")) {
				$(this).css("text-indent", "0px")
			}
		}).blur(function() {
			$(this).css({
				border: "1px solid #CCDCEF"
			})
		}).keydown(function(events) {
			var linkId = $(this).attr("lang");
			var parentid = $(this).data("parentid");
			var $templab = $("#lab-comment-top-" + linkId);
			if (events.ctrlKey && events.keyCode == 13) {
				if (parentid == "") {
					publish(linkId, "comment", "")
				} else {
					publish(linkId, "huifu", parentid)
				}
			}
			var cursorP = $(this).cursorPosition();
			if (events.keyCode == 8 && $templab.is(":visible")) {
				if (cursorP < 1) {
					isHuifu = false;
					$templab.hide();
					$(this).css("text-indent", "0px");
					if (userAgentInfo.indexOf("MSIE") > 0) {
						$(this).blur();
						$(this).focus()
					}
					$(this).data("parentid", "");
					$("#pub-btn-top-" + linkId).unbind().bind("click", function() {
						publish(linkId, "comment", "")
					})
				}
			}
		});
		$(".hiddenCom-Btn, .close-comt").click(function() {
			var linkid = $(this).attr("lang");
			$("#comment-box-area-" + linkid).hide()
		});
		$(".yaoyan-sel-area :radio").click(function() {
			var linkid = $(this).attr("lang");
			$("#txt-huifu-top-" + linkid).attr("disabled", false).css("background-color", "#fff").focus()
		})
	}

	function changeHeight() {
		var items = $("#content-list .item");
		for (var i = 0; i < items.length; i++) {
			if ($(items[i]).find(".news-pic").length > 0) {
				var h1 = $(items[i]).find(".part1").outerHeight();
				var h2 = $(items[i]).find(".part2").outerHeight();
				var h3 = $(items[i]).find(".area-summary").outerHeight();
				var hs = h1 + h2 + h3;
				if (hs < 64) {
					$(items[i]).find(".part2").css({
						"padding-top": (64 - hs) + "px"
					})
				}
			}
		}
	}

	function inputState(objs, linkId) {
		var duanzi = $.trim($("#" + objs).val());
		if (duanzi == "") {
			setButtonDisabled(linkId);
			return
		} else {
			setButtonAbled(linkId)
		}
	}

	function checkCharCodeAt(str) {
		str = str.split("");
		var TotalStr = "";
		for (var i = 0; i < str.length; i++) {
			if (str[i].charCodeAt(0) == 32) {
				TotalStr += " "
			} else {
				TotalStr += str[i]
			}
		}
		return TotalStr
	}

	function showCommentsTop(linkId, hui) {
		var sortType = "score";
		var submitUrl = "/comments";
		L.ajax({
			url: submitUrl,
			type: "POST",
			data: G.param({
				linkId: linkId,
				sortType: sortType,
				id: 0
			}),
			success: function(info) {
				if (info.code == ResultCodeSuccess) {
					var dataItems = parseInt(info.data.items);
					var moreItems = parseInt(info.data.remain);
					var noComments = info.data.noComments;
					$("#discus-a-" + linkId).find("b").html(dataItems);
					$("#newestCount-" + linkId).html(dataItems);
					if (dataItems >= 1) {
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
					if (hui == "huifu" && userAgentInfo.indexOf("AppleWebKit") < 0) {
						$("#txt-huifu-top-" + linkId).focus()
					}
					$("#txt-huifu-top-" + linkId).val(" ").val("");
					if (hui == "huifu" && userAgentInfo.indexOf("AppleWebKit") >= 0) {
						$("#txt-huifu-top-" + linkId).focus()
					}
					$("#hidden-comt-" + linkId).show();
					$.inputComment("txt-huifu-top-" + linkId, linkId, inputState);
					oprateDigg();
					chouti.oprateJuBao();
					var $coloseComment = $("#coloseComment" + linkId);
					if (noComments) {
						var colComStr = "<div class='coloseComment' id='coloseComment" + linkId + "'>此评论已关闭</div>";
						if ($coloseComment.length > 0) {
							$coloseComment.show()
						} else {
							$("#huifu-top-box-" + linkId).after(colComStr)
						}
						$("#huifu-top-box-" + linkId).hide()
					} else {
						$("#huifu-top-box-" + linkId).show();
						$coloseComment.hide()
					}
				} else {
					L.showTopTips(L.TIPS_TYPE.error, info.message);
					$("#loading-comment-top-" + linkId).hide();
					return false
				}
			}
		})
	}

	function loadCommentsTop(dataObj, linkId) {
		var str = "";
		var noComments = dataObj.data.noComments;
		var data = dataObj.data.dataList;
		var jid = $("#hidjid").val();
		for (var i = 0; i < data.length; i++) {
			var act = data[i].action;
			totalChildStr = "", chidStr = "", digui = 1;
			str += "<li class='items'>";
			var createT = data[i].commentTime;
			var content = data[i].content;
			var depth = data[i].depth;
			var downs = data[i].downs;
			var ups = data[i].ups;
			var nickImgUrl = data[i].nickImgUrl;
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
			str += "<a href='/user/" + jid + "/submitted/1'><img src='http://dig.chouti.com/" + nickImgUrl + "' /></a>";
			str += "</div>";
			str += "<div class='comment-R comment-R-top'>";
			str += "<div class='pp'>";
			str += "<a class='name' href='/user/" + jid + "/submitted/1'>" + nick + "</a>";
			var author = $("#collect-a-" + linkId).attr("jid");
			if (author == jid) {
				str += "<span class='author'>(楼主)</span>"
			}
			str += "<span class='p3'>";
			if (act != 2) {
				str += content
			} else {
				str += "<em style='font-style:oblique;color:#B4B4B4'>该评论因  ''" + deleteResult + "'' 被删除</em>"
			}
			str += "</span>";
			str += "<span class='into-time into-time-top'>" + createT + "发布</span>";
			if (state == "相信") {
				str += "<span class='yaoyan-state-top'>" + state + "</span>"
			} else {
				if (state != "") {
					str += "<span class='yaoyan-state-top' style='color:#CC3300'>" + state + "</span>"
				}
			} if (sourceType != undefined) {
				switch (sourceType) {
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
				str += "<span class='into-time s-phone'>来自<a class='phone-name' href='" + sourceAppUrl + "' target='_blank'>" + sourcePhone[sourceType] + "</a></span>"
			}
			str += "</div>";
			if (act != 2 && !noComments) {
				str += "<div class='comment-line-top'>";
				str += "<div class='comment-state'>";
				if (isVote == "0") {
					str += "<a class='ding' lang='" + linkId + "' ><b>顶</b><span class='ding-num'>[" + ups + "]</span></a><a class='cai' lang='" + linkId + "' ><b>踩</b><span class='cai-num'>[" + downs + "]</span></a>"
				} else {
					if (isVote == 1) {
						str += "<span class='ding' ><b>已顶</b><span class='ding-num'>[" + ups + "]</span></span><span class='cai' lang='" + linkId + "' ><b>踩</b><span class='cai-num'>[" + downs + "]</span></span>"
					} else {
						str += "<span class='ding' lang='" + linkId + "' ><b>顶</b><span class='ding-num'>[" + ups + "]</span></span><span class='cai' ><b>已踩</b><span class='cai-num'>[" + downs + "]</span></span>"
					}
				} if (destjid != jid) {
					str += "<span class='line-huifu'>|</span>";
					str += "<a class='see-a jubao'  lang='" + id + "'  linkid='" + linkId + "'>举报</a>"
				} else {} if ($(".isCateAdmin").length > 0) {
					str += "<span class='line-huifu'>|</span>";
					str += "<a class='see-a btn-delete-comment' lang='" + id + "'  linkid='" + linkId + "' style='cursor:pointer;'>删除</a>"
				}
				if (depth < 6) {
					if (act != 2) {
						str += "<span class='line-huifu'>|</span>";
						str += "<a class='see-a huifu-a'  id='huifuBtn" + id + "' lang='" + id + "' usernick='" + nick + "'  linkid='" + linkId + "'>回复</a>"
					}
				}
				str += "<input type='hidden' id='hid" + id + "' value='" + id + "' />";
				str += "</div>";
				str += "</div>"
			}
			str += "</div>";
			str += "</span>";
			if (data[i].childs) {
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
			if (userAgentInfo.indexOf("AppleWebKit") > 0) {
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

	function appendNewComment(posit, info, linkId) {
		var str = "";
		var datas = info.data;
		var createT = datas.commentTime;
		var content = datas.content;
		var depth = datas.depth;
		var downs = datas.downs;
		var ups = datas.ups;
		var nickImgUrl = datas.nickImgUrl;
		var nick = datas.nick;
		var isVote = datas.isVote;
		var id = datas.id;
		var assentText = datas.assentText;
		var items = datas.items;
		var jid = datas.jid;
		var sourceType = datas.sourceType;
		var sourceAppUrl = datas.sourceAppUrl;
		str += "<li class='items last'>";
		str += "<span class='folder' style='background: none'>";
		str += "<div class='comment-L comment-L-top'>";
		str += "<a class='icons zhan-ico' href='#'></a>";
		str += "<a href='/user/" + jid + "/submitted/1'><img src='http://dig.chouti.com/" + nickImgUrl + "'></a>";
		str += "</div>";
		str += "<div class='comment-R comment-R-top'>";
		str += "<div class='pp'>";
		str += "<a href='/user/" + jid + "/submitted/1' class='name' target='_blank'>" + nick + "</a>";
		var author = $("#collect-a-" + linkId).attr("jid");
		if (author == jid) {
			str += "<span class='author'>(楼主)</span>"
		}
		str += "<span class='p3'>" + content + "</span>";
		str += "<span class='into-time  into-time-top'>" + createT + "发布</span>";
		if (assentText == "相信") {
			str += "<span class='yaoyan-state-top'>" + assentText + "</span>"
		} else {
			if (assentText != "") {
				str += "<span class='yaoyan-state-top' style='color:#CC3300'>" + assentText + "</span>"
			}
		} if (sourceType != undefined) {
			switch (sourceType) {
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
			str += "<span class='into-time s-phone'>来自<a class='phone-name' href='" + sourceAppUrl + "' target='_blank'>" + sourcePhone[sourceType] + "</a></span>"
		}
		str += "</div>";
		str += "<div class='comment-line-top'>";
		str += "<div class='comment-state'>";
		str += "<span  class='ding'><b>已顶</b><span class='ding-num'>[1]</span></span>";
		str += "<span  lang='" + linkId + "' class='cai'><b>踩</b><span class='cai-num'>[0]</span></span>";
		if ($(".isCateAdmin").length > 0) {
			str += "<span class='line-huifu'>|</span>";
			str += "<a class='see-a btn-delete-comment' lang='" + id + "'  linkid='" + linkId + "' style='cursor:pointer;'>删除</a>"
		}
		str += "<span class='line-huifu'>|</span>";
		str += "<a id='huifuBtn" + id + "'  class='see-a huifu-a' lang='" + id + "' usernick='" + nick + "' linkid='" + linkId + "'>回复</a>";
		str += "<input type='hidden' value='" + id + "' id='hid" + id + "' />";
		str += "</div>";
		str += "</div>";
		str += "</div>";
		str += "</span>";
		str += "</li>";
		if (posit == "last") {
			$("#comment-list-top-" + linkId + " > li.last").removeClass("last");
			$("#comment-list-top-" + linkId).append(str).show()
		} else {
			$("#comment-list-top-" + linkId + " li:first").before(str).show()
		}
		$("#newestCount-" + linkId).html(items);
		$("#discus-a-" + linkId).find("b").html(items);
		$("#txt-huifu-top-" + linkId).focus();
		bindHuifuBtn();
		commentListHover()
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

	function deleteline(linkId) {
		var $list = "#comment-list-top-" + linkId;
		var itemobj = $("#comment-list-top-" + linkId + " li.items");
		for (var i = 0; i < itemobj.length; i++) {
			var sp = $(itemobj[i]).children();
			if (sp.length <= 1) {
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
			if ($(this).hasClass("lastExpandable-hitarea")) {
				$(this).css("background-position", "-80px -13px")
			} else {
				$(this).css("background-position", "-64px -45px")
			}
		});
		$($list + " li.items div.items-hitarea").click(function() {
			$(this).children("ul:first li:first b").focus()
		})
	}

	function diguiComments(childData, linkId, noComments) {
		if (childData == null || childData.length <= 0) {
			return
		}
		for (var i = 0; i < childData.length; i++) {
			var createT = childData[i].commentTime;
			var content = childData[i].content;
			var depth = childData[i].depth;
			var downs = childData[i].downs;
			var ups = childData[i].ups;
			var nickImgUrl = childData[i].nickImgUrl;
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
			chidStr += "<a href='#' class='icons zhan-ico'></a>";
			chidStr += "<a href='/user/" + jid + "/submitted/1'><img src='http://dig.chouti.com/" + nickImgUrl + "' /></a>";
			chidStr += "</div>";
			chidStr += "<div class='comment-R comment-R-top'>";
			chidStr += "<div class='pp'>";
			chidStr += "<a class='name' href='/user/" + jid + "/submitted/1'>" + nick + "</a>";
			var author = $("#collect-a-" + linkId).attr("jid");
			if (author == jid) {
				chidStr += "<span class='author'>(楼主)</span>"
			}
			chidStr += "<span class='p3'>";
			if (act != 2) {
				chidStr += content
			} else {
				chidStr += "<em style='font-style:oblique;color:#B4B4B4'>该评论因  ''" + deleteResult + "'' 被删除</em>"
			}
			chidStr += "</span>";
			chidStr += "<span class='into-time into-time-top'>" + createT + "发布</span>";
			if (sourceType != undefined) {
				switch (sourceType) {
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
			if (act != 2 && !noComments) {
				chidStr += "<div class='comment-line-top'>";
				chidStr += "<div class='comment-state'>";
				if (isVote == "0") {
					chidStr += "<a class='ding' lang='" + linkId + "' ><b>顶</b><span class='ding-num'>[" + ups + "]</span></a><a class='cai' lang='" + linkId + "'  ><b>踩</b><span class='cai-num'>[" + downs + "]</span></a>"
				} else {
					if (isVote == 1) {
						chidStr += "<span class='ding' ><b>已顶</b><span class='ding-num'>[" + ups + "]</span></span><span class='cai' lang='" + linkId + "' ><b>踩</b><span class='cai-num'>[" + downs + "]</span></span>"
					} else {
						chidStr += "<span class='ding' lang='" + linkId + "' ><b>顶</b><span class='ding-num'>[" + ups + "]</span></span><span class='cai' ><b>已踩</b><span class='cai-num'>[" + downs + "]</span></span>"
					}
				} if (destjid != jid) {
					chidStr += "<span class='line-huifu'>|</span>";
					chidStr += "<a class='see-a jubao'  lang='" + id + "'  linkid='" + linkId + "'>举报</a>"
				}
				if ($(".isCateAdmin").length > 0) {
					chidStr += "<span class='line-huifu'>|</span>";
					chidStr += "<a class='see-a btn-delete-comment' lang='" + id + "'  linkid='" + linkId + "' style='cursor:pointer;'>删除</a>"
				}
				if (depth < 6) {
					if (act != 2) {
						chidStr += "<span class='line-huifu'>|</span>";
						chidStr += "<a class='see-a huifu-a'  id='huifuBtn" + id + "'  lang='" + id + "' usernick='" + nick + "' linkid='" + linkId + "'>回复</a>"
					}
				}
				chidStr += "<input type='hidden' id='hid" + id + "' value='" + id + "' />";
				chidStr += "</div>";
				chidStr += "</div>"
			}
			chidStr += "</div>";
			chidStr += "</span>";
			if (childData[i].childs) {
				digui++;
				diguiComments(childData[i].childs, linkId, noComments)
			}
			chidStr += "</li></ul>";
			totalChildStr += chidStr;
			chidStr = "";
			digui = 1
		}
	}

	function clearBeforeNull(value) {
		var tt1 = /^(\s+)|(\s+)$/;
		var str = value;
		str = str.replace(tt1, "");
		str = str.replace(tt1, "");
		return str
	}

	function clearMidNull(value) {
		var tt2 = /\s+/g;
		var str = value.replace(tt2, " ");
		return str
	}

	function publish(linkId, kind, parentId) {
		var $temptxt = $("#txt-huifu-top-" + linkId);
		var txtContent = $.trim($temptxt.val());
		if (txtContent == "") {
			return
		}
		txtContent = clearBeforeNull(txtContent);
		txtContent = clearMidNull(txtContent);
		txtContent = checkCharCodeAt(txtContent);
		var $temppub_btn = $("#pub-btn-top-" + linkId);
		$temppub_btn.hide();
		var $temploading_btn = $("#pub-loading-top-" + linkId);
		$temploading_btn.css("display", "inline-block");
		var $temp_error_box = $("#write-error-desc-" + linkId);
		$temp_error_box.hide();
		var content = txtContent;
		var subjectId = $("#hidsubjectid-" + linkId).val();
		var jid = $("#hidjid").val();
		var sortType = "score";
		if ($("#yaoyan-sel-area-" + linkId + " :radio").length >= 1) {
			var isAssent = $("#yaoyan-sel-area-" + linkId + " :radio:checked").val()
		}
		if (subjectId != "3") {
			var isAssent = ""
		}
		var submitUrl = "/comments/create";
		if (kind == "huifu") {
			var para = G.param({
				jid: jid,
				linkId: linkId,
				content: content,
				parentId: parentId
			})
		} else {
			if (isAssent == undefined && subjectId == 3) {
				$temp_error_box.html("对于谣言，要先表明立场，才能评论哦").show();
				$temppub_btn.show();
				$temploading_btn.css("display", "none");
				setButtonAbled(linkId);
				return
			}
			var para = G.param({
				jid: jid,
				linkId: linkId,
				isAssent: isAssent,
				content: content,
				sortType: sortType
			})
		}
		var options = {
			url: submitUrl,
			type: "POST",
			data: para,
			success: function(info) {
				if (info.code == ResultCodeSuccess) {
					$temptxt.val("");
					$temppub_btn.show();
					$temploading_btn.css("display", "none");
					L.showTopTips(L.TIPS_TYPE.success, info.message);
					if (kind == "huifu") {
						showCommentsTop(linkId, "huifu")
					} else {
						appendNewComment("last", info, linkId)
					}
					setButtonDisabled(linkId);
					$("#lab-comment-top-" + linkId).hide()
				} else {
					if (info.code == "21106") {
						var isMobile = function(data) {
							var flag = 1;
							for (var i in data) {
								var exp = /^1[3458]\d{9}$/;
								if (!exp.exec(data[i])) {
									flag = 0;
									break
								}
							}
							return flag ? true : false
						};
						var showError = function(height, text) {
							removeError();
							var html = '<div class="error" style="position:absolute;top:' + height + 'px;left:350px;font-size:12px;border:1px #ff8996 solid;padding:8px;border-radius:5px;width:164px;"><div style="position:absolute;background:url(/images/bb-arrow.png) left center;top:5px;left:-12px;width:20px;height:20px;"></div><div class="error-info">' + text + "</div></div>";
							mb.find(".bind-box").append(html)
						};
						var removeError = function() {
							mb.find(".error").remove()
						};
						var showOK = function() {
							removeError();
							var html = '<div class="ok" style="position:absolute;top:85px;left:350px;font-size:12px;padding:8px;width:164px;"><div style="position:absolute;background:url(/images/common_total_92_552.png) -33px -290px no-repeat;top:0px;left:0;width:20px;height:17px;"></div></div>';
							mb.find(".bind-box").append(html)
						};
						var removeOK = function() {
							mb.find(".ok").remove()
						};
						var counter = function() {
							var $this = mb.find('input[name="msgcode"]');
							var $b = mb.find(".btn-getMsgcode");
							$b.addClass("unable illegal");
							var c = 60000;
							var i = setInterval(function() {
								if (c > 0) {
									$b.html(c / 1000 + "秒后重新发送");
									c -= 1000
								} else {
									$b.html("获取短信验证码").removeClass("unable illegal");
									clearInterval(i)
								}
							}, 1000)
						};
						var html = '<style>.illegal{background-color:#dfdfdf !important;} .bind-box input{padding:0 5px;height:30px;width:186px;line-height:30px;font-size:12px;} .input-error{border:1px solid #ff8996;}</style><div class="mb" style="background:url(/images/op.png);position:fixed;top:0;left:0;width:100%;height:100%;text-align:center;z-index:2;"><div class="bind-box" style="padding:30px 230px 70px 30px;margin-top:100px;background-color:white;text-align:left;display:inline-block;position:relative;width:300px;"><div class="btn-close" style="cursor:pointer;position:absolute;right:10px;top:10px;width:20px;height:20px;background: url(/images/close.png)"></div><div style="color:#4d4b47;font-size:14px;">评论/回复前，需要先绑定手机号</div><div style="margin-top:32px;font-size:12px;"><span style="display:inline-block;width:100px;">手机号</span><span style="display:inline-block;width:200px;"><input name="phone" type="text" style="" /></span></div><div style="margin-top:3px;font-size:12px;"><span style="display:inline-block;width:100px;position:relative;top:8px;"><img src="http://dig.chouti.com/gozapIdentifyCode" /><div class="changeCode" style="position:absolute;left:0px;bottom:-15px;font-size:12px;color:#99c;cursor:pointer;">换一张</div></span><span style="display:inline-block;width:200px;"><input name="code" type="text" /></span></div><div style="margin-top:10px;"><div class="btn-getMsgcode illegal" style="cursor:pointer;display:inline-block;padding:10px 0;background-color:#5991d7;color:white;font-size:14px;margin-left:100px;width:200px;text-align:center;">获取短信验证码</div></div><div style="margin-top:10px;font-size:12px;"><span style="display:inline-block;width:100px;">验证码</span><span style="display:inline-block;width:200px;"><input name="msgcode" type="text" /></span></div><div style="margin-top:32px;"><div class="btn-bind illegal" style="cursor:pointer;display:inline-block;padding:10px 0px;background-color:#5991d7;color:white;font-size:14px;margin-left:100px;width:200px;text-align:center;">绑定手机</div></div></div></div>';
						$("body").append(html);
						var mb = $(".mb");
						mb.find(".btn-close").click(function() {
							mb.remove();
							$temppub_btn.show();
							$temploading_btn.css("display", "none");
							setButtonAbled(linkId)
						});
						mb.find(".changeCode").click(function() {
							$(this).prev().attr("src", "/gozapIdentifyCode?" + Math.random())
						});
						mb.find('input[name="phone"]').blur(function() {
							var $this = $(this);
							var v = $this.val();
							if (v) {
								$.ajax({
									url: "/passport/checkPhoneAbled",
									data: {
										phone: v
									},
									dataType: "json",
									success: function(info) {
										if (info.result.code != "9999") {
											showError(80, info.result.message);
											removeOK();
											mb.find(".btn-getMsgcode").addClass("illegal")
										} else {
											if (!mb.find(".btn-getMsgcode").hasClass("unable")) {
												mb.find(".btn-getMsgcode").removeClass("illegal");
												removeError()
											}
											showOK()
										}
									}
								})
							} else {
								showError(80, "请输入手机号")
							}
						});
						mb.find('input[name="msgcode"]').keydown(function(e) {
							if (e.which == "13") {
								mb.find(".btn-bind").trigger("click")
							} else {
								var $this = $(this);
								var v = $this.val();
								if (v) {
									mb.find(".btn-bind").removeClass("illegal")
								} else {
									mb.find(".btn-bind").addClass("illegal")
								}
							}
						});
						mb.find('input[name="code"]').keydown(function(e) {
							if (e.which == "13") {
								mb.find(".btn-getMsgcode").trigger("click")
							}
						});
						mb.find(".btn-getMsgcode").click(function() {
							if (!mb.find('input[name="phone"]').val()) {
								showError(80, "请输入手机号")
							}
							if (!$(this).hasClass("illegal")) {
								$.ajax({
									url: "/profile/sendcode",
									data: {
										phone: mb.find('input[name="phone"]').val(),
										code: MD5(mb.find('input[name="code"]').val())
									},
									dataType: "json",
									success: function(info) {
										if (info.result.code != "9999") {
											showError(125, info.result.message)
										} else {
											counter();
											showError(125, "发送成功！")
										}
									}
								})
							}
						});
						mb.find(".btn-bind").click(function() {
							if (!$(this).hasClass("illegal")) {
								$.ajax({
									url: "/profile/bind",
									data: {
										phone: mb.find('input[name="phone"]').val(),
										code: mb.find('input[name="msgcode"]').val()
									},
									dataType: "json",
									success: function(info) {
										if (info.result.code != "9999") {
											showError(215, info.result.message)
										} else {
											mb.remove();
											L.ajax({
												url: submitUrl,
												type: "POST",
												data: para,
												success: function(info) {
													if (info.code == ResultCodeSuccess) {
														$temptxt.val("");
														$temppub_btn.show();
														$temploading_btn.css("display", "none");
														L.showTopTips(L.TIPS_TYPE.success, info.message);
														if (kind == "huifu") {
															showCommentsTop(linkId, "huifu")
														} else {
															appendNewComment("last", info, linkId)
														}
														setButtonDisabled(linkId);
														$("#lab-comment-top-" + linkId).hide()
													}
												}
											})
										}
									}
								})
							}
						})
					} else {
						if (!chouti.reponseNoLogin(info.code, info.message, "发表评论成功")) {
							$temppub_btn.show();
							$temploading_btn.css("display", "none");
							return false
						}
						$temp_error_box.html(info.message).show();
						$temppub_btn.show();
						$temploading_btn.css("display", "none");
						setButtonAbled(linkId);
						return false
					}
				}
			}
		};
		$("#isAjax").data("ajax", options);
		$("#isComment").data("isComment", linkId);
		L.ajax(options)
	}

	function oprateDigg() {
		$("a.ding, a.cai").click(function() {
			var $this = $(this);
			$this.removeClass("hover");
			if ($this.attr("class") == "ding") {
				var vote = 1
			} else {
				var vote = -1
			}
			var linkId = $this.attr("lang");
			var jid = $("#hidjid").val();
			var id = $this.siblings("input:hidden").val();
			var submitUrl = "/comments/vote";
			var options = {
				url: submitUrl,
				type: "POST",
				data: G.param({
					linkId: linkId,
					id: id,
					jid: jid,
					vote: vote
				}),
				success: function(info) {
					if (info.code == ResultCodeSuccess) {
						if (vote == 1) {
							$($this).find(".ding-num").html("[" + info.data + "]");
							$($this).css({
								cursor: "default",
								color: "#B4B4B4",
								"text-decoration": "none"
							}).unbind().siblings(".cai").unbind();
							$($this).find("b").html("已顶");
							$($this).hover(function() {
								$(this).css("text-decoration", "none")
							});
							$($this).siblings(".cai").css({
								cursor: "default",
								color: "#B4B4B4"
							}).hover(function() {
								$(this).css("text-decoration", "none")
							})
						} else {
							$($this).find(".cai-num").html("[" + info.data + "]");
							$($this).css({
								cursor: "default",
								color: "#B4B4B4",
								"text-decoration": "none"
							}).unbind().siblings(".ding").unbind();
							$($this).find("b").html("已踩");
							$($this).hover(function() {
								$(this).css("text-decoration", "none")
							});
							$($this).siblings(".ding").css({
								cursor: "default",
								color: "#B4B4B4"
							}).hover(function() {
								$(this).css("text-decoration", "none")
							})
						}
						chouti.executeBeforOprate(true)
					} else {
						if (!chouti.reponseNoLogin(info.code, info.message, "投票成功")) {
							return false
						}
						L.showTopTips(L.TIPS_TYPE.error, info.message);
						return
					}
				}
			};
			$("#isAjax").data("ajax", options);
			L.ajax(options)
		})
	}
	$.extend({
		inputComment: function(objs, linkId, fun) {
			var element = document.getElementById(objs);
			if (element) {
				if ("\v" == "v") {
					element.onpropertychange = function() {
						inputState(objs, linkId)
					}
				} else {
					element.addEventListener("input", function() {
						inputState(objs, linkId)
					}, false)
				}
			}
		}
	});

	function setButtonDisabled(n) {
		$("#pub-btn-top-" + n).addClass("add-pub-btn-unvalid").removeClass("add-pub-btn-valid")
	}

	function setButtonAbled(n) {
		$("#pub-btn-top-" + n).addClass("add-pub-btn-valid").removeClass("add-pub-btn-unvalid")
	}
	NS_links_comment_top = {
		init: init
	}
})(jQuery);
(function($) {
	$.extend($.fn, {
		swapClass: function(c1, c2) {
			var c1Elements = this.filter("." + c1);
			this.filter("." + c2).removeClass(c2).addClass(c1);
			c1Elements.removeClass(c1).addClass(c2);
			return this
		},
		replaceClass: function(c1, c2) {
			return this.filter("." + c1).removeClass(c1).addClass(c2).end()
		},
		hoverClass: function(className) {
			className = className || "hover";
			return this.hover(function() {
				$(this).addClass(className)
			}, function() {
				$(this).removeClass(className)
			})
		},
		heightToggle: function(animated, callback) {
			animated ? this.animate({
				height: "toggle"
			}, animated, callback) : this.each(function() {
				jQuery(this)[jQuery(this).is(":hidden") ? "show" : "hide"]();
				if (callback) {
					callback.apply(this, arguments)
				}
			})
		},
		heightHide: function(animated, callback) {
			if (animated) {
				this.animate({
					height: "hide"
				}, animated, callback)
			} else {
				this.hide();
				if (callback) {
					this.each(callback)
				}
			}
		},
		prepareBranches: function(settings) {
			if (!settings.prerendered) {
				this.filter(":last-child:not(ul)").addClass(CLASSES.last);
				this.filter((settings.collapsed ? "" : "." + CLASSES.closed) + ":not(." + CLASSES.open + ")").find(">ul").hide()
			}
			return this.filter(":has(>ul)")
		},
		applyClasses: function(settings, toggler) {
			this.filter(":has(>ul):not(:has(>a))").find(">span").unbind("click.treeview").bind("click.treeview", function(event) {
				if (this == event.target) {
					toggler.apply($(this).next())
				}
			}).add($("a", this)).hoverClass();
			if (!settings.prerendered) {
				this.filter(":has(>ul:hidden)").addClass(CLASSES.expandable).replaceClass(CLASSES.last, CLASSES.lastExpandable);
				this.not(":has(>ul:hidden)").addClass(CLASSES.collapsable).replaceClass(CLASSES.last, CLASSES.lastCollapsable);
				var hitarea = this.find("div." + CLASSES.hitarea);
				if (!hitarea.length) {
					hitarea = this.prepend('<div class="' + CLASSES.hitarea + '"/>').find("div." + CLASSES.hitarea)
				}
				hitarea.removeClass().addClass(CLASSES.hitarea).each(function() {
					var classes = "";
					$.each($(this).parent().attr("class").split(" "), function() {
						classes += this + "-hitarea "
					});
					$(this).addClass(classes)
				})
			}
			this.find("div." + CLASSES.hitarea).click(toggler)
		},
		treeview: function(settings) {
			settings = $.extend({
				cookieId: "treeview"
			}, settings);
			if (settings.toggle) {
				var callback = settings.toggle;
				settings.toggle = function() {
					return callback.apply($(this).parent()[0], arguments)
				}
			}

			function treeController(tree, control) {
				function handler(filter) {
					return function() {
						toggler.apply($("div." + CLASSES.hitarea, tree).filter(function() {
							return filter ? $(this).parent("." + filter).length : true
						}));
						return false
					}
				}
				$("a:eq(0)", control).click(handler(CLASSES.collapsable));
				$("a:eq(1)", control).click(handler(CLASSES.expandable));
				$("a:eq(2)", control).click(handler())
			}

			function toggler() {
				$(this).parent().find(">.hitarea").swapClass(CLASSES.collapsableHitarea, CLASSES.expandableHitarea).swapClass(CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea).end().swapClass(CLASSES.collapsable, CLASSES.expandable).swapClass(CLASSES.lastCollapsable, CLASSES.lastExpandable).find(">ul").heightToggle(settings.animated, settings.toggle);
				if (settings.unique) {
					$(this).parent().siblings().find(">.hitarea").replaceClass(CLASSES.collapsableHitarea, CLASSES.expandableHitarea).replaceClass(CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea).end().replaceClass(CLASSES.collapsable, CLASSES.expandable).replaceClass(CLASSES.lastCollapsable, CLASSES.lastExpandable).find(">ul").heightHide(settings.animated, settings.toggle)
				}
			}
			this.data("toggler", toggler);

			function serialize() {
				function binary(arg) {
					return arg ? 1 : 0
				}
				var data = [];
				branches.each(function(i, e) {
					data[i] = $(e).is(":has(>ul:visible)") ? 1 : 0
				});
				$.cookie(settings.cookieId, data.join(""), settings.cookieOptions)
			}

			function deserialize() {
				var stored = $.cookie(settings.cookieId);
				if (stored) {
					var data = stored.split("");
					branches.each(function(i, e) {
						$(e).find(">ul")[parseInt(data[i]) ? "show" : "hide"]()
					})
				}
			}
			this.addClass("treeview");
			var branches = this.find("li").prepareBranches(settings);
			switch (settings.persist) {
				case "cookie":
					var toggleCallback = settings.toggle;
					settings.toggle = function() {
						serialize();
						if (toggleCallback) {
							toggleCallback.apply(this, arguments)
						}
					};
					deserialize();
					break;
				case "location":
					var current = this.find("a").filter(function() {
						return this.href.toLowerCase() == location.href.toLowerCase()
					});
					if (current.length) {
						var items = current.addClass("selected").parents("ul, li").add(current.next()).show();
						if (settings.prerendered) {
							items.filter("li").swapClass(CLASSES.collapsable, CLASSES.expandable).swapClass(CLASSES.lastCollapsable, CLASSES.lastExpandable).find(">.hitarea").swapClass(CLASSES.collapsableHitarea, CLASSES.expandableHitarea).swapClass(CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea)
						}
					}
					break
			}
			branches.applyClasses(settings, toggler);
			if (settings.control) {
				treeController(this, settings.control);
				$(settings.control).show()
			}
			return this
		}
	});
	$.treeview = {};
	var CLASSES = ($.treeview.classes = {
		open: "open",
		closed: "closed",
		expandable: "expandable",
		expandableHitarea: "expandable-hitarea",
		lastExpandableHitarea: "lastExpandable-hitarea",
		collapsable: "collapsable",
		collapsableHitarea: "collapsable-hitarea",
		lastCollapsableHitarea: "lastCollapsable-hitarea",
		lastCollapsable: "lastCollapsable",
		lastExpandable: "lastExpandable",
		last: "last",
		hitarea: "hitarea"
	})
})(jQuery);
$.fn.extend({
	cursorPosition: function(value) {
		var elem = this[0];
		if (elem && (elem.tagName == "TEXTAREA" || elem.type.toLowerCase() == "text")) {
			if ($.browser.msie) {
				var rng;
				if (elem.tagName == "TEXTAREA") {
					rng = event.srcElement.createTextRange()
				} else {
					rng = document.selection.createRange()
				} if (value === undefined) {
					rng.moveStart("character", -event.srcElement.value.length);
					return rng.text.length
				} else {
					if (typeof value === "number") {
						var index = this.position();
						index > value ? (rng.moveEnd("character", value - index)) : (rng.moveStart("character", value - index));
						rng.select()
					}
				}
			} else {
				if (value === undefined) {
					return elem.selectionStart
				} else {
					if (typeof value === "number") {
						elem.selectionEnd = value;
						elem.selectionStart = value
					}
				}
			}
		} else {
			if (value === undefined) {
				return undefined
			}
		}
	}
});
var Handlebars = {};
Handlebars.VERSION = "1.0.beta.6";
Handlebars.helpers = {};
Handlebars.partials = {};
Handlebars.registerHelper = function(name, fn, inverse) {
	if (inverse) {
		fn.not = inverse
	}
	this.helpers[name] = fn
};
Handlebars.registerPartial = function(name, str) {
	this.partials[name] = str
};
Handlebars.registerHelper("helperMissing", function(arg) {
	if (arguments.length === 2) {
		return undefined
	} else {
		throw new Error("Could not find property '" + arg + "'")
	}
});
var toString = Object.prototype.toString,
	functionType = "[object Function]";
Handlebars.registerHelper("blockHelperMissing", function(context, options) {
	var inverse = options.inverse || function() {},
		fn = options.fn;
	var ret = "";
	var type = toString.call(context);
	if (type === functionType) {
		context = context.call(this)
	}
	if (context === true) {
		return fn(this)
	} else {
		if (context === false || context == null) {
			return inverse(this)
		} else {
			if (type === "[object Array]") {
				if (context.length > 0) {
					for (var i = 0, j = context.length; i < j; i++) {
						ret = ret + fn(context[i])
					}
				} else {
					ret = inverse(this)
				}
				return ret
			} else {
				return fn(context)
			}
		}
	}
});
Handlebars.registerHelper("each", function(context, options) {
	var fn = options.fn,
		inverse = options.inverse;
	var ret = "";
	if (context && context.length > 0) {
		for (var i = 0, j = context.length; i < j; i++) {
			ret = ret + fn(context[i])
		}
	} else {
		ret = inverse(this)
	}
	return ret
});
Handlebars.registerHelper("if", function(context, options) {
	var type = toString.call(context);
	if (type === functionType) {
		context = context.call(this)
	}
	if (!context || Handlebars.Utils.isEmpty(context)) {
		return options.inverse(this)
	} else {
		return options.fn(this)
	}
});
Handlebars.registerHelper("unless", function(context, options) {
	var fn = options.fn,
		inverse = options.inverse;
	options.fn = inverse;
	options.inverse = fn;
	return Handlebars.helpers["if"].call(this, context, options)
});
Handlebars.registerHelper("with", function(context, options) {
	return options.fn(context)
});
Handlebars.registerHelper("log", function(context) {
	Handlebars.log(context)
});
var handlebars = (function() {
	var parser = {
		trace: function trace() {},
		yy: {},
		symbols_: {
			error: 2,
			root: 3,
			program: 4,
			EOF: 5,
			statements: 6,
			simpleInverse: 7,
			statement: 8,
			openInverse: 9,
			closeBlock: 10,
			openBlock: 11,
			mustache: 12,
			partial: 13,
			CONTENT: 14,
			COMMENT: 15,
			OPEN_BLOCK: 16,
			inMustache: 17,
			CLOSE: 18,
			OPEN_INVERSE: 19,
			OPEN_ENDBLOCK: 20,
			path: 21,
			OPEN: 22,
			OPEN_UNESCAPED: 23,
			OPEN_PARTIAL: 24,
			params: 25,
			hash: 26,
			param: 27,
			STRING: 28,
			INTEGER: 29,
			BOOLEAN: 30,
			hashSegments: 31,
			hashSegment: 32,
			ID: 33,
			EQUALS: 34,
			pathSegments: 35,
			SEP: 36,
			"$accept": 0,
			"$end": 1
		},
		terminals_: {
			2: "error",
			5: "EOF",
			14: "CONTENT",
			15: "COMMENT",
			16: "OPEN_BLOCK",
			18: "CLOSE",
			19: "OPEN_INVERSE",
			20: "OPEN_ENDBLOCK",
			22: "OPEN",
			23: "OPEN_UNESCAPED",
			24: "OPEN_PARTIAL",
			28: "STRING",
			29: "INTEGER",
			30: "BOOLEAN",
			33: "ID",
			34: "EQUALS",
			36: "SEP"
		},
		productions_: [0, [3, 2],
			[4, 3],
			[4, 1],
			[4, 0],
			[6, 1],
			[6, 2],
			[8, 3],
			[8, 3],
			[8, 1],
			[8, 1],
			[8, 1],
			[8, 1],
			[11, 3],
			[9, 3],
			[10, 3],
			[12, 3],
			[12, 3],
			[13, 3],
			[13, 4],
			[7, 2],
			[17, 3],
			[17, 2],
			[17, 2],
			[17, 1],
			[25, 2],
			[25, 1],
			[27, 1],
			[27, 1],
			[27, 1],
			[27, 1],
			[26, 1],
			[31, 2],
			[31, 1],
			[32, 3],
			[32, 3],
			[32, 3],
			[32, 3],
			[21, 1],
			[35, 3],
			[35, 1]
		],
		performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
			var $0 = $$.length - 1;
			switch (yystate) {
				case 1:
					return $$[$0 - 1];
					break;
				case 2:
					this.$ = new yy.ProgramNode($$[$0 - 2], $$[$0]);
					break;
				case 3:
					this.$ = new yy.ProgramNode($$[$0]);
					break;
				case 4:
					this.$ = new yy.ProgramNode([]);
					break;
				case 5:
					this.$ = [$$[$0]];
					break;
				case 6:
					$$[$0 - 1].push($$[$0]);
					this.$ = $$[$0 - 1];
					break;
				case 7:
					this.$ = new yy.InverseNode($$[$0 - 2], $$[$0 - 1], $$[$0]);
					break;
				case 8:
					this.$ = new yy.BlockNode($$[$0 - 2], $$[$0 - 1], $$[$0]);
					break;
				case 9:
					this.$ = $$[$0];
					break;
				case 10:
					this.$ = $$[$0];
					break;
				case 11:
					this.$ = new yy.ContentNode($$[$0]);
					break;
				case 12:
					this.$ = new yy.CommentNode($$[$0]);
					break;
				case 13:
					this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1]);
					break;
				case 14:
					this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1]);
					break;
				case 15:
					this.$ = $$[$0 - 1];
					break;
				case 16:
					this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1]);
					break;
				case 17:
					this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1], true);
					break;
				case 18:
					this.$ = new yy.PartialNode($$[$0 - 1]);
					break;
				case 19:
					this.$ = new yy.PartialNode($$[$0 - 2], $$[$0 - 1]);
					break;
				case 20:
					break;
				case 21:
					this.$ = [
						[$$[$0 - 2]].concat($$[$0 - 1]), $$[$0]
					];
					break;
				case 22:
					this.$ = [
						[$$[$0 - 1]].concat($$[$0]), null
					];
					break;
				case 23:
					this.$ = [
						[$$[$0 - 1]], $$[$0]
					];
					break;
				case 24:
					this.$ = [
						[$$[$0]], null
					];
					break;
				case 25:
					$$[$0 - 1].push($$[$0]);
					this.$ = $$[$0 - 1];
					break;
				case 26:
					this.$ = [$$[$0]];
					break;
				case 27:
					this.$ = $$[$0];
					break;
				case 28:
					this.$ = new yy.StringNode($$[$0]);
					break;
				case 29:
					this.$ = new yy.IntegerNode($$[$0]);
					break;
				case 30:
					this.$ = new yy.BooleanNode($$[$0]);
					break;
				case 31:
					this.$ = new yy.HashNode($$[$0]);
					break;
				case 32:
					$$[$0 - 1].push($$[$0]);
					this.$ = $$[$0 - 1];
					break;
				case 33:
					this.$ = [$$[$0]];
					break;
				case 34:
					this.$ = [$$[$0 - 2], $$[$0]];
					break;
				case 35:
					this.$ = [$$[$0 - 2], new yy.StringNode($$[$0])];
					break;
				case 36:
					this.$ = [$$[$0 - 2], new yy.IntegerNode($$[$0])];
					break;
				case 37:
					this.$ = [$$[$0 - 2], new yy.BooleanNode($$[$0])];
					break;
				case 38:
					this.$ = new yy.IdNode($$[$0]);
					break;
				case 39:
					$$[$0 - 2].push($$[$0]);
					this.$ = $$[$0 - 2];
					break;
				case 40:
					this.$ = [$$[$0]];
					break
			}
		},
		table: [{
			3: 1,
			4: 2,
			5: [2, 4],
			6: 3,
			8: 4,
			9: 5,
			11: 6,
			12: 7,
			13: 8,
			14: [1, 9],
			15: [1, 10],
			16: [1, 12],
			19: [1, 11],
			22: [1, 13],
			23: [1, 14],
			24: [1, 15]
		}, {
			1: [3]
		}, {
			5: [1, 16]
		}, {
			5: [2, 3],
			7: 17,
			8: 18,
			9: 5,
			11: 6,
			12: 7,
			13: 8,
			14: [1, 9],
			15: [1, 10],
			16: [1, 12],
			19: [1, 19],
			20: [2, 3],
			22: [1, 13],
			23: [1, 14],
			24: [1, 15]
		}, {
			5: [2, 5],
			14: [2, 5],
			15: [2, 5],
			16: [2, 5],
			19: [2, 5],
			20: [2, 5],
			22: [2, 5],
			23: [2, 5],
			24: [2, 5]
		}, {
			4: 20,
			6: 3,
			8: 4,
			9: 5,
			11: 6,
			12: 7,
			13: 8,
			14: [1, 9],
			15: [1, 10],
			16: [1, 12],
			19: [1, 11],
			20: [2, 4],
			22: [1, 13],
			23: [1, 14],
			24: [1, 15]
		}, {
			4: 21,
			6: 3,
			8: 4,
			9: 5,
			11: 6,
			12: 7,
			13: 8,
			14: [1, 9],
			15: [1, 10],
			16: [1, 12],
			19: [1, 11],
			20: [2, 4],
			22: [1, 13],
			23: [1, 14],
			24: [1, 15]
		}, {
			5: [2, 9],
			14: [2, 9],
			15: [2, 9],
			16: [2, 9],
			19: [2, 9],
			20: [2, 9],
			22: [2, 9],
			23: [2, 9],
			24: [2, 9]
		}, {
			5: [2, 10],
			14: [2, 10],
			15: [2, 10],
			16: [2, 10],
			19: [2, 10],
			20: [2, 10],
			22: [2, 10],
			23: [2, 10],
			24: [2, 10]
		}, {
			5: [2, 11],
			14: [2, 11],
			15: [2, 11],
			16: [2, 11],
			19: [2, 11],
			20: [2, 11],
			22: [2, 11],
			23: [2, 11],
			24: [2, 11]
		}, {
			5: [2, 12],
			14: [2, 12],
			15: [2, 12],
			16: [2, 12],
			19: [2, 12],
			20: [2, 12],
			22: [2, 12],
			23: [2, 12],
			24: [2, 12]
		}, {
			17: 22,
			21: 23,
			33: [1, 25],
			35: 24
		}, {
			17: 26,
			21: 23,
			33: [1, 25],
			35: 24
		}, {
			17: 27,
			21: 23,
			33: [1, 25],
			35: 24
		}, {
			17: 28,
			21: 23,
			33: [1, 25],
			35: 24
		}, {
			21: 29,
			33: [1, 25],
			35: 24
		}, {
			1: [2, 1]
		}, {
			6: 30,
			8: 4,
			9: 5,
			11: 6,
			12: 7,
			13: 8,
			14: [1, 9],
			15: [1, 10],
			16: [1, 12],
			19: [1, 11],
			22: [1, 13],
			23: [1, 14],
			24: [1, 15]
		}, {
			5: [2, 6],
			14: [2, 6],
			15: [2, 6],
			16: [2, 6],
			19: [2, 6],
			20: [2, 6],
			22: [2, 6],
			23: [2, 6],
			24: [2, 6]
		}, {
			17: 22,
			18: [1, 31],
			21: 23,
			33: [1, 25],
			35: 24
		}, {
			10: 32,
			20: [1, 33]
		}, {
			10: 34,
			20: [1, 33]
		}, {
			18: [1, 35]
		}, {
			18: [2, 24],
			21: 40,
			25: 36,
			26: 37,
			27: 38,
			28: [1, 41],
			29: [1, 42],
			30: [1, 43],
			31: 39,
			32: 44,
			33: [1, 45],
			35: 24
		}, {
			18: [2, 38],
			28: [2, 38],
			29: [2, 38],
			30: [2, 38],
			33: [2, 38],
			36: [1, 46]
		}, {
			18: [2, 40],
			28: [2, 40],
			29: [2, 40],
			30: [2, 40],
			33: [2, 40],
			36: [2, 40]
		}, {
			18: [1, 47]
		}, {
			18: [1, 48]
		}, {
			18: [1, 49]
		}, {
			18: [1, 50],
			21: 51,
			33: [1, 25],
			35: 24
		}, {
			5: [2, 2],
			8: 18,
			9: 5,
			11: 6,
			12: 7,
			13: 8,
			14: [1, 9],
			15: [1, 10],
			16: [1, 12],
			19: [1, 11],
			20: [2, 2],
			22: [1, 13],
			23: [1, 14],
			24: [1, 15]
		}, {
			14: [2, 20],
			15: [2, 20],
			16: [2, 20],
			19: [2, 20],
			22: [2, 20],
			23: [2, 20],
			24: [2, 20]
		}, {
			5: [2, 7],
			14: [2, 7],
			15: [2, 7],
			16: [2, 7],
			19: [2, 7],
			20: [2, 7],
			22: [2, 7],
			23: [2, 7],
			24: [2, 7]
		}, {
			21: 52,
			33: [1, 25],
			35: 24
		}, {
			5: [2, 8],
			14: [2, 8],
			15: [2, 8],
			16: [2, 8],
			19: [2, 8],
			20: [2, 8],
			22: [2, 8],
			23: [2, 8],
			24: [2, 8]
		}, {
			14: [2, 14],
			15: [2, 14],
			16: [2, 14],
			19: [2, 14],
			20: [2, 14],
			22: [2, 14],
			23: [2, 14],
			24: [2, 14]
		}, {
			18: [2, 22],
			21: 40,
			26: 53,
			27: 54,
			28: [1, 41],
			29: [1, 42],
			30: [1, 43],
			31: 39,
			32: 44,
			33: [1, 45],
			35: 24
		}, {
			18: [2, 23]
		}, {
			18: [2, 26],
			28: [2, 26],
			29: [2, 26],
			30: [2, 26],
			33: [2, 26]
		}, {
			18: [2, 31],
			32: 55,
			33: [1, 56]
		}, {
			18: [2, 27],
			28: [2, 27],
			29: [2, 27],
			30: [2, 27],
			33: [2, 27]
		}, {
			18: [2, 28],
			28: [2, 28],
			29: [2, 28],
			30: [2, 28],
			33: [2, 28]
		}, {
			18: [2, 29],
			28: [2, 29],
			29: [2, 29],
			30: [2, 29],
			33: [2, 29]
		}, {
			18: [2, 30],
			28: [2, 30],
			29: [2, 30],
			30: [2, 30],
			33: [2, 30]
		}, {
			18: [2, 33],
			33: [2, 33]
		}, {
			18: [2, 40],
			28: [2, 40],
			29: [2, 40],
			30: [2, 40],
			33: [2, 40],
			34: [1, 57],
			36: [2, 40]
		}, {
			33: [1, 58]
		}, {
			14: [2, 13],
			15: [2, 13],
			16: [2, 13],
			19: [2, 13],
			20: [2, 13],
			22: [2, 13],
			23: [2, 13],
			24: [2, 13]
		}, {
			5: [2, 16],
			14: [2, 16],
			15: [2, 16],
			16: [2, 16],
			19: [2, 16],
			20: [2, 16],
			22: [2, 16],
			23: [2, 16],
			24: [2, 16]
		}, {
			5: [2, 17],
			14: [2, 17],
			15: [2, 17],
			16: [2, 17],
			19: [2, 17],
			20: [2, 17],
			22: [2, 17],
			23: [2, 17],
			24: [2, 17]
		}, {
			5: [2, 18],
			14: [2, 18],
			15: [2, 18],
			16: [2, 18],
			19: [2, 18],
			20: [2, 18],
			22: [2, 18],
			23: [2, 18],
			24: [2, 18]
		}, {
			18: [1, 59]
		}, {
			18: [1, 60]
		}, {
			18: [2, 21]
		}, {
			18: [2, 25],
			28: [2, 25],
			29: [2, 25],
			30: [2, 25],
			33: [2, 25]
		}, {
			18: [2, 32],
			33: [2, 32]
		}, {
			34: [1, 57]
		}, {
			21: 61,
			28: [1, 62],
			29: [1, 63],
			30: [1, 64],
			33: [1, 25],
			35: 24
		}, {
			18: [2, 39],
			28: [2, 39],
			29: [2, 39],
			30: [2, 39],
			33: [2, 39],
			36: [2, 39]
		}, {
			5: [2, 19],
			14: [2, 19],
			15: [2, 19],
			16: [2, 19],
			19: [2, 19],
			20: [2, 19],
			22: [2, 19],
			23: [2, 19],
			24: [2, 19]
		}, {
			5: [2, 15],
			14: [2, 15],
			15: [2, 15],
			16: [2, 15],
			19: [2, 15],
			20: [2, 15],
			22: [2, 15],
			23: [2, 15],
			24: [2, 15]
		}, {
			18: [2, 34],
			33: [2, 34]
		}, {
			18: [2, 35],
			33: [2, 35]
		}, {
			18: [2, 36],
			33: [2, 36]
		}, {
			18: [2, 37],
			33: [2, 37]
		}],
		defaultActions: {
			16: [2, 1],
			37: [2, 23],
			53: [2, 21]
		},
		parseError: function parseError(str, hash) {
			throw new Error(str)
		},
		parse: function parse(input) {
			var self = this,
				stack = [0],
				vstack = [null],
				lstack = [],
				table = this.table,
				yytext = "",
				yylineno = 0,
				yyleng = 0,
				recovering = 0,
				TERROR = 2,
				EOF = 1;
			this.lexer.setInput(input);
			this.lexer.yy = this.yy;
			this.yy.lexer = this.lexer;
			if (typeof this.lexer.yylloc == "undefined") {
				this.lexer.yylloc = {}
			}
			var yyloc = this.lexer.yylloc;
			lstack.push(yyloc);
			if (typeof this.yy.parseError === "function") {
				this.parseError = this.yy.parseError
			}

			function popStack(n) {
				stack.length = stack.length - 2 * n;
				vstack.length = vstack.length - n;
				lstack.length = lstack.length - n
			}

			function lex() {
				var token;
				token = self.lexer.lex() || 1;
				if (typeof token !== "number") {
					token = self.symbols_[token] || token
				}
				return token
			}
			var symbol, preErrorSymbol, state, action, a, r, yyval = {},
				p, len, newState, expected;
			while (true) {
				state = stack[stack.length - 1];
				if (this.defaultActions[state]) {
					action = this.defaultActions[state]
				} else {
					if (symbol == null) {
						symbol = lex()
					}
					action = table[state] && table[state][symbol]
				} if (typeof action === "undefined" || !action.length || !action[0]) {
					if (!recovering) {
						expected = [];
						for (p in table[state]) {
							if (this.terminals_[p] && p > 2) {
								expected.push("'" + this.terminals_[p] + "'")
							}
						}
						var errStr = "";
						if (this.lexer.showPosition) {
							errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + this.terminals_[symbol] + "'"
						} else {
							errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'")
						}
						this.parseError(errStr, {
							text: this.lexer.match,
							token: this.terminals_[symbol] || symbol,
							line: this.lexer.yylineno,
							loc: yyloc,
							expected: expected
						})
					}
				}
				if (action[0] instanceof Array && action.length > 1) {
					throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol)
				}
				switch (action[0]) {
					case 1:
						stack.push(symbol);
						vstack.push(this.lexer.yytext);
						lstack.push(this.lexer.yylloc);
						stack.push(action[1]);
						symbol = null;
						if (!preErrorSymbol) {
							yyleng = this.lexer.yyleng;
							yytext = this.lexer.yytext;
							yylineno = this.lexer.yylineno;
							yyloc = this.lexer.yylloc;
							if (recovering > 0) {
								recovering--
							}
						} else {
							symbol = preErrorSymbol;
							preErrorSymbol = null
						}
						break;
					case 2:
						len = this.productions_[action[1]][1];
						yyval.$ = vstack[vstack.length - len];
						yyval._$ = {
							first_line: lstack[lstack.length - (len || 1)].first_line,
							last_line: lstack[lstack.length - 1].last_line,
							first_column: lstack[lstack.length - (len || 1)].first_column,
							last_column: lstack[lstack.length - 1].last_column
						};
						r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
						if (typeof r !== "undefined") {
							return r
						}
						if (len) {
							stack = stack.slice(0, -1 * len * 2);
							vstack = vstack.slice(0, -1 * len);
							lstack = lstack.slice(0, -1 * len)
						}
						stack.push(this.productions_[action[1]][0]);
						vstack.push(yyval.$);
						lstack.push(yyval._$);
						newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
						stack.push(newState);
						break;
					case 3:
						return true
				}
			}
			return true
		}
	};
	var lexer = (function() {
		var lexer = ({
			EOF: 1,
			parseError: function parseError(str, hash) {
				if (this.yy.parseError) {
					this.yy.parseError(str, hash)
				} else {
					throw new Error(str)
				}
			},
			setInput: function(input) {
				this._input = input;
				this._more = this._less = this.done = false;
				this.yylineno = this.yyleng = 0;
				this.yytext = this.matched = this.match = "";
				this.conditionStack = ["INITIAL"];
				this.yylloc = {
					first_line: 1,
					first_column: 0,
					last_line: 1,
					last_column: 0
				};
				return this
			},
			input: function() {
				var ch = this._input[0];
				this.yytext += ch;
				this.yyleng++;
				this.match += ch;
				this.matched += ch;
				var lines = ch.match(/\n/);
				if (lines) {
					this.yylineno++
				}
				this._input = this._input.slice(1);
				return ch
			},
			unput: function(ch) {
				this._input = ch + this._input;
				return this
			},
			more: function() {
				this._more = true;
				return this
			},
			pastInput: function() {
				var past = this.matched.substr(0, this.matched.length - this.match.length);
				return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "")
			},
			upcomingInput: function() {
				var next = this.match;
				if (next.length < 20) {
					next += this._input.substr(0, 20 - next.length)
				}
				return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "")
			},
			showPosition: function() {
				var pre = this.pastInput();
				var c = new Array(pre.length + 1).join("-");
				return pre + this.upcomingInput() + "\n" + c + "^"
			},
			next: function() {
				if (this.done) {
					return this.EOF
				}
				if (!this._input) {
					this.done = true
				}
				var token, match, col, lines;
				if (!this._more) {
					this.yytext = "";
					this.match = ""
				}
				var rules = this._currentRules();
				for (var i = 0; i < rules.length; i++) {
					match = this._input.match(this.rules[rules[i]]);
					if (match) {
						lines = match[0].match(/\n.*/g);
						if (lines) {
							this.yylineno += lines.length
						}
						this.yylloc = {
							first_line: this.yylloc.last_line,
							last_line: this.yylineno + 1,
							first_column: this.yylloc.last_column,
							last_column: lines ? lines[lines.length - 1].length - 1 : this.yylloc.last_column + match[0].length
						};
						this.yytext += match[0];
						this.match += match[0];
						this.matches = match;
						this.yyleng = this.yytext.length;
						this._more = false;
						this._input = this._input.slice(match[0].length);
						this.matched += match[0];
						token = this.performAction.call(this, this.yy, this, rules[i], this.conditionStack[this.conditionStack.length - 1]);
						if (token) {
							return token
						} else {
							return
						}
					}
				}
				if (this._input === "") {
					return this.EOF
				} else {
					this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
						text: "",
						token: null,
						line: this.yylineno
					})
				}
			},
			lex: function lex() {
				var r = this.next();
				if (typeof r !== "undefined") {
					return r
				} else {
					return this.lex()
				}
			},
			begin: function begin(condition) {
				this.conditionStack.push(condition)
			},
			popState: function popState() {
				return this.conditionStack.pop()
			},
			_currentRules: function _currentRules() {
				return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
			},
			topState: function() {
				return this.conditionStack[this.conditionStack.length - 2]
			},
			pushState: function begin(condition) {
				this.begin(condition)
			}
		});
		lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
			var YYSTATE = YY_START;
			switch ($avoiding_name_collisions) {
				case 0:
					if (yy_.yytext.slice(-1) !== "\\") {
						this.begin("mu")
					}
					if (yy_.yytext.slice(-1) === "\\") {
						yy_.yytext = yy_.yytext.substr(0, yy_.yyleng - 1), this.begin("emu")
					}
					if (yy_.yytext) {
						return 14
					}
					break;
				case 1:
					return 14;
					break;
				case 2:
					this.popState();
					return 14;
					break;
				case 3:
					return 24;
					break;
				case 4:
					return 16;
					break;
				case 5:
					return 20;
					break;
				case 6:
					return 19;
					break;
				case 7:
					return 19;
					break;
				case 8:
					return 23;
					break;
				case 9:
					return 23;
					break;
				case 10:
					yy_.yytext = yy_.yytext.substr(3, yy_.yyleng - 5);
					this.popState();
					return 15;
					break;
				case 11:
					return 22;
					break;
				case 12:
					return 34;
					break;
				case 13:
					return 33;
					break;
				case 14:
					return 33;
					break;
				case 15:
					return 36;
					break;
				case 16:
					break;
				case 17:
					this.popState();
					return 18;
					break;
				case 18:
					this.popState();
					return 18;
					break;
				case 19:
					yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2).replace(/\\"/g, '"');
					return 28;
					break;
				case 20:
					return 30;
					break;
				case 21:
					return 30;
					break;
				case 22:
					return 29;
					break;
				case 23:
					return 33;
					break;
				case 24:
					yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
					return 33;
					break;
				case 25:
					return "INVALID";
					break;
				case 26:
					return 5;
					break
			}
		};
		lexer.rules = [/^[^\x00]*?(?=(\{\{))/, /^[^\x00]+/, /^[^\x00]{2,}?(?=(\{\{))/, /^\{\{>/, /^\{\{#/, /^\{\{\//, /^\{\{\^/, /^\{\{\s*else\b/, /^\{\{\{/, /^\{\{&/, /^\{\{![\s\S]*?\}\}/, /^\{\{/, /^=/, /^\.(?=[} ])/, /^\.\./, /^[\/.]/, /^\s+/, /^\}\}\}/, /^\}\}/, /^"(\\["]|[^"])*"/, /^true(?=[}\s])/, /^false(?=[}\s])/, /^[0-9]+(?=[}\s])/, /^[a-zA-Z0-9_$-]+(?=[=}\s\/.])/, /^\[[^\]]*\]/, /^./, /^$/];
		lexer.conditions = {
			mu: {
				rules: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
				inclusive: false
			},
			emu: {
				rules: [2],
				inclusive: false
			},
			INITIAL: {
				rules: [0, 1, 26],
				inclusive: true
			}
		};
		return lexer
	})();
	parser.lexer = lexer;
	return parser
})();
if (typeof require !== "undefined" && typeof exports !== "undefined") {
	exports.parser = handlebars;
	exports.parse = function() {
		return handlebars.parse.apply(handlebars, arguments)
	};
	exports.main = function commonjsMain(args) {
		if (!args[1]) {
			throw new Error("Usage: " + args[0] + " FILE")
		}
		if (typeof process !== "undefined") {
			var source = require("fs").readFileSync(require("path").join(process.cwd(), args[1]), "utf8")
		} else {
			var cwd = require("file").path(require("file").cwd());
			var source = cwd.join(args[1]).read({
				charset: "utf-8"
			})
		}
		return exports.parser.parse(source)
	};
	if (typeof module !== "undefined" && require.main === module) {
		exports.main(typeof process !== "undefined" ? process.argv.slice(1) : require("system").args)
	}
}
Handlebars.Parser = handlebars;
Handlebars.parse = function(string) {
	Handlebars.Parser.yy = Handlebars.AST;
	return Handlebars.Parser.parse(string)
};
Handlebars.print = function(ast) {
	return new Handlebars.PrintVisitor().accept(ast)
};
Handlebars.logger = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
	level: 3,
	log: function(level, str) {}
};
Handlebars.log = function(level, str) {
	Handlebars.logger.log(level, str)
};
(function() {
	Handlebars.AST = {};
	Handlebars.AST.ProgramNode = function(statements, inverse) {
		this.type = "program";
		this.statements = statements;
		if (inverse) {
			this.inverse = new Handlebars.AST.ProgramNode(inverse)
		}
	};
	Handlebars.AST.MustacheNode = function(params, hash, unescaped) {
		this.type = "mustache";
		this.id = params[0];
		this.params = params.slice(1);
		this.hash = hash;
		this.escaped = !unescaped
	};
	Handlebars.AST.PartialNode = function(id, context) {
		this.type = "partial";
		this.id = id;
		this.context = context
	};
	var verifyMatch = function(open, close) {
		if (open.original !== close.original) {
			throw new Handlebars.Exception(open.original + " doesn't match " + close.original)
		}
	};
	Handlebars.AST.BlockNode = function(mustache, program, close) {
		verifyMatch(mustache.id, close);
		this.type = "block";
		this.mustache = mustache;
		this.program = program
	};
	Handlebars.AST.InverseNode = function(mustache, program, close) {
		verifyMatch(mustache.id, close);
		this.type = "inverse";
		this.mustache = mustache;
		this.program = program
	};
	Handlebars.AST.ContentNode = function(string) {
		this.type = "content";
		this.string = string
	};
	Handlebars.AST.HashNode = function(pairs) {
		this.type = "hash";
		this.pairs = pairs
	};
	Handlebars.AST.IdNode = function(parts) {
		this.type = "ID";
		this.original = parts.join(".");
		var dig = [],
			depth = 0;
		for (var i = 0, l = parts.length; i < l; i++) {
			var part = parts[i];
			if (part === "..") {
				depth++
			} else {
				if (part === "." || part === "this") {
					this.isScoped = true
				} else {
					dig.push(part)
				}
			}
		}
		this.parts = dig;
		this.string = dig.join(".");
		this.depth = depth;
		this.isSimple = (dig.length === 1) && (depth === 0)
	};
	Handlebars.AST.StringNode = function(string) {
		this.type = "STRING";
		this.string = string
	};
	Handlebars.AST.IntegerNode = function(integer) {
		this.type = "INTEGER";
		this.integer = integer
	};
	Handlebars.AST.BooleanNode = function(bool) {
		this.type = "BOOLEAN";
		this.bool = bool
	};
	Handlebars.AST.CommentNode = function(comment) {
		this.type = "comment";
		this.comment = comment
	}
})();
Handlebars.Exception = function(message) {
	var tmp = Error.prototype.constructor.apply(this, arguments);
	for (var p in tmp) {
		if (tmp.hasOwnProperty(p)) {
			this[p] = tmp[p]
		}
	}
	this.message = tmp.message
};
Handlebars.Exception.prototype = new Error;
Handlebars.SafeString = function(string) {
	this.string = string
};
Handlebars.SafeString.prototype.toString = function() {
	return this.string.toString()
};
(function() {
	var escape = {
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#x27;",
		"`": "&#x60;"
	};
	var badChars = /&(?!\w+;)|[<>"'`]/g;
	var possible = /[&<>"'`]/;
	var escapeChar = function(chr) {
		return escape[chr] || "&amp;"
	};
	Handlebars.Utils = {
		escapeExpression: function(string) {
			if (string instanceof Handlebars.SafeString) {
				return string.toString()
			} else {
				if (string == null || string === false) {
					return ""
				}
			} if (!possible.test(string)) {
				return string
			}
			return string.replace(badChars, escapeChar)
		},
		isEmpty: function(value) {
			if (typeof value === "undefined") {
				return true
			} else {
				if (value === null) {
					return true
				} else {
					if (value === false) {
						return true
					} else {
						if (Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
							return true
						} else {
							return false
						}
					}
				}
			}
		}
	}
})();
Handlebars.Compiler = function() {};
Handlebars.JavaScriptCompiler = function() {};
(function(Compiler, JavaScriptCompiler) {
	Compiler.OPCODE_MAP = {
		appendContent: 1,
		getContext: 2,
		lookupWithHelpers: 3,
		lookup: 4,
		append: 5,
		invokeMustache: 6,
		appendEscaped: 7,
		pushString: 8,
		truthyOrFallback: 9,
		functionOrFallback: 10,
		invokeProgram: 11,
		invokePartial: 12,
		push: 13,
		assignToHash: 15,
		pushStringParam: 16
	};
	Compiler.MULTI_PARAM_OPCODES = {
		appendContent: 1,
		getContext: 1,
		lookupWithHelpers: 2,
		lookup: 1,
		invokeMustache: 3,
		pushString: 1,
		truthyOrFallback: 1,
		functionOrFallback: 1,
		invokeProgram: 3,
		invokePartial: 1,
		push: 1,
		assignToHash: 1,
		pushStringParam: 1
	};
	Compiler.DISASSEMBLE_MAP = {};
	for (var prop in Compiler.OPCODE_MAP) {
		var value = Compiler.OPCODE_MAP[prop];
		Compiler.DISASSEMBLE_MAP[value] = prop
	}
	Compiler.multiParamSize = function(code) {
		return Compiler.MULTI_PARAM_OPCODES[Compiler.DISASSEMBLE_MAP[code]]
	};
	Compiler.prototype = {
		compiler: Compiler,
		disassemble: function() {
			var opcodes = this.opcodes,
				opcode, nextCode;
			var out = [],
				str, name, value;
			for (var i = 0, l = opcodes.length; i < l; i++) {
				opcode = opcodes[i];
				if (opcode === "DECLARE") {
					name = opcodes[++i];
					value = opcodes[++i];
					out.push("DECLARE " + name + " = " + value)
				} else {
					str = Compiler.DISASSEMBLE_MAP[opcode];
					var extraParams = Compiler.multiParamSize(opcode);
					var codes = [];
					for (var j = 0; j < extraParams; j++) {
						nextCode = opcodes[++i];
						if (typeof nextCode === "string") {
							nextCode = '"' + nextCode.replace("\n", "\\n") + '"'
						}
						codes.push(nextCode)
					}
					str = str + " " + codes.join(" ");
					out.push(str)
				}
			}
			return out.join("\n")
		},
		guid: 0,
		compile: function(program, options) {
			this.children = [];
			this.depths = {
				list: []
			};
			this.options = options;
			var knownHelpers = this.options.knownHelpers;
			this.options.knownHelpers = {
				helperMissing: true,
				blockHelperMissing: true,
				each: true,
				"if": true,
				unless: true,
				"with": true,
				log: true
			};
			if (knownHelpers) {
				for (var name in knownHelpers) {
					this.options.knownHelpers[name] = knownHelpers[name]
				}
			}
			return this.program(program)
		},
		accept: function(node) {
			return this[node.type](node)
		},
		program: function(program) {
			var statements = program.statements,
				statement;
			this.opcodes = [];
			for (var i = 0, l = statements.length; i < l; i++) {
				statement = statements[i];
				this[statement.type](statement)
			}
			this.isSimple = l === 1;
			this.depths.list = this.depths.list.sort(function(a, b) {
				return a - b
			});
			return this
		},
		compileProgram: function(program) {
			var result = new this.compiler().compile(program, this.options);
			var guid = this.guid++;
			this.usePartial = this.usePartial || result.usePartial;
			this.children[guid] = result;
			for (var i = 0, l = result.depths.list.length; i < l; i++) {
				depth = result.depths.list[i];
				if (depth < 2) {
					continue
				} else {
					this.addDepth(depth - 1)
				}
			}
			return guid
		},
		block: function(block) {
			var mustache = block.mustache;
			var depth, child, inverse, inverseGuid;
			var params = this.setupStackForMustache(mustache);
			var programGuid = this.compileProgram(block.program);
			if (block.program.inverse) {
				inverseGuid = this.compileProgram(block.program.inverse);
				this.declare("inverse", inverseGuid)
			}
			this.opcode("invokeProgram", programGuid, params.length, !!mustache.hash);
			this.declare("inverse", null);
			this.opcode("append")
		},
		inverse: function(block) {
			var params = this.setupStackForMustache(block.mustache);
			var programGuid = this.compileProgram(block.program);
			this.declare("inverse", programGuid);
			this.opcode("invokeProgram", null, params.length, !!block.mustache.hash);
			this.declare("inverse", null);
			this.opcode("append")
		},
		hash: function(hash) {
			var pairs = hash.pairs,
				pair, val;
			this.opcode("push", "{}");
			for (var i = 0, l = pairs.length; i < l; i++) {
				pair = pairs[i];
				val = pair[1];
				this.accept(val);
				this.opcode("assignToHash", pair[0])
			}
		},
		partial: function(partial) {
			var id = partial.id;
			this.usePartial = true;
			if (partial.context) {
				this.ID(partial.context)
			} else {
				this.opcode("push", "depth0")
			}
			this.opcode("invokePartial", id.original);
			this.opcode("append")
		},
		content: function(content) {
			this.opcode("appendContent", content.string)
		},
		mustache: function(mustache) {
			var params = this.setupStackForMustache(mustache);
			this.opcode("invokeMustache", params.length, mustache.id.original, !!mustache.hash);
			if (mustache.escaped && !this.options.noEscape) {
				this.opcode("appendEscaped")
			} else {
				this.opcode("append")
			}
		},
		ID: function(id) {
			this.addDepth(id.depth);
			this.opcode("getContext", id.depth);
			this.opcode("lookupWithHelpers", id.parts[0] || null, id.isScoped || false);
			for (var i = 1, l = id.parts.length; i < l; i++) {
				this.opcode("lookup", id.parts[i])
			}
		},
		STRING: function(string) {
			this.opcode("pushString", string.string)
		},
		INTEGER: function(integer) {
			this.opcode("push", integer.integer)
		},
		BOOLEAN: function(bool) {
			this.opcode("push", bool.bool)
		},
		comment: function() {},
		pushParams: function(params) {
			var i = params.length,
				param;
			while (i--) {
				param = params[i];
				if (this.options.stringParams) {
					if (param.depth) {
						this.addDepth(param.depth)
					}
					this.opcode("getContext", param.depth || 0);
					this.opcode("pushStringParam", param.string)
				} else {
					this[param.type](param)
				}
			}
		},
		opcode: function(name, val1, val2, val3) {
			this.opcodes.push(Compiler.OPCODE_MAP[name]);
			if (val1 !== undefined) {
				this.opcodes.push(val1)
			}
			if (val2 !== undefined) {
				this.opcodes.push(val2)
			}
			if (val3 !== undefined) {
				this.opcodes.push(val3)
			}
		},
		declare: function(name, value) {
			this.opcodes.push("DECLARE");
			this.opcodes.push(name);
			this.opcodes.push(value)
		},
		addDepth: function(depth) {
			if (depth === 0) {
				return
			}
			if (!this.depths[depth]) {
				this.depths[depth] = true;
				this.depths.list.push(depth)
			}
		},
		setupStackForMustache: function(mustache) {
			var params = mustache.params;
			this.pushParams(params);
			if (mustache.hash) {
				this.hash(mustache.hash)
			}
			this.ID(mustache.id);
			return params
		}
	};
	JavaScriptCompiler.prototype = {
		nameLookup: function(parent, name, type) {
			if (/^[0-9]+$/.test(name)) {
				return parent + "[" + name + "]"
			} else {
				if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
					return parent + "." + name
				} else {
					return parent + "['" + name + "']"
				}
			}
		},
		appendToBuffer: function(string) {
			if (this.environment.isSimple) {
				return "return " + string + ";"
			} else {
				return "buffer += " + string + ";"
			}
		},
		initializeBuffer: function() {
			return this.quotedString("")
		},
		namespace: "Handlebars",
		compile: function(environment, options, context, asObject) {
			this.environment = environment;
			this.options = options || {};
			this.name = this.environment.name;
			this.isChild = !!context;
			this.context = context || {
				programs: [],
				aliases: {
					self: "this"
				},
				registers: {
					list: []
				}
			};
			this.preamble();
			this.stackSlot = 0;
			this.stackVars = [];
			this.compileChildren(environment, options);
			var opcodes = environment.opcodes,
				opcode;
			this.i = 0;
			for (l = opcodes.length; this.i < l; this.i++) {
				opcode = this.nextOpcode(0);
				if (opcode[0] === "DECLARE") {
					this.i = this.i + 2;
					this[opcode[1]] = opcode[2]
				} else {
					this.i = this.i + opcode[1].length;
					this[opcode[0]].apply(this, opcode[1])
				}
			}
			return this.createFunctionContext(asObject)
		},
		nextOpcode: function(n) {
			var opcodes = this.environment.opcodes,
				opcode = opcodes[this.i + n],
				name, val;
			var extraParams, codes;
			if (opcode === "DECLARE") {
				name = opcodes[this.i + 1];
				val = opcodes[this.i + 2];
				return ["DECLARE", name, val]
			} else {
				name = Compiler.DISASSEMBLE_MAP[opcode];
				extraParams = Compiler.multiParamSize(opcode);
				codes = [];
				for (var j = 0; j < extraParams; j++) {
					codes.push(opcodes[this.i + j + 1 + n])
				}
				return [name, codes]
			}
		},
		eat: function(opcode) {
			this.i = this.i + opcode.length
		},
		preamble: function() {
			var out = [];
			this.useRegister("foundHelper");
			if (!this.isChild) {
				var namespace = this.namespace;
				var copies = "helpers = helpers || " + namespace + ".helpers;";
				if (this.environment.usePartial) {
					copies = copies + " partials = partials || " + namespace + ".partials;"
				}
				out.push(copies)
			} else {
				out.push("")
			} if (!this.environment.isSimple) {
				out.push(", buffer = " + this.initializeBuffer())
			} else {
				out.push("")
			}
			this.lastContext = 0;
			this.source = out
		},
		createFunctionContext: function(asObject) {
			var locals = this.stackVars;
			if (!this.isChild) {
				locals = locals.concat(this.context.registers.list)
			}
			if (locals.length > 0) {
				this.source[1] = this.source[1] + ", " + locals.join(", ")
			}
			if (!this.isChild) {
				var aliases = [];
				for (var alias in this.context.aliases) {
					this.source[1] = this.source[1] + ", " + alias + "=" + this.context.aliases[alias]
				}
			}
			if (this.source[1]) {
				this.source[1] = "var " + this.source[1].substring(2) + ";"
			}
			if (!this.isChild) {
				this.source[1] += "\n" + this.context.programs.join("\n") + "\n"
			}
			if (!this.environment.isSimple) {
				this.source.push("return buffer;")
			}
			var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
			for (var i = 0, l = this.environment.depths.list.length; i < l; i++) {
				params.push("depth" + this.environment.depths.list[i])
			}
			if (asObject) {
				params.push(this.source.join("\n  "));
				return Function.apply(this, params)
			} else {
				var functionSource = "function " + (this.name || "") + "(" + params.join(",") + ") {\n  " + this.source.join("\n  ") + "}";
				Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n");
				return functionSource
			}
		},
		appendContent: function(content) {
			this.source.push(this.appendToBuffer(this.quotedString(content)))
		},
		append: function() {
			var local = this.popStack();
			this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
			if (this.environment.isSimple) {
				this.source.push("else { " + this.appendToBuffer("''") + " }")
			}
		},
		appendEscaped: function() {
			var opcode = this.nextOpcode(1),
				extra = "";
			this.context.aliases.escapeExpression = "this.escapeExpression";
			if (opcode[0] === "appendContent") {
				extra = " + " + this.quotedString(opcode[1][0]);
				this.eat(opcode)
			}
			this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + extra))
		},
		getContext: function(depth) {
			if (this.lastContext !== depth) {
				this.lastContext = depth
			}
		},
		lookupWithHelpers: function(name, isScoped) {
			if (name) {
				var topStack = this.nextStack();
				this.usingKnownHelper = false;
				var toPush;
				if (!isScoped && this.options.knownHelpers[name]) {
					toPush = topStack + " = " + this.nameLookup("helpers", name, "helper");
					this.usingKnownHelper = true
				} else {
					if (isScoped || this.options.knownHelpersOnly) {
						toPush = topStack + " = " + this.nameLookup("depth" + this.lastContext, name, "context")
					} else {
						this.register("foundHelper", this.nameLookup("helpers", name, "helper"));
						toPush = topStack + " = foundHelper || " + this.nameLookup("depth" + this.lastContext, name, "context")
					}
				}
				toPush += ";";
				this.source.push(toPush)
			} else {
				this.pushStack("depth" + this.lastContext)
			}
		},
		lookup: function(name) {
			var topStack = this.topStack();
			this.source.push(topStack + " = (" + topStack + " === null || " + topStack + " === undefined || " + topStack + " === false ? " + topStack + " : " + this.nameLookup(topStack, name, "context") + ");")
		},
		pushStringParam: function(string) {
			this.pushStack("depth" + this.lastContext);
			this.pushString(string)
		},
		pushString: function(string) {
			this.pushStack(this.quotedString(string))
		},
		push: function(name) {
			this.pushStack(name)
		},
		invokeMustache: function(paramSize, original, hasHash) {
			this.populateParams(paramSize, this.quotedString(original), "{}", null, hasHash, function(nextStack, helperMissingString, id) {
				if (!this.usingKnownHelper) {
					this.context.aliases.helperMissing = "helpers.helperMissing";
					this.context.aliases.undef = "void 0";
					this.source.push("else if(" + id + "=== undef) { " + nextStack + " = helperMissing.call(" + helperMissingString + "); }");
					if (nextStack !== id) {
						this.source.push("else { " + nextStack + " = " + id + "; }")
					}
				}
			})
		},
		invokeProgram: function(guid, paramSize, hasHash) {
			var inverse = this.programExpression(this.inverse);
			var mainProgram = this.programExpression(guid);
			this.populateParams(paramSize, null, mainProgram, inverse, hasHash, function(nextStack, helperMissingString, id) {
				if (!this.usingKnownHelper) {
					this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
					this.source.push("else { " + nextStack + " = blockHelperMissing.call(" + helperMissingString + "); }")
				}
			})
		},
		populateParams: function(paramSize, helperId, program, inverse, hasHash, fn) {
			var needsRegister = hasHash || this.options.stringParams || inverse || this.options.data;
			var id = this.popStack(),
				nextStack;
			var params = [],
				param, stringParam, stringOptions;
			if (needsRegister) {
				this.register("tmp1", program);
				stringOptions = "tmp1"
			} else {
				stringOptions = "{ hash: {} }"
			} if (needsRegister) {
				var hash = (hasHash ? this.popStack() : "{}");
				this.source.push("tmp1.hash = " + hash + ";")
			}
			if (this.options.stringParams) {
				this.source.push("tmp1.contexts = [];")
			}
			for (var i = 0; i < paramSize; i++) {
				param = this.popStack();
				params.push(param);
				if (this.options.stringParams) {
					this.source.push("tmp1.contexts.push(" + this.popStack() + ");")
				}
			}
			if (inverse) {
				this.source.push("tmp1.fn = tmp1;");
				this.source.push("tmp1.inverse = " + inverse + ";")
			}
			if (this.options.data) {
				this.source.push("tmp1.data = data;")
			}
			params.push(stringOptions);
			this.populateCall(params, id, helperId || id, fn, program !== "{}")
		},
		populateCall: function(params, id, helperId, fn, program) {
			var paramString = ["depth0"].concat(params).join(", ");
			var helperMissingString = ["depth0"].concat(helperId).concat(params).join(", ");
			var nextStack = this.nextStack();
			if (this.usingKnownHelper) {
				this.source.push(nextStack + " = " + id + ".call(" + paramString + ");")
			} else {
				this.context.aliases.functionType = '"function"';
				var condition = program ? "foundHelper && " : "";
				this.source.push("if(" + condition + "typeof " + id + " === functionType) { " + nextStack + " = " + id + ".call(" + paramString + "); }")
			}
			fn.call(this, nextStack, helperMissingString, id);
			this.usingKnownHelper = false
		},
		invokePartial: function(context) {
			params = [this.nameLookup("partials", context, "partial"), "'" + context + "'", this.popStack(), "helpers", "partials"];
			if (this.options.data) {
				params.push("data")
			}
			this.pushStack("self.invokePartial(" + params.join(", ") + ");")
		},
		assignToHash: function(key) {
			var value = this.popStack();
			var hash = this.topStack();
			this.source.push(hash + "['" + key + "'] = " + value + ";")
		},
		compiler: JavaScriptCompiler,
		compileChildren: function(environment, options) {
			var children = environment.children,
				child, compiler;
			for (var i = 0, l = children.length; i < l; i++) {
				child = children[i];
				compiler = new this.compiler();
				this.context.programs.push("");
				var index = this.context.programs.length;
				child.index = index;
				child.name = "program" + index;
				this.context.programs[index] = compiler.compile(child, options, this.context)
			}
		},
		programExpression: function(guid) {
			if (guid == null) {
				return "self.noop"
			}
			var child = this.environment.children[guid],
				depths = child.depths.list;
			var programParams = [child.index, child.name, "data"];
			for (var i = 0, l = depths.length; i < l; i++) {
				depth = depths[i];
				if (depth === 1) {
					programParams.push("depth0")
				} else {
					programParams.push("depth" + (depth - 1))
				}
			}
			if (depths.length === 0) {
				return "self.program(" + programParams.join(", ") + ")"
			} else {
				programParams.shift();
				return "self.programWithDepth(" + programParams.join(", ") + ")"
			}
		},
		register: function(name, val) {
			this.useRegister(name);
			this.source.push(name + " = " + val + ";")
		},
		useRegister: function(name) {
			if (!this.context.registers[name]) {
				this.context.registers[name] = true;
				this.context.registers.list.push(name)
			}
		},
		pushStack: function(item) {
			this.source.push(this.nextStack() + " = " + item + ";");
			return "stack" + this.stackSlot
		},
		nextStack: function() {
			this.stackSlot++;
			if (this.stackSlot > this.stackVars.length) {
				this.stackVars.push("stack" + this.stackSlot)
			}
			return "stack" + this.stackSlot
		},
		popStack: function() {
			return "stack" + this.stackSlot--
		},
		topStack: function() {
			return "stack" + this.stackSlot
		},
		quotedString: function(str) {
			return '"' + str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r") + '"'
		}
	};
	var reservedWords = ("break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield").split(" ");
	var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
	for (var i = 0, l = reservedWords.length; i < l; i++) {
		compilerWords[reservedWords[i]] = true
	}
	JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
		if (!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
			return true
		}
		return false
	}
})(Handlebars.Compiler, Handlebars.JavaScriptCompiler);
Handlebars.precompile = function(string, options) {
	options = options || {};
	var ast = Handlebars.parse(string);
	var environment = new Handlebars.Compiler().compile(ast, options);
	return new Handlebars.JavaScriptCompiler().compile(environment, options)
};
Handlebars.compile = function(string, options) {
	options = options || {};
	var compiled;

	function compile() {
		var ast = Handlebars.parse(string);
		var environment = new Handlebars.Compiler().compile(ast, options);
		var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
		return Handlebars.template(templateSpec)
	}
	return function(context, options) {
		if (!compiled) {
			compiled = compile()
		}
		return compiled.call(this, context, options)
	}
};
Handlebars.VM = {
	template: function(templateSpec) {
		var container = {
			escapeExpression: Handlebars.Utils.escapeExpression,
			invokePartial: Handlebars.VM.invokePartial,
			programs: [],
			program: function(i, fn, data) {
				var programWrapper = this.programs[i];
				if (data) {
					return Handlebars.VM.program(fn, data)
				} else {
					if (programWrapper) {
						return programWrapper
					} else {
						programWrapper = this.programs[i] = Handlebars.VM.program(fn);
						return programWrapper
					}
				}
			},
			programWithDepth: Handlebars.VM.programWithDepth,
			noop: Handlebars.VM.noop
		};
		return function(context, options) {
			options = options || {};
			return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data)
		}
	},
	programWithDepth: function(fn, data, $depth) {
		var args = Array.prototype.slice.call(arguments, 2);
		return function(context, options) {
			options = options || {};
			return fn.apply(this, [context, options.data || data].concat(args))
		}
	},
	program: function(fn, data) {
		return function(context, options) {
			options = options || {};
			return fn(context, options.data || data)
		}
	},
	noop: function() {
		return ""
	},
	invokePartial: function(partial, name, context, helpers, partials, data) {
		options = {
			helpers: helpers,
			partials: partials,
			data: data
		};
		if (partial === undefined) {
			throw new Handlebars.Exception("The partial " + name + " could not be found")
		} else {
			if (partial instanceof Function) {
				return partial(context, options)
			} else {
				if (!Handlebars.compile) {
					throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode")
				} else {
					partials[name] = Handlebars.compile(partial);
					return partials[name](context, options)
				}
			}
		}
	}
};
Handlebars.template = Handlebars.VM.template;
window.z$ = function(obj) {
	return typeof(obj) == "string" ? document.getElementById(obj) : obj
};
String.prototype.trim = function() {
	return this.replace(/(^[\s]*)|([\s]*$)/g, "")
};
var gozap_isIE = true;
var version = 7;
var gozap_isNetscape = false;
var gozap_isOpera = false;
if (0 <= navigator.appName.indexOf("Netscape")) {
	gozap_isIE = false;
	gozap_isNetscape = true
} else {
	if (0 <= navigator.appName.indexOf("Opera")) {
		gozap_isIE = false;
		gozap_isOpera = true
	}
} if (gozap_isIE) {
	try {
		version = parseInt(navigator.appVersion.split("MSIE")[1])
	} catch (err) {}
} else {
	if (gozap_isNetscape) {
		if (0 < navigator.userAgent.indexOf("Firefox/2.0")) {
			version = 2
		}
	}
}

function ZHttpBinding(urlList) {
	this.urlList = urlList;
	if (null == urlList) {
		this.urlList = ["/JHB/"]
	}
	var to = "gozap.com";
	var sendCacheArr = [];
	var sid;
	var debugFunction;
	var xmlns = "http://jabber.org/protocol/httpbind";
	var hold = "1";
	var inactivity = 30000;
	var wait = 30000;
	var isAnonymous = false;
	var currURL;
	var requests = 1;
	var RID = 100;
	var isInit;
	var connectListenerFun;
	var errStartTime = 0;
	var errorReconnTime = 10000;
	global_thread_functionArr.push(thread);

	function thread() {
		for (i = sendCacheArr.length - 1; i >= 0; i--) {
			var o = sendCacheArr[i];
			if (null != o.errorTime && errorReconnTime < global_currTime - o.errorTime) {
				o.errorTime = null;
				sendToServer(o, global_currTime)
			}
		}
		if (isCheckSend) {
			checkSend()
		}
		if (0 != errStartTime && inactivity < global_currTime - errStartTime) {
			closeFun()
		}
	}
	ZHttpBinding.prototype.setTo = function(t) {
		to = t
	};
	ZHttpBinding.prototype.close = function() {
		closeFun()
	};
	ZHttpBinding.prototype.startConnect = function(anonymous) {
		closeFun();
		errStartTime = 0;
		isInit = true;
		isAnonymous = anonymous;
		currURL = this.urlList[Math.floor(Math.random() * this.urlList.length)];
		var rid = getRid();
		httpSend('<body xmlns="' + xmlns + '" content="text/xml; charset=utf-8" hold="' + hold + '" rid="' + rid + '" to="' + to + '" wait="' + wait + '"' + (isAnonymous ? ' anonymous="true"' : "") + "/>", rid)
	};
	ZHttpBinding.prototype.send = function(str) {
		httpSend(str)
	};
	ZHttpBinding.prototype.setConnectListener = function(fun) {
		connectListenerFun = fun
	};

	function closeFun() {
		errStartTime = 0;
		for (var i = sendCacheArr.length - 1; i >= 0; i--) {
			closeObject(sendCacheArr[i])
		}
		sendCacheArr.splice(0, sendCacheArr.length);
		if (null != sid) {
			var rid = getRid();
			httpSend('<body xmlns="' + xmlns + '" sid="' + sid + '" rid="' + rid + "\" type='terminate'></body>", rid)
		}
		sid = null;
		if (null != connectListenerFun) {
			try {
				connectListenerFun(0)
			} catch (err) {}
		}
	}

	function closeObject(o) {
		try {
			if (null != o.loader) {
				o.loader.onreadystatechange = null;
				o.loader = null
			}
		} catch (err) {}
	}
	var isCheckSend;

	function httpSend(str, rid) {
		var o = null;
		if (0 != sendCacheArr.length && null == rid) {
			o = sendCacheArr[0];
			if (-1 == o.rid) {
				o.str += str
			} else {
				o = null
			}
		}
		if (null == o) {
			o = {
				str: str,
				rid: rid,
				loader: null,
				rece: null,
				sendTime: 0
			};
			sendCacheArr.unshift(o);
			isCheckSend = true
		}
	}

	function checkSend() {
		isCheckSend = false;
		var now = global_currTime;
		for (var i = sendCacheArr.length - 1, j = 0; i >= 0; i--, j++) {
			if (j >= requests) {
				break
			}
			var o = sendCacheArr[i];
			if (null == o.loader) {
				if (null == o.rece && (0 == o.sendTime || wait < (now - o.sendTime))) {
					sendToServer(o, now)
				}
			}
		}
	}

	function sendToServer(o, now) {
		o.sendTime = now;
		if (-1 == o.rid || null == o.rid) {
			o.rid = getRid();
			o.str = '<body xmlns="' + xmlns + '" sid="' + sid + '" rid="' + o.rid + '">' + o.str + "</body>"
		}
		var xmlhttp = httpBindingGetHTTPObject();
		xmlhttp.open("POST", currURL, true);
		o.loader = xmlhttp;
		debug("send:" + o.str);
		xmlhttp.send(o.str);
		xmlhttp.onreadystatechange = httpReadyStateChange
	}

	function parse(xml) {
		if ("terminate" == xml.firstChild.getAttribute("type")) {
			close();
			return
		}
		var type = 2;
		if (isInit) {
			wait = parseInt(xml.firstChild.getAttribute("wait")) * 1000;
			inactivity = parseInt(xml.firstChild.getAttribute("inactivity")) * 1000;
			sid = xml.firstChild.getAttribute("sid");
			requests = parseInt(xml.firstChild.getAttribute("requests"));
			isInit = false;
			if (null != connectListenerFun) {
				try {
					connectListenerFun(1, xml.firstChild)
				} catch (err) {}
			}
		} else {
			var len = xml.firstChild.childNodes.length;
			for (var i = 0; i < len; i++) {
				if (null != connectListenerFun) {
					try {
						connectListenerFun(2, xml.firstChild.childNodes[i])
					} catch (err) {}
				}
			}
		} if (0 == sendCacheArr.length) {
			httpSend("")
		} else {
			checkSend()
		}
	}

	function httpReadyStateChange(e) {
		debug("status:" + this.status);
		if (this.readyState == 4 && this.status == 200) {
			try {
				debug("rece:" + this.responseText);
				errStartTime = 0;
				var xml = zring_createXml(this.responseText);
				var ack = xml.firstChild.getAttribute("ack");
				if (null != ack && "" != ack) {
					var ack_num = parseInt(ack);
					var len = sendCacheArr.length - 1;
					var parse_arr = [];
					var isFind = false;
					var i;
					for (i = len; i >= 0; i--) {
						var o = sendCacheArr[i];
						if (ack_num == o.rid) {
							if (i == len) {
								parse_arr.unshift(xml);
								sendCacheArr.splice(i, 1);
								isFind = true
							} else {
								o.rece = xml;
								break
							}
						} else {
							if (isFind) {
								if (null != o.rece) {
									parse_arr.unshift(o.rece);
									sendCacheArr.splice(i, 1)
								} else {
									break
								}
							}
						}
					}
					for (i = parse_arr.length - 1; i >= 0; i--) {
						parse(parse_arr[i])
					}
				}
			} catch (err) {}
		} else {
			if (200 != this.status) {
				this.onreadystatechange = null;
				if (0 == errStartTime) {
					errStartTime = global_currTime
				}
				for (i = sendCacheArr.length - 1; i >= 0; i--) {
					var o = sendCacheArr[i];
					if (o.loader == this) {
						if (errorReconnTime < global_currTime - o.sendTime) {
							sendToServer(o, global_currTime)
						} else {
							o.errorTime = global_currTime
						}
						break
					}
				}
			}
		}
	}

	function getRid() {
		RID++;
		return RID
	}

	function debug(str, color) {
		if (null != debugFunction) {
			try {
				debugFunction(str, color);
				return
			} catch (err) {}
		}
	}
	ZHttpBinding.prototype.setDebugFun = function(fun) {
		debugFunction = fun
	}
}

function httpBindingGetHTTPObject() {
	var xmlhttp = false;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
		if (xmlhttp.overrideMimeType) {
			xmlhttp.overrideMimeType("text/xml")
		}
	} else {
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP")
		} catch (e) {
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
			} catch (E) {
				xmlhttp = false
			}
		}
	}
	return xmlhttp
}

function zring_createXml(str) {
	if (window.ActiveXObject) {
		var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
		xmlDom.loadXML(str);
		return xmlDom
	} else {
		return new DOMParser().parseFromString(str, "text/xml")
	}
}

function zring_getXMLString(xmlObj) {
	if (gozap_isIE) {
		return xmlObj.xml
	} else {
		var oSerializer = new XMLSerializer();
		return oSerializer.serializeToString(xmlObj)
	}
}
var global_thread_functionArr = [];
var global_currTime = null;
var global_Time = 1;
var global_funArr = [];
var global_moveFunArr = [];
var global_up_thread_time = 0;

function timeFunction() {
	var currTime = new Date().getTime();
	if (null == global_currTime) {
		global_currTime = currTime
	} else {
		global_currTime += 50
	} if (1000 < global_currTime - global_up_thread_time) {
		global_up_thread_time = global_currTime;
		for (var i = global_thread_functionArr.length - 1; i >= 0; i--) {
			try {
				global_thread_functionArr[i]()
			} catch (err) {}
		}
	}
	for (var i = global_funArr.length - 1; i >= 0; i--) {
		try {
			if (global_funArr[i].del) {
				global_funArr.splice(i, 1);
				continue
			}
			if (global_funArr[i].time <= currTime - global_funArr[i].uTime) {
				if ("string" == typeof global_funArr[i].fStr) {
					eval(global_funArr[i].fStr)
				} else {
					global_funArr[i].fStr()
				} if (0 == global_funArr[i].type) {
					global_funArr.splice(i, 1)
				} else {
					global_funArr[i].uTime = currTime
				}
			}
		} catch (err) {
			global_funArr.splice(i, 1)
		}
	}
	for (var i = global_moveFunArr.length - 1; i >= 0; i--) {
		try {
			var o = global_moveFunArr[i];
			if ("alpha" == o.type) {
				var al = o.obj.getAttribute("al");
				if (null == al) {
					al = 0
				} else {
					al = parseInt(al)
				} if (1 >= Math.abs(o.to - al)) {
					o.obj.setAttribute("al", o.to);
					al = o.to;
					if (null != o.fun) {
						try {
							o.fun()
						} catch (err) {}
					}
					global_moveFunArr.splice(i, 1)
				} else {
					al += (o.to - al) * 0.2
				}
				o.obj.setAttribute("al", al);
				with(o.obj.style) {
					filter = "alpha(opacity=" + al + ")";
					opacity = al / 100;
					if (0 == al) {
						display = "none"
					} else {
						display = ""
					}
				}
			} else {
				if ("width" == o.type) {
					zring_time_move_fun(o, i, o.obj.offsetWidth)
				} else {
					if ("height" == o.type) {
						zring_time_move_fun(o, i, o.obj.offsetHeight)
					} else {
						if ("scrollTop" == o.type || "scrollLeft" == o.type) {
							var num = o.obj[o.type];
							if (2 >= Math.abs(o.to - num)) {
								o.obj[o.type] = o.to;
								if (null != o.fun) {
									try {
										o.fun()
									} catch (err) {}
								}
								global_moveFunArr.splice(i, 1)
							} else {
								var src_num = o.obj[o.type];
								o.obj[o.type] = (num + (o.to - num) / 2);
								if (o.obj[o.type] == src_num) {
									if (null != o.fun) {
										try {
											o.fun()
										} catch (err) {}
									}
									global_moveFunArr.splice(i, 1)
								}
							}
						} else {
							zring_time_move_fun(o, i, 0)
						}
					}
				}
			}
		} catch (err) {
			global_moveFunArr.splice(i, 1)
		}
	}
	if ("undefined" != typeof chat_isWinFocus && chat_isNewMsg) {
		if (!chat_isWinFocus) {
			if (null == chat_oldTitle) {
				chat_oldTitle = document.title
			}
			if (1000 <= currTime - chat_upSetTitleTime) {
				if ("　" == document.title) {
					document.title = chat_o.lan.titleAlert
				} else {
					document.title = "　"
				}
				chat_upSetTitleTime = currTime
			}
		} else {
			chat_isNewMsg = false;
			if (null != chat_oldTitle) {
				document.title = chat_oldTitle;
				chat_oldTitle = null
			}
		}
	}
}

function zring_time_move_fun(o, i, d_num) {
	var num = o.obj.style[o.type];
	if ("" == num || null == num) {
		num = d_num
	} else {
		var indexof = num.indexOf("px");
		if (0 <= indexof) {
			num = parseInt(num.substring(0, indexof))
		}
	} if (2 >= Math.abs(o.to - num)) {
		o.obj.style[o.type] = o.to + "px";
		if (null != o.fun) {
			try {
				o.fun()
			} catch (err) {}
		}
		global_moveFunArr.splice(i, 1)
	} else {
		o.obj.style[o.type] = (num + (o.to - num) / 2) + "px"
	}
}

function z_setTimeout(funStr, time) {
	var retO = {
		fStr: funStr,
		time: time,
		uTime: new Date().getTime(),
		type: 0
	};
	global_funArr.push(retO);
	return retO
}

function z_setInterval(funStr, time) {
	var retO = {
		fStr: funStr,
		time: time,
		uTime: new Date().getTime(),
		type: 1
	};
	global_funArr.push(retO);
	return retO
}

function z_clearInterval(o) {
	if (null != o) {
		o.del = true
	}
}

function debug_movieFun(obj, type, to, fun) {
	for (var i = global_moveFunArr.length - 1; i >= 0; i--) {
		if (global_moveFunArr[i].obj == obj && global_moveFunArr[i].type == type) {
			global_moveFunArr[i].to = to;
			global_moveFunArr[i].fun = fun;
			return
		}
	}
	global_moveFunArr.push({
		obj: obj,
		type: type,
		to: to,
		fun: fun
	})
}
timeFunction();

function zringhost_replaceAll(str, s, t) {
	if (null == str) {
		return str
	}
	if (0 <= str.indexOf(s)) {
		var arr = str.split(s);
		return arr.join(t)
	} else {
		return str
	}
}

function zringhost_formatXML(xmlStr) {
	if (null == xmlStr) {
		return xmlStr
	}
	xmlStr = zringhost_replaceAll(xmlStr, "<", "&lt;");
	xmlStr = zringhost_replaceAll(xmlStr, ">", "&gt;");
	xmlStr = zringhost_replaceAll(xmlStr, '"', "&quot;");
	xmlStr = zringhost_replaceAll(xmlStr, "'", "&apos;");
	return xmlStr
}
var zringhost_Jid = 0;

function zringhost_getJID() {
	var ret = "";
	var r;
	for (var i = 0; i < 8; i++) {
		r = Math.floor(Math.random() * 36);
		r = (r >= 0 && r <= 9) ? (r + 48) : (r + 87);
		ret += String.fromCharCode(r)
	}
	return ret + "_" + (zringhost_Jid++)
}

function zring_getChildByName(node, name) {
	var arr = node.childNodes;
	for (var i = arr.length - 1; i >= 0; i--) {
		if (arr[i].nodeName == name) {
			return arr[i]
		}
	}
	return null
}
var zring_urlCheck = new RegExp("((?:http|https|ftp|mms|rtsp)://(&(?=amp;)|[A-Za-z0-9./=?%_~@&#:;|!+-])+)", "ig");

function zring_checkURL(str) {
	return str.replace(zring_urlCheck, "<a target='_blank' href='$1'>$1</a>")
}

function GozapLogin(resource, urlList) {
	GozapLogin.prototype.PRESENCE = "presence";
	GozapLogin.prototype.MESSAGE = "message";
	var ANONYMOUSREGISTER = "anonymouseRegister";
	var ANONYMOUSLOGIN = "anonymousLogin";
	var LOGINING = "logining";
	var DEFIQTIMEOUT = 60000;
	var sendXMLCatch = [];
	var NONE = 0;
	var SENDED = 1;
	var jid;
	var ip;
	var connectListenerFun;
	var isConned;
	var un, pw, rk;
	if (null == resource) {
		resource = "javascript"
	}
	var zb = new ZHttpBinding(urlList);
	zb.setConnectListener(connectListener);
	var isAnonymous;
	GozapLogin.prototype.anonymousLogin = function() {
		isConned = false;
		zb.startConnect(true);
		reconnectTime = 0;
		isAnonymous = true
	};
	GozapLogin.prototype.sLogin = function(u, p, r) {
		isConned = false;
		un = u;
		pw = p;
		rk = r;
		if (0 < un.indexOf("@")) {
			un = u.substr(0, u.indexOf("@"));
			zb.setTo(u.substr(u.indexOf("@") + 1))
		}
		reconnectTime = 0;
		zb.startConnect(false);
		isAnonymous = false
	};
	GozapLogin.prototype.getJid = function() {
		return jid
	};
	GozapLogin.prototype.getIP = function() {
		return ip
	};
	var listenerFunArr = [];
	GozapLogin.prototype.addEventListener = function(type, fun) {
		for (var i = listenerFunArr.length - 1; i >= 0; i--) {
			if (listenerFunArr[i].type == type) {
				listenerFunArr[i].fun = fun;
				return
			}
		}
		listenerFunArr.push({
			type: type,
			fun: fun
		})
	};
	GozapLogin.prototype.setDebugFun = function(fun) {
		zb.setDebugFun(fun)
	};
	GozapLogin.prototype.setConnectListener = function(fun) {
		connectListenerFun = fun
	};
	GozapLogin.prototype.sendXMLToServer = function(xml, retFun, timeout, cs, reSend, allowBeforeLoginSend) {
		try {
			sendXMLToServer(xml, retFun, timeout, cs, reSend, allowBeforeLoginSend)
		} catch (err) {}
	};
	global_thread_functionArr.push(thread);

	function thread() {
		if (0 < reconnectTime) {
			reconnectTime -= 1000;
			if (0 >= reconnectTime) {
				debug("reconnTime:" + reconnectTime);
				reconnectTime = 0;
				zb.startConnect(isAnonymous)
			}
		}
		for (var i = sendXMLCatch.length - 1; i >= 0; i--) {
			var tmpObj = sendXMLCatch[i];
			if (SENDED == tmpObj.state) {
				sendXMLCatch.split(i, 1)
			} else {
				if (tmpObj.timeout < global_currTime - tmpObj.sendTime) {
					if (null != tmpObj.fun) {
						try {
							tmpObj.fun(zring_createXml('<iq type="error" msg="timeout"><error type="error" code="504">timeout</error></iq>'), tmpObj.xml, tmpObj.cs)
						} catch (err) {
							debug(err)
						}
					}
					sendXMLCatch.split(i, 1)
				}
			}
		}
	}
	var reconnectTime = 0;

	function connectListener(status, xml) {
		if (1 == status) {
			isConned = true;
			if (isAnonymous) {
				var sendXML = '<iq type="set"><bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"><resource>' + resource + "</resource></bind></iq>";
				sendXMLToServer(sendXML, iqResult, 0, ANONYMOUSREGISTER, false, true)
			} else {
				var sendXML = '<iq type="set"><query xmlns="jabber:iq:auth"><username>' + un + "</username><password>" + pw + "</password><version>1.0</version><resource>" + resource + "</resource><randKey>" + rk + "</randKey></query></iq>";
				sendXMLToServer(sendXML, iqResult, 0, LOGINING, false, true)
			}
		} else {
			if (0 == status) {
				isConned = false;
				isLogin = false;
				if (null != connectListenerFun) {
					try {
						connectListenerFun(status, xml)
					} catch (err) {}
				}
				reconnectTime = Math.floor(Math.random() * 30000) + 10000;
				for (var i = sendXMLCatch.length - 1; i >= 0; i--) {
					var tmpObj = sendXMLCatch[i];
					if (SENDED != tmpObj.state) {
						if (null != tmpObj.fun) {
							try {
								tmpObj.fun(zring_createXml('<iq type="error" msg="connect close"><error type="error" code="444">connect close</error></iq>'), tmpObj.xml, tmpObj.cs)
							} catch (err) {
								debug(err)
							}
						}
						tmpObj.state = SENDED
					}
				}
			} else {
				var id = xml.getAttribute("id");
				if (null != id && "" != id) {
					var tmpObj;
					for (var i = sendXMLCatch.length - 1; i >= 0; i--) {
						tmpObj = sendXMLCatch[i];
						if (tmpObj.id == id && SENDED != tmpObj.state) {
							if (null != tmpObj.fun) {
								try {
									tmpObj.fun(xml, tmpObj.xml, tmpObj.cs)
								} catch (err) {
									debug(err)
								}
							}
							tmpObj.state = SENDED;
							return
						}
					}
				}
				var nodeName = xml.nodeName;
				for (var i = listenerFunArr.length - 1; i >= 0; i--) {
					if (listenerFunArr[i].type == nodeName) {
						try {
							listenerFunArr[i].fun(xml)
						} catch (err) {}
						return
					}
				}
			}
		}
	}

	function sendXMLToServer(xml, retFun, timeout, cs, reSend, allowBeforeLoginSend) {
		if (null == timeout || 0 >= timeout) {
			timeout = DEFIQTIMEOUT
		}
		if (typeof xml == "string") {
			xml = zring_createXml(xml)
		}
		var o = {
			xml: xml,
			fun: retFun,
			timeout: timeout,
			cs: cs,
			reSend: reSend,
			reSendNum: 0,
			state: NONE
		};
		var id = xml.firstChild.getAttribute("id");
		o.id = id;
		o.sendTime = global_currTime;
		if (null != retFun) {
			if (null == id || "" == id) {
				id = zringhost_getJID();
				xml.firstChild.setAttribute("id", id)
			}
			o.id = id;
			sendXMLCatch.push(o)
		} else {
			if (undefined != id && "" != id && reSend) {
				sendXMLCatch.push(o)
			} else {
				if (!isConned) {
					sendXMLCatch.push(o)
				}
			}
		}
		zb.send(zring_getXMLString(xml))
	}
	var isLogin;

	function iqResult(res, send, cs) {
		if (ANONYMOUSREGISTER == cs) {
			try {
				jid = zring_getChildByName(zring_getChildByName(res, "bind"), "jid").firstChild.nodeValue;
				if (0 < jid.indexOf("/")) {
					jid = jid.substr(0, jid.indexOf("/"))
				}
			} catch (err) {
				debug(err)
			}
			sendXMLToServer('<iq type="set"><session xmlns="urn:ietf:params:xml:ns:xmpp-session"/></iq>', iqResult, 0, ANONYMOUSLOGIN, false, true)
		} else {
			if (ANONYMOUSLOGIN == cs) {
				try {
					ip = res.getAttribute("ip");
					if (null != connectListenerFun) {
						connectListenerFun(1, res)
					}
				} catch (err) {
					debug(err)
				}
			} else {
				if (LOGINING == cs) {
					if ("result" == res.getAttribute("type")) {
						isLogin = true;
						try {
							if (null != connectListenerFun) {
								connectListenerFun(1, res)
							}
						} catch (err) {
							debug(err)
						}
					} else {
						zb.close()
					}
				}
			}
		}
	}
}

function IQ(type, xmlns) {
	var id = zringhost_getJID();
	var qa = [];
	var to;
	var xml = '<iq type="' + type + '"><query xmlns="' + xmlns + '">';
	IQ.prototype.setQueryAttribute = function(type, value) {
		for (var i = qa.length - 1; i >= 0; i--) {
			if (qa[i].type == type) {
				qa[i].value = value;
				return
			}
		}
		qa.push({
			type: type,
			value: value
		})
	};
	IQ.prototype.setID = function(i) {
		id = i
	};
	IQ.prototype.setTo = function(t) {
		to = t
	};
	IQ.prototype.addItem = function(item) {
		xml += item
	};
	IQ.prototype.getXML = function() {
		var tmpXML = xml + "</query></iq>";
		var retXML = zring_createXml(tmpXML);
		retXML.firstChild.setAttribute("id", id);
		if (null != to) {
			retXML.firstChild.setAttribute("to", to)
		}
		for (var i = qa.length - 1; i >= 0; i--) {
			retXML.firstChild.firstChild.setAttribute(qa[i].type, qa[i].value)
		}
		return retXML
	}
}
var zring_online_user_num_id = 0;
var isBan;

function banChat() {
	isBan = true
}

function JsMucChat(divId, vJid, vNickName, imgPath, urlList, facePath) {
	if (null != vJid && "" != vJid && 0 > vJid.indexOf("@")) {
		vJid += "@gozap.com"
	}
	if (null == imgPath) {
		imgPath = "images/"
	}
	var nickName = "匿名用户";
	var isOnline;
	if (null == facePath) {
		facePath = "http://www.gozap.com/openinwin/images/face/gozap/"
	}
	zring_online_user_num_id++;
	var user_num_id = zring_online_user_num_id;
	var componet = z$(divId);
	componet.innerHTML = "<div style='width:100%;height:100%;background-color:#DFE7F3;'><div style='position:absolute;'></div></div>";
	componet = componet.firstChild;
	thread();
	var connectListenerFun;
	var faceArr = [];
	faceArr.push(":)");
	faceArr.push(":D");
	faceArr.push(";)");
	faceArr.push(":-o");
	faceArr.push(":P");
	faceArr.push("(H)");
	faceArr.push(":@");
	faceArr.push(":S");
	faceArr.push(":$");
	faceArr.push(":(");
	faceArr.push(":'(");
	faceArr.push(":|");
	faceArr.push("(A)");
	faceArr.push("8o|");
	faceArr.push("8-|");
	faceArr.push("+o(");
	faceArr.push("&lt;:o)");
	faceArr.push("|-)");
	faceArr.push("*-)");
	faceArr.push(":-#");
	faceArr.push(":-*");
	faceArr.push("^o)");
	faceArr.push("8-)");
	faceArr.push("(L)");
	faceArr.push("(U)");
	var gl = new GozapLogin(null, urlList);
	gl.setConnectListener(connStatus);
	gl.anonymousLogin();
	gl.addEventListener(gl.PRESENCE, presenceListener);
	gl.addEventListener(gl.MESSAGE, messageListener);
	var customerIndex = 0;
	var mucName = "muc";
	var GET_ROOMINDEX = "getRoomIndex";
	var GET_ONLINEUSERS = "getOnlineusers";
	var loginTime;
	var confIndex;
	var confName;
	var memberId;
	var messages;
	var userImagePath;
	global_thread_functionArr.push(thread);
	var width, height;
	var upGetOnlineUsers = 0;

	function thread() {
		if (width != componet.offsetWidth || height != componet.offsetHeight) {
			width = componet.offsetWidth;
			height = componet.offsetHeight;
			resize()
		}
		if (30000 <= global_currTime - upGetOnlineUsers && isOnline) {
			upGetOnlineUsers = global_currTime;
			getOnlineUsers()
		}
	}
	var msgDiv;
	var msgsDiv;
	var titleDiv;
	var onlineUserSpan;
	var inputDiv;
	var msgDivHeight;
	var sendDiv;
	var toolbarDiv;
	var nickNameInput;
	var faceSelectDiv;

	function resize() {
		if (null == msgDiv) {
			msgDiv = document.createElement("div");
			msgDiv.style.backgroundColor = "#F3F6FB";
			msgDiv.style.position = "absolute";
			msgDiv.style.top = "23px";
			msgDiv.style.left = "5px";
			msgDiv.style.overflow = "auto";
			componet.firstChild.appendChild(msgDiv);
			msgsDiv = document.createElement("div");
			msgDiv.appendChild(msgsDiv)
		}
		msgDivHeight = height - 128;
		msgDiv.style.width = (width - 10) + "px";
		msgDiv.style.height = msgDivHeight + "px";
		if (null == titleDiv) {
			titleDiv = document.createElement("div");
			componet.firstChild.appendChild(titleDiv);
			titleDiv.innerHTML = "<table width='100%' height='1' border=0 cellpadding=0 cellspacing=0><tr><td>&nbsp;</td><td><img src='http://dig.chouti.com/" + imgPath + "chat-new.gif' style='vertical-align:middle;'/></td><td width='100%'><span style='color:#336699;font-size:12px;'><b>&nbsp;新热聊天</b></span></td><td align='right' nowrap><span id='" + user_num_id + "_zring_online_user_id' style='color:#787878;font-size:12px;'> </span></td><td>&nbsp;</td></tr></table>"
		}
		titleDiv.style.width = width + "px";
		if (null == onlineUserSpan) {
			onlineUserSpan = z$(user_num_id + "_zring_online_user_id")
		}
		if (null == inputDiv) {
			inputDiv = document.createElement("div");
			componet.firstChild.appendChild(inputDiv);
			inputDiv.style.position = "absolute";
			inputDiv.style.left = "5px";
			inputDiv.style.backgroundColor = "#ffffff";
			inputDiv.innerHTML = "<textarea style='border:0;resize:none;font-size:12px;outline:none;'></textarea>"
		}
		inputDiv.style.top = (msgDiv.offsetTop + msgDiv.offsetHeight + 30) + "px";
		inputDiv.style.width = (width - 10) + "px";
		inputDiv.style.height = (height - inputDiv.offsetTop - 5) + "px";
		inputDiv.firstChild.style.width = (inputDiv.offsetWidth - 75) + "px";
		inputDiv.firstChild.style.height = (inputDiv.offsetHeight - 5) + "px";
		inputDiv.firstChild.onkeydown = inputKeyListener;
		if (null == sendDiv) {
			sendDiv = document.createElement("div");
			sendDiv.innerHTML = "<table border=0 cellpadding=0 cellspacing=0 width=62 height=42><tr><td align='center' style='font-size:12px;color:#336699;' bgColor='#F3F6FB'>发送</td></tr></table>";
			sendDiv.style.border = "2px solid #DFE7F2";
			sendDiv.style.cursor = "pointer";
			sendDiv.style.cursor = "hand";
			sendDiv.style.position = "absolute";
			sendDiv.onclick = sendClick;
			componet.firstChild.appendChild(sendDiv)
		}
		sendDiv.style.top = (height - 20 - sendDiv.offsetHeight) + "px";
		sendDiv.style.left = (width - 10 - sendDiv.offsetWidth) + "px";
		if (null == toolbarDiv) {
			toolbarDiv = document.createElement("div");
			toolbarDiv.style.position = "absolute";
			toolbarDiv.style.left = "5px";
			componet.firstChild.appendChild(toolbarDiv);
			toolbarDiv.innerHTML = "<table width='100%' border=0 height='1' cellpadding=0 cellspacing=0><tr><td><input style='width:100px;border:0;color:#999;height:20px;line-height:20px;background-color:#fff' id='" + user_num_id + "_mucchat_name_input'></input></td>" + ((null == vJid) ? "" : "<td style='padding-left:10px;'><input type='checkbox' id='" + user_num_id + "_muc_checkbox' style='display:none;'/></td><td style='color:#336699;font-size:12px;' nowrap valign='middle'><label for='" + user_num_id + "_muc_checkbox' style='display:none;'>匿名</label></td>") + "<td width='100%' align='right' valign='middle' style='padding-right:15px;'><img id='" + user_num_id + "_imgselect' src='http://dig.chouti.com/" + imgPath + "1.png' style='vertical-align:middle;cursor:pointer;cursor:hand;'/></td></tr></table>"
		}
		if (null == nickNameInput) {
			nickNameInput = z$(user_num_id + "_mucchat_name_input");
			if (null == vJid) {} else {
				nickNameInput.disabled = "disabled";
				z$(user_num_id + "_muc_checkbox").onchange = nickNameSelect
			}
			z$(user_num_id + "_imgselect").onclick = imgSelectClick;
			showNickname()
		}
		toolbarDiv.style.width = msgDiv.offsetWidth + "px";
		toolbarDiv.style.top = (msgDiv.offsetTop + msgDiv.offsetHeight + 5) + "px";
		if (null == faceSelectDiv) {
			faceSelectDiv = document.createElement("div");
			faceSelectDiv.style.display = "none";
			faceSelectDiv.style.cssText = "position:absolute;left:5px;background-color:#F5F5F5;border:1px solid #6699CC;";
			var faceHtml = "<table width='100%' height='1' border=0 cellpadding=0 cellspacing=2><tr>";
			for (var i = 1; i <= 25; i++) {
				faceHtml += "<td style='cursor:pointer;cursor:hand;'><img src='http://dig.chouti.com/" + facePath + i + ".png' width='26' height='26' faceI='" + (i - 1) + "' style='border:1px solid #F5F5F5;'/></td>";
				if (0 == i % 9) {
					faceHtml += "</tr><tr>"
				}
			}
			faceHtml += "</tr></table>";
			componet.firstChild.appendChild(faceSelectDiv);
			faceSelectDiv.innerHTML = faceHtml;
			var nodeArr = faceSelectDiv.firstChild.firstChild.childNodes;
			for (var i = nodeArr.length - 1; i >= 0; i--) {
				var tmpArr = nodeArr[i].childNodes;
				for (var j = tmpArr.length - 1; j >= 0; j--) {
					tmpArr[j].onclick = selectFace;
					tmpArr[j].onmouseover = selectFaceOver
				}
			}
			debug_movieFun(faceSelectDiv, "alpha", 0)
		}
		faceSelectDiv.style.width = msgDiv.offsetWidth + "px";
		faceSelectDiv.style.top = (toolbarDiv.offsetTop - faceSelectDiv.offsetHeight) + "px"
	}

	function selectFace(e) {
		var faceI = e.target.getAttribute("faceI");
		hiddenFaceSelect();
		inputDiv.firstChild.value += faceArr[faceI];
		inputDiv.firstChild.focus()
	}
	var upSelectFaceOver;

	function selectFaceOver(e) {}

	function hiddenFaceSelect() {
		debug_movieFun(faceSelectDiv, "alpha", 0)
	}

	function showFaceSelect() {
		faceSelectDiv.style.display = "";
		debug_movieFun(faceSelectDiv, "alpha", 100)
	}

	function showNickname() {
		if (null == memberId) {
			memberId = ""
		}
		if (null == vJid || "" == vJid) {
			nickNameInput.value = nickName + memberId
		} else {
			if (z$(user_num_id + "_muc_checkbox").checked) {
				nickNameInput.value = nickName + memberId
			} else {
				nickNameInput.value = vNickName
			}
		}
	}

	function imgSelectClick(e) {
		if ("" == faceSelectDiv.style.display) {
			hiddenFaceSelect()
		} else {
			showFaceSelect()
		}
	}

	function nickNameSelect(e) {
		if (e.target.checked) {
			nickNameInput.disabled = ""
		} else {
			nickNameInput.disabled = "disabled"
		}
		showNickname()
	}

	function sendClick() {
		sendMessage()
	}

	function getIsEnd() {
		if (getConsoleHeight() < msgDivHeight) {
			return true
		}
		return (msgDiv.scrollTop == (getConsoleHeight() - msgDivHeight))
	}

	function getConsoleHeight() {
		return msgsDiv.offsetHeight
	}

	function inputKeyListener(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			sendMessage()
		}
	}

	function sendMessage() {
		if (!isOnline) {
			alert("当前未连接到服务器，无法发送消息:(");
			return
		}
		if (null == vJid) {
			alert("未登录不可以发送消息:(");
			return
		}
		if (isBan) {
			alert("你已经被封禁了，不可以发言咯~不好意思啦:P");
			return
		}
		var sendStr = inputDiv.firstChild.value.trim();
		inputDiv.firstChild.value = "";
		if ("" == sendStr) {
			return
		}
		if (255 < sendStr.length) {
			sendStr = sendStr.substr(0, 255)
		}
		if (null == vJid) {
			vJid = ""
		}
		var sendVJid = vJid;
		if ("" != sendVJid && z$(user_num_id + "_muc_checkbox").checked) {
			sendVJid = ""
		}
		if (null == userImagePath) {
			userImagePath = ""
		}
		var sendNickName = nickNameInput.value;
		if (10 < sendNickName.length) {
			sendNickName = sendNickName.substr(0, 10)
		}
		var msg = '<message type="groupchat" to="' + confName + '"><body>' + zringhost_formatXML(sendStr) + '</body><html xmlns="http://www.w3.org/1999/xhtml"><body>' + zringhost_formatXML(sendStr) + '</body></html><x xmlns="jabber:x:groupNickname"><imgPath>' + zringhost_formatXML(userImagePath) + "</imgPath><nickName>" + zringhost_formatXML(sendNickName) + "</nickName><jid>" + gl.getJid() + "</jid><realJid>" + zringhost_formatXML(sendVJid) + "</realJid><ip>" + gl.getIP() + "</ip></x></message>";
		gl.sendXMLToServer(msg);
		if (null == memberId) {
			memberId = ""
		}
		addMessage(gl.getJid(), sendVJid, userImagePath, sendStr, sendNickName, gl.getIP(), (new Date().getTime()));
		toEnd();
		inputDiv.firstChild.focus()
	}

	function addMessage(jid, vJid, imgPath, content, name, ip, createTime) {
		var isEnd = getIsEnd();
		var inMsgDiv = document.createElement("div");
		inMsgDiv.style.cssText = "opacity:0;";
		var nameHtml;
		content = zring_checkURL(content);
		for (var i = faceArr.length - 1; i >= 0; i--) {
			content = zringhost_replaceAll(content, faceArr[i], "<img src='http://dig.chouti.com/" + facePath + (i + 1) + ".png' width='26' height='26'/>");
			if ("&lt;:o)" == faceArr[i]) {
				content = zringhost_replaceAll(content, "&amp;lt;:o)", "<img src='http://dig.chouti.com/" + facePath + (i + 1) + ".png' width='26' height='26'/>");
				content = zringhost_replaceAll(content, "<:o)", "<img src='http://dig.chouti.com/" + facePath + (i + 1) + ".png' width='26' height='26'/>")
			}
		}
		var d = new Date(createTime);
		var h = d.getHours();
		var m = d.getMinutes();
		if (10 > h) {
			h = "0" + h
		}
		if (10 > m) {
			m = "0" + m
		}
		var timeStr = h + ":" + m;
		if (null != vJid && "" != vJid) {
			var tmpVJid = vJid;
			if (0 < tmpVJid.indexOf("@")) {
				tmpVJid = tmpVJid.substr(0, tmpVJid.indexOf("@"))
			}
			nameHtml = "<div style='padding-left:10px;font-size:12px;'><a href='http://dig.chouti.com/user/" + tmpVJid + "' style='color:#336699;text-decoration:none;' target='_blank'>" + name + "</a>&nbsp;<span style='color:#979B9E'>" + timeStr + "</span></div>"
		} else {
			if (null != ip && "" != ip) {
				ipArr = ip.split(".");
				ipArr[ipArr.length - 1] = "*";
				ip = ipArr.join(".");
				timeStr += "&nbsp;" + ip
			}
			nameHtml = "<div style='font-size:12px;'><span style='color:#979B9E;padding-left:5px;'>" + name + "</span>&nbsp;<span style='color:#979B9E'>" + timeStr + "</span></div>"
		}
		var contHtml = "<div style='font-size:12px;padding-left:20px;padding-top:10px;padding-bottom:10px;word-wrap: break-word; break-word: break-all;'>" + content + "</div>";
		inMsgDiv.innerHTML = nameHtml + contHtml;
		msgsDiv.appendChild(inMsgDiv);
		var childArr = msgsDiv.childNodes;
		var childLen = childArr.length;
		if (300 < childLen) {
			for (var i = 100; i >= 0; i--) {
				msgsDiv.removeChild(childArr[0])
			}
		}
		inMsgDiv.style.width = (msgsDiv.offsetWidth - 20) + "px";
		debug_movieFun(inMsgDiv, "alpha", 100);
		if (isEnd) {
			toEnd()
		}
	}

	function toEnd() {
		msgDiv.scrollTop = getConsoleHeight() - msgDivHeight
	}

	function presenceListener(xml) {
		var mbId = zring_getChildByName(zring_getChildByName(xml, "x"), "memberId").firstChild.nodeValue;
		if (null != mbId && "" != mbId) {
			if (null == memberId || "" == memberId) {
				setNickname()
			}
			memberId = mbId;
			showNickname()
		}
	}

	function getNodeValue(node, nodeName) {
		try {
			return zring_getChildByName(node, nodeName).firstChild.nodeValue
		} catch (err) {}
		return ""
	}

	function messageListener(xml) {
		if (0 == messages) {
			msgsDiv.innerHTML = ""
		}
		messages++;
		try {
			var x = zring_getChildByName(xml, "x");
			addMessage(getNodeValue(x, "jid"), getNodeValue(x, "realJid"), getNodeValue(x, "imgPath"), getNodeValue(xml, "body"), getNodeValue(x, "nickName"), getNodeValue(x, "ip"), xml.getAttribute("timestamp") * 1000)
		} catch (err) {}
	}

	function connStatus(status, xml) {
		if (1 == status) {
			messages = 0;
			gl.sendXMLToServer("<presence><status>Available</status><priority>1</priority></presence>");
			try {
				iq = new IQ("get", "jabber:iq:mucAnonyRoom");
				iq.setTo(mucName + ".gozap.com");
				iq.setQueryAttribute("actionType", "getRoomIndex");
				iq.addItem("<item><customerIndex>" + customerIndex + "</customerIndex></item>");
				gl.sendXMLToServer(iq.getXML(), iqResult, 0, GET_ROOMINDEX)
			} catch (err) {}
		} else {
			if (0 == status) {
				messages = 0;
				isOnline = false
			}
		}
	}

	function iqResult(res, send, cs) {
		if (cs == GET_ROOMINDEX) {
			try {
				loginTime = new Date().getTime();
				var tmpItem = zring_getChildByName(zring_getChildByName(res, "query"), "item");
				confIndex = zring_getChildByName(tmpItem, "confIndex").firstChild.nodeValue;
				confName = zring_getChildByName(tmpItem, "confName").firstChild.nodeValue;
				getOnlineUsers();
				setNickname();
				isOnline = true
			} catch (err) {}
		} else {
			if (cs == GET_ONLINEUSERS) {
				try {
					users = zring_getChildByName(zring_getChildByName(zring_getChildByName(res, "query"), "item"), "onlineUsers").firstChild.nodeValue
				} catch (err) {}
			}
		}
	}

	function getOnlineUsers() {
		var iq = new IQ("get", "jabber:iq:mucAnonyRoom");
		iq.setTo(mucName + ".gozap.com");
		iq.setQueryAttribute("actionType", "getOnlineusers");
		iq.addItem("<item><roomIndex>" + confIndex + "</roomIndex></item>");
		gl.sendXMLToServer(iq.getXML(), iqResult, 0, GET_ONLINEUSERS)
	}

	function setNickname() {
		var sendNickName = nickName;
		if (null != memberId && "" != memberId) {
			sendNickName += memberId
		}
		var pres = "<presence xmlns='jabber:client' type='available' to='" + mucName + ".gozap.com'><priority>1</priority><x xmlns='jabber:x:mucUser' type='available'><confType>anonymous</confType><confIndex>" + confIndex + "</confIndex><mainNick>" + sendNickName + "</mainNick>" + ((0 != messages) ? "<reconnect>1</reconnect>" : "") + "</x></presence>";
		gl.sendXMLToServer(pres)
	}
	JsMucChat.prototype.setDebugFun = function(fun) {
		gl.setDebugFun(fun)
	};
	JsMucChat.prototype.setConnectListener = function(fun) {
		connectListenerFun = fun
	}
};