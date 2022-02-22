importPackage(java.io);
importPackage(java.text);
importPackage(java.util);
replace("/storage/sdcard0/tencent/MobileQQ/1289788761/ptt/group_20180219021019885.slk", "1289788761");

function replace(src, qq) {
  var date = new Date();
  var allFile = new File("/storage/sdcard0/tencent/MobileQQ/" + qq + "/ptt/" + new SimpleDateFormat("yyyyMM").format(date) + "/" + new SimpleDateFormat("dd").format(date) + "/").listFiles();

  var toFile = Collections.max(Arrays.asList(allFile), {
    compare: function(p1, p2) {
      return p1.lastModified() - p2.lastModified();
    }
  });
  //toastLog(toFile);
  var toPath = toFile.getAbsolutePath();
  files.remove(toPath);
  files.copy(src, toPath);
  toFile.setLastModified(date.getTime());
}