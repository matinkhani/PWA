const webpush = require("web-push");

const publicVapidKey =
  "BNRhn-QD-G7azi1ajeZq6m9AWwf3Z3csKgsmxqKZinQO1BzmU0xMO_1kalNaT7txTzuO_HGNinS38LpkbM-fqwY";
const privateVapidKey = "rA8yOdvUkKkoGjly9g55pJaEifO9yHBzstVDb9STV-o";

webpush.setVapidDetails(
  "mailto:mtinkhni@gmail.com",
  publicVapidKey,
  privateVapidKey
);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fFHtZfk0P74:APA91bGdM5U11cRHnXUovgAhHKvIjelwC34Zfm5JZYHOmecHMuH3t2rnR2HMIVKXdI17rFbcP7i0SaJjkDzF64mTmIma2C83wyBXIPdhXpvzGvFNPwgrykvBqeyE1gRK9jdySzaaHLwl",
  expirationTime: null,
  keys: {
    p256dh:
      "BANYhAcLmbZQ71FoE0gNYNIVEUILG9z08dL0KiYgoMXqXHj17Sp8zIP1K90goRDMQyvsLKW5Uio9at_jR-evCI0",
    auth: "rlE08Hz7AUJRGpQ9jow5jQ",
  },
};

const payload = JSON.stringify({
  title: "PWA Push Test",
  body: "This is a push notification test",
});

webpush
  .sendNotification(pushSubscription, payload)
  .then((response) => console.log("Push notification sent:", response))
  .catch((error) => {
    if (error.statusCode === 410) {
      console.error("Subscription has expired or is no longer valid!");
      // Remove subscription from the server or handle accordingly.
      console.log(error.statusCode);
    } else {
      console.error("Error sending notification:", error);
    }
  });
