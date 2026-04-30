# Final Challenge

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Final Challenge @showdialog

![Taylor - Systems Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/taylor.png)

Hey, I'm Taylor, Systems Engineer. I got my start in a two-year electronics program, learning by doing, then kept building skills through coursework and certifications while I was already working in the field. On a real team, my job is integration testing: I connect all the subsystems together and make sure the whole experience works, not just one part in isolation.

That's exactly what this gate is about. You've built your performance system, your efficiency system, and your strategy layer. Now you'll run them all at once and see how your saved setup performs under one integrated test. This is your final run, and the result you save here is the data Drew will read in Reflect and Review.

## {1. Start the Final Challenge stage}

**Initialize the Integration Test**

---

This is it—the moment where all your subsystems run together. Setting the stage to Final Challenge tells every spawner, collision handler, and timer that you're now in full integration mode. Without this signal, events won't know which rules to follow, and your carefully tuned systems won't activate correctly.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Keep Building On Your Last Stage</h4>
            <p>This activity continues the project you already updated in Changing Conditions. You will change your existing blocks instead of starting over.</p>
            <p>You can always open the Driven by STEM category and drag in start vehicle test track for another full shakedown run. Before you keep building this lesson, reconnect your Final Challenge stage blocks.</p>
        </div>
    </div>

* :binoculars: Open `||loops(noclick):on start||` and find the `||drivenByStem:start stage||` block that is currently set to **Weather**.
* :racing car: Change that same block so it is set to **Final Challenge**.

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
```

```ghost
drivenByStem.startVehicleTestTrack()
```

## {2. Set the final scene}

**Create the Race Environment**

---

The final challenge deserves its own visual identity. Start with a distinct background color so the scene stays readable, then add the shared finish background image to show that this is the culminating test. Strong contrast still matters because every obstacle and opportunity needs to stay visible during high-speed decision-making.

* :tree: Open `||scene:Scene||` inside `||loops(noclick):on start||`.
* :tree: Change your existing weather background color to one that fits the final challenge.
* :tree: Add `||scene:set background image to||` under it and choose the shared `finishBg` image.

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
//@validate-exists
scene.setBackgroundColor(8)
//@highlight
//@validate-exists
scene.setBackgroundImage(assets.image`finishBg`)
```

## {3. Load saved setup + costs}

**Honor Earlier Engineering Decisions**

---

Every tuning choice you made in the garage matters now. Loading your saved speed and efficiency cost ensures that this final run authentically reflects the tradeoffs you designed earlier, and keeping the same `raceCar` sprite keeps your team car consistent. This is how systems thinking works in practice—earlier decisions cascade forward through the entire experience.

* :binoculars: In `||loops(noclick):on start||`, find the `||variables:set driveSpeed to||` block that already uses your saved speed.
* :racing car: Keep that block connected so this final run still uses your saved `||variables:driveSpeed||`.
* :racing car: Keep using the same `||variables:raceCar||` sprite you already carried from the earlier activities.
* :paper plane: Keep the `||variables:efficiencyDrain||` block connected to `||drivenByStem:saved efficiency cost||`.

~hint Car doesn't match your setup? 🔧

---

If the car doesn't match your setup, hunt for a leftover hardcoded value in movement. One stray number can override your saved tuning.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
scene.setBackgroundImage(assets.image`finishBg`)
//@highlight
//@validate-exists
driveSpeed = drivenByStem.savedDriveSpeed()
//@highlight
//@validate-exists
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
//@highlight
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
```

## {4. Create final tracking variables}

**Prepare the Evidence Capture System**

---

You can't improve what you don't measure. Creating dedicated variables for collisions and pit stops gives this final challenge clear evidence to show as it happens. These counters help you tell a specific story about how the run went under pressure, even before you save the final summary data.

* :paper plane: Open `||variables:Variables||` and create `||variables:finalCollisions||`. Set it to `0`.
* :paper plane: Create `||variables:finalPitStops||` and set it to `0`.

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img`
    . . . . . . 1 1 1 1 . . . . . .
    . . . . . 1 1 9 9 1 1 . . . . .
    . . . . 1 1 1 9 9 1 1 1 . . . .
    . . . 1 1 1 1 9 9 1 1 1 1 . . .
    . . . 1 1 1 1 9 9 1 1 1 1 . . .
    . . . 1 1 1 1 9 9 1 1 1 1 . . .
    . . . . 1 1 1 9 9 1 1 1 . . . .
    . . . . 1 1 1 9 9 1 1 1 . . . .
    . . . . 1 1 1 9 9 1 1 1 . . . .
    . . . . 1 1 1 9 9 1 1 1 . . . .
    . . . 1 1 1 1 9 9 1 1 1 1 . . .
    . . 1 1 1 1 1 9 9 1 1 1 1 1 . .
    . . 1 1 1 1 1 9 9 1 1 1 1 1 . .
    . . . . 5 5 5 . . 5 5 5 . . . .
    . . . . 5 . 5 . . 5 . 5 . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
