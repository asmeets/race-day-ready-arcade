# Hit the Track

### @explicitHints true
### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Track Session @showdialog

Now the setup leaves the garage. The same code and saved values have to work under real driving conditions.

In this activity, you will load the tuned car, dodge live obstacles, and reward clean driving with both performance and strategy.

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

## Step 1

Load the track setup.

* Open `Scene` and set a track-style background color.
* Open `Race Day Ready` and drag in the block that starts the track stage.
* Add the block that loads the saved drive speed.
* Reset the collision count before the run begins.
* Reapply the saved car style so the student's car still looks like their version.
* Open `Info` and set the score, life, and countdown for the run.

```blocks
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

~hint
If something looks missing in the simulator, compare the workspace to the step image and check that these setup blocks are still in one stack. This step shifts the setting from garage testing to live track conditions.
hint~

## Step 2

Spawn obstacles.

* Open `Game` and drag in `on game update every 500 ms`.
* Change the timing value to `2000` milliseconds.
* This event should sit in an empty part of the workspace, not inside `on start`.
* Inside the event, use `Race Day Ready` to check whether the game is in the track stage.
* Open `Sprites` and create an obstacle sprite inside that event.
* Set the obstacle position, velocity, and auto destroy behavior so it falls down the screen and disappears when it leaves the play area.

```blocks
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

~hint
If the obstacle appears only once, check that the sprite creation block is inside the update event. If it appears but does not move, check the velocity block.
hint~

## Step 3

Handle collisions.

```blocks
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@validate-exists
        raceDayTools.recordCollision(5, 1)
        otherSprite.destroy(effects.disintegrate, 200)
    }
})
```

~hint
Use one overlap rule for a clear cause-and-effect loop: contact creates a penalty, and students can observe it immediately.
hint~

## Step 4

Create a tracking variable.

* Open `Variables`.
* If `lastTrackCollisionCount` is not listed, choose `Make a Variable`.
* Create the variable, then drag `set lastTrackCollisionCount to 0` into the workspace.
* Put this variable setup before the clean-driving event so the game has a value to compare against.

```blocks
//@validate-exists
let lastTrackCollisionCount = 0
```

~hint
If students skip this step, the clean-driving logic will be harder to understand and debug. This variable stores the previous collision total.
hint~

## Step 5

Reward clean driving.

```blocks
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

~hint
This is the strategy layer. Students are rewarded for consistency, not just speed.
hint~

## Step 6

Save the track result.

```blocks
//@validate-exists
info.onCountdownEnd(function () {
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
        game.splash("Track data ready", "Pit stop decisions come next.")
    }
})
```

~hint
Always save the track result. That lets later pit-stop and review steps build on real evidence from play.
hint~

## Complete

Physics idea: more speed increases the time pressure on every steering decision.

Roles in this node: race engineer, driver performance analyst, and controls software engineer.
