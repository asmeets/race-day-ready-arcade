/**
 * Custom blocks for the Driven by STEM skillmap.
 */
//% color=#b40707 weight=100 icon="\uf1b9" block="Driven by STEM" groups='["Session", "Profile", "Setup", "Telemetry", "Review"]'
namespace drivenByStem {
    // Saves the team's chosen drive speed so later stages can reuse the garage setup.
    const DRIVE_SPEED_KEY = "driveSpeed"
    // Saves the car's current efficiency rating for gameplay and review screens.
    const EFFICIENCY_KEY = "efficiencyRating"
    // Tracks strategy points earned from smart decisions during a run.
    const STRATEGY_KEY = "strategyPoints"
    // Stores how much efficiency the current setup drains while driving.
    const DRAIN_KEY = "efficiencyDrain"
    // Remembers the active weather so track conditions stay consistent.
    const WEATHER_KEY = "weatherCondition"
    // Marks which stage of the skillmap the team is currently playing.
    const STAGE_KEY = "currentStage"
    // Saves whether the team tuned the car for balance or pace in the garage.
    const SETUP_FOCUS_KEY = "setupFocus"
    // Counts collisions so the game can reflect on control and handling tradeoffs.
    const COLLISION_KEY = "collisionCount"
    // Counts pit stop visits for strategy discussions after a run.
    const PIT_STOPS_KEY = "pitStopsVisited"
    // Saves the last run's score so students can compare results between tests.
    const LAST_SCORE_KEY = "lastResultScore"
    // Saves the previous support run score for direct A/B comparisons.
    const PREVIOUS_SCORE_KEY = "previousResultScore"
    // Saves the last run's remaining efficiency for debrief and iteration.
    const LAST_EFFICIENCY_KEY = "lastResultEfficiency"
    // Saves the previous support run remaining gas for comparison.
    const PREVIOUS_EFFICIENCY_KEY = "previousResultEfficiency"
    // Saves the last support run time so teams can compare pace between tests.
    const LAST_TIME_KEY = "lastResultTime"
    // Saves the previous support run time for direct comparison.
    const PREVIOUS_TIME_KEY = "previousResultTime"
    // Saves the last support run top speed for setup comparisons.
    const LAST_TOP_SPEED_KEY = "lastResultTopSpeed"
    // Saves the previous support run top speed.
    const PREVIOUS_TOP_SPEED_KEY = "previousResultTopSpeed"
    // Saves the last support run reaction time from lights-out to first input.
    const LAST_REACTION_KEY = "lastResultReaction"
    // Saves the previous support run reaction time.
    const PREVIOUS_REACTION_KEY = "previousResultReaction"
    // Saves which speed unit was used when the last support run finished.
    const LAST_SPEED_UNIT_KEY = "lastResultSpeedUnit"
    // Saves which speed unit the previous support run used.
    const PREVIOUS_SPEED_UNIT_KEY = "previousResultSpeedUnit"
    // Saves how many hits happened in the last support run.
    const LAST_HITS_KEY = "lastResultHits"
    // Saves how many hits happened in the previous support run.
    const PREVIOUS_HITS_KEY = "previousResultHits"
    // Saves the last run's strategy total for reflection activities.
    const LAST_STRATEGY_KEY = "lastResultStrategy"
    // Stores the team's note about what to improve in the next test.
    const NEXT_FOCUS_KEY = "nextTestFocus"
    // Saves the team's chosen name for profile and celebration screens.
    const TEAM_NAME_KEY = "teamName"
    // Saves the student's car name so it appears across activities.
    const CAR_NAME_KEY = "carName"
    // Remembers the role perspective the student selected for the experience.
    const ROLE_LENS_KEY = "roleLens"
    // Saves the selected car style so the same look can be reapplied later.
    const CAR_STYLE_KEY = "carStyle"
    // Saves whether the team wants speed shown in km/h or mph during support runs.
    const SPEED_UNIT_KEY = "speedDisplayUnit"

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
        ensureStringSetting(LAST_SPEED_UNIT_KEY, "km/h")
        ensureStringSetting(PREVIOUS_SPEED_UNIT_KEY, "km/h")
        ensureNumberSetting(LAST_HITS_KEY, 0)
        ensureNumberSetting(PREVIOUS_HITS_KEY, 0)
        ensureNumberSetting(LAST_STRATEGY_KEY, 0)
        ensureStringSetting(NEXT_FOCUS_KEY, "Review the data and test again.")
        ensureStringSetting(TEAM_NAME_KEY, "Apex Lab")
        ensureStringSetting(CAR_NAME_KEY, "Velocity")
        ensureStringSetting(ROLE_LENS_KEY, "performance engineer")
        ensureStringSetting(CAR_STYLE_KEY, "silver flash")
        ensureStringSetting(SPEED_UNIT_KEY, "km/h")
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
     * Start the optional pseudo-3D test track using the saved setup values.
     */
    //% block="start vehicle test track"
    //% blockId=raceday_start_vehicle_test_track
    //% group="Session" weight=60
    export function startVehicleTestTrack(): void {
        loadRaceProfile(80, 5)
        drivenByStemSupport.startVehicleTestTrack()
    }

