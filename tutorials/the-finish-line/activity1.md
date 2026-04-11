# Final Challenge

### @explicitHints true

## Introduction @unplugged

You are approaching the finish line. But first, one more challenge.

This is the final test. Use everything you have learned about speed, efficiency, and tradeoffs to earn the best combined score.

**Remember:** you cannot lose. If something goes wrong, the game will encourage you and let you try again.

## Step 1

Set the background to a bright color that signals the finish area.

```blocks
scene.setBackgroundColor(8)
```

## Step 2

Start the final run with a countdown and reset the score.

```blocks
info.setScore(0)
info.setLife(5)
info.startCountdown(20)
```

## Step 3

Create your car for the final lap.

```blocks
let driveSpeed = 100
let raceCar = sprites.create(img`
    . . . 6 6 6 6 . .
    . . 6 8 8 8 6 . .
    . 6 6 6 6 6 6 6 .
    . 6 5 6 6 6 5 6 .
    6 6 6 6 6 6 6 6 6
    . 6 6 6 6 6 6 6 .
    . 6 5 6 6 6 5 6 .
    . . 6 6 6 6 6 . .
    . . . 6 6 6 . . .
`, SpriteKind.Player)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 4

Add obstacles and pit stops together for the final challenge.

```blocks
game.onUpdateInterval(2500, function () {
    let obstacle = sprites.create(img`
        . c c c c c .
        c c c c c c c
        c c c c c c c
        . c c c c c .
    `, SpriteKind.Enemy)
    obstacle.setPosition(randint(10, 150), 0)
    obstacle.setVelocity(0, 50)
    obstacle.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(7000, function () {
    let pitStop = sprites.create(img`
        . . 8 8 8 8 . .
        . 8 8 f f 8 8 .
        8 8 f f f f 8 8
        . 8 8 f f 8 8 .
    `, SpriteKind.Food)
    pitStop.setPosition(randint(20, 140), randint(20, 100))
})
```

## Step 5

Collision costs points. Pit stops restore efficiency.

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(-5)
    otherSprite.destroy(effects.disintegrate, 200)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    info.changeScoreBy(3)
    otherSprite.destroy()
})
```

## Complete

You made it to the final challenge.

No matter your score, you tested, adapted, and made real engineering decisions. That is what this team does.
