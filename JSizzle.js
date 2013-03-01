var	fs = require('fs'),
	esprima = require('esprima'),
	JSON_input_file,
	input_file = 'test/SampleJScript.js' , 
	func_name = '',
	dive = '';	
	
/*
	Input: a JSON code object or an array of JSON code objects 
	Ouput: returns its complexity, in case of array returns the highest complexity amongst the
*/
function getcomplexity_(JSON_code){
	var complexity,
		maxcomplexity,
		i;			
		
	// In case JSON_object is a null
	if(JSON_code==null){
		return 0; 
	}
		
	// In case JSON_code is a program
	if(JSON_code.type == 'Program'){
		return getcomplexity_(JSON_code.body);
	}
	
		// In case JSON_code is a block of code 
	if(JSON_code.type == 'BlockStatement'){
		return getcomplexity_(JSON_code.body);
	}	

	// In case JSON_code is a For loop 
	if(JSON_code.type == 'ForStatement'){
		return 1 + getcomplexity_(JSON_code.body);
	}	

	// In case JSON_code is a while loop 
	if(JSON_code.type == 'WhileStatement'){
		return 1 + getcomplexity_(JSON_code.body);
	}	
	      
	// In case JSON_code is a For In loop 
	if(JSON_code.type == 'ForInStatement'){
		return 1 + getcomplexity_(JSON_code.body);
	}
	
	// In case JSON_code is a single name of a function
	if(JSON_code.type == 'Identifier'){
		return getcomplexity_(getfuncJSONblock_(JSON_code.name,JSON_input_file));
	}
	
	// In case JSON_code is a anonymous function declaration
	if(JSON_code.type == 'FunctionExpression'){			
		return getcomplexity_(JSON_code.body);
	}
				
	// In case JSON_code is a function declaration
	if(JSON_code.type == 'FunctionDeclaration'){			
		return getcomplexity_(JSON_code.body);
	}
	
	                    
	// In case JSON_code is an assignement calcualte the right statement
	if(JSON_code.type == 'ExpressionStatement'){
		if(JSON_code.hasOwnProperty('expression')){
			if(JSON_code.expression.type == 'AssignmentExpression'){		
				return getcomplexity_(JSON_code.expression.right);
			}
		}
	}
				
	// In case JSON_code is a Switch Statement 
	if(JSON_code.type == 'SwitchStatement'){
		maxcomplexity = 0;
		for(i=0;i<JSON_code.cases.length;i++){
			complexity = getcomplexity_(JSON_code.cases[i].consequent); 
			if(complexity > maxcomplexity){
				maxcomplexity = complexity;
			}		
		}
		return maxcomplexity;
	}			

	// In case JSON_code is a If/Else statement 
	if(JSON_code.type == 'IfStatement'){
		complexity = getcomplexity_(JSON_code.Consequent)
		var complexitytemp = getcomplexity_(JSON_code.alternate)
		if(complexitytemp > complexity){
			return complexitytemp;
		}else{
			return complexity;
		}
	}
	
	// In case JSON_code is an array of code objects
	if(JSON_code instanceof Array){
		maxcomplexity = 0;		
		for(i=0;i<JSON_code.length;i++){			
			//console.log("array["+i+"] : "+JSON.stringify(JSON_code[i] , null, 4));
			complexity = getcomplexity_(JSON_code[i]); 
			if(complexity > maxcomplexity){
				maxcomplexity = complexity;
			}
		}
		return maxcomplexity;
	}
	
	// In case JSON_code is a function call 
	if(JSON_code.type == 'ExpressionStatement'){			
		if(JSON_code.hasOwnProperty('expression')){
			if(JSON_code.expression.type == 'CallExpression'){
				if(JSON_code.expression.hasOwnProperty('callee')){
					if(JSON_code.expression.callee.type == 'Identifier'){
						var calleename = JSON_code.expression.callee.name;
						return getcomplexity_(getfuncJSONblock_(calleename,JSON_input_file));
					}
					if(JSON_code.expression.callee.type == 'FunctionExpression'){
						return getcomplexity_(JSON_code.expression.callee.body);
					}
				}
			}
		}
	}
	
	// In any other case the complexity of the JSON_code = O(1)
	return 0;
}

