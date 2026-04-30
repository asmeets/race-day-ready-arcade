# Setup and Tradeoffs

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
    const TEST_BED_WIDTH = 160
    const TEST_BED_HEIGHT = 120
    const TEST_BED_FLOOR_Y = 90
    const TEST_BED_ROLLER_X = 32
    const TEST_BED_ROLLER_Y = 88
    const TEST_BED_ROLLER_WIDTH = 96
    const TEST_BED_GAUGE_X = 8
    const TEST_BED_GAUGE_WIDTH = 144
    const TEST_BED_GAUGE_HEIGHT = 6
    const TEST_BED_GAUGE_SPEED_Y = 18
    const TEST_BED_GAUGE_EFFICIENCY_Y = 38
    const TEST_BED_GAUGE_DRAIN_Y = 58
    const TEST_BED_LABEL_X = 8
    const TEST_BED_VALUE_X = 112
    const TEST_BED_HINT_X = 12
    const TEST_BED_HINT_Y = 104
    const TEST_BED_SPEED_MAX = 140
    const TEST_BED_CAR_Y = 98
    const TEST_BED_CAR_MIN_X = TEST_BED_ROLLER_X + 12
    const TEST_BED_CAR_MAX_X = TEST_BED_ROLLER_X + TEST_BED_ROLLER_WIDTH - 12
    const TEST_BED_HEADER_COLOR = 9
    const TEST_BED_PANEL_COLOR = 13
    const TEST_BED_FLOOR_COLOR = 6
    const TEST_BED_TEXT_COLOR = 15
    const TEST_BED_ROLLER_COLOR = 15
    const TEST_BED_ROLLER_STRIPE_COLOR = 1
    const TEST_BED_SLIDE_SPEED = 45
    const TEST_BED_STEER_BONUS = 18
    const TEST_BED_REV_BONUS = 24
    const TEST_BED_BRAKE_PENALTY = 20
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
    let garagePreviewActive = false
    let garagePreviewBaseSpeed = 0
    let garagePreviewEfficiency = 0
    let garagePreviewDrain = 0

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

    function clampToRange(value: number, minValue: number, maxValue: number): number {
        return Math.max(minValue, Math.min(value, maxValue))
    }

    function integerDivide(dividend: number, divisor: number): number {
        return Math.idiv(dividend, divisor)
    }

    function drawGarageGauge(canvas: Image, label: string, y: number, width: number, fillColor: number, valueText: string): void {
        canvas.print(label, TEST_BED_LABEL_X, y - 2, TEST_BED_TEXT_COLOR, image.font8)
        canvas.drawRect(TEST_BED_GAUGE_X, y + 9, TEST_BED_GAUGE_WIDTH, TEST_BED_GAUGE_HEIGHT, TEST_BED_TEXT_COLOR)
        canvas.fillRect(TEST_BED_GAUGE_X + 1, y + 10, Math.max(0, width - 2), TEST_BED_GAUGE_HEIGHT - 2, fillColor)
        canvas.print(valueText, TEST_BED_VALUE_X, y - 2, TEST_BED_TEXT_COLOR, image.font8)
    }

    function renderGarageTestBed(speed: number, efficiency: number, drain: number): void {
        const canvas = image.create(TEST_BED_WIDTH, TEST_BED_HEIGHT)
        const playerCar = sprites.allOfKind(SpriteKind.Player)[0]
        const safeSpeed = clampToRange(speed, 0, TEST_BED_SPEED_MAX)
        const safeEfficiency = clampToRange(efficiency, 0, 10)
        const safeDrain = clampToRange(drain, 0, 5)
        const speedWidth = integerDivide(safeSpeed * TEST_BED_GAUGE_WIDTH, TEST_BED_SPEED_MAX)
        const efficiencyWidth = integerDivide(safeEfficiency * TEST_BED_GAUGE_WIDTH, 10)
        const drainWidth = integerDivide(safeDrain * TEST_BED_GAUGE_WIDTH, 5)

        canvas.fill(TEST_BED_PANEL_COLOR)
        canvas.fillRect(0, 0, TEST_BED_WIDTH, 26, TEST_BED_HEADER_COLOR)
        canvas.fillRect(0, TEST_BED_FLOOR_Y, TEST_BED_WIDTH, TEST_BED_HEIGHT - TEST_BED_FLOOR_Y, TEST_BED_FLOOR_COLOR)
        canvas.fillRect(TEST_BED_ROLLER_X, TEST_BED_ROLLER_Y, TEST_BED_ROLLER_WIDTH, 8, TEST_BED_ROLLER_COLOR)
        for (let x = TEST_BED_ROLLER_X + 4; x < TEST_BED_ROLLER_X + TEST_BED_ROLLER_WIDTH; x += 12) {
            canvas.fillRect(x, TEST_BED_ROLLER_Y + 1, 4, 6, TEST_BED_ROLLER_STRIPE_COLOR)
        }

        canvas.print("Garage Test Bed", 28, 6, TEST_BED_TEXT_COLOR, image.font8)
        drawGarageGauge(canvas, "Speed", TEST_BED_GAUGE_SPEED_Y, speedWidth, 8, safeSpeed + "")
        drawGarageGauge(canvas, "Efficiency", TEST_BED_GAUGE_EFFICIENCY_Y, efficiencyWidth, 7, safeEfficiency + "/10")
        drawGarageGauge(canvas, "Drain", TEST_BED_GAUGE_DRAIN_Y, drainWidth, 2, safeDrain + "/5")
        canvas.print("Tune values, then preview", TEST_BED_LABEL_X, 78, TEST_BED_TEXT_COLOR, image.font8)

        scene.setBackgroundImage(canvas)
        if (playerCar) {
            playerCar.setFlag(SpriteFlag.StayInScreen, true)
            playerCar.y = TEST_BED_CAR_Y
            playerCar.x = clampToRange(playerCar.x, TEST_BED_CAR_MIN_X, TEST_BED_CAR_MAX_X)
        }
    }

    function updateGaragePreview(): void {
        if (!(garagePreviewActive)) {
            return
        }

        const playerCar = sprites.allOfKind(SpriteKind.Player)[0]
        if (!(playerCar)) {
            return
        }

        let previewSpeed = garagePreviewBaseSpeed
        playerCar.x = clampToRange(playerCar.x, TEST_BED_CAR_MIN_X, TEST_BED_CAR_MAX_X)
        playerCar.y = TEST_BED_CAR_Y

        if (controller.left.isPressed() || controller.right.isPressed()) {
            previewSpeed += TEST_BED_STEER_BONUS + Math.abs(playerCar.x - 80)
        }

        if (controller.up.isPressed()) {
            previewSpeed += TEST_BED_REV_BONUS
        }

        if (controller.down.isPressed()) {
            previewSpeed = Math.max(0, previewSpeed - TEST_BED_BRAKE_PENALTY)
        }

        renderGarageTestBed(previewSpeed, garagePreviewEfficiency, garagePreviewDrain)
    }

    game.onUpdate(function () {
        updateGaragePreview()
    })

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
     * Preview current tuning values on the garage test bed before the full shakedown.
     */
    //% block="preview garage test bed speed $speed efficiency $efficiency drain $drain"
    //% blockId=raceday_preview_garage_test_bed
    //% speed.defl=80 efficiency.defl=5 drain.defl=1
    //% group="Session" weight=60
    export function previewGarageTestBed(speed: number, efficiency: number, drain: number): void {
        loadRaceProfile(80, 5)
        garagePreviewActive = true
        garagePreviewBaseSpeed = speed
        garagePreviewEfficiency = efficiency
        garagePreviewDrain = drain

        const playerCar = sprites.allOfKind(SpriteKind.Player)[0]
        if (playerCar) {
            controller.moveSprite(playerCar, TEST_BED_SLIDE_SPEED, 0)
            playerCar.setFlag(SpriteFlag.StayInScreen, true)
            playerCar.setPosition(80, TEST_BED_CAR_Y)
        }

        renderGarageTestBed(speed, efficiency, drain)
    }

    /**
     * Start the optional pseudo-3D test track using the saved setup values.
     */
    //% block="start vehicle test track"
    //% blockId=raceday_start_vehicle_test_track
    //% group="Session" weight=55
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

