# Garage Shakedown

### @explicitHints true
### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Shakedown Run @showdialog

A shakedown is a short test used to check whether a setup behaves the way the team expected.

In this activity, you will test the saved setup, collect evidence, and save the result for the track session.

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

## Step 1

Start the shakedown.

```blocks
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

~hint
The starter code gives students their saved car and profile. This step only adds the shakedown test rules.
hint~

## Step 2

Award performance points.

```blocks
//@validate-exists
game.onUpdateInterval(1000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.GarageShakedown)) {
        //@validate-exists
        info.changeScoreBy(1)
    }
})
```

~hint
This turns survival time into performance evidence. Students can see steady points build when the system is working.
hint~

## Step 3

Spawn cones.

```blocks
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

~hint
Keep hazards simple in the garage. The goal is to test the setup, not overwhelm the player.
hint~

## Step 4

Model collisions.

```blocks
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.GarageShakedown)) {
        //@validate-exists
        raceDayTools.recordCollision(3, efficiencyDrain)
        otherSprite.destroy(effects.disintegrate, 200)
    }
})
```

~hint
This step links the saved setup to the test result. A more aggressive setup should feel riskier here.
hint~

## Step 5

Save the result.

```blocks
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

~hint
Ending the test by saving results is what makes reflection and comparison possible in the next stages.
hint~

## Complete

You just did the first engineering loop: predict, test, measure, and store the result.

Roles in this node: test engineer, reliability engineer, and data engineer.
