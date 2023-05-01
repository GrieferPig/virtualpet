function showWalkMsg(): boolean{
    stopMsg()
    if (hunger > 80){
        showMsg(ChatList.Walk.too_hungry, "Big Byte", true)
        return false
    }
    if (sleepiness > 80){
        showMsg(ChatList.Walk.too_sleepy, "Big Byte", true)
        return false
    }
    if (happiness > 50){
        showMsg(ChatList.Walk.happy)
    } else if (happiness > 20){
        showMsg(ChatList.Walk.neutral)
    } else {
        showMsg(ChatList.Walk.angry)
    }
    return true
}

function showWalkAnim() {
    basic.showLeds(`
    . . # . .
    . . # . .
    # # # # #
    . # . # .
    # . . . #
    `, 0)
    basic.pause(500)
    basic.showLeds(`
    . . # . .
    . . # . .
    # # # # #
    . # . # .
    . # . # .
    `, 0)
    basic.pause(500)
}

function showWalkStatReport() {
    showHappyFace()
    showMsg(ChatList.Walk.stat_report, "Walk Report", true)
}

function walk() {
    if (showWalkMsg()){
        for (let i = 0; i < 5; i++) {
            showWalkAnim()
        }
        basic.clearScreen()
        showWalkStatReport()
        happiness += 10
        hunger += 20
        sleepiness += 10
        checkVarSanity()
    }
}

function askForWalk() {
    if (!haltBackgroundTasks) {
        haltBackgroundTasks = true
        showTalkAnim(ChatList.WantToWalk.question.length * MSG_CHAR_DELAY)
        showMsgAsync(ChatList.WantToWalk.question)
        basic.pause(1000)
        showMsgAsync(ChatList.WantToWalk.ask.msg, ChatList.WantToWalk.ask.status)
        if (selectAB(10) === 0) {
            showHappyFace()
            showMsgAsync(ChatList.WantToWalk.accept)
            basic.pause(1000)
            walk()
        } else {
            showSadFace()
            showMsgAsync(ChatList.WantToWalk.decline)
        }
        haltBackgroundTasks = false
    }
}

function showEatMsg(): boolean {
    if (hunger === 0) {
        showMsg(ChatList.Eat.full)
        return false
    } 
    if (hunger > 50){
        showMsg(ChatList.Eat.starving)
        return true
    } else {
        showMsg(ChatList.Eat.normal)
        return true
    }
}

function showEatAnim() {
    basic.showLeds(`
    . # # # .
    # # # # .
    # # . . #
    # # # # .
    . # # # .
    `, 0)
    basic.pause(500)
    basic.showLeds(`
    . # # # .
    # # # # .
    # # . # .
    # # # # .
    . # # # .
    `, 0)
    basic.pause(500)
    basic.showLeds(`
    . # # # .
    # # # # .
    # # # . .
    # # # # .
    . # # # .
    `, 0)
    basic.pause(500)
    basic.showLeds(`
    . # # # .
    # # # # .
    # # . . .
    # # # # .
    . # # # .
    `, 0)
    basic.pause(500)
}

function showEatStatReport() {
    showHappyFace()
    showMsg(ChatList.Eat.stat_report, "Eat Report", true)
}


function eat(){
    if (showEatMsg()) {
        for (let i = 0; i < 2; i++) {
            showEatAnim()
        }
        basic.clearScreen()
        showEatStatReport()
        happiness += 5
        hunger -=20
        checkVarSanity()
    }
}