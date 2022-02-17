$(function() {
	var path = './note',html = '';
	var ls = window.localStorage;
	var j = 1;
	var arr = new Array();
	for (var i = 0; i < ls.length; i++) {
		
		if(ls.key(i).substring(0,5) == 'title'){
		
			arr.push(ls.key(i).substring(5,ls.key(i).length));
		}
		
	}
	console.log(arr);
	arr.sort(function(a,b){  //自定义函数排序  
		var a1= parseInt(a);  
		var b1= parseInt(b);  
		if(a1<b1){  
			return -1;  
		}else if(a1>b1){  
			return 1;  
		}  
		return 0;  
	}); 

	for (var i = 0; i < arr.length; i++) {
		
		var getVal=ls.getItem('title'+arr[i]); 
		html += '<li rel="' + arr[i].toString()  + '">' + getVal + '</li>';

	}
	var editor;

	
	$(".content textarea").attr('disable',true);	

	$(".menu-list").append(html)

	$("#title").attr('disable',true);

	function activeClass() {
		$(".menu").hover(function() {
			$(this).addClass('active');
			$(".node-box").addClass('active');
		}, function() {
			$(this).removeClass('active');
			$(".node-box").removeClass('active');
		})
		$(".menu-list li,.menu-add").hover(function() {
			$(this).addClass('hover');
		}, function() {
			$(this).removeClass('hover');
		})
		
	};
	activeClass();
	$("#add").on("click", function() {
		var i = 0;
		if (1 == parseInt($('.menu-list li').length)) {
			i = 0;
		}else{
			var li= $('.menu-list li:last').attr('rel');
			i = parseInt(li) + 1;
		}
		
		ls.setItem('title'+i, '新建笔记'+i);
		var html = '<li rel="' + i + '">' + ls['title' + i] + '</li>'
		$(".menu-list").append(html);
		ls.setItem('node'+i, '');
		window.location.href="popup.html";
	})
	$("#del").on("click", function() {
		var li = $(".menu-list li[class='active']");
		var i = li.attr('rel');
		ls.removeItem('node' + i);
		ls.removeItem('title' + i);
		li.slideUp();
		li.removeClass('active')
	});

	$("#save").on("click", function() {

		var li = $(".menu-list li[class='active']");
		var i = li.attr('rel');
		if(i){
			var title = $("#title").val();
			var content = $("textarea").val()
			ls.setItem("title"+i,title);
			ls.setItem("node"+i,content);
			$(".menu-list li[class='active']").text(title);
		}
		
		
	});


	$(".menu-list li").on("click", function() {
		$(".menu-list li").removeClass('active');
		$(this).addClass('active');
		var i = $(this).attr('rel');
		$(".content textarea").val(ls['node' + i]);
		
		$("#title").val($(this).text());
		
		editor = editormd("test-editor", {
			width  : "100%",
			height : "100%",
			path   : "editormd/lib/",
			saveHTMLToTextarea : true
		
		});

	});
	$("#title").focus(function() {
		$(this).addClass("active");
	})
	$("#title").blur(function() {
		$(this).removeClass('active');
	})
	

})