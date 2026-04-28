namespace SpriteKind {
    export const TestTrackObstacle = SpriteKind.create()
    export const TestTrackDecoration = SpriteKind.create()
}

namespace drivenByStemSupport {
    const TEST_TRACK_LENGTH_MULTIPLIER = 1
    const TEST_TRACK_DURATION_SECONDS = 60
    const TEST_TRACK_COURSE_DISTANCE = 2800 * TEST_TRACK_LENGTH_MULTIPLIER
    const TEST_TRACK_HORIZON = 80
    const TEST_TRACK_WORLD_Y = -10000
    const TEST_TRACK_END_POS = TEST_TRACK_HORIZON - 4
    const TEST_TRACK_SCALE = -256 * (TEST_TRACK_WORLD_Y / (TEST_TRACK_HORIZON - 5))
    const TEST_TRACK_CAR_SCREEN_X = 80
    const TEST_TRACK_CAR_SCREEN_Y = 110
    const TEST_TRACK_ROAD_BASE_WIDTH = 210
    const TEST_TRACK_CURVE_STRENGTH = 7
    const TEST_TRACK_MAX_OBSTACLES = 5
    const TEST_TRACK_SCORE_DIVISOR = 120
    const TEST_TRACK_MIN_SPEED_CAP = 110
    const TEST_TRACK_MAX_SPEED = 378
    const TEST_TRACK_OFFROAD_DRAG = 200
    const TEST_TRACK_STEER_DRAG = 20
    const TEST_TRACK_ACCELERATION = 50
    const TEST_TRACK_BRAKE_DECELERATION = 90
    const TEST_TRACK_COAST_DECELERATION = 45
    const TEST_TRACK_CANVAS_WIDTH = 160
    const TEST_TRACK_CANVAS_HEIGHT = 120
    const TEST_TRACK_HUD_STRIP_HEIGHT = 20
    const TEST_TRACK_HUD_TEXT_Y = 6
    const TEST_TRACK_CURB_LIGHT_COLOR = 1
    const TEST_TRACK_CURB_DARK_COLOR = 15
    const TEST_TRACK_COLLISION_SPEED_LOSS = 90
    const TEST_TRACK_FALSE_START_PENALTY_MILLISECONDS = 5000
    const TEST_TRACK_GAS_MULTIPLIER = 10
    const TEST_TRACK_MIN_GAS = 30
    const TEST_TRACK_MAX_GAS = 100
    const TEST_TRACK_BASE_GAS_DRAIN = 1.5
    const TEST_TRACK_SPEED_GAS_DIVISOR = 220
    const TEST_TRACK_OFFROAD_GAS_DRAIN = 1.2
    const TEST_TRACK_GAS_BAR_WIDTH = 20
    const TEST_TRACK_GAS_BAR_HEIGHT = 4
    const TEST_TRACK_GAS_BAR_OFFSET = -26
    const TEST_TRACK_GAS_BAR_PADDING = 8
    const TEST_TRACK_MPH_FACTOR = 0.621371
    const TEST_TRACK_SUMMARY_ROUNDING = 10
    const TEST_TRACK_RUN_DURATION_MILLISECONDS = TEST_TRACK_DURATION_SECONDS * 1000
    const TEST_TRACK_HUD_RIGHT_PADDING = 8
    const TEST_TRACK_FUEL_LABEL_X = 8
    const TEST_TRACK_FUEL_LABEL_Y = 6
    const TEST_TRACK_START_LIGHT_COUNT = 5
    const TEST_TRACK_STAGE_WAIT_MILLISECONDS = 2000
    const TEST_TRACK_LIGHT_STEP_MILLISECONDS = 450
    const TEST_TRACK_LIGHT_HOLD_MILLISECONDS = 700
    const TEST_TRACK_GO_FLASH_MILLISECONDS = 650
    const TEST_TRACK_LIGHT_BEEP_FREQUENCY = 784
    const TEST_TRACK_LIGHT_BEEP_DURATION = 90
    const TEST_TRACK_GO_TONE_FREQUENCY = 988
    const TEST_TRACK_GO_TONE_DURATION = 280
    const TEST_TRACK_ENGINE_REV_LOW_FREQUENCY = 196
    const TEST_TRACK_ENGINE_REV_MID_FREQUENCY = 262
    const TEST_TRACK_ENGINE_REV_HIGH_FREQUENCY = 330
    const TEST_TRACK_ENGINE_REV_PEAK_FREQUENCY = 392
    const TEST_TRACK_ENGINE_REV_STEP_DURATION = 120
    const TEST_TRACK_ENGINE_REV_PEAK_DURATION = 180
    const TEST_TRACK_QUICK_REACTION_MILLISECONDS = 400
    const TEST_TRACK_STEADY_REACTION_MILLISECONDS = 800
    const TEST_TRACK_CUSTOM_SPRITE_SWAP_INDEX = 10
    const TEST_TRACK_NEAR_CONE_SWAP_INDEX = 6
    const TEST_TRACK_SKYLINE_BASE_Y = 28
    const TEST_TRACK_SKYLINE_SCROLL_DIVISOR = 48

