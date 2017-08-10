const timer = new Date();
function runner(fn, lap){
    
  var t0 = new Date().getTime();
  fn();
  var t1 = new Date().getTime();
  var res = (t1 - t0) / 1000;
  
  console.log(lap+" : "+res);
  return lap+" : "+res;
}

module.exports = runner;
