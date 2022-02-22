importPackage(java.util);
importPackage(java.io);


var start = new Date();
var target = findLast("/storage/sdcard0/tencent/MicroMsg/3ef9e9f0dfbb6f37b93d3bffccb23179/voice2/");
var end = new Date();

log(target.getAbsolutePath());
log(new Date(target.lastModified()));
toastLog("耗时" + (end - start) + "ms");


function findLast(dir) {
  var queue = new LinkedList();
  queue.add(new File(dir));
  var list = new ArrayList();
  while (!queue.isEmpty()) {
    var f = queue.poll();
    if (f.isDirectory()) {
      var files = f.listFiles(new FilenameFilter({
        accept: function(p1, p2) {
          return !p2.startsWith(".");
        }
      }));
      for (var i = 0; i < files.length; i++) {
        queue.offer(files[i]);
      }
    } else if (f.getName().endsWith(".amr")) {
      list.add(f);
    }
  }

  return Collections.max(list, {
    compare: function(p1, p2) {
      return (p1.lastModified() - p2.lastModified()) > 0 ? 1 : -1;
    }
  });

}