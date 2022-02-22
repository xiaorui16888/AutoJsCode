function connect(host, port) {
	var s = new java.net.Socket();
	var add = new java.net.InetSocketAddress(host, port);
	s.connect(add);
	s.setKeepAlive(true);
	return s;
}

function writeBytes(socket, bytes) {
	var i, os = socket.getOutputStream();
	for (i in bytes) os.write(bytes[i]);
	os.flush();
}

function readBytesUntilEndpoint(socket, endpoint) {
	var r = [], is = socket.getInputStream(), b;
	while ((b = is.read()) >= 0) {
		if (b == endpoint) break;
		r.push(b);
	}
	return r;
}

function arrToHexString(arr) {
	return arr.map(function (e) {return e.toString(16)}).join(" ");
}

console.show();
console.log("正在连接……");
//如果IP变了，在这里改IP
var s = connect("192.168.0.109", 33333);
while (c.isConnected()) {
	console.info("输入1 - 3a 00 ff 01 c4 23");
	console.info("输入2 - 3a 00 01 0a 01 30 23");
	switch (parseInt(console.rawInput())) {
		case 1:
		writeBytes(s, [0x3a, 0x00, 0xff, 0x01, 0xc4, 0x23]);
		break;
		case 2:
		writeBytes(s, [0x3a, 0x00, 0x01, 0x0a, 0x01, 0x30, 0x23]);
	}
	console.log("返回：" + arrToHexString(readBytesUntilEndpoint(s, 0x23)));
}
console.log("连接已断开");




