var crudapp = new function(){
	
	// 수강데이터를 담을 json 배열 만들기
	
	this.myClass=[
 		{Id:'1', ClassName:'운영체제', Category:'전공필수', Credit:3},
		{Id:'2', ClassName:'컴퓨터구조론', Category:'전공선택', Credit:4},
		{Id:'3', ClassName:'심리학의 이해', Category:'교양필수', Credit:2},
	]
	
	//선택할수있는데 항목 미리 정의
	this.Category=['전공필수', '전공선택', '교양필수','교양선택']
	
	//테이블 hh(제목/테이블헤더)에 담길 데이터, 확장성을 위해 배열에 담기.

	this.col=[];

	//위의 데이터를 기준으로 실제로 테이블을 만들어줌
	this.createTable= ()=>{
		
		
		//myclass 객체 순회
		 for (var a=0; a<this.myClass.length; a++){
			 for(var key in this.myClass[a]){
			 //indexof 문자열속의 문자열 검색, 그런데 매치된 값이 없으면 -1 반환.
			 	if(this.col.indexOf(key) === -1) this.col.push(key);
			 }
		}
	// col에 th에 해당하는 데이터 (key)를 넣어주는 코드

	var table= document.createElement('table');
	table.setAttribute('id','classTable');
	
	var tr = table.insertRow(-1);
	
	//th
	
	for(var h=0; h<this.col.length; h++){
		var th = document.createElement('th');
		th.innerHTML = this.col[h];
		tr.appendChild(th);
	}
	
	//td
	for(var j=0; j <this.myClass.length; j++){
		tr = table.insertRow(-1);
		for(var p=0; p <this.col.length; p++){
			var tablecell = tr.insertCell(-1);
			tablecell.innerHTML=this.myClass[j][this.col[p]];
		}
		
		//버튼 만들기 (업데이트버튼/save버튼 toggle)
		
		this.td = document.createElement('td');
		tr.appendChild(this.td);
		
		//update
		var btn = document.createElement('input');
		 btn.setAttribute('type','button');
		 btn.setAttribute('id','Edit'+j);
		 btn.setAttribute('style','background-color:#44CCEB; border:none; padding:5px;');
		 btn.setAttribute('value','update');
		 btn.setAttribute('onclick','crudapp.update(this)');
		 this.td.appendChild(btn);
		
		//save		
		var btnsave = document.createElement('input');
		 btnsave.setAttribute('type','button');
		 btnsave.setAttribute('id','save'+j);
		 btnsave.setAttribute('style','display:none;');
		 btnsave.setAttribute('value','save');
		 btnsave.setAttribute('onclick','crudapp.save(this)');
		 this.td.appendChild(btnsave);
		
		
		//delete		
		this.td = document.createElement('td');
		tr.appendChild(this.td);
		var btndelete = document.createElement('input');
		 btndelete.setAttribute('type','button');
		 btndelete.setAttribute('id','delete'+j);
		 btndelete.setAttribute('style','background-color:#ED5658; border:none; padding:5px;');
		 btndelete.setAttribute('value','delete');
		 btndelete.setAttribute('onclick','crudapp.delete(this)');
		 this.td.appendChild(btndelete);
	}		
		
		tr = table.insertRow(-1);
		
		for(var z=0;z<this.col.length;z++){
			var newcell = tr.insertCell(-1);	
				if(z>=1){
					if(z==2){
							//선택항목 만들기 옵션을 select로 감싸 선택할수있게 만들기!
							var select = document.createElement('select');
							select.innerHTML='<option value=" "></option>';
							//첫칸은 빈칸. 디폴트 칸을 만들어줘야함.
								for(var q =0; q<this.Category.length;q++){
									select.innerHTML += `<option value=${this.Category[q]}>${this.Category[q]}</option>`	
								}
							newcell.appendChild(select);
							}
						else{
							var tBox = document.createElement('input');
							tBox.setAttribute('type','text');
							tBox.setAttribute('value','');
							newcell.appendChild(tBox);
						}
				}
		}
		
		//add 버튼
		
		this.td = document.createElement('td');
		tr.appendChild(this.td);
		var btnadd = document.createElement('input');
		 btnadd.setAttribute('type','button');
		 btnadd.setAttribute('id','add'+j);
		 btnadd.setAttribute('style','background-color:orangered; border:none; padding:5px;');
		 btnadd.setAttribute('value','add');
		 btnadd.setAttribute('onclick','crudapp.add(this)');
		 this.td.appendChild(btnadd);
		
		
	var div = document.getElementById('cover');
	div.innerHTML = '수강관리 앱';
	div.appendChild(table);
		
	}
	
	}

crudapp.createTable();

