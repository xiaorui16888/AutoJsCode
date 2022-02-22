/* *
  *创建于/storage/emulated/0/MIDE/
  *工程名  :onShakeHook  类型  ：  MC_JS
  */
/**
  *
*/

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var block=false;
var sensorManager =  ctx.getSystemService(android.content.Context.SENSOR_SERVICE);  
var accelerateSensor = sensorManager.getDefaultSensor(android.hardware.Sensor.TYPE_ACCELEROMETER); 
listener=new android.hardware.SensorEventListener({
    onSensorChanged:function(event){
        var sensorType = event.sensor.getType();              
        //values[0]:X轴，values[1]：Y轴，values[2]：Z轴              
        values = event.values;                          
        x = values[0];            
        y = values[1];            
        z = values[2];
            if(sensorType == android.hardware.Sensor.TYPE_ACCELEROMETER){
                value = 15;
                //摇一摇阀值,不同手机能达到的最大值不同,如某品牌手机只能达到20
                if(x >= value || x <= -value || y >= value || y <= -value || z >= value || z <= -value){
                    //播放动画，更新界面，并进行对应的业务操作
                    if(!block){
                        try{
                            onShakeHook()
                        }catch(err){}
                        block=true;
                        var th=new java.lang.Thread(new java.lang.Runnable({
                            run:function(){
                                new java.lang.Thread(this).sleep(5000);
                                block=false;
                            }
                        }));
                        th.start();
                    }else{
                        //阻塞----++
                    }
                 }  
            }
        }
});
 sensorManager.registerListener(listener, accelerateSensor, sensorManager.SENSOR_DELAY_FASTEST) 




function onShakeHook(){print("hh")}