"use strict";
var	fs = require('fs'),
	esprima = require('esprima'),
	JSON_input_file,
	esprima_options = {
		"loc":true,
	},
	input_file = '',
	func_name = '',
	dive = '';
		
/*
	Input: a JSON code object or an array of JSON code objects 
	Ouput: returns its complexity, in case of array returns the highest complexity amongst the
*/
function get_complexity_(JSON_code){
	var complexity,
		maxcomplexity,
		i;			
		
	// In case JSON_object is a null or undefined
	if(JSON_code == null){
		return 0; 
	}
	
	// In case JSON_code is a program
	if(JSON_code.type === 'Program'){
		return get_complexity_(JSON_code.body);
	}
	
	// In case JSON_code is a block of code 
	if(JSON_code.type === 'BlockStatement'){
		return get_complexity_(JSON_code.body);
	}	

	// In case JSON_code is a For loop 
	if(JSON_code.type === 'ForStatement'){
		return 1 + get_complexity_(JSON_code.body);
	}	

	// In case JSON_code is a while loop 
	if(JSON_code.type === 'WhileStatement'){
		return 1 + get_complexity_(JSON_code.body);
	}	
	      
	// In case JSON_code is a For In loop 
	if(JSON_code.type === 'ForInStatement'){
		return 1 + get_complexity_(JSON_code.body);
	}
	
	// In case JSON_code is a single name of a function
	if(JSON_code.type === 'Identifier'){
		return get_complexity_(get_JSON_func_(JSON_code.name,JSON_input_file));
	}
	
	// In case JSON_code is a anonymous function declaration
	if(JSON_code.type === 'FunctionExpression'){			
		return get_complexity_(JSON_code.body);
	}
				
	// In case JSON_code is a function declaration
	if(JSON_code.type === 'FunctionDeclaration'){			
		return get_complexity_(JSON_code.body);
	}
	
	// In case JSON_code is a variable declarations
	if(JSON_code.type === 'VariableDeclaration'){
		if(JSON_code.hasOwnProperty('declarations')){
			return get_complexity_(JSON_code.declarations);
		}
	}
	
	// In case JSON_code is a variable declarator
	if(JSON_code.type === 'VariableDeclarator'){
		return get_complexity_(JSON_code.init);
	}
	  
		// In case JSON_code is an assignement calcualte the right statement
	if(JSON_code.type === 'ExpressionStatement'){
		if(JSON_code.hasOwnProperty('expression')){
			if(JSON_code.expression.type === 'AssignmentExpression'){
				return get_complexity_(JSON_code.expression.right);
			}
		}
	}
				
	// In case JSON_code is a Switch Statement 
	if(JSON_code.type === 'SwitchStatement'){
		maxcomplexity = 0;
		for(i=0;i<JSON_code.cases.length;i++){
			complexity = get_complexity_(JSON_code.cases[i].consequent); 
			if(complexity > maxcomplexity){
				maxcomplexity = complexity;
			}		
		}
		return maxcomplexity;
	}			

	// In case JSON_code is a If/Else statement 
	if(JSON_code.type === 'IfStatement'){
		complexity = get_complexity_(JSON_code.Consequent)
		var complexitytemp = get_complexity_(JSON_code.alternate)
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
			complexity = get_complexity_(JSON_code[i]); 
			if(complexity > maxcomplexity){
				maxcomplexity = complexity;
			}
		}
		return maxcomplexity;
	}  
	       
	// In case JSON_code is a function call
	if(JSON_code.type === 'CallExpression'){
		if(JSON_code.hasOwnProperty('callee')){
			if(JSON_code.callee.type === 'Identifier'){
				var calleename = JSON_code.callee.name;
				var inputcomplexities = get_complexity_(JSON_code.arguments);
				var funcbodycomplexities = get_complexity_(get_JSON_func_(calleename,JSON_input_file));
				return funcbodycomplexities + inputcomplexities ;
			}
			if(JSON_code.callee.type === 'FunctionExpression'){
				return get_complexity_(JSON_code.callee.body);
			}
		}
	}
			           
	// In case JSON_code is a function call 
	if(JSON_code.type === 'ExpressionStatement'){			
		if(JSON_code.hasOwnProperty('expression')){
			if(JSON_code.expression.type === 'CallExpression'){
				if(JSON_code.expression.hasOwnProperty('callee')){
					if(JSON_code.expression.callee.type === 'Identifier'){
						var calleename = JSON_code.expression.callee.name;
						var inputcomplexities = get_complexity_(JSON_code.expression.arguments);
						var funcbodycomplexities = get_complexity_(get_JSON_func_(calleename,JSON_input_file));
						return funcbodycomplexities + inputcomplexities ;
					}
					if(JSON_code.expression.callee.type === 'FunctionExpression'){
						return get_complexity_(JSON_code.expression.callee.body);
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
function get_JSON_func_(func_name, JSON_code){   
	var i = 0;
	
	// In case JSON_object is a null or undefined
	if(JSON_code == null){
		return null;
	}

	// In case JSON_code is an assignement search for the right statement  ??????????? Not working now
	if(JSON_code.type === 'FunctionExpression'){
		return get_JSON_func_(func_name,JSON_code.body);
	}
	
	// In case JSON_code is a block of code
	if(JSON_code.type === 'BlockStatement'){
		var codeobject = get_JSON_func_(func_name,JSON_code.body);
		if(codeobject != null){
			return codeobject; 
		}
	}
	
	// In case JSON_code is a variable declaration
	if(JSON_code.type === 'VariableDeclaration'){
		if(JSON_code.hasOwnProperty('declarations')){
			return get_JSON_func_(func_name,JSON_code.declarations);
		}
	}	
	
	// In case JSON_code is a variable declarator
	if(JSON_code.type === 'VariableDeclarator'){
		return get_JSON_func_(func_name,JSON_code.init);
	}
	
	// In case JSON_code is an assignement search for the right statement  ??????????? Not working now
	if(JSON_code.type === 'ExpressionStatement'){
		if(JSON_code.hasOwnProperty('expression')){
			if(JSON_code.expression.type === 'AssignmentExpression'){	
				return get_JSON_func_(func_name,JSON_code.expression.right);
			}
		}
	}
	
	// In case JSON_code is an array of code objects
	if(JSON_code instanceof Array){
		for(i=0;i<JSON_code.length;i++){
			codeobject = get_JSON_func_(func_name,JSON_code[i]); 
			if(codeobject != null){
				return codeobject; 
			}		
		}
	} 
	
	// In case JSON_code is a program
	if(JSON_code.type === 'Program'){
		codeobject = get_JSON_func_(func_name,JSON_code.body);
		if(codeobject != null){
			return codeobject; 
		}
	}
		
	// In case JSON_code is a function declaration
	if(JSON_code.type === 'FunctionDeclaration' ){			
		// Check if the declared function's name is 'func_name' 
		if(JSON_code.hasOwnProperty("id")){
			if(JSON_code.id.hasOwnProperty("name")){
				if(JSON_code.id.name === func_name){
					return JSON_code;
				}
			}
		}
							
		codeobject = get_JSON_func_(func_name,JSON_code.body);
		if(codeobject != null){
			return codeobject; 
		}
	}
		
	// In case JSON_code is an anonymous function declaration function call 
	if(JSON_code.type === 'ExpressionStatement'){			
		if(JSON_code.hasOwnProperty('expression')){
			if(JSON_code.expression.type === 'CallExpression'){
				if(JSON_code.expression.hasOwnProperty('callee')){
					if(JSON_code.expression.callee.type === 'FunctionExpression'){
						return get_JSON_func_(func_name,JSON_code.expression.callee.body);
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
function manage_complexity_(func_name){
	// Extract func_name JSON-code-block from the code 
	var JSON_func_object = get_JSON_func_(func_name,JSON_input_file);
		
	if(JSON_func_object == null){
		console.log("Error: Function \'" + func_name + "\' is not defined in \'" + input_file +"\'")
		return
	}

	// Find the complexity of the func_name from its JSON format     
	var func_complexity = get_complexity_(JSON_func_object)	
    
    
    if (JSON_func_object.id.hasOwnProperty('loc')){
    	if (JSON_func_object.id.loc.hasOwnProperty('start')){
    		if (JSON_func_object.id.loc.start.hasOwnProperty('line')){
    			
    			// line number at which the function is declared
   				var line_num = JSON_func_object.id.loc.start.line
        
				// Return the result as O(get_complexity_(relative_input))
				print_result_(func_name,line_num,func_complexity);
				return;
    		}
    	}
    }
    
    // In this case format is not recognized.
    console.log( "Error: Format of function \""+func_name+"\" is unrecognized." );	
}

/*
	Prints results to console in a right alligned format 
*/
function print_result_(func_name,line_num,func_complexity){
	var func_name_size = 28,
		line_num_size = 5,
		i = 0,
		initlength;
	func_name = '\''+func_name+'\'';
	initlength = func_name.length;
	if(initlength < func_name_size){
		for(i=0;i<func_name_size-initlength;i++){
			func_name = " " + func_name;
		}
	}
	
	var line_num_adjust = ""+line_num
	initlength = line_num_adjust.length;
	if(initlength < line_num_size){
		for(i=0;i<line_num_size-initlength;i++){
			line_num_adjust = " " + line_num_adjust;
		}
	}
	
	
	if (func_complexity===0){
		console.log("Line "+ line_num_adjust+ func_name  + " is " + "O(1)");
		return;
	}
	
	if (func_complexity===1){
		console.log("Line "+ line_num_adjust + func_name + " is " + "O(n)");
		return;
	}
	
	console.log("Line "+ line_num_adjust + func_name + " is " + "O(n^"+func_complexity+")");

	return;
}

// Calculate complexity of all the functions defined in the program
function one_argument_call_(){

	var i = 0;	
	if (JSON_input_file.type === 'Program'){
		var body = JSON_input_file.body;
		for(i=0;i<body.length;i++){
			if (body[i].type === 'FunctionDeclaration'){
				manage_complexity_(body[i].id.name)
			}else{
				
				if(body[i].type === 'ExpressionStatement'){
					if (body[i].expression.hasOwnProperty('loc')){
						if (body[i].expression.loc.start.hasOwnProperty('line')){			
							
								// line number at which the function is declared
								var line_num = body[i].expression.loc.start.line;
								
								print_result_('_CallExpression_',line_num,get_complexity_(body[i]));
								continue;
 						}
					}
					
					// In this case format is not recognized.
					console.log( "Error: Format of function \"_CallExpression_\" is unrecognized." );	
				
				}else{
					// Format not recognized at this point
					//console.log('Format Not Recognized');
				}
			}			
		}
	}else{
		console.log( "Error: Format of file \""+input_file+"\" is unrecognized." );	
	}
}

//If a specific function is specified calculate its compexity	
function two_argument_call_(func_name){
	//func_name = process.argv[3];
	manage_complexity_(func_name);
}

function three_argument_call_(){
	//func_name = process.argv[3];
	dive = process.argv[4];
	if(dive === 'dive' || dive === 'Dive'){
		var func_object = get_JSON_func_(func_name,JSON_input_file);
		if (func_object.hasOwnProperty('body')){
			var body = func_object.body.body;
			for(i=0;i<body.length;i++){
				if (body[i].type === 'FunctionDeclaration'){
					manage_complexity_(body[i].id.name)
				}else{
					if(body[i].type === 'ExpressionStatement'){
						print_result_('_CallExpression_',get_complexity_(body[i]))
					}else{
						// Format not recognized at this point
						//console.log('Format Not Recognized');
					}
				}				
			}
		}
	}else{
		console.log("Error: Wrong function call format. Please provide the below for diving into a function and calculating its sub-functions:");			
		console.log("./JSizzle source_file.js function_name dive");			
	}
}

function main_(){

	// If JSizzle is run with command line
	if (input_file==='' ){
		if(process.argv.length < 3){
			console.log("Error: Please provide an JScript source file as input.");
			return;
		}	
		input_file = process.argv[2];
		
		var input_file_string = fs.readFileSync(input_file,'ascii');
		
		// Using esprima parse the input_file file into a JSON code object 
		JSON_input_file = esprima.parse(input_file_string,esprima_options);
	
		// If not function name is passed as input
		if(process.argv.length === 3){
			one_argument_call_();
			return;
		}

		//If only a specific function is specified as second arguemt	
		if(process.argv.length === 4){
			two_argument_call_(func_name);
			return;
		}
	
		if(process.argv.length === 5){
			three_argument_call_();
			return;
		}
		
	}else{ // If JSizzle is run by a script		
		var input_file_string = fs.readFileSync(input_file,'ascii');
		// Using esprima parse the input_file file into a JSON code object 
		JSON_input_file = esprima.parse(input_file_string,esprima_options);
		one_argument_call_();
	}
}

//main_();
exports.run = function(inputfile){
	input_file = inputfile;
	func_name = '',
	dive = '';
	main_();
}