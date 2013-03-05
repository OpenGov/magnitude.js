// Note SampelJScript.js might not run, it's primary used as a source code input to JSizzle
var fs = require('fs'),
	JSON_code_object,
	obj = require('sampleCode');
var x = 1,
	y = 2,
	w = 3
if (x>y){
    var w = 1;
}
else{
    var w = 0;
    var w = 0;
    if (x>y){
        var w = 1;
    }
    function testfunction12(x,y){
    	return x+y
	}
	console.log(testfunction12(100,200))
}
var temp1 = 1;
var temp2 = 2; 
for (temp1 = 1; temp1<10; temp1++){ 
    console.log(temp1);
} 

//Complexity O(n^9)
function loopfunction0(x,y){
	loopfunction2(1,2);
	whilefunction(x,y);
	switchfunction();
	ForInfunction();
	x = 1;
} 

//Complexity O(n^8)
function loopfunction1(x,y){
	loopfunction2(1,2);
	whilefunction(x,y);
	x = 1;
} 

//Complexity O(n^0)
function input_call_fun(){
	var x = whilefunction(2*x,whilefunction,loopfunction3);
	y = IfElsefunction(2*x,loopfunction3);
}

//Complexity O(n^7)
function loopfunction2(x,y){
    for(temp1=1;temp1<10;temp1++){
    	for(temp1=1;temp1<10;temp1++){
    		while (i<5)
  			{
  				x=x + "The number is " + i + "<br>";
  				i++;
  				loopfunction3(2.3)
  			}
		}
	}
} 

//Complexity O(n^4)
function loopfunction3(x,y){
    for(temp1=1;temp1<10;temp1++){
    	for(temp1=1;temp1<10;temp1++){
    		while (i<5)
  			{
  				for (x in person){
  					txt=txt + person[x];
  				}
  			}
		}
	}
}

//Complexity O(n^8)
function whilefunction(x,y){
	while (i<5)
  	{
  		x=x + "The number is " + i + "<br>";
  		loopfunction2(1,2);
  		i++;
  	}
  	function inside1function(){
		function inside2function(){
			IfElsefunction();
  			function inside3function(){
  				loopfunction3(1,2);
  			}
  			return 2;
  		}  	
  		return 1;
  	}
} 

//Complexity O(n^8) 
function switchfunction(){
	switch (day){
		case 0:
  			loopfunction1();
  			break;
		case 1:
  			loopfunction2();
  			break;
		case 2:
  			loopfunction3();
  			break;
		case 3:
  			x="Today it's Wednesday";
  			break;
	}
}

//Complexity O(n^9) 
function ForInfunction(){
	for (x in person){
  		txt=txt + person[x];
  		loopfunction1()
  	}
}

//Complexity O(1)
function IfElsefunction(){
	if (time<20){
  		x="Good day";
  	}else{
  		x="Good evening";
  	}  	
  	if(time<10){
  		x="Good Morning";
  	}
}

for(temp1=1;temp1<10;temp1++){
    testfunction(temp1,1);
}

//Complexity O(1)
function sample(){
	testfunction(2,3);
	esprima.parse(input_file_string);
	fs.readFileSync(input_file);
	obj.read(input_file);
	array.sort(testfunction);
}

// O(1)
function anonymous_handler(input,anon_func){ // Cannot figure out the complexity here suggestion ???
	anon_fun(input);
}

// O(1)
function call_anonymous_handler(){
	anonymous_handler(2,function(input){input = input + 1;})
}

// O(8)
function var_func(){
	func_name2 = loopfunction1;
	func_name = function(){
		//loopfunction1();
		function test_inside_anon(input){
			//loopfunction1();
		}
	}
}

//O(n^4)
(function(X,Y){
	func_name2 = loopfunction3;
	func_name = function(){
		//loopfunction1();
		function test_inside_anon(input){
			//loopfunction1();
		}
	}
}(2,3));

/*
Running JSizzle Agasint This File Outputs the Following:
>>	Function              'loopfunction0' is O(n^9)
>>	Function              'loopfunction1' is O(n^8)
>>	Function             'input_call_fun' is O(n^16)
>>	Function              'loopfunction2' is O(n^7)
>>	Function              'loopfunction3' is O(n^4)
>>	Function              'whilefunction' is O(n^8)
>>	Function             'switchfunction' is O(n^8)
>>	Function              'ForInfunction' is O(n^9)
>>	Function             'IfElsefunction' is O(1)
>>	Function                     'sample' is O(1)
>>	Function          'anonymous_handler' is O(1)
>>	Function     'call_anonymous_handler' is O(1)
>>	Function                   'var_func' is O(n^8)
>>	Function           '_CallExpression_' is O(n^4)
*/