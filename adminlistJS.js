let form = document.querySelector('.form');
let res = document.querySelector('#result');
let button = document.querySelectorAll('.changeStatus');
let span = document.querySelector('#result');
let area = document.querySelectorAll('.commentArea');
let buttonToday = document.querySelectorAll('.buttonToday');
let buttonTomorrow = document.querySelectorAll('.buttonTomorrow');
let databutton = document.querySelectorAll('.buttonData');
let calendar = document.querySelector('#calendar');

    button.forEach(function(item,i){
      item.onclick = function (e) {
        let id = this.dataset.id;
        valueArea(id);

      }	
    })
  	
 let q = new Date();
 	let month = q.getMonth();	
	let year = q.getFullYear();
	let data = q.getDate();
	var day = new Date(year,month,data);
	var day1 = new Date(year,month,data);
	var day2 = new Date(year,month,data);
	day2.setDate(day2.getDate()+1);
	let now2 = day2.toLocaleString('ru', 
	{ 
		month: 'long',
		day: 'numeric', 
		year: 'numeric',
	});
	day1.setDate(day1.getDate());
	let now1 = day1.toLocaleString('ru', 
	{ 
		month: 'long',
		day: 'numeric', 
		year: 'numeric',
	});
	day.setDate(day.getDate()+ 9);
	let now = day.toLocaleString('ru', 
	{ 
		month: 'long',
		day: 'numeric', 
		year: 'numeric',
	});
    	
    	for(let i = 0; i < buttonToday.length; i++){
    		buttonToday[i].onclick = function(){
    		 	area[i].value += "Посылка в пути; Дата доставки:"+ now1;
    		}
    	}

    	for(let i = 0; i < buttonTomorrow.length; i++){
    		buttonTomorrow[i].onclick = function(){
    		 	area[i].value += "Посылка в пути; Дата доставки:"+ now2;
    		}
    	}

    	for(let i = 0; i < databutton.length; i++){
    			databutton[i].onclick = function(){
    		 		area[i].value += "Линзы заказаны, приблизительная дата доставки:" + now;
    		}
    	}




    

function valueArea(id){
for(let i = 0; i < area.length; i++){	
	if(area[i].value ){
	let v = area[i].value;
	area[i].value = '';
	sendInfo(id,v)
	break;
	}	
}
}


function sendInfo(id,value){
	let v = value;
	var formData = new FormData(form);
        formData.append('key', id);
        formData.append('val', v);
        ajaxPost(formData);	

        for (var pair of formData.entries())
{
 console.log(pair[0]+ ', '+ pair[1]); 
}
}


function ajaxPost(params){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === 4 && request.status === 200){
			span.innerHTML = request.responseText;
			if(request.responseText == '1'){
				location.reload()
			}
		}
	}
	request.open('POST', 'adminlistPHP.php');
	request.send(params);	
}

