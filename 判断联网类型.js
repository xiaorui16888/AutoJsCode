
function getNetworkType() {
    let connectivityManager = context.getSystemService(context.CONNECTIVITY_SERVICE);
    if (connectivityManager == null) {
        return null;
    }
    let info = connectivityManager.getActiveNetworkInfo();
    if(info == null){
        return null;
    }
    let type = info.getType();
    if(type == 1){
        return "WIFI";
    }
    if(type == 0){
        return "MOBILE";
    }
    return type;
}

toastLog(getNetworkType());