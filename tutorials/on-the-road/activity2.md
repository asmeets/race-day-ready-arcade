# Pit Stop Briefings

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Pit Wall Decisions @showdialog

A pit stop is not only maintenance. It is also a decision point where teams use timing and data to decide what happens next.

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

## Step 1 - Start Pit-Stop Stage

Activate pit-stop logic.

* Open `Race Day Ready`.
* Start stage as pit stop.
* Add a short briefing splash.

```blocks
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.PitStop)
//@validate-exists
game.splash("Pit wall", "Use data before you make the next call.")
```

## Step 2 - Spawn Pit Markers

Create pit opportunities over time.

* Open `||game:Game||` and add update event.
* Set interval to `8000` ms.
* Inside stage check, create pit marker sprites.

```blocks
//@highlight
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

## Step 3 - Handle Pit Choices

Award strategy and apply setup-dependent outcomes.

* Open `||sprites:Sprites||` and add overlap for player vs food.
* Record pit visit and strategy points.
* Use setup focus to branch the reward.

```blocks
//@highlight
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

## Step 4 - Save Updated State

Keep pit-stop decisions available later.

* Open `||game:Game||` and add update event every `1000` ms.
* Save current run results while in pit-stop stage.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(1000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.PitStop)) {
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
    }
})
```

## Complete

Engineering idea: optimization means choosing the best next move with limited time and information.

Roles in this node: strategist, pit crew, data analyst, and operations lead.
