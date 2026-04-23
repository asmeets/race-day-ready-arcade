# Setup and Tradeoffs

### @diffs true

```package
settings-blocks=github:microsoft/pxt-settings-blocks#v1.0.0
```

```customts
/**
 * Custom blocks for the Driven by STEM skillmap.
 */
//% color=#b40707 weight=100 icon="\uf1b9" block="Driven by STEM" groups='["Session", "Profile", "Setup", "Telemetry", "Review"]'
namespace drivenByStem {
    const DRIVE_SPEED_KEY = "driveSpeed"
    const EFFICIENCY_KEY = "efficiencyRating"
    const STRATEGY_KEY = "strategyPoints"
    const DRAIN_KEY = "efficiencyDrain"
    const WEATHER_KEY = "weatherCondition"
    const STAGE_KEY = "currentStage"
    const SETUP_FOCUS_KEY = "setupFocus"
    const COLLISION_KEY = "collisionCount"
    const PIT_STOPS_KEY = "pitStopsVisited"
    const LAST_SCORE_KEY = "lastResultScore"
    const LAST_EFFICIENCY_KEY = "lastResultEfficiency"
    const LAST_STRATEGY_KEY = "lastResultStrategy"
    const NEXT_FOCUS_KEY = "nextTestFocus"
    const TEAM_NAME_KEY = "teamName"
    const CAR_NAME_KEY = "carName"
    const ROLE_LENS_KEY = "roleLens"
    const CAR_STYLE_KEY = "carStyle"

    export enum RaceStage {
        //% block="garage"
        Garage,
        //% block="garage setup"
        GarageSetup,
        //% block="garage shakedown"
        GarageShakedown,
        //% block="track"
        Track,
        //% block="pit stop"
        PitStop,
        //% block="weather"
        Weather,
        //% block="final challenge"
        FinalChallenge,
        //% block="review"
        Review,
        //% block="winner's circle"
        WinnersCircle
    }

    export enum SetupFocus {
        //% block="balance"
        Balance,
        //% block="pace"
        Pace
    }

    export enum WeatherMode {
        //% block="dry"
        Dry,
        //% block="rain"
        Rain
    }

    export enum RoleLens {
        //% block="performance engineer"
        PerformanceEngineer,
        //% block="strategist"
        Strategist,
        //% block="software engineer"
        SoftwareEngineer,
        //% block="data analyst"
        DataAnalyst
    }

    export enum CarStyle {
        //% block="silver flash"
        SilverFlash,
        //% block="volt lime"
        VoltLime,
        //% block="heat red"
        HeatRed
    }

    function stageName(stage: RaceStage): string {
        switch (stage) {
            case RaceStage.Garage:
                return "garage"
            case RaceStage.GarageSetup:
                return "garage-setup"
            case RaceStage.GarageShakedown:
                return "garage-shakedown"
            case RaceStage.Track:
                return "track"
            case RaceStage.PitStop:
                return "pit-stop"
            case RaceStage.Weather:
                return "weather"
            case RaceStage.FinalChallenge:
                return "final"
            case RaceStage.Review:
                return "review"
            case RaceStage.WinnersCircle:
                return "winner"
        }
        return "garage"
    }

    function setupFocusName(focus: SetupFocus): string {
        switch (focus) {
            case SetupFocus.Pace:
                return "pace"
            case SetupFocus.Balance:
            default:
                return "balance"
        }
    }

    function weatherName(weather: WeatherMode): string {
        switch (weather) {
            case WeatherMode.Rain:
                return "rain"
            case WeatherMode.Dry:
            default:
                return "dry"
        }
    }

    function roleLensName(role: RoleLens): string {
        switch (role) {
            case RoleLens.Strategist:
                return "strategist"
            case RoleLens.SoftwareEngineer:
                return "software engineer"
            case RoleLens.DataAnalyst:
                return "data analyst"
            case RoleLens.PerformanceEngineer:
            default:
                return "performance engineer"
        }
    }

    function carStyleName(style: CarStyle): string {
        switch (style) {
            case CarStyle.VoltLime:
                return "volt lime"
            case CarStyle.HeatRed:
                return "heat red"
            case CarStyle.SilverFlash:
            default:
                return "silver flash"
        }
    }

    function applyCarPalette(target: Sprite, bodyColor: number, accentColor: number, trimColor: number): void {
        let styled = target.image.clone()
        styled.replace(6, bodyColor)
        styled.replace(8, accentColor)
        styled.replace(5, trimColor)
        target.setImage(styled)
    }

    function ensureNumberSetting(name: string, value: number): void {
        if (!(settings.exists(name))) {
            settings.writeNumber(name, value)
        }
    }

    function ensureStringSetting(name: string, value: string): void {
        if (!(settings.exists(name))) {
            settings.writeString(name, value)
        }
    }

    /**
     * Load a race profile, or create one if this device has not saved setup data yet.
     */
    //% block="load race profile with drive speed $defaultSpeed and efficiency $defaultEfficiency"
    //% blockId=raceday_load_profile
    //% defaultSpeed.defl=80 defaultEfficiency.defl=5
    //% group="Session" weight=100
    export function loadRaceProfile(defaultSpeed: number, defaultEfficiency: number): void {
        ensureNumberSetting(DRIVE_SPEED_KEY, defaultSpeed)
        ensureNumberSetting(EFFICIENCY_KEY, defaultEfficiency)
        ensureNumberSetting(STRATEGY_KEY, 0)
        ensureNumberSetting(DRAIN_KEY, 1)
        ensureStringSetting(WEATHER_KEY, "dry")
        ensureStringSetting(STAGE_KEY, "garage")
        ensureStringSetting(SETUP_FOCUS_KEY, "balance")
        ensureNumberSetting(COLLISION_KEY, 0)
        ensureNumberSetting(PIT_STOPS_KEY, 0)
        ensureNumberSetting(LAST_SCORE_KEY, 0)
        ensureNumberSetting(LAST_EFFICIENCY_KEY, defaultEfficiency)
        ensureNumberSetting(LAST_STRATEGY_KEY, 0)
        ensureStringSetting(NEXT_FOCUS_KEY, "Review the data and test again.")
        ensureStringSetting(TEAM_NAME_KEY, "Apex Lab")
        ensureStringSetting(CAR_NAME_KEY, "Velocity")
        ensureStringSetting(ROLE_LENS_KEY, "performance engineer")
        ensureStringSetting(CAR_STYLE_KEY, "silver flash")
    }

    /**
     * Start a named stage in the skillmap run.
     */
    //% block="start stage $stage"
    //% blockId=raceday_start_stage
    //% group="Session" weight=90
    export function startStage(stage: RaceStage): void {
        settings.writeString(STAGE_KEY, stageName(stage))
    }

    /**
     * Check whether the current run is in a specific stage.
     */
    //% block="current stage is $stage"
    //% blockId=raceday_stage_is
    //% group="Session" weight=80
    export function stageIs(stage: RaceStage): boolean {
        return settings.readString(STAGE_KEY) == stageName(stage)
    }

    /**
     * Reset all saved session data on a shared device.
     */
    //% block="reset saved session"
    //% blockId=raceday_reset_session
    //% group="Session" weight=70
    export function resetSavedSession(): void {
        settings.clear()
    }

    /**
     * Save the team's name.
     */
    //% block="set team name to $name"
    //% blockId=raceday_set_team_name
    //% name.defl="Apex Lab"
    //% group="Profile" weight=100
    export function setTeamName(name: string): void {
        settings.writeString(TEAM_NAME_KEY, name)
    }

    /**
     * Read the team's name.
     */
    //% block="team name"
    //% blockId=raceday_team_name
    //% group="Profile" weight=90
    export function teamName(): string {
        return settings.readString(TEAM_NAME_KEY)
    }

    /**
     * Save the car's name.
     */
    //% block="set car name to $name"
    //% blockId=raceday_set_car_name
    //% name.defl="Velocity"
    //% group="Profile" weight=80
    export function setCarName(name: string): void {
        settings.writeString(CAR_NAME_KEY, name)
    }

    /**
     * Read the car's name.
     */
    //% block="car name"
    //% blockId=raceday_car_name
    //% group="Profile" weight=70
    export function carName(): string {
        return settings.readString(CAR_NAME_KEY)
    }

    /**
     * Save the student's role lens.
     */
    //% block="set role lens to $role"
    //% blockId=raceday_set_role_lens
    //% group="Profile" weight=60
    export function setRoleLens(role: RoleLens): void {
        settings.writeString(ROLE_LENS_KEY, roleLensName(role))
    }

    /**
     * Read the saved role lens.
     */
    //% block="role lens"
    //% blockId=raceday_role_lens
    //% group="Profile" weight=50
    export function roleLens(): string {
        return settings.readString(ROLE_LENS_KEY)
    }

    /**
     * Save the car's style.
     */
    //% block="set car style to $style"
    //% blockId=raceday_set_car_style
    //% group="Profile" weight=40
    export function setCarStyle(style: CarStyle): void {
        settings.writeString(CAR_STYLE_KEY, carStyleName(style))
    }

    /**
     * Apply the saved style colors to the player's car sprite.
     */
    //% block="apply saved car style to $car"
    //% blockId=raceday_apply_car_style
    //% car.shadow=variables_get
    //% car.defl=raceCar
    //% group="Profile" weight=30
    export function applySavedCarStyle(car: Sprite): void {
        switch (settings.readString(CAR_STYLE_KEY)) {
            case "volt lime":
                applyCarPalette(car, 7, 6, 1)
                break
            case "heat red":
                applyCarPalette(car, 2, 4, 1)
                break
            case "silver flash":
            default:
                applyCarPalette(car, 1, 9, 8)
                break
        }
    }

    /**
     * Show the saved team profile.
     */
    //% block="show saved driver profile"
    //% blockId=raceday_show_profile
    //% group="Profile" weight=20
    export function showSavedDriverProfile(): void {
        game.splash(teamName(), carName() + " | " + roleLens())
    }

    /**
     * Save the team's garage setup choices.
     */
    //% block="save team setup speed $speed efficiency cost $efficiencyCost focus $focus"
    //% blockId=raceday_save_setup
    //% speed.defl=80 efficiencyCost.defl=1
    //% group="Setup" weight=100
    export function saveTeamSetup(speed: number, efficiencyCost: number, focus: SetupFocus): void {
        settings.writeNumber(DRIVE_SPEED_KEY, speed)
        settings.writeNumber(DRAIN_KEY, efficiencyCost)
        settings.writeString(SETUP_FOCUS_KEY, setupFocusName(focus))
    }

    /**
     * Read the saved drive speed.
     */
    //% block="saved drive speed"
    //% blockId=raceday_saved_drive_speed
    //% group="Setup" weight=90
    export function savedDriveSpeed(): number {
        return settings.readNumber(DRIVE_SPEED_KEY)
    }

    /**
     * Read the saved efficiency value.
     */
    //% block="saved efficiency"
    //% blockId=raceday_saved_efficiency
    //% group="Setup" weight=80
    export function savedEfficiency(): number {
        return settings.readNumber(EFFICIENCY_KEY)
    }

    /**
     * Read the saved efficiency cost.
     */
    //% block="saved efficiency cost"
    //% blockId=raceday_saved_efficiency_cost
    //% group="Setup" weight=75
    export function savedEfficiencyCost(): number {
        return settings.readNumber(DRAIN_KEY)
    }

    /**
     * Read the saved strategy points.
     */
    //% block="saved strategy points"
    //% blockId=raceday_saved_strategy
    //% group="Setup" weight=70
    export function savedStrategyPoints(): number {
        return settings.readNumber(STRATEGY_KEY)
    }

    /**
     * Check the saved setup focus.
     */
    //% block="saved setup focus is $focus"
    //% blockId=raceday_setup_focus_is
    //% group="Setup" weight=60
    export function setupFocusIs(focus: SetupFocus): boolean {
        return settings.readString(SETUP_FOCUS_KEY) == setupFocusName(focus)
    }

    /**
     * Set the current weather condition.
     */
    //% block="set weather $weather"
    //% blockId=raceday_set_weather
    //% group="Telemetry" weight=100
    export function setWeather(weather: WeatherMode): void {
        settings.writeString(WEATHER_KEY, weatherName(weather))
    }

    /**
     * Check the current weather condition.
     */
    //% block="weather is $weather"
    //% blockId=raceday_weather_is
    //% group="Telemetry" weight=90
    export function weatherIs(weather: WeatherMode): boolean {
        return settings.readString(WEATHER_KEY) == weatherName(weather)
    }

    /**
     * Reset collision tracking for the current stage.
     */
    //% block="reset collision count"
    //% blockId=raceday_reset_collisions
    //% group="Telemetry" weight=80
    export function resetCollisionCount(): void {
        settings.writeNumber(COLLISION_KEY, 0)
    }

    /**
     * Record a collision as score loss, efficiency loss, and telemetry.
     */
    //% block="record collision score penalty $scorePenalty efficiency penalty $efficiencyPenalty"
    //% blockId=raceday_record_collision
    //% scorePenalty.defl=3 efficiencyPenalty.defl=1
    //% group="Telemetry" weight=70
    export function recordCollision(scorePenalty: number, efficiencyPenalty: number): void {
        info.changeScoreBy(0 - scorePenalty)
        info.changeLifeBy(0 - efficiencyPenalty)
        settings.writeNumber(COLLISION_KEY, settings.readNumber(COLLISION_KEY) + 1)
        settings.writeNumber(EFFICIENCY_KEY, info.life())
    }

    /**
     * Read the current collision count.
     */
    //% block="collision count"
    //% blockId=raceday_collision_count
    //% group="Telemetry" weight=60
    export function collisionCount(): number {
        return settings.readNumber(COLLISION_KEY)
    }

    /**
     * Record a pit stop visit.
     */
    //% block="record pit stop visit"
    //% blockId=raceday_record_pit_stop
    //% group="Telemetry" weight=50
    export function recordPitStopVisit(): void {
        settings.writeNumber(PIT_STOPS_KEY, settings.readNumber(PIT_STOPS_KEY) + 1)
    }

    /**
     * Read the saved pit stop count.
     */
    //% block="saved pit stop count"
    //% blockId=raceday_pit_stop_count
    //% group="Telemetry" weight=40
    export function savedPitStopCount(): number {
        return settings.readNumber(PIT_STOPS_KEY)
    }

    /**
     * Award strategy points and save them.
     */
    //% block="award strategy points $amount"
    //% blockId=raceday_award_strategy
    //% amount.defl=1
    //% group="Telemetry" weight=30
    export function awardStrategyPoints(amount: number): void {
        settings.writeNumber(STRATEGY_KEY, settings.readNumber(STRATEGY_KEY) + amount)
    }

    /**
     * Save the current run results for the review activities.
     */
    //% block="save current run results"
    //% blockId=raceday_save_results
    //% group="Review" weight=100
    export function saveCurrentRunResults(): void {
        settings.writeNumber(LAST_SCORE_KEY, info.score())
        settings.writeNumber(LAST_EFFICIENCY_KEY, info.life())
        settings.writeNumber(LAST_STRATEGY_KEY, settings.readNumber(STRATEGY_KEY))
        settings.writeNumber(EFFICIENCY_KEY, info.life())
    }

    /**
     * Read the last performance result.
     */
    //% block="last performance result"
    //% blockId=raceday_last_performance
    //% group="Review" weight=90
    export function lastPerformanceResult(): number {
        return settings.readNumber(LAST_SCORE_KEY)
    }

    /**
     * Read the last efficiency result.
     */
    //% block="last efficiency result"
    //% blockId=raceday_last_efficiency
    //% group="Review" weight=80
    export function lastEfficiencyResult(): number {
        return settings.readNumber(LAST_EFFICIENCY_KEY)
    }

    /**
     * Read the last strategy result.
     */
    //% block="last strategy result"
    //% blockId=raceday_last_strategy
    //% group="Review" weight=70
    export function lastStrategyResult(): number {
        return settings.readNumber(LAST_STRATEGY_KEY)
    }

    /**
     * Save the team's next test focus.
     */
    //% block="set next test focus $note"
    //% blockId=raceday_set_next_focus
    //% note.defl="Review the data and test again."
    //% group="Review" weight=60
    export function setNextTestFocus(note: string): void {
        settings.writeString(NEXT_FOCUS_KEY, note)
    }

    /**
     * Read the team's next test focus.
     */
    //% block="next test focus"
    //% blockId=raceday_next_focus
    //% group="Review" weight=50
    export function nextTestFocus(): string {
        return settings.readString(NEXT_FOCUS_KEY)
    }
}
```

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Setup Tradeoffs @showdialog

