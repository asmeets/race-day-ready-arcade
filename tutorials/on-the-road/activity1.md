# Hit the Track

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
    let activeTrack: TutorialTrackState = null
    let previousStage = ""
    let previousBackground: Image = null

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

        previousStage = settings.exists("currentStage") ? settings.readString("currentStage") : "garage"
        previousBackground = scene.backgroundImage() ? scene.backgroundImage().clone() : null

        const playerCar = ensurePlayerCar()
        const maxDriveSpeed = clampToRange(drivenByStem.savedDriveSpeed() * 2, MIN_SPEED, MAX_SPEED)
        const fuelMax = clampToRange(drivenByStem.savedEfficiency() * 10, 30, 100)
        const fuelDrainBase = FUEL_BASE_DRAIN * Math.max(1, drivenByStem.savedEfficiencyCost())
        const displayUnit = settings.exists("speedDisplayUnit") ? settings.readString("speedDisplayUnit") : "mph"

        controller.moveSprite(playerCar, 0, 0)
        playerCar.setFlag(SpriteFlag.StayInScreen, true)
        playerCar.setFlag(SpriteFlag.Invisible, false)
        playerCar.setPosition(ROAD_CENTER, CAR_Y)
        playerCar.z = 6

        scene.setBackgroundImage(image.create(TRACK_WIDTH, TRACK_HEIGHT))
        info.stopCountdown()
        info.showCountdown(false)
        info.showScore(false)
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
            if (trackIsActive()) {
                drawTrackFrame()
            }
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

        canvas.print("FUEL " + roundToTenth(activeTrack.fuelRemaining) + " gal", 5, 6, 1, image.font8)
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

        canvas.print(launched ? "GO!" : "Ready", overlayX + 26, overlayY + 12, launched ? 7 : 1, image.font8)
    }

    function drawRoadBorder(canvas: Image, x: number, y: number, width: number, height: number, offsetSeed: number): void {
        for (let row = 0; row < height; row += STRIPE_SEGMENT_HEIGHT) {
            const colorIndex = integerDivide(row + offsetSeed, STRIPE_SEGMENT_HEIGHT) % 3
            const stripeColor = colorIndex == 0 ? 5 : colorIndex == 1 ? 1 : 15
            canvas.fillRect(x, y + row, width, Math.min(STRIPE_SEGMENT_HEIGHT, height - row), stripeColor)
        }
    }

    function finishTrack(completedRun: boolean): void {
        if (!trackIsActive()) {
            return
        }

        const summary = (completedRun ? "Shakedown complete" : "Shakedown report")
            + "\nTime: " + roundToTenth(activeTrack.elapsedMilliseconds / 1000) + " s"
            + "\nTop speed: " + formatSpeed(activeTrack.topSpeed, activeTrack.displayUnit)
            + "\nFuel left: " + roundToTenth(activeTrack.fuelRemaining) + " gal"
            + "\nHits: " + activeTrack.collisionCount

        resetTrack()
        if (previousStage) {
            settings.writeString("currentStage", previousStage)
        }
        if (previousBackground) {
            scene.setBackgroundImage(previousBackground.clone())
        }
        controller.moveSprite(ensurePlayerCar(), drivenByStem.savedDriveSpeed(), drivenByStem.savedDriveSpeed())
        info.showCountdown(true)
        info.showScore(true)
        game.showLongText(summary, DialogLayout.Full)
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
        const x = TRACK_WIDTH - 6 - text.length * image.font8.charWidth
        canvas.print(text, x, y, 1, image.font8)
    }

    function formatSpeed(baseSpeed: number, unit: string): string {
        return roundToTenth(unit == "mph" ? baseSpeed * MPH_FACTOR : baseSpeed) + " " + unit
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
        return controller.up.isPressed() || controller.down.isPressed() || controller.left.isPressed() || controller.right.isPressed()
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

## Hit the Track @showdialog

![Casey - Telemetry Analyst](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/casey.png)

Hey there, I'm Casey, the telemetry analyst on this team. I got into this work by tracking game stats and sports stats on my own, then picked up spreadsheets and some basic coding through a community college data course. On a real team, I clean messy data, build simple dashboards, and help engineers answer one big question: **did that change actually help?**

In this gate, you'll drive under live conditions while the game tracks every collision and rewards clean, controlled laps with evidence, not guesses. That's exactly how real engineers decide whether a setup change worked. The run you save here updates the performance and efficiency picture your later stages will build from.

## {1. Start the Track Stage}

**Setting the Session Context**

---

Before any events fire, the system needs to know what mode it's in. Setting the stage to "Track" is how you tell every timer, spawner, and collision handler which rules apply. 

Real racing teams do something similar — they declare whether it's a practice session, qualifying, or race before anything starts.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Something Looks Familiar...</h4>
            <p>This activity continues the code you already built in the garage. You will keep updating that same project instead of rebuilding it.</p>
            <p>The start vehicle test track block is still available in the Driven by STEM category if you want a full shakedown run in the simulator. For this activity, remove it from on start so your Track stage code can run.</p>
        </div>
    </div>

* :mouse pointer: Find the `||drivenByStem:start vehicle test track||` block still connected in `||loops(noclick):on start||` from the garage shakedown and drag it to the Toolbox to remove it.
* :game pad: If you still have the old `||controller:on A button pressed||` retry event from the shakedown, drag that whole event to the Toolbox too.
* :binoculars: Find the `||drivenByStem:start stage||` block already in `||loops(noclick):on start||`.
* :mouse pointer: Change its value from **Garage Shakedown** to **Track**.

~hint Timing feels wrong? 🔍

---

If obstacles or scoring run at the wrong time, check the stage setting first. That's usually why something is "running right now."

hint~

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Track)
```

```ghost
drivenByStem.startVehicleTestTrack()
```

## {2. Make the Track Readable}

**Optimizing Visual Clarity**

---

In a live event or classroom, multiple people will watch the same screen. Start with a high-contrast color so the car stays easy to track, then add a shared background image to give the session a stronger track identity. Good visual design isn't just about aesthetics — it's about making the important information visible.

* :tree: Open `||scene:Scene||` and drag `||scene:set background color||` into your existing `||loops(noclick):on start||` stack.
* :mouse pointer: Pick a color that contrasts strongly with the car sprite.
* :tree: Add `||scene:set background image to||` under it and choose the shared `trackBg` image.

~hint Car hard to distinguish? 🎨

---

If your car blends into the scene, keep the background simple and test again. Readability matters more than decoration.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Track)
//@validate-exists
scene.setBackgroundColor(11)
//@highlight
//@validate-exists
scene.setBackgroundImage(assets.image`trackBg`)
```

