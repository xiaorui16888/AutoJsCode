
sleep(3000);


device.wakeUp()

sleep(1000);

var gesturesAry=[[[0,301,[592,1864],[592,1863],[615,1658],[637,1406],[666,1194],[739,796],[787,626]]]];
for(let i=0;i<gesturesAry.length;i++){
   gestures.apply(null, gesturesAry[i]);
   sleep(400);
};
