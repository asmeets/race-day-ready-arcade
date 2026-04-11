# Changing Conditions

### @explicitHints true

## Introduction @unplugged

On a real test day, conditions change. Rain starts, the track gets slippery, or the wind picks up.

In this activity, you will add changing conditions to the track. Players will need to adapt, just like a real engineering team.

## Step 1

Create a variable that tracks the current weather condition.

```blocks
let weatherCondition = "dry"
```

## Step 2

Add a timed event that changes the weather partway through the race.

```blocks
timer.after(10000, function () {
    weatherCondition = "rain"
    scene.setBackgroundColor(7)
    game.splash("Weather change!", "Rain is falling")
})
```

## Step 3

Make rain affect driving. When it rains, reduce the car speed to simulate lower grip.

```blocks
game.onUpdateInterval(1000, function () {
    if (weatherCondition == "rain") {
        driveSpeed = 60
    } else {
        driveSpeed = 100
    }
    controller.moveSprite(raceCar, driveSpeed, driveSpeed)
})
```

## Step 4

Add a handling penalty during rain. Every few seconds of rain, reduce efficiency.

```blocks
game.onUpdateInterval(3000, function () {
    if (weatherCondition == "rain") {
        info.changeLifeBy(-1)
    }
})
```

## Step 5

Ask yourself the engineering question:

- Should you slow down to save efficiency?
- Or push through the rain for a higher score?

There is no single right answer. That is the tradeoff.

## Complete

You added real-world conditions to your race.

Engineers do not control the weather, but they prepare for it. You just learned how changing variables affect the whole system.
