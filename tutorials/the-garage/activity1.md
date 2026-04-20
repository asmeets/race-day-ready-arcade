# Mission Briefing

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Garage Briefing @showdialog

![Welcome to Miami](https://raw.githubusercontent.com/asmeets/race-day-ready-arcade/main/assets/skillmap/welcome.png)

An F1 car is a system. Driver input, code, speed, energy use, and team decisions all affect the run.

Assume this is your first time in MakeCode Arcade. The instructions are on the left, the toolbox is in the middle, your workspace is in the center, and the simulator is on the right.

In this activity, you will learn the interface, build the base car, turn on the dashboard, and save your first setup for the rest of the skillmap.

```template
let driveSpeed = 80
let efficiencyDrain = 1
let raceCar: Sprite = null
```

## Step 1 - Set the Garage Background

Start by setting the scene.

* Open `||scene:Scene||`.
* Drag `set background color` into `||loops(noclick):on start||`.
* If the simulator does not change color, make sure the block is snapped into the stack.

```blocks
//@highlight
//@validate-exists
scene.setBackgroundColor(6)
```

## Step 2 - Add a Start Message

Now add a quick mission prompt.

* Open `||game:Game||`.
* Drag `splash` under the background block.
* Type a short message so the player knows the mission.

```blocks
scene.setBackgroundColor(6)
//@highlight
//@validate-exists
game.splash("Miami test session", "Build a car you can explain.")
```

## Step 3 - Create the Player Car

Build the main sprite.

* Open `||sprites:Sprites||`.
* Drag `set mySprite to sprite of kind Player` into `||loops(noclick):on start||`.
* Change the variable dropdown to `raceCar`.
* Click the image square to draw or pick a car image.
* If the car will not move later, verify this variable is `raceCar`.

```blocks
scene.setBackgroundColor(6)
game.splash("Miami test session", "Build a car you can explain.")
//@highlight
//@validate-exists
raceCar = sprites.create(img`
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
```

## Step 4 - Turn On Movement

Let the player drive.

* Open `||controller:Controller||`.
* Drag `move mySprite with buttons` under the sprite block.
* Set the sprite dropdown to `raceCar` and use `driveSpeed` for both speed values.
* Open `||sprites:Sprites||` and add `set mySprite stay in screen`.

```blocks
scene.setBackgroundColor(6)
game.splash("Miami test session", "Build a car you can explain.")
raceCar = sprites.create(img`
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
//@highlight
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
//@validate-exists
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 5 - Load Saved Race State

Add project blocks that carry choices forward between tutorials.

* Open the custom `Race Day Ready` category.
* Drag in `load race profile`, then `start stage`, then the block that reads saved drive speed.
* Keep these blocks in `||loops(noclick):on start||`.
* If `Race Day Ready` is missing, scroll the toolbox list.

```blocks
scene.setBackgroundColor(6)
game.splash("Miami test session", "Build a car you can explain.")
raceCar = sprites.create(img`
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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
//@validate-exists
raceDayTools.loadRaceProfile(80, 5)
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.Garage)
driveSpeed = raceDayTools.savedDriveSpeed()
```

## Step 6 - Save Team Identity

Give the build a team identity.

* Stay in `Race Day Ready`.
* Add blocks to set team name, car name, and car style.
* Add blocks to apply the saved style and show the profile.

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.startStage(raceDayTools.RaceStage.Garage)
driveSpeed = raceDayTools.savedDriveSpeed()
//@highlight
//@validate-exists
raceDayTools.setTeamName("Apex Lab")
//@validate-exists
raceDayTools.setCarName("Velocity")
//@validate-exists
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
//@validate-exists
raceDayTools.applySavedCarStyle(raceCar)
raceDayTools.showSavedDriverProfile()
```

```ghost
raceDayTools.setCarStyle(raceDayTools.CarStyle.VoltLime)
raceDayTools.setCarStyle(raceDayTools.CarStyle.HeatRed)
```

## Step 7 - Add the Dashboard

Show basic telemetry.

* Open `||info:Info||`.
* Add blocks to set score to `0` and life to saved efficiency.
* Keep both blocks in `||loops(noclick):on start||`.

```blocks
//@highlight
//@validate-exists
info.setScore(0)
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
```

## Step 8 - Add a Reset Event

Create a clean reset for shared devices.

* Open `||controller:Controller||`.
* Drag `on button pressed` into open workspace space, not inside `on start`.
* Change the button to `B`.
* Inside that event, add `reset saved session` and `game reset`.

```blocks
//@highlight
//@validate-exists
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    raceDayTools.resetSavedSession()
    game.reset()
})
```

## Complete

You now have a persistent test car.

Physics idea: a faster car is useful only if the whole system can still control and support it.

Team roles in this node: software engineer, systems engineer, and track engineer.
