# Final Challenge

### @diffs true

```template
// Pre-load all assets so they appear in the gallery
let __sprites = [assets.image`playerCar`, assets.image`garageCone`, assets.image`trackObstacle`, assets.image`pitMarker`, assets.image`rainPuddle`, assets.image`telemetryScreen`, assets.image`finishBanner`, assets.image`teamBadge`]
let __backgrounds = [assets.image`garageBg`, assets.image`trackBg`, assets.image`finishBg`, assets.image`weatherBg`]
```

## Final Challenge @showdialog

![Taylor - Systems Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/taylor.png)

Hey, I'm Taylor, Systems Engineer. I got my start in a two-year electronics program, learning by doing, then kept building skills through coursework and certifications while I was already working in the field. On a real team, my job is integration testing: I connect all the subsystems together and make sure the whole experience works, not just one part in isolation.

That's exactly what this gate is about. You've built your performance system, your efficiency system, and your strategy layer. Now you'll run them all at once and see how your saved setup performs under one integrated test. This is your final run, and the result you save here is the data Drew will read in Reflect and Review.

## {1. Start the Final Challenge stage}

**Initialize the Integration Test**

---

Integration testing always starts with a mode check. In my field, you don't fire up all subsystems simultaneously and hope for the best. You signal to each component that full-system mode is now active, and you verify that they each respond correctly to that signal before anything else runs. Changing the stage to Final Challenge is that signal. Every spawner, collision handler, and timer in this project checks the stage before it does anything. If this block isn't right, the whole integrated test runs on the wrong settings and the results mean nothing.

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

Visual environment is part of the integrated system too. In electronics, we sometimes call this the "power-on state" — what does the system look like when everything is live and ready? A distinct background and color scheme that differ from earlier stages tells the player, at a glance, that this is a different operating mode. Contrast still matters. Every obstacle and pit marker needs to be clearly readable because this is the run where every decision counts. Readability is a reliability concern, not just an aesthetic one.

