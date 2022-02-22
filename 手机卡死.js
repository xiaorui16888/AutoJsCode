    dialogs.confirm("手机卡死", "在QQ里面运行没用必须在aj软件里面运行，手机才会卡死", function(i) {
        if (!i) {
            exit();
        };
    });

    for (var i = 0; i < 3; i++) {
        dialogs.confirm("真的要运行吗", "你的手机可能会因此而卡死", function(i) {
            if (!i) {
                exit();
            };
        });
    };
    while (1) {
        threads.start(function() {
            while (1) {};

        })

    }