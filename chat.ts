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