import { globals, root, gameObjects, GameObject } from './game.js';

class Paint extends GameObject {
    constructor(defaultImg, handleExport) {
        super();

        // init variables
        this.handleExport = handleExport || this.saveToFile;
        this.isPainting = false;
        this.width = 32;
        this.height = 32;
        this.penSize = 1;
        this.strokeBuffer = [];
        this.color = [0, 0, 0, 255];    // rgba black

        // init dom element
        this.domElement = document.createElement('div');
        this.domElement.classList.add('paint');
        this.domElement.innerHTML = `
        <div class="control">
            <button class="resize">
                <i class="fas fa-expand-alt"></i>
            </button>
            <button class="color">
                <input type="color" class="color" value="#000000"></input>
                <i class="fas fa-palette"></i>
            </button>
            <button class="pen">
                <i class="fas fa-pen"></i>
            </button>
            <button class="eraser">
                <i class="fas fa-eraser"></i>
            </button>
            <button class="confirm">
                <i class="fas fa-check"></i>
            </button>
            <button class="cancel">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <canvas />
        `;
        this.resizeButton = this.domElement.querySelector('.resize');
        this.colorButton = this.domElement.querySelector('.color input');
        this.penButton = this.domElement.querySelector('.pen');
        this.eraserButton = this.domElement.querySelector('.eraser');
        this.confirmButton = this.domElement.querySelector('.confirm');
        this.cancelButton = this.domElement.querySelector('.cancel');
        this.canvas = this.domElement.querySelector('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        root.appendChild(this.domElement);

        // bind events
        this.handleResize = this.handleResize.bind(this);
        this.resizeButton.addEventListener('click', this.handleResize);

        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.colorButton.addEventListener('change', this.handleChangeColor);

        this.handleChangePen = this.handleChangePen.bind(this);
        this.penButton.addEventListener('click', this.handleChangePen);

        this.handleChangeEraser = this.handleChangeEraser.bind(this);
        this.eraserButton.addEventListener('click', this.handleChangeEraser);

        this.handleConfirm = this.handleConfirm.bind(this);
        this.confirmButton.addEventListener('click', this.handleConfirm);

        this.handleCancel = this.handleCancel.bind(this);
        this.cancelButton.addEventListener('click', this.handleCancel);

        this.handlePaint = this.handlePaint.bind(this);
        this.canvas.addEventListener('pointerdown', this.handlePaint);
        this.canvas.addEventListener('pointermove', this.handlePaint);
        this.canvas.addEventListener('pointerup', this.handlePaint);
        this.canvas.addEventListener('pointerout', this.handlePaint);

        // paint default image
        if (defaultImg !== undefined) {
            this.paintDefaultImage(defaultImg);
        }
    }

    paintDefaultImage(img) {
        this.canvas.getContext('2d').drawImage(img, 0, 0);
    }

    handleResize() {
        console.log('handleResize');
    }

    handleChangeColor(e) {
        this.color = hexToRgba(e.target.value);
    }

    handleChangePen() {
        this.color = hexToRgba(this.colorButton.value);
        console.log(this.colorButton.value);
        console.log(this.color);
    }

    handleChangeEraser() {
        this.color = [0, 0, 0, 0];
    }

    handleConfirm() {
        if (this.handleExport === undefined) {
            this.destory();
        } else {
            this.canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                this.handleExport(url);
                this.destory();
            });
        }
    }

    saveToFile(url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'paint.png';
        link.click();
    }

    handleCancel() {
        this.destory();
    }

    handlePaint(e) {
        if (e.type === 'pointerdown') {
            this.isPainting = true;
        } else if (e.type === 'pointerup' || e.type === 'pointerout') {
            this.isPainting = false;
            // upload painted stroke if running online
        }

        if (this.isPainting) {
            const point = this.getPixelCoords(e.clientX, e.clientY);
            if (this.strokeBuffer.length === 0 || distance(this.strokeBuffer[this.strokeBuffer.length - 1], point) > 0) {
                this.strokeBuffer.push(point);
            }
        }
    }

    getPixelCoords(clientX, clientY) {
        const { left, top, width, height } = this.canvas.getBoundingClientRect();
        return [
            Math.floor((clientX - left) / width * this.width),
            Math.floor((clientY - top) / height * this.height),
        ]
    }

    paintStroke() {
        const ctx = this.canvas.getContext('2d');
        const imageData = ctx.createImageData(this.penSize, this.penSize);
        const data = imageData.data;
        for (let i = 0; i < this.penSize * this.penSize * 4; i += 4) {
            data[i] = this.color[0];
            data[i + 1] = this.color[1];
            data[i + 2] = this.color[2];
            data[i + 3] = this.color[3];
        }

        for (const point of this.strokeBuffer) {
            ctx.putImageData(imageData, point[0], point[1]);
        }

        const lastPoint = this.strokeBuffer[this.strokeBuffer.length - 1];
        this.strokeBuffer.length = 0;
        this.strokeBuffer.push(lastPoint);
    }

    update() {
        if (this.isPainting) {
            this.paintStroke();
        }
    }
}

function distance(p1, p2) {
    return ((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2) ** 0.5;
}

function hexToRgba(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        255
    ] : [0, 0, 0, 0];
}

export default Paint;