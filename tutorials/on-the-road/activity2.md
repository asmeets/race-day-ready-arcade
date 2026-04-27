# Pit Stop Briefings

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

## Pit Stop Briefings @showdialog

![Morgan - Strategist](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/morgan.png)

![Pit stop marker concept](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/sprites/pitMarker.png)

Hey, I'm **Morgan**, your strategist. I didn't start out crunching data; I started in track operations, learning **timing and logistics** by doing the work and talking with the engineers and analysts around me. On a real team, I monitor live conditions, **weigh safer options against riskier ones**, and help everyone make fast calls with different pieces of information.

In this gate, you'll build a pit stop that **reads the setup choice you saved earlier** and turns it into a **real decision with real consequences**. The call you make here won't just happen and disappear. Each pit stop visit you record here shows up again in Reflect and Review.

```template
let driveSpeed = 110
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.applySavedCarStyle()
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(drivenByStem.savedEfficiency())
```

## {1. Start the Pit Stop stage}

**Activating the Pit Wall Environment**

---

Before any pit decisions can happen, the game needs to know which mode it's running in. Setting the stage tells all your event blocks whether they should execute pit logic or stay quiet. This is how real systems coordinate different operational modes—one clear signal that every subsystem can check.

* :binoculars: Open `||loops(noclick):on start||` and find the existing setup code at the bottom.
* :racing_car: Open `||drivenByStem:Driven by STEM||` and drag `start stage` into `on start`, set to **Pit Stop**.

~hint Markers in wrong place? 🚨

---

If pit markers show up on the track, that's a stage-mismatch clue. Search for a missing "if stage is Pit Stop" check.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.applySavedCarStyle()
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(drivenByStem.savedEfficiency())
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
```

## {2. Show a short briefing}

**Communicating Context to the Driver**

---

In real racing, clear communication prevents mistakes. A quick message at the start of the pit phase tells the player they've transitioned from driving to decision-making. This mirrors how race engineers brief drivers over the radio before critical moments—short, direct, and focused on what matters right now.

* :game pad: Open `||game:Game||` and add a `splash` block below the stage setter.
* :keyboard: Set the first field to `Pit wall` and the second field to `Use data before you make the next call.`

~hint Message too long? ⚡

---

Keep this briefing tight. If you need more than a few seconds to explain it, the prompt should be clearer, not longer.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.applySavedCarStyle()
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(drivenByStem.savedEfficiency())
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
//@highlight
//@validate-exists
game.splash("Pit wall", "Use data before you make the next call.")
```

## {3. Track pit stops visited}

**Recording Strategic Decisions**

---

Every pit stop costs time, so teams track how often they use them to evaluate their strategy later. Creating a counter variable gives you measurable evidence of your decision-making patterns. This is the same principle data analysts use when they review race logs to identify what worked and what didn't.

* :paper plane: Open `||variables:Variables||` and make a new variable named `pitStopsVisited`.
* :paper plane: Drag `set pitStopsVisited to 0` into `on start` below the splash.

~hint Lost evidence? 📊

---

