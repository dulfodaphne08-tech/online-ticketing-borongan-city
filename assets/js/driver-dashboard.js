(function () {
  const loginUrl = "login.html";

  function redirectToLogin() {
    window.location.replace(loginUrl);
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value || "-";
  }

  async function loadDriverSession() {
    try {
      const response = await fetch("api/driver_login.php", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.driver) {
        redirectToLogin();
        return;
      }

      const driver = data.driver;
      setText("welcomeTitle", `Welcome, ${driver.fullName || driver.username}`);
      setText("driverStatus", driver.status || "Active");
      setText("driverId", driver.driverId);
      setText("vehicleType", driver.vehicleType);
      setText("plateNumber", driver.plateNumber);
      setText("licenseNumber", driver.licenseNo);
    } catch (error) {
      redirectToLogin();
    }
  }

  async function logout() {
    try {
      await fetch("api/logout.php", { method: "POST", credentials: "same-origin" });
    } finally {
      localStorage.removeItem("borongan_driver_session");
      localStorage.removeItem("current_driver");
      redirectToLogin();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logoutButton")?.addEventListener("click", logout);
    loadDriverSession();
  });
})();