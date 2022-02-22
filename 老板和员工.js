/**
 * @author 家
 * @老板和员工 哈哈哈
 */
function Boss(staff) {
  this.name = "马云";
  this.staff = staff;
  log("boss staff = ");
  log(this.staff);
  this.showController = function() {
    var w = floaty.rawWindow(
      <relative
        layout_width="{{device.width}}px"
        layout_height="{{device.height}}px"
        bg="#99CC99"
      >
        <vertical
          layout_width="match_parent"
          layout_height="wrap_content"
          layout_centerInParent="true"
        >
          <relative>
            <text
              layout_width="wrap_content"
              layout_height="wrap_content"
              layout_alignParentLeft="true"
              textSize="39sp"
              id="start"
              bg="#888888"
              layout_gravity="left"
              margin="9 9 9 9"
            >
              上班
            </text>
            <text
              layout_width="wrap_content"
              layout_height="wrap_content"
              layout_alignParentRight="true"
              textSize="39sp"
              id="stop"
              bg="#888888"
              layout_gravity="right"
              margin="9 9 9 9"
            >
              下班
            </text>
          </relative>
          <relative>
            <text
              layout_width="wrap_content"
              layout_height="wrap_content"
              layout_alignParentLeft="true"
              textSize="29sp"
              bg="#888888"
              layout_gravity="left"
              margin="9 9 9 9"
            >
              员工状态
            </text>
            <text
              layout_width="wrap_content"
              layout_height="wrap_content"
              layout_alignParentRight="true"
              textSize="29sp"
              id="staffStatus"
              bg="#888888"
              layout_gravity="right"
              margin="9 9 9 9"
            ></text>
          </relative>
          <relative>
            <text
              layout_width="wrap_content"
              layout_height="wrap_content"
              layout_alignParentLeft="true"
              textSize="29sp"
              bg="#FF9966"
              layout_gravity="left"
              margin="9 9 9 9"
            >
              老板状态
            </text>
            <text
              layout_width="wrap_content"
              layout_height="wrap_content"
              layout_alignParentRight="true"
              textSize="29sp"
              id="bossStatus"
              bg="#FF9966"
              layout_gravity="right"
              margin="9 9 9 9"
            ></text>
          </relative>
        </vertical>
      </relative>
    );
    this.window = w;
  };
  var bossStatusList=[
    '读书', '看新闻联播', '演讲', '开会', '喝茶', '出差', '忽悠'
  ]
  this.start = function() {    
    this.staff.goToWork(); 
    this.bossStatus=bossStatusList[random(0, bossStatusList.length-1)]  
    that = this;
    ui.run(function() {
      log(that.window.start.text());
      that.window.start.setBackgroundColor(colors.parseColor("#FF3300"));
      that.window.stop.setBackgroundColor(colors.parseColor("#888888"));
      that.window.staffStatus.setText(that.staff.status);
      that.window.bossStatus.setText(that.bossStatus);
    });
  };
  this.stop = function() {
    this.staff.goOffWork();
    this.bossStatus=bossStatusList[random(0, bossStatusList.length-1)]  
    ui.run(function() {
      that.window.start.setBackgroundColor(colors.parseColor("#888888"));
      that.window.stop.setBackgroundColor(colors.parseColor("#ffff00"));
      that.window.staffStatus.setText(that.staff.status);
      that.window.bossStatus.setText(that.bossStatus);
    });
  };
}
function Staff() {
  this.name = "小强";
  this.status = this.name + " is live";
  this.goToWork = function() {
    this.status = this.name + " goToWork!";
    console.log(this.status);
  };
  this.goOffWork = function() {
    this.status = this.name + " goOffWork!";
    console.log(this.status);
  };
}
var littleStrong = new Staff();
var boss = new Boss(littleStrong);
boss.showController();

setInterval(() => {
  boss.start();
  sleep(5000);
  boss.stop();
  sleep(1000);
}, 7000);

boss.start();
sleep(5000);
boss.stop();
sleep(1000);
