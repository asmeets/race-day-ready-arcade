# Hit the Track

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Track Session @showdialog

Now the setup leaves the garage. The same code and saved values must work under real driving conditions.

In this activity, you will load the tuned car, dodge obstacles, and reward clean driving.

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
raceDayTools.setRoleLens(raceDayTools.RoleLens.PerformanceEngineer)
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 1 - Load Track State

Configure the run using saved setup.

* Open `||scene:Scene||` and set a track background.
* Open `Race Day Ready` and start track stage.
* Load saved speed and reset collision count.
* Reapply saved car style.
* Open `||info:Info||` and set score, life, and countdown.

```blocks
//@highlight
//@validate-exists
scene.setBackgroundColor(11)
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.Track)
driveSpeed = raceDayTools.savedDriveSpeed()
//@validate-exists
raceDayTools.resetCollisionCount()
raceDayTools.applySavedCarStyle(raceCar)
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
//@validate-exists
info.setScore(0)
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
//@validate-exists
info.startCountdown(30)
game.splash(raceDayTools.teamName(), raceDayTools.carName() + " hits the track.")
```

## Step 2 - Spawn Obstacles

Add continuous obstacle pressure.

* Open `||game:Game||` and add `on game update every`.
* Set interval to `2000` ms.
* In the event, confirm stage is track.
* Open `||sprites:Sprites||` and create obstacle enemies.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(2000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@validate-exists
        let obstacle = sprites.create(img`
            . c c c c c .
            c c c c c c c
            c c c c c c c
            . c c c c c .
        `, SpriteKind.Enemy)
        obstacle.setPosition(randint(10, 150), 0)
        obstacle.setVelocity(0, 40)
        obstacle.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
```

## Step 3 - Handle Collisions

Convert collisions into penalties.

* Open `||sprites:Sprites||` and add overlap for player vs enemy.
* Check stage before applying penalty.
* Record collision impact and destroy the obstacle.

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@validate-exists
        raceDayTools.recordCollision(5, 1)
        otherSprite.destroy(effects.disintegrate, 200)
    }
})
```

## Step 4 - Create a Tracking Variable

Track whether new collisions happened.

* Open `||variables:Variables||`.
* If needed, click `Make a Variable` and create `lastTrackCollisionCount`.
* Set it to `0` before the clean-driving event.

```blocks
//@highlight
//@validate-exists
let lastTrackCollisionCount = 0
```

## Step 5 - Reward Clean Driving

Award points when collision count does not increase.

* Open `||game:Game||` and add update event every `4000` ms.
* Compare current collision count to `lastTrackCollisionCount`.
* If unchanged, award performance and strategy points.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(4000, function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        let currentCollisions = raceDayTools.collisionCount()
        if (currentCollisions == lastTrackCollisionCount) {
            //@validate-exists
            info.changeScoreBy(2)
            //@validate-exists
            raceDayTools.awardStrategyPoints(1)
        }
        lastTrackCollisionCount = currentCollisions
    }
})
```

## Step 6 - Save Track Results

Store track evidence for pit-stop and final stages.

* Open `||info:Info||` and add `on countdown end`.
* Save current run results.

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
        game.splash("Track data ready", "Pit stop decisions come next.")
    }
})
```

## Complete

Physics idea: more speed increases time pressure on steering decisions.

Roles in this node: race engineer, performance analyst, and controls software engineer.