![Riley - Performance Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/riley.png)

Hi, I'm **Riley**, a performance engineer on the race team. I got hooked on engineering by one question: why did that change make it *better*... or *worse*? I studied physics and math in college, though great performance engineers also come through technical programs, apprenticeships, or the military. What matters is **learning to test ideas with evidence**.

On a real team I run A/B tests, translate driver feedback into data, and tune the car so it's **fast and controllable**. In this gate you'll tune the car's speed setting, **make a prediction before you test**, and add a rule that captures a core engineering truth: **every strong option costs something somewhere else**.

```template
let driveSpeed = 80
let efficiencyDrain = 1
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
drivenByStem.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(drivenByStem.savedEfficiency())
```

## {1. Start the Setup Stage and Make a Prediction}

**Establishing Good Engineering Practice**

---

Real engineers don't just change things and hope for the best — they predict outcomes first, then test. Making a prediction forces you to think through cause and effect before you make changes. This is how you turn random experiments into structured learning.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :racing_car: Open `||drivenByStem:Driven by STEM||` and add `start stage` set to **Garage Setup** inside `||loops(noclick):on start||`.
* :racing_car: Set `driveSpeed` to `saved drive speed` so your tuning carries in from the last gate.
* :game pad: Open `||game:Game||` and add a `splash` that asks: "Predict first: What will more speed do to control and energy?"

