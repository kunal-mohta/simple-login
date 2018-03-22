$(function(){
	var baseaddress = 'localhost:3000';
	//ajax request to get all users
	$.ajax({
		type:'GET',
		url:'http://'+baseaddress+'/admin/',
		complete:function(xhr,textstatus){
			var userArray = xhr.responseJSON;

			for(i=0;i<userArray.length;i++){
				var tr = document.createElement("tr");

				var td1 = document.createElement("td");
				td1.innerHTML = userArray[i].username;

				var td2 = document.createElement("td");
				td2.innerHTML = userArray[i].password;

				var td3 = document.createElement("td");
				var deleteButton = document.createElement("button");
				deleteButton.setAttribute("class", "delete");
				deleteButton.innerHTML = "Delete";
				td3.appendChild(deleteButton);

				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);

				$('tbody')[0].appendChild(tr);
			}


			$('.delete').on("click",function(e){
				e.preventDefault();

				var username = e.target.parentNode.parentNode.childNodes[0].innerHTML;
				var password = e.target.parentNode.parentNode.childNodes[1].innerHTML;
				
				//ajax request to delete a user
				$.ajax({
					type:'DELETE',
					url:'http://'+baseaddress+'/admin/',
					data:{username:username},
					complete:function(xhr,textstatus){
						e.target.parentNode.parentNode.remove();
					},
					error:function(xhr,textstatus,err){
						alert("Error: Unable to delete. Try again.");
					}
				});
			});
		},
		error:function(xhr,textstatus,err){
			document.write('Unable to fetch data from database. Please check your connection to the server.');
		}
	});

});