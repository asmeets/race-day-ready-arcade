# Setup and Tradeoffs

### @explicitHints true

## Introduction @unplugged

Great work getting the car ready.

Now it is time to think like a real engineer. You will tune your car's speed and handling, and make your first design tradeoff.

**Remember:** faster is not always better. The best engineers find the right balance.

## Step 1

Create a variable for your car's drive speed. This is the value you will tune.

```blocks
let driveSpeed = 80
```

## Step 2

Use your speed variable to control car movement.

```blocks
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
```

## Step 3

Now think like a race engineer. **Before you change anything, predict what will happen.**

Try increasing `driveSpeed` to **120**. Will the car be easier or harder to control?

```blocks
let driveSpeed = 120
```

## Step 4

Create a variable for efficiency. This tracks whether your choices are sustainable.

```blocks
let efficiencyRating = 5
info.setLife(efficiencyRating)
```

## Step 5

Add a rule: higher speed costs more energy. Every second, reduce efficiency if speed is high.

```blocks
game.onUpdateInterval(2000, function () {
    if (driveSpeed > 100) {
        efficiencyRating += -1
        info.setLife(efficiencyRating)
    }
})
```

## Step 6

Show the engineer guide's advice.

```blocks
game.splash("Engineer says:", "Balance speed and efficiency!")
```

## Complete

You just made your first engineering tradeoff.

More speed used more energy. A real F1 team faces this exact decision. Test different speed values and watch what happens to your Efficiency Points.
