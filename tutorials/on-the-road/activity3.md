# Changing Conditions

### @diffs true

```package
driven-by-stem=github:asmeets/driven-by-stem
```

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Changing Conditions @showdialog

![Avery - Sustainability Lead](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/avery.png)

Hi, I'm **Avery**, the sustainability lead on your team. I found my way into this role through a college engineering program, but what really hooked me wasn't the textbooks. It was realizing that **every design choice has a ripple effect** on energy, materials, heat, and safety. On a real team, I map those tradeoffs and make sure the environment stays part of the conversation when race conditions shift.

In this gate, you'll **switch the track from dry to wet**, model how rain reduces grip, and tune your car's response so it **adapts instead of skids**. The best engineers don't just build for perfect conditions. They **design for the unexpected**. Let's see how you handle the rain.

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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## {1. Start the Weather stage}

**Switching to Environmental Simulation Mode**

---

Racing conditions don't stay constant—weather changes everything. Setting the stage to Weather tells your code that it should now respond to environmental factors instead of standard track logic. This is the same principle used in real simulation systems where engineers model how rain, temperature, and grip affect performance before race day.

* :racing_car: Open `||drivenByStem:Driven by STEM||` and drag `set start stage` into `||loops(noclick):on start||`.
* :keyboard: Set the stage value to **Weather**.

~hint Rain everywhere? 🌧️

---

If rain effects spill into other gates, your stage checks are missing somewhere. Search for "Weather" in your code and make sure every weather action is guarded by a stage check.

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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
```

## {2. Set starting conditions (Dry)}

**Establishing a Baseline State**

---

Every experiment needs a control condition. Starting with dry weather and a clear background gives you a known baseline so that when conditions change, the contrast is obvious. Engineers design systems this way so they can isolate variables and measure the impact of each change accurately.

* :racing_car: Open `||drivenByStem:Driven by STEM||` and set weather to **Dry**.
* :tree: Open `||scene:Scene||` and `set background color` to a dry-track color.

~hint Can't see the car? 🎨

---

If you can't clearly see the car and hazards, adjust colors before you adjust difficulty. Readability is part of sustainability too.

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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
//@highlight
//@validate-exists
drivenByStem.setWeather(drivenByStem.WeatherMode.Dry)
//@highlight
//@validate-exists
scene.setBackgroundColor(7)
```

```ghost
drivenByStem.setWeather(drivenByStem.WeatherMode.Rain)
```

## {3. Load saved setup}

**Restoring Configuration from Previous Decisions**

---

Your car doesn't reset to factory defaults every run—it carries forward the setup decisions you made earlier. Loading the saved speed, style, and efficiency cost means this stage builds on your previous work rather than starting from scratch. Real race teams do this too: they tune the car once in the garage, then carry that configuration through multiple sessions.

* :racing_car: Open `||drivenByStem:Driven by STEM||` and set `driveSpeed` to **saved speed**.
* Use `||drivenByStem:Driven by STEM||` to apply the saved car style to `raceCar`.
* Set `efficiencyDrain` from `||drivenByStem:Driven by STEM||` `saved efficiency cost`.

~hint Speed feels inconsistent? ⚡

---

