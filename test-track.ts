namespace SpriteKind {
    export const TestTrackObstacle = SpriteKind.create()
}

namespace drivenByStemSupport {
    const TEST_TRACK_DURATION_SECONDS = 15
    const TEST_TRACK_HORIZON = 80
    const TEST_TRACK_WORLD_Y = -10000
    const TEST_TRACK_END_POS = TEST_TRACK_HORIZON - 4
    const TEST_TRACK_SCALE = -256 * (TEST_TRACK_WORLD_Y / (TEST_TRACK_HORIZON - 5))
    const TEST_TRACK_CAR_SCREEN_X = 80
    const TEST_TRACK_CAR_SCREEN_Y = 110
    const TEST_TRACK_CURVE_STRENGTH = 7
    const TEST_TRACK_MAX_OBSTACLES = 5
    const TEST_TRACK_COLLISION_SCORE_PENALTY = 3
    const TEST_TRACK_SCORE_DIVISOR = 120
    const TEST_TRACK_MIN_SPEED = 70
    const TEST_TRACK_MAX_SPEED = 500
    const TEST_TRACK_OFFROAD_DRAG = 200
    const TEST_TRACK_STEER_DRAG = 20
    const TEST_TRACK_STRAIGHT_ACCELERATION = 50

    const scaleByDepth: number[] = []
    const worldZByDepth: number[] = []
    const roadOffsetByDepth: number[] = []
    const obstacleImages = [
        img`
            4
        `,
        img`
            . 4 .
            1 4 1
            . 1 .
        `,
        img`
            . . 4 . .
            . 4 4 4 .
            1 4 4 4 1
            . 1 1 1 .
            . . 1 . .
        `,
        img`
            . . . 4 . . .
            . . 4 4 4 . .
            . 4 4 4 4 4 .
            1 4 4 4 4 4 1
            . 1 1 1 1 1 .
            . . 1 1 1 . .
            . . . 1 . . .
        `,
        assets.image`garageCone`
    ]

    let hooksInstalled = false
    let activeTrack: TestTrackState = null

    class TestTrackObstacleData {
        constructor(public laneOffset: number, public worldZ: number) { }
    }

    class TestTrackState {
        car: Sprite
        carWorldX: number
        speed: number
        distanceOffset: number
        nextObstacleDistance: number
        segmentDx: number
        previousSegmentDx: number
        segmentPos: number
        efficiencyDrain: number
        collisionPenalty: number
        active: boolean
        obstacles: Sprite[]

        constructor(car: Sprite, speed: number, efficiencyDrain: number) {
            this.car = car
            this.carWorldX = 0
            this.speed = speed
            this.distanceOffset = 0
            this.nextObstacleDistance = 0
            this.segmentDx = 0
            this.previousSegmentDx = 0
            this.segmentPos = 0
            this.efficiencyDrain = efficiencyDrain
            this.collisionPenalty = 0
            this.active = true
            this.obstacles = []
        }
    }

