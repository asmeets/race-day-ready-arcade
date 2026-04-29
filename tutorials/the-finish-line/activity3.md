# Winners Circle

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
        drivenByStemSupportStartVehicleTestTrack()
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

## Winners Circle @showdialog

![Kai - Operations Lead](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/kai.png)

![Winners circle banner](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/sprites/finishBanner.png)

Hi, I'm **Kai**, your operations lead. I got into this work the hands-on way: setting up equipment, keeping things running, and figuring out systems by doing them. Over time I added project planning and process design, because **reliability isn't luck, it's something you build**. On a real team I coordinate timelines, make sure resets go smoothly, and create **handoffs** so the next shift can pick up right where we left off.

In this last gate, you'll use your saved data to **celebrate what you built**, explore where these skills connect to real careers, and leave with a **clear next-step idea**. Finishing is great, and a good handoff means the work keeps going. This final screen works because every earlier tutorial saved one more piece of the story.

```template
drivenByStem.loadRaceProfile(80, 5)
```

## {1. Start Winners Circle stage}

**Transition to Celebration Mode**

---

You've completed the challenge, and now it's time to celebrate and reflect. Setting the stage to Winners Circle signals that the competitive phase is over and the focus shifts to recognizing achievement, reviewing what you built, and connecting your work to broader career pathways and CS concepts.

* :binoculars: Open `||loops(noclick):on start||` and find your setup code.
* :racing_car: Open `||drivenByStem:Driven by STEM||` and drag `start stage` into `on start`, then set it to `Winners Circle`.

~hint Still feels like gameplay? 🎮

---

If this still feels like gameplay, some older spawners are still running. Scan for any "update every" blocks that don't check the Winners Circle stage.

hint~

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
```

## {2. Set the celebration scene}

**Create a Victory Environment**

---

Visuals matter for closure. A bright background and celebratory screen effect immediately communicate that this is a different moment—not a challenge, but a celebration. These visual cues help players transition from performance pressure to reflection mode, setting the right tone for reviewing achievements.

* :tree: Open `||scene:Scene||` and set the background to a bright color.
* :paint brush: Open `||effects:Effects||` and start confetti or another screen effect.

~hint Text hard to read? 🎉

---

If confetti makes the text hard to read, tone it down. A good finish is clear first, flashy second.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
//@highlight
//@validate-exists
scene.setBackgroundColor(8)
//@highlight
//@validate-exists
effects.confetti.startScreenEffect()
```

## {3. Create closing variables}

**Prepare for Summary Data Display**

---

The Winners Circle displays both recommendations (text) and performance scores (numbers). Creating the right variable types before loading data ensures that your summary can present both qualitative insights and quantitative results cleanly, giving you a complete picture of what you accomplished.

* :paper plane: Open `||variables:Variables||` and create a text variable named `nextTestFocus`.
* :paper plane: Create a second variable named `finalStrategy` and give it a starting value of `0`.

~hint Variables not loading? 💾

---

If saved values won't drop into your variables, check that you created them first. Always create variables before you load data into them.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
//@highlight
//@validate-exists
let nextTestFocus = ""
//@highlight
//@validate-exists
let finalStrategy = 0
```

## {4. Read closing data}

**Retrieve Your Personal Journey Evidence**

---

The celebration is meaningful because it's personalized to your choices. Loading your `next test focus`, session strategy total, and driver profile ensures that every message you see reflects the actual decisions you made throughout the experience, making the reflection authentic rather than generic.

* :racing_car: Open `||drivenByStem:Driven by STEM||` and set `nextTestFocus` from the `next test focus` reporter.
* :racing_car: Set `finalStrategy` from the saved strategy result.
* :racing_car: Drag `show saved driver profile` into `on start`.

~hint Recommendation blank? 🔍

---

If your `next test focus` text is blank, that's a clue the Review gate didn't write it yet. Trace where it's supposed to be saved.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
//@highlight
nextTestFocus = drivenByStem.nextTestFocus()
//@highlight
finalStrategy = drivenByStem.lastStrategyResult()
//@highlight
//@validate-exists
drivenByStem.showSavedDriverProfile()
```

