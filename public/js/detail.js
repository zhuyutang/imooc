$(function(){
	$('.comment').click(function(e){
		var target = $(this)
		var toId = target.data('tid')
		var commentId = target.data('cid')//data是jquery的方法

		if($('#toId').length > 0){
			$('#toId').val(toId)
		}else{

			$('<input>').attr({//如果$(str)中的str是html元素，则创建新的元素
				type:'hidden',
				id : 'toId',
				name:'comment[tid]',
				value: toId
			}).appendTo("#commentForm")
		}

		if($('#cId').length > 0){
			$('#commentId').val(commentId)
		}else{
			$('<input>').attr({
				type:'hidden',
				id:'commentId',
				name:'comment[cid]',
				value: commentId
			}).appendTo("#commentForm")
		}

	})
})