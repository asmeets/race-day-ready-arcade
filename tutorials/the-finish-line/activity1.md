# Final Challenge

### @explicitHints true
### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Final Challenge @showdialog

The final run should use the evidence you gathered earlier: saved setup, saved efficiency, saved strategy, and what you learned from changing conditions.

In this activity, you will combine the systems into one cumulative race.

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

## Step 1

Load the final challenge.

```blocks
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

~hint
This starter keeps the earlier customization and setup choices. The final challenge should feel like a payoff, not a reset.
hint~

## Step 2

Spawn obstacles.

```blocks
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

~hint
Keep one obstacle system here. Students already understand hazards, so the new learning comes from combining systems.
hint~

## Step 3

Spawn pit chances.

```blocks
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

~hint
Pit opportunities create a meaningful strategy decision in the same run instead of separating it into another scene.
hint~

## Step 4

Score risk and recovery.

```blocks
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

~hint
This step makes the final run multi-objective. Students can see risk, recovery, and strategy affecting the outcome together.
hint~

## Step 5

Save the final data.

```blocks
//@validate-exists
info.onCountdownEnd(function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
        game.splash("Final run complete", "Open the data review.")
    }
})
```

~hint
Saving the final data here gives the review tutorial something real to analyze.
hint~

## Complete

This node turns the project into a systems challenge instead of a single-score sprint.

Roles in this node: lead engineer, strategist, and the cross-functional race team.