~hint Splash not showing? 📍

---

If your prediction splash doesn't show up, check placement. Make sure it's inside `on start` and not inside another event.

hint~

```blocks
//@highlight
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
//@highlight
driveSpeed = drivenByStem.savedDriveSpeed()
//@highlight
game.splash("Predict first", "What will more speed do to control and energy?")
```

## {2. Tune Speed}

**Adjusting a Key Performance Parameter**

---

Speed is one of the most important variables in racing. Changing it affects everything — how quickly you navigate, how much energy you use, how hard it is to control the car. By storing speed in a variable, you create a single point of control that you can tune and test systematically.

* :paper plane: Open `||variables:Variables||` and drag `set driveSpeed to` into `||loops(noclick):on start||`.
* :keyboard: Change the value to `110`.

~hint What's a variable? 📦

---

In programming, a **VARIABLE** is a named container that holds a value you can use and change.

Think of it like a labeled box: you can put a number in the box, check what's in the box, or replace the contents. The label stays the same, but what's inside can change.

In this project, `driveSpeed` is a variable that holds the car's speed value.

hint~

~hint Car still slow? 👀

---

If the car still feels slow, something is probably resetting your speed later. Scan your stacks and look for another place where `driveSpeed` gets set.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
driveSpeed = drivenByStem.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
//@highlight
//@validate-exists
driveSpeed = 110
```

## {3. Make Movement Use driveSpeed}

**Connecting Variables to Behavior**

---

A variable is only useful if your code actually reads it. By wiring your movement system to the `driveSpeed` variable, you ensure that changes to that one value immediately affect how the car moves. This is how engineers create centralized control — change one setting, update the whole system.

* :game pad: Open `||controller:Controller||` and find `move mySprite with buttons`.
* :mouse pointer: Replace any number values in the speed fields with the `driveSpeed` variable.

~hint Speed not changing? 🔌

---

If you still see numbers in the movement block, the tuning isn't connected yet. Replace those numbers with the `driveSpeed` bubble so your change actually takes effect.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
driveSpeed = drivenByStem.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
//@highlight
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
```

