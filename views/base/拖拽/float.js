class Float {
    el = null;
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
    timeInterval = 200;
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
        if (!options.target) {
            console.error("target is required!");
            return;
        }
        options.events && (this.events = options.events);
        const element = document.querySelector(options.target);
        if (!element) {
            console.error("target element is required!");
            return;
        }
        this.el = element;
        const position = this.el.getBoundingClientRect();
        this.el.style.position = "fixed";
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
        this.el.addEventListener("mousedown", this.handleMouseDown);
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseDown = (e) => {
        this.mouseDownTimeStamp = new Date().getTime();
        this.dragger = true;
        e.preventDefault();

        // 计算鼠标点击时与元素左上角的偏移量
        const rect = this.el.getBoundingClientRect();
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
            this.el.style.cursor = 'move';
            this.handlePositionChange(e);
            this.controlBallPosition();
        }
    };

    handleMouseUp = (e) => {
        this.el.style.cursor = 'pointer';
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
        this.el.style.left = e.clientX - this.offsetX + "px";
        this.el.style.top = e.clientY - this.offsetY + "px";

        const position = this.el.getBoundingClientRect();
        this.floatLeft = position.left;
        this.floatTop = position.top;
        this.floatRight = position.right;
        this.floatBottom = position.bottom;
    }

    controlBallPosition() {
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        const elementPosition = this.el.getBoundingClientRect();

        const elLeftDistance = elementPosition.left;
        const elRightDistance = pageWidth - elementPosition.right;
        const elTopDistance = elementPosition.top;
        const elBottomDistance = pageHeight - elementPosition.bottom;

        if (elLeftDistance < this.distance) {
            this.el.style.left = `${this.distance}px`;
        }
        if (elTopDistance < this.distance) {
            this.el.style.top = `${this.distance}px`;
        }
        if (elRightDistance < this.distance && elLeftDistance > this.distance) {
            this.el.style.left = `${pageWidth - this.distance - this.elementWidth}px`;
        }
        if (elBottomDistance < this.distance && elTopDistance > this.distance) {
            this.el.style.top = `${
                pageHeight - this.distance - this.elementHeight
            }px`;
        }
    }

    reset() {
        this.el = null;
    }
}

export default Float;
