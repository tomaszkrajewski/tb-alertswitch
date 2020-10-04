if(!com) var com={};
if(!com.ktsystems) com.ktsystems={};
if(!com.ktsystems.alertswitch) com.ktsystems.alertswitch={};
if(!com.ktsystems.alertswitch.AlertSwitchStatusBar) com.ktsystems.alertswitch.AlertSwitchStatusBar={};

com.ktsystems.alertswitch.AlertSwitchStatusBar = {
    init : function() {
        console.log("Init of AlertSwitchStatusBar - init - START");
        try {
            var prefs =  Components.classes["@mozilla.org/preferences-service;1"]
                            .getService(Components.interfaces.nsIPrefService)
                            .getBranch("mail.biff.");
            var show_alert = prefs.getBoolPref("show_alert");

            com.ktsystems.alertswitch.AlertSwitchStatusBar.setPrefs(show_alert);
            com.ktsystems.alertswitch.AlertSwitchStatusBar.updateOfflineUI(show_alert);
        } catch(e) {
            alert('AlertSwitchStatusBar.init-> '+e);
        }
        console.log("Init of AlertSwitchStatusBar - init - START");

    },

    toggleAlert : function() {
        try {
            var prefs =  Components.classes["@mozilla.org/preferences-service;1"]
                            .getService(Components.interfaces.nsIPrefService)
                            .getBranch("mail.biff.");
            var show_alert = !prefs.getBoolPref("show_alert");

            com.ktsystems.alertswitch.AlertSwitchStatusBar.setPrefs(show_alert);
            com.ktsystems.alertswitch.AlertSwitchStatusBar.updateOfflineUI(show_alert);
        } catch(e) {
            alert('AlertSwitchStatusBar.init-> '+e);
        }
    },

    setPrefs : function(showAlert) {
        var prefs =  Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefService)
            .getBranch("mail.biff.");

        prefs.setBoolPref("show_alert", showAlert);
        prefs.setBoolPref("show_tray_icon", showAlert);
        prefs.setBoolPref("play_sound", showAlert);
    },

    updateOfflineUI : function(showAlert) {
        var statusBarPanel = document.getElementById('alert-status');
        var bundle = document.getElementById('alert_switch.locale');
        
        if (showAlert) {
          statusBarPanel.setAttribute("alertEnabled", "true");
          statusBarPanel.setAttribute("tooltiptext", bundle.getString("alert-status.alertEnabledTooltip"));
        } else  {
          statusBarPanel.removeAttribute("alertEnabled");
          statusBarPanel.setAttribute("tooltiptext", bundle.getString("alert-status.alertDisabledTooltip"));
        }
    }
};
