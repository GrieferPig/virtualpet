let ChatList = {
    Greeting: [
        "Hi new friend! My name is Big Byte, your best virtual buddy.", 
        "We can do a lot of fun stuff together, like walking, talking, or even play Tic Tac Toe!",
        "Just like you, I'll get hungry, grumpy and sleepy as time goes on.",
        "Make sure to check my status on the top right corner regularly!",
        "And that's all about myself. We'll gonna have a lot of fun together!"
    ],
    Chitchat: {
        happy: [
            "What a great day, isn't it?",
            "We're going to have lots of fun together!",
            "Ooh, what's the plan?",
            "*singing*",
            "Look, I'm Pickle Byte!"
            ],
        neutral: [
            "Bored, bored, bored...",
            // "I'm a lonely spirit trapped inside a cold-blooded silicon brain...",
            "Lemme get myself a book because I'm bored right now",
            "...",
            "Don't left me in the scrap yard!"
        ],
        angry: [
            // "Can't we do something together?",
            "Are we going to stay still here until one of us died?",
            "Great, nobody is hearing me.",
            "Have you ever cared about my mental being?",
            "Am I nothing to you?",
            // "You know when nobody talks to me I get grumpy, don't you?"
        ],
        hunger: {
            slightly: [
                // "I've got nothing in my tummy right now.",
                "Kinda hungry right now.",
                "I see some food... in my imagination."
            ],
            severe: [
                "I'm HUNGRY! CAN YOU HEAR ME???",
                "HELLLLLLLLLLO? I'm HUNGRY!",
                "I'M DYING! GIVE ME SOME FOOD!",
                // "I WANT FOOD!"
            ]
        },
        sleepy: [
            "Kinda sleepy right now.",
            "*yawns*"
        ]
    },
    GoSleep: "I'm going to sleep right now, good night.",
    WantToWalk: {
        ask: {
            status: " Go for a walk?",
            msg: "A) Yes    B) No "
        },
        question: "How about let's go for a walk together? That might be fun!",
        accept: "Woo-hoo! Let's go!",
        decline: "Guess you're kinda tired, huh?"
    },
    WantToPlay: {
        ask: {
            status: " Play TicTacToe?",
            msg: "A) Yes    B) No "
        },
        question: "Ooh, let's play tic tac toe! I'm really good at this.",
        accept: "You sure? Well, you'd better be prepared!",
        decline: "Come on! Don't be a coward."
    },
    Walk: {
        happy: "Let's go!",
        neutral: "K, let's go.",
        angry: "Finally!",
        stat_report: "You took Big Byte for a walk, +10 happiness, +20 hunger, +10 sleepiness",
        too_sleepy: "Big Byte is too sleepy to take a walk.",
        too_hungry: "Big Byte is too hungry to take a walk."
    },
    Eat: {
        full: "*burps* I'm full, thank you.",
        normal: "*nom nom nom* yummy!",
        starving: "Finally! I'm starving.",
        stat_report: "You fed Big Byte some food, +5 happiness, -20 hunger"
    },
    Play: {
        happy: "You'd betcha.",
        neutral: "OK then.",
        angry_refuse: "Nope.",
        too_sleepy: "Big Byte is too sleepy to play a game.",
        too_hungry: "Big Byte is too hungry to play a game."
    },
    // Pat: {
    //     stat_report: "You pat Big Byte, +5 happiness"
    // },
    // Temp: {
    //     cold: "It's getting a bit chilly isn't it?",
    //     hot: "Woah, it's really hot."
    // },
    // Fall: [
    //     "Careful! Don't drop me.",
    //     "Careful! I don't wanna be hurt.",
    //     "Don't drop me!",
    //     ],
    TicTacToe: {
        winning: {
            happy: [
                "Gotcha!",
                "Yeah!",
                "Woohoo!",
            ],
            neutral: [
                "That feels right!",
                "Told ya.",
                "I'm feeling it!"],
            angry: [
                "Ha! just beated you!",
                // "You sucker!",
                "Guess you're not that smart after all, huh?"]
        },
        losing_tie: {
            happy: [
                "Good Game!",
                "Nice Move!",
                "You're really good at this."
            ],
            neutral: [
                "Okay...",
                "This is getting intense.",
                "You're really serious at games.",
                "No way.",
                "This ain't feeling right."
            ],
            angry: [
                "This is NOT what I meant.",
                "This is not happening.",
                "You cheating?",
                "Why you're always winning?"
            ]
        },
        no_more_game: [
            "That's it! No more games!",
            "*rage quits*",
            "Enough!",
            "Unbelievable!"
        ]
    },
    Die: {
        final_words: [
            "Arghhhhhhh!",
            "Oof!",
            "*dies peacefully*",
            ],
        death_status: "Big Byte died.",
        death_msg: "A) Respawn"
    }
}
