const modal = document.getElementById('modal');
const closeButton = document.getElementById('close-button');
const modalHeader = document.getElementById('modal-header');
const resizeHandle = document.getElementById('resize-handle');

let isDragging = false;
let isResizing = false;
let offsetX, offsetY;

// 打开弹窗函数
function openModal() {
    modal.style.display = 'block';
}

// 关闭弹窗函数
closeButton.onclick = function () {
    modal.style.display = 'none';
}

// 拖动弹窗
modalHeader.onmousedown = function (e) {
    isDragging = true;
    offsetX = e.clientX - modal.getBoundingClientRect().left;
    offsetY = e.clientY - modal.getBoundingClientRect().top;
}

// 鼠标移动时拖动弹窗
document.onmousemove = function (e) {
    if (isDragging) {
        modal.style.left = (e.clientX - offsetX) + 'px';
        modal.style.top = (e.clientY - offsetY) + 'px';
    }

    // 调整大小
    if (isResizing) {
        const newWidth = e.clientX - modal.getBoundingClientRect().left;
        const newHeight = e.clientY - modal.getBoundingClientRect().top;
        modal.style.width = newWidth + 'px';
        modal.style.height = newHeight + 'px';
    }
}

// 调整大小
resizeHandle.onmousedown = function (e) {
    isResizing = true;
    e.preventDefault(); // 防止选中内容
}

// 鼠标抬起时停止调整大小
document.onmouseup = function () {
    isDragging = false;
    isResizing = false;
}

// 打开弹窗
openModal();
