# sp-nsi-sysv

Parse service file used by nsi to consume sysv.

# install

```sh
npm i @mh-cbon/sp-nsi-sysv
```

# Usage

```js
var spNsiSysv = require('@mh-cbon/sp-nsi-sysv')
var fs = require('fs')

fs.createReadStream('./fixtures/1.sh')
.pipe(spNsiSysv())
.on('data', function (d) {
  console.log(d);
  /*
  [ { name: 'author', value: ' me' },
  { env: false, name: 'name', value: '"!name"' },
  { env: false, name: 'wd', value: '"!wd"' },
  { env: false, name: 'cmd', value: '"!cmd"' },
  { env: false, name: 'reload', value: '"!reload"' },
  { env: false, name: 'user', value: '"!user"' },
  { env: false, name: 'pid_file', value: '"!pid"' },
  { env: false, name: 'stdout_log', value: '"!stdout"' },
  { env: false, name: 'stderr_log', value: '"!stderr"' },
  { env: true, name: 'MYVAR', value: '"MYVALUE"' } ]
  */
})
```

# See also

- https://github.com/mh-cbon/sp-lsbish
