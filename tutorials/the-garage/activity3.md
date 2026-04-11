# Garage Test Run

### @explicitHints true

## Introduction @unplugged

Your car is tuned. Your dashboard is live. Now it is time for a short test run in the garage.

This is what engineers call a **shakedown**: a quick test to check that everything works before the real track session.

## Step 1

Set the background to a light color to represent the garage test area.

```blocks
scene.setBackgroundColor(1)
```

## Step 2

Add a countdown so the test has a clear end point. Engineers always test within limits.

```blocks
info.startCountdown(15)
```

## Step 3

Reward the player for each second they keep racing. This builds Performance Points.

```blocks
game.onUpdateInterval(1000, function () {
    info.changeScoreBy(1)
})
```

## Step 4

Add a simple hazard. Create a cone sprite that appears on screen.

```blocks
let cone = sprites.create(img`
    . . . c . . .
    . . c a c . .
    . c a a a c .
    c a a a a a c
`, SpriteKind.Enemy)
cone.setPosition(randint(20, 140), randint(20, 100))
```

## Step 5

Add a collision rule: hitting the cone costs Performance Points and shows a warning.

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(-3)
    otherSprite.destroy(effects.disintegrate, 200)
    game.splash("Collision!", "Engineers learn from mistakes")
})
```

## Complete

You completed your garage shakedown.

Check your Performance Points and Efficiency Points. Did you find a good balance? Engineers review test results before every track session.

Next stop: the open road.
