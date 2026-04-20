# Garage Shakedown

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Shakedown Run @showdialog

A shakedown is a short test used to check whether your setup behaves the way the team expected.

In this activity, you will run a quick test, capture evidence, and save results for the track.

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

## Step 1 - Start the Shakedown

Configure the short test run.

* Open `||scene:Scene||` and set a garage test background.
* Open `Race Day Ready` and start garage shakedown stage.
* Reset collisions and load saved efficiency cost.
* Open `||info:Info||` and set score, life, and countdown.

```blocks
//@highlight
//@validate-exists
scene.setBackgroundColor(1)
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.GarageShakedown)
//@validate-exists
raceDayTools.resetCollisionCount()
efficiencyDrain = raceDayTools.savedEfficiencyCost()
raceDayTools.applySavedCarStyle(raceCar)
//@validate-exists
info.setScore(0)
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
//@validate-exists
info.startCountdown(15)
```

## Step 2 - Add Performance Scoring

Award points during clean survival.

* Open `||game:Game||` and add `on game update every`.
* Set interval to `1000` ms.
* Inside the event, check stage and increase score.

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

## Step 3 - Spawn Test Hazards

Generate cones for test pressure.

* Open `||game:Game||` and add another update event.
* Set interval to `2000` ms.
* Open `||sprites:Sprites||` and create a cone enemy in that event.

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
        cone.lifespan = 1500
    }
})
```

## Step 4 - Record Collisions

Convert collisions into measurable cost.

* Open `||sprites:Sprites||` and add overlap between player and enemy.
* Check that the stage is garage shakedown.
* Record collision impact using saved efficiency drain.

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

## Step 5 - Save Results

Store shakedown evidence for the next stage.

* Open `||info:Info||` and add `on countdown end`.
* If collisions are low, award strategy.
* Save current run results.

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
        game.splash("Shakedown complete", "Use the data on the track.")
    }
})
```

## Complete

You completed the first engineering loop: predict, test, measure, store.

Roles in this node: test engineer, reliability engineer, and data engineer.