If speed feels inconsistent, check whether your code resets speed when conditions return to dry. Rain logic should change speed temporarily, not permanently.

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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
drivenByStem.setWeather(drivenByStem.WeatherMode.Dry)
scene.setBackgroundColor(7)
//@highlight
//@validate-exists
driveSpeed = drivenByStem.savedDriveSpeed()
//@highlight
//@validate-exists
drivenByStem.applySavedCarStyle(raceCar)
//@highlight
//@validate-exists
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
```

## {4. Track change + collisions}

**Preparing Evidence Variables for Adaptation Scoring**

---

To reward smart adaptation, you need evidence that conditions changed and how the driver responded. These two variables—one to mark when weather shifted, another to count collisions—give you the data you need to evaluate performance. This is how telemetry analysts track driver behavior under pressure: they log events and compare them to thresholds.

* :paper plane: Open `||variables:Variables||` and create variables named `weatherChanged` and `weatherCollisions`.
* :keyboard: Set both `weatherChanged` and `weatherCollisions` to **0** in `||loops(noclick):on start||`.

~hint Never earning adaptation reward? 🏆

---

If you never earn the adaptation reward, check whether `weatherChanged` ever flips to 1 and whether collisions are actually being counted.

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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
drivenByStem.setWeather(drivenByStem.WeatherMode.Dry)
scene.setBackgroundColor(7)
driveSpeed = drivenByStem.savedDriveSpeed()
drivenByStem.applySavedCarStyle(raceCar)
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
//@highlight
//@validate-exists
let weatherChanged = 0
//@highlight
//@validate-exists
let weatherCollisions = 0
```

## {5. Turn on HUD + countdown}

**Activating Real-Time Performance Tracking**

---

Score, life, and the countdown timer give players constant feedback about their current state and how much time they have left. This heads-up display mirrors the real dash systems drivers use to monitor fuel, tire wear, and lap time—immediate, essential information that shapes every decision.

* :game pad: Open `||info:Info||` and set `score` and `life`.
* :game pad: Add a `start countdown` block set to **25** seconds.

~hint Life value wrong? 🔎

---