## {5. Connect setup to a career lens}

**Map Choices to Professional Roles**

---

Your engineering focus reveals the kind of work you prioritized. Whether you emphasized raw performance or balanced sustainability, each approach connects to real roles on a racing team—from performance engineers who squeeze every millisecond from a setup to strategists who optimize the whole system. This helps you see how your choices reflect actual career pathways.

This step has no single correct answer. Try your own logic.

* :paper plane: Open `||logic:Logic||` and add an `if / else` block.
* :game pad: If setup focus was Pace, show `"Career link: performance engineer"`.
* :game pad: Otherwise show `"Career link: strategist/sustainability lead"`.

~hint How to write this? ✍️

---

Keep the message inclusive. If your text sounds like "only one right way," try rewriting it as "here's what this choice prioritized."

hint~

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
nextTestFocus = drivenByStem.nextTestFocus()
finalStrategy = drivenByStem.lastStrategyResult()
drivenByStem.showSavedDriverProfile()
//@highlight
if (drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
```

## {6. Show the CS takeaway}

**Highlight the Technical Foundation**

---

Behind every racing decision was a computer science concept. Events detected collisions and pit stops, variables stored your tuning choices, and saved data carried those choices across tutorials. Explicitly naming these CS ideas helps you recognize that the technical skills you practiced here apply far beyond racing games.

* :game pad: Open `||game:Game||` and drag a `splash` block into `on start`.
* :keyboard: Set the text to `"Events, variables, and saved data carried your choices forward."`.

~hint Message too long? 📱

---

If the takeaway is getting long, trim it. One clear line that's readable on a projector beats five lines nobody reads.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
nextTestFocus = drivenByStem.nextTestFocus()
finalStrategy = drivenByStem.lastStrategyResult()
drivenByStem.showSavedDriverProfile()
if (drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
//@highlight
//@validate-exists
game.splash("Computer science mattered", "Events, variables, and saved data carried your choices forward.")
```

## {7. End with a next-test idea}

**Leave With a Forward-Looking Focus**

---

Every great team finishes one test by planning the next. Whether your session strategy total is high or you identified an area to strengthen, closing with a specific next-test idea models how real engineering teams maintain momentum. Completion isn't the end—it's a handoff to the next iteration.

This step has no single correct answer. Try your own logic.

* :paper plane: Open `||logic:Logic||` and add an `if / else` block.
* :game pad: If `finalStrategy` is `≥ 3`, show an "adaptation success" message.
* :game pad: Otherwise show `"Next test: "` joined with `nextTestFocus`.

~hint Stuck on what to write? ✍️

---

If you're stuck on what to write, pick the lens that felt weakest and make that your next test.

hint~

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
nextTestFocus = drivenByStem.nextTestFocus()
finalStrategy = drivenByStem.lastStrategyResult()
drivenByStem.showSavedDriverProfile()
if (drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
game.splash("Computer science mattered", "Events, variables, and saved data carried your choices forward.")
//@highlight
if (finalStrategy >= 3) {
    game.splash("Engineering takeaway", "You adapted well across the full session.")
} else {
    game.splash("Engineering takeaway", "Next test: " + nextTestFocus)
}
```

## Complete

**You finished the full journey!** You built a celebration screen that reads saved data, displays your team identity, shows performance metrics, and connects your choices to real career pathways. Events, variables, and saved data let choices made in one tutorial carry forward into the next. That's how you built a system that remembers.

Computer science idea: events, variables, and saved data let choices made in one tutorial carry forward into the next.

Engineering idea: reliable teams celebrate results and leave a clear handoff for the next test.

Roles connected across the path: software engineer, systems engineer, performance engineer, strategist, data analyst, reliability engineer, and operations team.
