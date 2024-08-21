browser.browserAction.onClicked.addListener(toggleAlert);

async function toggleAlert() {
    let show_alert = await browser.LegacyPrefs.getPref("mail.biff.show_alert");
    await browser.LegacyPrefs.setPref("mail.biff.show_alert", !show_alert);
    await browser.LegacyPrefs.setPref("mail.biff.show_tray_icon", !show_alert);
    await browser.LegacyPrefs.setPref("mail.biff.play_sound", !show_alert);
    await updateOfflineUI(!show_alert);
}

async function updateOfflineUI(show_alert) {
    if (show_alert) {
        await browser.browserAction.setIcon({path:"icons/alert_green.png"})
        // We set default_label in the manifest to "", which causes our action
        // button to have no label at all. The title property is now only used
        // for the tooltip.
        await browser.browserAction.setTitle({title: browser.i18n.getMessage("alert-status.alertEnabledTooltip")})
    } else {
        await browser.browserAction.setIcon({path:"icons/alert_red.png"})
        // We set default_label in the manifest to "", which causes our action
        // button to have no label at all. The title property is now only used
        // for the tooltip.
        await browser.browserAction.setTitle({title: browser.i18n.getMessage("alert-status.alertDisabledTooltip")})
    }
}

// Update the button according to the state at startup.
let currentState = await browser.LegacyPrefs.getPref("mail.biff.show_alert");
await updateOfflineUI(currentState);

// TODO: One could use a blue or grey icon as default, which is shown while the
// add-on is starting and has not updated the icon correctly.