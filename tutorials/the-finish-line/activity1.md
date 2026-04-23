# Final Challenge

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Final Challenge @showdialog

![Taylor - Systems Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/taylor.png)

Hey, I'm **Taylor**, Systems Engineer. I got my start in a two-year electronics program, learning by doing, then kept building skills through coursework and certifications while I was already working in the field. On a real team, my job is **integration testing**: I connect all the subsystems together and make sure the **whole experience works**, not just one part in isolation.

That's exactly what this gate is about. You've built your performance system, your efficiency system, and your strategy layer. Now you'll **run them all at once** and see how they hold up together. This is your **final run**, and every choice you made along the way is about to show up in the result. Let's see what your full system can do.

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
drivenByStem.setRoleLens(drivenByStem.RoleLens.SoftwareEngineer)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## {1. Start the Final Challenge stage}

**Initialize the Integration Test**

---

This is it—the moment where all your subsystems run together. Setting the stage to Final Challenge tells every spawner, collision handler, and timer that you're now in full integration mode. Without this signal, events won't know which rules to follow, and your carefully tuned systems won't activate correctly.

* :binoculars: Open `||loops(noclick):on start||` and find the `||drivenByStem:Driven by STEM||` drawer.
* :racing_car: Add the **start stage** block and set it to **Final Challenge**.

~hint Wrong things showing up? 🔍

---

If you see obstacles or pit markers showing up at weird times, suspect a missing stage check. In systems work, "wrong mode" bugs are super common.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img``, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
```

## {2. Set the final scene}

**Create the Race Environment**

---

The final challenge deserves its own visual identity. A distinct background color signals to players that this is the culminating test, while strong contrast ensures that every obstacle and opportunity remains clearly visible during high-speed decision-making.

* :tree: Open `||scene:Scene||` inside `||loops(noclick):on start||`.
* :tree: Add `set background color` and pick a color that contrasts with your car and obstacles.

~hint Hazards hard to see? 🎨

---

If hazards feel hard to see, fix the visuals before you fix the code. A system can be "correct" and still be unusable if signals aren't readable.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img``, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
//@highlight
//@validate-exists
scene.setBackgroundColor(8)
```

## {3. Load saved setup + costs}

**Honor Earlier Engineering Decisions**

---

Every tuning choice you made in the garage matters now. Loading your saved speed, efficiency cost, and car style ensures that this final run authentically reflects the tradeoffs you designed earlier. This is how systems thinking works in practice—earlier decisions cascade forward through the entire experience.

* :racing_car: In `||loops(noclick):on start||`, use `||drivenByStem:Driven by STEM||` to load saved `driveSpeed`.
* :racing_car: Load `efficiencyDrain` from saved efficiency cost.
* :racing_car: Apply saved car style to `raceCar`.

~hint Car doesn't match your setup? 🔧

---

If the car doesn't match your setup, hunt for a leftover hardcoded value in movement. One stray number can override your saved tuning.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img``, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
//@highlight
//@validate-exists
driveSpeed = drivenByStem.savedDriveSpeed()
//@highlight
//@validate-exists
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
//@highlight
//@validate-exists
drivenByStem.applySavedCarStyle(raceCar)
//@highlight
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
```

## {4. Create final tracking variables}

**Prepare the Evidence Capture System**

---

You can't improve what you don't measure. Creating dedicated variables for collisions and pit stops gives the reflection stage concrete evidence to analyze. These counters will tell the complete story of how your system performed under pressure, turning an abstract run into specific, reviewable data.

* :paper plane: Open `||variables:Variables||` and create `finalCollisions`. Set it to `0`.
* :paper plane: Create `finalPitStops` and set it to `0`.

~hint Reflection feels fuzzy? 🔍

---

If your reflection later feels fuzzy, it usually means you didn't track the right signals. Make sure your "final" counters actually change during the run.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img``, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
drivenByStem.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
//@highlight
//@validate-exists
let finalCollisions = 0
//@highlight
//@validate-exists
let finalPitStops = 0
```

## {5. Turn on HUD + countdown}

**Display Real-Time System State**

---

Racing isn't just about going fast—it's about balancing three competing priorities under time pressure. Your HUD displays Performance through score, Efficiency through life, and Strategy through decisions. The countdown creates urgency, forcing you to prioritize tradeoffs instead of optimizing everything perfectly.

* :game pad: Open `||info:Info||` inside `||loops(noclick):on start||`, set score to `0`, and set life from saved efficiency.
* :game pad: Add a `start countdown` block set to `25` seconds.
* :game pad: Add a `||game:splash||` that reminds players to balance Performance (score), Efficiency (life), and Strategy.

~hint Run never ends? ⏱️

---

