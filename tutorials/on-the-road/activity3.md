# Changing Conditions

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
    //% block="apply saved car style"
    //% blockId=raceday_apply_car_style
    //% group="Profile" weight=30
    export function applySavedCarStyle(): void {
        const car = sprites.allOfKind(SpriteKind.Player)[0]
        if (!car) return
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
drivenByStem.applySavedCarStyle()
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
drivenByStem.applySavedCarStyle()
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
drivenByStem.applySavedCarStyle()
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
