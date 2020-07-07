#! usr/bin/env node
"use strict";
var path = require ("path");
var fs = require ("fs");
var getStdin = require ('get-stdin');
// var util = require ("util");
// const { dirname } = require("path");
// console.error("oops");
//console.log("Hello world");
//process.stdout.write("Helloworld");

// printHelp();
// console.log(process.argv.slice(2));

var args = require('minimist')( process.argv.slice(2),
{
    boolean: [ "help", "in"],
    string: [ "file"]
});

var BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);


if(args.help){
    printHelp();
}
else if(
    args.in ||args._.includes("_") )
{
    getStdin().then(processFile).catch(error);
}
else if(args.file) {
    /*asynchronous file reading*/
    fs.readFile(path.join(BASE_PATH,args.file), function onContents(err, contents){
        if (err){
            error(err.toString());
        }
        else{
            processFile(contents.toString());
       }
    });
    
}

else{
    error("Incorrect Usage.",true);
}

function processFile (contents)
{
 contents = contents.toUpperCase();
 process.stdout.write(contents);
//var contents = fs.readFileSync(filepath); //synchronous
 
}

function error(msg,includeHelp = false){
    console.log(msg);
    if (includeHelp) {
        console.log(""); //emptyline
        printHelp();
    }
}

function printHelp() {
	console.log("ex1 usage:");
	console.log("");
	console.log("--help                      print this help");
	console.log("-, --in                     read file from stdin");
	console.log("--file={FILENAME}           read file from {FILENAME}");
	console.log("");
}