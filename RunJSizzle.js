var	sys = require('sys'),
	fs = require('fs'),
	path = require('path'),
	JSizzle = require('./JSizzle'),
	dir = __dirname;
 
function walk(filename){
	fs.stat(filename, function(err, stats){
		if(stats.isFile() && filename.match(/\.js$/)){
			// Filename	
			console.log(filename + ' Complexities:');
			console.log('-------------------------------------------');
			JSizzle.run(filename);
			console.log(' ');
			console.log(' ');
		}else if(stats.isDirectory()){
			// Directory - recurse
			fs.readdir(filename, function(err, files){
				for(var i=0; i<files.length; i+=1){
					walk(filename + '/' + files[i]);
				}
			});
		}
	});
}

if(process.argv.length > 2){
	dir = process.argv[2];
}

walk(dir, function(filename){
	validate(filename, status);
});


