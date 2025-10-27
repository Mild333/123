document.addEventListener('DOMContentLoaded', () => {
    const notificationCards = document.querySelectorAll('.notification-card');
    const readAllButton = document.querySelector('.read-all');
    const saveToggleAreas = document.querySelectorAll('.user-save-toggle');

    const filledStarSVG = '<svg class="w-5 h-5 text-primary-pink" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
    const outlinedStarSVG = '<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.519 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.519-4.674a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>';

    // ฟังก์ชัน markSingleCardAsRead - ลบคำว่า "ใหม่"
    const markSingleCardAsRead = (card) => {
        if (!card) return;
        const badge = card.querySelector('.new-badge');
        if (badge) {
            badge.remove();
            card.classList.add('opacity-60', 'hover:opacity-100', 'hover:shadow-lg', 'bg-gray-50', 'ring-1', 'ring-gray-200');
            card.classList.remove('shadow-lg', 'hover:shadow-xl', 'bg-white');
        }
    };

    // กดที่การ์ดจะอ่านแล้ว (หายคำว่าใหม่)
    notificationCards.forEach(card => {
        card.addEventListener('click', function() {
            markSingleCardAsRead(this);
        });
    });

    // ปุ่ม "อ่านทั้งหมด"
    readAllButton.addEventListener('click', () => {
        notificationCards.forEach(card => markSingleCardAsRead(card));
        const originalText = readAllButton.innerHTML;
        readAllButton.innerHTML = '<span class="hidden sm:inline">✔</span> อ่านทั้งหมดแล้ว!';
        readAllButton.classList.remove('bg-white', 'hover:bg-pink-100');
        readAllButton.classList.add('bg-green-500', 'text-white');
        setTimeout(() => {
            readAllButton.innerHTML = originalText;
            readAllButton.classList.remove('bg-green-500', 'text-white');
            readAllButton.classList.add('bg-white', 'hover:bg-pink-100');
        }, 2000);
    });

    // กดดาวเพื่อเพิ่มจำนวน
    saveToggleAreas.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation(); // ป้องกันการคลิกไปโดน card
            const parentCard = this.closest('.notification-card');
            const countElement = parentCard.querySelector('.count-value');
            let count = parseInt(countElement.textContent) || 0;
            count++;
            countElement.textContent = count;
            const iconArea = this.querySelector('.icon');
            iconArea.innerHTML = filledStarSVG;
        });
    });
});