## {4. Create the Efficiency Variable}

**Modeling System Costs**

---

In real racing, every decision has a cost. Going faster burns more fuel and stresses components. In your simulation, the `efficiencyDrain` variable represents how much energy each mistake costs. Creating this variable lets you model tradeoffs — a core concept in engineering and game balance.

* :paper plane: Open `||variables:Variables||`, click **Make a Variable**, and name it `efficiencyDrain`.
* :paper plane: Add `set efficiencyDrain to 1` in `||loops(noclick):on start||`.

~hint Can't find your variable? ⌨️

---

If you can't find `efficiencyDrain` in a dropdown, it usually means it was created with a different spelling. Double-check the exact variable name.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
driveSpeed = drivenByStem.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
//@highlight
//@validate-exists
let efficiencyDrain = 1
```

## {5. Add the Tradeoff Rule}

**Programming Decision Logic**

---

This is where your simulation gets smart. A conditional statement lets your code make different choices based on the current situation. In this case, you're programming a realistic tradeoff: higher speed means higher energy cost. This is how engineers encode real-world physics into software systems.

* :paper plane: Open `||logic:Logic||` and add `if then else` in `||loops(noclick):on start||` with the condition `driveSpeed > 100`.
* :keyboard: In the `then` branch, set `efficiencyDrain` to `2`; in the `else` branch, set it to `1`.

~hint What's a conditional? 🔀

---

In programming, a **CONDITIONAL** (or if-else statement) lets your code make decisions and do different things based on whether something is true or false.

The structure is: **IF** (condition is true) **THEN** do this, **ELSE** do that instead.

In this step, you're building a rule: IF speed is high, THEN efficiency costs more, ELSE it costs less.

hint~

~hint Rule not working? 🔢

---

If your tradeoff rule never seems to kick in, check that `driveSpeed` is set before the `if` block runs. Order matters when you're building a rule.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
driveSpeed = drivenByStem.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
let efficiencyDrain = 1
//@highlight
//@validate-exists
if (driveSpeed > 100) {
    efficiencyDrain = 2
} else {
    efficiencyDrain = 1
}
```

