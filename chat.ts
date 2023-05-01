function getChatMsg(happiness: number, sleepiness: number, hunger: number){
    let _possibleOptions: string[] = [];
    if (hunger > 80) {
        _possibleOptions = _possibleOptions.concat(ChatList.Chitchat.hunger.severe)
    } else if (hunger > 50) {
        _possibleOptions = _possibleOptions.concat(ChatList.Chitchat.hunger.slightly)
    }
    if (sleepiness > 80){
        _possibleOptions = _possibleOptions.concat(ChatList.Chitchat.sleepy)
    }
    if(_possibleOptions.length === 0){
        if (happiness > 50) {
            _possibleOptions = _possibleOptions.concat(ChatList.Chitchat.happy)
        } else if (happiness > 20){
            _possibleOptions = _possibleOptions.concat(ChatList.Chitchat.neutral)
        } else {
            _possibleOptions = _possibleOptions.concat(ChatList.Chitchat.angry)
        }
    }

    return randomChoose(_possibleOptions)
}

function randomChoose(options: string[]) {
    return options[Math.floor(Math.random() * options.length)]
}

function getPlayMsgLosing(): string{
    if (happiness > 60) {
        return randomChoose(ChatList.TicTacToe.losing_tie.happy)
    } else if (happiness > 40) {
        return randomChoose(ChatList.TicTacToe.losing_tie.neutral)
    } else if (happiness > 10){
        return randomChoose(ChatList.TicTacToe.losing_tie.angry)
    } else {
        return randomChoose(ChatList.TicTacToe.no_more_game)
    }
}

function getPlayMsgWinning(): string {
    if (happiness > 60) {
        return randomChoose(ChatList.TicTacToe.winning.happy)
    } else if (happiness > 40) {
        return randomChoose(ChatList.TicTacToe.winning.neutral)
    } else {
        return randomChoose(ChatList.TicTacToe.winning.angry)
    }
}