## {3. Load Your Saved Setup}

**Carrying Forward Your Configuration**

---

Your speed choice and efficiency tradeoff from the garage should carry into this session. Loading saved values ensures that the car behaves consistently with what you tuned earlier, and keeping the same `||sprites:raceCar||` sprite means you're still testing the team car you designed. 

This is how engineers maintain setup continuity across test sessions — load the baseline, then measure what happens.

* :paper plane: Find your existing `||variables:driveSpeed||` variable from the garage code.
* :racing car: In `||loops(noclick):on start||`, set `||variables:driveSpeed||` to `||drivenByStem:saved drive speed||` so your movement still matches the saved setup.
* :id card: Keep using the same `||sprites:raceCar||` sprite you customized in the garage so this session tests the same car.
* :racing car: Set `||variables:efficiencyDrain||` to `||drivenByStem:Driven by STEM:saved efficiency cost||`.

~hint Life draining wrong? 🔎

---

If life drains at a fixed rate instead of your tuned setup, check that `efficiencyDrain` reads from saved efficiency cost, not a hardcoded number.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Track)
scene.setBackgroundColor(11)
scene.setBackgroundImage(assets.image`trackBg`)
//@highlight
//@validate-exists
driveSpeed = drivenByStem.savedDriveSpeed()
//@highlight
//@validate-exists
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
```

## {4. Create Collision Tracking Variables}

**Building a Measurement System**

---

You can't improve what you don't measure. These variables let the game track how many collisions happen over time and compare clean stretches to messy ones. 

Data analysts use patterns like this to identify trends and reward consistency. Tracking isn't just counting — it's building evidence.

* :paper plane: Open `||variables:Variables||`, select `||variables:Make a Variable||`, and name it `||variables:trackCollisions||`.
* :paper plane: Make a second variable called `||variables:lastTrackCollisionCount||`.
* :keyboard: Set both to `0` inside `||loops(noclick):on start||`.

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Track)
scene.setBackgroundColor(11)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
//@highlight
//@validate-exists
let trackCollisions = 0
//@highlight
//@validate-exists
let lastTrackCollisionCount = 0
```

