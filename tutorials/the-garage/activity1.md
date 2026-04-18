# Mission Briefing

### @explicitHints false

## Welcome to Race Day, Engineers! @showdialog

![Welcome to Miami](../../assets/skillmap/welcome.png)

You have been recruited to join the Mercedes racing team. Your mission is to help prepare their F1 car for a high-stakes test session in Miami.

You will meet team members in different roles who will guide you through the journey. This is a choose-your-own-adventure experience where your decisions shape the run. You will design, test, and improve your car setup while earning **Performance Points** and **Efficiency Points**.

Let's head into the garage first and meet your guide, Avery, a Track Engineer.

## Step 1

First, set the scene. Use a dark background color to represent the garage.

```blocks
scene.setBackgroundColor(6)
```

## Step 2

Show the mission briefing so the player knows what to do and where you are testing.

```blocks
game.splash("Junior Engineers", "Prepare your car for Miami!")
game.splash("Miami Test Day", "Heat: High. Track: Street circuit.")
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
