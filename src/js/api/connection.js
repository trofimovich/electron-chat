import firebase from "firebase/app";
import db from "../db/firestore";
import "firebase/database";

const getOnlineStatus = (isOnline) => ({
  state: isOnline ? "online" : "offline",
  lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
});

export const setUserOnlineStatus = (userId, isOnline) => {
  const userRef = db.doc(`/profiles/${userId}`);
  return userRef.update(getOnlineStatus(isOnline));
};

export const onConnectionChanged = (onConnection) => {
  firebase
    .database()
    .ref(".info/connected")
    .on("value", (snapshot) => {
      const isConnected = snapshot?.val() ? snapshot.val() : false;
      onConnection(isConnected);
    });
};
