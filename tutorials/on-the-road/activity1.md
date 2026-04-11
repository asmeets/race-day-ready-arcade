# Hit the Track

### @explicitHints true

## Introduction @unplugged

Your car passed the garage test. Now it is time to drive on the real track.

In this activity, you will move from the garage to an open test track. You will control your car, dodge obstacles, and start earning Performance Points under real conditions.

## Step 1

Set a track-style background. Use a medium tone that keeps the car visible.

```blocks
scene.setBackgroundColor(11)
```

## Step 2

Create your car and set up movement. Use the speed variable from the garage.

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

## Step 3

Set up scoring and efficiency for the track run.

```blocks
info.setScore(0)
info.setLife(5)
info.startCountdown(30)
```

## Step 4

Add track obstacles that appear at random intervals.

```blocks
game.onUpdateInterval(2000, function () {
    let obstacle = sprites.create(img`
        . c c c c c .
        c c c c c c c
        c c c c c c c
        . c c c c c .
    `, SpriteKind.Enemy)
    obstacle.setPosition(randint(10, 150), 0)
    obstacle.setVelocity(0, 40)
    obstacle.setFlag(SpriteFlag.AutoDestroy, true)
})
```

## Step 5

Add collision: hitting an obstacle reduces score and shows feedback.

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(-5)
    otherSprite.destroy(effects.disintegrate, 200)
})
```

## Step 6

Reward clean driving. Every few seconds without a collision, add Performance Points.

```blocks
game.onUpdateInterval(3000, function () {
    info.changeScoreBy(2)
})
```

## Complete

You are on the track and racing under real conditions.

Watch your score and efficiency. Every decision matters, just like on a real test day.
