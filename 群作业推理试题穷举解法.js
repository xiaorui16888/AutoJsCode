// Auto.Js交流群3月27日群作业推理试题穷举解法
// by 飙思
// 2018.03.27
// 时间缘故未进行优化，有兴趣者可自行完善

var A = 0;
var B = 1;
var C = 2;
var D = 3;

var type_max = 10;
var type_min = 11;
var type_option = 12;
var type_count = 13;

var answerNum = 1;

var answers = new Array(11);
answers[0] = -1;

var correctAnswers = new Array();

creatAnswer(10);

function creatAnswer(n){
	for (key in [A, B, C, D]) {
		answers[n] = key;
		if(n == 1){
			if(check(answers)) {
				toastLog(convert(answers.toString()));
				correctAnswers.push(convert(answers.toString()));
				if(answerNum > 0 && correctAnswers.length == answerNum) {
					toast("计算完成，可去日志记录查看结果！");
					exit();
				}
			}
		}else{
			creatAnswer(n - 1);
		}
	}
}

function convert(s) {
	s = s.replace("-1", "答案");
	s = s.replace(new RegExp(A.toString(), 'g'), "A");
	s = s.replace(new RegExp(B.toString(), 'g'), "B");
	s = s.replace(new RegExp(C.toString(), 'g'), "C");
	s = s.replace(new RegExp(D.toString(), 'g'), "D");
	return s;
}

function check(answer){
	return T1(answer) && T2(answer) && T3(answer) && T4(answer) && T5(answer) && T6(answer) && T7(answer) && T8(answer) && T9(answer) && T10(answer); 
}

function T1(answer){
    return true;
}

function T2(answer){
    var options = [C, D, A, B];
    var k = answer[2];
    return answer[5] == options[k];
}

function T3(answer){
    var options = [3, 6, 2, 4];
    var k = answer[3];
    for (var o=0; o<4; ++o){
        if(o==k){ continue;}
        if(answer[options[o]] == answer[options[k]]) { 
            return false;
        }
    }
    return true;
}

function T4(answer){
    var options = [[1,5], [2,7], [1,9], [6,10]];
    var k = answer[4];
    return answer[options[k][0]] == answer[options[k][1]];
}

function T5(answer){
    var options = [8, 4, 9, 7];
    var k = answer[5];
    return k == answer[options[k]];
}

function T6(answer){
    var options = [[2,4], [1,6], [3,10], [5,9]];
    var k = answer[6];
    var k8 = answer[8];
    return k8 == answer[options[k][0]] && k8 == answer[options[k][1]];
}

function T7(answer){
    var options = [C, B, A, D];
    var k = answer[7];
    return options[k] == getNum(answer, type_min, type_option);
}

function T8(answer){
	var options = [7, 5, 2, 10];
    var k = answer[8];
    var k1 = answer[1];
    return Math.abs(k1 - answer[options[k]]) != 1;
}

function T9(answer){
	var options = [6, 10, 2, 9];
    var k = answer[9];
    var b1 = answer[1] == answer[6];
    var b2 = answer[options[k]] == answer[5];
    return b1 == !b2;
}

function T10(answer){
	var options = [3, 2, 4, 1];
    var k = answer[10];
    return options[k] == Math.abs(getNum(answer, type_max, type_count) - getNum(answer, type_min, type_count));
}

function getNum(answer, type1, type2){
	var tcounts = [0, 0, 0, 0];
	for (var i = 0; i < 4; ++i) {
		for (var j = 1; j < 11; ++j) {
			if(i == answer[j]) {
				++tcounts[i];
			}
		}
	}
	var counts = new Array();
	counts[A] = tcounts[0];
	counts[B] = tcounts[1];
	counts[C] = tcounts[2];
	counts[D] = tcounts[3];
	var r = 0;
	if(type1 == type_max || type1 == type_min){
        tcounts.sort(function (a, b) { return a - b; });
        if(type1 == type_max){
            r = tcounts[3];
        } else { r = tcounts[0]; }
        if(type2 == type_option) {
            var options = [A, B, C, D];
            for (var i = 0; i < 4; ++i) {
                if( r == counts[options[i]] ) {
                    r = options[i];
                    break;
                }
            }
        }
    } else{
        r = counts[type1];
    }
    return r;
}



