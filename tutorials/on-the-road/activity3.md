# Changing Conditions

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Changing Conditions @showdialog

![Avery - Sustainability Lead](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/avery.png)

Hi, I'm Avery, the sustainability lead on your team. I found my way into this role through a college engineering program, but what really hooked me wasn't the textbooks. It was realizing that every design choice has a ripple effect on energy, materials, heat, and safety. On a real team, I map those tradeoffs and make sure the environment stays part of the conversation when race conditions shift.

In this gate, you'll switch the track from dry to wet, model how rain reduces grip, and tune your car's response so it adapts instead of skids. The best engineers don't just build for perfect conditions. They design for the unexpected. The adaptation work you do here can raise your team's strategy score before the Final Challenge.

## {1. Start the Weather stage}

**Switching to Environmental Simulation Mode**

---

Racing conditions don't stay constant—weather changes everything. Setting the stage to Weather tells your code that it should now respond to environmental factors instead of standard track logic. This is the same principle used in real simulation systems where engineers model how rain, temperature, and grip affect performance before race day.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Keep Building On Your Last Stage</h4>
            <p>This activity continues the project you already updated in Pit Stop Briefings. You will change your existing blocks instead of starting over.</p>
            <p>The start vehicle test track block still lives in the Driven by STEM category, so you can drag it in anytime if you want another full-track test run. When you return to this lesson, make sure your Weather stage blocks are the ones still connected.</p>
        </div>
    </div>

* :binoculars: Open `||loops(noclick):on start||` and find the `||drivenByStem:start stage||` block that is currently set to **Pit Stop**.
* :keyboard: Change that same block so the stage value is **Weather**.

~hint Rain everywhere? 🌧️

---

If rain effects spill into other gates, your stage checks are missing somewhere. Search for "Weather" in your code and make sure every weather action is guarded by a stage check.

hint~

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
```

```ghost
drivenByStem.startVehicleTestTrack()
```

## {2. Set starting conditions (Dry)}

**Establishing a Baseline State**

---

Every experiment needs a control condition. Starting with dry weather and a clear background gives you a known baseline so that when conditions change, the contrast is obvious. Engineers design systems this way so they can isolate variables and measure the impact of each change accurately.

* :racing car: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:set weather to Dry||` below the stage block in `||loops(noclick):on start||`.
* :tree: Open `||scene:Scene||` and add `||scene:set background color||` below it to show a dry-track color.

~hint Can't see the car? 🎨

---

If you can't clearly see the car and hazards, adjust colors before you adjust difficulty. Readability is part of sustainability too.

hint~

```blocks
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

Your car doesn't reset to factory defaults every run—it carries forward the setup decisions you made earlier. Loading the saved speed and efficiency cost means this stage builds on your previous work rather than starting from scratch, and keeping the same `raceCar` sprite preserves the car you designed in the garage. Real race teams do this too: they tune the car once in the garage, then carry that configuration through multiple sessions.

* :binoculars: Find the `||variables:set driveSpeed to||` block that is already in your project.
* :racing car: Change that block so `||variables:driveSpeed||` uses `||drivenByStem:saved drive speed||`.
* :racing car: Keep using the same `||variables:raceCar||` sprite you already carried forward from the earlier road activities.
* :paper plane: Make a new variable named `||variables:efficiencyDrain||`.
* :racing car: Set `||variables:efficiencyDrain||` to `||drivenByStem:saved efficiency cost||`.

~hint Speed feels inconsistent? ⚡

---

If speed feels inconsistent, check whether your code resets speed when conditions return to dry. Rain logic should change speed temporarily, not permanently.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
drivenByStem.setWeather(drivenByStem.WeatherMode.Dry)
scene.setBackgroundColor(7)
//@highlight
//@validate-exists
driveSpeed = drivenByStem.savedDriveSpeed()
//@highlight
//@validate-exists
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
```

## {4. Track change + collisions}

**Preparing Evidence Variables for Adaptation Scoring**

---

To reward smart adaptation, you need evidence that conditions changed and how the driver responded. These two variables—one to mark when weather shifted, another to count collisions—give you the data you need to evaluate performance. This is how telemetry analysts track driver behavior under pressure: they log events and compare them to thresholds.

* :paper plane: Open `||variables:Variables||` and create variables named `||variables:weatherChanged||` and `weatherCollisions`.
* :keyboard: Set both `||variables:weatherChanged||` and `||variables:weatherCollisions||` to **0** in `||loops(noclick):on start||`.

~hint Never earning adaptation reward? 🏆

---

If you never earn the adaptation reward, check whether `||variables:weatherChanged||` ever flips to 1 and whether collisions are actually being counted.

hint~

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
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
drivenByStem.setWeather(drivenByStem.WeatherMode.Dry)
scene.setBackgroundColor(7)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
//@highlight
//@validate-exists
let weatherChanged = 0
//@highlight
//@validate-exists
let weatherCollisions = 0
```

## {5. Update HUD + countdown}

**Activating Real-Time Performance Tracking**

---

Score, life, and the countdown timer give players constant feedback about their current state and how much time they have left. In this stage, those blocks should carry forward the results you saved in Pit Stop Briefings instead of starting over from zero. That mirrors real race dashboards, which keep updating with the latest run data rather than pretending the last stage never happened.

* :binoculars: In `||loops(noclick):on start||`, find the `||info:set score to||`, `||info:set life to||`, and `||info:start countdown||` blocks you already have from the earlier road test.
* :score: Change the score block so it uses `||drivenByStem:last performance result||`.
* :heart: Change the life block so it uses `||drivenByStem:last efficiency result||`.
* :game pad: Change the existing countdown block to **25** seconds for this weather run.

~hint Life value wrong? 🔎

---

If life looks wrong, trace it like a scientist. Find where it is set and every place it is changed.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
drivenByStem.setWeather(drivenByStem.WeatherMode.Dry)
scene.setBackgroundColor(7)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
let weatherChanged = 0
let weatherCollisions = 0
//@highlight
//@validate-exists
info.setScore(drivenByStem.lastPerformanceResult())
//@highlight
//@validate-exists
info.setLife(drivenByStem.lastEfficiencyResult())
//@highlight
//@validate-exists
info.startCountdown(25)
```

