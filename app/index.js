import document from "document";
import { me as device } from "device";
import { battery } from "power";
import { inbox } from "file-transfer";
import * as cbor from "cbor";
import * as messaging from "messaging";
import * as fs from "fs";

let background = document.getElementById("background");
let container = document.getElementById("container");

// Get the selected index
let currentIndex = container.value;

// Set the selected index
container.value = 0; // Jump to first slide

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "color" && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting background color: ${color}`);
    background.style.fill = color;
  }
};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};
