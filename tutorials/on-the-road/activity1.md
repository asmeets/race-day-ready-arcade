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

Before any events fire, the system needs to know what mode it's in. Setting the stage to "Track" is how you tell every timer, spawner, and collision handler which rules apply. 

Real racing teams do something similar — they declare whether it's a practice session, qualifying, or race before anything starts.

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

In a live event or classroom, multiple people will watch the same screen. Start with a high-contrast color so the car stays easy to track, then add a shared background image to give the session a stronger track identity. Good visual design isn't just about aesthetics — it's about making the important information visible.

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

Your speed choice and efficiency tradeoff from the garage should carry into this session. Loading saved values ensures that the car behaves consistently with what you tuned earlier, and keeping the same `||sprites:raceCar||` sprite means you're still testing the team car you designed. 

This is how engineers maintain setup continuity across test sessions — load the baseline, then measure what happens.

* :racing car: Drag `||variables:set driveSpeed to saved drive speed||` and `||variables:set efficiencyDrain to saved efficiency cost||` from the toolbox into `||loops(noclick):on start||`.
* :id card: Keep using the same `||sprites:raceCar||` sprite you customized in the garage.

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

You can't improve what you don't measure. These variables let the game track how many collisions happen over time and compare clean stretches to messy ones. 

Data analysts use patterns like this to identify trends and reward consistency. Tracking isn't just counting — it's building evidence.

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

A racing session needs clear start and end points. The countdown sets the test window, while the score and life displays show real-time feedback. Setting these values at the start ensures every player gets the same fair test conditions. This is how you make comparisons meaningful.

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

A static track doesn't challenge your setup. Spawning obstacles at regular intervals creates consistent, repeatable test conditions — you face the same challenge density every run, so differences in performance reflect your setup, not random luck. This is controlled testing at work.

* :game pad: Drag the `||game:on update every 2000ms||` obstacle spawner from the toolbox into an empty area of the workspace — the stage check, `trackObstacle` sprite, random position, speed, and lifespan are already configured inside.

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

Collisions aren't just visual — they represent mistakes that cost resources. Tracking each collision and subtracting efficiency creates a direct link between driver precision and system performance. 

Race engineers use telemetry data exactly like this to identify where drivers lose time or damage equipment.

* :paper plane: Drag the `||sprites:on Player overlaps Enemy||` collision handler from the toolbox — the stage check, collision counter, life penalty, and obstacle destroy are all wired in.

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

Consistency is as important as speed. This event checks whether collision count changed since the last check. If it didn't, you drove cleanly and earn bonus points. This is how systems recognize patterns — by comparing current state to previous state and rewarding improvement or consistency.

* :game pad: Drag the `||game:on update every 4000ms||` clean-driving reward from the toolbox — the stage check, collision comparison, score change, strategy points, and counter reset are all inside.

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

A test session isn't complete until you save the results. This event fires when the countdown ends, storing your score, efficiency, and strategy state so future stages can build on what you learned. Engineers call this "closing the loop" — test, measure, document, move forward.

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

You just turned a track run into real results. You built obstacle spawners, tracked collisions, connected mistakes to efficiency loss, and saved your data for the next stage. That means you did more than drive the car. You tested your setup and collected evidence about how it performed.

In computer science, events and variables help you turn quick moments in a game into information your code can track and reuse.

In engineering, a test is only useful if you can measure what changed. Every collision affected efficiency, and that gave you real evidence about whether your setup worked well.

In this activity, you worked like a telemetry analyst, race engineer, and controls software engineer.