    const skylineLayerOneWidths = [14, 10, 18, 12, 16, 11, 20, 13, 15, 12]
    const skylineLayerOneHeights = [10, 16, 8, 19, 12, 15, 9, 18, 11, 14]
    const skylineLayerTwoWidths = [11, 16, 9, 14, 12, 18, 10, 15, 13, 17]
    const skylineLayerTwoHeights = [6, 10, 7, 12, 8, 11, 6, 9, 7, 10]

    const scaleByDepth: number[] = []
    const worldZByDepth: number[] = []
    const roadOffsetByDepth: number[] = []
    const tinyConeImage = img`
        4
    `
    const smallConeImage = img`
        . 4 .
        1 4 1
        . 1 .
    `
    const mediumConeImage = img`
        . . 4 . .
        . 4 4 4 .
        1 4 4 4 1
        . 1 1 1 .
        . . 1 . .
    `
    const mediumTrackObstacleImage = img`
        . . . 4 . . .
        . . 4 4 4 . .
        . 4 4 4 4 4 .
        1 4 4 4 4 4 1
        . 1 1 1 1 1 .
        . . 1 1 1 . .
        . . . 1 . . .
    `
    const fallbackConeImage = img`
        . . . . . . . . . . . . . . . .
        . . . . . . 4 4 . . . . . . . .
        . . . . . 4 4 4 4 . . . . . . .
        . . . . . 1 4 4 1 . . . . . . .
        . . . . 1 4 4 4 4 1 . . . . . .
        . . . . 1 4 4 4 4 1 . . . . . .
        . . . . . 1 4 4 1 . . . . . . .
        . . . . . 1 4 4 1 . . . . . . .
        . . . . 1 4 4 4 4 1 . . . . . .
        . . . . 1 4 4 4 4 1 . . . . . .
        . . . 1 4 4 4 4 4 4 1 . . . . .
        . . . 1 4 4 4 4 4 4 1 . . . . .
        . . 1 1 1 1 1 1 1 1 1 1 . . . .
        . . . 1 1 1 1 1 1 1 1 . . . . .
        . . . . 1 1 1 1 1 1 . . . . . .
        . . . . . 1 1 1 1 . . . . . . .
    `

    let hooksInstalled = false
    let trackStarted = false
    let activeTrack: TestTrackState

    class TestTrackObstacleData {
        constructor(public laneOffset: number, public worldZ: number, public variant: number) { }
    }

    class TestTrackState {
        car: Sprite
        carWorldX: number
        maxDriveSpeed: number
        speed: number
        topSpeed: number
        distanceOffset: number
        nextObstacleDistance: number
        segmentDx: number
        previousSegmentDx: number
        segmentPos: number
        elapsedMilliseconds: number
        stagedAtLine: boolean
        starterDelayMilliseconds: number
        starterElapsedMilliseconds: number
        starterLightsAnnounced: number
        reactionTimeMilliseconds: number
        falseStartLocked: boolean
        goFlashMilliseconds: number
        gasBar: StatusBarSprite
        gasRemaining: number
        gasMax: number
        gasDrainBase: number
        collisionCount: number
        displayUnit: string
        raceStarted: boolean
        active: boolean
        obstacles: Sprite[]

        constructor(car: Sprite, maxDriveSpeed: number, gasBar: StatusBarSprite, gasMax: number, gasDrainBase: number, displayUnit: string) {
            this.car = car
            this.carWorldX = 0
            this.maxDriveSpeed = maxDriveSpeed
            this.speed = 0
            this.topSpeed = 0
            this.distanceOffset = 0
            this.nextObstacleDistance = 0
            this.segmentDx = 0
            this.previousSegmentDx = 0
            this.segmentPos = 0
            this.elapsedMilliseconds = 0
            this.stagedAtLine = false
            this.starterDelayMilliseconds = 0
            this.starterElapsedMilliseconds = 0
            this.starterLightsAnnounced = 0
            this.reactionTimeMilliseconds = -1
            this.falseStartLocked = false
            this.goFlashMilliseconds = 0
            this.gasBar = gasBar
            this.gasRemaining = gasMax
            this.gasMax = gasMax
            this.gasDrainBase = gasDrainBase
            this.collisionCount = 0
            this.displayUnit = displayUnit
            this.raceStarted = false
            this.active = true
            this.obstacles = []
        }
    }

    export function startVehicleTestTrack(): void {
        ensureTrackTables()
        ensureHooksInstalled()
        resetTrack()

        const playerCar = ensurePlayerCar()
        const maxDriveSpeed = clampToRange(drivenByStem.savedDriveSpeed() * 3, TEST_TRACK_MIN_SPEED_CAP, TEST_TRACK_MAX_SPEED)
        const gasMax = clampToRange(drivenByStem.savedEfficiency() * TEST_TRACK_GAS_MULTIPLIER, TEST_TRACK_MIN_GAS, TEST_TRACK_MAX_GAS)
        const gasDrainBase = TEST_TRACK_BASE_GAS_DRAIN * Math.max(1, drivenByStem.savedEfficiencyCost())
        const gasBar = createGasBar(gasMax)
        const displayUnit = drivenByStem.speedDisplayUnit()

        controller.moveSprite(playerCar, 0, 0)
        playerCar.setFlag(SpriteFlag.StayInScreen, true)
        playerCar.setPosition(TEST_TRACK_CAR_SCREEN_X, TEST_TRACK_CAR_SCREEN_Y)

        scene.setBackgroundImage(image.create(TEST_TRACK_CANVAS_WIDTH, TEST_TRACK_CANVAS_HEIGHT))
        drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
        info.stopCountdown()
        info.showCountdown(false)
        info.showScore(false)

        activeTrack = new TestTrackState(playerCar, maxDriveSpeed, gasBar, gasMax, gasDrainBase, displayUnit)
        hideCarUntilStage()
        trackStarted = true
    }

