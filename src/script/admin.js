// 初始化側邊欄狀態
function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth <= 576) {
    sidebar.classList.add("collapsed");
  } else {
    sidebar.classList.remove("collapsed");
  }
}

// 切換側邊欄收縮狀態
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");

  if (sidebar.classList.contains("collapsed")) {
    const subMenus = document.querySelectorAll(".sub-menu");
    subMenus.forEach((subMenu) => {
      subMenu.classList.remove("open");
    });
  }
}

// 處理菜單點擊事件
function handleMenuClick(subMenuId) {
  const sidebar = document.getElementById("sidebar");

  if (sidebar.classList.contains("collapsed")) {
    toggleSidebar();
  }

  if (subMenuId) {
    const subMenu = document.getElementById(subMenuId);
    subMenu.classList.toggle("open");
  }
}

// 切換主題
function toggleTheme() {
  const body = document.body;
  const isLightMode = body.getAttribute("data-bs-theme") === "light";
  body.setAttribute("data-bs-theme", isLightMode ? "dark" : "light");
}

// 監聽窗口尺寸變化
window.addEventListener("resize", initSidebar);

// 初始化側邊欄狀態
initSidebar();
