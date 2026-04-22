# Garage Shakedown

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Shakedown Run @showdialog

Hey, I'm Jordan — the test engineer on this crew. I didn't start out coding; I came up through hands-on troubleshooting, learning to document problems clearly before I ever touched an automated test. What hooked me was realizing you can turn "I think the car handles well" into "I know it does, and here's the data." That's exactly what a shakedown run is for: a short, controlled test before the real race begins.

In this gate you'll start a 15-second shakedown stage and track every collision, your score, and your remaining life. At the end, you'll save those results so the next stage can react to what you actually learned. Let's turn your guesses into evidence.

```template
let driveSpeed = 110
let efficiencyDrain = 2
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
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.saveTeamSetup(driveSpeed, efficiencyDrain, raceDayTools.SetupFocus.Pace)
raceDayTools.setTeamName("Apex Lab")
raceDayTools.setCarName("Velocity")
raceDayTools.setRoleLens(raceDayTools.RoleLens.PerformanceEngineer)
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 1 - Start the Shakedown Stage

Wire up `on start` so every run begins from a clean, known state before any timers fire.

* Open `||raceDayTools:Driven by STEM||` and add `start stage` set to **Garage Shakedown** inside `||loops(noclick):on start||`.
* Reset the collision count, then load your saved efficiency cost into `efficiencyDrain`.
* Apply the saved car style to `raceCar`.

> **Jordan tip:** If the wrong events fire, my first check is the stage. Make sure you really started Garage Shakedown before the timers begin.

```blocks
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.GarageShakedown)
//@highlight
//@validate-exists
raceDayTools.resetCollisionCount()
//@highlight
efficiencyDrain = raceDayTools.savedEfficiencyCost()
//@highlight
//@validate-exists
raceDayTools.applySavedCarStyle(raceCar)
```

## Step 2 - Turn On the HUD and Countdown

Still inside `on start`, configure the scoreboard and timer so every team tests the same 15-second window.

* Open `||info:Info||` and set score to `0` and life to your saved efficiency value.
* Add `start countdown` set to `15` seconds.

> **Jordan tip:** If the countdown doesn't start, look for where that block lives. Countdown setup works best in on start, not inside an overlap or timer event.

```blocks
raceDayTools.startStage(raceDayTools.RaceStage.GarageShakedown)
raceDayTools.resetCollisionCount()
efficiencyDrain = raceDayTools.savedEfficiencyCost()
raceDayTools.applySavedCarStyle(raceCar)
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(15)
```

## Step 3 - Add Performance Scoring Over Time

This is a timed event — it fires every second on its own, separate from `on start`, to reward clean survival.

* Open `||game:Game||` and add `on game update every` set to `1000` ms.
* Inside the event, check that the stage is Garage Shakedown.
* Open `||info:Info||` and add score `+1` inside that check.

> **Jordan tip:** If you notice score climbing outside the shakedown, that's a sign your stage check is missing or mismatched. That's the first thing I'd audit.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(1000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.GarageShakedown)) {
        //@validate-exists
        info.changeScoreBy(1)
    }
})
```

## Step 4 - Spawn Test Hazards

This is a separate timed event — it fires every 2 seconds on its own to keep pressure on the driver.

* Open `||game:Game||` and add another `on game update every` set to `2000` ms.
* Inside the event, check the stage, then create an Enemy cone sprite at a random position.
* Give the cone a short `lifespan` so the screen doesn't fill up.

> **Jordan tip:** If cones start to feel impossible, it's usually a timing issue. Re-check the interval and lifespan so the test stays challenging but fair.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(2000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.GarageShakedown)) {
        //@validate-exists
        let cone = sprites.create(img`
            . . . c . . .
            . . c a c . .
            . c a a a c .
            c a a a a a c
        `, SpriteKind.Enemy)
        cone.setPosition(randint(20, 140), randint(20, 100))
        //@validate-exists
        cone.lifespan = 1500
    }
})
```

## Step 5 - Record Collisions

This is an overlap event — it fires whenever Player and Enemy touch, independently of `on start`.

* Open `||sprites:Sprites||` and add an `on overlap` event for `Player` and `Enemy`.
* Inside the event, check the stage, then use `||raceDayTools:Driven by STEM||` to record the collision with `efficiencyDrain`.
* Destroy the cone with an effect so the impact is visually obvious.

> **Jordan tip:** If collisions don't seem to "cost" anything, I'd confirm what value you loaded into `efficiencyDrain` before the overlap event runs.

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.GarageShakedown)) {
        //@validate-exists
        raceDayTools.recordCollision(3, efficiencyDrain)
        otherSprite.destroy(effects.disintegrate, 200)
    }
})
```

## Step 6 - Save Results and Award Strategy

This countdown-end event fires automatically when time runs out — it must exist separately from `on start`.

* Open `||info:Info||` and add an `on countdown end` event.
* Inside the event, check if collisions are `≤ 1` and use `||raceDayTools:Driven by STEM||` to award Strategy `+1`.
* Use `||raceDayTools:Driven by STEM||` to save the current run results.

> **Jordan tip:** If the shakedown ends but nothing saves, I'd look inside your countdown-end event. The save block has to be inside that event to run at the finish.

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.GarageShakedown)) {
        if (raceDayTools.collisionCount() <= 1) {
            //@validate-exists
            raceDayTools.awardStrategyPoints(1)
        }
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
        game.splash("Shakedown complete", "This data powers your next decisions.")
    }
})
```

## Complete

A shakedown tests whether design behavior matches design intent — you just completed the full engineering loop: predict, test, measure, store.

Roles in this node: test engineer, reliability engineer, and data engineer.
