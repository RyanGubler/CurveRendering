// ------------------------------------------------------------------
// 
// This is the graphics object.  It provides a pseudo pixel rendering
// space for use in demonstrating some basic rendering techniques.
//
// ------------------------------------------------------------------
MySample.graphics = (function(pixelsX, pixelsY, showPixels) {
    'use strict';

    let canvas = document.getElementById('canvas-main');
    let context = canvas.getContext('2d', { alpha: false });

    let deltaX = canvas.width / pixelsX;
    let deltaY = canvas.height / pixelsY;

    //------------------------------------------------------------------
    //
    // Public function that allows the client code to clear the canvas.
    //
    //------------------------------------------------------------------
    function clear() {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();

        //
        // Draw a very light background to show the "pixels" for the framebuffer.
        if (showPixels) {
            context.save();
            context.lineWidth = .1;
            context.strokeStyle = 'rgb(150, 150, 150)';
            context.beginPath();
            for (let y = 0; y <= pixelsY; y++) {
                context.moveTo(1, y * deltaY);
                context.lineTo(canvas.width, y * deltaY);
            }
            for (let x = 0; x <= pixelsX; x++) {
                context.moveTo(x * deltaX, 1);
                context.lineTo(x * deltaX, canvas.width);
            }
            context.stroke();
            context.restore();
        }
    }

    //------------------------------------------------------------------
    //
    // Public function that renders a "pixel" on the framebuffer.
    //
    //------------------------------------------------------------------
    function drawPixel(x, y, color) {
        x = Math.trunc(x);
        y = Math.trunc(y);

        context.fillStyle = color;
        context.fillRect(x * deltaX, y * deltaY, deltaX, deltaY);
    }

    //------------------------------------------------------------------
    //
    // Helper function used to draw an X centered at a point.
    //
    //------------------------------------------------------------------
    function drawPoint(x, y, ptColor) {
        drawPixel(x - 1, y - 1, ptColor);
        drawPixel(x + 1, y - 1, ptColor);
        drawPixel(x, y, ptColor);
        drawPixel(x + 1, y + 1, ptColor);
        drawPixel(x - 1, y + 1, ptColor);
    }

    //------------------------------------------------------------------
    //
    // Bresenham line drawing algorithm.
    //
    //------------------------------------------------------------------
    function drawLine(x1, y1, x2, y2, color) 
	let distanceX = Math.abs(x2-x1);
        let distanceY = Math.abs(y2-y1);
        let slope = distanceY/distanceX;
        let b = y1 - slope * x1;
        let x_k = x1;
        let y_k = y1;
        let c = 2 * distanceY + distanceX * (2*b - 1);
        let p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
        if(x1 <= x2 && y2 <= y1 && distanceX < distanceY){ //if x and y are in octant 0
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k >= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k--;
            }
        }
        else if(x1 <= x2 && y2 >= y1 && distanceX < distanceY){ //if x and y are in octant 3
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k <= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k++;
            }
        }
        else if(x1 >= x2 && y2 >= y1 && distanceX < distanceY){ //if x and y are in octant 4
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k <= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k++;
            }
        }
        else if(x1 >= x2 && y2 <= y1 && distanceX < distanceY){ //if x and y are in octant 7
            [distanceX, distanceY] = [distanceY, distanceX]
            slope = distanceY/distanceX;
            b = y1 - slope * x1;
            c = 2 * distanceY + distanceX * (2*b - 1);
            p_k = (2 * distanceY * x_k) - (2 * distanceX * y_k) + c;
            while(y_k >= y2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    x_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                y_k--;
            }
        }
        else if(x1 <= x2 && y1 >= y2){ //if x and y are in octant 1
            while(x_k < x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k++;
            }
        }
        else if(x1 <= x2 && y1 <= y2  ){ //if x and y are in octant 2
            while(x_k < x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k++;
            }
        }
        else if(x1 >= x2 && y1 <= y2){ //if x and y are in octant 5
            while(x_k > x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k++;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k--;
            }
        }
        else if(x1 >= x2 && y1 >= y2){ //if x and y are in octant 6
            while(x_k > x2){
                drawPixel(x_k, y_k, color);
                if(p_k >= 0){
                    p_k = p_k + (2 * distanceY) - (2 * distanceX);
                    y_k--;
                }else{
                    p_k = p_k + (2 * distanceY);
                }
                x_k--;
            }
        }{
    }

    //------------------------------------------------------------------
    //
    // Renders an Hermite curve based on the input parameters.
    //
    //------------------------------------------------------------------
    function drawCurveHermite(controls, segments, showPoints, showLine, showControl, lineColor) {
    }

    //------------------------------------------------------------------
    //
    // Renders a Cardinal curve based on the input parameters.
    //
    //------------------------------------------------------------------
    function drawCurveCardinal(controls, segments, showPoints, showLine, showControl, lineColor) {
    }

    //------------------------------------------------------------------
    //
    // Renders a Bezier curve based on the input parameters.
    //
    //------------------------------------------------------------------
    function drawCurveBezier(controls, segments, showPoints, showLine, showControl, lineColor) {
    }

    //------------------------------------------------------------------
    //
    // Renders a Bezier curve based on the input parameters; using the matrix form.
    // This follows the Mathematics for Game Programmers form.
    //
    //------------------------------------------------------------------
    function drawCurveBezierMatrix(controls, segments, showPoints, showLine, showControl, lineColor) {
    }

    //------------------------------------------------------------------
    //
    // Entry point for rendering the different types of curves.
    // I know a different (functional) JavaScript pattern could be used
    // here.  My goal was to keep it looking C++'ish to keep it familiar
    // to those not expert in JavaScript.
    //
    //------------------------------------------------------------------
    function drawCurve(type, controls, segments, showPoints, showLine, showControl, lineColor) {
        switch (type) {
            case api.Curve.Hermite:
                drawCurveHermite(controls, segments, showPoints, showLine, showControl, lineColor);
                break;
            case api.Curve.Cardinal:
                drawCurveCardinal(controls, segments, showPoints, showLine, showControl, lineColor);
                break;
            case api.Curve.Bezier:
                drawCurveBezier(controls, segments, showPoints, showLine, showControl, lineColor);
                break;
            case api.Curve.BezierMatrix:
                drawCurveBezierMatrix(controls, segments, showPoints, showLine, showControl, lineColor);
                break;
        }
    }

    //
    // This is what we'll export as the rendering API
    const api = {
        clear: clear,
        drawPixel: drawPixel,
        drawLine: drawLine,
        drawCurve: drawCurve
    };

    Object.defineProperty(api, 'sizeX', {
        value: pixelsX,
        writable: false
    });
    Object.defineProperty(api, 'sizeY', {
        value: pixelsY,
        writable: false
    });
    Object.defineProperty(api, 'Curve', {
        value: Object.freeze({
            Hermite: 0,
            Cardinal: 1,
            Bezier: 2,
            BezierMatrix: 3
        }),
        writable: false
    });

    return api;
}(1000, 1000, true));
