# Pit Stop Briefings

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
    let activeTrack: TutorialTrackState = null
    let previousStage = ""
    let previousBackground: Image = null

    class TutorialTrackState {
        constructor(
            public car: Sprite,
            public maxDriveSpeed: number,
            public fuelMax: number,
            public fuelDrainBase: number,
            public displayUnit: string,
            public speed = 0,
            public fuelRemaining = fuelMax,
            public elapsedMilliseconds = 0,
            public starterElapsedMilliseconds = 0,
            public starterLightsAnnounced = 0,
            public goFlashMilliseconds = 0,
            public topSpeed = 0,
            public reactionMilliseconds = -1,
            public collisionCount = 0,
            public distance = 0,
            public nextObstacleDistance = randint(OBSTACLE_MIN_SPACING, OBSTACLE_MAX_SPACING),
            public obstacles: Sprite[] = [],
            public active = true,
            public raceStarted = false,
            public falseStartLocked = false
        ) {}
    }

    export function startVehicleTestTrack(): void {
        ensureHooksInstalled()
        resetTrack()
        previousStage = settings.exists("currentStage") ? settings.readString("currentStage") : "garage"
        previousBackground = scene.backgroundImage() ? scene.backgroundImage().clone() : null
        const playerCar = ensurePlayerCar()
        const displayUnit = settings.exists("speedDisplayUnit") ? settings.readString("speedDisplayUnit") : "mph"
        activeTrack = new TutorialTrackState(
            playerCar,
            clampToRange(drivenByStem.savedDriveSpeed() * 2, MIN_SPEED, MAX_SPEED),
            clampToRange(drivenByStem.savedEfficiency() * 10, 30, 100),
            FUEL_BASE_DRAIN * Math.max(1, drivenByStem.savedEfficiencyCost()),
            displayUnit
        )
        controller.moveSprite(playerCar, 0, 0)
        playerCar.setFlag(SpriteFlag.StayInScreen, true)
        playerCar.setFlag(SpriteFlag.Invisible, false)
        playerCar.setPosition(ROAD_CENTER, CAR_Y)
        playerCar.z = 6
        scene.setBackgroundImage(image.create(TRACK_WIDTH, TRACK_HEIGHT))
        info.stopCountdown()
        info.showCountdown(false)
        info.showScore(false)
        playEngineRev()
    }

    function ensureHooksInstalled(): void {
        if (hooksInstalled) return
        hooksInstalled = true
        sprites.onOverlap(SpriteKind.Player, SpriteKind.TestTrackObstacle, function (sprite, otherSprite) {
            if (!trackIsActive() || sprite != activeTrack.car) return
            removeObstacle(otherSprite)
            otherSprite.destroy(effects.disintegrate, 150)
            activeTrack.collisionCount += 1
            activeTrack.speed = Math.max(0, activeTrack.speed - COLLISION_SPEED_LOSS)
            scene.cameraShake(2, 100)
        })
        game.onUpdate(function () { updateTrack() })
        game.onPaint(function () { if (trackIsActive()) drawTrackFrame() })
    }

    function ensurePlayerCar(): Sprite {
        const playerCar = sprites.allOfKind(SpriteKind.Player)[0]
        const savedCar = assets.image`playerCar`
        return playerCar || sprites.create(savedCar ? savedCar.clone() : defaultPlayerCarImage(), SpriteKind.Player)
    }

    function defaultPlayerCarImage(): Image {
        return img`
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
            . . . . . . . . . . . . . . . .
        `
    }

    function updateTrack(): void {
        if (!trackIsActive()) return
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
            if (activeTrack.starterElapsedMilliseconds >= START_LIGHT_COUNT * STAGE_LIGHT_STEP_MILLISECONDS + STAGE_LIGHT_HOLD_MILLISECONDS) {
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
        if (steeringLeft) activeTrack.car.x -= 70 * deltaTime
        if (steeringRight) activeTrack.car.x += 70 * deltaTime
        activeTrack.car.x = clampToRange(activeTrack.car.x, ROAD_LEFT + 6, ROAD_RIGHT - 6)
        let speedChange = accelerating ? ACCELERATION * deltaTime : braking ? -BRAKE_DECELERATION * deltaTime : -COAST_DECELERATION * deltaTime
        if (steeringLeft || steeringRight) speedChange -= STEER_DRAG * deltaTime
        const offRoad = activeTrack.car.x <= ROAD_LEFT + 8 || activeTrack.car.x >= ROAD_RIGHT - 8
        if (offRoad) speedChange -= OFFROAD_DRAG * deltaTime
        activeTrack.speed = clampToRange(activeTrack.speed + speedChange, 0, activeTrack.maxDriveSpeed)
        activeTrack.elapsedMilliseconds += deltaTime * 1000
        activeTrack.distance += activeTrack.speed * deltaTime
        activeTrack.topSpeed = Math.max(activeTrack.topSpeed, activeTrack.speed)
        activeTrack.goFlashMilliseconds = Math.max(0, activeTrack.goFlashMilliseconds - deltaTime * 1000)
        const fuelDrain = activeTrack.fuelDrainBase + activeTrack.speed / FUEL_SPEED_DRAIN_DIVISOR + (offRoad ? FUEL_OFFROAD_DRAIN : 0)
        activeTrack.fuelRemaining = Math.max(0, activeTrack.fuelRemaining - fuelDrain * deltaTime)
        if (activeTrack.speed > 0 && activeTrack.distance >= activeTrack.nextObstacleDistance && activeTrack.obstacles.length < MAX_OBSTACLES) {
            const obstacle = sprites.create(coneImage, SpriteKind.TestTrackObstacle)
            obstacle.setPosition(randint(ROAD_LEFT + 12, ROAD_RIGHT - 12), HUD_HEIGHT + 2)
            obstacle.z = 4
            activeTrack.obstacles.push(obstacle)
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
        if (activeTrack.fuelRemaining <= 0 || activeTrack.elapsedMilliseconds >= RUN_DURATION_MILLISECONDS) {
            finishTrack()
        }
    }

    function drawTrackFrame(): void {
        const canvas = scene.backgroundImage()
        if (!canvas) return
        canvas.fill(7)
        canvas.fillRect(0, 0, TRACK_WIDTH, HUD_HEIGHT, 12)
        canvas.fillRect(0, HUD_HEIGHT - 1, TRACK_WIDTH, 1, 15)
        canvas.fillRect(0, HUD_HEIGHT, TRACK_WIDTH, TRACK_HEIGHT - HUD_HEIGHT, 7)
        drawRoadBorder(canvas, ROAD_LEFT - BORDER_WIDTH, 0 - integerDivide(activeTrack.distance, 4))
        canvas.fillRect(ROAD_LEFT, HUD_HEIGHT, ROAD_WIDTH, TRACK_HEIGHT - HUD_HEIGHT, 11)
        drawRoadBorder(canvas, ROAD_RIGHT, 1 - integerDivide(activeTrack.distance, 4))
        const stripeOffset = integerDivide(activeTrack.distance, 10) % 18
        for (let y = HUD_HEIGHT - 10 + stripeOffset; y < TRACK_HEIGHT; y += 18) canvas.fillRect(ROAD_CENTER - 2, y, 4, 9, 1)
        canvas.print("FUEL " + roundToTenth(activeTrack.fuelRemaining) + " gal", 5, 6, 1, image.font8)
        canvas.print(formatSpeed(activeTrack.speed, activeTrack.displayUnit), TRACK_WIDTH - 54, 6, 1, image.font8)
        if (!activeTrack.raceStarted) drawStartLights(canvas)
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
        canvas.print(launched ? "GO!" : "Ready", overlayX + 26, overlayY + 12, launched ? 7 : 1, image.font8)
    }

    function drawRoadBorder(canvas: Image, x: number, offsetSeed: number): void {
        for (let row = 0; row < TRACK_HEIGHT - HUD_HEIGHT; row += STRIPE_SEGMENT_HEIGHT) {
            const colorIndex = integerDivide(row + offsetSeed, STRIPE_SEGMENT_HEIGHT) % 3
            const stripeColor = colorIndex == 0 ? 5 : colorIndex == 1 ? 1 : 15
            canvas.fillRect(x, HUD_HEIGHT + row, BORDER_WIDTH, Math.min(STRIPE_SEGMENT_HEIGHT, TRACK_HEIGHT - HUD_HEIGHT - row), stripeColor)
        }
    }

    function finishTrack(): void {
        const summary = "Shakedown report"
            + "\nTime: " + roundToTenth(activeTrack.elapsedMilliseconds / 1000) + " s"
            + "\nTop speed: " + formatSpeed(activeTrack.topSpeed, activeTrack.displayUnit)
            + "\nFuel left: " + roundToTenth(activeTrack.fuelRemaining) + " gal"
            + "\nHits: " + activeTrack.collisionCount
        resetTrack()
        if (previousStage) settings.writeString("currentStage", previousStage)
        if (previousBackground) scene.setBackgroundImage(previousBackground.clone())
        controller.moveSprite(ensurePlayerCar(), drivenByStem.savedDriveSpeed(), drivenByStem.savedDriveSpeed())
        info.showCountdown(true)
        info.showScore(true)
        game.showLongText(summary, DialogLayout.Full)
    }

    function resetTrack(): void {
        if (!activeTrack) return
        activeTrack.active = false
        for (let obstacle of activeTrack.obstacles) obstacle.destroy()
        activeTrack.obstacles = []
        for (let obstacle of sprites.allOfKind(SpriteKind.TestTrackObstacle)) obstacle.destroy()
        activeTrack.car.setFlag(SpriteFlag.Invisible, false)
        activeTrack.car.setPosition(ROAD_CENTER, CAR_Y)
    }

    function removeObstacle(target: Sprite): void {
        if (!activeTrack) return
        const index = activeTrack.obstacles.indexOf(target)
        if (index >= 0) activeTrack.obstacles.removeAt(index)
    }

    function formatSpeed(baseSpeed: number, unit: string): string {
        return roundToTenth(unit == "mph" ? baseSpeed * MPH_FACTOR : baseSpeed) + " " + unit
    }

    function playStarterBeep(): void { control.runInParallel(function () { music.playTone(659, 80) }) }
    function playGoTone(): void { control.runInParallel(function () { music.playTone(988, 180) }) }
    function playEngineRev(): void { control.runInParallel(function () { music.playTone(196, 70); music.playTone(262, 70); music.playTone(330, 80); music.playTone(392, 120) }) }
    function launchInputPressed(): boolean { return controller.up.isPressed() || controller.down.isPressed() || controller.left.isPressed() || controller.right.isPressed() }
    function triggerFalseStart(): void {
        if (!trackIsActive() || activeTrack.falseStartLocked || activeTrack.raceStarted) return
        activeTrack.falseStartLocked = true
        scene.cameraShake(2, 200)
        game.splash("False start", "+5.0 s penalty")
        activeTrack.falseStartLocked = false
        activeTrack.elapsedMilliseconds += FALSE_START_PENALTY_MILLISECONDS
        activeTrack.starterElapsedMilliseconds = 0
        activeTrack.starterLightsAnnounced = 0
        activeTrack.goFlashMilliseconds = 0
    }
    function trackIsActive(): boolean { return !!activeTrack && activeTrack.active }
    function roundToTenth(value: number): number { return Math.round(value * 10) / 10 }
    function clampToRange(value: number, minValue: number, maxValue: number): number { return Math.max(minValue, Math.min(value, maxValue)) }
    function integerDivide(dividend: number, divisor: number): number { return (dividend / divisor) | 0 }
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

## Pit Stop Briefings @showdialog

![Morgan - Strategist](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/morgan.png)

Hey, I'm Morgan, your strategist. I didn't start out crunching data; I started in track operations, learning timing and logistics by doing the work and talking with the engineers and analysts around me. On a real team, I monitor live conditions, weigh safer options against riskier ones, and help everyone make fast calls with different pieces of information.

In this gate, you'll build a pit stop that reads the setup choice you saved earlier and turns it into a real decision with real consequences. The call you make here won't just happen and disappear. Each pit stop visit you record here shows up again in Reflect and Review.

## {1. Start the Pit Stop stage}

**Activating the Pit Wall Environment**

---

Before any pit decisions can happen, the game needs to know which mode it's running in. Setting the stage tells all your event blocks whether they should execute pit logic or stay quiet. This is how real systems coordinate different operational modes—one clear signal that every subsystem can check.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Something Looks Familiar...</h4>
            <p>This activity continues the code you already built in Hit the Track. You will keep updating that same project instead of rebuilding it.</p>
            <p>You can still find the start vehicle test track block in the Driven by STEM category anytime you want another full-track test in the simulator. For the required steps here, keep your Pit Stop stage blocks connected.</p>
        </div>
    </div>

* :binoculars: Open `||loops(noclick):on start||` and find the `||drivenByStem:start stage||` block you already changed to **Track** in the last activity.
* :racing car: Change that same `||drivenByStem:start stage||` block from **Track** to **Pit Stop**.

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
```

```ghost
drivenByStem.startVehicleTestTrack()
```

## {2. Show a short briefing}

**Communicating Context to the Driver**

---

In racing, clear communication prevents mistakes. A quick message at the start of the pit phase tells the player they've transitioned from driving to decision-making. This mirrors how race engineers brief drivers over the radio before critical moments—short, direct, and focused on what matters right now.

* :game pad: Open `||game:Game||` and add a `||game:splash||` block below your existing stage setter in `||loops(noclick):on start||`.
* :keyboard: Set the first field to `||game:Pit wall||` and the second field to `||game:Use data before you make the next call.||`

~hint Message too long? ⚡

---

Keep this briefing tight. If you need more than a few seconds to explain it, the prompt should be clearer, not longer.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
//@highlight
//@validate-exists
game.splash("Pit wall", "Use data before you make the next call.")
```

## {3. Track pit stops visited}

**Recording Strategic Decisions**

---

Every pit stop costs time, so teams track how often they use them to evaluate their strategy later. Creating a counter variable gives you measurable evidence of your decision-making patterns. This is the same principle data analysts use when they review race logs to identify what worked and what didn't.

* :paper plane: Open `||variables:Variables||` and make a new variable named `||variables:pitStopsVisited||`.
* :paper plane: Drag `||variables:set pitStopsVisited to 0||` into `||loops(noclick):on start||` below the splash.

~hint Lost evidence? 📊

---

If you skip the counter, you lose evidence. You should have at least one number you can point to: "We used the pit stop ___ times."

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
game.splash("Pit wall", "Use data before you make the next call.")
//@highlight
//@validate-exists
let pitStopsVisited = 0
```

## {4. Spawn pit markers}

**Creating Time-Limited Opportunities**

---

Pit windows appear and disappear based on track position and race conditions. By spawning markers on a timer with a limited lifespan, you're modeling the reality that strategic opportunities don't wait forever. 

Engineers design systems that create these windows, and strategists decide when to use them—both roles rely on timing.

* :game pad: Open `||game:Game||` and add an `||game:on update every (8000) ms||` block. (Make sure you manually change 500 to 8000.)
* :racing car: Inside the `||game:on update every (8000) ms||` block, add an `||logic:if stage is Pit Stop||`. HINT: You will need to use two different blocks to accomplish this step.
* :mouse pointer: Create a new variable called `||variables:pitMarker||` which will represent a pit stop.
* :paper plane: Simiilar to how we created an "enemy" sprite, we are going to add a `||sprites:set mysprite to sprite of kind player||` sprite inside the `||logic:if||` block. After adding the block, change "Player" to "Food".
* :mouse pointer: Change `||sprites:mySprite||` to `||sprites:pitStop||`.
* :mouse pointer: Select the image block next to sprite and select the pitStop image in the Gallery.
* :racing car: Add `||sprites:set mySprite position to x0 y0||` under the previous block. Change `||sprites:mySprite||` to `||sprites:pitMarker||`.
* :racing car: To make sure pit stops are randomly placed add `||math:pick random 0 to 0||` to both "X" and "Y". 
* :mouse pointer: For "X" pick random numbers between 20 and 140. For "Y", pick random numbers between 20 and 100.
* :racing car: Add `||sprites:set mySprite x to 0||` under the previous block. Change `||sprites:mySprite||` to `||sprites:pitMarker||`.
* :racing car: Change "X" to lifespan and set the value to 4000 to make it a timed decision.

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
        let pitMarker = sprites.create(assets.image`pitMarker`, SpriteKind.Food)
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

* :paper plane: Open `||sprites:Sprites||` and add an `||sprites:on Player overlaps Food||` block.
* :racing car: Inside the overlap block, add an `||logic:if stage is Pit Stop||` check.
* :paper plane: Inside that `if` block, change `||variables:pitStopsVisited||` by 1.
* :racing car: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:record pit stop visit||`.
* :racing car: Add `||drivenByStem:award strategy points||` and set it to 1.
* :logic: Add an `||logic:if/else||` block inside the pit stop check. (This is a nested if/else block.)
* :racing car: In the `||logic:if||` condition, use `||drivenByStem:saved setup focus is pace||`.
* :score: In the true branch, add the pace reward by increasing score. (Hint: this block lives in `||info||`.)
* :heart: In the else branch, add the balance reward by increasing life. (Hint: this block lives in `||info||`.)

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

* :game pad: Open `||info:Info||` and add an `||info:on countdown end||` block so this stage saves the updated run state when the carried race timer finishes. Inside this block, add two blocks which will create an "if/then" for the curent stage is pit stop.
* :racing car: Inside the `||logic:if current stage is Pit Stop||` check, open `||drivenByStem:Driven by STEM||` and drag in `save current run results`.

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

You just turned a pit stop into a real strategy decision. You built a system that created pit chances, tracked when you used them, changed the reward based on your earlier setup choice, and saved those results for the next stage.

In computer science, conditionals and saved values help one choice affect what happens later in the project.

In engineering, strategy is about making the best next move with limited time and limited information.

In this activity, you worked like a strategist, pit crew teammate, data analyst, and operations lead.