## Setup Tradeoffs @showdialog

![Riley - Performance Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/riley.png)

Hi, I'm Riley, a performance engineer on the race team. I got hooked on engineering by one question: why did that change make it *better*... or *worse*? I studied physics and math in college, though great performance engineers also come through technical programs, apprenticeships, or the military. What matters is learning to test ideas with evidence.

On a real team I run A/B tests, translate driver feedback into data, and tune the car so it's fast and controllable. In this gate you'll tune the car's speed setting, make a prediction before you test, and add a rule that captures a core engineering truth: every strong option costs something somewhere else. Your custom car design stays in the project, and your dashboard unit choices carry forward from the last gate while you tune the setup. Before you leave the garage, you'll preview the setup on a test bed so the data grows with your build.

```template
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
drivenByStem.setBaseCarSpeed(drivenByStem.savedDriveSpeed())
drivenByStem.setTeamName("Apex Lab")
drivenByStem.setCarName("Velocity")
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
```

## {1. Start the Setup Stage and Make a Prediction}

**Establishing Good Engineering Practice**

---

Engineers don't just change things and hope for the best — they predict outcomes first, then test. Making a prediction forces you to think through cause and effect before you make changes. This is how you turn random experiments into structured learning.
<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Something Looks Familiar...</h4>
            <p>This activity continues your Garage code from the last activity. You will continue <b>updating</b> that existing setup instead of <i>rebuilding it</i>.</p>
        </div>
    </div>

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :racing car: Find the `||drivenByStem:start stage||` block already in `||loops(noclick):on start||`.
* :mouse pointer: Change the `||drivenByStem:start stage||` block value from **Garage** to **Garage Setup**.
* :paper plane: Open `||variables:Variables||`, click **Make a Variable**, and name it `driveSpeed`.
* :paper plane: Add `||variables:set driveSpeed to||` inside `||loops(noclick):on start||` immediately below `||sprites(noclick):set raceCar to sprite of kind Player||`.
* :mouse pointer: Set `||variables:driveSpeed||` to the `||drivenByStem:saved drive speed||` output so `driveSpeed` starts with the same value as your current car setup.
* :wrench: Leave the existing `||drivenByStem:set base car speed to||` block alone for now. In Step 3, you will swap it from `||drivenByStem:saved drive speed||` to `||variables:driveSpeed||` so one variable controls the tuning.
* :game pad: Before you test, pause and make a quick prediction with your team: what might more speed do to control and energy use?

