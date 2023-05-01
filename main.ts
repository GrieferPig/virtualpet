let isTempShown = false
let happiness = 80
let sleepiness = 30
let hunger = 0
let MSG_CHAR_DELAY = 100
let MSG_DELAY = 30000
let screenspace_status = ""

let isLcdShifted = false

let haltBackgroundTasks = false

let died = false
let sleeping = false

// init lcd
I2C_LCD1602.LcdInit(0)
I2C_LCD1602.BacklightOn()

let is_showing = false
let request_stop = false
let is_stopped = false

haltBackgroundTasks = true

// do introduction first
for (let i = 0; i < ChatList.Greeting.length; i++) {
    showTalkAnim(ChatList.Greeting[i].length * MSG_CHAR_DELAY)
    showMsgAsync(ChatList.Greeting[i], "???:")
    basic.pause(1000)
    MSG_CHAR_DELAY = 0
    I2C_LCD1602.clear()
    showMsgAsync(ChatList.Greeting[i].slice(-16), "A) Next  B) Skip")
    MSG_CHAR_DELAY = 100
    if (selectAB() === 1) {
        break
    }
}

I2C_LCD1602.clear()
basic.pause(500)

haltBackgroundTasks = false;

input.onButtonPressed(Button.A, function () {
    if (!haltBackgroundTasks) {
        haltBackgroundTasks = true
        stopMsg()
        // take a Walk
        walk()
        haltBackgroundTasks = false
    }
})

input.onButtonPressed(Button.B, function () {
    if (!haltBackgroundTasks) {
        haltBackgroundTasks = true
        stopMsg()
        // eat
        eat()
        haltBackgroundTasks = false
    }
})

input.onButtonPressed(Button.AB, function () {
    play()
})

input.onSound(DetectedSound.Loud, function () {
    let msg = randomChoose(ChatList.OnSound)
    showTalkAnim(msg.length * MSG_CHAR_DELAY)
    showMsg(msg)
})


function stopMsg() {
    if (is_showing) {
        request_stop = true
        while (!is_stopped) {
            basic.pause(MSG_CHAR_DELAY + 25)
        }
        request_stop = false
        is_stopped = false
    }
}

function showMsgAsync(str: string, status?: string) {
    stopMsg()
    is_showing = true
    I2C_LCD1602.clear()
    isLcdShifted = false;
    screenspace_status = "Big Byte:"
    if (status) {
        screenspace_status = status
    }
    I2C_LCD1602.ShowString(screenspace_status, 0, 0)
    let actual_counter = 0
    for (let i = 0; i <= str.length - 1; i++) {
        if (request_stop) {
            is_stopped = true
            is_showing = false
            return;
        } else {
            actual_counter++
            // lcd1602 have 2 lines with 40 bytes of buffer.
            // Clear if running out of space
            if (actual_counter > 40) {
                I2C_LCD1602.clear()
                isLcdShifted = false;
                // redraw previous 15 chars
                I2C_LCD1602.ShowString(str.slice(i - 15, i), 0, 1)
                actual_counter = 16
            }
            // shift left because only 16 char can be disp inline at once
            if (actual_counter > 16) {
                I2C_LCD1602.shl()
                isLcdShifted = true;
            }
            if (str[i] == undefined) {
                return
            }
            I2C_LCD1602.ShowString(str[i], actual_counter - 1, 1)
            basic.pause(MSG_CHAR_DELAY)
        }
    }
    is_showing = false;
}

