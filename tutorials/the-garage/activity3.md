# Garage Shakedown

### @diffs true

```package
settings-blocks=github:microsoft/pxt-settings-blocks#v1.0.0
```

```customts
namespace SpriteKind {
    export const DrivenByStemUi = SpriteKind.create()
    export const TestTrackObstacle = SpriteKind.create()
}

/**
 * Custom blocks for the Driven by STEM skillmap.
 */
//% color=#b40707 weight=100 icon="\uf1b9" block="Driven by STEM" groups='["Session", "Profile", "Setup", "Telemetry", "Review"]'
namespace drivenByStem {
    const RESULT_FRAME_WIDTH = 152
    const RESULT_FRAME_HEIGHT = 112
    const RESULT_FRAME_BORDER = 6
    const RESULT_FRAME_TILE = 6
    const LITERS_PER_GALLON = 3.78541
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
    const PREVIOUS_SCORE_KEY = "previousResultScore"
    const LAST_EFFICIENCY_KEY = "lastResultEfficiency"
    const PREVIOUS_EFFICIENCY_KEY = "previousResultEfficiency"
    const LAST_TIME_KEY = "lastResultTime"
    const PREVIOUS_TIME_KEY = "previousResultTime"
    const LAST_TOP_SPEED_KEY = "lastResultTopSpeed"
    const PREVIOUS_TOP_SPEED_KEY = "previousResultTopSpeed"
    const LAST_REACTION_KEY = "lastResultReaction"
    const PREVIOUS_REACTION_KEY = "previousResultReaction"
    const LAST_SPEED_UNIT_KEY = "lastResultSpeedUnit"
    const PREVIOUS_SPEED_UNIT_KEY = "previousResultSpeedUnit"
    const LAST_HITS_KEY = "lastResultHits"
    const PREVIOUS_HITS_KEY = "previousResultHits"
    const LAST_STRATEGY_KEY = "lastResultStrategy"
    const NEXT_FOCUS_KEY = "nextTestFocus"
    const TEAM_NAME_KEY = "teamName"
    const CAR_NAME_KEY = "carName"
    const ROLE_LENS_KEY = "roleLens"
    const SPEED_UNIT_KEY = "speedDisplayUnit"
    const FUEL_UNIT_KEY = "fuelDisplayUnit"
    let resultsFrameImage: Image

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

    function sanitizeFuelValue(value: number): number {
        return Math.max(0, Math.min(value, 100))
    }

    function convertFuelValue(baseFuel: number, unit: string): number {
        if (unit == "L") {
            return baseFuel * LITERS_PER_GALLON
        }

        return baseFuel
    }

    function roundToTenth(value: number): number {
        return Math.round(value * 10) / 10
    }

    function checkerboardFrame(): Image {
        if (resultsFrameImage) {
            return resultsFrameImage
        }

        const frame = image.create(RESULT_FRAME_WIDTH, RESULT_FRAME_HEIGHT)
        for (let x = 0; x < RESULT_FRAME_WIDTH; x++) {
            for (let y = 0; y < RESULT_FRAME_HEIGHT; y++) {
                const borderPixel = x < RESULT_FRAME_BORDER
                    || x >= RESULT_FRAME_WIDTH - RESULT_FRAME_BORDER
                    || y < RESULT_FRAME_BORDER
                    || y >= RESULT_FRAME_HEIGHT - RESULT_FRAME_BORDER

                if (borderPixel) {
                    const tileX = (x / RESULT_FRAME_TILE) | 0
                    const tileY = (y / RESULT_FRAME_TILE) | 0
                    frame.setPixel(x, y, (tileX + tileY) & 1 ? 1 : 15)
                }
            }
        }

        resultsFrameImage = frame
        return resultsFrameImage
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

    function readNumberSetting(name: string, fallback: number): number {
        const value = settings.readNumber(name)
        return value == undefined ? fallback : value
    }

    function readStringSetting(name: string, fallback: string): string {
        const value = settings.readString(name)
        return value == undefined ? fallback : value
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
        ensureNumberSetting(PREVIOUS_SCORE_KEY, 0)
        ensureNumberSetting(LAST_EFFICIENCY_KEY, defaultEfficiency)
        ensureNumberSetting(PREVIOUS_EFFICIENCY_KEY, defaultEfficiency)
        ensureNumberSetting(LAST_TIME_KEY, 0)
        ensureNumberSetting(PREVIOUS_TIME_KEY, 0)
        ensureNumberSetting(LAST_TOP_SPEED_KEY, 0)
        ensureNumberSetting(PREVIOUS_TOP_SPEED_KEY, 0)
        ensureNumberSetting(LAST_REACTION_KEY, -1)
        ensureNumberSetting(PREVIOUS_REACTION_KEY, -1)
        ensureStringSetting(LAST_SPEED_UNIT_KEY, "mph")
        ensureStringSetting(PREVIOUS_SPEED_UNIT_KEY, "mph")
        ensureNumberSetting(LAST_HITS_KEY, 0)
        ensureNumberSetting(PREVIOUS_HITS_KEY, 0)
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

    //% block="speed display unit"
    //% blockId=raceday_speed_display_unit
    //% group="Session" weight=57
    export function speedDisplayUnit(): string {
        return readStringSetting(SPEED_UNIT_KEY, "mph")
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

    //% block="fuel display unit"
    //% blockId=raceday_fuel_display_unit
    //% group="Session" weight=56
    export function fuelDisplayUnit(): string {
        return readStringSetting(FUEL_UNIT_KEY, "gal")
    }

    //% blockHidden=true
    export function formatFuelAmount(baseFuel: number): string {
        const unit = fuelDisplayUnit()
        return roundToTenth(convertFuelValue(sanitizeFuelValue(baseFuel), unit)) + " " + unit
    }

    //% blockHidden=true
    export function showResultsDialog(message: string): void {
        const frame = sprites.create(checkerboardFrame(), SpriteKind.DrivenByStemUi)
        frame.setFlag(SpriteFlag.RelativeToCamera, true)
        frame.setPosition(80, 60)
        frame.z = scene.HUD_Z - 3
        game.showLongText(message, DialogLayout.Full)
        frame.destroy()
    }

    /**
     * Start the optional pseudo-3D test track using the saved setup values.
     */
    //% block="start vehicle test track"
    //% blockId=raceday_start_vehicle_test_track
    //% group="Session" weight=55
    export function startVehicleTestTrack(): void {
        loadRaceProfile(80, 5)
        drivenByStemTutorialTrack.startVehicleTestTrack()
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
        return readNumberSetting(DRIVE_SPEED_KEY, 80)
    }

    /**
     * Read the saved efficiency value.
     */
    //% block="saved efficiency"
    //% blockId=raceday_saved_efficiency
    //% group="Setup" weight=80
    export function savedEfficiency(): number {
        return readNumberSetting(EFFICIENCY_KEY, 5)
    }

    /**
     * Read the saved efficiency cost.
     */
    //% block="saved efficiency cost"
    //% blockId=raceday_saved_efficiency_cost
    //% group="Setup" weight=75
    export function savedEfficiencyCost(): number {
        return readNumberSetting(DRAIN_KEY, 1)
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
        settings.writeNumber(STRATEGY_KEY, readNumberSetting(STRATEGY_KEY, 0) + amount)
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
        settings.writeNumber(LAST_TIME_KEY, 0)
        settings.writeNumber(LAST_TOP_SPEED_KEY, 0)
        settings.writeNumber(LAST_REACTION_KEY, -1)
        settings.writeString(LAST_SPEED_UNIT_KEY, readStringSetting(SPEED_UNIT_KEY, "mph"))
        settings.writeNumber(LAST_HITS_KEY, 0)
        settings.writeNumber(LAST_STRATEGY_KEY, readNumberSetting(STRATEGY_KEY, 0))
        settings.writeNumber(EFFICIENCY_KEY, info.life())
    }

    //% blockHidden=true
    export function saveSupportRunResults(performanceResult: number, efficiencyRemaining: number, elapsedSeconds: number, reactionSeconds: number, topSpeed: number, speedUnit: string, hitCount: number): void {
        if (readNumberSetting(LAST_TIME_KEY, 0) > 0) {
            settings.writeNumber(PREVIOUS_SCORE_KEY, readNumberSetting(LAST_SCORE_KEY, 0))
            settings.writeNumber(PREVIOUS_EFFICIENCY_KEY, sanitizeFuelValue(readNumberSetting(LAST_EFFICIENCY_KEY, 0)))
            settings.writeNumber(PREVIOUS_TIME_KEY, readNumberSetting(LAST_TIME_KEY, 0))
            settings.writeNumber(PREVIOUS_TOP_SPEED_KEY, readNumberSetting(LAST_TOP_SPEED_KEY, 0))
            settings.writeNumber(PREVIOUS_REACTION_KEY, readNumberSetting(LAST_REACTION_KEY, -1))
            settings.writeString(PREVIOUS_SPEED_UNIT_KEY, readStringSetting(LAST_SPEED_UNIT_KEY, "mph"))
            settings.writeNumber(PREVIOUS_HITS_KEY, readNumberSetting(LAST_HITS_KEY, 0))
        }

        settings.writeNumber(LAST_SCORE_KEY, performanceResult)
        settings.writeNumber(LAST_EFFICIENCY_KEY, sanitizeFuelValue(efficiencyRemaining))
        settings.writeNumber(LAST_TIME_KEY, elapsedSeconds)
        settings.writeNumber(LAST_TOP_SPEED_KEY, topSpeed)
        settings.writeNumber(LAST_REACTION_KEY, reactionSeconds)
        settings.writeString(LAST_SPEED_UNIT_KEY, speedUnit)
        settings.writeNumber(LAST_HITS_KEY, hitCount)
        settings.writeNumber(LAST_STRATEGY_KEY, readNumberSetting(STRATEGY_KEY, 0))
    }

    /**
     * Read the last performance result.
     */
    //% block="last performance result"
    //% blockId=raceday_last_performance
    //% group="Review" weight=90
    export function lastPerformanceResult(): number {
        return readNumberSetting(LAST_SCORE_KEY, 0)
    }

    /**
     * Read the last efficiency result.
     */
    //% block="last efficiency result"
    //% blockId=raceday_last_efficiency
    //% group="Review" weight=80
    export function lastEfficiencyResult(): number {
        return sanitizeFuelValue(readNumberSetting(LAST_EFFICIENCY_KEY, 0))
    }

    /**
     * Read the last strategy result.
     */
    //% block="last strategy result"
    //% blockId=raceday_last_strategy
    //% group="Review" weight=70
    export function lastStrategyResult(): number {
        return readNumberSetting(LAST_STRATEGY_KEY, 0)
    }

    //% block="has saved test comparison"
    //% blockId=raceday_has_saved_test_comparison
    //% group="Review" weight=61
    export function hasSavedTestComparison(): boolean {
        return readNumberSetting(PREVIOUS_TIME_KEY, 0) > 0
    }

    //% block="show saved test comparison"
    //% blockId=raceday_show_saved_test_comparison
    //% group="Review" weight=60
    export function showSavedTestComparison(): void {
        if (!(hasSavedTestComparison())) {
            game.splash("No comparison yet", "Run the test track twice to compare results.")
            return
        }

        showResultsDialog(buildSavedTestComparison())
    }

    function buildSavedTestComparison(): string {
        const previousTime = readNumberSetting(PREVIOUS_TIME_KEY, 0)
        const currentTime = readNumberSetting(LAST_TIME_KEY, 0)
        const previousTopSpeed = readNumberSetting(PREVIOUS_TOP_SPEED_KEY, 0)
        const currentTopSpeed = readNumberSetting(LAST_TOP_SPEED_KEY, 0)
        const previousSpeedUnit = readStringSetting(PREVIOUS_SPEED_UNIT_KEY, "mph")
        const currentSpeedUnit = readStringSetting(LAST_SPEED_UNIT_KEY, "mph")
        const previousReaction = readNumberSetting(PREVIOUS_REACTION_KEY, -1)
        const currentReaction = readNumberSetting(LAST_REACTION_KEY, -1)
        const previousFuel = sanitizeFuelValue(readNumberSetting(PREVIOUS_EFFICIENCY_KEY, 0))
        const currentFuel = sanitizeFuelValue(readNumberSetting(LAST_EFFICIENCY_KEY, 0))
        const previousHits = readNumberSetting(PREVIOUS_HITS_KEY, 0)
        const currentHits = readNumberSetting(LAST_HITS_KEY, 0)
        const previousScore = readNumberSetting(PREVIOUS_SCORE_KEY, 0)
        const currentScore = readNumberSetting(LAST_SCORE_KEY, 0)

        return "Test comparison"
            + "\nPace: " + lowerIsBetterCue(previousTime, currentTime, "this run faster", "last run faster", "same pace")
            + "\nReaction: " + reactionCue(previousReaction, currentReaction)
            + "\nFuel: " + higherIsBetterCue(previousFuel, currentFuel, "this run used less fuel", "last run used less fuel", "same fuel use")
            + "\nHits: " + lowerIsBetterCue(previousHits, currentHits, "this run had fewer hits", "last run had fewer hits", "same hits")
            + "\nScore: " + higherIsBetterCue(previousScore, currentScore, "this run scored higher", "last run scored higher", "same score")
            + "\nTop speed: " + topSpeedCue(previousTopSpeed, currentTopSpeed, previousSpeedUnit, currentSpeedUnit)
            + "\nThis time: " + currentTime + " s"
            + "\nLast time: " + previousTime + " s"
            + "\nThis reaction: " + formatReactionValue(currentReaction)
            + "\nLast reaction: " + formatReactionValue(previousReaction)
            + "\nThis fuel left: " + formatFuelAmount(currentFuel)
            + "\nLast fuel left: " + formatFuelAmount(previousFuel)
            + "\nThis hits: " + currentHits
            + "\nLast hits: " + previousHits
            + "\nThis top: " + currentTopSpeed + " " + currentSpeedUnit
            + "\nLast top: " + previousTopSpeed + " " + previousSpeedUnit
            + "\nThis score: " + currentScore
            + "\nLast score: " + previousScore
    }

    function lowerIsBetterCue(previousValue: number, currentValue: number, currentWins: string, previousWins: string, tie: string): string {
        if (currentValue < previousValue) {
            return currentWins
        }

        if (currentValue > previousValue) {
            return previousWins
        }

        return tie
    }

    function higherIsBetterCue(previousValue: number, currentValue: number, currentWins: string, previousWins: string, tie: string): string {
        if (currentValue > previousValue) {
            return currentWins
        }

        if (currentValue < previousValue) {
            return previousWins
        }

        return tie
    }

    function topSpeedCue(previousValue: number, currentValue: number, previousUnit: string, currentUnit: string): string {
        if (previousUnit != currentUnit) {
            return "units changed"
        }

        return higherIsBetterCue(previousValue, currentValue, "this run reached a higher top speed", "last run reached a higher top speed", "same top speed")
    }

    function reactionCue(previousValue: number, currentValue: number): string {
        if (previousValue < 0 && currentValue < 0) {
            return "no input in either run"
        }

        if (currentValue < 0) {
            return "this run never reacted"
        }

        if (previousValue < 0) {
            return "this run captured the first reaction"
        }

        return lowerIsBetterCue(previousValue, currentValue, "this run reacted sooner", "last run reacted sooner", "same reaction time")
    }

    function formatReactionValue(reactionSeconds: number): string {
        if (reactionSeconds < 0) {
            return "no input"
        }

        return reactionSeconds + " s"
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
        return readStringSetting(NEXT_FOCUS_KEY, "Review the data and test again.")
    }
}

namespace drivenByStemTutorialTrack {
    const TRACK_WIDTH = 160
    const TRACK_HEIGHT = 120
    const HUD_HEIGHT = 22
    const ROAD_LEFT = 42
    const ROAD_WIDTH = 76
    const ROAD_RIGHT = ROAD_LEFT + ROAD_WIDTH
    const ROAD_CENTER = ROAD_LEFT + (ROAD_WIDTH >> 1)
    const BORDER_WIDTH = 8
    const CAR_Y = 100
    const RUN_DURATION_MILLISECONDS = 20000
    const START_LIGHT_COUNT = 5
    const STAGE_LIGHT_STEP_MILLISECONDS = 450
    const STAGE_LIGHT_HOLD_MILLISECONDS = 500
    const GO_FLASH_MILLISECONDS = 700
    const FALSE_START_PENALTY_MILLISECONDS = 5000
    const MAX_OBSTACLES = 5
    const OBSTACLE_MIN_SPACING = 95
    const OBSTACLE_MAX_SPACING = 150
    const MAX_SPEED = 180
    const MIN_SPEED = 60
    const ACCELERATION = 95
    const BRAKE_DECELERATION = 140
    const COAST_DECELERATION = 55
    const STEER_DRAG = 15
    const OFFROAD_DRAG = 110
    const FUEL_BASE_DRAIN = 0.45
    const FUEL_SPEED_DRAIN_DIVISOR = 160
    const FUEL_OFFROAD_DRAIN = 0.5
    const COLLISION_SPEED_LOSS = 35
    const SCORE_DIVISOR = 10
    const MPH_FACTOR = 0.621371
    const STRIPE_SEGMENT_HEIGHT = 7

    const coneImage = img`
        . . . 4 4 . . .
        . . 4 4 4 4 . .
        . 4 4 4 4 4 4 .
        4 4 4 4 4 4 4 4
        1 1 4 4 4 4 1 1
        . 1 1 1 1 1 1 .
        . . 1 1 1 1 . .
        . . . 1 1 . . .
    `

    let hooksInstalled = false
    let activeTrack: TutorialTrackState

    class TutorialTrackState {
        car: Sprite
        speed: number
        maxDriveSpeed: number
        fuelRemaining: number
        fuelMax: number
        fuelDrainBase: number
        elapsedMilliseconds: number
        starterElapsedMilliseconds: number
        starterLightsAnnounced: number
        goFlashMilliseconds: number
        topSpeed: number
        reactionMilliseconds: number
        collisionCount: number
        distance: number
        nextObstacleDistance: number
        displayUnit: string
        obstacles: Sprite[]
        active: boolean
        raceStarted: boolean
        falseStartLocked: boolean

        constructor(car: Sprite, maxDriveSpeed: number, fuelMax: number, fuelDrainBase: number, displayUnit: string) {
            this.car = car
            this.speed = 0
            this.maxDriveSpeed = maxDriveSpeed
            this.fuelRemaining = fuelMax
            this.fuelMax = fuelMax
            this.fuelDrainBase = fuelDrainBase
            this.elapsedMilliseconds = 0
            this.starterElapsedMilliseconds = 0
            this.starterLightsAnnounced = 0
            this.goFlashMilliseconds = 0
            this.topSpeed = 0
            this.reactionMilliseconds = -1
            this.collisionCount = 0
            this.distance = 0
            this.nextObstacleDistance = randint(OBSTACLE_MIN_SPACING, OBSTACLE_MAX_SPACING)
            this.displayUnit = displayUnit
            this.obstacles = []
            this.active = true
            this.raceStarted = false
            this.falseStartLocked = false
        }
    }

    export function startVehicleTestTrack(): void {
        ensureHooksInstalled()
        resetTrack()

        const playerCar = ensurePlayerCar()
        const maxDriveSpeed = clampToRange(drivenByStem.savedDriveSpeed() * 2, MIN_SPEED, MAX_SPEED)
        const fuelMax = clampToRange(drivenByStem.savedEfficiency() * 10, 30, 100)
        const fuelDrainBase = FUEL_BASE_DRAIN * Math.max(1, drivenByStem.savedEfficiencyCost())
        const displayUnit = drivenByStem.speedDisplayUnit()

        controller.moveSprite(playerCar, 0, 0)
        playerCar.setFlag(SpriteFlag.StayInScreen, true)
        playerCar.setFlag(SpriteFlag.Invisible, false)
        playerCar.setPosition(ROAD_CENTER, CAR_Y)
        playerCar.z = 6

        scene.setBackgroundImage(image.create(TRACK_WIDTH, TRACK_HEIGHT))
        drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)

        activeTrack = new TutorialTrackState(playerCar, maxDriveSpeed, fuelMax, fuelDrainBase, displayUnit)
        playEngineRev()
    }

    function ensureHooksInstalled(): void {
        if (hooksInstalled) {
            return
        }

        hooksInstalled = true

        sprites.onOverlap(SpriteKind.Player, SpriteKind.TestTrackObstacle, function (sprite, otherSprite) {
            if (!trackIsActive() || sprite != activeTrack.car) {
                return
            }

            removeObstacle(otherSprite)
            otherSprite.destroy(effects.disintegrate, 150)
            activeTrack.collisionCount += 1
            activeTrack.speed = Math.max(0, activeTrack.speed - COLLISION_SPEED_LOSS)
            scene.cameraShake(2, 100)
        })

        game.onUpdate(function () {
            updateTrack()
        })

        game.onPaint(function () {
            if (!trackIsActive()) {
                return
            }

            drawTrackFrame()
        })
    }

    function ensurePlayerCar(): Sprite {
        let playerCar = sprites.allOfKind(SpriteKind.Player)[0]
        if (playerCar) {
            return playerCar
        }

        const savedCar = assets.image`playerCar`
        playerCar = sprites.create(savedCar ? savedCar.clone() : defaultPlayerCarImage(), SpriteKind.Player)
        return playerCar
    }

    function updateTrack(): void {
        if (!trackIsActive()) {
            return
        }

        const deltaTime = game.eventContext().deltaTime

        if (!activeTrack.raceStarted) {
            activeTrack.car.x = ROAD_CENTER
            activeTrack.car.y = CAR_Y
            activeTrack.speed = 0

            if (launchInputPressed()) {
                triggerFalseStart()
                return
            }

            activeTrack.starterElapsedMilliseconds += deltaTime * 1000
            const lightsOn = Math.min(START_LIGHT_COUNT, integerDivide(activeTrack.starterElapsedMilliseconds, STAGE_LIGHT_STEP_MILLISECONDS))
            if (lightsOn > activeTrack.starterLightsAnnounced) {
                activeTrack.starterLightsAnnounced = lightsOn
                playStarterBeep()
            }

            if (activeTrack.starterElapsedMilliseconds >= starterDurationMilliseconds()) {
                activeTrack.raceStarted = true
                activeTrack.goFlashMilliseconds = GO_FLASH_MILLISECONDS
                playGoTone()
            }
            return
        }

        const steeringLeft = controller.left.isPressed()
        const steeringRight = controller.right.isPressed()
        const accelerating = controller.up.isPressed() && !controller.down.isPressed()
        const braking = controller.down.isPressed() && !controller.up.isPressed()

        if (activeTrack.reactionMilliseconds < 0 && (steeringLeft || steeringRight || accelerating || braking)) {
            activeTrack.reactionMilliseconds = activeTrack.elapsedMilliseconds
        }

        if (steeringLeft) {
            activeTrack.car.x -= 70 * deltaTime
        }
        if (steeringRight) {
            activeTrack.car.x += 70 * deltaTime
        }
        activeTrack.car.x = clampToRange(activeTrack.car.x, ROAD_LEFT + 6, ROAD_RIGHT - 6)
        activeTrack.car.y = CAR_Y

        let speedChange = 0
        if (accelerating) {
            speedChange += ACCELERATION * deltaTime
        } else if (braking) {
            speedChange -= BRAKE_DECELERATION * deltaTime
        } else {
            speedChange -= COAST_DECELERATION * deltaTime
        }

        if (steeringLeft || steeringRight) {
            speedChange -= STEER_DRAG * deltaTime
        }

        const offRoad = activeTrack.car.x <= ROAD_LEFT + 8 || activeTrack.car.x >= ROAD_RIGHT - 8
        if (offRoad) {
            speedChange -= OFFROAD_DRAG * deltaTime
        }

        activeTrack.speed = clampToRange(activeTrack.speed + speedChange, 0, activeTrack.maxDriveSpeed)
        activeTrack.elapsedMilliseconds += deltaTime * 1000
        activeTrack.distance += activeTrack.speed * deltaTime
        activeTrack.topSpeed = Math.max(activeTrack.topSpeed, activeTrack.speed)
        activeTrack.goFlashMilliseconds = Math.max(0, activeTrack.goFlashMilliseconds - deltaTime * 1000)

        updateFuel(deltaTime, offRoad)
        updateObstacles(deltaTime)

        if (activeTrack.fuelRemaining <= 0 || activeTrack.elapsedMilliseconds >= RUN_DURATION_MILLISECONDS) {
            finishTrack(activeTrack.elapsedMilliseconds >= RUN_DURATION_MILLISECONDS)
        }
    }

    function updateFuel(deltaTime: number, offRoad: boolean): void {
        const fuelDrain = activeTrack.fuelDrainBase + activeTrack.speed / FUEL_SPEED_DRAIN_DIVISOR + (offRoad ? FUEL_OFFROAD_DRAIN : 0)
        activeTrack.fuelRemaining = Math.max(0, activeTrack.fuelRemaining - fuelDrain * deltaTime)
    }

    function updateObstacles(deltaTime: number): void {
        if (activeTrack.speed > 0 && activeTrack.distance >= activeTrack.nextObstacleDistance && activeTrack.obstacles.length < MAX_OBSTACLES) {
            spawnObstacle()
            activeTrack.nextObstacleDistance = activeTrack.distance + randint(OBSTACLE_MIN_SPACING, OBSTACLE_MAX_SPACING)
        }

        const obstacleStep = activeTrack.speed * 0.12 * deltaTime
        for (let obstacle of activeTrack.obstacles) {
            obstacle.y += obstacleStep
            if (obstacle.y > TRACK_HEIGHT + 10) {
                obstacle.destroy()
                removeObstacle(obstacle)
            }
        }
    }

    function spawnObstacle(): void {
        const obstacle = sprites.create(coneImage, SpriteKind.TestTrackObstacle)
        obstacle.setPosition(randint(ROAD_LEFT + 12, ROAD_RIGHT - 12), HUD_HEIGHT + 2)
        obstacle.z = 4
        activeTrack.obstacles.push(obstacle)
    }

    function drawTrackFrame(): void {
        const canvas = scene.backgroundImage()
        if (!canvas) {
            return
        }

        canvas.fill(7)
        canvas.fillRect(0, 0, TRACK_WIDTH, HUD_HEIGHT, 12)
        canvas.fillRect(0, HUD_HEIGHT - 1, TRACK_WIDTH, 1, 15)
        canvas.fillRect(0, HUD_HEIGHT, TRACK_WIDTH, TRACK_HEIGHT - HUD_HEIGHT, 7)
        drawRoadBorder(canvas, ROAD_LEFT - BORDER_WIDTH, HUD_HEIGHT, BORDER_WIDTH, TRACK_HEIGHT - HUD_HEIGHT, 0 - integerDivide(activeTrack.distance, 4))
        canvas.fillRect(ROAD_LEFT, HUD_HEIGHT, ROAD_WIDTH, TRACK_HEIGHT - HUD_HEIGHT, 11)
        drawRoadBorder(canvas, ROAD_RIGHT, HUD_HEIGHT, BORDER_WIDTH, TRACK_HEIGHT - HUD_HEIGHT, 1 - integerDivide(activeTrack.distance, 4))

        const stripeOffset = integerDivide(activeTrack.distance, 10) % 18
        for (let y = HUD_HEIGHT - 10 + stripeOffset; y < TRACK_HEIGHT; y += 18) {
            canvas.fillRect(ROAD_CENTER - 2, y, 4, 9, 1)
        }

        canvas.print("FUEL " + drivenByStem.formatFuelAmount(activeTrack.fuelRemaining), 5, 6, 1, image.font8)
        drawRightAlignedHudText(canvas, formatSpeed(activeTrack.speed, activeTrack.displayUnit), 6)

        if (!activeTrack.raceStarted) {
            drawStartLights(canvas)
        }
    }

    function drawStartLights(canvas: Image): void {
        const overlayX = 34
        const overlayY = 30
        const lightsOn = Math.min(START_LIGHT_COUNT, integerDivide(activeTrack.starterElapsedMilliseconds, STAGE_LIGHT_STEP_MILLISECONDS))
        const launched = activeTrack.raceStarted && activeTrack.goFlashMilliseconds > 0

        canvas.fillRect(overlayX, overlayY, 92, 20, 15)
        canvas.fillRect(overlayX + 2, overlayY + 2, 88, 16, 12)
        for (let i = 0; i < START_LIGHT_COUNT; i++) {
            const lightX = overlayX + 8 + i * 16
            const lightColor = i < lightsOn ? (launched ? 7 : 2) : 1
            canvas.fillRect(lightX - 1, overlayY + 4, 10, 10, 15)
            canvas.fillRect(lightX, overlayY + 5, 8, 8, lightColor)
        }

        if (launched) {
            canvas.print("GO!", overlayX + 34, overlayY + 12, 7, image.font8)
        } else {
            canvas.print("Ready", overlayX + 26, overlayY + 12, 1, image.font8)
        }
    }

    function drawRoadBorder(canvas: Image, x: number, y: number, width: number, height: number, offsetSeed: number): void {
        for (let row = 0; row < height; row += STRIPE_SEGMENT_HEIGHT) {
            const colorIndex = integerDivide(row + offsetSeed, STRIPE_SEGMENT_HEIGHT) % 3
            const stripeColor = colorIndex == 0 ? 5 : colorIndex == 1 ? 1 : 15
            const segmentHeight = Math.min(STRIPE_SEGMENT_HEIGHT, height - row)
            canvas.fillRect(x, y + row, width, segmentHeight, stripeColor)
        }
    }

    function finishTrack(completedRun: boolean): void {
        if (!trackIsActive()) {
            return
        }

        const performanceResult = Math.max(0, integerDivide(activeTrack.distance, SCORE_DIVISOR))
        if (completedRun && activeTrack.collisionCount <= 1) {
            drivenByStem.awardStrategyPoints(1)
        }

        drivenByStem.saveSupportRunResults(
            performanceResult,
            roundToTenth(activeTrack.fuelRemaining),
            roundToTenth(activeTrack.elapsedMilliseconds / 1000),
            reactionSeconds(activeTrack.reactionMilliseconds),
            roundToTenth(convertSpeedValue(activeTrack.topSpeed, activeTrack.displayUnit)),
            activeTrack.displayUnit,
            activeTrack.collisionCount
        )

        const summary = buildRunSummary(completedRun)
        resetTrack()
        drivenByStem.showResultsDialog(summary)
        if (drivenByStem.hasSavedTestComparison()) {
            drivenByStem.showSavedTestComparison()
        }
    }

    function buildRunSummary(completedRun: boolean): string {
        const elapsedSeconds = roundToTenth(activeTrack.elapsedMilliseconds / 1000)
        const fuelBurned = Math.max(0, roundToTenth(activeTrack.fuelMax - activeTrack.fuelRemaining))
        const averageSpeed = elapsedSeconds > 0 ? activeTrack.distance / elapsedSeconds : 0

        return (completedRun ? "Shakedown complete" : "Shakedown report")
            + "\nTime: " + elapsedSeconds + " s"
            + "\nReaction: " + reactionSummary(activeTrack.reactionMilliseconds)
            + "\nTop speed: " + formatSpeed(activeTrack.topSpeed, activeTrack.displayUnit)
            + "\nAvg speed: " + formatSpeed(averageSpeed, activeTrack.displayUnit)
            + "\nFuel used: " + drivenByStem.formatFuelAmount(fuelBurned)
            + "\nHits: " + activeTrack.collisionCount
    }

    function trackIsActive(): boolean {
        return !!activeTrack && activeTrack.active
    }

    function resetTrack(): void {
        if (!activeTrack) {
            return
        }

        activeTrack.active = false
        for (let obstacle of activeTrack.obstacles) {
            obstacle.destroy()
        }
        activeTrack.obstacles = []

        for (let obstacle of sprites.allOfKind(SpriteKind.TestTrackObstacle)) {
            obstacle.destroy()
        }

        activeTrack.car.setFlag(SpriteFlag.Invisible, false)
        activeTrack.car.setPosition(ROAD_CENTER, CAR_Y)
    }

    function removeObstacle(target: Sprite): void {
        if (!activeTrack) {
            return
        }

        const obstacleIndex = activeTrack.obstacles.indexOf(target)
        if (obstacleIndex >= 0) {
            activeTrack.obstacles.removeAt(obstacleIndex)
        }
    }

    function drawRightAlignedHudText(canvas: Image, text: string, y: number): void {
        const font = image.font8
        const x = TRACK_WIDTH - 6 - text.length * font.charWidth
        canvas.print(text, x, y, 1, font)
    }

    function formatSpeed(baseSpeed: number, unit: string): string {
        return roundToTenth(convertSpeedValue(baseSpeed, unit)) + " " + unit
    }

    function starterDurationMilliseconds(): number {
        return START_LIGHT_COUNT * STAGE_LIGHT_STEP_MILLISECONDS + STAGE_LIGHT_HOLD_MILLISECONDS
    }

    function playStarterBeep(): void {
        control.runInParallel(function () {
            music.playTone(659, 80)
        })
    }

    function playGoTone(): void {
        control.runInParallel(function () {
            music.playTone(988, 180)
        })
    }

    function playEngineRev(): void {
        control.runInParallel(function () {
            music.playTone(196, 70)
            music.playTone(262, 70)
            music.playTone(330, 80)
            music.playTone(392, 120)
        })
    }

    function launchInputPressed(): boolean {
        return controller.up.isPressed()
            || controller.down.isPressed()
            || controller.left.isPressed()
            || controller.right.isPressed()
    }

    function triggerFalseStart(): void {
        if (!trackIsActive() || activeTrack.falseStartLocked || activeTrack.raceStarted) {
            return
        }

        activeTrack.falseStartLocked = true
        scene.cameraShake(2, 200)
        game.splash("False start", "+5.0 s penalty")
        activeTrack.falseStartLocked = false
        activeTrack.elapsedMilliseconds += FALSE_START_PENALTY_MILLISECONDS
        activeTrack.starterElapsedMilliseconds = 0
        activeTrack.starterLightsAnnounced = 0
        activeTrack.goFlashMilliseconds = 0
    }

    function convertSpeedValue(baseSpeed: number, unit: string): number {
        if (unit == "mph") {
            return baseSpeed * MPH_FACTOR
        }

        return baseSpeed
    }

    function reactionSeconds(reactionMilliseconds: number): number {
        if (reactionMilliseconds < 0) {
            return -1
        }

        return roundToTenth(reactionMilliseconds / 1000)
    }

    function reactionSummary(reactionMilliseconds: number): string {
        if (reactionMilliseconds < 0) {
            return "No launch input"
        }

        return roundToTenth(reactionMilliseconds / 1000) + " s"
    }

    function roundToTenth(value: number): number {
        return Math.round(value * 10) / 10
    }

    function clampToRange(value: number, minValue: number, maxValue: number): number {
        return Math.max(minValue, Math.min(value, maxValue))
    }

    function integerDivide(dividend: number, divisor: number): number {
        return (dividend / divisor) | 0
    }

    function defaultPlayerCarImage(): Image {
        return img`
            . . . . . . . . . . . . . . . .
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
        `
    }
}
```

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Garage Shakedown @showdialog

