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

function selectPlace(game: TicTacToe): XY{
    let board = game.getBoard()
    for (let i = 0; i < 3; i++) {
        for (let i1 = 0; i1 < 3; i1++) {
            if (!board[i][i1]) {
                while (true) {
                    led.plot(i + 1, i1 + 1)
                    let select = selectAB_poll()
                    if (select === 0) {
                        break
                    } else if (select === 1){
                        return [i, i1]
                    }
                    basic.pause(20)
                    led.unplot(i + 1, i1 + 1)
                }
            }
        }
    }
    return [-1, -1]
}

function randomPlace(game:TicTacToe): XY {
    let board = game.getBoard()
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
    let game = new TicTacToe()
    game.drawBoard()
    while (game.turns < 9) {
        if (game.currentPlayer = '0') {
            let select = selectPlace(game)
            game.place(select[0], select[1])
        } else {
            basic.pause(2000)
            let select = randomPlace(game)
            game.place(select[0], select[1])
        }
        switch (game.getWinner()) {
            case "0":
                showSadFace()
                break
            
            case "1":
                showHappyFace()
                break
            
            default:
                break
        }
    }
}

// 0 for player, 1 for big byte
type Player = '0' | '1'
type Result = 'Win' | 'Tie' | 'Lose'
type XY = [number, number]

class TicTacToe {
    public currentPlayer: Player;
    private board: (Player | null)[][];
    public gameEnd: Result;
    public turns: number;

    constructor() {
        this.currentPlayer = '0';
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.gameEnd = null
        this.turns = 0
    }

    place(row: number, col: number) {
        if (this.board[row][col]) {
            return
        }
        this.board[row][col] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === '0' ? '1' : '0';
        this.turns++
    }

    getWinner(): Player | null {
        let winner = this.getWinner_wrapper()
        if (winner === '0') {
            this.gameEnd = "Win"
        } else if (winner === "1"){
            this.gameEnd = "Lose"
        } else if (this.turns >= 9) {
            this.gameEnd = "Tie"
        }
        return winner
    }

    getWinner_wrapper(): Player | null {
        // Check rows
        for (const row of this.board) {
            if (row[0] && row[0] === row[1] && row[1] === row[2]) {
                return row[0];
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            if (this.board[0][col] && this.board[0][col] === this.board[1][col] && this.board[1][col] === this.board[2][col]) {
                return this.board[0][col];
            }
        }

        // Check diagonals
        if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
            return this.board[0][0];
        }

        if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
            return this.board[0][2];
        }

        return null;
    }

    getBoard(): (Player | null)[][] {
        return this.board;
    }

    drawBoard() {
        control.runInParallel(function () {
            basic.clearScreen()
            while (this.gameEnd) {
                for (let i = 0; i < 3; i++) {
                    for (let i1 = 0; i1 < 3; i1++) {
                        if (this.board[i][i1]) {
                            led.plot(i + 1, i1 + 1)
                            if (this.board[i][i1] === '1') {
                                control.runInParallel(function () {
                                    basic.pause(500)
                                    led.unplot(i + 1, i1 + 1)
                                })
                            }
                        } else {
                            led.unplot(i + 1, i1 + 1)
                        }
                    }
                }
                basic.pause(500)
            }
        })
    }
}