function showMsg(str: string, status?: string, monopoly?: boolean) {
    control.runInParallel(function () {
        if (monopoly) {
            haltBackgroundTasks = true;
        }
        stopMsg()
        is_showing = true
        I2C_LCD1602.clear()
        isLcdShifted = false;
        screenspace_status = "Big Byte:"
        if (status) {
            screenspace_status = status
        }
        I2C_LCD1602.ShowString(screenspace_status, 0, 0)
        let actual_counter = 0
        for (let i = 0; i <= str.length - 1; i++) {
            if (request_stop) {
                is_stopped = true
                is_showing = false
                return;
            } else {
                actual_counter++
                // lcd1602 have 2 lines with 40 bytes of buffer.
                // Clear if running out of space
                if (actual_counter > 40) {
                    I2C_LCD1602.clear()
                    isLcdShifted = false;
                    // redraw previous 15 chars
                    I2C_LCD1602.ShowString(str.slice(i - 15, i), 0, 1)
                    actual_counter = 16
                }
                // shift left because only 16 char can be disp inline at once
                if (actual_counter > 16) {
                    I2C_LCD1602.shl()
                    isLcdShifted = true;
                }
                if (str[i] == undefined) {
                    return
                }
                I2C_LCD1602.ShowString(str[i], actual_counter - 1, 1)
                basic.pause(MSG_CHAR_DELAY)
            }
        }
        is_showing = false;
        if (monopoly) {
            haltBackgroundTasks = false;
        }
    })
}

// falling detect
input.onGesture(Gesture.ThreeG, function () {
    if (!haltBackgroundTasks) {
        showSadFace()
        showMsg(randomChoose(ChatList.Fall))
    }
})

// temperature check
basic.forever(function () {
    if (!haltBackgroundTasks) {
        basic.pause(10000)
        if (input.temperature() < 10) {
            if (!(isTempShown)) {
                showNeutralFace()
                showMsg(ChatList.Temp.cold)
                isTempShown = true
            }
        } else if (input.temperature() > 30) {
            if (!(isTempShown)) {
                showNeutralFace()
                showMsg(ChatList.Temp.hot)
                isTempShown = true
            }
        } else {
            isTempShown = false
        }
    }
})

// chat
basic.forever(function () {
    let msg = getChatMsg(happiness, sleepiness, hunger)
    // basic.pause(MSG_DELAY - msg.length * MSG_CHAR_DELAY)
    basic.pause(MSG_DELAY)
    if (!is_showing && !haltBackgroundTasks) {
        if (happiness > 20) {
            let rand = Math.random()
            if (rand < 0.1) {
                askForWalk()
                return;
            } else if (rand > 0.92) {
                return;
            }
        }
        showMsg(msg)
        showTalkAnim(msg.length * MSG_CHAR_DELAY)
    }
})

// change status
basic.forever(function () {
    if (!haltBackgroundTasks) {
        basic.pause(60000)
        happiness -= 15
        if (sleepiness < 100) {
            if (happiness < 80) {
                sleepiness += 5
            }
        }
        if (hunger < 100) {
            if (happiness < 50) {
                hunger += 20
            } else {
                hunger += 10
            }
        }
        if (hunger > 100) {
            hunger = 100
        }
        checkVarSanity()
    }
    basic.pause(800)
})

// show status
basic.forever(function () {
    basic.pause(3000)
    if (!is_showing && !haltBackgroundTasks) {
        if (isLcdShifted) {
            I2C_LCD1602.clear()
            isLcdShifted = false
        }
        // clear the 3rd digit bcs maybe other value reached 100
        I2C_LCD1602.ShowString(" ", 15, 0)
        screenspace_status = `Big Byte: HA=${happiness}`
        I2C_LCD1602.ShowString(screenspace_status, 0, 0)
    }
    basic.pause(3000)
    if (!is_showing && !haltBackgroundTasks) {
        if (isLcdShifted) {
            I2C_LCD1602.clear()
            isLcdShifted = false
        }
        // clear the 3rd digit bcs maybe other value reached 100
        I2C_LCD1602.ShowString(" ", 15, 0)
        screenspace_status = `Big Byte: SL=${sleepiness}`
        I2C_LCD1602.ShowString(screenspace_status, 0, 0)
    }
    basic.pause(3000)
    if (!is_showing && !haltBackgroundTasks) {
        if (isLcdShifted) {
            I2C_LCD1602.clear()
            isLcdShifted = false
        }
        // clear the 3rd digit bcs maybe other value reached 100
        I2C_LCD1602.ShowString(" ", 15, 0)
        screenspace_status = `Big Byte: HU=${hunger}`
        I2C_LCD1602.ShowString(screenspace_status, 0, 0)
    }
})

