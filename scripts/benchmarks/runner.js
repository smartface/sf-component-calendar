const timer = new Date();
const collection = {};

function add(fn, name){
  collection[name] = fn;
}

function addLap(){
  
}

function run(name, count){
  var stop = timerStart();
  collection[name]();
  var elapsedTime = stop();
  
  return {
    elapsedTime: elapsedTime,
    name: name,
    count: count,
    asString: name+": name, elapsedTime: "+elapsedTime
  };
}

function timerStart(){
  var t0 = new Date().getTime();
  
  return function timerStop() {
    var t1 = new Date().getTime();
    return (t1 - t0) / 1000;
  }
}

function runAll(count, done, delay=0){
  // setTimeout(function(){
    var res = Object
    .keys(collection)
    .map(function(name){
      return run(name);
    });
    
    done(res);
  // }, delay);
}

module.exports = {
  run: run,
  runAll: runAll,
  add: add
};
