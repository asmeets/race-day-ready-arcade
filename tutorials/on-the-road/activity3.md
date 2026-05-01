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

When I talk about sustainability, people sometimes think I mean recycling or solar panels. But the core of the work is this: every condition your system operates in has a different impact profile. A car running in dry conditions has different energy demands, tire wear rates, and cooling requirements than the same car in the rain. Before you can design for variable conditions, you have to tell your system which mode it is in. Switching the stage to Weather is that declaration — the code now knows to apply environmental rules instead of standard track logic.

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

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
```

hint~

```ghost
drivenByStem.startVehicleTestTrack()
```

## {2. Set starting conditions (Dry)}

**Establishing a Baseline State**

---

Every sustainability analysis starts with a control case. Before I can say "rain increases energy cost by X percent" I need to know what the dry baseline looks like. Without that reference point, I have nothing to measure against. Setting weather to Dry and establishing a clear background gives your simulation that same starting condition: a known, documented state that every subsequent change can be compared to. The dry-to-wet transition you build later only means something because you defined dry first.

* :racing car: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:set weather to [Dry]||` below the stage block in `||loops(noclick):on start||`.
* :tree: Open `||scene:Scene||` and add `||scene:set background color||` below it to show a dry-track color.

~hint Can't see the car? 🎨

---

