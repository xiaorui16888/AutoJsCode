var http = require("http");
var createHandler = require("gitee-webhook-handler");

// post 所需要用到的秘钥
var handler = createHandler({ path: "/webhook", secret: "egg" });

function run_cmd(cmd, args, callback) {
  var spawn = require("child_process").spawn;
  var child = spawn(cmd, args);
  var resp = "";
  child.stdout.on("data", function(buffer) {
    resp += buffer.toString();
  });
  child.stdout.on("end", function() {
    callback(resp);
  });
}

handler.on("error", function(err) {
  console.error("Error:", err.message);
});

// 这个地方就是GitHub 和 Gitee 不一样的地方，需要注意
handler.on("Push Hook", function(event) {
  console.log("Received a push event for %s to %s", event.payload.repository.name, event.payload.ref);
  // 需要执行的脚本位置
  run_cmd("sh", ["./deploy.sh"], function(text) {
    console.log(text);
  });
});

try {
  http
    .createServer(function(req, res) {
      handler(req, res, function(err) {
        res.statusCode = 404;
        res.end("no such location");
      });
    })
    .listen(3333); //服务监听的端口，可以自行修改
} catch (err) {
  console.error("Error:", err.message);
}