## {5. Turn On the Dashboard and Countdown}

**Establishing Performance Boundaries**

---

A racing session needs clear start and end points. The countdown sets the test window, while the score and life displays show real-time feedback. Setting these values at the start ensures every player gets the same fair test conditions. This is how you make comparisons meaningful.

* :game pad: Open `||info:Info||` in the Toolbox and drag `||info:set score to 0||` into `||loops(noclick):on start||`.
* :racing car: Drag `||info:set life||` and connect `||drivenByStem:saved efficiency||` from `||drivenByStem:Driven by STEM||` as the value.
* :game pad: Drag `||info:start countdown||` and set the time to `30` seconds.

~hint Life stuck at zero? 📊

---

If life stays at `0`, the saved value didn't load. Trace where life is set and make sure it reads from saved efficiency.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.Track)
scene.setBackgroundColor(11)
driveSpeed = drivenByStem.savedDriveSpeed()
let efficiencyDrain = drivenByStem.savedEfficiencyCost()
let trackCollisions = 0
let lastTrackCollisionCount = 0
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(drivenByStem.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(30)
```

## {6. Spawn Obstacles}

**Creating Dynamic Test Conditions**

---

A static track doesn't challenge your setup. Spawning obstacles at regular intervals creates consistent, repeatable test conditions — you face the same challenge density every run, so differences in performance reflect your setup, not random luck. This is controlled testing at work.

* :game pad: Open `||game:Game||` and add `||game:on game update every 2000 ms||`. Make sure that the time is 2 seconds.
* :racing car: Add an `||logic:if||` block inside the `||game:on game update every 2000 ms||`.
* :racing car: Add the `||drivenByStem:current stage is garage||` to the `||logic:if||` condition.
* :mouse pointer: Change the current stage to `||drivenByStem:Track||`.
* :keyboard: Create a new variable `||variables:obs||` to store our sprite.
* :paper plane: Create an obstacle sprite from `||sprites:Sprites||` by dragging the `||set mysprite to sprite of kind player||` to `||loops(noclick):on start||`.
* :mouse pointer: Change `||sprites:mySprite||` to the `||variables:obs||` you created earlier.
* :mouse pointer: Change `||sprites:Player||` to `||sprites:Enemy||`.
* :mouse pointer: Add `||sprites:set mysprite position to x 0 y 0||` to `||loops(noclick):on start||`. Change mySprite to Obs.
* :game pad: To make the obstacles randomly appear, drag the `||math:pick random 0 to 160||` into the "X" position.
* :mouse pointer: Add `||sprites:set mysprite x to 0||` to `||loops(noclick):on start||`. Change mySprite to Obs.
* :game pad: To set the speed of the obstacles, change "X" to vy (velocity y) and set a value of 60.
* :mouse pointer: Add `||sprites:set mysprite x to 0||` to `||loops(noclick):on start||`. Change mySprite to Obs.
* :game pad: To make sure obstacles disappear, change "X" to "lifespan" and set a value of 2500.

~hint Too chaotic? 🎶

---

If it feels chaotic, adjust one setting at a time: slower spawn rate, lower speed, or shorter lifespan. Keep decisions readable.

hint~

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(2000, function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        let obs = sprites.create(assets.image`trackObstacle`, SpriteKind.Enemy)
        //@highlight
        //@validate-exists
        obs.setPosition(randint(0, 160), 0)
        //@highlight
        //@validate-exists
        obs.vy = 60
        //@highlight
        //@validate-exists
        obs.lifespan = 2500
    }
})
```

## {7. Handle Collisions}

**Recording Mistakes and Their Costs**

---

Collisions aren't just visual — they represent mistakes that cost resources. Tracking each collision and subtracting efficiency creates a direct link between driver precision and system performance. 

Race engineers use telemetry data exactly like this to identify where drivers lose time or damage equipment.

* :paper plane: Open `||sprites:Sprites||` and add the "on sprite of kind Player overlaps otherSprite of kind Player".
* :mouse pointer: Change the overlap event to reflect `Player` vs `Enemy`.
* :mouse pointer: Add an `||logic:if||` block and the `||drivenByStem:current stage is track||` condition.
* :racing car: Inside the `||logic:if||` block, add `||variables:change trackCollisions by 1||` 
* :mouse pointer: Inside the `||logic:if||` block, add `||info:change life by||`. Add `||math:0-0||` to replace the -1 in `||info:change life by||`.
* :mouse pointer: Add the `||variables:efficinecyDrain||` in place of the second 0.
* :paper plane: To destroy the obstacle sprite, add the `||sprites:destroy otherSprite||` to the end of your `||logic:if||` block.

~hint Collisions not working?

---

If collisions don't change life, check that you're subtracting the right variable and that the overlap event targets `Player` vs `Enemy`.

hint~

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        trackCollisions += 1
        //@highlight
        //@validate-exists
        info.changeLifeBy(-efficiencyDrain)
        //@highlight
        //@validate-exists
        otherSprite.destroy()
    }
})
```

## {8. Reward Clean Driving}

**Detecting and Rewarding Consistency**

---

Consistency is as important as speed. This event checks whether collision count changed since the last check. If it didn't, you drove cleanly and earn bonus points. This is how systems recognize patterns — by comparing current state to previous state and rewarding improvement or consistency.

* :game pad: Open `||game:Game||` and add `||game:on game update every 4000 ms||`.
* :racing car: Now's your chance to flex your muscles. If `||variables:trackCollisions||` equals `||variables:lastTrackCollisionCount||`, you need to award `||info:score +2||` and `||variables:Strategy +1||`. Can you do it?
* :paper plane: One more opportunity, set `||variables:lastTrackCollisionCount||` to `||variables:trackCollisions||` so the next check compares fresh data.

~hint Reward logic broken? 🔀

---

If it rewards every time, `lastTrackCollisionCount` probably isn't updating; if it never rewards, double-check your comparison.

hint~

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(4000, function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        if (trackCollisions == lastTrackCollisionCount) {
            //@highlight
            //@validate-exists
            info.changeScoreBy(2)
            //@highlight
            //@validate-exists
            drivenByStem.awardStrategyPoints(1)
        }
        //@highlight
        //@validate-exists
        lastTrackCollisionCount = trackCollisions
    }
})
```