## {6. Choose a Role Lens}

**Selecting Your Engineering Perspective**

---

On a real race team, different engineers focus on different things — some watch performance, others track efficiency, some monitor reliability. Choosing a role lens determines how you'll interpret the data you collect. There's no single "right" lens, just different ways of looking at the same system.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :racing_car: Open `||drivenByStem:Driven by STEM||` and set a role lens: Performance Engineer, Strategist, Software Engineer, or Data Analyst.
* :id card: Add `show saved driver profile` to display the current profile.

~hint Which role should I pick? ✨

---

There isn't one correct role here. Pick the lens that matches what you're watching: speed, efficiency, reliability, or data.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
driveSpeed = drivenByStem.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
let efficiencyDrain = 1
if (driveSpeed > 100) {
    efficiencyDrain = 2
} else {
    efficiencyDrain = 1
}
//@highlight
//@highlight
drivenByStem.showSavedDriverProfile()
```

```ghost
drivenByStem.setRoleLens(drivenByStem.RoleLens.SoftwareEngineer)
```

## {7. Save the Setup Focus}

**Recording Your Configuration Choice**

---

Engineering isn't just about making good decisions in the moment — it's about documenting those decisions so you can learn from them later. Saving your setup focus means future stages of your simulation will remember whether you prioritized speed or balance. This is how professional teams track setup changes across test sessions.

* :racing_car: In `||drivenByStem:Driven by STEM||`, use `save team setup` inside the `if driveSpeed > 100` structure.
* :racing_car: Set the setup focus to `Pace` in the `then` branch and `Balance` in the `else` branch.
* :game pad: Add a `splash` in each branch that explains the tradeoff choice.

~hint Setup not saving? ⏱️

---

If later gates don't seem to remember your setup, check when you save. Make sure it happens after your speed and efficiency choices are finalized.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
driveSpeed = drivenByStem.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
let efficiencyDrain = 1
if (driveSpeed > 100) {
    efficiencyDrain = 2
} else {
    efficiencyDrain = 1
}
drivenByStem.showSavedDriverProfile()
//@highlight
if (driveSpeed > 100) {
    //@validate-exists
    game.splash("Performance engineer", "You chose raw pace. Watch energy use.")
} else {
    //@validate-exists
    drivenByStem.saveTeamSetup(driveSpeed, efficiencyDrain, drivenByStem.SetupFocus.Balance)
    game.splash("Sustainability engineer", "You chose a more efficient setup.")
}
```

```ghost
drivenByStem.saveTeamSetup(driveSpeed, efficiencyDrain, drivenByStem.SetupFocus.Balance)
```

## Complete

**Nice work!** You tuned your car's speed setting, made a prediction before testing, and built a conditional rule that captures a core engineering truth: every strong option costs something somewhere else. You also chose a role lens that will shape how you see the data ahead.

You built a real engineering tradeoff. Physics idea: increasing speed raises system demand. Computer science idea: variables plus conditionals let one program adapt to different design choices.

Team roles in this tutorial: performance engineer, sustainability engineer, and systems engineer.
