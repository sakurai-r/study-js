function getCurrentTimestamp() {
  const now = new Date();
  return now.toLocaleString();
}

document.getElementById("pageLoadTimestamp").textContent =
  getCurrentTimestamp();

document.getElementById("browserName").textContent = navigator.appName;
document.getElementById("browserVersion").textContent = navigator.appVersion;
document.getElementById("userAgent").textContent = navigator.userAgent;
document.getElementById("platform").textContent = navigator.platform;
document.getElementById("onlineStatus").textContent = navigator.onLine
  ? "オンライン"
  : "オフライン";

async function fetchNetworkInfo() {
  try {
    const response = await fetch("https://ipinfo.io/json");
    const data = await response.json();

    document.getElementById("ipAddress").textContent = data.ip;
    document.getElementById("remoteHost").textContent =
      data.hostname || "情報なし";
    document.getElementById("provider").textContent = data.org || "情報なし";
    document.getElementById("networkName").textContent =
      data.city || "情報なし";
    document.getElementById("organizationName").textContent =
      data.org || "情報なし";
  } catch (error) {
    console.error(error);
  }
}

fetchNetworkInfo();
