       intent = new Intent();
       importClass(android.content.BroadcastReceiver);
       importClass(android.content.ContextWrapper);
       importClass(android.content.IntentFilter);
       filter = new IntentFilter();
       filter.addAction(Intent.ACTION_BATTERY_CHANGED);        
       new ContextWrapper(context).registerReceiver(new BroadcastReceiver({
           onReceive: function(context, intent) {
               if (Intent.ACTION_BATTERY_CHANGED.equals(intent.getAction())) {
                   //当前电量  
                   level = intent.getIntExtra("level", 0);
                   toastLog(level);
               }
           }
       }), filter);