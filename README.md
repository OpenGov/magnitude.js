#JSizzle

Javascript Lint, Analyze, and Evaluate tool

###Usage:
JSizzle runs on node.js

###Required Libraries
JSizzle uses a parsing package called Esprima. Install Esprima using npm:
	npm install esprima
For more info on esprima visit: http://esprima.org/doc/index.html#ast

###How to Run JSizzle

There are two ways you can use JSizzle against a JScript source file.

1. Provide the source file as input argument

	node .\jsizzle .\sample_source_file.js
		
The above lists complexity of all functions defined in sample_source_file.js in Big-O notation, to console.


2. Provide the source file and a specific function defined in source file as input arguments

	node .\jsizzle .\sample_source_file.js sample-function-name

The above outputs complexity of sample-function-name to console. 
Note 'sample-function-name' is assumed to be defined inside 'sample_source_file.js'


####Example:

If sample_source_file.js contians:

	var i=0,j=0,k=0,l=0;
	sample_function_1(i){s
		for(j=0;j<i;j++){
			sample_function_2(j)
		}
	}
	sample_function_2(k){
		for(j=0;j<k;j++){	
			for(l=0;l<j;l++){
				console.log("Hello Word.")
			}	
		}
	}


We'll have:

	node .\jsizzle .\sample_source_file.js
	>>(1) Functions called in sample script:
sample_function --> is O(3)

	.\jsizzle .\sample_script .\sample_function_2
	>>sample_function_2 is O(2)

###Assumptions about input program:
1. There is no loop in function calling.
2. Built_in and required() functions take O(1).
3. In function calls inputs take O(1) to be computed.