## {6. Switch to Rain (new event block)}

**Simulating a Mid-Run Environmental Shift**

---

Weather doesn't wait for you to be ready. By triggering rain after 5 seconds, you're modeling how real conditions change without warning, forcing drivers and teams to adapt in real time. This delayed event tests whether your system can handle dynamic state changes—a core challenge in motorsport engineering.

* :game pad: Open `||Timer:Timer||` and add an `||timer:after (5000) ms do||` event block. Be sure to set this value to 5000.
* :logic: Inside that timer block, add an `||logic:if||` check for whether the current stage is **Weather**.
* :racing car: Inside the `if` block, open `||drivenByStem:Driven by STEM||` and set weather to **Rain**.
* :paper plane: Set `||variables:weatherChanged||` to **1**.
* :tree: Open `||scene:Scene||` and change the background color to show the track is getting wetter.
* :tree: Add `||scene:set background image||` and switch to the shared `||images:weatherBg||` image.
* :game pad: Open `||game:Game||` and add a splash that says `||game:Rain lowers grip||` and `||game:Adapt your driving.||`

~hint Rain never starts? ☔

---

If rain never starts, verify that your timer block exists and is allowed to run while the stage is Weather.

hint~

```blocks
timer.after(5000, function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Weather)) {
        //@highlight
        //@validate-exists
        drivenByStem.setWeather(drivenByStem.WeatherMode.Rain)
        //@highlight
        //@validate-exists
        weatherChanged = 1
        //@validate-exists
        scene.setBackgroundColor(9)
        //@highlight
        //@validate-exists
        scene.setBackgroundImage(assets.image`weatherBg`)
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

* :game pad: Open `||game:Game||` and add an `||game:on game update every (1000) ms||` event block.
* :logic: Just like you did in earlier stages, start by adding an `||logic:if||` check to make sure this code only runs when the stage is **Weather**.
* :logic: Inside that block, add an `||logic:if else||` to check the current weather.
* :racing car: In the first branch, use `||drivenByStem:weather is Rain||`.
* :controller: When it is raining, set `||controller:move sprite with buttons vx vy||` for `||variables:raceCar||` to `||math:driveSpeed - 30||` for both speed values.
* :controller: In the `||logic:else||` branch, set the same `||controller:controller||` block back to `||variables:driveSpeed||` for both speed values.

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

* :game pad: Open `||game:Game||` and add an `||game:on game update every (2500) ms||` block.
* :logic: Just like the other weather code, add an `||logic:if||` check so this puddle code only runs when the stage is **Weather**.
* :sprites: Inside that `||logic:if||` block, open `||sprites:Sprites||` and create an **Enemy** sprite for the puddle.
* :mouse pointer: Change the image to the shared `||images:rainPuddle||` asset.
* :racing car: Set the puddle position so it appears at a random place on the track.
* :racing car: Give the puddle a small downward speed.
* :racing car: Set a short lifespan so old puddles disappear on their own.
* :paper plane: Open `||sprites:Sprites||` and add an `on sprite of kind Player overlaps Enemy` event.
* :logic: Inside that overlap event, add an `||logic:if||` check for whether the stage is **Weather**.
* :paper plane: Increase `||variables:weatherCollisions||` by 1.
* :heart: Reduce life by `||variables:efficiencyDrain||`.
* :sprites: Destroy the puddle sprite with an effect.

~hint Screen filling with puddles? 💦

---

If the screen fills with puddles, slow the spawn rate or shorten lifespan so the situation stays readable.

hint~

```blocks
game.onUpdateInterval(2500, function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Weather)) {
        //@highlight
        //@validate-exists
        let puddle = sprites.create(assets.image`rainPuddle`, SpriteKind.Enemy)
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

* :game pad: Open `||info:Info||` and add an `||info:on countdown end||` event block.
* :logic: Inside that block, add an `||logic:if||` check so this code only runs when the stage is **Weather**.
* :logic: Inside the Weather block, add another `||logic:if||` to check whether `||variables:weatherChanged||` is **1** and `||variables:weatherCollisions||` is **less than or equal to 1**.
* :racing car: Inside that second `if` block, open `||drivenByStem:Driven by STEM||` and award **Strategy +1**.
* :racing car: Back in the main Weather block, add `||drivenByStem:save current run results||`.
* :game pad: Below that, add a splash that says `||Game:Run complete||` and `||Game:Check your strategy score.||`

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

## Great work!

You just taught your car how to react when conditions changed. You built a weather shift, changed the way the car handled in the rain, added puddle hazards, and saved the results of your run for the Final Challenge.

In computer science, timers, conditionals, and saved values help your project react when something changes.

In engineering, strong systems do not assume everything stays perfect. They adapt when conditions change.

In this activity, you worked like a sustainability lead, systems engineer, telemetry analyst, and performance engineer.
