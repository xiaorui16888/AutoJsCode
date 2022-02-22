auto();
var pkg = "com.tencent.mm";

//微信抢红包，只抢聊天窗口最新出现的屏幕最下面的红包
//短暂记忆抢过的上一个红包
//by 飙思

scanAndClickRP();

function scanAndClickRP() {
  var RPs;
  var rp;
  var rpKeyWord = "微信红包";
  var rpCount = 0;
  var minDepth = 10;
  var clickRP = false;
  var KW_RP_NON_1 = "手慢了，红包派完了";
  var KW_RP_NON_2 = "查看领取详情";
  var KW_RP_STATUS = "红包详情";
  var DESC_BACK = "返回";
  var textLoading = "正在加载...";
  var DESC_SEARCH = "搜索";
  var RPid;
  var lastRPid; 

  launch(pkg);
  while (!isStopped()) {
    try {
      RPs = text(rpKeyWord).packageName(pkg).className("TextView").clickable(false).find();
      if (RPs.nonEmpty()) {
        clickRP = false;
        rpCount = RPs.size();
        for (--rpCount; rpCount >= 0; --rpCount) {
          rp = RPs.get(rpCount);
          if (rp.depth() > minDepth) {
            try {
              rp = rp.parent().parent();
            } catch (e) {
              break;
            }
            if (rp.clickable() && rp.longClickable()) {
              RPid = getRPid(rp);
              RPid = (RPid != "" && RPid.indexOf(textLoading) == -1) ? RPid : lastRPid;
              if (RPid && RPid != lastRPid) {
                clickRP = true;
                lastRPid = RPid;
              }
              break;
            }
          }
        }
        if (clickRP && rp.click()) {
          var btnClicked = false;
          var loading = false;
          while (true) {
            if (!btnClicked) {
              var btns = className("Button").find();
              if (btns.nonEmpty()) {
                var btn = btns.get(0);
                if (Math.abs(btn.bounds().centerX() - (device.width / 2)) < 5 && btn.click()) {
                  btnClicked = true;
                }
              }
            }
            if (text(KW_RP_NON_1).exists() || text(KW_RP_NON_2).exists()) {
              className("ImageView").clickable().findOne().click();
              break;
            } else if (text(KW_RP_STATUS).exists()) {
              desc(DESC_BACK).findOne().parent().click();
              break;
            } else if ((currentPackage() != pkg) || (desc(DESC_SEARCH).exists()) || (loading && getRPid(rp, -1) != "" && RPid.indexOf(getRPid(rp, -1)) != -1)) {
              //toast("cancled");
              break;
            }
            if (text(textLoading).exists()) {
              loading = true;
            } else if (!btnClicked) {
              //sleep(500);
            }
          }
        }
      }
    } catch (e) {
      toastLog(e);
      sleep(1000);
    }
  } 
}

function getRPid(node, mode) {
  var id = "";
  node = toParentUntilClass(node, "android.widget.ListView") || node;
  if ((node.column() > -1) && textMatches(".+(\\(\d+\\))?$").className("TextView").clickable(false).exists()) {
    id = textMatches(".+(\\(\d+\\))?$").className("TextView").clickable(false).findOne().text();
    var index = id.lastIndexOf("(");
    if (index > 0) {
      id = id.substring(0, index + 1);
    }
    if (mode != -1) {
      id += node.column();
    }
  }
  return id;
}

function toParentUntilClass(node, className)  {
  var parentNode = node.parent();
  while (parentNode && parentNode.className() != className) {
    node = parentNode;
    parentNode = node.parent();
  }
  if (parentNode == null) {
    return null;
  } else {
    return node;
  }
}