~hint What's a variable? 📦

---

In programming, a **variable** is a named container that holds a value you can use and change.

Think of it like a labeled box: you can put a number in the box, check what's in the box, or replace the contents. The label stays the same, but what's inside can change.

In this project, `driveSpeed` is a variable that holds the car's speed value.

hint~

~hint Can't find driveSpeed yet? 📍

---

If you do not see `driveSpeed` in the Variables toolbox yet, create it first with **Make a Variable**. The `set driveSpeed to` block only appears after the variable exists.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
drivenByStem.setBaseCarSpeed(drivenByStem.savedDriveSpeed())
drivenByStem.setTeamName("Apex Lab")
drivenByStem.setCarName("Velocity")
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
//@highlight
let driveSpeed = drivenByStem.savedDriveSpeed()
```

## {2. Tune Speed}

**Adjusting a Key Performance Parameter**

---

Speed is one of the most important variables in racing. Changing it affects everything — how quickly you navigate, how much energy you use, how hard it is to control the car. By storing speed in a variable, you create a single point of control that you can tune and test systematically.

* :mouse pointer: Find the `||variables:set driveSpeed to||` block you added in Step 1 inside `||loops(noclick):on start||`.
* :keyboard: Change its value from `||drivenByStem:saved drive speed||` to `110`.

~hint Car still slow? 👀

---

If your speed value keeps switching back, something is probably resetting it later. Scan your code stack and make sure there is only one `||variables:set driveSpeed to||` block in `on start`.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
//@highlight
//@validate-exists
let driveSpeed = 110
```

## {3. Make Movement Use driveSpeed}

**Connecting Variables to Behavior**

---

