# Hit the Track

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Track Session @showdialog

Hey, I'm Casey — I'm the telemetry analyst on this team. I got into this work by tracking game stats and sports stats on my own, then picked up spreadsheets and some basic coding through a community college data course. On a real team, I clean messy data, build simple dashboards, and help engineers answer one big question: did that change actually help? In this gate, you'll drive under live conditions while the game tracks every collision and rewards clean, controlled laps with evidence — not guesses. That's exactly how real engineers decide whether a setup change worked. Get ready to let your data do the talking.

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
raceDayTools.setRoleLens(raceDayTools.RoleLens.DataAnalyst)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 1 - Start the Track Stage

Set the game stage to Track inside `on start` so every later event can check which mode is active before it runs.

* :racing_car: Open `||raceDayTools:Driven by STEM||` and drag `start stage` into `on start`.
* Set the stage value to `Track`.

> **Casey tip:** If obstacles or scoring run at the wrong time, check the stage setting first — that's usually why something is "running right now."

```blocks
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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.Track)
```

## Step 2 - Make the Track Readable

Set a high-contrast background color so the car and obstacles are easy to see on screen.

* :tree: Open `||scene:Scene||` and drag `set background color` into `on start`.
* Pick a color that contrasts strongly with the car sprite.

> **Casey tip:** If your car disappears into the background, change one color so the important stuff pops.

```blocks
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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.Track)
//@highlight
//@validate-exists
scene.setBackgroundColor(11)
```

## Step 3 - Load Your Saved Setup

Pull saved choices into this stage so the same speed and car design carry forward from the garage.

* :racing_car: Open `||raceDayTools:Driven by STEM||` and drag `set driveSpeed from saved drive speed` into `on start`.
* Drag `apply saved car style` and connect `raceCar` as the target sprite.
* Set `efficiencyDrain` from `||raceDayTools:Driven by STEM||` `saved efficiency cost`.

> **Casey tip:** If life drains at a fixed rate instead of your tuned setup, check that `efficiencyDrain` reads from saved efficiency cost — not a hardcoded number.

```blocks
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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.Track)
scene.setBackgroundColor(11)
//@highlight
//@validate-exists
driveSpeed = raceDayTools.savedDriveSpeed()
//@highlight
//@validate-exists
raceDayTools.applySavedCarStyle(raceCar)
//@highlight
//@validate-exists
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
```

## Step 4 - Create Collision Tracking Variables

Add two variables to count collisions over time so the game can detect clean driving stretches.

* :paper plane: Open `||variables:Variables||`, click `Make a Variable`, and name it `trackCollisions`.
* Make a second variable called `lastTrackCollisionCount`.
* Set both to `0` inside `on start`.

> **Casey tip:** If clean-driving rewards never trigger, verify both tracking variables started at `0` and are actually changing when collisions happen.

```blocks
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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.Track)
scene.setBackgroundColor(11)
driveSpeed = raceDayTools.savedDriveSpeed()
raceDayTools.applySavedCarStyle(raceCar)
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
//@highlight
//@validate-exists
let trackCollisions = 0
//@highlight
//@validate-exists
let lastTrackCollisionCount = 0
```

## Step 5 - Turn On the Dashboard and Countdown

Initialize the score, load efficiency as the car's life total, and start the 30-second race clock.

* :game pad: Open `||info:Info||` and drag `set score to 0` into `on start`.
* Drag `set life` and connect `saved efficiency` from `||raceDayTools:Driven by STEM||` as the value.
* Drag `start countdown` and set the time to `30` seconds.

> **Casey tip:** If life stays at `0`, the saved value didn't load — trace where life is set and make sure it reads from saved efficiency.

```blocks
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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
raceDayTools.startStage(raceDayTools.RaceStage.Track)
scene.setBackgroundColor(11)
driveSpeed = raceDayTools.savedDriveSpeed()
raceDayTools.applySavedCarStyle(raceCar)
let efficiencyDrain = raceDayTools.savedEfficiencyCost()
let trackCollisions = 0
let lastTrackCollisionCount = 0
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(30)
```

## Step 6 - Spawn Obstacles

This is a new event block that runs on its own — it creates incoming obstacles every two seconds while the stage is Track.

* :game pad: Open `||game:Game||` and add `on game update every 2000 ms`.
* Inside the event, check that the stage is `Track` using `||raceDayTools:Driven by STEM||`.
* Create an `Enemy` obstacle sprite from `||sprites:Sprites||`, give it a random x position, set a downward velocity, and a `lifespan` so old obstacles disappear.

> **Casey tip:** If it feels chaotic, adjust one setting at a time — slower spawn rate, lower speed, or shorter lifespan — so decisions stay readable.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(2000, function () {
    //@highlight
    //@validate-exists
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        let obs = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . f f f f f f . . . . . . .
            . . f f f 2 2 f f f . . . . . .
            . . f f f 2 2 f f f . . . . . .
            . . . f f f f f f . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Enemy)
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

## Step 7 - Handle Collisions

This is a new event block that fires whenever the player hits an obstacle, logging the hit and draining efficiency.

* :paper plane: Open `||sprites:Sprites||` and add an overlap event for `Player` vs `Enemy`.
* Inside the event, confirm the stage is `Track`, add `1` to `trackCollisions`, and subtract `efficiencyDrain` from life.
* Destroy the obstacle sprite.

> **Casey tip:** If collisions don't change life, check that you're subtracting the right variable and that the overlap event targets `Player` vs `Enemy`.

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    //@highlight
    //@validate-exists
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
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

## Step 8 - Reward Clean Driving

This is a new event block that checks every four seconds whether any new collisions happened and awards bonus points for a clean stretch.

* :game pad: Open `||game:Game||` and add `on game update every 4000 ms`.
* If `trackCollisions` equals `lastTrackCollisionCount`, award `score +2` and `Strategy +1`.
* Set `lastTrackCollisionCount` to `trackCollisions` so the next check compares fresh data.

> **Casey tip:** If it rewards every time, `lastTrackCollisionCount` probably isn't updating; if it never rewards, double-check your comparison.

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(4000, function () {
    //@highlight
    //@validate-exists
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        if (trackCollisions == lastTrackCollisionCount) {
            //@highlight
            //@validate-exists
            info.changeScoreBy(2)
            //@highlight
            //@validate-exists
            raceDayTools.awardStrategyPoints(1)
        }
        //@highlight
        //@validate-exists
        lastTrackCollisionCount = trackCollisions
    }
})
```

## Step 9 - Save Results

This is a new event block — when the countdown ends it saves the run data so the next stage can use it.

* :game pad: Open `||info:Info||` and add `on countdown end`.
* Inside the event, confirm the stage is `Track`.
* :racing_car: Open `||raceDayTools:Driven by STEM||` and drag `save current run results`.

> **Casey tip:** If the end-of-run message never appears, check that your countdown is running and that you added the countdown-end event.

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    //@highlight
    //@validate-exists
    if (raceDayTools.stageIs(raceDayTools.RaceStage.Track)) {
        //@highlight
        //@validate-exists
        raceDayTools.saveCurrentRunResults()
    }
})
```

## Complete

Engineering idea: every collision changes efficiency — tracking that change is how engineers know whether a setup choice actually helped.

Roles in this node: race engineer, performance analyst, and controls software engineer.
