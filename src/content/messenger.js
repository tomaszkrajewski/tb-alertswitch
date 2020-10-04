// Import any needed modules.
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

// Load an additional JavaScript file.
Services.scriptloader.loadSubScript("chrome://alert_switch/content/messenger-overlay-statusbar.js", window, "UTF-8");

function onLoad(activatedWhileWindowOpen) {
    console.log("Init of alertswitch - onLoad - START");
    WL.injectCSS("resource://alert_switch/messenger-overlay-statusbar.css");
    WL.injectElements(`
    <stringbundleset id="stringbundleset">
        <stringbundle id="alert_switch.locale" src="chrome://alert_switch/locale/alert_switch.properties"/>
    </stringbundleset>

    <hbox class="statusbar chromeclass-status" id="status-bar">
        <hbox insertbefore="statusTextBox" id="alertStatusTextBox">
            <hbox>
			  <toolbarbutton id="alert-status" class="statusbarpanel-iconic" type="checkbox"  oncommand="com.ktsystems.alertswitch.AlertSwitchStatusBar.toggleAlert();"/>
			</hbox>
        </hbox>
    </hbox>`);

    window.com.ktsystems.alertswitch.AlertSwitchStatusBar.init()

    console.log("Init of alertswitch - onLoad - END");
}

function onUnload(deactivatedWhileWindowOpen) {
}