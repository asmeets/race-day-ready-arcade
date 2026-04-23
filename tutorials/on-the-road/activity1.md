# Hit the Track

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Track Session @showdialog

![Casey - Telemetry Analyst](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/casey.png)

Hey there, I'm **Casey**, the telemetry analyst on this team. I got into this work by tracking game stats and sports stats on my own, then picked up spreadsheets and some basic coding through a community college data course. On a real team, I clean messy data, build simple dashboards, and help engineers answer one big question: **did that change actually help?**

In this gate, you'll drive under live conditions while the game **tracks every collision** and rewards clean, controlled laps with **evidence, not guesses**. That's exactly how real engineers decide whether a setup change worked. Get ready to let your data do the talking.

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
raceDayTools.setRoleLens(raceDayTools.RoleLens.DataAnalyst)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## {1. Start the Track Stage}

**Setting the Session Context**

---

Before any events fire, the system needs to know what mode it's in. Setting the stage to "Track" is how you tell every timer, spawner, and collision handler which rules apply. Real racing teams do something similar — they declare whether it's a practice session, qualifying, or race before anything starts.

* :racing_car: Open `||raceDayTools:Driven by STEM||` and drag `start stage` into `on start`.
* Set the stage value to `Track`.

~hint Timing feels wrong? 🔍

---

If obstacles or scoring run at the wrong time, check the stage setting first. That's usually why something is "running right now."

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
raceDayTools.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.Track)
```

## {2. Make the Track Readable}

**Optimizing Visual Clarity**

---

In a live event or classroom, multiple people will watch the same screen. High-contrast backgrounds make the car and obstacles easy to track, even from across a room. Good visual design isn't just about aesthetics — it's about making the important information visible.

* :tree: Open `||scene:Scene||` and drag `set background color` into `on start`.
* Pick a color that contrasts strongly with the car sprite.

~hint Car hard to see? 🎨

---

If your car disappears into the background, change one color so the important stuff pops.

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
raceDayTools.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.Track)
//@highlight
//@validate-exists
scene.setBackgroundColor(11)
```

## {3. Load Your Saved Setup}

**Carrying Forward Your Configuration**

---

Your speed choice and efficiency tradeoff from the garage should carry into this session. Loading saved values ensures that the car behaves consistently with what you tuned earlier. This is how engineers maintain setup continuity across test sessions — load the baseline, then measure what happens.

* :racing_car: Open `||raceDayTools:Driven by STEM||` and drag `set driveSpeed from saved drive speed` into `on start`.
* Drag `apply saved car style` and connect `raceCar` as the target sprite.
* Set `efficiencyDrain` from `||raceDayTools:Driven by STEM||` `saved efficiency cost`.

~hint Life draining wrong? 🔎

---

If life drains at a fixed rate instead of your tuned setup, check that `efficiencyDrain` reads from saved efficiency cost, not a hardcoded number.

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
raceDayTools.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.Track)
scene.setBackgroundColor(11)
//@highlight
//@validate-exists
driveSpeed = raceDayTools.savedDriveSpeed()
//@highlight
//@validate-exists
raceDayTools.applySavedCarStyle(raceCar)
//@highlight
//@validate-exists
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
```

## {4. Create Collision Tracking Variables}

**Building a Measurement System**

---

You can't improve what you don't measure. These variables let the game track how many collisions happen over time and compare clean stretches to messy ones. Data analysts use patterns like this to identify trends and reward consistency. Tracking isn't just counting — it's building evidence.

* :paper plane: Open `||variables:Variables||`, click `Make a Variable`, and name it `trackCollisions`.
* Make a second variable called `lastTrackCollisionCount`.
* Set both to `0` inside `on start`.

~hint Rewards not triggering? ✅

---

If clean-driving rewards never trigger, verify both tracking variables started at `0` and are actually changing when collisions happen.

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
raceDayTools.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.Track)
scene.setBackgroundColor(11)
driveSpeed = raceDayTools.savedDriveSpeed()
raceDayTools.applySavedCarStyle(raceCar)
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
//@highlight
//@validate-exists
let trackCollisions = 0
//@highlight
//@validate-exists
let lastTrackCollisionCount = 0
```

## {5. Turn On the Dashboard and Countdown}

**Establishing Performance Boundaries**

---

A racing session needs clear start and end points. The countdown sets the test window, while the score and life displays show real-time feedback. Setting these values at the start ensures every player gets the same fair test conditions. This is how you make comparisons meaningful.