## {9. Save Results}

**Closing the Test Loop**

---

A test session isn't complete until you save the results. This event fires when the countdown ends, storing your score, efficiency, and strategy state so future stages can build on what you learned. Engineers call this "closing the loop" — test, measure, document, move forward.

* :game pad: Open `||info:Info||` and add `||info:on countdown end||`.
* :racing car: Add a condition from `||drivenByStem||` which ensures that the stage is `Track`.
* :racing car: Open `||drivenByStem:Driven by STEM||` and drag `||drivenByStem:save current run results||`.

~hint End message missing? ⏰

---

If the end-of-run message doesn't display, check that your countdown is running and that you added the countdown-end event.

hint~

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    //@highlight
    //@validate-exists
    if (drivenByStem.stageIs(drivenByStem.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        drivenByStem.saveCurrentRunResults()
    }
})
```

## Complete

You just turned a track run into real results. You built obstacle spawners, tracked collisions, connected mistakes to efficiency loss, and saved your data for the next stage. That means you did more than drive the car. You tested your setup and collected evidence about how it performed.

In computer science, events and variables help you turn quick moments in a game into information your code can track and reuse.

In engineering, a test is only useful if you can measure what changed. Every collision affected efficiency, and that gave you real evidence about whether your setup worked well.

In this activity, you worked like a telemetry analyst, race engineer, and controls software engineer.
