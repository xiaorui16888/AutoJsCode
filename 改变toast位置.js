function toastAt0(msg, x, y) {
  importClass(android.widget.Toast);
  importClass(android.view.Gravity);
  var toast = Toast.makeText(context, msg, Toast.LENGTH_SHORT);
  toast.setGravity(Gravity.TOP | Gravity.LEFT, x, y);
  toast.show();
}

function toastAt(msg, x, y) {
  ui.run(() => toastAt0(msg, x, y));
}

toastAt('？？？？？？？？？',device.width/6,device.height/2)
sleep(2000)
