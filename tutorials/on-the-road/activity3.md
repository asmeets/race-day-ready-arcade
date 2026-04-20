# Changing Conditions

### @explicitHints true
### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Changing Conditions @showdialog

Strong designs still have to respond to the environment. When grip changes, the best decision changes too.

In this activity, you will model rain, lower traction, and the need to adapt.

```template
let driveSpeed = 110
let raceCar = sprites.create(img`
    . . . 6 6 6 6 . .
    . . 6 8 8 8 6 . .
    . 6 6 6 6 6 6 6 .
    . 6 5 6 6 6 5 6 .
    6 6 6 6 6 6 6 6 6
    . 6 6 6 6 6 6 6 .
    . 6 5 6 6 6 5 6 .
    . . 6 6 6 6 6 . .
    . . . 6 6 6 . . .
`, SpriteKind.Player)
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.setTeamName("Apex Lab")
raceDayTools.setCarName("Velocity")
raceDayTools.setRoleLens(raceDayTools.RoleLens.Strategist)
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 1

Start the weather stage.

```blocks
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.Weather)
//@validate-exists
raceDayTools.setWeather(raceDayTools.WeatherMode.Dry)
//@validate-exists
raceDayTools.resetCollisionCount()
driveSpeed = raceDayTools.savedDriveSpeed()
raceDayTools.applySavedCarStyle(raceCar)
//@validate-exists
info.setScore(0)
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
//@validate-exists
info.startCountdown(25)
```

~hint
Students begin with a working car so they can focus on what changes when the environment changes.
hint~

## Step 2

Change the weather.

```blocks
//@validate-exists
timer.after(10000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Weather)) {
        //@validate-exists
        raceDayTools.setWeather(raceDayTools.WeatherMode.Rain)
        //@validate-exists
        scene.setBackgroundColor(7)
        game.splash("Weather update", "Rain lowers grip. Adapt your pace.")
    }
})
```

~hint
The delayed weather change gives students time to feel the dry setup before the conditions shift.
hint~

## Step 3

Reduce control in rain.

```blocks
//@validate-exists
game.onUpdateInterval(1000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Weather)) {
        //@validate-exists
        if (raceDayTools.weatherIs(raceDayTools.WeatherMode.Rain)) {
            //@validate-exists
            controller.moveSprite(raceCar, driveSpeed - 30, driveSpeed - 30)
        } else {
            controller.moveSprite(raceCar, driveSpeed, driveSpeed)
        }
    }
})
```

~hint
This is the physics idea in code form: lower grip means less control.
hint~

## Step 4

Add rain hazards.

```blocks
//@validate-exists
game.onUpdateInterval(2500, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Weather)) {
        //@validate-exists
        let puddle = sprites.create(img`
            . . 7 7 7 . .
            . 7 7 1 7 7 .
            7 7 1 1 1 7 7
            . 7 7 1 7 7 .
        `, SpriteKind.Enemy)
        puddle.setPosition(randint(20, 140), randint(20, 100))
        puddle.lifespan = 2000
    }
})
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Weather)) {
        //@validate-exists
        raceDayTools.recordCollision(4, 1)
        otherSprite.destroy(effects.spray, 200)
    }
})
```

~hint
Use simple wet hazards to make traction loss visible. Students should be able to connect the puddle to the risk.
hint~

## Step 5

Reward adaptation.

```blocks
//@validate-exists
info.onCountdownEnd(function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Weather)) {
        if (raceDayTools.weatherIs(raceDayTools.WeatherMode.Rain) && raceDayTools.collisionCount() <= 1) {
            //@validate-exists
            raceDayTools.awardStrategyPoints(1)
        }
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
        game.splash("Conditions review", "Grip changed, so the strategy changed.")
    }
})
```

~hint
The strategy reward here is about adaptation. Students earn it by responding well when the system changes.
hint~

## Complete

Physics idea: friction and traction affect how much control a driver has.

Roles in this node: strategist, telemetry analyst, and performance engineer.
