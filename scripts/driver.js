
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
        graphics.drawCurve(0, [[150,500],[500,500],[200,500],[200,200]], 50, true,true,true, "rgb(0, 255, 0)");

        graphics.drawCurve(1, [[250,300],[500,300],[400,500],[400,500], [10]], 50, true,true,true, "rgb(255, 0, 0)");

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
