# Hit the Track

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

```template
// Pre-load all assets so they appear in the gallery
let __sprites = [assets.image`playerCar`, assets.image`garageCone`, assets.image`trackObstacle`, assets.image`pitMarker`, assets.image`rainPuddle`, assets.image`telemetryScreen`, assets.image`finishBanner`, assets.image`teamBadge`]
let __backgrounds = [assets.image`garageBg`, assets.image`trackBg`, assets.image`finishBg`, assets.image`weatherBg`]
```

## Hit the Track @showdialog

![Casey - Telemetry Analyst](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/casey.png)

Hey there, I'm Casey, the telemetry analyst on this team. I got into this work by tracking game stats and sports stats on my own, then picked up spreadsheets and some basic coding through a community college data course. On a real team, I clean messy data, build simple dashboards, and help engineers answer one big question: **did that change actually help?**

In this gate, you'll drive under live conditions while the game tracks every collision and rewards clean, controlled laps with evidence, not guesses. That's exactly how real engineers decide whether a setup change worked. The run you save here updates the performance and efficiency picture your later stages will build from.

## {1. Start the Track Stage}

**Setting the Session Context**

---

Every data session starts with a mode declaration. I used to think that was a formality, but it is actually one of the most important discipline habits in telemetry work. When you label a session — practice, qualifying, race, weather test — every reading you collect inside that session gets tagged with context. Without that tag, you end up mixing data from different conditions and drawing conclusions that don't actually hold. Changing the stage to Track is how you tell every event block and every timer which ruleset to apply, so the data you collect here is clean and comparable.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Something Looks Familiar...</h4>
            <p>This activity continues the code you already built in the garage. You will keep updating that same project instead of rebuilding it.</p>
            <p>The start vehicle test track block is still available in the Driven by STEM category if you want a full shakedown run in the simulator. For this activity, remove it from on start so your Track stage code can run.</p>
        </div>
    </div>

* :mouse pointer: Find the `||drivenByStem:start vehicle test track||` block still connected in `||loops(noclick):on start||` from the garage shakedown and drag it to the Toolbox to remove it.
* :game pad: If you still have the old `||controller:on A button pressed||` retry event from the shakedown, drag that whole event to the Toolbox too.
* :binoculars: Find the `||drivenByStem:start stage||` block already in `||loops(noclick):on start||`.
* :mouse pointer: Change its value from **Garage Shakedown** to **Track**.

~hint Timing feels wrong? 🔍

---

If obstacles or scoring run at the wrong time, check the stage setting first. That's usually why something is "running right now."

hint~

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Track)
```

```ghost
drivenByStem.startVehicleTestTrack()
```

## {2. Make the Track Readable}

**Optimizing Visual Clarity**

---

Readability matters to me because confusing data is the same as missing data. In live event dashboards and race telemetry screens, a car that blends into the background or a screen that is hard to parse means the analyst misses events. I have watched reviewers rewind footage just to find a collision that should have been obvious in real time. Start with strong contrast and a clear background, then layer in complexity. Readable first, complex later — that is a principle that applies to dashboards, charts, and game screens equally.

* :tree: Drag `||scene:set background color||` into `||loops(noclick):on start||` and pick a color that contrasts strongly with the car sprite.
* :tree: Drag `||scene:set background image to trackBg||` from the toolbox and snap it under the color block.

~hint Car hard to distinguish? 🎨

---

If your car blends into the scene, keep the background simple and test again. Readability matters more than decoration.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Track)
//@validate-exists
scene.setBackgroundColor(11)
//@highlight
//@validate-exists
scene.setBackgroundImage(assets.image`trackBg`)
```
```ghost
scene.setBackgroundImage(assets.image`trackBg`)
```

## {3. Load Your Saved Setup}

**Carrying Forward Your Configuration**

---

When I first started tracking stats, I would start fresh every session and lose every comparison I had built. Setup continuity is what makes longitudinal data meaningful. If the car in this session has different speed and efficiency values than the car in the last session, any comparison I draw between them is measuring two different things. Loading your saved speed and efficiency cost keeps this session on the same footing as the garage shakedown, so differences in performance reflect driving and conditions — not a configuration drift you forgot about.

