class ModalFloat {
    modal = null;
    modalHeader = null;

    //是否拖动了
    isMove = false;

    floatLeft = 0;
    floatTop = 0;
    floatRight = 0;
    floatBottom = 0;

    elementWidth = 0;
    elementHeight = 0;
    mouseX = 0;
    mouseY = 0;
    dragger = false;
    mouseDownTimeStamp = 0;
    timeInterval = 100;
    events = {
        onClick: null,
    };
    distance = 10;

    // 新增偏移量
    offsetX = 0;
    offsetY = 0;

    constructor(options) {
        this.handleInit(options);
    }

    handleInit(options) {
        if (!options.targetModal) {
            console.error("targetModal is required!");
            return;
        }
        if (!options.targetModalHeader) {
            console.error("targetModalHeader is required!");
            return;
        }
        options.events && (this.events = options.events);
        const targetModalElement = document.querySelector(options.targetModal);
        const targetModalHeaderElement = document.querySelector(options.targetModalHeader);
        if (!targetModalElement) {
            console.error("targetModalElement is required!");
            return;
        }
        if (!targetModalHeaderElement) {
            console.error("targetModalHeaderElement is required!");
            return;
        }
        this.modal = targetModalElement;
        this.modalHeader = targetModalHeaderElement;
        const position = this.modal.getBoundingClientRect();
        this.modal.style.position = "fixed";
        this.floatLeft = position.left;
        this.floatTop = position.top;
        this.floatRight = position.right;
        this.floatBottom = position.bottom;

        this.elementWidth = position.width;
        this.elementHeight = position.height;
        this.initEvents();
        return true;
    }

    initEvents() {
        this.modalHeader.addEventListener("mousedown", this.handleMouseDown);
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseDown = (e) => {
        this.isMove = false;
        this.mouseDownTimeStamp = new Date().getTime();
        this.dragger = true;
        e.preventDefault();

        // 计算鼠标点击时与元素左上角的偏移量
        const rect = this.modalHeader.getBoundingClientRect();
        this.offsetX = e.clientX - rect.left;
        this.offsetY = e.clientY - rect.top;

        // 这里可以控制元素的位置，而不是重置到鼠标中心
        this.floatLeft = rect.left;
        this.floatTop = rect.top;
    };

    handleMouseMove = (e) => {
        if (!this.dragger) {
            return;
        }
        const timeDiff = new Date().getTime() - this.mouseDownTimeStamp;
        if (timeDiff > this.timeInterval) {
            debugger
            this.modalHeader.style.cursor = 'move';
            this.handlePositionChange(e);
            this.controlBallPosition();
            this.isMove = true;
        } else {
            this.isMove = false;
        }
    };

    handleMouseUp = (e) => {
        debugger
        this.modalHeader.style.cursor = 'pointer';
        const currentTimeStamp = new Date().getTime();
        if (currentTimeStamp - this.mouseDownTimeStamp > this.timeInterval) {
            e.stopPropagation();
        } else {
            this.events.onClick && this.events.onClick();
        }
        this.dragger = false;
    };

    handlePositionChange(e) {
        // 使用偏移量来正确设置位置
        this.modal.style.left = e.clientX - this.offsetX + "px";
        this.modal.style.top = e.clientY - this.offsetY + "px";

        const position = this.modal.getBoundingClientRect();
        this.floatLeft = position.left;
        this.floatTop = position.top;
        this.floatRight = position.right;
        this.floatBottom = position.bottom;
    }

    controlBallPosition() {
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        const elementPosition = this.modal.getBoundingClientRect();

        const elLeftDistance = elementPosition.left;
        const elRightDistance = pageWidth - elementPosition.right;
        const elTopDistance = elementPosition.top;
        const elBottomDistance = pageHeight - elementPosition.bottom;

        if (elLeftDistance < this.distance) {
            this.modal.style.left = `${this.distance}px`;
        }
        if (elTopDistance < this.distance) {
            this.modal.style.top = `${this.distance}px`;
        }
        if (elRightDistance < this.distance && elLeftDistance > this.distance) {
            this.modal.style.left = `${pageWidth - this.distance - this.elementWidth}px`;
        }
        if (elBottomDistance < this.distance && elTopDistance > this.distance) {
            this.modal.style.top = `${pageHeight - this.distance - this.elementHeight}px`;
        }
    }

    reset() {
        this.modal = null;
    }
}

export default ModalFloat;