//@highlight
//@validate-exists
let finalCollisions = 0
//@highlight
//@validate-exists
let finalPitStops = 0
```

## {5. Update HUD + countdown}

**Display Real-Time System State**

---

Racing isn't just about going fast—it's about balancing three competing priorities under time pressure. Your HUD displays Performance through score, Efficiency through life, and Strategy through decisions. In this final challenge, those values should continue from the run you just finished in Changing Conditions so the full test really feels connected.

* :binoculars: In `||loops(noclick):on start||`, find the `||info:set score to||`, `||info:set life to||`, and `||info:start countdown||` blocks you already have.
* :heart: Change the score block so it uses `||drivenByStem:last performance result||`.
* :heart: Change the life block so it uses `||drivenByStem:last efficiency result||`.
* :game pad: Keep the countdown at `25` seconds for this final run.
* :game pad: Add a `||game:splash||` that reminds players to balance Performance, Efficiency, and Strategy.

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
let finalCollisions = 0
let finalPitStops = 0
//@highlight
//@validate-exists
info.setScore(drivenByStem.lastPerformanceResult())
//@highlight
//@validate-exists
info.setLife(drivenByStem.lastEfficiencyResult())
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
* :paper plane: Inside the update, check if stage is **Final Challenge**.
* :mouse pointer: Spawn an **Enemy** sprite called trackObstacle near the top of the screen with downward velocity and auto-destroy enabled.

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
        let obstacle = sprites.create(assets.image`trackObstacle`, SpriteKind.Enemy)
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
        let pitMarker = sprites.create(assets.image`pitMarker`, SpriteKind.Food)
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

* :paper plane: Open `||sprites:Sprites||` and add an overlap event for **Player** vs **Enemy**.
* :logic: Inside that overlap event, add an `||logic:if||` check so this code only runs when the stage is **Final Challenge**.
* :heart: Inside the `if` block, reduce life by `||variables:efficiencyDrain||` so collisions cost Efficiency.
* :sprites: Destroy the obstacle sprite with an effect so players can see the collision happened.
* :paper plane: Add a second overlap event for **Player** vs **Food**.
* :logic: Inside that second overlap event, add an `||logic:if||` check for whether the stage is **Final Challenge**.
* :paper plane: In that `||logic:if||` block, change `||variables:finalPitStops||` by 1 so this run keeps track of how many recovery stops you used.
* :racing car: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:record pit stop visit||` so the visit is saved in your run data too.
* :heart: Open `||info:Info||` and add `||info:change life by 1||` so the pit stop restores some Efficiency.
* :score: Add `||info:change score by 3||` so the pit stop also creates a visible Performance reward.
* :racing car: Still in `||drivenByStem:Driven by STEM||`, add `||drivenByStem:award strategy points 1||` to show that choosing the pit at the right time is also a Strategy decision.
* :sprites: Destroy the pit marker sprite so players can see that the recovery chance has been used.

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
* :racing car: Inside it, check if stage is **Final Challenge**, then use a block in `||drivenByStem:Driven by STEM||` to save current run results.

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

## Great work!

You just brought all of your systems together in one final run. You used obstacles, pit stops, collisions, and saved results to test how your full design works when everything is running at the same time.

In computer science, shared events and saved data help different parts of one project work together.

In engineering, integration testing means checking that all the parts still work when you connect them into one complete system.

In this activity, you worked like a systems engineer, lead engineer, strategist, and cross-functional race team member.
