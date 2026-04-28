# Final Challenge

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

    export enum CarStyle {
        //% block="silver flash"
        SilverFlash,
        //% block="volt lime"
        VoltLime,
        //% block="heat red"
        HeatRed
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

## Final Challenge @showdialog

![Taylor - Systems Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/taylor.png)

![Final challenge concept](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/sprites/finishBg.png)

Hey, I'm **Taylor**, Systems Engineer. I got my start in a two-year electronics program, learning by doing, then kept building skills through coursework and certifications while I was already working in the field. On a real team, my job is **integration testing**: I connect all the subsystems together and make sure the **whole experience works**, not just one part in isolation.

That's exactly what this gate is about. You've built your performance system, your efficiency system, and your strategy layer. Now you'll **run them all at once** and see how your saved setup performs under one integrated test. This is your **final run**, and the result you save here is the data Drew will read in Reflect and Review.

```template
let driveSpeed = 110
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## {1. Start the Final Challenge stage}

**Initialize the Integration Test**

---

This is it—the moment where all your subsystems run together. Setting the stage to Final Challenge tells every spawner, collision handler, and timer that you're now in full integration mode. Without this signal, events won't know which rules to follow, and your carefully tuned systems won't activate correctly.

* :binoculars: Open `||loops(noclick):on start||` and find the `||drivenByStem:Driven by STEM||` drawer.
* :racing_car: Add the **start stage** block and set it to **Final Challenge**.

~hint Wrong things showing up? 🔍

---

If you see obstacles or pit markers showing up at weird times, suspect a missing stage check. In systems work, "wrong mode" bugs are super common.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
```

## {2. Set the final scene}

**Create the Race Environment**

---

The final challenge deserves its own visual identity. Start with a distinct background color so the scene stays readable, then add the shared finish background image to show that this is the culminating test. Strong contrast still matters because every obstacle and opportunity needs to stay visible during high-speed decision-making.

* :tree: Open `||scene:Scene||` inside `||loops(noclick):on start||`.
* :tree: Add `set background color` and pick a color that contrasts with your car and obstacles.
* :tree: Add `set background image to` under it and choose the shared `finishBg` image.

~hint Hazards hard to distinguish? 🎨

---

If hazards are hard to distinguish, simplify the scene and test again. A system can be "correct" and still be unusable if signals aren't readable.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
//@validate-exists
scene.setBackgroundColor(8)
//@highlight
//@validate-exists
scene.setBackgroundImage(assets.image`finishBg`)
```

## {3. Load saved setup + costs}

**Honor Earlier Engineering Decisions**

---

Every tuning choice you made in the garage matters now. Loading your saved speed, efficiency cost, and car style ensures that this final run authentically reflects the tradeoffs you designed earlier. This is how systems thinking works in practice—earlier decisions cascade forward through the entire experience.

* :racing_car: In `||loops(noclick):on start||`, use `||drivenByStem:Driven by STEM||` to load saved `driveSpeed`.
* :racing_car: Load `efficiencyDrain` from saved efficiency cost.
* :racing_car: Apply saved car style to `raceCar`.

~hint Car doesn't match your setup? 🔧

---

If the car doesn't match your setup, hunt for a leftover hardcoded value in movement. One stray number can override your saved tuning.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
scene.setBackgroundImage(assets.image`finishBg`)
//@highlight
//@validate-exists
driveSpeed = drivenByStem.savedDriveSpeed()
//@highlight
//@validate-exists
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
//@highlight
//@validate-exists
drivenByStem.applySavedCarStyle()
//@highlight
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
```

## {4. Create final tracking variables}

**Prepare the Evidence Capture System**

---

You can't improve what you don't measure. Creating dedicated variables for collisions and pit stops gives this final challenge clear evidence to show as it happens. These counters help you tell a specific story about how the run went under pressure, even before you save the final summary data.

* :paper plane: Open `||variables:Variables||` and create `finalCollisions`. Set it to `0`.
* :paper plane: Create `finalPitStops` and set it to `0`.

~hint Reflection feels fuzzy? 🔍

---

If your reflection later feels fuzzy, it usually means you didn't track the right signals. Make sure your "final" counters actually change during the run.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
drivenByStem.applySavedCarStyle()
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
//@highlight
//@validate-exists
let finalCollisions = 0
//@highlight
//@validate-exists
let finalPitStops = 0
```

## {5. Turn on HUD + countdown}

**Display Real-Time System State**

---

Racing isn't just about going fast—it's about balancing three competing priorities under time pressure. Your HUD displays Performance through score, Efficiency through life, and Strategy through decisions. The countdown creates urgency, forcing you to prioritize tradeoffs instead of optimizing everything perfectly.

* :game pad: Open `||info:Info||` inside `||loops(noclick):on start||`, set score to `0`, and set life from saved efficiency.
* :game pad: Add a `start countdown` block set to `25` seconds.
* :game pad: Add a `||game:splash||` that reminds players to balance Performance (score), Efficiency (life), and Strategy.

~hint Run never ends? ⏱️

---

If the run never ends, check whether you started the countdown and whether you added a countdown-end event.

hint~

```blocks
let driveSpeed = 110
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.FinalChallenge)
scene.setBackgroundColor(8)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
drivenByStem.applySavedCarStyle()
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
let finalCollisions = 0
let finalPitStops = 0
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(drivenByStem.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(25)
//@highlight
//@validate-exists
game.splash("Balance all three", "Performance. Efficiency. Strategy.")
```

## {6. Spawn obstacles (risk)}

**Generate Continuous Performance Pressure**

---

Obstacles represent the unpredictable risks that every racing team faces—track debris, weather changes, mechanical stress. By spawning them continuously throughout the run, you create sustained pressure that tests whether your efficiency tuning can handle extended challenges, not just a single perfect moment.

* :game pad: Open `||game:Game||` and add a new **on update interval** block set to `2500` ms.
* :paper plane: Inside the update, check if stage is **Final Challenge**, then spawn an **Enemy** sprite near the top of the screen with downward velocity and auto-destroy enabled.

~hint Too chaotic? 🌀

---

If the run feels too chaotic, slow spawns first. If it's readable, you can always ramp it back up.

hint~

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(2500, function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        let obstacle = sprites.create(assets.image`trackObstacle`, SpriteKind.Enemy)
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

## {7. Spawn pit opportunities (recovery)}

**Provide Strategic Recovery Options**

---

Real racing isn't just about avoiding problems—it's about knowing when to recover. Pit markers transform the challenge from pure reflexes into strategic decision-making: do you maintain your current pace or take a moment to restore efficiency? This turns the game into a test of judgment, not just speed.

* :game pad: Open `||game:Game||` and add a new **on update interval** block set to `7000` ms.
* :paper plane: Inside the update, check if stage is **Final Challenge**, then spawn a `||sprites:Food||` sprite with a short lifespan.

~hint Pit markers not showing? ⏱️

---

If pit markers never show up, check timing and lifespan. If they show up but feel useless, check that your overlap event is looking for the right kind.

hint~

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(7000, function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        let pitMarker = sprites.create(assets.image`pitMarker`, SpriteKind.Food)
        //@highlight
        //@validate-exists
        pitMarker.setPosition(randint(20, 140), randint(20, 100))
        //@highlight
        //@validate-exists
        pitMarker.lifespan = 4000
    }
})
```

## {8. Score risk + recovery}

**Connect Actions to Measurable Outcomes**

---

Events without feedback are invisible to players. By wiring collision and pit stop overlaps to the HUD, you make every decision immediately visible through score changes, life updates, and visual effects. This feedback loop is what turns abstract code into a readable, learnable system.

* :paper plane: Open `||sprites:Sprites||` and add an overlap event for **Player** vs **Enemy**: deduct Efficiency and destroy the obstacle.
* :paper plane: Add a second overlap event for **Player** vs **Food**: restore life, add to score, record a pit stop, and destroy the marker.

~hint Events doing nothing? 🐛

---

If a collision or pit stop does "nothing," that's usually a kind mismatch. Verify your Enemy vs Food overlap events match what you actually spawned.

hint~

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
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
    if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        finalPitStops += 1
        //@highlight
        //@validate-exists
        drivenByStem.recordPitStopVisit()
        //@highlight
        //@validate-exists
        info.changeLifeBy(1)
        //@highlight
        //@validate-exists
        info.changeScoreBy(3)
        //@highlight
        //@validate-exists
        drivenByStem.awardStrategyPoints(1)
        //@highlight
        //@validate-exists
        otherSprite.destroy()
    }
})
```

## {9. Save final run data}

**Preserve the Complete Performance Record**

---

Integration testing isn't complete until you've captured the results. The countdown-end event is your only guaranteed moment to save performance data before the run terminates. This saved evidence becomes the foundation for reflection, comparison, and the next round of tuning decisions.

* :game pad: Open `||info:Info||` and add an **on countdown end** event block.
* :racing_car: Inside it, check if stage is **Final Challenge**, then use `||drivenByStem:Driven by STEM||` to save current run results.

~hint Review shows nothing? 📊

---

If review shows blank or zero values, results probably weren't saved at the end. Confirm the save runs inside countdown-end.

hint~

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.FinalChallenge)) {
        //@highlight
        //@validate-exists
        drivenByStem.saveCurrentRunResults()
        //@highlight
        //@validate-exists
        game.splash("Final run complete", "Open the data review.")
    }
})
```

## Complete

**You nailed it!** You ran all your subsystems together in one integrated final challenge. You built obstacle spawners, pit stop recovery events, collision handlers, and a countdown-end event that saved the complete run. That saved run is the full-system evidence you'll analyze next.

Computer science idea: shared events and persistent data let multiple subsystems work together inside one project.

Engineering idea: integration testing checks whether separate parts still behave correctly when they all run at once.

Team roles in this tutorial: systems engineer, lead engineer, strategist, and cross-functional race team.