If you skip the counter, you lose evidence. I like having at least one number I can point to: "We used the pit stop ___ times."

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.applySavedCarStyle()
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(drivenByStem.savedEfficiency())
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
game.splash("Pit wall", "Use data before you make the next call.")
//@highlight
//@validate-exists
let pitStopsVisited = 0
```

## {4. Spawn pit markers}

**Creating Time-Limited Opportunities**

---

Pit windows appear and disappear based on track position and race conditions. By spawning markers on a timer with a limited lifespan, you're modeling the reality that strategic opportunities don't wait forever. Engineers design systems that create these windows, and strategists decide when to use them—both roles rely on timing.

* :game pad: Open `||game:Game||` and add an `on update every (8000) ms` block.
* :racing_car: Inside it, add an `if stage is Pit Stop` check from `||drivenByStem:Driven by STEM||`.
* :paper plane: Create a `Food` sprite inside that check and set a short `lifespan` to make it a timed decision.

~hint Markers vanishing too fast? ⏱️

---

If markers vanish instantly, your lifespan is probably too short. Increase it a little and test again.

hint~

```blocks
//@highlight
game.onUpdateInterval(8000, function () {
    //@highlight
    if (drivenByStem.stageIs(drivenByStem.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        let pitMarker = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . 4 4 4 4 4 4 4 4 . . . .
            . . . 4 4 . . . . . . 4 4 . . .
            . . . 4 . . . . . . . . 4 . . .
            . . . 4 . . . . . . . . 4 . . .
            . . . 4 4 . . . . . . 4 4 . . .
            . . . . 4 4 4 4 4 4 4 4 . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Food)
        //@highlight
        pitMarker.setPosition(randint(20, 140), randint(20, 100))
        //@highlight
        pitMarker.lifespan = 4000
    }
})
```

## {5. Handle the pit choice}

**Applying Conditional Rewards Based on Setup**

---

The pit stop doesn't give the same reward to everyone—it responds to the setup choice you saved earlier. If you optimized for pace, you get a score boost; if you optimized for balance, you get efficiency back. This conditional logic mirrors how real teams tune their strategies to their car's strengths and the current race situation.

* :paper plane: Open `||sprites:Sprites||` and add an `on overlap Player and Food` block.
* :racing_car: Inside an `if stage is Pit Stop` check, change `pitStopsVisited` by 1, use `||drivenByStem:Driven by STEM||` to record the pit stop visit, and award a Strategy point.
* :racing_car: Add an `if/else` using `setupFocusIs Pace`. Apply a pace reward in the true branch, a balance reward in the else branch.

~hint Rewards feel backwards? 🔄

---

If rewards feel "backwards," double-check what you saved as your setup focus earlier. The pit logic is only as smart as the saved choice it reads.

hint~

```blocks
//@highlight
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    //@highlight
    if (drivenByStem.stageIs(drivenByStem.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        pitStopsVisited += 1
        //@highlight
        //@validate-exists
        drivenByStem.recordPitStopVisit()
        //@highlight
        //@validate-exists
        drivenByStem.awardStrategyPoints(1)
        //@highlight
        //@validate-exists
        if (drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Pace)) {
            //@highlight
            info.changeScoreBy(5)
        } else {
            //@highlight
            info.changeLifeBy(2)
        }
        //@highlight
        otherSprite.destroy()
    }
})
```

```ghost
drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Balance)
```

## {6. Save updated results}

**Persisting Decisions Across Stages**

---

Your pit decision only matters if it carries forward to the next stage. Saving the updated results at the end of the countdown ensures that later gates can see the score, efficiency, and strategy impact of what you did here. The pit-stop total itself is already being recorded every time you use a marker, and this end-of-run save captures the rest of the session snapshot.

* :game pad: Open `||info:Info||` and add an `on countdown end` block so this stage saves the updated run state when the carried race timer finishes.
* :racing_car: Inside the `if stage is Pit Stop` check, open `||drivenByStem:Driven by STEM||` and drag in `save current run results`.

~hint Next gate forgot your choice? 💾

---

If the next gate doesn't seem to remember your updated score or efficiency, check two things: the carried countdown from Hit the Track still exists in your code, and this save happens after the pit decision changes something.

hint~

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        drivenByStem.saveCurrentRunResults()
    }
})
```
```ghost
drivenByStem.recordPitStopVisit()
```

## Complete

**Great job!** You built a pit stop system that reads your saved setup focus and turns it into a real mid-run decision. You created a spawner that generates pit markers on a timer, an overlap event that applies different rewards based on your earlier choice, and a save system that carries your strategy forward into review.

Computer science idea: conditionals and persistent counters let one decision show up again later in the project.

Engineering idea: optimization means choosing the best next move with limited time and information.

Team roles in this tutorial: strategist, pit crew, data analyst, and operations lead.
