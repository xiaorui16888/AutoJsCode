/**
     * �˱���Ϊ�����key��ÿ���ַ����±����Ӧ�����������ı��롣
     */
    var enKey='ABCDEFGHIJKLmnopqrstuvwxyz01234abcdefghijklMNOPQRSTUVWXYZ+/56789';
    /**
     * �˱���Ϊ�����key����һ�����飬BASE64���ַ���ASCIIֵ���±꣬����Ӧ�ľ��Ǹ��ַ��������ı���ֵ��
     */
    var deKey=new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 57, -1, -1, -1, 58,
        26, 27, 28, 29, 30, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1,
        -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 43, 44, 45,
        46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, -1, -1, -1, -1, -1,
        -1, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1
    );
    /**
     * ����
     */
    function encode(src){
        //��һ����������ű������ַ���Ч�ʱ����ַ�����Ӹߺܶࡣ
        var str=new Array();
        var ch1, ch2, ch3;
        var pos=0;
       //ÿ�����ַ����б��롣
        while(pos+3<=src.length){
            ch1=src.charCodeAt(pos++);
            ch2=src.charCodeAt(pos++);
            ch3=src.charCodeAt(pos++);
            str.push(this.enKey.charAt(ch1>>2), this.enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
            str.push(this.enKey.charAt(((ch2<<2)+(ch3>>6))&0x3f), this.enKey.charAt(ch3&0x3f));
        }
        //��ʣ�µ��ַ����б��롣
        if(pos<src.length){
            ch1=src.charCodeAt(pos++);
            str.push(this.enKey.charAt(ch1>>2));
            if(pos<src.length){
                ch2=src.charCodeAt(pos);
                str.push(this.enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
                str.push(this.enKey.charAt(ch2<<2&0x3f), '=');
            }else{
                str.push(this.enKey.charAt(ch1<<4&0x3f), '==');
            }
        }
       //��ϸ��������ַ�������һ���ַ�����
        return str.join('');
    }
    /**
     * ���롣
     */
    function decode(src){
        //��һ����������Ž������ַ���
        var str=new Array();
        var ch1, ch2, ch3, ch4;
        var pos=0;
       //���˷Ƿ��ַ�����ȥ��'='��
        src=src.replace(/[^A-Za-z0-9\+\/]/g, '');
        //decode the source string in partition of per four characters.
        while(pos+4<=src.length){
            ch1=this.deKey[src.charCodeAt(pos++)];
            ch2=this.deKey[src.charCodeAt(pos++)];
            ch3=this.deKey[src.charCodeAt(pos++)];
            ch4=this.deKey[src.charCodeAt(pos++)];
            str.push(String.fromCharCode(
                (ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2), (ch3<<6&0xff)+ch4));
        }
        //��ʣ�µ��ַ����н��롣
        if(pos+1<src.length){
            ch1=this.deKey[src.charCodeAt(pos++)];
            ch2=this.deKey[src.charCodeAt(pos++)];
            if(pos<src.length){
                ch3=this.deKey[src.charCodeAt(pos)];
                str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2)));
            }else{
                str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4)));
            }
        }
       //��ϸ��������ַ�������һ���ַ�����
        return str.join('');
    }


function utf16to8(str) { 
	var out, i, len, c;
    out = ""; 
	len = str.length; 
	for(i = 0; i < len; i++) { 
		c = str.charCodeAt(i); 
		if ((c >= 0x0001) && (c <= 0x007F)) { 
			out += str.charAt(i); 
			} 
		else if (c > 0x07FF) { 
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F)); out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F)); 
			out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F)); 
		}
		else { 
			out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F)); 
			out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
			} 
	}
return out; 
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
 c = str.charCodeAt(i++);
 switch(c >> 4)
 { 
   case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
     // 0xxxxxxx
     out += str.charAt(i-1);
     break;
   case 12: case 13:
     // 110x xxxx   10xx xxxx
     char2 = str.charCodeAt(i++);
     out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
     break;
   case 14:
     // 1110 xxxx  10xx xxxx  10xx xxxx
     char2 = str.charCodeAt(i++);
     char3 = str.charCodeAt(i++);
     out += String.fromCharCode(((c & 0x0F) << 12) |
        ((char2 & 0x3F) << 6) |
        ((char3 & 0x3F) << 0));
     break;
 }
    }

    return out;
}




a="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"
//解密

log(utf8to16(decode(a)))