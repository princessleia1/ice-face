import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { me as companion } from "companion";
import { outbox } from "file-transfer";
import * as cbor from 'cbor';

if (
  !companion.permissions.granted("access_location") ||
  !companion.permissions.granted("run_background")
) {
  console.error("Not able to access GPS Position.");
}

// Monitor for significant changes in physical location
companion.monitorSignificantLocationChanges = true;

// Listen for the event
companion.addEventListener("significantlocationchange", doThis);

// Event happens if the companion is launched and has been asleep
if (companion.launchReasons.locationChanged) {
  doThis(companion.launchReasons.locationChanged.position);
}

function doThis(position) {
  console.log(`Significant location change! ${JSON.stringify(position)}`);
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  restoreSettings();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

// A user changes settings
settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}



// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

settingsStorage.onchange = function (evt) {
    //console.log("onchange: " + JSON.stringify(evt));
    sendItems();
}

function sendItems() {
    var iceitems = settingsStorage.getItem("ice_items");
    let colorSchemeName = settingsStorage.getItem("color_scheme_name");
    colorSchemeName = colorSchemeName ? JSON.parse(colorSchemeName) : "dodgerblue";

    if (iceitems) {
        try {
            var date = new Date();
            var time = date.getTime();
            iceitems = {
                "timestamp": time,
                "todo": JSON.parse(iceitems),
                "colorSchemeName": colorSchemeName
            };
            outbox.enqueue('iceitems.cbor', cbor.encode(iceitems))
                .then(ft => { /* console.log('todos sent'); */ })
                .catch(error => { /* console.log("Error sending todos: " + error); */ });
        } catch (e) {
            // console.log("error parsing setting value: " + e);
        }
    }
}
sendItems();
