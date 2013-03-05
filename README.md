#JSizzle

Javascript Lint, Analyze, and Evaluate tool

###Usage:
JSizzle runs on node.js

###Required Libraries
JSizzle uses a parsing package called Esprima. Install Esprima using npm: 
	
	npm install esprima
		
For more info on esprima visit: http://esprima.org/doc/index.html#ast

###How to Run JSizzle

There are three ways you can use JSizzle against a JScript source file.

1.Provide the source file as input argument:
		
	node .\JSizzle .\sample_source_file.js
				
The above lists complexity of all functions defined in 'sample_source_file.js' in Big-O notation.


2.Provide the source file and a specific function defined in source file as input arguments:
		
	node .\JSizzle .\sample_source_file.js sample-function-name
		
The above outputs complexity of 'sample-function-name' to console. 
Note 'sample-function-name' is assumed to be defined inside 'sample_source_file.js'

3.Provide the source file and a specific function defined in source file, following with keyword 'dive':
		
	node .\JSizzle .\sample_source_file.js sample-function-name dive
		
The above dives into 'sample-function-name', defined anywhere in 'sample_source_file', and returns complexities of functions defined inside it.

###Features
JSizzle takes into account the following features of JS codes including many others:

* Anonymous function calls
* Anonymous function declarations as call backs
* Assignment of functions to variables
* Operations placed as inputs to function calls
* Functions calls passed as inputs to functions
* Function names passed as inputs to functions

####Example:

If sample_source_file.js contains:
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
	node .\JSizzle .\sample_source_file.js
	>> Function    'sample_function_1' is O(n^3)
	>> Function    'sample_function_2' is O(n^2)

	node .\JSizzle .\sample_source_file sample_function_2
	>> Function    'sample_function_2' is O(n^2)
	
#### Running JSizzle Against All *.js files in a directory

RunJSizzle runs JSizzle against all *.js files. You can use it like following:

	node .\RunJSizzle sample-directory-name  
