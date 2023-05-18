
MySample.main = (function(graphics) {
    'use strict';
    let previousTime = performance.now();
    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {

    }

    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------
    function render() {
        graphics.clear();
        graphics.drawCurve(graphics.Curve.Hermite, [[150,500],[500,500],[200,400],[200,200]], 50, true,true,true, "rgb(0, 255, 0)");

        graphics.drawCurve(1, [[400,300],[500,300],[700,500],[600,500], [15]], 50, true,true,true, "rgb(255, 0, 0)");

    }

    //------------------------------------------------------------------
    //
    // This is the animation loop.
    //
    //------------------------------------------------------------------
    function animationLoop(time) {

        let elapsedTime = time - previousTime;
        previousTime = time;
        update(elapsedTime);
        render();

        requestAnimationFrame(animationLoop);
    }

    console.log('initializing...');
    requestAnimationFrame(animationLoop);

}(MySample.graphics));