* :tree: Change your existing background color block to one that fits the final challenge.
* :tree: Drag `||scene:set background image to finishBg||` from the toolbox.

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
//@validate-exists
scene.setBackgroundColor(8)
//@highlight
//@validate-exists
scene.setBackgroundImage(assets.image`finishBg`)
```
```ghost
scene.setBackgroundImage(assets.image`finishBg`)
```

## {3. Load saved setup + costs}

**Honor Earlier Engineering Decisions**

---

In integration testing, one of the most common failure modes is a subsystem that silently uses a default value instead of the shared configuration. The car feels slightly wrong, performance is inconsistent, and it takes a while to realize that somewhere a hardcoded number is overriding a saved setting. Keeping your saved speed and efficiency cost loaded in this final stage ensures that the car running this integrated test is the same car you tuned in the garage — not a different car that happens to look the same on screen.

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
```ghost
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
```

## {4. Create final tracking variables}

**Prepare the Evidence Capture System**

---

Dedicated tracking variables are a systems engineering discipline. When multiple subsystems are active simultaneously, you need a way to separate signal sources. A collision in the final challenge is different from a collision in the weather stage, even if the code that handles it looks similar. `finalCollisions` and `finalPitStops` tag this run's events separately so the data from this integrated test doesn't blur with data from earlier isolated tests. That separation is what makes the review gate's comparisons meaningful.

* :paper plane: Drag `||variables:set finalCollisions to 0||` and `||variables:set finalPitStops to 0||` from the toolbox into `||loops(noclick):on start||`.

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
```ghost
let finalCollisions = 0
let finalPitStops = 0
```

## {5. Update HUD + countdown}

**Display Real-Time System State**

---

The HUD in an integrated test carries more weight than in any isolated stage. Score is the performance subsystem. Life is the efficiency subsystem. The countdown is the mission clock. All three running at once is what integration looks like. Starting from the last saved performance and efficiency values — rather than zero — means this run is a true continuation of the full session, not an isolated replay. The splash text is the final system briefing before the run starts: three metrics, one sentence, total clarity.

* :game pad: Drag `||info:set score to last performance result||`, `||info:set life to last efficiency result||`, `||info:start countdown 25||`, and `||game:splash||` (with text `Balance all three` and `Performance. Efficiency. Strategy.`) from the toolbox — they replace the old score, life, countdown, and any carry-over splash already in `||loops(noclick):on start||`.

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
```ghost
info.setScore(drivenByStem.lastPerformanceResult())
info.setLife(drivenByStem.lastEfficiencyResult())
info.startCountdown(25)
game.splash("Balance all three", "Performance. Efficiency. Strategy.")
```

## {6. Spawn obstacles (risk)}

**Generate Continuous Performance Pressure**

---

Obstacles are the stress test in an integration run. In electronics and systems engineering, you don't just test that each subsystem works correctly in isolation — you test that the whole system holds up under sustained load. Continuous obstacle spawning creates that sustained load here: the efficiency system, the scoring system, the collision handler, and the display all have to work together correctly, repeatedly, for the full 25-second window. If any of those connections breaks under pressure, the integrated test surface it.

* :game pad: Drag the `||game:on game update every [2500] ms||` obstacle spawner from the toolbox — the stage check, `trackObstacle` Enemy sprite, random position, speed, and lifespan are already inside.

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
```ghost
game.onUpdateInterval(2500, function () {
if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
let obstacle = sprites.create(assets.image`trackObstacle`, SpriteKind.Enemy)
obstacle.setPosition(randint(10, 150), 0)
obstacle.vy = 50
obstacle.lifespan = 3000
}
})
```

## {7. Spawn pit opportunities (recovery)}

**Provide Strategic Recovery Options**

---

Recovery paths are a systems engineering requirement. A system that can fail but has no way to recover is a brittle system. Pit markers give the player a way to restore efficiency mid-run, which turns the final challenge from a pure punishment run into a test of judgment: do you absorb the collision cost or spend time on a recovery? That decision, repeated over 25 seconds, is what makes the integrated test show you how the whole system behaves under realistic conditions rather than ideal ones.

* :game pad: Drag the `||game:on game update every [7000] ms||` pit marker spawner from the toolbox — the stage check, `pitMarker` Food sprite, random position, and lifespan are already inside.

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
```ghost
game.onUpdateInterval(7000, function () {
if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
let pitMarker = sprites.create(assets.image`pitMarker`, SpriteKind.Food)
pitMarker.setPosition(randint(20, 140), randint(20, 100))
pitMarker.lifespan = 4000
}
})
```

## {8. Score risk + recovery}

**Connect Actions to Measurable Outcomes**

---

Wired feedback is what makes an integrated system legible. Without it, collisions and pit stops are invisible events — things happen but there is no signal that they happened, and you cannot tell whether the system is working correctly. Connecting every action to an immediate HUD change means the integration test is observable: you can watch it run and know, in real time, whether each subsystem is responding the way it should. Legibility in testing is a reliability practice.

* :paper plane: Drag the `||sprites:on [Player] overlaps [Enemy]||` collision handler from the toolbox — the stage check, collision counter, life penalty, and destroy effect are all wired in.
* :paper plane: Drag the `||sprites:on [Player] overlaps [Food]||` pit handler from the toolbox — the stage check, pit counter, life restore, score, strategy points, and destroy are all wired in.

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
```ghost
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
finalCollisions += 1
info.changeLifeBy(-efficiencyDrain)
otherSprite.destroy(effects.disintegrate, 200)
}
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
finalPitStops += 1
drivenByStem.recordPitStopVisit()
info.changeLifeBy(1)
info.changeScoreBy(3)
drivenByStem.awardStrategyPoints(1)
otherSprite.destroy()
}
})
```

## {9. Save final run data}

**Preserve the Complete Performance Record**

---

The save at the end of the countdown is the integration test's closing gate. In my field, a test that doesn't produce a record is an incomplete test. The results need to be written somewhere persistent so they can be reviewed, compared to previous runs, and used to inform the next iteration. This event is the only moment in the run where all the accumulated state — score, efficiency, strategy, pit stops, collisions — gets packaged and committed. If the review gate shows blank values, this is the first place to look.

* :game pad: Drag the `||info:on countdown end||` event from the toolbox — the stage check, `||drivenByStem:save current run results||`, and closing splash are already inside.

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
```ghost
info.onCountdownEnd(function () {
if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
drivenByStem.saveCurrentRunResults()
game.splash("Final run complete", "Open the data review.")
}
})
```

## Great work!

You brought all of your systems together in one final run. Obstacles, pit stops, collisions, scored recovery, and a complete results save — everything you built across the garage and road stages ran simultaneously and communicated through shared state.

That is what integration testing is: not checking that each piece works, but checking that they all work together, under load, at the same time.

In computer science, shared events and saved data let different parts of one project operate as a connected system. In systems engineering, the integration test is the moment of truth — the first time you learn whether your architecture actually holds up when it is all running at once.

Systems engineers, lead engineers, integration specialists, and cross-functional team members all do this work. The career path does not require a four-year degree to start — it requires curiosity about how things connect.
