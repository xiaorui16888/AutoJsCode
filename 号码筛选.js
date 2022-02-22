function isAAA(number) {
    var Numbe = number.toString();
    console.warn(Numbe);
    for (let i = 0; i < Numbe.length; i++) {
        if (i + 1 < Numbe.length) {
            if (Numbe.charAt(i) == Numbe.charAt(i + 1) &&
                Numbe.charAt(i) == Numbe.charAt(i + 2)) {
                log("第" + "" + (i + 1) + "" + "位");
                console.info(Numbe.charAt(i) + Numbe.charAt(i + 1) + Numbe.charAt(i + 2));
                return true;
            }
            console.error(Numbe.charAt(i),Numbe.charAt(i+1),Numbe.charAt(i+2));
        } else {
            return false;
        }
    }
}

function isABAB(number) {
    var Numbe = number.toString();
    console.warn(Numbe);
    for (let i = 0; i < Numbe.length; i++) {
        if (i + 1 < Numbe.length) {
            let aArr = Numbe.charAt(i) + Numbe.charAt(i + 1);
            let bArr = Numbe.charAt(i + 2) + Numbe.charAt(i + 3);
            if (aArr == bArr) {
                console.info(aArr+bArr);
                return true;
            }
            console.error(aArr,bArr);
        } else {
            return false;
        }
    }
}

function isABC(number){
    var Numbe = number.toString();
    console.warn(Numbe);
    for(let i = 0; i < Numbe.length; i++){
        if(i + 1 < Numbe.length){
            let n1 = Number(Numbe.charAt(i));
            let n2 = Numbe.charAt(i);
            for(let l = 1; l < 3; l++){
                if(Number(Numbe.charAt(i + l)) == n1 + l){
                    n2 = n2 + Numbe.charAt(i + l);
                    if(n2.length > 2){
                        console.info(n2);
                        return true;
                    }
                } 
            }
            console.error(Numbe.charAt(i),Numbe.charAt(i + 1),Numbe.charAt(i + 2));
        }else{
            return false;
        }
    }
}
var a = "15123464666";
log(isABC(a),isAAA(a),isABAB(a));