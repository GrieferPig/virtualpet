// Add your code here
function showTalkAnim(duration: number) {
    control.runInParallel(function () {
        for (let i = 0; i < Math.floor(duration / 100); i++) {
            if (!is_showing) {
                showHappyFace()
                return
            }
            showHappyFace()
            basic.pause(250)
            basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            # # # # #
            . # . # .
            `, 0)
            basic.pause(250)
        }
        showHappyFace()
    })
}

function showHappyFace(){
    basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `, 0)
}

function showNeutralFace() {
    basic.showLeds(`
            . # . # .
            . # . # .
            . . . . #
            # # # # .
            . . . . .
            `, 0)
}

function showSadFace() {
    basic.showLeds(`
            . # . # .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `, 0)
}
