
export const CommonAdventures = {
    //1
    DwarvenMine: {
        type: "story",
        heading: "Dwarven Mine",
        story: "You find a trail that leads deep into the forest, towards the Crescent Mountains.  The path becomes thick with overgrowth, but two grooves make it clear that the path continues.  Finally, the path ends at a large mine whos entrance is covered with large boulders.",
        actions: [
            {text: "Search the Rubble", action: "SearchRubble"},
            {condition: [{stat:"strength",value:15}], text: "Move the rocks and explore the mine",action: "ExploreTheMine"},
            {text: "Return Home", action: "ReturnHome"}
        ]
    },
    //2
    ExploreTheMine: {
        type: "story",
        heading: "Mine Entrance",
        story: "The mine entrance is surprisingly large, given that the cave entrances was barely small enough for you to crawl through.  Giant wooden carved doors lay open, and seem to be the only way to proceed.  These mines are old, but the mountain is huge, so this is likely the only entrance and therefore, the only exit.",
        actions: [
            {condition: [{stat:"magic",value:15}], text: "Hidden Entrance", action: "MineMagicEntrance"},
            {text: "Leave the Mines",action: "ReturnHome"},
            {text: "Explore!", action: "MinesGreatHall"}
        ]
    },
    //3
    MinesGreatHall: {
        type: "story",
        heading: "The Great Hall",
        story: "You stand in a grand hallway.  The ceiling is at least 50 foot tall and the hall is 100 feet wide and extends farther than your eye can see.  Despite being completely underground, the hall is well lit from magical torches attached to the ornately carved pillars.  Time has worn the stone, and layers of dust cover everything, but the mines are still well crafted and ornate.  Upon inspection, there are two side rooms and the mine entrance in the back.",
        actions: [
            {text: "Mine Entrance", action:"ExploreTheMine"},
            {text: "Explore the First Side Room",action: "MinesRoom1"},
            {text: "Explore the Second Side Room",action: "MinesRoom2"},
            {text: "Explore the mines",action: "MineShaft"}
        ]
    },
    MinesRoom1: {

    },
    MinesRoom2: {

    },
    //4
    MineShaft: {
        type: "story",
        heading: "The Mine Shaft",
        story: "The Mine Shaft is a long dark tunnel.  It descends deep and is very dark.  Dangers lurk, but so do treasures.",
        encounters: [
            { 10: {action:"OgreFight", returnAction: "MineShaft"}},
            { 20: { text: "You spot a small shimmering piece of gold unmined in the wall.  You chisel it out.",
                    reward: [{stat: "gold", value: 4}] }}
        ],
        actions: [
            {text: "Great Hall", action: "MinesGreatHall"},
            {text: "Explore Deeper", action: "MineShaft2"}
        ]
    },
    //5
    SearchRubble: {
        type: "story",
        heading: "You search the rubble.",
        story: "You dig through the ancient ruins and rocks for hours.  While most things are completely destroyed, you manage to find a handful of gold coins",
        reward: [{stat: "gold",value:4}],
        actions: [{text: "Return Home",action:"ReturnHome"}]
    },
    //6
    FairyGarden: {
        type: "story",
        heading: "Fairy Garden",
        story: "You wander through the forest when you hear the sounds of fluttering wings.  You quiet yourself and sneak further towards the sound.  As you approach, you notice a small number of fairies playing a game.",
        actions: [
            {text: "Return Home", action: "ReturnHome"},
            {text: "Stay and Play",randomAction: {50: "FairyGardenStayAndPlayBad", 100: "FairyGardenStayAndPlay"}},
            {conditions: [{stat:"magic",value:11}], text: "Learn from them", action: "LearnFromFairies"},
            {conditions: [{random:50}], text: "Catch a Fairy", action: "FairiesRandom"}
        ]
    },
    //7
    FairiesRandom: {
        type: "story",
        heading: "Catch a Fairy",
        story: "You are bold and attempt to catch a fairy, but you are unsuccessful.",
        actions: [{text: "Return Home",action: "ReturnHome"}]
    },
    //8
    LearnFromFairies: {
        type: "story",
        heading: "Learn from the Fairies",
        story: "As you approach, you demonstrate a small bit of your magic and ask the Fairies to teach you more.  They show you their ways.",
        reward:[{stat:"satisfaction",value:1}, {stat: "magic", value:1}],
        actions:[{text: "Return Home",action: "ReturnHome"}]
    },
    //9
    FairyGardenStayAndPlay: {
        type: "story",
        heading: "Stay and Play",
        story: "The fairies seem to be playing a game of tag.  One spots you and asks you to join them.  You do so and have a wonderful time.",
        reward: [{stat:"satisfaction",value:1}],
        actions: [{text: "Return Home",action: "ReturnHome"}]
    },
    //10
    FairyGardenStayAndPlayBad: {
        type: "story",
        heading: "Chased away!",
        story: "The fairies are annoyed by your presence and flee quickly.",
        actions: [{text: "Return Home",action: "ReturnHome"}]
    },
    //11
    PotOfGold: {
        type: "story",
        heading: "Pot of Gold",
        story: "You see a pot of gold in the distance.  It seems to be unguarded.  What do you do?",
        actions: [
            {text: "Return Home",action: "ReturnHome"},
            {text: "Take Some Gold",action:"PotOfGoldTakeGold"}
        ]
    },
    //12
    PotOfGoldTakeGold: {
        type: "story",
        heading: "You take some gold",
        reward: [{stat:"gold",value:5}],
        story: "You managed to take some gold and go unnoticed.",
        actions: [{text:"Return Home",action:"ReturnHome"}]
    },
    //13
    Ogre: {
        type: "story",
        heading: "Ogre!",
        story: "As you head into the forest, in the distance you see an Ogre",
        actions: [
            {text:"Flee!",action:"ReturnHome"},
            {text:"Fight!",action:"OgreFight"}
        ] 
    },
    //14
    OgreFight: {
        type: "combat",
        enemyName: "Ogre",
        stats: {hp:20,attack:5,defense:5,magic:0, reward: [{stat:"gold", value: 10}]},
        heading: "Let the battle begin!",
        story: "An ogre is a tall, terrible smelling, and horribly strong creature.",
        actions: []
    },
    //15
    CombatComplete: {
        type: "story",
        heading: "You won!",
        story: "It was hard fought, but you came out victorious",
        reward: [{}],
        actions: []
    },
    //16
    Flee: {
        type: "story",
        heading: "Live to fight another day...",
        story: "You ran as fast and hard as you could and managed to escape with your life.",
        reward: [{}],
        action: [{text: "Return Home",action:"complete"}]
    },
    //17
    ReturnHome: {
        type: "story",
        heading: "Return Home",
        story: "The sun sets as you take the journey back to town",
        actions: [
            {text:"Return Home",action:"complete"}
        ]
    }

};