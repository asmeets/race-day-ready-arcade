# Pit Stop Briefings

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Pit Wall Decisions @showdialog

![Morgan - Strategist](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/morgan.png)

Hey, I'm **Morgan**, your strategist. I didn't start out crunching data; I started in track operations, learning **timing and logistics** by doing the work and talking with the engineers and analysts around me. On a real team, I watch live conditions, **weigh safer options against riskier ones**, and help everyone make fast calls with different pieces of information.

In this gate, you'll build a pit stop that **reads the setup choice you saved earlier** and turns it into a **real decision with real consequences**. The call you make here won't just happen and disappear. It will shape how the rest of your run plays out.

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
raceDayTools.setRoleLens(raceDayTools.RoleLens.Strategist)
raceDayTools.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(raceDayTools.savedEfficiency())
```

## Step 1 – Start the Pit Stop stage

This goes inside `on start` to switch the game into pit mode so pit logic runs correctly.

* Open `||loops(noclick):on start||` and find the existing setup code at the bottom.
* :racing_car: Open `||raceDayTools:Driven by STEM||` and drag `set start stage` into `on start`, set to **Pit Stop**.

> **Morgan tip:** If pit markers show up on the track, that's a stage-mismatch clue. Look for a missing "if stage is Pit Stop" check.

```blocks
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
raceDayTools.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(raceDayTools.savedEfficiency())
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.PitStop)
```

## Step 2 – Show a short briefing

Still inside `on start`, add a one-line prompt so players know they've reached the pit wall phase.

* :game pad: Open `||game:Game||` and add a `splash` block below the stage setter.
* Set the first field to `Pit wall` and the second field to `Use data before you make the next call.`

> **Morgan tip:** Keep this briefing tight. If you need more than a few seconds to explain it, the prompt should be clearer, not longer.

```blocks
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
raceDayTools.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(raceDayTools.savedEfficiency())
raceDayTools.startStage(raceDayTools.RaceStage.PitStop)
//@highlight
//@validate-exists
game.splash("Pit wall", "Use data before you make the next call.")
```

## Step 3 – Track pit stops visited

Still in `on start`, create a counter so there's evidence of how many pit stops the team used.

* :paper plane: Open `||variables:Variables||` and make a new variable named `pitStopsVisited`.
* Drag `set pitStopsVisited to 0` into `on start` below the splash.

> **Morgan tip:** If you skip the counter, you lose evidence. I like having at least one number I can point to: "We used the pit stop ___ times."

```blocks
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
raceDayTools.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(raceDayTools.savedEfficiency())
raceDayTools.startStage(raceDayTools.RaceStage.PitStop)
game.splash("Pit wall", "Use data before you make the next call.")
//@highlight
//@validate-exists
let pitStopsVisited = 0
```

## Step 4 – Spawn pit markers

This is a new event block that runs on its own, separate from `on start`.

* :game pad: Open `||game:Game||` and add an `on update every (8000) ms` block.
* Inside it, add an `if stage is Pit Stop` check from `||raceDayTools:Driven by STEM||`.
* Create a `Food` sprite inside that check and set a short `lifespan` to make it a timed decision.

> **Morgan tip:** If markers vanish instantly, your lifespan is probably too short. Increase it a little and test again.

```blocks
//@highlight
game.onUpdateInterval(8000, function () {
    //@highlight
    if (raceDayTools.stageIs(raceDayTools.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        let pitMarker = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . 4 4 4 4 4 4 4 4 . . . .
            . . . 4 4 . . . . . . 4 4 . . .
            . . . 4 . . . . . . . . 4 . . .
            . . . 4 . . . . . . . . 4 . . .
            . . . 4 4 . . . . . . 4 4 . . .
            . . . . 4 4 4 4 4 4 4 4 . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Food)
        //@highlight
        pitMarker.setPosition(randint(20, 140), randint(20, 100))
        //@highlight
        pitMarker.lifespan = 4000
    }
})
```

## Step 5 – Handle the pit choice

This is a new event block that fires when the player sprite overlaps a pit marker.

* :paper plane: Open `||sprites:Sprites||` and add an `on overlap Player and Food` block.
* Inside an `if stage is Pit Stop` check, change `pitStopsVisited` by 1 and award a Strategy point.
* Add an `if/else` using `setupFocusIs Pace`. Apply a pace reward in the true branch, a balance reward in the else branch.

> **Morgan tip:** If rewards feel "backwards," double-check what you saved as your setup focus earlier. The pit logic is only as smart as the saved choice it reads.

```blocks
//@highlight
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    //@highlight
    if (raceDayTools.stageIs(raceDayTools.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        pitStopsVisited += 1
        //@highlight
        //@validate-exists
        raceDayTools.awardStrategyPoints(1)
        //@highlight
        //@validate-exists
        if (raceDayTools.setupFocusIs(raceDayTools.SetupFocus.Pace)) {
            //@highlight
            info.changeScoreBy(5)
        } else {
            //@highlight
            info.changeLifeBy(2)
        }
        //@highlight
        otherSprite.destroy()
    }
})
```

```ghost
raceDayTools.setupFocusIs(raceDayTools.SetupFocus.Balance)
```

## Step 6 – Save updated results

This is a new event block that runs on its own, carrying your pit-stop decision forward to later gates.

* :game pad: Open `||info:Info||` and add an `on countdown end` block.
* Inside the `if stage is Pit Stop` check, open `||raceDayTools:Driven by STEM||` and drag in `save current run results`.

> **Morgan tip:** If the next gate doesn't seem to remember your pit stop, that's usually a save timing issue. Make sure the save happens after the decision changes something.

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
    }
})
```
```ghost
raceDayTools.recordPitStopVisit()
```

## Complete

**Great job!** You built a pit stop system that reads your saved setup focus and turns it into a real mid-run decision. You created a spawner that generates pit markers on a timer, an overlap event that applies different rewards based on your earlier choice, and a save system that carries your strategy forward.

Engineering idea: optimization means choosing the best next move with limited time and information.

Roles in this tutorial: strategist, pit crew, data analyst, and operations lead.
