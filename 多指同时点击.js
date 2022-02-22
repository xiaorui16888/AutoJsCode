var gesturesAry = [
    [
         //按毫秒，x  ，y坐标。
        [0, 51, [360, 746],
        ],
        [0, 51, [239, 966],
        ],
        [0, 51, [460, 746],
        ],
        [0, 51, [560, 746],
        ],
        [0, 51, [660, 746],
        ],
        [0, 51, [760, 746],
        ],
        ]
        ]
    
for (let i = 0; i < gesturesAry.length; i++) {
    gestures.apply(null, gesturesAry[i]);
    sleep(400);
}