/*
	Input:  A func_name and a JSON formatted code 
	Output: Returns JSON formatted code of the input function in JSON_code 
			Return null if they function is not defined directly insidet he input script
	Assumptions: func_name is not defined inside an IF/Else, switch statement, while or For loops
*/
function getfuncJSONblock_(func_name, JSON_code){   
	var i = 0;
	if(JSON_code == null){
		return null;
	}	
	
	// In case JSON_code is an assignement search for the right statement  ??????????? Not working now
	if(JSON_code.type == 'FunctionExpression'){
		return getfuncJSONblock_(func_name,JSON_code.body);
	}
	
	// In case JSON_code is a block of code
	if(JSON_code.type == 'BlockStatement'){
		codeobject = getfuncJSONblock_(func_name,JSON_code.body);
		if(codeobject != null){
			return codeobject; 
		}
	}
	
	// In case JSON_code is an assignement search for the right statement  ??????????? Not working now
	if(JSON_code.type == 'ExpressionStatement'){
		if(JSON_code.hasOwnProperty('expression')){
			if(JSON_code.expression.type == 'AssignmentExpression'){
				//console.log(JSON_code.expression);		
				return getfuncJSONblock_(func_name,JSON_code.expression.right);
			}
		}
	}
	
	// In case JSON_code is an array of code objects
	if(JSON_code instanceof Array){
		for(i=0;i<JSON_code.length;i++){
			codeobject = getfuncJSONblock_(func_name,JSON_code[i]); 
			if(codeobject != null){
				return codeobject; 
			}		
		}
	} 
	
	// In case JSON_code is a program
	if(JSON_code.type == 'Program'){
		codeobject = getfuncJSONblock_(func_name,JSON_code.body);
		if(codeobject != null){
			return codeobject; 
		}
	}
		
	// In case JSON_code is a function declaration
	if(JSON_code.type == 'FunctionDeclaration' ){			
		// Check if the declared function's name is 'func_name' 
		if(JSON_code.hasOwnProperty("id")){
			if(JSON_code.id.hasOwnProperty("name")){
				if(JSON_code.id.name == func_name){
					return JSON_code;
				}
			}
		}
							
		codeobject = getfuncJSONblock_(func_name,JSON_code.body);
		if(codeobject != null){
			return codeobject; 
		}
	}
		

	// In case JSON_code is an anonymous function declaration function call 
	if(JSON_code.type == 'ExpressionStatement'){			
		if(JSON_code.hasOwnProperty('expression')){
			if(JSON_code.expression.type == 'CallExpression'){
				if(JSON_code.expression.hasOwnProperty('callee')){
					if(JSON_code.expression.callee.type == 'FunctionExpression'){
						return getfuncJSONblock_(func_name,JSON_code.expression.callee.body);
					}
				}
			}
		}
	}	
			
	return null;
}

/*
    Input: A JSON foramtted code (JSON_code), and a function name (func-name)  
    Output: Outputs the complexity of func-name defined in JSON_code
*/
function managecomplexity_(func_name){
	// Extract func_name JSON-code-block from the code 
	var JSON_func_object = getfuncJSONblock_(func_name,JSON_input_file);
	//console.log(JSON.stringify(JSON_func_object,null,4));	
	if(JSON_func_object == null){
		console.log("Error: Function \'" + func_name + "\' is not defined in \'" + input_file +"\'")
		return
	}

	// Find the complexity of the func_name from its JSON format     
	var func_complexity = getcomplexity_(JSON_func_object)	
    
	// Return the result as O(getcomplexity_(relative_input))
	printresult_(func_name,func_complexity);
}

/*
	Prints results to console in a right alligned format 
*/
function printresult_(func_name,func_complexity){
	var collumnsize = 25,
		i = 0,
		initlength;
	func_name = '\''+func_name+'\'';
	initlength = func_name.length;
	if(initlength < collumnsize){
		for(i=0;i<collumnsize-initlength;i++){
			func_name = " " + func_name;
		}
	}
    
	if (func_complexity!=0){
		console.log("Function " + func_name + " is " + "O(n^"+func_complexity+")");
	}else{
		console.log("Function " + func_name + " is " + "O(1)");
	}
}

// Calculate complexity of all the functions defined in the program
function one_argument_call_(){
	var i = 0;
	if (JSON_input_file.type == 'Program'){
		var body = JSON_input_file.body;
		for(i=0;i<body.length;i++){
			if (body[i].type == 'FunctionDeclaration'){
				managecomplexity_(body[i].id.name)
			}			
		}
	}else{
		console.log( "Error: Format of file \""+input_file+"\" is unrecognized." );	
	}
}

//If a specific function is specified calculate its compexity	
function two_argument_call_(func_name){
	// var func_name = process.argv[3];
	managecomplexity_(func_name);
}

function three_argument_call_(){
	//var func_name = process.argv[3];
	//var dive = process.argv[4];
	if(dive == 'dive' || dive == 'Dive'){
		//console.log('1');
		var func_object = getfuncJSONblock_(func_name,JSON_input_file);
		//console.log(func_object);
		if (func_object.hasOwnProperty('body')){
			var body = func_object.body.body;
			for(i=0;i<body.length;i++){
				//console.log('2');			
				if (body[i].type == 'FunctionDeclaration'){
					managecomplexity_(body[i].id.name)
				}			
			}
		}
	}else{
		console.log("Error: Wrong function call format. Please provide the below for diving into a function and calculating its sub-functions:");			
		console.log("./JSizzle source_file.js function_name dive");			
	}
}

function main_(){	
	/*if(process.argv.length < 3){
		console.log("Error: Please provide an JScript source file as input.");
		return;
	}*/	
	//var input_file = process.argv[2];
	var input_file_string = fs.readFileSync(input_file,'ascii');
	
	// Using esprima parse the input_file file into a JSON code object 
	JSON_input_file = esprima.parse(input_file_string);
	  	  		
	// If not function name is passed as input
	if(func_name == ''   /*process.argv.length == 3*/){
		one_argument_call_();
		return;
	}

	//If only a specific function is specified as second arguemt	
	if(dive != 'dive' /*process.argv.length == 4*/){
		two_argument_call_(func_name);
		return;
	}
	
	if(dive == 'dive' /*process.argv.length == 5*/){
		//console.log('dive');
		three_argument_call_();
		return;
	}
}
main_();