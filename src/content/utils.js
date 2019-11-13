if(!com.ktsystems.subswitch.Utils) com.ktsystems.subswitch.Utils={};

com.ktsystems.subswitch.Utils = {
    createItem : function(description, rd) {
        this.description = description;
        this.rd = rd;
    },

    getLocalizedMessage : function(msg) {
        return document.getElementById("subjects_prefix_switch.locale").getString(msg);
    },

    showMessage : function(title, msg) {
        var nb = document.getElementById("ssMsg");
        nb.removeAllNotifications();

        nb.appendNotification(msg, msg,
            "chrome://global/skin/icons/information-16.png",
            nb.PRIORITY_INFO_MEDIUM, null);
    },

    openURL : function(aURL) {
        var uri = Components.classes["@mozilla.org/network/standard-url;1"].createInstance(Components.interfaces.nsIURI);
        var protocolSvc = Components.classes["@mozilla.org/uriloader/external-protocol-service;1"].getService(Components.interfaces.nsIExternalProtocolService);

        uri.spec = aURL;
        protocolSvc.loadUrl(uri);
    },

    openOptions : function(ev, autosave) {
        return window.openDialog("chrome://subjects_prefix_switch/content/options.xul",
            "_blank", "chrome, centerscreen, modal, resizable=yes, toolbar", autosave);
    },

    dumpStr : function(str) {
        if (com.ktsystems.subswitch.Const.PUBLIC_DIST == 'true')
            return;

        var csClass = Components.classes['@mozilla.org/consoleservice;1'];
        var cs = csClass.getService(Components.interfaces.nsIConsoleService);

        cs.logStringMessage((new Date()).getTime() + ": " + str);
    },

    fillListboxFromArray : function (listbox, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] != "-")
                listbox.appendItem(array[i], array[i]);
        }
    },

    getStringFromListbox : function(listbox){
        var array = "-";

        if (listbox.getRowCount() > 0) {
            array = this.getArrayFromListbox(listbox).join(";");
        }

        return array;
    },

    getArrayFromListbox : function(listbox){
        var array = new Array();

        if (listbox.getRowCount() > 0) {
            for (var i = 0; i < listbox.getRowCount(); i++){
                array.push(listbox.getItemAtIndex(i).value);
            }
        }
        return array;
    },

    upgradeSettings : function(dataString) {
        var r1 = new RegExp(/\*/g);
        var r2 = new RegExp(/\|/g);

        return dataString.replace(r1, com.ktsystems.subswitch.Utils.getRDEntrySplitSign())
                         .replace(r2, com.ktsystems.subswitch.Utils.getRDPrefEntriesSplitSign());
    },

    getRDEntrySplitSign : function() {
       var result;
       try {
            result = com.ktsystems.subswitch.Const.subswitch_prefs.getCharPref("entry_split_sign");
       } catch(e) {
            result = com.ktsystems.subswitch.Const.ENTRY_SPLIT_SIGN;
            com.ktsystems.subswitch.Const.subswitch_prefs.setCharPref("entry_split_sign", result);
       }
       return result;
    },

    getRDPrefEntriesSplitSign : function() {
       var result;
       try {
            result = com.ktsystems.subswitch.Const.subswitch_prefs.getCharPref("entries_split_sign");
       } catch(e) {
            result = com.ktsystems.subswitch.Const.ENTRIES_SPLIT_SIGN;
            com.ktsystems.subswitch.Const.subswitch_prefs.setCharPref("entries_split_sign", result);
       }
       return result;
    },

    removeMenuItems : function (menu) {
        var children = menu.childNodes;

        for (var i = children.length - 1; i >= 0; i--) {
            menu.removeChild(children[i]);
        }
    },

    createMenuItem : function(id, label, tooltip, oncommand) {
        var item = document.createElement("menuitem");

        item.setAttribute("id", id);
        item.setAttribute("label", label);
        item.setAttribute("tooltiptext", tooltip);
        item.setAttribute("oncommand", oncommand);
        item.setAttribute("disabled", false);

        return item;
    },

    padNumber : function (n, len) {
	    var s = n.toString();
	    if (s.length < len) {
	        s = (com.ktsystems.subswitch.Const.SEQ_PAD_MASK + s).slice(-len);
	    }
	 
	    return s;
	},

    isTemplateWithSequence : function (prefix) {
        var numberRE = new RegExp(/{number:(N+)}/gi);

        return (prefix.match(numberRE)!=null);
    }
}