A variable is only useful if your code actually reads it. By wiring your movement system to the `||variables:driveSpeed||` variable, you ensure that changes to that one value immediately affect how the car moves. This is how engineers create centralized control — change one setting, update the whole system.

* :racing car: Find the `||drivenByStem:set base car speed to||` block that already uses `||drivenByStem:saved drive speed||`.
* :mouse pointer: Replace `||drivenByStem:saved drive speed||` with the `||variables:driveSpeed||` variable.

~hint Speed not changing? 🔌

---

If you still see `||drivenByStem:saved drive speed||` in the movement block, the tuning isn't connected yet. Replace it with the `||variables:driveSpeed||` bubble so your change actually takes effect.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
//@highlight
//@validate-exists
drivenByStem.setBaseCarSpeed(driveSpeed)
drivenByStem.setTeamName("Apex Lab")
drivenByStem.setCarName("Velocity")
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
```

## {4. Create the Efficiency Variables}

**Modeling System Costs**

---

In racing, every decision has a cost. Going faster burns more fuel and stresses components. In your simulation, `||variables:efficiencyRating||` represents how much energy the car starts with, and `||variables:efficiencyDrain||` represents how much each mistake costs. Creating both variables lets you model tradeoffs clearly.

* :paper plane: Open `||variables:Variables||`, click **Make a Variable**, and name it `efficiencyRating`.
* :paper plane: Set `||variables:efficiencyRating||` to `||drivenByStem:saved efficiency||`.
* :paper plane: Create `||variables:efficiencyDrain||`, then add `||variables:set efficiencyDrain to 1||` in `||loops(noclick):on start||`.

~hint Can't find your variable? ⌨️

---

If you can't find one of the efficiency variables in a dropdown, it usually means it was created with a different spelling. Double-check the exact variable name.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
drivenByStem.setBaseCarSpeed(driveSpeed)
//@highlight
//@validate-exists
let efficiencyRating = drivenByStem.savedEfficiency()
//@highlight
//@validate-exists
let efficiencyDrain = 1
```

## {5. Add the Tradeoff Rule}

**Programming Decision Logic**

---

This is where your simulation gets smart. A conditional statement lets your code make different choices based on the current situation. In this case, you're programming a realistic tradeoff: higher speed means higher energy cost. This is how engineers encode real-world physics into software systems.

* :paper plane: Open `||logic:Logic||` and add `||logic:if then else||` in `||loops(noclick):on start||` directly below your `||variables:set efficiencyDrain to 1||` block.
* :mouse pointer: In `||logic:Logic||` select the 0 < 0 condition and drag it over the "true" value.
* :mouse pointer: Select the `||variables:driveSpeed||` and drag it to the first 0 in the "if" block.
* :mouse pointer: Change the direction of the operator from < (less than) to > (greater than).
* :keyboard: Enter the value of `100` to replace the `0` value in the first line of the `||logic:if||` block.
* :paper plane: In the `then` branch, add `||variables:set efficiencyRating to||` and `||variables:set efficiencyDrain to 2||`.
* :mouse pointer: Open `||math:Math||`, drag a `||math:0 + 0||` block into `||variables:set efficiencyRating to||`, then change the `+` to `-`.
* :mouse pointer: Put `||drivenByStem:saved efficiency||` in the first math slot and `1` in the second slot so the rule becomes `||drivenByStem:saved efficiency - 1||`.
* :keyboard: In the `||logic:else||` branch, set `||variables:efficiencyRating||` to use `||drivenByStem:saved efficiency||` and `||drivenByStem:efficiencyDrain||` to `1`.

~hint What's a conditional?

---

In programming, a **CONDITIONAL** (or if-else statement) lets your code make decisions and do different things based on whether something is true or false.

The structure is: **IF** (condition is true) **THEN** do this, **ELSE** do that instead.

In this step, you're building a rule: IF speed is high, THEN the car starts with less efficiency and each mistake costs more, ELSE it keeps the stronger baseline.

hint~

~hint Rule not working?

---

If your tradeoff rule never seems to kick in, check that `driveSpeed` is set before the `if` block runs. Order matters when you're building a rule.

hint~

~hint Need the minus block?

---