If the run never ends, check whether you started the countdown and whether you added a countdown-end event.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img``, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
drivenByStem.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
let finalCollisions = 0
let finalPitStops = 0
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(drivenByStem.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(25)
//@highlight
//@validate-exists
game.splash("Balance all three", "Performance. Efficiency. Strategy.")
```

## {6. Spawn obstacles (risk)}

**Generate Continuous Performance Pressure**

---

Obstacles represent the unpredictable risks that every racing team faces—track debris, weather changes, mechanical stress. By spawning them continuously throughout the run, you create sustained pressure that tests whether your efficiency tuning can handle extended challenges, not just a single perfect moment.

* :game pad: Open `||game:Game||` and add a new **on update interval** block set to `2500` ms.
* :paper plane: Inside the update, check if stage is **Final Challenge**, then spawn an **Enemy** sprite near the top of the screen with downward velocity and auto-destroy enabled.

~hint Too chaotic? 🌀

---

If the run feels too chaotic, slow spawns first. If it's readable, you can always ramp it back up.

hint~

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(2500, function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        let obstacle = sprites.create(img``, SpriteKind.Enemy)
        //@highlight
        //@validate-exists
        obstacle.setPosition(randint(10, 150), 0)
        //@highlight
        //@validate-exists
        obstacle.vy = 50
        //@highlight
        //@validate-exists
        obstacle.lifespan = 3000
    }
})
```

## {7. Spawn pit opportunities (recovery)}

**Provide Strategic Recovery Options**

---

Real racing isn't just about avoiding problems—it's about knowing when to recover. Pit markers transform the challenge from pure reflexes into strategic decision-making: do you maintain your current pace or take a moment to restore efficiency? This turns the game into a test of judgment, not just speed.

* :game pad: Open `||game:Game||` and add a new **on update interval** block set to `7000` ms.
* :paper plane: Inside the update, check if stage is **Final Challenge**, then spawn a `||sprites:Food||` sprite with a short lifespan.

~hint Pit markers not showing? ⏱️

---

If pit markers never show up, check timing and lifespan. If they show up but feel useless, check that your overlap event is looking for the right kind.

hint~

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(7000, function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        let pitMarker = sprites.create(img``, SpriteKind.Food)
        //@highlight
        //@validate-exists
        pitMarker.setPosition(randint(20, 140), randint(20, 100))
        //@highlight
        //@validate-exists
        pitMarker.lifespan = 4000
    }
})
```

## {8. Score risk + recovery}

**Connect Actions to Measurable Outcomes**

---

Events without feedback are invisible to players. By wiring collision and pit stop overlaps to the HUD, you make every decision immediately visible through score changes, life updates, and visual effects. This feedback loop is what turns abstract code into a readable, learnable system.

* :paper plane: Open `||sprites:Sprites||` and add an overlap event for **Player** vs **Enemy**: deduct Efficiency and destroy the obstacle.
* :paper plane: Add a second overlap event for **Player** vs **Food**: restore life, add to score, record a pit stop, and destroy the marker.

~hint Events doing nothing? 🐛

---

If a collision or pit stop does "nothing," that's usually a kind mismatch. Verify your Enemy vs Food overlap events match what you actually spawned.

hint~

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        finalCollisions += 1
        //@highlight
        //@validate-exists
        info.changeLifeBy(-efficiencyDrain)
        //@highlight
        //@validate-exists
        otherSprite.destroy(effects.disintegrate, 200)
    }
})
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        finalPitStops += 1
        //@highlight
        //@validate-exists
        drivenByStem.recordPitStopVisit()
        //@highlight
        //@validate-exists
        info.changeLifeBy(1)
        //@highlight
        //@validate-exists
        info.changeScoreBy(3)
        //@highlight
        //@validate-exists
        drivenByStem.awardStrategyPoints(1)
        //@highlight
        //@validate-exists
        otherSprite.destroy()
    }
})
```

## {9. Save final run data}

**Preserve the Complete Performance Record**

---

Integration testing isn't complete until you've captured the results. The countdown-end event is your only guaranteed moment to save performance data before the run terminates. This saved evidence becomes the foundation for reflection, comparison, and the next round of tuning decisions.

* :game pad: Open `||info:Info||` and add an **on countdown end** event block.
* :racing_car: Inside it, check if stage is **Final Challenge**, then use `||drivenByStem:Driven by STEM||` to save current run results.

~hint Review shows nothing? 📊

---

If review shows blank or zero values, results probably weren't saved at the end. Confirm the save runs inside countdown-end.

hint~

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        drivenByStem.saveCurrentRunResults()
        //@highlight
        //@validate-exists
        game.splash("Final run complete", "Open the data review.")
    }
})
```

## Complete

**You nailed it!** You ran all your subsystems together in one integrated final challenge. You built obstacle spawners, pit stop recovery events, collision handlers, and a countdown-end event that saved the complete run. Integration testing means running all subsystems together and checking that they work as a whole, not just each part in isolation. That's exactly what you just completed.

Roles in this tutorial: systems engineer, lead engineer, strategist, and cross-functional race team.
