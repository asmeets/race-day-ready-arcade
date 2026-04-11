# Pit Stop Briefings

### @explicitHints true

## Introduction @unplugged

Every great team uses pit stops to make smart decisions.

In this activity, you will add pit stops to the track. Each pit stop gives the player a short career-connected briefing and a chance to improve their car.

This is where engineering meets strategy.

## Step 1

Create a pit stop sprite that appears on the track.

```blocks
let pitStop = sprites.create(img`
    . . 8 8 8 8 . .
    . 8 8 f f 8 8 .
    8 8 f f f f 8 8
    8 8 f f f f 8 8
    . 8 8 f f 8 8 .
    . . 8 8 8 8 . .
`, SpriteKind.Food)
pitStop.setPosition(randint(20, 140), randint(20, 100))
```

## Step 2

When the player reaches the pit stop, show a career briefing.

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    game.splash("Pit Stop: Data Analyst", "Use results to improve performance")
})
```

## Step 3

Give the player a small upgrade at each pit stop. Restore one Efficiency Point.

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(1)
    game.splash("Pit Stop: Engineer", "Upgrade applied!")
})
```

## Step 4

Add a timer that spawns new pit stops so students encounter multiple career briefings.

```blocks
game.onUpdateInterval(8000, function () {
    let newPit = sprites.create(img`
        . . 8 8 8 8 . .
        . 8 8 f f 8 8 .
        8 8 f f f f 8 8
        8 8 f f f f 8 8
        . 8 8 f f 8 8 .
        . . 8 8 8 8 . .
    `, SpriteKind.Food)
    newPit.setPosition(randint(20, 140), randint(20, 100))
})
```

## Step 5

Think about which career briefings you would add. Some ideas:

- **Software Engineer:** controls, game logic, reliability
- **Aero Engineer:** downforce vs. speed tradeoffs
- **UX Designer:** making the game clear and fair
- **Sustainability Lead:** efficiency as a real constraint

## Complete

You added pit stops with career connections to the race.

Each stop is a chance to learn something new and improve the car. That is how real teams work: test, stop, think, improve.
