// based on http://www.extentofthejam.com/pseudo/

const horizon = 80
const y_w = -10000
const player_pos = 115
const scaleArr: number[] = []
const zArr: number[] = []
const xOff: number[] = []

const scale = -256 * (y_w / (horizon - 5))

for (let i = 0; i < horizon; ++i) {
    const z = y_w / (i - horizon)
    scaleArr.push((scale / z) | 0)
    zArr.push(z | 0)
    xOff.push(0)
}

const obstImg = [
    img`
        8
    `,
    img`
        f 8
        8 8
    `,
    img`
        . 8 8 .
        f 6 6 f
        . 8 8 .
        f 5 5 f
    `,
    img`
        . . f 8 8 f . .
        . . f 8 8 f . .
        . . . 8 8 . . .
        . . 8 6 6 8 . .
        . f 8 6 6 8 f .
        . f 8 8 8 8 f .
        . . 8 8 8 8 . .
        . 8 5 5 5 5 8 .
    `,
    img`
        . . . . . . . . . . . . . . . .
        . . . . . f . 8 8 . f . . . . .
        . . . . . f 8 8 8 8 f . . . . .
        . . . . . f 8 8 8 8 f . . . . .
        . . . . . . 8 8 8 8 . . . . . .
        . . . . . . 8 8 8 8 . . . . . .
        . . . . . . 8 8 8 8 . . . . . .
        . . . . . . 8 8 8 8 . . . . . .
        . . . . . 8 8 6 6 8 8 . . . . .
        . . . . . 8 6 6 6 6 8 . . . . .
        . . . f f 8 6 6 6 6 8 f f . . .
        . . . f f 8 8 8 8 8 8 f f . . .
        . . . f f 8 8 8 8 8 8 f f . . .
        . . . . 8 8 8 8 8 8 8 8 . . . .
        . . . 5 5 5 5 5 5 5 5 5 5 . . .
        . . . 5 9 9 9 9 9 9 9 9 5 . . .
    `,
]

const carLeft = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . 2 2 2 . . . . . . . . .
    . . . . 2 2 2 . . . . . . . . .
    . . . f 2 2 2 f . . . . . . . .
    . . . f 2 2 2 f . . . . . . . .
    . . . . f 2 2 2 f . . . . . . .
    . . . . . 2 2 2 . . . . . . . .
    . . . . . 2 2 2 . . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . f 2 2 2 f . . . . . .
    . . . . . . f 2 2 2 f . . . . .
    . . . . . . f 2 2 2 f . . . . .
    . . . . . . . 5 5 5 . . . . . .
    . . . . . . . 5 5 5 . . . . . .
`
const carRight = carLeft.clone()
carRight.flipX()
const carFwd = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . f 2 2 2 f . . . . . .
    . . . . . f 2 2 2 f . . . . . .
    . . . . . f 2 2 2 f . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . f 2 2 2 f . . . . . .
    . . . . . f 2 2 2 f . . . . . .
    . . . . . f 5 5 5 f . . . . . .
    . . . . . . 5 5 5 . . . . . . .
`

let off = 0

game.stats = true

function nextCurve() {
    return (Math.randomRange(0, 2) - 1) * 7
}

let segDx = 0, botSegDx = 0
let segPos = 0

const car = sprites.create(carFwd, SpriteKind.Player)
const carScreenX = 80
const carScreenY = 110

let carX = 0
let speed = 300
let nextObstactle = 0

const obstacles: Sprite[] = []

class ObstactlePos {
    constructor(public x: number, public z: number) { }
}

info.setLife(3)

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake()
})

game.onPaint(function () {
    const cdx = controller.dx(30000)// shifted by 8 bits!
    if (cdx < 0) car.setImage(carLeft)
    else if (cdx > 0) car.setImage(carRight)
    else car.setImage(carFwd)
    carX += -cdx
    let ddx = 0
    off += (game.eventContext().deltaTime * speed) | 0
    const endPos = horizon - 4
    if (off >= nextObstactle && obstacles.length < 5) {
        const sp = sprites.create(sprites.space.spaceSmallAsteroid0, SpriteKind.Enemy)
        sp.data = new ObstactlePos(Math.randomRange(-30, 30),
            zArr[endPos - 1] + off)
        obstacles.push(sp)
        nextObstactle = off + Math.randomRange(300, 400)
    }
    info.setScore(off)
    let x = carX | 0
    const segPosI = segPos | 0
    for (let i = 0; i < endPos; ++i) {
        const dx = (i < segPosI) ? botSegDx : segDx
        ddx += dx
        if (i == 40) carX += 30 * dx
        x += ddx
        xOff[i] = x
    }
    const endX = -xOff[endPos - 1]
    let obstIdx = 0
    for (let i = 0; i < endPos; ++i) {
        xOff[i] += Math.idiv(endX * i, endPos)
        while (obstIdx < obstacles.length) {
            const o = obstacles[obstIdx]
            const d = o.data as ObstactlePos
            if (d.z > off + zArr[i])
                break
            if (i == 0) {
                o.destroy()
                obstacles.shift()
            } else {
                o.y = 120 - i
                o.x = (xOff[i] >> 8) + 80 + (scaleArr[i] * d.x >> 8)
                const sz = scaleArr[i] * 20 >> 8
                o.setImage(obstImg[obstImg.length - 1])
                for (let img of obstImg) {
                    if (img.width > sz) {
                        o.setImage(img)
                        break
                    }
                }
                obstIdx++
            }
        }
    }

    for (let i = 0; i < endPos; ++i) {
        let y = 120 - i
        screen.drawRect(0, y, 160, 1, 6)
        const roadW = scaleArr[i] * 140 >> 8
        const roadL = ((160 - roadW) >> 1) + (xOff[i] >> 8)
        screen.drawRect(roadL, y, roadW, 1, 11)
        const sideW = 10 * scaleArr[i] >> 8
        if (sideW) {
            const sideColor = (zArr[i] + off) & 32 ? 1 : 2
            screen.drawRect(roadL, y, sideW, 1, sideColor)
            screen.drawRect(roadL + roadW - sideW, y, sideW, 1, sideColor)
        }
        if (i == 5) {
            if (carScreenX < roadL || carScreenX > roadL + roadW) {
                car.x = carScreenX + Math.randomRange(-1, 1)
                car.y = carScreenY + Math.randomRange(-1, 1)
                speed -= 200 * game.eventContext().deltaTime
            } else {
                car.x = carScreenX
                car.y = carScreenY
                if (cdx == 0)
                    speed += 50 * game.eventContext().deltaTime
                else
                    speed -= 20 * game.eventContext().deltaTime
            }
            speed = Math.clamp(70, 500, speed)
        }
    }

    screen.print((speed | 0) + "km/h", 115, 15)

    segPos += -0.003 * speed
    if (segPos < 0) {
        botSegDx = segDx
        segPos = horizon
        segDx = nextCurve()
    }
})
