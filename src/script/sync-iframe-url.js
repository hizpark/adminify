function syncIframeUrl(iframeId, sidebarSelectors) {
  // 根據傳入的 iframe ID 獲取 iframe 元素
  const iframe = document.getElementById(iframeId);

  // 監控 iframe URL 的變化，防止循環定向
  iframe.addEventListener("load", function () {
    // 獲取 iframe 內部的 URL
    const iframeLocation = iframe.contentWindow.location.href;

    // 如果 iframe 的 URL 等於父頁面的 URL，則防止循環
    if (iframeLocation === window.location.href) {
      console.error(
        "防止自我引用循環: iframe URL 和父頁面 URL 相同",
        iframeLocation
      );
      return; // 退出，避免重定向到相同的頁面
    }

    // 更新父頁面的 URL，使用 history.pushState 保持瀏覽器歷史
    history.pushState(
      { path: iframeLocation },
      "",
      "?url=" + encodeURIComponent(iframeLocation)
    );
  });

  // 處理瀏覽器前進後退
  window.addEventListener("popstate", function (event) {
    let targetUrl = new URLSearchParams(window.location.search).get("url");
    if (targetUrl) {
      // 根據 URL 查詢參數更新 iframe 的內容
      iframe.src = decodeURIComponent(targetUrl);
    }
  });

  // 頁面加載時根據 URL 查詢參數加載 iframe 內容
  window.onload = function () {
    let targetUrl = new URLSearchParams(window.location.search).get("url");
    if (targetUrl) {
      // 加載 iframe 的內容
      iframe.src = decodeURIComponent(targetUrl);
    }
  };

  // 側邊欄和其他鏈接處理
  sidebarSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((link) => {
      link.addEventListener("click", function (event) {
        // 防止默認跳轉
        event.preventDefault();

        // 獲取目標 URI
        let targetUrl = this.getAttribute("href");

        // 檢查目標 URL 是否等於當前父頁面 URL
        if (window.location.href !== targetUrl) {
          iframe.src = targetUrl; // 設置 iframe 的 src

          // 使用 history.pushState 更新外層頁面的 URL
          history.pushState(
            { path: targetUrl },
            "",
            "?url=" + encodeURIComponent(targetUrl)
          );
        } else {
          // 如果要加載的 URL 和當前父頁面 URL 相同，報錯
          console.error(
            "防止自我引用循環: 嘗試加載與當前頁面相同的 URL",
            targetUrl
          );
        }
      });
    });
  });
}
