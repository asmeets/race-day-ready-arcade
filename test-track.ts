namespace SpriteKind {
    export const TestTrackObstacle = SpriteKind.create()
    export const TestTrackDecoration = SpriteKind.create()
}

namespace drivenByStemSupport {
    const TEST_TRACK_DURATION_SECONDS = 15
    const TEST_TRACK_COURSE_DISTANCE = 2800
    const TEST_TRACK_HORIZON = 80
    const TEST_TRACK_WORLD_Y = -10000
    const TEST_TRACK_END_POS = TEST_TRACK_HORIZON - 4
    const TEST_TRACK_SCALE = -256 * (TEST_TRACK_WORLD_Y / (TEST_TRACK_HORIZON - 5))
    const TEST_TRACK_CAR_SCREEN_X = 80
    const TEST_TRACK_CAR_SCREEN_Y = 110
    const TEST_TRACK_CURVE_STRENGTH = 7
    const TEST_TRACK_MAX_OBSTACLES = 5
    const TEST_TRACK_SCORE_DIVISOR = 120
    const TEST_TRACK_MIN_SPEED = 70
    const TEST_TRACK_MAX_SPEED = 500
    const TEST_TRACK_OFFROAD_DRAG = 200
    const TEST_TRACK_STEER_DRAG = 20
    const TEST_TRACK_STRAIGHT_ACCELERATION = 50
    const TEST_TRACK_CANVAS_WIDTH = 160
    const TEST_TRACK_CANVAS_HEIGHT = 120
    const TEST_TRACK_COLLISION_SPEED_LOSS = 90
    const TEST_TRACK_GAS_MULTIPLIER = 10
    const TEST_TRACK_MIN_GAS = 30
    const TEST_TRACK_BASE_GAS_DRAIN = 1.5
    const TEST_TRACK_SPEED_GAS_DIVISOR = 220
    const TEST_TRACK_OFFROAD_GAS_DRAIN = 1.2
    const TEST_TRACK_GAS_BAR_WIDTH = 28
    const TEST_TRACK_GAS_BAR_HEIGHT = 4
    const TEST_TRACK_GAS_BAR_OFFSET = 46
    const TEST_TRACK_MPH_FACTOR = 0.621371
    const TEST_TRACK_SUMMARY_ROUNDING = 10
    const TEST_TRACK_START_LIGHT_COUNT = 5
    const TEST_TRACK_LIGHT_STEP_MILLISECONDS = 450
    const TEST_TRACK_LIGHT_HOLD_MILLISECONDS = 700
    const TEST_TRACK_GO_FLASH_MILLISECONDS = 650

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
        constructor(public laneOffset: number, public worldZ: number) { }
    }

    class TestTrackState {
        car: Sprite
        carWorldX: number
        launchSpeed: number
        speed: number
        topSpeed: number
        distanceOffset: number
        nextObstacleDistance: number
        segmentDx: number
        previousSegmentDx: number
        segmentPos: number
        elapsedMilliseconds: number
        starterElapsedMilliseconds: number
        reactionTimeMilliseconds: number
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

        constructor(car: Sprite, launchSpeed: number, gasBar: StatusBarSprite, gasMax: number, gasDrainBase: number, displayUnit: string) {
            this.car = car
            this.carWorldX = 0
            this.launchSpeed = launchSpeed
            this.speed = 0
            this.topSpeed = 0
            this.distanceOffset = 0
            this.nextObstacleDistance = 0
            this.segmentDx = 0
            this.previousSegmentDx = 0
            this.segmentPos = 0
            this.elapsedMilliseconds = 0
            this.starterElapsedMilliseconds = 0
            this.reactionTimeMilliseconds = -1
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
        const launchSpeed = clampToRange(drivenByStem.savedDriveSpeed() * 3, TEST_TRACK_MIN_SPEED + 40, TEST_TRACK_MAX_SPEED - 80)
        const gasMax = Math.max(TEST_TRACK_MIN_GAS, drivenByStem.savedEfficiency() * TEST_TRACK_GAS_MULTIPLIER)
        const gasDrainBase = TEST_TRACK_BASE_GAS_DRAIN * Math.max(1, drivenByStem.savedEfficiencyCost())
        const gasBar = createGasBar(gasMax)
        const displayUnit = drivenByStem.speedDisplayUnit()

        controller.moveSprite(playerCar, 0, 0)
        playerCar.setFlag(SpriteFlag.StayInScreen, true)
        playerCar.setPosition(TEST_TRACK_CAR_SCREEN_X, TEST_TRACK_CAR_SCREEN_Y)

        scene.setBackgroundImage(image.create(TEST_TRACK_CANVAS_WIDTH, TEST_TRACK_CANVAS_HEIGHT))
        drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
        info.stopCountdown()

        activeTrack = new TestTrackState(playerCar, launchSpeed, gasBar, gasMax, gasDrainBase, displayUnit)
        trackStarted = true

        info.setScore(0)
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

        info.onCountdownEnd(function () {
            if (!(trackIsActive())) {
                return
            }

            finishTestTrack(false)
        })

        game.onPaint(function () {
            if (!(trackIsActive())) {
                return
            }

            drawTrackFrame()
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

        if (launched) {
            captureReactionIfNeeded(steeringDelta)
            activeTrack.elapsedMilliseconds += deltaTime * 1000
            activeTrack.carWorldX += 0 - steeringDelta
            activeTrack.distanceOffset += (deltaTime * activeTrack.speed) | 0

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
            if (i == 40) {
                activeTrack.carWorldX += 30 * dx
            }
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
            const roadWidth = scaleByDepth[i] * 140 >> 8
            const roadLeft = ((160 - roadWidth) >> 1) + (roadOffsetByDepth[i] >> 8)
            const sideWidth = 10 * scaleByDepth[i] >> 8

            canvas.fillRect(0, y, 160, 1, 6)
            canvas.fillRect(roadLeft, y, roadWidth, 1, 11)

            if (sideWidth > 0) {
                const sideColor = (worldZByDepth[i] + activeTrack.distanceOffset) & 32 ? 1 : 2
                canvas.fillRect(roadLeft, y, sideWidth, 1, sideColor)
                canvas.fillRect(roadLeft + roadWidth - sideWidth, y, sideWidth, 1, sideColor)
            }

            if (i == 5) {
                if (launched) {
                    offRoad = updateCarPosition(roadLeft, roadWidth, steeringDelta)
                } else {
                    holdCarAtStart()
                }
            }
        }

        if (launched) {
            updateGas(deltaTime, offRoad)
            activeTrack.topSpeed = Math.max(activeTrack.topSpeed, activeTrack.speed)
            info.setScore(Math.max(0, integerDivide(activeTrack.distanceOffset, TEST_TRACK_SCORE_DIVISOR)))
        } else {
            info.setScore(0)
        }

        canvas.print(formatSpeed(activeTrack.speed, activeTrack.displayUnit), 96, 15, 1)
        drawStarterOverlay(canvas)

        if (launched && activeTrack.distanceOffset >= TEST_TRACK_COURSE_DISTANCE) {
            finishTestTrack(true)
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

        activeTrack.starterElapsedMilliseconds += deltaTime * 1000
        if (activeTrack.starterElapsedMilliseconds >= starterDurationMilliseconds()) {
            launchTrackRun()
        }
    }

    function starterDurationMilliseconds(): number {
        return TEST_TRACK_START_LIGHT_COUNT * TEST_TRACK_LIGHT_STEP_MILLISECONDS + TEST_TRACK_LIGHT_HOLD_MILLISECONDS
    }

    function launchTrackRun(): void {
        activeTrack.raceStarted = true
        activeTrack.speed = activeTrack.launchSpeed
        activeTrack.topSpeed = activeTrack.launchSpeed
        activeTrack.goFlashMilliseconds = TEST_TRACK_GO_FLASH_MILLISECONDS
        info.startCountdown(TEST_TRACK_DURATION_SECONDS)
    }

    function captureReactionIfNeeded(steeringDelta: number): void {
        if (activeTrack.reactionTimeMilliseconds >= 0) {
            return
        }

        if (steeringDelta != 0 || controller.dy(30000) != 0) {
            activeTrack.reactionTimeMilliseconds = activeTrack.elapsedMilliseconds
        }
    }

    function drawStarterOverlay(canvas: Image): void {
        if (!(trackIsActive()) || trackHasLaunched() && activeTrack.goFlashMilliseconds <= 0) {
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

    function holdCarAtStart(): void {
        activeTrack.car.x = TEST_TRACK_CAR_SCREEN_X
        activeTrack.car.y = TEST_TRACK_CAR_SCREEN_Y
    }

    function spawnObstacle(): void {
        const obstacle = sprites.create(trackObstacleImage(), SpriteKind.TestTrackObstacle)
        obstacle.data = new TestTrackObstacleData(randint(-30, 30), worldZByDepth[TEST_TRACK_END_POS - 1] + activeTrack.distanceOffset)
        activeTrack.obstacles.push(obstacle)
        activeTrack.nextObstacleDistance = activeTrack.distanceOffset + randint(300, 420)
    }

    function positionObstacle(obstacle: Sprite, data: TestTrackObstacleData, index: number): void {
        const size = Math.max(1, scaleByDepth[index] * 20 >> 8)
        obstacle.y = 120 - index
        obstacle.x = (roadOffsetByDepth[index] >> 8) + 80 + (scaleByDepth[index] * data.laneOffset >> 8)
        obstacle.setImage(pickObstacleImage(size))
    }

    function createGasBar(gasMax: number): StatusBarSprite {
        const gasBar = statusbars.create(TEST_TRACK_GAS_BAR_WIDTH, TEST_TRACK_GAS_BAR_HEIGHT, StatusBarKind.Energy)
        gasBar.max = gasMax
        gasBar.value = gasMax
        gasBar.setLabel("GAS", 1)
        gasBar.setBarBorder(1, 1)
        gasBar.positionDirection(CollisionDirection.Top)
        gasBar.setOffsetPadding(TEST_TRACK_GAS_BAR_OFFSET, 2)
        return gasBar
    }

    function pickObstacleImage(size: number): Image {
        if (size <= tinyConeImage.width) {
            return tinyConeImage
        }

        if (size <= smallConeImage.width) {
            return smallConeImage
        }

        if (size <= mediumConeImage.width) {
            return mediumConeImage
        }

        if (size <= mediumTrackObstacleImage.width) {
            return mediumTrackObstacleImage
        }

        const obstacleOptions = [garageConeImage(), rainPuddleImage(), trackObstacleImage()]
        return obstacleOptions[randint(0, obstacleOptions.length - 1)]
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

        info.setScore(performanceResult)
        info.stopCountdown()
        drivenByStem.saveSupportRunResults(
            performanceResult,
            activeTrack.gasRemaining | 0,
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
        const gasLeft = Math.max(0, roundToTenth(activeTrack.gasRemaining))
        const averageSpeed = elapsedSeconds > 0 ? activeTrack.distanceOffset / elapsedSeconds : 0
        const reportTitle = completedCourse ? "Efficiency report" : "Run report"
        const courseLine = completedCourse ? "Course complete" : "Course not finished"

        return reportTitle
            + "\n" + courseLine
            + "\nTime: " + elapsedSeconds + " s"
            + "\nReaction: " + formatReactionTime(activeTrack.reactionTimeMilliseconds)
            + "\nTop speed: " + formatSpeed(activeTrack.topSpeed, activeTrack.displayUnit)
            + "\nAvg speed: " + formatSpeed(averageSpeed, activeTrack.displayUnit)
            + "\nGas burned: " + gasBurned
            + "\nGas left: " + gasLeft
            + "\nHits: " + activeTrack.collisionCount
    }

    function showFinishBanner(summary: string): void {
        const banner = sprites.create(finishBannerImage(), SpriteKind.TestTrackDecoration)
        banner.setFlag(SpriteFlag.RelativeToCamera, true)
        banner.setPosition(80, 20)
        banner.z = scene.HUD_Z - 2
        game.showLongText(summary, DialogLayout.Full)
        banner.destroy()
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

    function updateCarPosition(roadLeft: number, roadWidth: number, steeringDelta: number): boolean {
        let offRoad = false
        if (TEST_TRACK_CAR_SCREEN_X < roadLeft || TEST_TRACK_CAR_SCREEN_X > roadLeft + roadWidth) {
            offRoad = true
            activeTrack.car.x = TEST_TRACK_CAR_SCREEN_X + randint(-1, 1)
            activeTrack.car.y = TEST_TRACK_CAR_SCREEN_Y + randint(-1, 1)
            activeTrack.speed -= TEST_TRACK_OFFROAD_DRAG * game.eventContext().deltaTime
        } else {
            activeTrack.car.x = TEST_TRACK_CAR_SCREEN_X
            activeTrack.car.y = TEST_TRACK_CAR_SCREEN_Y
            if (steeringDelta == 0) {
                activeTrack.speed += TEST_TRACK_STRAIGHT_ACCELERATION * game.eventContext().deltaTime
            } else {
                activeTrack.speed -= TEST_TRACK_STEER_DRAG * game.eventContext().deltaTime
            }
        }

        const minimumTrackSpeed = activeTrack.gasRemaining > 0 ? TEST_TRACK_MIN_SPEED : 0
        activeTrack.speed = clampToRange(activeTrack.speed, minimumTrackSpeed, TEST_TRACK_MAX_SPEED)
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
            clearObstacles()
            activeTrack.gasBar.destroy()
        }
        trackStarted = false
        info.stopCountdown()

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