basic.forever(function () {
    if (!haltBackgroundTasks) {
        basic.pause(500)
        if (input.logoIsPressed()) {
            pat()
        }
    }
    basic.pause(300)
})

// check for dying
basic.forever(function () {
    // it should only die once
    if (!died) {
        if (hunger === 100) {
            for (let i = 0; i < 20; i++) {
                if (hunger !== 100) {
                    break
                }
                basic.pause(3000)
            }
            if (hunger === 100) {
                died = true
                die()
                while (true) {
                    if (selectAB() === 0) {
                        control.reset()
                    }
                }
            }
        }
        basic.pause(1000)
    }
})

// set emotions
basic.forever(function () {
    if (!haltBackgroundTasks && !is_showing) {
        if (happiness > 50) {
            showHappyFace()
        } else if (happiness > 20) {
            showNeutralFace()
        } else {
            showSadFace()
        }
        basic.pause(200)
    }
})

basic.forever(function () {
    if (!sleeping && sleepiness === 100) {
        haltBackgroundTasks = true
        showTalkAnim(ChatList.GoSleep.length * MSG_CHAR_DELAY)
        showMsgAsync(ChatList.GoSleep)
        sleeping = true
        basic.pause(1000)
        showMsgAsync("A) Wake up", "Byte's sleeping")
        while (sleepiness > 0) {
            if (selectAB_poll() === 0) {
                if (sleepiness > 80) {
                    showMsgAsync("Big Byte is still sleepy now.", "Do Not Disturb:")
                    basic.pause(2000)
                    showMsgAsync("A) Wake up", "Byte's sleeping")
                } else {
                    hunger += 100 - sleepiness
                    break
                }
            }
            basic.pause(50)
        }
        checkVarSanity()
        showMsgAsync("*wakes up*")
        sleeping = false
        haltBackgroundTasks = false
        basic.pause(2000)
        I2C_LCD1602.clear()
    }
    basic.pause(1000)
})

basic.forever(function () {
    while (sleeping) {
        basic.pause(15000)
        sleepiness -= 5
    }
    basic.pause(2000)
})

function selectAB_poll(): number {
    if (input.buttonIsPressed(Button.A)) {
        return 0
    }
    if (input.buttonIsPressed(Button.B)) {
        return 1
    }
    return -1
}

function selectAB(timeout_sec?: number): number {
    if (timeout_sec) {
        let ms_timeout = control.millis() + (timeout_sec * 1000)
        while (true) {
            let select = selectAB_poll()
            if (select !== -1) {
                return select
            }
            if (control.millis() > ms_timeout) {
                return -1
            }
        }
    } else {
        while (true) {
            let select = selectAB_poll()
            if (select !== -1) {
                return select
            }
        }
    }
}

function die() {
    haltBackgroundTasks = true
    showMsgAsync(randomChoose(ChatList.Die.final_words))
    basic.pause(3000)
    showMsgAsync(ChatList.Die.death_msg, ChatList.Die.death_status)
}

function pat() {
    showMsg(ChatList.Pat.stat_report, "Big Byte:", true)
    happiness += 5
    checkVarSanity()
}

function checkVarSanity() {
    if (happiness > 100) {
        happiness = 100
    }
    if (hunger > 100) {
        hunger = 100
    }
    if (sleepiness > 100) {
        sleepiness = 100
    }
    if (happiness < 0) {
        happiness = 0
    }
    if (hunger < 0) {
        hunger = 0
    }
    if (sleepiness < 0) {
        sleepiness = 0
    }
}