The subtraction part comes from `||math:Math||`. Drag in the `||math:0 + 0||` block, click the `+`, and switch it to `-`. Then place `||drivenByStem:saved efficiency||` on the left and `1` on the right.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
drivenByStem.setBaseCarSpeed(driveSpeed)
let efficiencyRating = drivenByStem.savedEfficiency()
let efficiencyDrain = 1
//@highlight
//@validate-exists
if (driveSpeed > 100) {
    //@validate-exists
    efficiencyRating = drivenByStem.savedEfficiency() - 1
    efficiencyDrain = 2
} else {
    //@validate-exists
    efficiencyRating = drivenByStem.savedEfficiency()
    efficiencyDrain = 1
}
```

## {6. Preview the Garage Test Bed}

**Testing the Build Without Leaving the Garage**

---

Engineers often use a test stand before a full track run. A garage test bed gives you a safe place to preview the exact values your code is building.

This is also a good moment to notice an important block programming rule: **blocks only run when they are connected to an event or another running stack**. Here, you will remove the repeated garage intro splash so testing stays quick, then preview the speed, efficiency, and drain values together.

* :mouse pointer: Find the `||game:splash||` block in your `||loops(noclick):on start||`.
* :mouse pointer: Drag that splash block away from the `||loops(noclick):on start||` stack so it is no longer connected.
* :racing car: Open `||drivenByStem:Driven by STEM||` in the Toolbox and add `||drivenByStem:preview garage test bed speed efficiency drain||` at the end of `||loops(noclick):on start||`.
* :mouse pointer: Set the block inputs to `||variables:driveSpeed||`, `||variables:efficiencyRating||`, and `||variables:efficiencyDrain||`.
* :game pad: Run the simulator and press the arrow keys on your keyboard or using the joystick control. You may need to select the play button to activate the simulator.
* :right arrow: The left and right arrows make the car slide across the rollers, and the speed gauge should jump up to show what a more active test feels like.
* :up arrow: The up arrow gives the speed gauge a bigger rev, and the down arrow lowers it.
* :binoculars: In this preview, the arrows do not start the full track drive. They only help you test the speed gauge while efficiency and drain stay at your chosen setup.

~hint Preview looks wrong? 🧪

---

If the test bed still feels wrong, check three things. First, make sure the `Miami test session` splash is disconnected from `on start` so it is not interrupting each test. Second, make sure the preview block comes after the `if driveSpeed > 100` rule so it can read the final values. Third, remember that the arrows only affect the garage preview gauge here. The full driving test comes in the next lesson.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
drivenByStem.setBaseCarSpeed(driveSpeed)
let efficiencyRating = drivenByStem.savedEfficiency()
let efficiencyDrain = 1
if (driveSpeed > 100) {
    efficiencyRating = drivenByStem.savedEfficiency() - 1
    efficiencyDrain = 2
} else {
    efficiencyRating = drivenByStem.savedEfficiency()
    efficiencyDrain = 1
}
//@highlight
//@validate-exists
drivenByStem.previewGarageTestBed(driveSpeed, efficiencyRating, efficiencyDrain)
```

## {7. Choose a Role Lens}

**Selecting Your Engineering Perspective**

---

On a real race team, different engineers focus on different things — some watch performance, others track efficiency, some monitor reliability. Choosing a role lens determines how you'll interpret the data you collect. There's no single "right" lens, just different ways of looking at the same system.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :book: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:setRoleLens||` near the top of your `||loops(noclick):on start||`.
* :mouse pointer: Using the drop-down in `||drivenByStem:setRoleLens||`, select a role lens: Performance Engineer, Strategist, Software Engineer, or Data Analyst.
* :id card: Then, add `||drivenByStem:showSavedDriverProfile||` to display your selected profile. 
* :lightbulb: Try changing your `||drivenByStem:setRoleLens||` value to review different information.

~hint Which role should I pick? ✨

---

There isn't one correct role here. Pick the lens that matches what you're watching: speed, efficiency, reliability, or data.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
drivenByStem.setBaseCarSpeed(driveSpeed)
let efficiencyRating = drivenByStem.savedEfficiency()
let efficiencyDrain = 1
if (driveSpeed > 100) {
    efficiencyRating = drivenByStem.savedEfficiency() - 1
    efficiencyDrain = 2
} else {
    efficiencyRating = drivenByStem.savedEfficiency()
    efficiencyDrain = 1
}
//@highlight
drivenByStem.setRoleLens(drivenByStem.RoleLens.PerformanceEngineer)
//@highlight
drivenByStem.showSavedDriverProfile()
```

