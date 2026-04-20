# Pit Stop Briefings

### @explicitHints true
### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Pit Wall Decisions @showdialog

A pit stop is not only maintenance. It is also a decision point where teams use data, timing, and communication to choose what happens next.

In this activity, you will add one pit-stop system that combines a career briefing with a saved gameplay effect.

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
raceDayTools.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(raceDayTools.savedEfficiency())
```

## Step 1

Start the pit-stop stage.

```blocks
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.PitStop)
//@validate-exists
game.splash("Pit wall", "Use data before you make the next call.")
```

~hint
This stage change helps later event blocks know when pit-stop logic should run.
hint~

## Step 2

Spawn pit markers.

```blocks
//@validate-exists
game.onUpdateInterval(8000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.PitStop)) {
        //@validate-exists
        let pitStop = sprites.create(img`
            . . 8 8 8 8 . .
            . 8 8 f f 8 8 .
            8 8 f f f f 8 8
            8 8 f f f f 8 8
            . 8 8 f f 8 8 .
            . . 8 8 8 8 . .
        `, SpriteKind.Food)
        pitStop.setPosition(randint(20, 140), randint(20, 100))
        pitStop.lifespan = 4000
    }
})
```

~hint
Pit markers should feel different from hazards. They represent decision points, not punishment.
hint~

## Step 3

Handle pit choices.

```blocks
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.PitStop)) {
        otherSprite.destroy()
        //@validate-exists
        raceDayTools.recordPitStopVisit()
        //@validate-exists
        raceDayTools.awardStrategyPoints(1)
        if (raceDayTools.setupFocusIs(raceDayTools.SetupFocus.Pace)) {
            //@validate-exists
            info.changeLifeBy(1)
            game.splash(raceDayTools.roleLens(), "High pace needs extra energy support.")
        } else {
            //@validate-exists
            info.changeScoreBy(2)
            game.splash(raceDayTools.roleLens(), "Balanced pace lets you push at the right moment.")
        }
    }
})
```

~hint
This is a good place to connect gameplay to roles. The same stop can teach strategy, data, and operations at once.
hint~

## Step 4

Save the updated state.

```blocks
//@validate-exists
game.onUpdateInterval(1000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.PitStop)) {
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
    }
})
```

~hint
Saving the updated state after pit choices keeps those choices visible in the final run and review.
hint~

## Complete

You built a real decision point into the race.

Engineering idea: optimization means choosing the best next move with limited time and information.

Roles in this node: strategist, pit crew, data analyst, and operations lead.
