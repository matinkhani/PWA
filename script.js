const todos = [];

function add() {
  const task = document.getElementById("task").value;
  todos.push(task);
  render();
}

function render() {
  const list = document.getElementById("todos");
  document.getElementById("task").value = "";
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo;
    list.appendChild(li);
  });
}

// service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        // console.log(
        //   "Service Worker registered with scope:",
        //   registration.scope
        // );
      })
      .catch((error) => {
        console.log("Service Worker regsitration failed:", error);
      });
  });
}

// Handle send notification
function askNotificationPersmission() {
  if ("Notification" in window && navigator.serviceWorker) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted");
        subscribeUserToPush();
      } else {
        console.log("Notification pesrmission denied");
      }
    });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function subscribeUserToPush() {
  navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BNRhn-QD-G7azi1ajeZq6m9AWwf3Z3csKgsmxqKZinQO1BzmU0xMO_1kalNaT7txTzuO_HGNinS38LpkbM-fqwY"
        ),
      })
      .then(function (subscription) {
        console.log("User is subscribed:", subscription);

        // sendSubscriptionToServer(subscription);
      })
      .catch(function (error) {
        console.error("Failed to subscribe the user:", error);
      });
  });
}

askNotificationPersmission();
