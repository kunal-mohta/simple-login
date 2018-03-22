$(function(){
    var baseaddress = 'localhost:3000'
	$('#login').click(function(e){
		e.preventDefault();
		
		var username = $('#username').val(), password = $('#password').val();

		//ajax request for login
		$.ajax({
			type:'POST',
			url:'http://'+baseaddress+'/login/',
			data:{
				username:username,
				password:password
			},
			// success:function(data,textstatus,xhr){
			// 	console.log(xhr);
			// },
			complete:function(xhr,textstatus){
				$('#resMsg').text(xhr.responseText);
			},
			error:function(xhr,textstatus,err){
				$('#resMsg').text("Request could not be sent. Please check your connection to the server.");
			}
		});
	});

	$('#signup').click(function(e){
		e.preventDefault();

		var username = $('#username').val(), password = $('#password').val();

		//ajax request for signup
		$.ajax({
			type:'POST',
			url:'http://'+baseaddress+'/signup/',
			data:{
				username:username,
				password:password
			},
			complete:function(xhr,textstatus){
				$('#resMsg').text(xhr.responseText);
			},
			error:function(xhr,textstatus,err){
				$('#resMsg').text("Request could not be sent. Please check your connection to the server.");
			}
		})
	})

});