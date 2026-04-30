# Reflect and Review

### @diffs true

```package
settings-blocks=github:microsoft/pxt-settings-blocks#v1.0.0
```

```customts
/**
 * Custom blocks for the Driven by STEM skillmap.
 */
//% shim=drivenByStemSupport::startVehicleTestTrack
declare function drivenByStemSupportStartVehicleTestTrack(): void

namespace SpriteKind {
    export const TestTrackObstacle = SpriteKind.create()
}

namespace drivenByStemSupport {
    export function startVehicleTestTrack(): void {
        game.splash("Full test track", "Open Garage Shakedown to launch the full simulator track.")
    }
}

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
    const SPEED_UNIT_KEY = "speedDisplayUnit"
    const FUEL_UNIT_KEY = "fuelDisplayUnit"

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

    export enum SpeedUnit {
        //% block="km/h"
        KilometersPerHour,
        //% block="mph"
        MilesPerHour
    }

    export enum FuelUnit {
        //% block="gallons"
        Gallons,
        //% block="liters"
        Liters
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

    function speedUnitName(unit: SpeedUnit): string {
        switch (unit) {
            case SpeedUnit.MilesPerHour:
                return "mph"
            case SpeedUnit.KilometersPerHour:
            default:
                return "km/h"
        }
    }

    function fuelUnitName(unit: FuelUnit): string {
        switch (unit) {
            case FuelUnit.Liters:
                return "L"
            case FuelUnit.Gallons:
            default:
                return "gal"
        }
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
        ensureStringSetting(SPEED_UNIT_KEY, "mph")
        ensureStringSetting(FUEL_UNIT_KEY, "gal")
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
     * Build the team's base car and apply the saved starting speed.
     */
    //% block="build base car with image $carImage"
    //% blockId=raceday_build_base_car
    //% carImage.shadow=screen_image_picker
    //% group="Session" weight=65
    export function buildBaseCar(carImage: Image): void {
        let car = sprites.allOfKind(SpriteKind.Player)[0]
        if (!car) {
            car = sprites.create(carImage, SpriteKind.Player)
        } else {
            car.setImage(carImage.clone())
        }
        car.setFlag(SpriteFlag.StayInScreen, true)
        const startingSpeed = settings.exists(DRIVE_SPEED_KEY) ? settings.readNumber(DRIVE_SPEED_KEY) : 80
        controller.moveSprite(car, startingSpeed, startingSpeed)
    }

    /**
     * Update the saved player's car controls to use a new speed value.
     */
    //% block="set base car speed to $speed"
    //% blockId=raceday_set_base_car_speed
    //% speed.defl=80 speed.min=0 speed.max=200
    //% group="Session" weight=59
    export function setBaseCarSpeed(speed: number): void {
        const car = sprites.allOfKind(SpriteKind.Player)[0]
        if (!car) return
        controller.moveSprite(car, speed, speed)
        car.setFlag(SpriteFlag.StayInScreen, true)
    }

    /**
     * Set the speed display unit for the shakedown dashboard.
     */
    //% block="set speed display unit to $unit"
    //% blockId=raceday_set_speed_display_unit
    //% unit.defl=SpeedUnit.MilesPerHour
    //% group="Session" weight=58
    export function setSpeedDisplayUnit(unit: SpeedUnit): void {
        settings.writeString(SPEED_UNIT_KEY, speedUnitName(unit))
    }

    /**
     * Set the fuel display unit for the shakedown dashboard.
     */
    //% block="set fuel display unit to $unit"
    //% blockId=raceday_set_fuel_display_unit
    //% unit.defl=FuelUnit.Gallons
    //% group="Session" weight=57
    export function setFuelDisplayUnit(unit: FuelUnit): void {
        settings.writeString(FUEL_UNIT_KEY, fuelUnitName(unit))
    }

    /**
     * Start the optional pseudo-3D test track using the saved setup values.
     */
    //% block="start vehicle test track"
    //% blockId=raceday_start_vehicle_test_track
    //% group="Session" weight=56
    export function startVehicleTestTrack(): void {
        loadRaceProfile(80, 5)
        drivenByStemSupport.startVehicleTestTrack()
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
    //% block="save team setup speed $speed efficiency $efficiency efficiency cost $efficiencyCost focus $focus"
    //% blockId=raceday_save_setup
    //% speed.defl=80 efficiency.defl=5 efficiencyCost.defl=1
    //% group="Setup" weight=100
    export function saveTeamSetup(speed: number, efficiency: number, efficiencyCost: number, focus: SetupFocus): void {
        settings.writeNumber(DRIVE_SPEED_KEY, speed)
        settings.writeNumber(EFFICIENCY_KEY, efficiency)
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

## Reflect and Review @showdialog

![Drew - UX/Game Designer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/drew.png)

Nice to see you again, I'm Drew, UX and game designer on the team. Since you've already met me, here's something new: a big part of my job is watching for the exact moment someone hesitates. If a player pauses, clicks the wrong thing, or asks "What am I supposed to do now?", that's useful design data. I turn those moments into clearer prompts, better screen layouts, and simpler next steps.

In this gate, you'll turn your run into a simple story: one choice, one result, one next test. Designers call it "clear over clever." Once you can read what your data is actually telling you, you'll be ready to make your final call before the winners circle. The next-test focus you save here becomes Kai's closing handoff.

## {1. Create review variables}

**Prepare Data Containers for Analysis**

---

Before you can analyze performance, you need somewhere to store the evidence. Creating these four variables establishes named containers that will soon hold your actual run results. This separation between structure (the variables) and content (the loaded data) is a fundamental pattern in data analysis workflows.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Keep Building On Your Last Stage</h4>
            <p>This activity continues the project you already updated in Final Challenge. You will add new review blocks to that same project instead of starting over.</p>
            <p>The start vehicle test track block is still available in the Driven by STEM category if you want to run the full track again and compare results. When you return to this lesson, keep your Review stage blocks connected so your analysis still works.</p>
        </div>
    </div>

* :paper plane: Open `||variables:Variables||` and create `||variables:reviewScore`, `||variables:reviewEfficiency`, `reviewStrategy`, and `||variables:pitStopsVisited`.
* :keyboard: Set each variable to `0`. This means nothing has loaded yet.

~hint Can't find your variable? ⌨️

---

If you can't find a variable later, check spelling first. One letter off or a different capital is the most common cause.

hint~

```blocks
//@highlight
//@validate-exists
let reviewScore = 0
//@highlight
//@validate-exists
let reviewEfficiency = 0
//@highlight
//@validate-exists
let reviewStrategy = 0
//@highlight
//@validate-exists
let pitStopsVisited = 0
```

## {2. Start the Review stage and read saved results}

**Transform Stored Data into Usable Evidence**

---

Saved data becomes meaningful when you load it for analysis. Starting the Review stage and reading your latest saved Performance and Efficiency snapshot, plus your running Strategy score and pit-stop total, brings the abstract numbers from the full session into concrete variables you can compare, evaluate, and act upon. This is the moment raw results become insight.

* :binoculars: In `||loops(noclick):on start||`, find the `||drivenByStem:start stage||` block that is currently set to **Final Challenge**.
* :racing car: Change that same block so it is set to **Review**.
* :racing car: Use the saved results blocks to read the last Performance (`||drivenByStem:lastPerformanceResult||`), Efficiency `||drivenByStem:lastEfficiencyResult||`, and Strategy scores `||drivenByStem:lastStrategyResult||` into your variables.
* :racing car: Read the saved pit stop count `||drivenByStem:savedPitStopCount||` into `||variables:pitStopsVisited||`.

~hint All values still zero? 🔢

---

If all your values are still zero, the final run probably didn't save. The review has nothing real to read yet.

hint~

```blocks
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Review)
//@highlight
//@validate-exists
reviewScore = drivenByStem.lastPerformanceResult()
//@highlight
//@validate-exists
reviewEfficiency = drivenByStem.lastEfficiencyResult()
//@highlight
//@validate-exists
reviewStrategy = drivenByStem.lastStrategyResult()
//@highlight
//@validate-exists
pitStopsVisited = drivenByStem.savedPitStopCount()
```

```ghost
drivenByStem.startVehicleTestTrack()
```

## {3. Show a one-screen summary}

**Present Key Metrics Clearly**

---

Numbers in variables are invisible to players. A well-designed summary screen takes your three core metrics and presents them in a single, readable snapshot that anyone can understand at a glance. Clear presentation turns data into communication, making results accessible to the entire team.

* :game pad: Open `||game:Game||` and add a `||game:splash||` block.
* :keyboard: Build the message to show `||variables:Perf||`, `||variables:Eff||`, and `||variables:Strat||` using your three variables.

~hint Summary hard to read? 👀

---

If the summary feels hard to read, trim it. Short labels and fewer numbers usually land better than more explanation.

hint~

```blocks
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
drivenByStem.startStage(drivenByStem.RaceStage.Review)
reviewScore = drivenByStem.lastPerformanceResult()
reviewEfficiency = drivenByStem.lastEfficiencyResult()
reviewStrategy = drivenByStem.lastStrategyResult()
pitStopsVisited = drivenByStem.savedPitStopCount()
//@highlight
//@validate-exists
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
```

## {4. Choose a next-test focus}

**Turn Analysis into Actionable Next Steps**

---

Reviewing data without deciding what to do next leaves teams stuck. By evaluating which metric scored lowest, your program can suggest a specific focus for the next test cycle. This transforms passive observation into active engineering iteration—the core of how real teams improve performance over time.

This step has no single correct answer. Try your own logic.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :paper plane: Open `||logic:Logic||` and build an `if / else if / else` chain.
* :racing car: If `||variables:reviewEfficiency||` is low (less than 3), use `||drivenByStem:Driven by STEM||` to set an efficiency-focused next-test focus; else if `||variables:reviewStrategy||` is low (less than 3), set an adaptation-focused focus; otherwise set a balanced focus.
* :game pad: Add a `||game:splash||` block after your `if / else if / else` chain.
* :keyboard: In the first text box, type `||game:Next test focus||` so players know what message they are reading.
* :racing car: In the second text box, use `||drivenByStem:nextTestFocus||` to show the recommendation your code just saved.

~hint Which lens to pick? 🤔

---

There's no single correct answer here. Use whichever lens scored lowest as your starting point.

hint~

```blocks
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
drivenByStem.startStage(drivenByStem.RaceStage.Review)
reviewScore = drivenByStem.lastPerformanceResult()
reviewEfficiency = drivenByStem.lastEfficiencyResult()
reviewStrategy = drivenByStem.lastStrategyResult()
pitStopsVisited = drivenByStem.savedPitStopCount()
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
//@highlight
if (reviewEfficiency < 3) {
    drivenByStem.setNextTestFocus("Protect efficiency during longer runs.")
} else if (reviewStrategy < 3) {
    drivenByStem.setNextTestFocus("Adapt sooner when conditions change.")
} else {
    drivenByStem.setNextTestFocus("Your setup stayed balanced under pressure.")
}
//@highlight
game.splash("Next test focus", drivenByStem.nextTestFocus())
```

## {5. Connect results to a role}

**Frame Results Through a Career Lens**

---

Every role on a racing team views data differently. By checking whether you used pit stops across the session, you're evaluating strategic adaptation—a skill that data analysts and strategists value highly. Connecting your results to a professional role helps you see how these decisions map to real career pathways.

This step has no single correct answer. Try your own logic.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :paper plane: Open `||logic:Logic||`.
* :game pad: If `pitStopsVisited` > `0`, show a message about using information during the session.
* :game pad: Otherwise show a message about using more mid-run data next time.

~hint How to frame the message? 💬

---

Keep the tone forward-looking. "Next test" language beats "I messed up" language. Same facts, better learning vibe.

hint~

```blocks
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
drivenByStem.startStage(drivenByStem.RaceStage.Review)
reviewScore = drivenByStem.lastPerformanceResult()
reviewEfficiency = drivenByStem.lastEfficiencyResult()
reviewStrategy = drivenByStem.lastStrategyResult()
pitStopsVisited = drivenByStem.savedPitStopCount()
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
if (reviewEfficiency < 3) {
    drivenByStem.setNextTestFocus("Protect efficiency during longer runs.")
} else if (reviewStrategy < 3) {
    drivenByStem.setNextTestFocus("Adapt sooner when conditions change.")
} else {
    drivenByStem.setNextTestFocus("Your setup stayed balanced under pressure.")
}
game.splash("Next test focus", drivenByStem.nextTestFocus())
//@highlight
if (pitStopsVisited > 0) {
    game.splash(drivenByStem.roleLens(), "You used pit information during the run.")
} else {
    game.splash(drivenByStem.roleLens(), "Next time, use more mid-run data.")
}
```

## Complete

You used the data from your run to make a real team decision. By looking at your performance, efficiency, strategy, and pit-stop results together, you figured out what your car handled well and what your team should pay attention to next.

That is an important computer science idea: saved information matters when your program brings it back, compares it, and helps you choose what to do.

That is also real engineering work. Teams do not just test and move on. They pause, review what happened, and use that evidence to plan a smarter next run.

In this activity, you were thinking like a UX/game designer, strategist, and data analyst all at once.
