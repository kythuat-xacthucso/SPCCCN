window.addEventListener('DOMContentLoaded', async () => {
    try {
      // Load layout.html
      const layoutResponse = await fetch('../layouts/authenticatedUser/layout.html');
      const layoutText = await layoutResponse.text();
  
      // Lấy phần tử hiện tại cần giữ lại (ví dụ nội dung index)
      const mainContent = document.getElementById('main-content');
  
      // Tạo một DOM từ layout.html
      const parser = new DOMParser();
      const layoutDoc = parser.parseFromString(layoutText, 'text/html');
  
      // Tìm nơi để chèn nội dung (layout có thẻ <MAIN_CONTENT></MAIN_CONTENT>)
      const layoutMainContent = layoutDoc.querySelector('main .content');
  
      if (layoutMainContent) {
        layoutMainContent.innerHTML = mainContent.innerHTML;
      }
  
      // Thay body hiện tại = body của layout
      document.body.innerHTML = layoutDoc.body.innerHTML;
  
      // Gọi lại layout.js để cập nhật title
      if (typeof layoutInit === 'function') {
        layoutInit();
      }
  
    } catch (error) {
      console.error('Lỗi khi tải layout:', error);
    }
  });
  