![Jordan - Test Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/jordan.png)

Hey, I'm Jordan, the test engineer on this crew. I didn't start out coding; I came up through hands-on troubleshooting, learning to document problems clearly before I ever touched an automated test. What hooked me was realizing you can turn "I think the car handles well" into "I know it does, and here's the data." **A shakedown run is just a short practice test to make sure the car is working before the real race begins.**

In this gate you'll launch a quick practice test track that reads your saved speed, fuel, and display units. The dashboard will show fuel, elapsed time, and speed while you drive. At the end, the system saves those results so the next stage can build on what you actually learned.

## {1. Set the Test Readout}

**Preparing the Test Data**

---

Before a good test starts, teams decide how they will read the data. Your edited car sprite already stays in the project from the garage steps, so here you can focus on the test readout. The track can show speed in `mph` or `km/h`, and fuel in `gallons` or `liters`. Setting those units now keeps your results readable and consistent when the run begins.

* :mouse pointer: Find the `||drivenByStem:preview garage test bed||` block from the last activity and drag it away from `||loops(noclick):on start||` so the garage preview does not open again.
* :mouse pointer: If `||drivenByStem:show saved driver profile||` is still connected in `||loops(noclick):on start||`, drag it away too so the shakedown can launch without an extra popup.
* :racing car: Find the `||drivenByStem:start stage||` block already in `||loops(noclick):on start||` from the last activity.
* :mouse pointer: Change the `||drivenByStem:start stage||` value from **Garage Setup** to **Garage Shakedown**.
* :racing car: From the `||drivenByStem:Driven by STEM||` Toolbox, add `||drivenByStem.set speed display unit to||` and `||drivenByStem.set fuel display unit to||` in your `||loops(noclick):on start||`.
* :mouse pointer: Choose the units your team wants to read by selecting the value from the dropdowns.

