const timer = new Date();
const collection = {};
global.benchmarkLog = function (str) {};

function add(fn, name) {
  collection[name] = fn;
}

function addLap() {}

function run(name, count) {
  var logs = [];
  global.benchmarkLog = function (str) {
    logs.push(str);
  };

  var stop = timerStart();
  collection[name]();
  var elapsedTime = stop();

  global.benchmarkLog = null;

  return {
    logs: logs,
    elapsedTime: elapsedTime,
    name: name,
    count: count,
    asString: name + ': elapsedTime: ' + elapsedTime
  };
}

function timerStart() {
  var t0 = new Date().getTime();

  return function timerStop() {
    var t1 = new Date().getTime();
    return (t1 - t0) / 1000;
  };
}

function runAll(count, done, delay = 0) {
  // setTimeout(function(){
  var res = Object.keys(collection).map(function (name) {
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