```ghost
drivenByStem.setRoleLens(drivenByStem.RoleLens.SoftwareEngineer)
drivenByStem.setRoleLens(drivenByStem.RoleLens.PerformanceEngineer)
drivenByStem.setRoleLens(drivenByStem.RoleLens.Strategist)
drivenByStem.setRoleLens(drivenByStem.RoleLens.DataAnalyst)
```

## {8. Save the Setup Focus}

**Recording Your Configuration Choice**

---

Engineering isn't just about making good decisions in the moment — it's about documenting those decisions so you can learn from them later. Saving your setup focus means future stages of your simulation will remember whether you prioritized speed or balance. This is how professional teams track setup changes across test sessions.

* :mouse pointer: In `||drivenByStem:Driven by STEM||`, add `||drivenByStem:saveTeamSetup||` inside the same `||logic:if driveSpeed > 100||` block you built in Step 5.
* :mouse pointer: In the drop-down, set the focus to `||Pace||`.
* :mouse pointer: For `||drivenByStem:saveTeamSetup:savedDriveSpeed||` add the `||variables:driveSpeed||` variable you created.
* :mouse pointer: For `||drivenByStem.saveTeamSetup.efficiency|` add the `||variables:efficiencyRating||` variable you created.
* :mouse pointer: For `||drivenByStem.saveTeamSetup.efficiencyCost|` add the `||variables:efficiencyDrain||` variable you created.
* :mouse pointer: Right-click on the `||drivenByStem:saveTeamSetup||` block you created. Select Duplicate.
* :mouse pointer: Drag the duplicataed block inside the `||logic:else||` branch.
* :mouse pointer: In the `||logic:else||` branch set the focus to `||Balance||`.
* :game pad: Add a `splash` in each branch of that same `||logic:if||` block that explains the tradeoff choice. Use the lightbulb hint below for suggestions.

~hint Setup not saving? ⏱️

---

If later gates don't seem to remember your setup, check when you save. Make sure it happens after your speed and efficiency choices are finalized.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
drivenByStem.setBaseCarSpeed(driveSpeed)
let efficiencyRating = drivenByStem.savedEfficiency()
let efficiencyDrain = 1
if (driveSpeed > 100) {
    efficiencyRating = drivenByStem.savedEfficiency() - 1
    efficiencyDrain = 2
    //@validate-exists
    drivenByStem.saveTeamSetup(driveSpeed, efficiencyRating, efficiencyDrain, drivenByStem.SetupFocus.Pace)
    //@validate-exists
    game.splash("Pace setup", "You chose raw pace. Monitor energy use.")
} else {
    efficiencyRating = drivenByStem.savedEfficiency()
    efficiencyDrain = 1
    //@validate-exists
    drivenByStem.saveTeamSetup(driveSpeed, efficiencyRating, efficiencyDrain, drivenByStem.SetupFocus.Balance)
    game.splash("Balance setup", "You chose a more efficient setup.")
}
drivenByStem.setRoleLens(drivenByStem.RoleLens.PerformanceEngineer)
drivenByStem.showSavedDriverProfile()
```

```ghost
drivenByStem.saveTeamSetup(driveSpeed, efficiencyRating, efficiencyDrain, drivenByStem.SetupFocus.Pace)
drivenByStem.saveTeamSetup(driveSpeed, efficiencyRating, efficiencyDrain, drivenByStem.SetupFocus.Balance)
```

## Nice work!
![Riley - Performance Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/riley.png)

You tuned your car's speed setting, made a prediction before testing, built a conditional rule that captures a core engineering truth, and previewed the result on a garage test bed before a full shakedown. You also saved both the setup speed and the starting efficiency that later track and review steps will reuse.

You built a real engineering tradeoff! In physics, increasing speed can put more demand on the system. In computer science, variables and conditionals help one program respond to different design choices.
