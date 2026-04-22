# Final Challenge

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Final Challenge @showdialog

The final run should use saved setup, efficiency, strategy, and what you learned from changing conditions.

In this activity, you will combine systems into one cumulative race.

```template
let driveSpeed = 110
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
raceDayTools.setTeamName("Apex Lab")
raceDayTools.setCarName("Velocity")
raceDayTools.setRoleLens(raceDayTools.RoleLens.Strategist)
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 1 - Load Final Challenge State

Prepare the full run.

* Open `||scene:Scene||` and set final challenge background.
* Open `Driven by STEM` and start final challenge stage.
* Load saved speed, reset collisions, apply saved style.
* Open `||info:Info||` and set score, life, countdown.

```blocks
//@highlight
//@validate-exists
scene.setBackgroundColor(8)
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.FinalChallenge)
driveSpeed = raceDayTools.savedDriveSpeed()
//@validate-exists
raceDayTools.resetCollisionCount()
raceDayTools.applySavedCarStyle(raceCar)
//@validate-exists
info.setScore(0)
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
//@validate-exists
info.startCountdown(25)
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
game.splash(raceDayTools.carName(), "Final challenge loaded.")
```

## Step 2 - Spawn Obstacles

Add continuous risk pressure.

* Open `||game:Game||` and add update event every `2500` ms.
* In stage check, spawn enemy obstacles and set downward velocity.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(2500, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
        //@validate-exists
        let obstacle = sprites.create(img`
            . c c c c c .
            c c c c c c c
            c c c c c c c
            . c c c c c .
        `, SpriteKind.Enemy)
        obstacle.setPosition(randint(10, 150), 0)
        obstacle.setVelocity(0, 50)
        obstacle.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
```

## Step 3 - Spawn Pit Opportunities

Add recovery opportunities.

* Open `||game:Game||` and add another update event every `7000` ms.
* Spawn `SpriteKind.Food` pit markers.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(7000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
        //@validate-exists
        let pitStop = sprites.create(img`
            . . 8 8 8 8 . .
            . 8 8 f f 8 8 .
            8 8 f f f f 8 8
            . 8 8 f f 8 8 .
        `, SpriteKind.Food)
        pitStop.setPosition(randint(20, 140), randint(20, 100))
        pitStop.lifespan = 4000
    }
})
```

## Step 4 - Score Risk and Recovery

Combine collision cost and pit-stop recovery.

* Add overlap for player vs enemy to record collision cost.
* Add overlap for player vs food to reward life, score, and strategy.

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
        //@validate-exists
        raceDayTools.recordCollision(5, 1)
        otherSprite.destroy(effects.disintegrate, 200)
    }
})
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
        //@validate-exists
        info.changeLifeBy(1)
        //@validate-exists
        info.changeScoreBy(3)
        //@validate-exists
        raceDayTools.recordPitStopVisit()
        //@validate-exists
        raceDayTools.awardStrategyPoints(1)
        otherSprite.destroy()
    }
})
```

## Step 5 - Save Final Run Data

Store the outcome for reflection.

* Open `||info:Info||` and add `on countdown end`.
* Save current run results.

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
        game.splash("Final run complete", "Open the data review.")
    }
})
```

## Complete

This node turns the project into a systems challenge instead of a single-score sprint.

Roles in this node: lead engineer, strategist, and cross-functional race team.