* :game pad: Open `||info:Info||` and drag `set score to 0` into `on start`.
* Drag `set life` and connect `saved efficiency` from `||raceDayTools:Driven by STEM||` as the value.
* Drag `start countdown` and set the time to `30` seconds.

~hint Life stuck at zero? 📊

---

If life stays at `0`, the saved value didn't load. Trace where life is set and make sure it reads from saved efficiency.

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
raceDayTools.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.Track)
scene.setBackgroundColor(11)
driveSpeed = raceDayTools.savedDriveSpeed()
raceDayTools.applySavedCarStyle(raceCar)
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
let trackCollisions = 0
let lastTrackCollisionCount = 0
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(30)
```

## {6. Spawn Obstacles}

**Creating Dynamic Test Conditions**

---

A static track doesn't challenge your setup. Spawning obstacles at regular intervals creates consistent, repeatable test conditions — you face the same challenge density every run, so differences in performance reflect your setup, not random luck. This is controlled testing at work.

* :game pad: Open `||game:Game||` and add `on game update every 2000 ms`.
* Inside the event, check that the stage is `Track` using `||raceDayTools:Driven by STEM||`.
* Create an `Enemy` obstacle sprite from `||sprites:Sprites||`, give it a random x position, set a downward velocity, and a `lifespan` so old obstacles disappear.

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
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        let obs = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . f f f f f f . . . . . . .
            . . f f f 2 2 f f f . . . . . .
            . . f f f 2 2 f f f . . . . . .
            . . . f f f f f f . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Enemy)
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

## {7. Handle Collisions}

**Recording Mistakes and Their Costs**

---

Collisions aren't just visual — they represent mistakes that cost resources. Tracking each collision and subtracting efficiency creates a direct link between driver precision and system performance. Real race engineers use telemetry data exactly like this to identify where drivers lose time or damage equipment.

* :paper plane: Open `||sprites:Sprites||` and add an overlap event for `Player` vs `Enemy`.
* Inside the event, confirm the stage is `Track`, add `1` to `trackCollisions`, and subtract `efficiencyDrain` from life.
* Destroy the obstacle sprite.

~hint Collisions not working? 🎯

---

If collisions don't change life, check that you're subtracting the right variable and that the overlap event targets `Player` vs `Enemy`.

hint~

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    //@highlight
    //@validate-exists
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
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

## {8. Reward Clean Driving}

**Detecting and Rewarding Consistency**

---

Consistency is as important as speed. This event checks whether collision count changed since the last check. If it didn't, you drove cleanly and earn bonus points. This is how systems recognize patterns — by comparing current state to previous state and rewarding improvement or consistency.

* :game pad: Open `||game:Game||` and add `on game update every 4000 ms`.
* If `trackCollisions` equals `lastTrackCollisionCount`, award `score +2` and `Strategy +1`.
* Set `lastTrackCollisionCount` to `trackCollisions` so the next check compares fresh data.

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
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        if (trackCollisions == lastTrackCollisionCount) {
            //@highlight
            //@validate-exists
            info.changeScoreBy(2)
            //@highlight
            //@validate-exists
            raceDayTools.awardStrategyPoints(1)
        }
        //@highlight
        //@validate-exists
        lastTrackCollisionCount = trackCollisions
    }
})
```

## {9. Save Results}

**Closing the Test Loop**

---

A test session isn't complete until you save the results. This event fires when the countdown ends, storing your score, efficiency, and collision data so future stages can build on what you learned. Engineers call this "closing the loop" — test, measure, document, move forward.

* :game pad: Open `||info:Info||` and add `on countdown end`.
* Inside the event, confirm the stage is `Track`.
* :racing_car: Open `||raceDayTools:Driven by STEM||` and drag `save current run results`.

~hint End message missing? ⏰

---

If the end-of-run message never appears, check that your countdown is running and that you added the countdown-end event.

hint~

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    //@highlight
    //@validate-exists
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
    }
})
```

## Complete

**Excellent!** You took your tuned setup onto a live track. You built spawner events that create obstacles and boost pickups, collision handlers that drain efficiency, a clean-driving reward system, and a countdown-end event that saved everything for the next stage. Every collision changes efficiency, and tracking that change is how engineers know whether a setup choice actually helped.

Roles in this tutorial: race engineer, performance analyst, and controls software engineer.
