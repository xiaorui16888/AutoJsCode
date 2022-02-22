"ui";
ui.layout(
    <vertical >
        <Switch id="is1"/>
    </vertical>
    )
        ui.is1.on("click", function() {
        if (ui.is1.isChecked()) {
            log(1)
            files.write("///sdcard/i.dat", "true")
        } else {
            files.write("///sdcard/i.dat", "false")
        }
    })
    if (files.read("///sdcard/i.dat") == "true") {
        ui.is1.setChecked(true)
    } else {
        ui.is1.setChecked(false)
    }