var miss = require('mississippi')
var split = require('split')

var spNsiSysv = function () {

  var properties = [];
  var started = false;
  var isInEnv = false;

  var stream = miss.through.obj(function transform(chunk ,enc, cb){
    chunk = chunk.toString();
    if (!started && chunk.match(/^\s*[#]+\s+begin\s+nsi/i)) {
      started = true;
    }
    if (started && chunk.match(/^\s*[#]+\s+end\s+nsi/i)) {
      started = false;
    }
    if (started) {
      if (chunk.match(/^\s*[#]+\s+begin\s+env/i)) {
        isInEnv = true;
      } else if (chunk.match(/^\s*[#]+\s+end\s+env/i)) {
        isInEnv = false;
      } else if (chunk.match(/^\s*[#]+\s+[^=]+=/)) {
        properties.push({
          name: chunk.match(/^\s*[#]+\s+([^=]+)=/)[1],
          value: chunk.match(/^\s*[#]+\s+[^=]+=(.*)/)[1]
        })
      } else if (chunk.match(/^\s*[^=]+=/i)) {
        properties.push({
          env: isInEnv,
          name: chunk.match(/^\s*([^=]+)=/i)[1],
          value: chunk.match(/^\s*[^=]+=(.*)/i)[1]
        })
      }
    }
    cb()
  }, function (cb) {
    this.push(properties);
    cb();
  })
  return miss.pipeline.obj(split(), stream)
}

module.exports = spNsiSysv;