    function ensureTrackTables(): void {
        if (scaleByDepth.length > 0) {
            return
        }

        for (let i = 0; i < TEST_TRACK_HORIZON; i++) {
            const worldZ = TEST_TRACK_WORLD_Y / (i - TEST_TRACK_HORIZON)
            scaleByDepth.push((TEST_TRACK_SCALE / worldZ) | 0)
            worldZByDepth.push(worldZ | 0)
            roadOffsetByDepth.push(0)
        }
    }

    function ensurePlayerCar(): Sprite {
        let playerCar = sprites.allOfKind(SpriteKind.Player)[0]
        if (playerCar) {
            return playerCar
        }

        playerCar = sprites.create(defaultPlayerCarImage(), SpriteKind.Player)
        drivenByStem.applySavedCarStyle()
        return playerCar
    }

    function ensureHooksInstalled(): void {
        if (hooksInstalled) {
            return
        }

        hooksInstalled = true

        sprites.onOverlap(SpriteKind.Player, SpriteKind.TestTrackObstacle, function (sprite, otherSprite) {
            if (!(trackIsActive()) || sprite != activeTrack.car) {
                return
            }

            removeObstacle(otherSprite)
            otherSprite.destroy(effects.disintegrate, 200)
            activeTrack.collisionCount += 1
            activeTrack.speed = clampToRange(activeTrack.speed - TEST_TRACK_COLLISION_SPEED_LOSS, 0, TEST_TRACK_MAX_SPEED)
            scene.cameraShake()
        })

        game.onPaint(function () {
            if (!(trackIsActive())) {
                return
            }

            drawTrackFrame()
        })

        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (!(trackIsActive()) || trackHasLaunched() || activeTrack.stagedAtLine) {
                return
            }

            pullCarToStartLine()
        })
    }

    function trackIsActive(): boolean {
        return trackStarted && activeTrack.active && drivenByStem.stageIs(drivenByStem.RaceStage.GarageShakedown)
    }

    function drawTrackFrame(): void {
        const deltaTime = game.eventContext().deltaTime
        let curveAccumulator = 0
        let offRoad = false
        const canvas = scene.backgroundImage()
        if (!canvas) {
            return
        }

        updateStarterSequence(deltaTime)
        const launched = trackHasLaunched()
        const steeringDelta = launched ? controller.dx(30000) : 0
        const accelerating = launched && controller.up.isPressed() && !controller.down.isPressed()
        const braking = launched && controller.down.isPressed() && !controller.up.isPressed()

        if (!launched && !launchInputPressed()) {
            activeTrack.falseStartLocked = false
        }

        if (activeTrack.stagedAtLine && !launched && launchInputPressed() && !activeTrack.falseStartLocked) {
            triggerFalseStart()
            return
        }

        if (launched) {
            captureReactionIfNeeded(steeringDelta, accelerating, braking)
            activeTrack.elapsedMilliseconds += deltaTime * 1000
            activeTrack.carWorldX += 0 - steeringDelta
            activeTrack.distanceOffset += deltaTime * activeTrack.speed

            if (activeTrack.distanceOffset >= activeTrack.nextObstacleDistance && activeTrack.obstacles.length < TEST_TRACK_MAX_OBSTACLES) {
                spawnObstacle()
            }
        }

        canvas.fillRect(0, 0, TEST_TRACK_CANVAS_WIDTH, TEST_TRACK_CANVAS_HEIGHT, 9)
        canvas.fillRect(0, TEST_TRACK_CAR_SCREEN_Y - TEST_TRACK_HORIZON - 2, TEST_TRACK_CANVAS_WIDTH, TEST_TRACK_HORIZON + 20, 6)

        let roadX = activeTrack.carWorldX | 0
        const segmentPosition = activeTrack.segmentPos | 0
        for (let i = 0; i < TEST_TRACK_END_POS; i++) {
            const dx = i < segmentPosition ? activeTrack.previousSegmentDx : activeTrack.segmentDx
            curveAccumulator += dx
            roadX += curveAccumulator
            roadOffsetByDepth[i] = roadX
        }

        const endOffset = 0 - roadOffsetByDepth[TEST_TRACK_END_POS - 1]
        let obstacleIndex = 0
        for (let i = 0; i < TEST_TRACK_END_POS; i++) {
            roadOffsetByDepth[i] += integerDivide(endOffset * i, TEST_TRACK_END_POS)
            while (obstacleIndex < activeTrack.obstacles.length) {
                const obstacle = activeTrack.obstacles[obstacleIndex]
                const data = obstacle.data as TestTrackObstacleData

                if (data.worldZ > activeTrack.distanceOffset + worldZByDepth[i]) {
                    break
                }

                if (i == 0) {
                    obstacle.destroy()
                    activeTrack.obstacles.splice(obstacleIndex, 1)
                } else {
                    positionObstacle(obstacle, data, i)
                    obstacleIndex++
                }
            }
        }

        for (let i = 0; i < TEST_TRACK_END_POS; i++) {
            const y = 120 - i
            const roadWidth = scaleByDepth[i] * TEST_TRACK_ROAD_BASE_WIDTH >> 8
            const roadLeft = ((160 - roadWidth) >> 1) + (roadOffsetByDepth[i] >> 8)
            const sideWidth = 10 * scaleByDepth[i] >> 8

            canvas.fillRect(0, y, 160, 1, 6)
            canvas.fillRect(roadLeft, y, roadWidth, 1, 11)

            if (sideWidth > 0) {
                const sideColor = (worldZByDepth[i] + activeTrack.distanceOffset) & 32 ? TEST_TRACK_CURB_LIGHT_COLOR : TEST_TRACK_CURB_DARK_COLOR
                canvas.fillRect(roadLeft, y, sideWidth, 1, sideColor)
                canvas.fillRect(roadLeft + roadWidth - sideWidth, y, sideWidth, 1, sideColor)
            }

            if (i == 5) {
                if (launched) {
                    offRoad = updateCarPosition(roadLeft, roadWidth, steeringDelta, accelerating, braking)
                } else if (activeTrack.stagedAtLine) {
                    holdCarAtStart()
                } else {
                    hideCarUntilStage()
                }
            }
        }

        if (launched) {
            updateGas(deltaTime, offRoad)
            activeTrack.topSpeed = Math.max(activeTrack.topSpeed, activeTrack.speed)

            if (activeTrack.gasRemaining <= 0) {
                finishTestTrack(false)
                return
            }
        }

        drawHudStrip(canvas)
        drawFuelHudLabel(canvas)
        canvas.printCenter(formatElapsedTime(launched ? activeTrack.elapsedMilliseconds : 0), TEST_TRACK_HUD_TEXT_Y, 1, image.font8)
        drawRightAlignedHudText(canvas, formatSpeed(activeTrack.speed, activeTrack.displayUnit), TEST_TRACK_HUD_TEXT_Y)
        drawStarterOverlay(canvas)

        if (launched && activeTrack.distanceOffset >= TEST_TRACK_COURSE_DISTANCE) {
            finishTestTrack(true)
            return
        }

        if (launched && activeTrack.elapsedMilliseconds >= TEST_TRACK_RUN_DURATION_MILLISECONDS) {
            finishTestTrack(false)
            return
        }

        if (launched) {
            activeTrack.segmentPos += -0.003 * activeTrack.speed
            if (activeTrack.segmentPos < 0) {
                activeTrack.previousSegmentDx = activeTrack.segmentDx
                activeTrack.segmentPos = TEST_TRACK_HORIZON
                activeTrack.segmentDx = nextCurve()
            }
        }
    }

    function updateStarterSequence(deltaTime: number): void {
        if (trackHasLaunched()) {
            activeTrack.goFlashMilliseconds = Math.max(0, activeTrack.goFlashMilliseconds - deltaTime * 1000)
            return
        }

        if (!activeTrack.stagedAtLine) {
            return
        }

        if (activeTrack.starterDelayMilliseconds > 0) {
            activeTrack.starterDelayMilliseconds = Math.max(0, activeTrack.starterDelayMilliseconds - deltaTime * 1000)
            if (activeTrack.starterDelayMilliseconds > 0) {
                return
            }
        }

        activeTrack.starterElapsedMilliseconds += deltaTime * 1000
        const lightsOn = Math.min(TEST_TRACK_START_LIGHT_COUNT, integerDivide(activeTrack.starterElapsedMilliseconds, TEST_TRACK_LIGHT_STEP_MILLISECONDS))
        if (lightsOn > activeTrack.starterLightsAnnounced) {
            activeTrack.starterLightsAnnounced = lightsOn
            playStarterBeep()
        }

        if (activeTrack.starterElapsedMilliseconds >= starterDurationMilliseconds()) {
            launchTrackRun()
        }
    }

    function starterDurationMilliseconds(): number {
        return TEST_TRACK_START_LIGHT_COUNT * TEST_TRACK_LIGHT_STEP_MILLISECONDS + TEST_TRACK_LIGHT_HOLD_MILLISECONDS
    }

    function launchTrackRun(): void {
        activeTrack.raceStarted = true
        activeTrack.speed = 0
        activeTrack.topSpeed = 0
        activeTrack.goFlashMilliseconds = TEST_TRACK_GO_FLASH_MILLISECONDS
        playGoTone()
    }

    function pullCarToStartLine(): void {
        activeTrack.falseStartLocked = false
        activeTrack.car.setFlag(SpriteFlag.Invisible, false)
        holdCarAtStart()
        restartStarterSequence()
    }

    function restartStarterSequence(): void {
        activeTrack.stagedAtLine = true
        activeTrack.raceStarted = false
        activeTrack.speed = 0
        activeTrack.topSpeed = 0
        activeTrack.goFlashMilliseconds = 0
        activeTrack.starterDelayMilliseconds = TEST_TRACK_STAGE_WAIT_MILLISECONDS
        activeTrack.starterElapsedMilliseconds = 0
        activeTrack.starterLightsAnnounced = 0
        activeTrack.car.setFlag(SpriteFlag.Invisible, false)
        holdCarAtStart()
        playEngineRev()
    }

    function playStarterBeep(): void {
        control.runInParallel(function () {
            music.playTone(TEST_TRACK_LIGHT_BEEP_FREQUENCY, TEST_TRACK_LIGHT_BEEP_DURATION)
        })
    }

    function playGoTone(): void {
        control.runInParallel(function () {
            music.playTone(TEST_TRACK_GO_TONE_FREQUENCY, TEST_TRACK_GO_TONE_DURATION)
        })
    }

    function playEngineRev(): void {
        control.runInParallel(function () {
            music.playTone(TEST_TRACK_ENGINE_REV_LOW_FREQUENCY, TEST_TRACK_ENGINE_REV_STEP_DURATION)
            music.playTone(TEST_TRACK_ENGINE_REV_MID_FREQUENCY, TEST_TRACK_ENGINE_REV_STEP_DURATION)
            music.playTone(TEST_TRACK_ENGINE_REV_HIGH_FREQUENCY, TEST_TRACK_ENGINE_REV_STEP_DURATION)
            music.playTone(TEST_TRACK_ENGINE_REV_PEAK_FREQUENCY, TEST_TRACK_ENGINE_REV_PEAK_DURATION)
        })
    }

    function captureReactionIfNeeded(steeringDelta: number, accelerating: boolean, braking: boolean): void {
        if (activeTrack.reactionTimeMilliseconds >= 0) {
            return
        }

        if (steeringDelta != 0 || accelerating || braking) {
            activeTrack.reactionTimeMilliseconds = activeTrack.elapsedMilliseconds
        }
    }

    function drawStarterOverlay(canvas: Image): void {
        if (!(trackIsActive())) {
            return
        }

        if (!activeTrack.stagedAtLine) {
            drawStagePrompt(canvas)
            return
        }

        if (!trackHasLaunched() && activeTrack.starterDelayMilliseconds > 0) {
            return
        }

        if (trackHasLaunched() && activeTrack.goFlashMilliseconds <= 0) {
            return
        }

        const gantryX = 34
        const gantryY = 28
        const lightY = gantryY + 5
        const launched = trackHasLaunched()
        const lightsOn = launched
            ? TEST_TRACK_START_LIGHT_COUNT
            : Math.min(TEST_TRACK_START_LIGHT_COUNT, integerDivide(activeTrack.starterElapsedMilliseconds, TEST_TRACK_LIGHT_STEP_MILLISECONDS))

        canvas.fillRect(gantryX, gantryY, 92, 20, 15)
        canvas.fillRect(gantryX + 2, gantryY + 2, 88, 16, 12)

        for (let i = 0; i < TEST_TRACK_START_LIGHT_COUNT; i++) {
            const lightX = gantryX + 8 + i * 16
            const lightColor = i < lightsOn ? (launched ? 7 : 2) : 1

            canvas.fillRect(lightX - 1, lightY - 1, 10, 10, 15)
            canvas.fillRect(lightX, lightY, 8, 8, lightColor)
        }

        if (launched) {
            canvas.print("GO!", gantryX + 34, gantryY + 12, 7)
        } else {
            canvas.print("Ready", gantryX + 28, gantryY + 12, 1)
        }
    }

    function drawStagePrompt(canvas: Image): void {
        const promptX = 40
        const promptY = 27
        const promptInnerWidth = 76
        const font = image.font8
        const pressAX = promptX + 2 + ((promptInnerWidth - "Press A".length * font.charWidth) >> 1)
        const toStageX = promptX + 2 + ((promptInnerWidth - "to Stage".length * font.charWidth) >> 1)
        canvas.fillRect(promptX, promptY, 80, 20, 15)
        canvas.fillRect(promptX + 2, promptY + 2, 76, 16, 12)
        canvas.print("Press A", pressAX, promptY + 2, 1, font)
        canvas.print("to Stage", toStageX, promptY + 10, 1, font)
    }

    function holdCarAtStart(): void {
        activeTrack.car.x = TEST_TRACK_CAR_SCREEN_X
        activeTrack.car.y = TEST_TRACK_CAR_SCREEN_Y
    }

    function hideCarUntilStage(): void {
        activeTrack.car.setFlag(SpriteFlag.Invisible, true)
    }

    function launchInputPressed(): boolean {
        return controller.up.isPressed()
            || controller.down.isPressed()
            || controller.left.isPressed()
            || controller.right.isPressed()
    }

    function triggerFalseStart(): void {
        if (!(trackIsActive()) || trackHasLaunched() || activeTrack.falseStartLocked) {
            return
        }

        activeTrack.falseStartLocked = true
        activeTrack.elapsedMilliseconds += TEST_TRACK_FALSE_START_PENALTY_MILLISECONDS
        scene.cameraShake(2, 200)
        game.splash("False start", "+5.0 s penalty")
        restartStarterSequence()
    }

    function drawHudStrip(canvas: Image): void {
        canvas.fillRect(0, 0, TEST_TRACK_CANVAS_WIDTH, TEST_TRACK_HUD_STRIP_HEIGHT, 12)
        canvas.fillRect(0, TEST_TRACK_HUD_STRIP_HEIGHT - 1, TEST_TRACK_CANVAS_WIDTH, 1, 15)
    }

    function drawFuelHudLabel(canvas: Image): void {
        canvas.print("FUEL", TEST_TRACK_FUEL_LABEL_X, TEST_TRACK_FUEL_LABEL_Y, 1, image.font8)
    }

    function drawRightAlignedHudText(canvas: Image, text: string, y: number): void {
        const font = image.font8
        const x = TEST_TRACK_CANVAS_WIDTH - TEST_TRACK_HUD_RIGHT_PADDING - text.length * font.charWidth
        canvas.print(text, x, y, 1, font)
    }

    function drawCityScape(canvas: Image): void {
        const skylineBaseY = TEST_TRACK_SKYLINE_BASE_Y
        const farOffset = skylineOffset(TEST_TRACK_SKYLINE_SCROLL_DIVISOR)
        const nearOffset = skylineOffset(TEST_TRACK_SKYLINE_SCROLL_DIVISOR >> 1)

        canvas.fillRect(0, skylineBaseY - 2, TEST_TRACK_CANVAS_WIDTH, 2, 1)
        drawSkylineLayer(canvas, skylineLayerTwoWidths, skylineLayerTwoHeights, skylineBaseY, farOffset, 8)
        drawSkylineLayer(canvas, skylineLayerOneWidths, skylineLayerOneHeights, skylineBaseY, nearOffset, 1)
    }

    function drawSkylineLayer(canvas: Image, widths: number[], heights: number[], baseY: number, offset: number, color: number): void {
        let x = 0 - offset
        let index = 0

        while (x < TEST_TRACK_CANVAS_WIDTH) {
            const width = widths[index]
            const height = heights[index]
            const roofX = x + (width >> 1) - 1

            canvas.fillRect(x, baseY - height, width, height, color)
            if (height >= 10) {
                canvas.fillRect(roofX, baseY - height - 3, 2, 3, color)
            }

            x += width + 3
            index = (index + 1) % widths.length
        }
    }

    function skylineOffset(divisor: number): number {
        if (!activeTrack || divisor <= 0) {
            return 0
        }

        let offset = integerDivide(Math.abs(activeTrack.carWorldX), divisor)
        while (offset >= TEST_TRACK_CANVAS_WIDTH) {
            offset -= TEST_TRACK_CANVAS_WIDTH
        }
        return offset
    }

    function spawnObstacle(): void {
        const obstacle = sprites.create(smallConeImage, SpriteKind.TestTrackObstacle)
        obstacle.data = new TestTrackObstacleData(randint(-30, 30), worldZByDepth[TEST_TRACK_END_POS - 1] + activeTrack.distanceOffset, randint(0, 2))
        activeTrack.obstacles.push(obstacle)
        activeTrack.nextObstacleDistance = activeTrack.distanceOffset + randint(300, 420)
    }

    function positionObstacle(obstacle: Sprite, data: TestTrackObstacleData, index: number): void {
        const size = Math.max(1, scaleByDepth[index] * 20 >> 8)
        obstacle.y = 120 - index
        obstacle.x = (roadOffsetByDepth[index] >> 8) + 80 + (scaleByDepth[index] * data.laneOffset >> 8)
        obstacle.setImage(pickObstacleImage(size, data.variant, index))
    }

    function createGasBar(gasMax: number): StatusBarSprite {
        const gasBar = statusbars.create(TEST_TRACK_GAS_BAR_WIDTH, TEST_TRACK_GAS_BAR_HEIGHT, StatusBarKind.Energy)
        gasBar.max = gasMax
        gasBar.value = gasMax
        gasBar.setBarBorder(1, 1)
        gasBar.positionDirection(CollisionDirection.Top)
        gasBar.setOffsetPadding(TEST_TRACK_GAS_BAR_OFFSET, TEST_TRACK_GAS_BAR_PADDING)
        return gasBar
    }

    function pickObstacleImage(size: number, variant: number, index: number): Image {
        if (size <= tinyConeImage.width) {
            return tinyConeImage
        }

        if (index > TEST_TRACK_CUSTOM_SPRITE_SWAP_INDEX || size <= smallConeImage.width) {
            return smallConeImage
        }

        if (index > TEST_TRACK_NEAR_CONE_SWAP_INDEX || size <= mediumConeImage.width) {
            return mediumConeImage
        }

        const obstacleOptions = [garageConeImage(), rainPuddleImage(), trackObstacleImage()]
        return obstacleOptions[clampToRange(variant, 0, obstacleOptions.length - 1)]
    }

    function garageConeImage(): Image {
        const cone = assets.image`garageCone`
        return cone ? cone : fallbackConeImage
    }

    function rainPuddleImage(): Image {
        const puddle = assets.image`rainPuddle`
        return puddle ? puddle : trackObstacleImage()
    }

    function trackObstacleImage(): Image {
        const obstacle = assets.image`trackObstacle`
        return obstacle ? obstacle : garageConeImage()
    }

    function finishBannerImage(): Image {
        const banner = assets.image`finishBanner`
        return banner ? banner : fallbackFinishBannerImage()
    }

    function finishTestTrack(completedCourse: boolean): void {
        if (!(trackIsActive())) {
            return
        }

        const performanceResult = Math.max(0, integerDivide(activeTrack.distanceOffset, TEST_TRACK_SCORE_DIVISOR))
        if (completedCourse && activeTrack.collisionCount <= 1) {
            drivenByStem.awardStrategyPoints(1)
        }

        info.stopCountdown()
        info.showCountdown(false)
        info.showScore(false)
        drivenByStem.saveSupportRunResults(
            performanceResult,
            roundToTenth(activeTrack.gasRemaining),
            roundToTenth(activeTrack.elapsedMilliseconds / 1000),
            reactionSeconds(),
            roundToTenth(convertSpeedValue(activeTrack.topSpeed, activeTrack.displayUnit)),
            activeTrack.displayUnit,
            activeTrack.collisionCount
        )

        const summary = buildEfficiencyReport(completedCourse)
        clearObstacles()
        activeTrack.gasBar.destroy()
        activeTrack.active = false
        trackStarted = false

        showFinishBanner(summary)
        if (drivenByStem.hasSavedTestComparison()) {
            drivenByStem.showSavedTestComparison()
        }
    }

    function buildEfficiencyReport(completedCourse: boolean): string {
        const elapsedSeconds = roundToTenth(activeTrack.elapsedMilliseconds / 1000)
        const gasBurned = Math.max(0, roundToTenth(activeTrack.gasMax - activeTrack.gasRemaining))
        const averageSpeed = elapsedSeconds > 0 ? activeTrack.distanceOffset / elapsedSeconds : 0
        const reportTitle = completedCourse ? "Your Efficiency Report" : "Run report"
        const courseLine = completedCourse ? "Course completed!" : "Course not finished"

        return reportTitle
            + "\n" + courseLine
            + "\n- Time: " + elapsedSeconds + " s"
            + "\n- Reaction: " + reactionSummary(activeTrack.reactionTimeMilliseconds)
            + "\n- Top speed: " + formatSpeed(activeTrack.topSpeed, activeTrack.displayUnit)
            + "\n- Avg speed: " + formatSpeed(averageSpeed, activeTrack.displayUnit)
            + "\n- Gas burned: " + drivenByStem.formatFuelAmount(gasBurned)
            + "\n- Crashes: " + activeTrack.collisionCount
    }

    function showFinishBanner(summary: string): void {
        const banner = sprites.create(finishBannerImage(), SpriteKind.TestTrackDecoration)
        banner.setFlag(SpriteFlag.RelativeToCamera, true)
        banner.setPosition(80, 20)
        banner.z = scene.HUD_Z - 2
        drivenByStem.showResultsDialog(summary)
        banner.destroy()
    }

    function formatElapsedTime(elapsedMilliseconds: number): string {
        return roundToTenth(elapsedMilliseconds / 1000) + " s"
    }

    function formatSpeed(baseSpeed: number, unit: string): string {
        return roundToTenth(convertSpeedValue(baseSpeed, unit)) + " " + unit
    }

    function convertSpeedValue(baseSpeed: number, unit: string): number {
        if (unit == "mph") {
            return baseSpeed * TEST_TRACK_MPH_FACTOR
        }

        return baseSpeed
    }

    function roundToTenth(value: number): number {
        return Math.round(value * TEST_TRACK_SUMMARY_ROUNDING) / TEST_TRACK_SUMMARY_ROUNDING
    }

    function reactionSeconds(): number {
        if (activeTrack.reactionTimeMilliseconds < 0) {
            return -1
        }

        return roundToTenth(activeTrack.reactionTimeMilliseconds / 1000)
    }

    function formatReactionTime(reactionMilliseconds: number): string {
        if (reactionMilliseconds < 0) {
            return "no input"
        }

        return roundToTenth(reactionMilliseconds / 1000) + " s"
    }

    function reactionSummary(reactionMilliseconds: number): string {
        if (reactionMilliseconds < 0) {
            return "No launch input"
        }

        return reactionLabel(reactionMilliseconds) + " (" + formatReactionTime(reactionMilliseconds) + ")"
    }

    function reactionLabel(reactionMilliseconds: number): string {
        if (reactionMilliseconds <= TEST_TRACK_QUICK_REACTION_MILLISECONDS) {
            return "Quick start"
        }

        if (reactionMilliseconds <= TEST_TRACK_STEADY_REACTION_MILLISECONDS) {
            return "Steady start"
        }

        return "Late start"
    }

    function fallbackFinishBannerImage(): Image {
        return img`
            . . . . . . . . . . . . . . . .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . 1 f f f f f f f f f f f f 1 .
            . 1 f 5 5 5 5 5 5 5 5 5 5 f 1 .
            . 1 f 5 1 1 1 1 1 1 1 1 5 f 1 .
            . 1 f 5 1 f f f f f f 1 5 f 1 .
            . 1 f 5 1 f 5 5 5 5 f 1 5 f 1 .
            . 1 f 5 1 f 5 1 1 5 f 1 5 f 1 .
            . 1 f 5 1 f 5 5 5 5 f 1 5 f 1 .
            . 1 f 5 1 f f f f f f 1 5 f 1 .
            . 1 f 5 1 1 1 1 1 1 1 1 5 f 1 .
            . 1 f 5 5 5 5 5 5 5 5 5 5 f 1 .
            . 1 f f f f f f f f f f f f 1 .
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `
    }

    function updateCarPosition(roadLeft: number, roadWidth: number, steeringDelta: number, accelerating: boolean, braking: boolean): boolean {
        let offRoad = false
        if (TEST_TRACK_CAR_SCREEN_X < roadLeft || TEST_TRACK_CAR_SCREEN_X > roadLeft + roadWidth) {
            offRoad = true
            activeTrack.car.x = TEST_TRACK_CAR_SCREEN_X + randint(-1, 1)
            activeTrack.car.y = TEST_TRACK_CAR_SCREEN_Y + randint(-1, 1)
        } else {
            activeTrack.car.x = TEST_TRACK_CAR_SCREEN_X
            activeTrack.car.y = TEST_TRACK_CAR_SCREEN_Y
        }

        let speedChange = 0
        if (accelerating) {
            speedChange += TEST_TRACK_ACCELERATION * game.eventContext().deltaTime
        } else if (braking) {
            speedChange -= TEST_TRACK_BRAKE_DECELERATION * game.eventContext().deltaTime
        } else {
            speedChange -= TEST_TRACK_COAST_DECELERATION * game.eventContext().deltaTime
        }

        if (steeringDelta != 0) {
            speedChange -= TEST_TRACK_STEER_DRAG * game.eventContext().deltaTime
        }

        if (offRoad) {
            speedChange -= TEST_TRACK_OFFROAD_DRAG * game.eventContext().deltaTime
        }

        const maximumTrackSpeed = activeTrack.gasRemaining > 0 ? activeTrack.maxDriveSpeed : 0
        activeTrack.speed = clampToRange(activeTrack.speed + speedChange, 0, maximumTrackSpeed)
        return offRoad
    }

    function updateGas(deltaTime: number, offRoad: boolean): void {
        const gasDrain = activeTrack.gasDrainBase + activeTrack.speed / TEST_TRACK_SPEED_GAS_DIVISOR + (offRoad ? TEST_TRACK_OFFROAD_GAS_DRAIN : 0)
        activeTrack.gasRemaining = Math.max(0, activeTrack.gasRemaining - gasDrain * deltaTime)
        activeTrack.gasBar.value = activeTrack.gasRemaining | 0

        if (activeTrack.gasRemaining <= 0) {
            activeTrack.speed = Math.max(0, activeTrack.speed - TEST_TRACK_OFFROAD_DRAG * deltaTime)
        }
    }

    function nextCurve(): number {
        return (randint(0, 2) - 1) * TEST_TRACK_CURVE_STRENGTH
    }

    function removeObstacle(target: Sprite): void {
        if (!activeTrack) {
            return
        }

        const obstacleIndex = activeTrack.obstacles.indexOf(target)
        if (obstacleIndex >= 0) {
            activeTrack.obstacles.splice(obstacleIndex, 1)
        }
    }

    function clearObstacles(): void {
        if (!activeTrack) {
            return
        }

        for (let obstacle of activeTrack.obstacles) {
            obstacle.destroy()
        }
        activeTrack.obstacles = []
    }

    function resetTrack(): void {
        if (trackStarted) {
            activeTrack.active = false
            activeTrack.car.setFlag(SpriteFlag.Invisible, false)
            clearObstacles()
            activeTrack.gasBar.destroy()
        }
        trackStarted = false
        info.stopCountdown()
        info.showCountdown(false)
        info.showScore(false)

        for (let obstacle of sprites.allOfKind(SpriteKind.TestTrackObstacle)) {
            obstacle.destroy()
        }
        for (let decoration of sprites.allOfKind(SpriteKind.TestTrackDecoration)) {
            decoration.destroy()
        }
    }

    function trackHasLaunched(): boolean {
        return !!activeTrack && activeTrack.raceStarted
    }

    function clampToRange(value: number, minValue: number, maxValue: number): number {
        return Math.max(minValue, Math.min(maxValue, value))
    }

    function integerDivide(dividend: number, divisor: number): number {
        return (dividend / divisor) | 0
    }

    function defaultPlayerCarImage(): Image {
        const playerCar = assets.image`playerCar`
        if (playerCar) {
            return playerCar
        }

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