~hint Wrong units later? 🔍

---

If the track later shows the wrong units, check these blocks first. The last speed and fuel unit blocks in `on start` are the settings the shakedown will use.

hint~

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
//@highlight
//@validate-exists
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
//@validate-exists
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
```

## {2. Launch the Test Track}

**Starting the Shakedown Run**

---

A shakedown needs a fair, repeatable test. The `||drivenByStem:start vehicle test track||` block opens the support track, uses your saved setup, and turns on the fuel, time, and speed dashboard automatically. That gives you one clean run to measure before you make the next decision.

* :racing_car: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:start vehicle test track||` at the end of `||loops(noclick):on start||`.
* :game pad: Run the simulator and wait for the start lights before you drive. You can expand the simulator to full screen using the expand icon which is located at the top, above the sound icon.
* :game pad: Watch the dashboard as you drive so you can compare fuel use, elapsed time, and speed.

~hint Track not starting?

---

If the track does not open, make sure `start vehicle test track` is in `on start` and not inside a button event or another block.

If the garage preview or driver profile keeps appearing first, check that those older blocks from Activity 2 are no longer connected to `on start`.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
//@highlight
//@validate-exists
drivenByStem.startVehicleTestTrack()
```

## {3. Add a Retry Button}

**Making the Test Repeatable**

---

One run gives you data. Two runs let you compare. Adding a retry button makes it easy to test again after a setup change and notice whether your pace, fuel use, or reaction improves. 

Engineers repeat tests so they can trust the pattern, not just one result.

* :game pad: Open `||controller:Controller||` and drag `||controller:on A button pressed||` into the workspace outside `||loops(noclick):on start||`.
* :mouse pointer: Inside the `||controller:on A button pressed||`, add `||drivenByStem:start vehicle test track||`.
* :game pad: After one run ends, press `A` to launch another run. When the second run finishes, the comparison will appear automatically.

~hint A button does nothing? 🔁

---

If `A` does nothing, check that the button event is a separate stack. Button events do not work when they are nested inside `on start`.

hint~

```blocks
//@highlight
//@validate-exists
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    //@validate-exists
    drivenByStem.startVehicleTestTrack()
})
```

## Nice work!

You just tested your car setup in a repeatable way, watched the dashboard data as you drove, and gave yourself a fast way to try again. That is what engineers do: test, notice patterns, and use the results to make better decisions.

In computer science, saved settings and reusable events help you run the same system more than once without rebuilding everything each time.

In engineering, repeated tests matter because they help you decide whether a result was a real improvement or just one lucky run.

In this activity, you worked like a test engineer, reliability engineer, and data engineer.
