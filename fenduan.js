
a = 数字分段("1234567890",2,3)

function 数字分段(n,min,max){
    var i = 0,ai = 0
    n_length = n.length
    n_min最大的分段 = Math.floor(n.length/min)
    n_max最大的分段 = Math.floor(n.length/max)
    // n = n.slice(0,6)+"|"+n.slice(6)
    // log(n)
    while(true){
        ai +=1
        if(i==0){
            n_random = random(min,max)
            n = n.slice(0,n_random)+"|"+n.slice(n_random)
            n_random1 = random(min,max)+1
            i +=n_random + n_random1
        }
        if(i>0){
            n_random = random(min,max)
            n = n.slice(0,i)+"|"+n.slice(i)
            n_random1 = random(min,max)
            if((n_random + n_random1)>=(min+max)){
                i +=(n_random + n_random1)-2
            }else{
                i +=n_random + n_random1
            }
        }
        if(i>=n_length+ai+1){
            log(n)
            break
        }
    }
}