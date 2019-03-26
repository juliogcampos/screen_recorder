var recorder = require('screen-capture-recorder');
var scene = new recorder({ x: 0, y: 0, w: 1280, h: 720 });

scene.warmup(function (err) {
    //recorder is ready, now start capture
    scene.StartRecord(function (err) {
        if (err)
            console.log("Something got wrong");
        //capture start _very_ quicky (60ms)
    });

    setTimeout(function () {

        scene.once(recorder.EVENT_DONE, function (err, tmp_path) {
            if (!err)
                console.log("Everything is ok, find video in %s.mp4", tmp_path);
            //tmp_path is a temporary file that will be deleted on process exit, keep it by renaming it
            require('fs').renameSync(tmp_path, tmp_path + ".mp4");
        });

        scene.StopRecord(function (err) {
            if (err)
                console.log("Something got wrong");
        });
    }, 1000 * 20);
});