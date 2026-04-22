# Final Challenge

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Final Challenge @showdialog

Hey, I'm Taylor — Systems Engineer. I got my start in a two-year electronics program, learning by doing, then kept building skills through coursework and certifications while I was already working in the field. On a real team, my job is integration testing: I connect all the subsystems together and make sure the whole experience works, not just one part in isolation. That's exactly what this gate is about. You've built your performance system, your efficiency system, and your strategy layer — now you'll run them all at once and see how they hold up together. This is your final run, and every choice you made along the way is about to show up in the result. Let's see what your full system can do.

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
raceDayTools.setRoleLens(raceDayTools.RoleLens.SoftwareEngineer)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 1 - Start the Final Challenge stage

The `on start` block sets which stage is active so every other event knows which mode the game is in.

* Open `||loops(noclick):on start||` and find the `||raceDayTools:Driven by STEM||` drawer.
* :racing_car: Add the **start stage** block and set it to **Final Challenge**.

> **Taylor tip:** If you see obstacles or pit markers showing up at weird times, suspect a missing stage check. In systems work, "wrong mode" bugs are super common.

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img``, SpriteKind.Player)
raceDayTools.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.FinalChallenge)
```

## Step 2 - Set the final scene

A distinct background makes the final run feel different and keeps hazards readable against the track.

* :tree: Open `||scene:Scene||` inside `||loops(noclick):on start||`.
* Add `set background color` and pick a color that contrasts with your car and obstacles.

> **Taylor tip:** If hazards feel hard to see, fix the visuals before you fix the code. A system can be "correct" and still be unusable if signals aren't readable.

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img``, SpriteKind.Player)
raceDayTools.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.FinalChallenge)
//@highlight
//@validate-exists
scene.setBackgroundColor(8)
```

## Step 3 - Load saved setup + costs

Pulling saved values means the final run reflects the choices made in earlier stages.

* In `||loops(noclick):on start||`, use `||raceDayTools:Driven by STEM||` to load saved `driveSpeed`.
* Load `efficiencyDrain` from saved efficiency cost.
* Apply saved car style to `raceCar`.

> **Taylor tip:** If the car doesn't match your setup, hunt for a leftover hardcoded value in movement. One stray number can override your saved tuning.

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img``, SpriteKind.Player)
raceDayTools.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
//@highlight
//@validate-exists
driveSpeed = raceDayTools.savedDriveSpeed()
//@highlight
//@validate-exists
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
//@highlight
//@validate-exists
raceDayTools.applySavedCarStyle(raceCar)
//@highlight
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
```

## Step 4 - Create final tracking variables

Dedicated counters let the reflection gate see exactly what happened during the final run.

* :paper plane: Open `||variables:Variables||` and create `finalCollisions`. Set it to `0`.
* Create `finalPitStops` and set it to `0`.

> **Taylor tip:** If your reflection later feels fuzzy, it usually means you didn't track the right signals. Make sure your "final" counters actually change during the run.

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img``, SpriteKind.Player)
raceDayTools.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
driveSpeed = raceDayTools.savedDriveSpeed()
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
raceDayTools.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
//@highlight
//@validate-exists
let finalCollisions = 0
//@highlight
//@validate-exists
let finalPitStops = 0
```

## Step 5 - Turn on HUD + countdown

Score, life, and a timer give players the three signals they need to make tradeoff decisions in real time.

* :game pad: Open `||info:Info||` inside `||loops(noclick):on start||`, set score to `0`, and set life from saved efficiency.
* Add a `start countdown` block set to `25` seconds.
* Add a `||game:splash||` that reminds players to balance Performance (score), Efficiency (life), and Strategy.

> **Taylor tip:** If the run never ends, check whether you started the countdown and whether you added a countdown-end event.

```blocks
let driveSpeed = 110
let raceCar = sprites.create(img``, SpriteKind.Player)
raceDayTools.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
driveSpeed = raceDayTools.savedDriveSpeed()
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
raceDayTools.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
let finalCollisions = 0
let finalPitStops = 0
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(25)
//@highlight
//@validate-exists
game.splash("Balance all three", "Performance. Efficiency. Strategy.")
```

## Step 6 - Spawn obstacles (risk)

A repeating update event keeps pressure on throughout the run without requiring extra setup blocks.

* :game pad: Open `||game:Game||` and add a new **on update interval** block set to `2500` ms.
* Inside the update, check if stage is **Final Challenge**, then spawn an **Enemy** sprite near the top of the screen with downward velocity and auto-destroy enabled.

> **Taylor tip:** If the run feels too chaotic, slow spawns first — if it's readable, you can always ramp it back up.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(2500, function () {
    //@highlight
    //@validate-exists
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
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

## Step 7 - Spawn pit opportunities (recovery)

Pit markers give players a way to recover efficiency mid-run, turning pure avoidance into active strategy.

* :game pad: Open `||game:Game||` and add a new **on update interval** block set to `7000` ms.
* Inside the update, check if stage is **Final Challenge**, then spawn a `||sprites:Food||` sprite with a short lifespan.

> **Taylor tip:** If pit markers never show up, check timing and lifespan. If they show up but feel useless, check that your overlap event is looking for the right kind.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(7000, function () {
    //@highlight
    //@validate-exists
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
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

## Step 8 - Score risk + recovery

Two overlap events connect spawned sprites to the HUD so every collision and pit stop has a visible effect.

* :paper plane: Open `||sprites:Sprites||` and add an overlap event for **Player** vs **Enemy**: deduct Efficiency and destroy the obstacle.
* Add a second overlap event for **Player** vs **Food**: restore life, add to score, record a pit stop, and destroy the marker.

> **Taylor tip:** If a collision or pit stop does "nothing," that's usually a kind mismatch. Verify your Enemy vs Food overlap events match what you actually spawned.

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    //@highlight
    //@validate-exists
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
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
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        finalPitStops += 1
        //@highlight
        //@validate-exists
        raceDayTools.recordPitStopVisit()
        //@highlight
        //@validate-exists
        info.changeLifeBy(1)
        //@highlight
        //@validate-exists
        info.changeScoreBy(3)
        //@highlight
        //@validate-exists
        raceDayTools.awardStrategyPoints(1)
        //@highlight
        //@validate-exists
        otherSprite.destroy()
    }
})
```

## Step 9 - Save final run data

The countdown-end event is the only reliable moment to capture results — nothing runs after the timer hits zero.

* :game pad: Open `||info:Info||` and add an **on countdown end** event block.
* Inside it, check if stage is **Final Challenge**, then use `||raceDayTools:Driven by STEM||` to save current run results.

> **Taylor tip:** If review shows blank or zero values, results probably weren't saved at the end. Confirm the save runs inside countdown-end.

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    //@highlight
    //@validate-exists
    if (raceDayTools.stageIs(raceDayTools.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
        //@highlight
        //@validate-exists
        game.splash("Final run complete", "Open the data review.")
    }
})
```

## Complete

Engineering idea: integration testing means running all subsystems together and checking that they work as a whole — not just each part in isolation.

Roles in this node: systems engineer, lead engineer, strategist, and cross-functional race team.