If you can't clearly see the car and hazards, adjust colors before you adjust difficulty. Readability is part of sustainability too.

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Weather)
//@highlight
//@validate-exists
drivenByStem.setWeather(drivenByStem.WeatherMode.Dry)
//@highlight
//@validate-exists
scene.setBackgroundColor(7)
```

hint~

```ghost
drivenByStem.setWeather(drivenByStem.WeatherMode.Rain)
```

## {3. Load saved setup}

**Restoring Configuration from Previous Decisions**

---

One of the mistakes I see early in sustainability engineering is starting each analysis from scratch. If every session reinitializes all the variables, you're measuring a fresh car, not the actual car that went through the previous conditions. Carrying forward your saved speed and efficiency cost means this weather session builds on the history your car already has. The setup decisions from the garage are still in play here — and they will matter more when the conditions get harder.

* :racing car: Drag `||variables:set driveSpeed to saved drive speed||` and `||variables:set efficiencyDrain to saved efficiency cost||` from the toolbox into `||loops(noclick):on start||`.
* :id card: Keep using the same `||variables:raceCar||` sprite you already carried forward.

~hint Speed feels inconsistent? ⚡

---

If speed feels inconsistent, check whether your code resets speed when conditions return to dry. Rain logic should change speed temporarily, not permanently.

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

hint~

```ghost
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
```

## {4. Track change + collisions}

**Preparing Evidence Variables for Adaptation Scoring**

---

You can't score adaptation without first measuring what changed and how the driver responded to it. In sustainability work, I track two things when conditions shift: did the system detect the change, and did performance stay within acceptable bounds after it? These two variables do exactly that. `weatherChanged` flags when the shift happened. `weatherCollisions` tells you whether the driver held their line under new conditions. Together they give you the evidence to say whether the adaptation was successful — or just lucky.

* :paper plane: Drag `||variables:set weatherChanged to 0||` and `||variables:set weatherCollisions to 0||` from the toolbox into `||loops(noclick):on start||`.

~hint Never earning adaptation reward? 🏆

---

If you never earn the adaptation reward, check whether `||variables:weatherChanged||` ever flips to 1 and whether collisions are actually being counted.

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

hint~

```ghost
let weatherChanged = 0
let weatherCollisions = 0
```

## {5. Update HUD + countdown}

**Activating Real-Time Performance Tracking**

---

Live dashboards are how sustainability engineers stay connected to a system that is actively changing. Static snapshots are useful in the garage. On the road, in changing conditions, you need a readout that keeps up with what is happening right now. Carrying forward the performance and efficiency values from Pit Stop Briefings instead of restarting from zero means your HUD reflects the cumulative state of the session, not just the last 25 seconds. Real environmental monitoring systems work the same way: they accumulate state over time and report the running picture.

* :game pad: Drag `||info:set score to last performance result||`, `||info:set life to last efficiency result||`, and `||info:start countdown 25||` from the toolbox — they replace the old score, life, and countdown blocks already in `||loops(noclick):on start||`.

~hint Life value wrong? 🔎

---

If life looks wrong, trace it like a scientist. Find where it is set and every place it is changed.

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

hint~

```ghost
info.setScore(drivenByStem.lastPerformanceResult())
info.setLife(drivenByStem.lastEfficiencyResult())
info.startCountdown(25)
```

## {6. Switch to Rain (new event block)}

**Simulating a Mid-Run Environmental Shift**

---

Weather in the real world doesn't announce itself. It shifts mid-race, mid-lap, sometimes mid-corner. The five-second delay before rain starts is a direct model of that unpredictability: you have a brief window of awareness, then the conditions change whether you're ready or not. In sustainability engineering, one of the core challenges is designing systems that respond correctly to environmental state changes they didn't cause and can't fully predict. This timer event is your first taste of that problem.

* :game pad: Open `||timer:Timer||` and add an `||timer:after (5000) ms do||` event block. Be sure to set this value to 5000.
* :logic: Inside that timer block, add an `||logic:if||` check for whether the current stage is **Weather**.
* :racing car: Inside the `if` block, open `||drivenByStem:Driven by STEM||` and set weather to **Rain**.
* :paper plane: Set `||variables:weatherChanged||` to **1**.
* :tree: Open `||scene:Scene||` and change the background color to show the track is getting wetter.
* :tree: Add `||scene:set background image to||` and switch to the shared `weatherBg` image.
* :game pad: Open `||game:Game||` and add a `||game:splash||` that says `Rain lowers grip` and `Adapt your driving.`

~hint Rain never starts? ☔

---

If rain never starts, verify that your timer block exists and is allowed to run while the stage is Weather.

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

hint~

```ghost
drivenByStem.setWeather(drivenByStem.WeatherMode.Dry)
```

## {7. Reduce grip in rain (new event block)}

**Modeling Physics-Based Performance Degradation**

---

Tire grip is one of the most studied variables in motorsport sustainability. Wet surfaces reduce friction, which reduces the safe cornering speed, which changes how much energy the system can efficiently transfer to the road. Engineers model this relationship to set traction control thresholds, adjust regenerative braking windows, and predict how much extra energy a wet race will cost compared to a dry one. Your grip loop models this at the most direct level: rain is active, speed comes down; rain clears, speed restores. Setting the correct value for the current condition instead of stacking subtractions is how you avoid compounding errors in the model.

* :game pad: Open `||game:Game||` and add an `||game:on game update every [1000] ms||` event block.
* :logic: Just like you did in earlier stages, start by adding an `||logic:if||` check to make sure this code only runs when the stage is **Weather**.
* :logic: Inside that block, add an `||logic:if else||` to check the current weather.
* :racing car: In the first branch, use `||drivenByStem:weather is Rain||`.
* :controller: When it is raining, set `||controller:move [raceCar] with buttons vx vy||` using `||math:0 - 0||` with `||variables:driveSpeed||` minus `30` for both speed values.
* :controller: In the `||logic:else||` branch, set the same `||controller:move [raceCar] with buttons vx vy||` block back to `||variables:driveSpeed||` for both speed values.

~hint Car getting slower forever? 🐌

---

If your car gets slower and slower forever, you have a stacking bug. Set speed for the current condition, don't keep subtracting.

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

hint~

```ghost
drivenByStem.weatherIs(drivenByStem.WeatherMode.Dry)
```

## {8. Add puddle hazards + collisions (new event blocks)}

**Creating Dynamic Hazards with Consequences**

---

Puddles are a real environmental hazard that sustainability engineers think about in terms of standing water management, drainage design, and track surface materials. In the simulation they're dynamic hazards: they appear, they create risk, and if the driver can't see them clearly or react in time, they cost efficiency. The readability principle from the dry baseline step matters here too — if puddles blend into the background, they become invisible hazards instead of navigable ones. Good environmental design makes the hazard visible and avoidable, not hidden and unfair.

* :game pad: Open `||game:Game||` and add an `||game:on game update every [2500] ms||` block.
* :logic: Just like the other weather code, add an `||logic:if||` check so this puddle code only runs when the stage is **Weather**.
* :sprites: Inside that `||logic:if||` block, open `||sprites:Sprites||` and create an **Enemy** sprite for the puddle.
* :mouse pointer: Change the image to the shared `rainPuddle` asset.
* :racing car: Set the puddle position so it appears at a random place on the track.
* :racing car: Give the puddle a small downward speed.
* :racing car: Set a short lifespan so old puddles disappear on their own.
* :paper plane: Open `||sprites:Sprites||` and add an `||sprites:on [Player] overlaps [Enemy]||` event.
* :logic: Inside that overlap event, add an `||logic:if||` check for whether the stage is **Weather**.
* :paper plane: Increase `||variables:weatherCollisions||` by 1.
* :heart: Reduce life by `||variables:efficiencyDrain||`.
* :sprites: Destroy the puddle sprite with an effect.

~hint Screen filling with puddles? 💦

---

If the screen fills with puddles, slow the spawn rate or shorten lifespan so the situation stays readable.

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

hint~

```ghost
let puddle = sprites.create(assets.image`rainPuddle`, SpriteKind.Enemy)
puddle.setPosition(randint(10, 150), randint(10, 110))
puddle.vy = 40
puddle.lifespan = 2000
weatherCollisions += 1
info.changeLifeBy(-efficiencyDrain)
otherSprite.destroy(effects.fire, 200)
```

## {9. Reward adaptation + save results (new event block)}

**Evaluating Strategic Response to Changing Conditions**

---

The adaptation reward captures something I care about deeply: resilience matters more than perfect conditions. It is not that hard to perform well in dry conditions with a well-tuned car. What separates strong engineering from fragile engineering is what happens when something changes. This final event checks whether the weather shifted and whether collisions stayed low after it did. If both are true, the driver adapted. That is the result sustainability engineering is always trying to produce: a system that keeps working well when the environment stops cooperating.

* :game pad: Open `||info:Info||` and add an `||info:on countdown end||` event block.
* :logic: Inside that block, add an `||logic:if||` check so this code only runs when the stage is **Weather**.
* :logic: Inside the Weather block, add another `||logic:if||` to check whether `||variables:weatherChanged||` is **1** and `||variables:weatherCollisions||` is **less than or equal to 1**.
* :racing car: Inside that second `if` block, open `||drivenByStem:Driven by STEM||` and award **Strategy +1**.
* :racing car: Back in the main Weather block, add `||drivenByStem:save current run results||`.
* :game pad: Below that, add a `||game:splash||` that says `Run complete` and `Check your strategy score.`

~hint Strategy never awards? 🏆

---

If Strategy never awards, check whether `weatherChanged` became 1 and whether `weatherCollisions` stayed at 1 or below.

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

hint~

```ghost
drivenByStem.awardStrategyPoints(1)
drivenByStem.saveCurrentRunResults()
game.splash("Run complete", "Check your strategy score.")
```

## Great work!

You taught your car how to react when conditions changed. You built the shift, modeled grip reduction, added environmental hazards, and saved the results of your run for the Final Challenge.

In computer science, timers, conditionals, and saved values help your project respond when something changes. In sustainability engineering, designing for change is the whole point. Perfect conditions are temporary. Resilient systems are what last.

Every design choice in this gate had a ripple effect: the speed adjustment changed how much life you could preserve; the puddle spawn rate changed how often the driver faced a real decision; the adaptation check connected the whole chain of events to a consequence. That is systems thinking, and it shows up in sustainability engineering, environmental science, data analysis, and any career that involves designing things that operate in a world that does not stay the same.
