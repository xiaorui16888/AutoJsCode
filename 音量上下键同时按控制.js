"auto";

events.observeKey();
var Timeout, Timeout1;

events.onKeyDown("volume_up", function(event) {
    if (!Timeout) {
        Timeout = setTimeout(() => {
            if (Timeout && Timeout1) {
                kaishi();
            };
            Timeout = null;
        }, 500);
    };
});

events.onKeyDown("volume_down", function(event) {
    if (!Timeout1) {
        Timeout1 = setTimeout(() => {
            if (Timeout && Timeout1) {
                kaishi()
            };
            Timeout1 = null;
        }, 500);
    };
});

function kaishi() {
    toast("exit")
};