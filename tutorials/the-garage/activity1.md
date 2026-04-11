# Mission Briefing

### @explicitHints true

## Welcome @unplugged

**Welcome to Junior Engineers: Race Day Ready!**

You have been recruited as part of a junior innovation team. Your mission: help prepare an F1 car for a high-stakes test session in Miami.

Your engineer guide will walk you through each step. You will design, test, and improve your car setup while earning **Performance Points** and **Efficiency Points**.

Let's start in the garage.

## Step 1

First, set the scene. Use a dark background color to represent the garage.

```blocks
scene.setBackgroundColor(6)
```

## Step 2

Show the mission briefing so the player knows what to do.

```blocks
game.splash("Junior Engineers", "Prepare your car for Miami!")
```

## Step 3

Create your car sprite. This is the vehicle your team will design, test, and improve.

```blocks
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
```

## Step 4

Let the player move the car using the controller. This is the first test of your setup.

```blocks
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 5

Set up the scoring system. You will track **Performance Points** using the score and **Efficiency Points** using a life counter.

```blocks
info.setScore(0)
info.setLife(5)
```

## Complete

Your car is on the floor and ready to move. The dashboard is live.

Play the game in the simulator to make sure everything works. Engineers always test before they tune!
