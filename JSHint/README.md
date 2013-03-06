#JSHint

Runs JSHint Against All *.js files in a given directory

###Usage:
'Run_JSHint_Against_Direcotry.js' runs on node.js. You can tweak the options by changing 'jshint_options' in the script. 

###Required Libraries
The script uses jshint library package. Install jshint using npm in your local directory: 
	
	npm install jshint
		
###How to Run 
		
	node Run_JSHint_Against_Direcotry.js .\sample_directory_name
				
The above runs JSHint against all *.js files in directory sample_directory_name, and lists the results. 