    export function startVehicleTestTrack(): void {
        ensureTrackTables()
        ensureHooksInstalled()
        resetTrack()

        const playerCar = ensurePlayerCar()
        const launchSpeed = Math.clamp(TEST_TRACK_MIN_SPEED + 40, TEST_TRACK_MAX_SPEED - 80, drivenByStem.savedDriveSpeed() * 3)
        const efficiencyDrain = Math.max(1, drivenByStem.savedEfficiencyCost())

        controller.moveSprite(playerCar, 0, 0)
        playerCar.setFlag(SpriteFlag.StayInScreen, true)
        playerCar.setPosition(TEST_TRACK_CAR_SCREEN_X, TEST_TRACK_CAR_SCREEN_Y)

        scene.setBackgroundColor(9)
        drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
        drivenByStem.resetCollisionCount()

        activeTrack = new TestTrackState(playerCar, launchSpeed, efficiencyDrain)

        info.setScore(0)
        info.setLife(Math.max(1, drivenByStem.savedEfficiency()))
        info.startCountdown(TEST_TRACK_DURATION_SECONDS)
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

        playerCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
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
            activeTrack.collisionPenalty += TEST_TRACK_COLLISION_SCORE_PENALTY
            drivenByStem.recordCollision(TEST_TRACK_COLLISION_SCORE_PENALTY, activeTrack.efficiencyDrain)
            scene.cameraShake()
        })

        info.onCountdownEnd(function () {
            if (!(trackIsActive())) {
                return
            }

            if (drivenByStem.collisionCount() <= 1) {
                drivenByStem.awardStrategyPoints(1)
            }

            drivenByStem.saveCurrentRunResults()
            clearObstacles()
            activeTrack.active = false
            game.splash("Test track complete", "Compare score, life, and collisions.")
        })

        game.onPaint(function () {
            if (!(trackIsActive())) {
                return
            }

            drawTrackFrame()
        })
    }

    function trackIsActive(): boolean {
        return !!activeTrack && activeTrack.active && drivenByStem.stageIs(drivenByStem.RaceStage.GarageShakedown)
    }

    function drawTrackFrame(): void {
        const steeringDelta = controller.dx(30000)
        let curveAccumulator = 0

        activeTrack.carWorldX += 0 - steeringDelta
        activeTrack.distanceOffset += (game.eventContext().deltaTime * activeTrack.speed) | 0

        if (activeTrack.distanceOffset >= activeTrack.nextObstacleDistance && activeTrack.obstacles.length < TEST_TRACK_MAX_OBSTACLES) {
            spawnObstacle()
        }

        screen.fillRect(0, 0, screen.width, screen.height, 9)
        screen.fillRect(0, TEST_TRACK_CAR_SCREEN_Y - TEST_TRACK_HORIZON - 2, screen.width, TEST_TRACK_HORIZON + 20, 6)

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
            roadOffsetByDepth[i] += Math.idiv(endOffset * i, TEST_TRACK_END_POS)
            while (obstacleIndex < activeTrack.obstacles.length) {
                const obstacle = activeTrack.obstacles[obstacleIndex]
                const data = obstacle.data as TestTrackObstacleData

                if (data.worldZ > activeTrack.distanceOffset + worldZByDepth[i]) {
                    break
                }

                if (i == 0) {
                    obstacle.destroy()
                    activeTrack.obstacles.removeAt(obstacleIndex)
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

            screen.drawRect(0, y, 160, 1, 6)
            screen.drawRect(roadLeft, y, roadWidth, 1, 11)

            if (sideWidth > 0) {
                const sideColor = (worldZByDepth[i] + activeTrack.distanceOffset) & 32 ? 1 : 2
                screen.drawRect(roadLeft, y, sideWidth, 1, sideColor)
                screen.drawRect(roadLeft + roadWidth - sideWidth, y, sideWidth, 1, sideColor)
            }

            if (i == 5) {
                updateCarPosition(roadLeft, roadWidth, steeringDelta)
            }
        }

        info.setScore(Math.max(0, Math.idiv(activeTrack.distanceOffset, TEST_TRACK_SCORE_DIVISOR) - activeTrack.collisionPenalty))
        screen.print((activeTrack.speed | 0) + "km/h", 110, 15)

        activeTrack.segmentPos += -0.003 * activeTrack.speed
        if (activeTrack.segmentPos < 0) {
            activeTrack.previousSegmentDx = activeTrack.segmentDx
            activeTrack.segmentPos = TEST_TRACK_HORIZON
            activeTrack.segmentDx = nextCurve()
        }
    }

    function spawnObstacle(): void {
        const obstacle = sprites.create(assets.image`garageCone`, SpriteKind.TestTrackObstacle)
        obstacle.data = new TestTrackObstacleData(Math.randomRange(-30, 30), worldZByDepth[TEST_TRACK_END_POS - 1] + activeTrack.distanceOffset)
        activeTrack.obstacles.push(obstacle)
        activeTrack.nextObstacleDistance = activeTrack.distanceOffset + Math.randomRange(300, 420)
    }

    function positionObstacle(obstacle: Sprite, data: TestTrackObstacleData, index: number): void {
        const size = Math.max(1, scaleByDepth[index] * 20 >> 8)
        obstacle.y = 120 - index
        obstacle.x = (roadOffsetByDepth[index] >> 8) + 80 + (scaleByDepth[index] * data.laneOffset >> 8)
        obstacle.setImage(pickObstacleImage(size))
    }

    function pickObstacleImage(size: number): Image {
        for (let image of obstacleImages) {
            if (image.width >= size) {
                return image
            }
        }

        return obstacleImages[obstacleImages.length - 1]
    }

    function updateCarPosition(roadLeft: number, roadWidth: number, steeringDelta: number): void {
        if (TEST_TRACK_CAR_SCREEN_X < roadLeft || TEST_TRACK_CAR_SCREEN_X > roadLeft + roadWidth) {
            activeTrack.car.x = TEST_TRACK_CAR_SCREEN_X + Math.randomRange(-1, 1)
            activeTrack.car.y = TEST_TRACK_CAR_SCREEN_Y + Math.randomRange(-1, 1)
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

        activeTrack.speed = Math.clamp(TEST_TRACK_MIN_SPEED, TEST_TRACK_MAX_SPEED, activeTrack.speed)
    }

    function nextCurve(): number {
        return (Math.randomRange(0, 2) - 1) * TEST_TRACK_CURVE_STRENGTH
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
        if (activeTrack) {
            activeTrack.active = false
            clearObstacles()
        }

        for (let obstacle of sprites.allOfKind(SpriteKind.TestTrackObstacle)) {
            obstacle.destroy()
        }

        activeTrack = null
    }
}