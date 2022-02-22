"ui";
ui.layout(
    <frame>
        <vertical h="auto" align="center" margin="50 50 50 50">
            <linear>
                <text textSize="16sp">二 进 制</text>
                <input id="in_bin" w="150" h="40" singleLine="true" />
                <button id="bin" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear>
                <text textSize="16sp">八 进 制</text>
                <input id="in_ba" w="150" h="40" singleLine="true" />
                <button id="bin" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear>
                <text textSize="16sp">十 进 制</text>
                <input id="in_ten" w="150" h="40" singleLine="true"/>
                <button id="ten" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear>
                <text textSize="14sp">十六进制</text>
                <input id="in_hex" w="150" h="40" singleLine="true" />
                <button id="hex" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear gravity="center">
                <horizontal>
                    <button id="clos" w="250" h="*" text="清空" size="16" style="Widget.AppCompat.Button.Colored"/>
                </horizontal>
            </linear>
        </vertical>
    </frame>
);

ui.in_bin.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(text) {
        if (ui.in_bin.focused) {
            text = String(parseInt(text, 2));
            ui.run(() => {
                ui.in_ba.setText(conversion(text, 8));
                ui.in_ten.setText(conversion(text, 10));
                ui.in_hex.setText(conversion(text, 16));
            });
        };
    }
}));

ui.in_ba.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(text) {
        if (ui.in_ba.focused) {
            text = String(parseInt(text, 8));
            ui.run(() => {
                ui.in_bin.setText(conversion(text, 2));
                ui.in_ten.setText(conversion(text, 10));
                ui.in_hex.setText(conversion(text, 16));
            });
        };
    }
}));

ui.in_ten.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(text) {
        if (ui.in_ten.focused) {
            text = String(parseInt(text, 10));
            ui.run(() => {
                ui.in_bin.setText(conversion(text, 2));
                ui.in_ba.setText(conversion(text, 8));
                ui.in_hex.setText(conversion(text, 16));
            });
        };
    }
}));

ui.in_hex.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(text) {
        if (ui.in_hex.focused) {
            text = String(parseInt(text, 16));
            ui.run(() => {
                ui.in_bin.setText(conversion(text, 2));
                ui.in_ba.setText(conversion(text, 8));
                ui.in_ten.setText(conversion(text, 10));
            });
        };
    }
}));

ui.clos.click(function() {
    ui.run(() => {
        ui.in_bin.setText("");
        ui.in_ba.setText("");
        ui.in_ten.setText("");
        ui.in_hex.setText("");
    });
});

function conversion(text, num) {
    if (!parseInt(text)) {
        return ""
    };
    return Number(text).toString(num);
};