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
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.setRoleLens(drivenByStem.RoleLens.Strategist)
drivenByStem.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(drivenByStem.savedEfficiency())
```

## {1. Start the Pit Stop stage}

**Activating the Pit Wall Environment**

---

Before any pit decisions can happen, the game needs to know which mode it's running in. Setting the stage tells all your event blocks whether they should execute pit logic or stay quiet. This is how real systems coordinate different operational modes—one clear signal that every subsystem can check.

* :binoculars: Open `||loops(noclick):on start||` and find the existing setup code at the bottom.
* :racing_car: Open `||drivenByStem:Driven by STEM||` and drag `set start stage` into `on start`, set to **Pit Stop**.

~hint Markers in wrong place? 🚨

---

If pit markers show up on the track, that's a stage-mismatch clue. Look for a missing "if stage is Pit Stop" check.

hint~

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
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(drivenByStem.savedEfficiency())
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
```

## {2. Show a short briefing}

**Communicating Context to the Driver**

---

In real racing, clear communication prevents mistakes. A quick message at the start of the pit phase tells the player they've transitioned from driving to decision-making. This mirrors how race engineers brief drivers over the radio before critical moments—short, direct, and focused on what matters right now.

* :game pad: Open `||game:Game||` and add a `splash` block below the stage setter.
* :keyboard: Set the first field to `Pit wall` and the second field to `Use data before you make the next call.`

~hint Message too long? ⚡

---

Keep this briefing tight. If you need more than a few seconds to explain it, the prompt should be clearer, not longer.

hint~

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
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(drivenByStem.savedEfficiency())
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
//@highlight
//@validate-exists
game.splash("Pit wall", "Use data before you make the next call.")
```

## {3. Track pit stops visited}

**Recording Strategic Decisions**

---

Every pit stop costs time, so teams track how often they use them to evaluate their strategy later. Creating a counter variable gives you measurable evidence of your decision-making patterns. This is the same principle data analysts use when they review race logs to identify what worked and what didn't.

* :paper plane: Open `||variables:Variables||` and make a new variable named `pitStopsVisited`.
* :paper plane: Drag `set pitStopsVisited to 0` into `on start` below the splash.

~hint Lost evidence? 📊

---

If you skip the counter, you lose evidence. I like having at least one number I can point to: "We used the pit stop ___ times."

hint~

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
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(drivenByStem.savedEfficiency())
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
game.splash("Pit wall", "Use data before you make the next call.")
//@highlight
//@validate-exists
let pitStopsVisited = 0
```

## {4. Spawn pit markers}

**Creating Time-Limited Opportunities**

---

Pit windows appear and disappear based on track position and race conditions. By spawning markers on a timer with a limited lifespan, you're modeling the reality that strategic opportunities don't wait forever. Engineers design systems that create these windows, and strategists decide when to use them—both roles rely on timing.

* :game pad: Open `||game:Game||` and add an `on update every (8000) ms` block.
* :racing_car: Inside it, add an `if stage is Pit Stop` check from `||drivenByStem:Driven by STEM||`.
* :paper plane: Create a `Food` sprite inside that check and set a short `lifespan` to make it a timed decision.

~hint Markers vanishing too fast? ⏱️

---

If markers vanish instantly, your lifespan is probably too short. Increase it a little and test again.

hint~

```blocks
//@highlight
game.onUpdateInterval(8000, function () {
    //@highlight
    if (drivenByStem.stageIs(drivenByStem.RaceStage.PitStop)) {
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

## {5. Handle the pit choice}

**Applying Conditional Rewards Based on Setup**

---

The pit stop doesn't give the same reward to everyone—it responds to the setup choice you saved earlier. If you optimized for pace, you get a speed boost; if you optimized for balance, you get efficiency back. This conditional logic mirrors how real teams tune their strategies to their car's strengths and the current race situation.

* :paper plane: Open `||sprites:Sprites||` and add an `on overlap Player and Food` block.
* :racing_car: Inside an `if stage is Pit Stop` check, change `pitStopsVisited` by 1 and award a Strategy point.
* :racing_car: Add an `if/else` using `setupFocusIs Pace`. Apply a pace reward in the true branch, a balance reward in the else branch.

~hint Rewards feel backwards? 🔄

---

If rewards feel "backwards," double-check what you saved as your setup focus earlier. The pit logic is only as smart as the saved choice it reads.

hint~

```blocks
//@highlight
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    //@highlight
    if (drivenByStem.stageIs(drivenByStem.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        pitStopsVisited += 1
        //@highlight
        //@validate-exists
        drivenByStem.awardStrategyPoints(1)
        //@highlight
        //@validate-exists
        if (drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Pace)) {
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
drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Balance)
```

## {6. Save updated results}

**Persisting Decisions Across Stages**

---

Your pit decision only matters if it carries forward to the next stage. Saving the updated results at the end of the countdown ensures that later gates can see what you did here and respond accordingly. This is how real telemetry systems preserve race data—each phase builds on the last, and nothing gets lost between transitions.

* :game pad: Open `||info:Info||` and add an `on countdown end` block.
* :racing_car: Inside the `if stage is Pit Stop` check, open `||drivenByStem:Driven by STEM||` and drag in `save current run results`.

~hint Next gate forgot your choice? 💾

---

If the next gate doesn't seem to remember your pit stop, that's usually a save timing issue. Make sure the save happens after the decision changes something.

hint~

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        drivenByStem.saveCurrentRunResults()
    }
})
```
```ghost
drivenByStem.recordPitStopVisit()
```

## Complete

**Great job!** You built a pit stop system that reads your saved setup focus and turns it into a real mid-run decision. You created a spawner that generates pit markers on a timer, an overlap event that applies different rewards based on your earlier choice, and a save system that carries your strategy forward.

Engineering idea: optimization means choosing the best next move with limited time and information.

Roles in this tutorial: strategist, pit crew, data analyst, and operations lead.