If life looks wrong, trace it like a scientist. Find where it is set and every place it is changed.

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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
drivenByStem.setWeather(drivenByStem.WeatherMode.Dry)
scene.setBackgroundColor(7)
driveSpeed = drivenByStem.savedDriveSpeed()
drivenByStem.applySavedCarStyle(raceCar)
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
let weatherChanged = 0
let weatherCollisions = 0
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(drivenByStem.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(25)
```

## {6. Switch to Rain (new event block)}

**Simulating a Mid-Run Environmental Shift**

---

Weather doesn't wait for you to be ready. By triggering rain after 10 seconds, you're modeling how real conditions change without warning, forcing drivers and teams to adapt in real time. This delayed event tests whether your system can handle dynamic state changes—a core challenge in motorsport engineering.

* :game pad: Open `||Timers:Timers||` and add an `after (10000) ms` event block.
* :racing_car: Inside, check that the stage is **Weather**, then set weather to **Rain**, set `weatherChanged` to **1**, change the background color, and show a **"Rain lowers grip"** splash.

~hint Rain never starts? ☔

---

If rain never starts, verify that your timer block exists and is allowed to run while the stage is Weather.

hint~

```blocks
timer.after(10000, function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Weather)) {
        //@highlight
        //@validate-exists
        drivenByStem.setWeather(drivenByStem.WeatherMode.Rain)
        //@highlight
        //@validate-exists
        weatherChanged = 1
        //@highlight
        //@validate-exists
        scene.setBackgroundColor(9)
        //@highlight
        //@validate-exists
        game.splash("Rain lowers grip", "Adapt your driving.")
    }
})
```

```ghost
drivenByStem.setWeather(drivenByStem.WeatherMode.Dry)
```

## {7. Reduce grip in rain (new event block)}

**Modeling Physics-Based Performance Degradation**

---

Wet surfaces reduce tire grip, which means lower safe cornering speed. This update loop continuously checks current weather and adjusts controller speed accordingly—not by stacking penalties, but by setting the correct value for the current condition. This mirrors how traction control systems monitor grip levels and adjust power delivery in real time.

* :game pad: Open `||game:Game||` and add an `on game update every (1000) ms` event block.
* :game pad: If weather is **Rain**, set `||controller:Controller||` move speed to `driveSpeed − 30`; otherwise set it back to `driveSpeed`.

~hint Car getting slower forever? 🐌

---

If your car gets slower and slower forever, you have a stacking bug. Set speed for the current condition, don't keep subtracting.

hint~

```blocks
game.onUpdateInterval(1000, function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Weather)) {
        if (drivenByStem.weatherIs(drivenByStem.WeatherMode.Rain)) {
            //@highlight
            //@validate-exists
            controller.moveSprite(raceCar, driveSpeed - 30, driveSpeed - 30)
        } else {
            //@highlight
            //@validate-exists
            controller.moveSprite(raceCar, driveSpeed, driveSpeed)
        }
    }
})
```

```ghost
drivenByStem.weatherIs(drivenByStem.WeatherMode.Dry)
```

## {8. Add puddle hazards + collisions (new event blocks)}

**Creating Dynamic Hazards with Consequences**

---

Puddles are more than just visual elements—they're hazards that test the driver's ability to avoid obstacles under reduced grip. Spawning them on a timer and applying efficiency penalties on collision simulates how water accumulation on track creates unpredictable danger zones. Race teams study these patterns to advise drivers on optimal racing lines.

* :game pad: Open `||game:Game||` and add an `on game update every (2500) ms` block; create an **Enemy** puddle sprite from `||sprites:Sprites||` with a short lifespan.
* :paper plane: Open `||sprites:Sprites||` and add an `on sprite of kind Player overlaps Enemy` event; increase `weatherCollisions`, reduce life by `efficiencyDrain`, and destroy the puddle with an effect.

~hint Screen filling with puddles? 💦

---

If the screen fills with puddles, slow the spawn rate or shorten lifespan so the situation stays readable.

hint~

```blocks
game.onUpdateInterval(2500, function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Weather)) {
        //@highlight
        //@validate-exists
        let puddle = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . 9 9 9 . . . 9 9 9 . . .
            . . 9 9 9 9 9 . 9 9 9 9 9 . .
            . . . 9 9 9 . . . 9 9 9 . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Enemy)
        //@highlight
        //@validate-exists
        puddle.setPosition(randint(10, 150), randint(10, 110))
        //@highlight
        //@validate-exists
        puddle.vy = 40
        //@highlight
        //@validate-exists
        puddle.lifespan = 2000
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Weather)) {
        //@highlight
        //@validate-exists
        weatherCollisions += 1
        //@highlight
        //@validate-exists
        info.changeLifeBy(-efficiencyDrain)
        //@highlight
        //@validate-exists
        otherSprite.destroy(effects.fire, 200)
    }
})
```

## {9. Reward adaptation + save results (new event block)}

**Evaluating Strategic Response to Changing Conditions**

---

Successful adaptation means recognizing when conditions changed and adjusting your driving to minimize mistakes. This final check rewards players who kept collisions low after the weather shift, then saves the results so future stages can reference this run. It's how real teams measure driver skill under pressure—not just speed, but smart, responsive decision-making.

* :game pad: Open `||info:Info||` and add an `on countdown end` event block.
* :racing_car: If the stage is **Weather**, `weatherChanged` equals **1**, and `weatherCollisions` is **≤ 1**, use `||drivenByStem:Driven by STEM||` to award **Strategy +1**.
* :racing_car: Save the current run results and show a **"Run complete"** splash.

~hint Strategy never awards? 🏆

---

If Strategy never awards, check whether `weatherChanged` became 1 and whether `weatherCollisions` stayed at 1 or below.

hint~

```blocks
info.onCountdownEnd(function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Weather)) {
        if (weatherChanged == 1 && weatherCollisions <= 1) {
            //@highlight
            //@validate-exists
            drivenByStem.awardStrategyPoints(1)
        }
        //@highlight
        //@validate-exists
        drivenByStem.saveCurrentRunResults()
        //@highlight
        //@validate-exists
        game.splash("Run complete", "Check your strategy score.")
    }
})
```

## Complete

**Awesome work!** You modeled changing conditions and adaptive response. You built a delayed timer that shifts weather mid-run, a speed-adjustment loop that responds to rain, puddle hazards that increase challenge, and a countdown-end event that rewards successful adaptation. The best design adapts rather than pushes harder. That's the core of resilient systems thinking.

Roles in this tutorial: sustainability lead, systems engineer, telemetry analyst, and performance engineer.
