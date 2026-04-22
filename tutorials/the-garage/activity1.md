# Mission Briefing

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Garage Briefing @showdialog

![Sam - Software Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/sam.png)

Hi, I'm **Sam**, your software engineer on this team. I got into coding by remixing games and following tutorials. No formal degree at first, just curiosity and small projects with friends. Later I added structured courses and certifications as I got more serious, and that **mix of self-taught plus structured learning** is what got me here.

On a real racing team, I write and test control code, fix unexpected behavior, and keep the **dashboard reliable** when it matters most. In this gate, you'll do that same foundational work: **get the game running, build your car sprite, wire up the controls, and set up your dashboard**. That's the setup every project starts with, and you're ready for it.

```template
let driveSpeed = 80
let efficiencyDrain = 1
let raceCar: Sprite = null
```

## Step 1 - Set the Garage Background

Set the scene so the game has a visual context from the moment it starts.

* :tree: Open `||scene:Scene||` and drag `set background color` into `||loops(noclick):on start||`.

> **Sam tip:** If the background doesn't change, make sure the block is snapped into the `on start` stack. A block sitting nearby won't run.

```blocks
//@highlight
//@validate-exists
scene.setBackgroundColor(6)
```

## Step 2 - Add a Mission Message

Give players a quick briefing before they see the car.

* :game pad: Open `||game:Game||` and drag `splash` under the background block in `||loops(noclick):on start||`.
* Type a short, one-sentence mission line.

> **Sam tip:** Keep this message short. If a player has to read a paragraph at launch, it's too much.

```blocks
scene.setBackgroundColor(6)
//@highlight
//@validate-exists
game.splash("Miami test session", "Build a car you can explain.")
```

## Step 3 - Create the Player Car

Build the sprite that will represent the car on screen.

* :paper plane: Open `||sprites:Sprites||` and drag `set mySprite to sprite of kind Player` into `||loops(noclick):on start||`.
* Rename the variable to `raceCar`, then click the image square to choose or draw a car.

> **Sam tip:** Use `raceCar` consistently. One mismatched name can make the right blocks feel wrong.

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

Wire up the controls so the player can steer the car.

* The template already includes `driveSpeed`. Use it as the speed value throughout.
* :game pad: Open `||controller:Controller||` and drag `move mySprite with buttons` into `||loops(noclick):on start||`, targeting `raceCar` with `driveSpeed`.
* :paper plane: Open `||sprites:Sprites||` and add `stay in screen` so the car can't leave the view.

> **Sam tip:** If the car won't move, check which sprite the controller block is targeting. This is usually a naming issue.

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
//@highlight
//@validate-exists
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## Step 5 - Load Saved Race State

Connect your project to saved data so choices carry forward between tutorials.

* :racing_car: Open `||racedaytools:Driven by STEM||` and add `load race profile` and `start stage` (Garage) in `||loops(noclick):on start||`.
* Set `driveSpeed` from the saved value.

> **Sam tip:** If the blocks are missing, scroll the toolbox. Custom categories can hide farther down the list.

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
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.Garage)
//@highlight
//@validate-exists
driveSpeed = raceDayTools.savedDriveSpeed()
```

## Step 6 - Save Team Identity

Give the car and team a persistent identity the game will remember.

* Still in `||racedaytools:Driven by STEM||`, set your team name, car name, and car style.
* Add blocks to apply the saved style to `raceCar` and show the driver profile.

> **Sam tip:** Consistent names and styles help you spot what's actually changing in the code. If everything looks different, it's harder to debug.

```validation.local
# BlocksExistValidator
* Enabled: false
```

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
//@validate-exists
raceDayTools.showSavedDriverProfile()
```

```ghost
raceDayTools.setCarStyle(raceDayTools.CarStyle.VoltLime)
raceDayTools.setCarStyle(raceDayTools.CarStyle.HeatRed)
```

## Step 7 - Add the Dashboard

Turn on the HUD so the game can show speed and efficiency feedback.

* :game pad: Open `||info:Info||` and set score to `0` and life to saved efficiency in `||loops(noclick):on start||`.

> **Sam tip:** If your life value looks wrong, make sure you're pulling the saved efficiency value, not leaving it at a default.

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
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.startStage(raceDayTools.RaceStage.Garage)
driveSpeed = raceDayTools.savedDriveSpeed()
raceDayTools.setTeamName("Apex Lab")
raceDayTools.setCarName("Velocity")
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
raceDayTools.applySavedCarStyle(raceCar)
raceDayTools.showSavedDriverProfile()
//@highlight
//@validate-exists
info.setScore(0)
//@validate-exists
info.setLife(raceDayTools.savedEfficiency())
```

## Step 8 - Add a Reset Button

```validation.local
# BlocksExistValidator
* Enabled: false
```

Add a reset event so shared devices can start clean for the next group.

* :game pad: Open `||controller:Controller||` and drag `on button pressed` into the workspace outside of `||loops(noclick):on start||`.
* Change the button to `B`.
* Inside the event, add `reset saved session` and `game reset`.

> **Sam tip:** If pressing B does nothing, check that this event is standalone. Events don't work when nested inside another stack.

```blocks
//@highlight
//@validate-exists
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    raceDayTools.resetSavedSession()
    game.reset()
})
```

## Complete

**You did it!** You just built the foundation of a working race simulator. You created a car sprite, wired up controller movement, connected the game to saved data, and set up a live dashboard that tracks performance and efficiency. A faster car is useful only if the whole system can still control and support it.

Roles in this tutorial: software engineer, systems engineer, and track engineer.