* :racing car: Drag `||variables:set driveSpeed to saved drive speed||` and `||variables:set efficiencyDrain to saved efficiency cost||` from the toolbox into `||loops(noclick):on start||`.
* :id card: Keep using the same `||variables:raceCar||` sprite you customized in the garage.

~hint Life draining wrong? 🔎

---

If life drains at a fixed rate instead of your tuned setup, check that `efficiencyDrain` reads from saved efficiency cost, not a hardcoded number.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Track)
scene.setBackgroundColor(11)
scene.setBackgroundImage(assets.image`trackBg`)
//@highlight
//@validate-exists
driveSpeed = drivenByStem.savedDriveSpeed()
//@highlight
//@validate-exists
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
```
```ghost
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
```

## {4. Create Collision Tracking Variables}

**Building a Measurement System**

---

The question that hooked me on data work wasn't "how fast?" — it was "how often?" Collision frequency is one of the most useful signals in any performance dataset. A single collision might be luck or a control issue. A pattern of collisions at the same track position is a setup problem. Creating dedicated variables for collision count and last-check count gives you the raw material for that kind of pattern analysis. You can't find a pattern you aren't measuring, and you can't measure what you haven't named.

* :paper plane: Drag `||variables:set trackCollisions to 0||` and `||variables:set lastTrackCollisionCount to 0||` from the toolbox into `||loops(noclick):on start||`.

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Track)
scene.setBackgroundColor(11)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
//@highlight
//@validate-exists
let trackCollisions = 0
//@highlight
//@validate-exists
let lastTrackCollisionCount = 0
```
```ghost
let trackCollisions = 0
let lastTrackCollisionCount = 0
```

## {5. Turn On the Dashboard and Countdown}

**Establishing Performance Boundaries**

---

A racing session without boundaries isn't a session — it's a joyride. Score, life, and a countdown create the measurement window that makes comparison possible. Every run has the same starting resources and the same time limit, which means the results are actually comparable across different teams and different setups. In data work, the conditions under which you collect data matter as much as the data itself. Controlled collection windows are how you go from raw numbers to findings you can actually defend.

* :game pad: Drag `||info:set score to 0||`, `||info:set life to saved efficiency||`, and `||info:start countdown 30||` from the toolbox into `||loops(noclick):on start||`.

~hint Life stuck at zero? 📊

---