    /**
     * Set the speed display unit for support-mode test track runs.
     */
    //% block="set speed display unit to $unit"
    //% blockId=raceday_set_speed_display_unit
    //% group="Session" weight=55
    export function setSpeedDisplayUnit(unit: SpeedUnit): void {
        settings.writeString(SPEED_UNIT_KEY, speedUnitName(unit))
    }

    /**
     * Read the saved speed display unit.
     */
    //% block="speed display unit"
    //% blockId=raceday_speed_display_unit
    //% group="Session" weight=50
    export function speedDisplayUnit(): string {
        return readStringSetting(SPEED_UNIT_KEY, "km/h")
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
        return readStringSetting(TEAM_NAME_KEY, "Apex Lab")
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
        return readStringSetting(CAR_NAME_KEY, "Velocity")
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
        return readStringSetting(ROLE_LENS_KEY, "performance engineer")
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
        return readNumberSetting(STRATEGY_KEY, 0)
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
        settings.writeNumber(COLLISION_KEY, readNumberSetting(COLLISION_KEY, 0) + 1)
        settings.writeNumber(EFFICIENCY_KEY, info.life())
    }

    /**
     * Read the current collision count.
     */
    //% block="collision count"
    //% blockId=raceday_collision_count
    //% group="Telemetry" weight=60
    export function collisionCount(): number {
        return readNumberSetting(COLLISION_KEY, 0)
    }

    /**
     * Record a pit stop visit.
     */
    //% block="record pit stop visit"
    //% blockId=raceday_record_pit_stop
    //% group="Telemetry" weight=50
    export function recordPitStopVisit(): void {
        settings.writeNumber(PIT_STOPS_KEY, readNumberSetting(PIT_STOPS_KEY, 0) + 1)
    }

    /**
     * Read the saved pit stop count.
     */
    //% block="saved pit stop count"
    //% blockId=raceday_pit_stop_count
    //% group="Telemetry" weight=40
    export function savedPitStopCount(): number {
        return readNumberSetting(PIT_STOPS_KEY, 0)
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
        settings.writeString(LAST_SPEED_UNIT_KEY, readStringSetting(SPEED_UNIT_KEY, "km/h"))
        settings.writeNumber(LAST_HITS_KEY, 0)
        settings.writeNumber(LAST_STRATEGY_KEY, readNumberSetting(STRATEGY_KEY, 0))
        settings.writeNumber(EFFICIENCY_KEY, info.life())
    }

