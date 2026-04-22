# Changing Conditions

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Changing Conditions @showdialog

![Avery - Sustainability Lead](/static/guides/avery.png)

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
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.setRoleLens(raceDayTools.RoleLens.Strategist)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 1 – Start the Weather stage

The first line in `on start` sets the active stage so all weather rules know when to run.

* :racing_car: Open `||raceDayTools:Driven by STEM||` and drag `set start stage` into `||loops(noclick):on start||`.
* Set the stage value to **Weather**.

> **Avery tip:** If rain effects spill into other gates, your stage checks are missing somewhere. Search for "Weather" in your code and make sure every weather action is guarded by a stage check.

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
raceDayTools.startStage(raceDayTools.RaceStage.Weather)
```

## Step 2 – Set starting conditions (Dry)

Lock in dry conditions and a readable background before the weather event triggers.

* :racing_car: Open `||raceDayTools:Driven by STEM||` and set weather to **Dry**.
* :tree: Open `||scene:Scene||` and `set background color` to a dry-track color.

> **Avery tip:** If you can't clearly see the car and hazards, adjust colors before you adjust difficulty. Readability is part of sustainability too.

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
raceDayTools.startStage(raceDayTools.RaceStage.Weather)
//@highlight
//@validate-exists
raceDayTools.setWeather(raceDayTools.WeatherMode.Dry)
//@highlight
//@validate-exists
scene.setBackgroundColor(7)
```

```ghost
raceDayTools.setWeather(raceDayTools.WeatherMode.Rain)
```

## Step 3 – Load saved setup

Pull in the saved drive speed and car style so the run starts from the driver's previous configuration.

* :racing_car: Open `||raceDayTools:Driven by STEM||` and set `driveSpeed` to **saved speed**.
* Use `||raceDayTools:Driven by STEM||` to apply the saved car style to `raceCar`.
* Set `efficiencyDrain` from `||raceDayTools:Driven by STEM||` `saved efficiency cost`.

> **Avery tip:** If speed feels inconsistent, check whether your code resets speed when conditions return to dry. Rain logic should change speed temporarily, not permanently.

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
raceDayTools.startStage(raceDayTools.RaceStage.Weather)
raceDayTools.setWeather(raceDayTools.WeatherMode.Dry)
scene.setBackgroundColor(7)
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

## Step 4 – Track change + collisions

Two variables will track whether conditions shifted and how many wet-weather collisions happen.

* :paper plane: Open `||variables:Variables||` and create variables named `weatherChanged` and `weatherCollisions`.
* Set both `weatherChanged` and `weatherCollisions` to **0** in `||loops(noclick):on start||`.

> **Avery tip:** If you never earn the adaptation reward, check whether `weatherChanged` ever flips to 1 and whether collisions are actually being counted.

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
raceDayTools.startStage(raceDayTools.RaceStage.Weather)
raceDayTools.setWeather(raceDayTools.WeatherMode.Dry)
scene.setBackgroundColor(7)
driveSpeed = raceDayTools.savedDriveSpeed()
raceDayTools.applySavedCarStyle(raceCar)
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
//@highlight
//@validate-exists
let weatherChanged = 0
//@highlight
//@validate-exists
let weatherCollisions = 0
```

## Step 5 – Turn on HUD + countdown

Activate the score, life, and a 25-second countdown to start the timed race window.

* :game pad: Open `||info:Info||` and set `score` and `life`.
* Add a `start countdown` block set to **25** seconds.

> **Avery tip:** If life looks wrong, trace it like a scientist. Find where it is set and every place it is changed.

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
raceDayTools.startStage(raceDayTools.RaceStage.Weather)
raceDayTools.setWeather(raceDayTools.WeatherMode.Dry)
scene.setBackgroundColor(7)
driveSpeed = raceDayTools.savedDriveSpeed()
raceDayTools.applySavedCarStyle(raceCar)
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
let weatherChanged = 0
let weatherCollisions = 0
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(25)
```

## Step 6 – Switch to Rain (new event block)

This standalone event fires after 10 seconds and shifts conditions mid-race. Add it outside `on start`.

* :game pad: Open `||Timers:Timers||` and add an `after (10000) ms` event block.
* Inside, check that the stage is **Weather**, then set weather to **Rain**, set `weatherChanged` to **1**, change the background color, and show a **"Rain lowers grip"** splash.

> **Avery tip:** If rain never starts, verify that your timer block exists and is allowed to run while the stage is Weather.

```blocks
timer.after(10000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Weather)) {
        //@highlight
        //@validate-exists
        raceDayTools.setWeather(raceDayTools.WeatherMode.Rain)
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
raceDayTools.setWeather(raceDayTools.WeatherMode.Dry)
```

## Step 7 – Reduce grip in rain (new event block)

This standalone update loop checks current conditions every second and assigns the correct speed. It sets the right value each time, not subtracting repeatedly.

* :game pad: Open `||game:Game||` and add an `on game update every (1000) ms` event block.
* If weather is **Rain**, set `||controller:Controller||` move speed to `driveSpeed − 30`; otherwise set it back to `driveSpeed`.

> **Avery tip:** If your car gets slower and slower forever, you have a stacking bug. Set speed for the current condition, don't keep subtracting.

```blocks
game.onUpdateInterval(1000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Weather)) {
        if (raceDayTools.weatherIs(raceDayTools.WeatherMode.Rain)) {
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
raceDayTools.weatherIs(raceDayTools.WeatherMode.Dry)
```

## Step 8 – Add puddle hazards + collisions (new event blocks)

Two standalone event blocks handle spawning and collision separately. Puddles appear on a timer, and an overlap event handles what happens when the car hits one.

* :game pad: Open `||game:Game||` and add an `on game update every (2500) ms` block; create an **Enemy** puddle sprite from `||sprites:Sprites||` with a short lifespan.
* :paper plane: Open `||sprites:Sprites||` and add an `on sprite of kind Player overlaps Enemy` event; increase `weatherCollisions`, reduce life by `efficiencyDrain`, and destroy the puddle with an effect.

> **Avery tip:** If the screen fills with puddles, slow the spawn rate or shorten lifespan so the situation stays readable.

```blocks
game.onUpdateInterval(2500, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Weather)) {
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
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Weather)) {
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

## Step 9 – Reward adaptation + save results (new event block)

When the countdown ends, this standalone event checks whether the driver adapted successfully and records the outcome.

* :game pad: Open `||info:Info||` and add an `on countdown end` event block.
* If the stage is **Weather**, `weatherChanged` equals **1**, and `weatherCollisions` is **≤ 1**, use `||raceDayTools:Driven by STEM||` to award **Strategy +1**.
* Save the current run results and show a **"Run complete"** splash.

> **Avery tip:** If Strategy never awards, check whether `weatherChanged` became 1 and whether `weatherCollisions` stayed at 1 or below.

```blocks
info.onCountdownEnd(function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Weather)) {
        if (weatherChanged == 1 && weatherCollisions <= 1) {
            //@highlight
            //@validate-exists
            raceDayTools.awardStrategyPoints(1)
        }
        //@highlight
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
        //@highlight
        //@validate-exists
        game.splash("Run complete", "Check your strategy score.")
    }
})
```

## Complete

**Awesome work!** You modeled changing conditions and adaptive response. You built a delayed timer that shifts weather mid-run, a speed-adjustment loop that responds to rain, puddle hazards that increase challenge, and a countdown-end event that rewards successful adaptation. The best design adapts rather than pushes harder. That's the core of resilient systems thinking.

Roles in this tutorial: sustainability lead, systems engineer, telemetry analyst, and performance engineer.