If life stays at `0`, the saved value didn't load. Trace where life is set and make sure it reads from saved efficiency.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Track)
scene.setBackgroundColor(11)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
let trackCollisions = 0
let lastTrackCollisionCount = 0
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(drivenByStem.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(30)
```
```ghost
info.setScore(0)
info.setLife(drivenByStem.savedEfficiency())
info.startCountdown(30)
```

## {6. Spawn Obstacles}

**Creating Dynamic Test Conditions**

---

Random spawning at a consistent rate is how you model real traffic density without scripting every obstacle placement by hand. In telemetry analysis, we think a lot about stimulus frequency — how often does the driver encounter a challenge, and does the pattern stay consistent enough to be a fair test? Too infrequent and lucky dodges look like good driving. Too frequent and collisions become inevitable regardless of setup. A steady spawn rate gives you controlled density, which means the differences you observe between runs are driven by the setup and the driver, not by random clumping.

* :game pad: Drag the `||game:on game update every [2000] ms||` obstacle spawner from the toolbox into an empty area of the workspace — the stage check, `trackObstacle` sprite, random position, speed, and lifespan are already configured inside.

~hint Too chaotic? 🎶

---

If it feels chaotic, adjust one setting at a time: slower spawn rate, lower speed, or shorter lifespan. Keep decisions readable.

hint~

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(2000, function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        let obs = sprites.create(assets.image`trackObstacle`, SpriteKind.Enemy)
        //@highlight
        //@validate-exists
        obs.setPosition(randint(0, 160), 0)
        //@highlight
        //@validate-exists
        obs.vy = 60
        //@highlight
        //@validate-exists
        obs.lifespan = 2500
    }
})
```
```ghost
game.onUpdateInterval(2000, function () {
if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
let obs = sprites.create(assets.image`trackObstacle`, SpriteKind.Enemy)
obs.setPosition(randint(0, 160), 0)
obs.vy = 60
obs.lifespan = 2500
}
})
```

## {7. Handle Collisions}

**Recording Mistakes and Their Costs**

---

Collisions are the events I watch most carefully in any driving dataset. Every contact is a data point: where it happened, when it happened, what it cost. Wiring each collision to a counter and subtracting efficiency links the raw event to its consequence in the system. That connection — event → cost → resource change — is the same chain telemetry analysts trace when they reconstruct what happened in a real run and figure out where performance was lost.

* :paper plane: Drag the `||sprites:on [Player] overlaps [Enemy]||` collision handler from the toolbox — the stage check, collision counter, life penalty, and obstacle destroy are all wired in.

~hint Collisions not working?

---

If collisions don't change life, check that you're subtracting the right variable and that the overlap event targets `Player` vs `Enemy`.

hint~

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        trackCollisions += 1
        //@highlight
        //@validate-exists
        info.changeLifeBy(-efficiencyDrain)
        //@highlight
        //@validate-exists
        otherSprite.destroy()
    }
})
```
```ghost
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
trackCollisions += 1
info.changeLifeBy(-efficiencyDrain)
otherSprite.destroy()
}
})
```

## {8. Reward Clean Driving}

**Detecting and Rewarding Consistency**

---

Rewarding consistency is actually a harder problem than penalizing mistakes, and it is one of my favorite things to talk about in data analysis. It is easy to count errors. It is harder to detect the absence of errors and call that an achievement. This checker compares the current collision count to where it stood four seconds ago. If nothing changed, the driver was clean during that window. That pattern — comparing current state to previous state to identify improvement — is a technique used in everything from race telemetry to health monitoring to software reliability scoring.

* :game pad: Drag the `||game:on game update every [4000] ms||` clean-driving reward from the toolbox — the stage check, collision comparison, score change, strategy points, and counter reset are all inside.

~hint Reward logic broken? 🔀

---

If it rewards every time, `lastTrackCollisionCount` probably isn't updating; if it never rewards, double-check your comparison.

hint~

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(4000, function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        if (trackCollisions == lastTrackCollisionCount) {
            //@highlight
            //@validate-exists
            info.changeScoreBy(2)
            //@highlight
            //@validate-exists
            drivenByStem.awardStrategyPoints(1)
        }
        //@highlight
        //@validate-exists
        lastTrackCollisionCount = trackCollisions
    }
})
```
```ghost
game.onUpdateInterval(4000, function () {
if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
if (trackCollisions == lastTrackCollisionCount) {
info.changeScoreBy(2)
drivenByStem.awardStrategyPoints(1)
}
lastTrackCollisionCount = trackCollisions
}
})
```

## {9. Save Results}

**Closing the Test Loop**

---

Saving at the end of the countdown is the moment the session becomes permanent evidence. Without this step, the run existed only in the simulator and left no trace. In data work, the save is the handoff — results that aren't persisted can't be reviewed, compared, or acted on. Every later stage in this project depends on this event running cleanly. If a future gate shows blank or zero values, this is the first place I look.

* :game pad: Drag the `||info:on countdown end||` event from the toolbox — the stage check and `||drivenByStem:save current run results||` are already inside.

~hint End message missing? ⏰

---

If the end-of-run message doesn't display, check that your countdown is running and that you added the countdown-end event.

hint~

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        drivenByStem.saveCurrentRunResults()
    }
})
```
```ghost
info.onCountdownEnd(function () {
if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
drivenByStem.saveCurrentRunResults()
}
})
```

## Complete

You turned a track run into real results. Obstacle spawners, collision tracking, efficiency penalties, clean-driving rewards, and a session save — every piece of that is a data pipeline. Events produce observations. Variables record them. The countdown end saves them for the next stage to read.

In computer science, events and variables help you turn quick moments in a game into information your code can track and reuse. In data analysis, collecting clean evidence during a controlled session is what makes every decision after it defensible.

Telemetry analysts, data scientists, performance analysts, and software engineers all build systems like this one. The underlying skill is the same: design a collection system, run it under consistent conditions, and let the numbers do the talking.

In engineering, a test is only useful if you can measure what changed. Every collision affected efficiency, and that gave you real evidence about whether your setup worked well.

In this activity, you worked like a telemetry analyst, race engineer, and controls software engineer.
