// X for player, O for big byte
type Result = 'Win' | 'Tie' | 'Lose'
type Player = 'X' | 'O'

let currentPlayer: Player = 'X'
let board: (Player | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
let gameEnd: Result = null
let turns: number = 0

function showPlayMsg(): boolean {
    stopMsg()
    if (hunger > 80) {
        showMsgAsync(ChatList.Play.too_hungry, "Big Byte", true)
        return false
    }
    if (sleepiness > 80) {
        showMsgAsync(ChatList.Play.too_sleepy, "Big Byte", true)
        return false
    }
    if (happiness > 50) {
        showMsgAsync(ChatList.Play.happy)
    } else if (happiness > 20) {
        showMsgAsync(ChatList.Play.neutral)
    } else {
        showMsgAsync(ChatList.Play.angry_refuse)
        return false
    }
    return true
}

function askForPlay() {
    if (!haltBackgroundTasks) {
        haltBackgroundTasks = true
        showTalkAnim(ChatList.WantToPlay.question.length * MSG_CHAR_DELAY)
        showMsgAsync(ChatList.WantToPlay.question)
        basic.pause(1000)
        showMsgAsync(ChatList.WantToPlay.ask.msg, ChatList.WantToPlay.ask.status)
        if (selectAB(10) === 0) {
            showHappyFace()
            showMsgAsync(ChatList.WantToPlay.accept)
            basic.pause(1000)
            walk()
        } else {
            showSadFace()
            showMsgAsync(ChatList.WantToPlay.decline)
        }
        haltBackgroundTasks = false
    }
}

function selectPlace(): number[] {
    basic.pause(50)
    while (true) {
        for (let i = 0; i < 3; i++) {
            for (let i1 = 0; i1 < 3; i1++) {
                if (!board[i][i1]) {
                    while (true) {
                        led.plot(i + 1, i1 + 1)
                        let select = selectAB_poll()
                        if (select === 0) {
                            led.unplot(i + 1, i1 + 1)
                            basic.pause(200)
                            break
                        } else if (select === 1) {
                            return [i, i1]
                        }
                        basic.pause(20)
                    }
                }
            }
        }
    }
}

function randomPlace(): number[] {
    while (true) {
        for (let i = 0; i < 3; i++) {
            for (let i1 = 0; i1 < 3; i1++) {
                if (!board[i][i1]) {
                    if (Math.random() < 0.1) {
                        return [i, i1]
                    }
                }
            }
        }
    }
}


function play() {
    if (showPlayMsg()){
        basic.pause(1000)
        currentPlayer = 'X'
        board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        gameEnd = null
        turns = 0
        drawBoard()
        while (turns < 9) {
            if (currentPlayer === 'X') {
                showMsg("Your Turn!", "Tic Tac Toe:")
                let select = selectPlace()
                place(select[0], select[1])
            } else {
                showMsg("Byte's thinking", "Tic Tac Toe:")
                basic.pause(3000)
                let select = randomPlace()
                place(select[0], select[1])
            }
            switch (getWinner()) {
                case 'X':
                    showMsg("You Win!", "Tic Tac Toe:")
                    basic.pause(2000)
                    hunger += 10
                    sleepiness += 5
                    happiness -= 10
                    checkVarSanity()
                    showMsg(getPlayMsgLosing())
                    showSadFace()
                    basic.pause(3000)
                    return

                case 'O':
                    showMsg("You Lose!", "Tic Tac Toe:")
                    basic.pause(2000)
                    hunger += 10
                    sleepiness += 5
                    happiness += 10
                    checkVarSanity()
                    showMsg(getPlayMsgWinning())
                    showHappyFace()
                    basic.pause(3000)
                    break

                default:
                    break
            }
        }
        showMsg("It's a Tie!", "Tic Tac Toe")
        hunger += 10
        sleepiness += 5
        checkVarSanity()
        basic.pause(200)
    }
}

function place(row: number, col: number) {
    if (board[row][col]) {
        return
    }
    board[row][col] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turns++
}

function getWinner(): Player | null {
    let winner = getWinner_wrapper()
    if (winner === 'X') {
        gameEnd = "Win"
    } else if (winner === 'O') {
        gameEnd = "Lose"
    } else if (turns >= 9) {
        gameEnd = "Tie"
    }
    return winner
}

function getWinner_wrapper(): Player | null {
    // Check rows
    for (const row of board) {
        if (row[0] && row[0] === row[1] && row[1] === row[2]) {
            return row[0];
        }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
        if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            return board[0][col];
        }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }

    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    return null;
}

function drawBoard() {
    control.runInParallel(function () {
        basic.clearScreen()
        while (!gameEnd) {
            for (let i = 0; i < 3; i++) {
                for (let i1 = 0; i1 < 3; i1++) {
                    if (board[i][i1]) {
                        if (board[i][i1] === 'O') {
                            led.toggle(i + 1, i1 + 1)
                        } else {
                            led.plot(i + 1, i1 + 1)
                        }
                    }
                }
            }
            basic.pause(10)
        }
    })
}