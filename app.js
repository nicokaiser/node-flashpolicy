var fs = require('fs'),
    net = require('net');

var filename = 'flashpolicy.xml'

try {
    netserver = net.createServer(function(stream) {
        console.log('Connection from ' + stream.remoteAddress);
        fs.readFile(filename, "binary", function(err, file) {
            if (err) {
                console.log('Error sending policy file');
                stream.end();
                return;
            }
            stream.write(file, "binary");
            stream.end();
            console.log('Sent policy file');
        });
    }).listen(843);
} catch (e) {
    if (e.errno == 13) {
        console.error('Warning: Cannot bind to port 843 for XML policy file support.');
    }
}
