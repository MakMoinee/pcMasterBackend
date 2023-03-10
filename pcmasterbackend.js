var exec = require('child_process').exec;
exec('go run go-file/cmd/webapp/main.go', {windowsHide: true});