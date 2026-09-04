(function () {
  const loginUrl = "admin-login.html";

  function redirectToLogin() {
    window.location.replace(loginUrl);
  }

  async function verifyAdminSession() {
    try {
      const response = await fetch("api/admin_login.php", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        redirectToLogin();
        return;
      }

      const greeting = document.getElementById("adminGreetingName");
      if (greeting && data.username) greeting.textContent = data.username;
    } catch (error) {
      redirectToLogin();
    }
  }

  window.logout = function () {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_name");
    redirectToLogin();
  };

  window.openModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("active");
  };

  window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("active");
  };

  window.globalSearch = function () {};
  window.updateChart = function () {};
  window.syncVehiclesFromDrivers = function () {};
  window.scanQR = function () {};
  window.renderTransactions = function () {};
  window.exportTransactionsPDF = function () {};
  window.exportTransactionsExcel = function () {};
  window.generateReport = function () {};
  window.saveFees = function () {};
  window.savePreferences = function () {};
  window.previewPhoto = function () {};

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".sidebar-item[data-page]").forEach(function (button) {
      button.addEventListener("click", function () {
        const page = button.dataset.page;
        document.querySelectorAll(".sidebar-item[data-page]").forEach((item) => {
          item.classList.toggle("active", item === button);
        });
        document.querySelectorAll(".page-section").forEach((section) => {
          section.classList.toggle("active", section.id === `page-${page}`);
        });
      });
    });

    verifyAdminSession();
  });
})();