    /**
     * Save support-mode run results without depending on the life HUD.
     */
    //% blockHidden=true
    export function saveSupportRunResults(performanceResult: number, efficiencyRemaining: number, elapsedSeconds: number, reactionSeconds: number, topSpeed: number, speedUnit: string, hitCount: number): void {
        if (readNumberSetting(LAST_TIME_KEY, 0) > 0) {
            settings.writeNumber(PREVIOUS_SCORE_KEY, readNumberSetting(LAST_SCORE_KEY, 0))
            settings.writeNumber(PREVIOUS_EFFICIENCY_KEY, readNumberSetting(LAST_EFFICIENCY_KEY, 0))
            settings.writeNumber(PREVIOUS_TIME_KEY, readNumberSetting(LAST_TIME_KEY, 0))
            settings.writeNumber(PREVIOUS_TOP_SPEED_KEY, readNumberSetting(LAST_TOP_SPEED_KEY, 0))
            settings.writeNumber(PREVIOUS_REACTION_KEY, readNumberSetting(LAST_REACTION_KEY, -1))
            settings.writeString(PREVIOUS_SPEED_UNIT_KEY, readStringSetting(LAST_SPEED_UNIT_KEY, "km/h"))
            settings.writeNumber(PREVIOUS_HITS_KEY, readNumberSetting(LAST_HITS_KEY, 0))
        }

        settings.writeNumber(LAST_SCORE_KEY, performanceResult)
        settings.writeNumber(LAST_EFFICIENCY_KEY, efficiencyRemaining)
        settings.writeNumber(LAST_TIME_KEY, elapsedSeconds)
        settings.writeNumber(LAST_TOP_SPEED_KEY, topSpeed)
        settings.writeNumber(LAST_REACTION_KEY, reactionSeconds)
        settings.writeString(LAST_SPEED_UNIT_KEY, speedUnit)
        settings.writeNumber(LAST_HITS_KEY, hitCount)
        settings.writeNumber(LAST_STRATEGY_KEY, readNumberSetting(STRATEGY_KEY, 0))
        settings.writeNumber(EFFICIENCY_KEY, efficiencyRemaining)
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
        return readNumberSetting(LAST_EFFICIENCY_KEY, 0)
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

    /**
     * Read the last support run time in seconds.
     */
    //% block="last test time seconds"
    //% blockId=raceday_last_test_time
    //% group="Review" weight=65
    export function lastTestTimeSeconds(): number {
        return readNumberSetting(LAST_TIME_KEY, 0)
    }

    /**
     * Read the last support run top speed value.
     */
    //% block="last test top speed"
    //% blockId=raceday_last_test_top_speed
    //% group="Review" weight=64
    export function lastTestTopSpeed(): number {
        return readNumberSetting(LAST_TOP_SPEED_KEY, 0)
    }

    /**
     * Read the last support run reaction time in seconds.
     */
    //% block="last test reaction seconds"
    //% blockId=raceday_last_test_reaction
    //% group="Review" weight=63
    export function lastTestReactionSeconds(): number {
        return readNumberSetting(LAST_REACTION_KEY, -1)
    }

    /**
     * Read the last support run speed unit.
     */
    //% block="last test speed unit"
    //% blockId=raceday_last_test_speed_unit
    //% group="Review" weight=62
    export function lastTestSpeedUnit(): string {
        return readStringSetting(LAST_SPEED_UNIT_KEY, "km/h")
    }

    /**
     * Check whether a previous support run is available for comparison.
     */
    //% block="has saved test comparison"
    //% blockId=raceday_has_saved_test_comparison
    //% group="Review" weight=61
    export function hasSavedTestComparison(): boolean {
        return readNumberSetting(PREVIOUS_TIME_KEY, 0) > 0
    }

    /**
     * Show the current and previous support test runs side by side.
     */
    //% block="show saved test comparison"
    //% blockId=raceday_show_saved_test_comparison
    //% group="Review" weight=60
    export function showSavedTestComparison(): void {
        if (!(hasSavedTestComparison())) {
            game.splash("No comparison yet", "Run the test track twice to compare results.")
            return
        }

        game.showLongText(buildSavedTestComparison(), DialogLayout.Full)
    }

    function buildSavedTestComparison(): string {
        const previousTime = readNumberSetting(PREVIOUS_TIME_KEY, 0)
        const currentTime = readNumberSetting(LAST_TIME_KEY, 0)
        const previousTopSpeed = readNumberSetting(PREVIOUS_TOP_SPEED_KEY, 0)
        const currentTopSpeed = readNumberSetting(LAST_TOP_SPEED_KEY, 0)
        const previousSpeedUnit = readStringSetting(PREVIOUS_SPEED_UNIT_KEY, "km/h")
        const currentSpeedUnit = readStringSetting(LAST_SPEED_UNIT_KEY, "km/h")
        const previousReaction = readNumberSetting(PREVIOUS_REACTION_KEY, -1)
        const currentReaction = readNumberSetting(LAST_REACTION_KEY, -1)
        const previousGas = readNumberSetting(PREVIOUS_EFFICIENCY_KEY, 0)
        const currentGas = readNumberSetting(LAST_EFFICIENCY_KEY, 0)
        const previousHits = readNumberSetting(PREVIOUS_HITS_KEY, 0)
        const currentHits = readNumberSetting(LAST_HITS_KEY, 0)
        const previousScore = readNumberSetting(PREVIOUS_SCORE_KEY, 0)
        const currentScore = readNumberSetting(LAST_SCORE_KEY, 0)

        return "Test comparison"
            + "\nPace: " + lowerIsBetterCue(previousTime, currentTime, "this run faster", "last run faster", "same pace")
            + "\nReaction: " + reactionCue(previousReaction, currentReaction)
            + "\nGas: " + higherIsBetterCue(previousGas, currentGas, "this run burned less", "last run burned less", "same gas use")
            + "\nHits: " + lowerIsBetterCue(previousHits, currentHits, "this run had fewer hits", "last run had fewer hits", "same hits")
            + "\nScore: " + higherIsBetterCue(previousScore, currentScore, "this run scored higher", "last run scored higher", "same score")
            + "\nTop speed: " + topSpeedCue(previousTopSpeed, currentTopSpeed, previousSpeedUnit, currentSpeedUnit)
            + "\nThis time: " + currentTime + " s"
            + "\nLast time: " + previousTime + " s"
            + "\nThis reaction: " + formatReactionValue(currentReaction)
            + "\nLast reaction: " + formatReactionValue(previousReaction)
            + "\nThis gas left: " + currentGas
            + "\nLast gas left: " + previousGas
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
