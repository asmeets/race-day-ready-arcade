# Setup and Tradeoffs

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Setup Tradeoffs @showdialog

Performance engineers do not ask only, "How do we go faster?" They also ask, "What will this change cost somewhere else?"

In this activity, you will tune speed, model an efficiency tradeoff, and save your setup for the next stage.

```template
let driveSpeed = 80
let efficiencyDrain = 1
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
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
raceDayTools.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(raceDayTools.savedEfficiency())
```

## Step 1 - Load the Setup

Bring saved setup data into this activity.

* Open `Race Day Ready`.
* Add `start stage` and set it to garage setup.
* Add the block that reads saved drive speed into `driveSpeed`.
* Open `||game:Game||` and add a short prediction splash.

```blocks
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
driveSpeed = raceDayTools.savedDriveSpeed()
//@validate-exists
game.splash("Predict first", "What will more speed do to control and energy?")
```

## Step 2 - Tune Speed

Apply a faster setup.

* Open `||variables:Variables||`.
* Set `driveSpeed` to `110`.
* Open `||controller:Controller||` and use `driveSpeed` in movement.

```blocks
//@highlight
//@validate-exists
driveSpeed = 110
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
```

## Step 3 - Create the Efficiency Variable

Create the variable before using it in logic.

* Open `||variables:Variables||`.
* If needed, click `Make a Variable` and create `efficiencyDrain`.
* Add `set efficiencyDrain to 1`.

```blocks
//@highlight
//@validate-exists
let efficiencyDrain = 1
```

## Step 4 - Add the Tradeoff Rule

Model the cost of speed.

* Open `||logic:Logic||` and add `if then else`.
* Use `driveSpeed > 100` as the condition.
* In `then`, set `efficiencyDrain` to `2`.
* In `else`, set `efficiencyDrain` to `1`.

```blocks
//@highlight
//@validate-exists
if (driveSpeed > 100) {
    efficiencyDrain = 2
} else {
    efficiencyDrain = 1
}
```

## Step 5 - Choose a Role Lens

Pick the role perspective for this run.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* Open `Race Day Ready`.
* Set one role lens.
* Show the saved driver profile.

```blocks
//@highlight
//@validate-exists
raceDayTools.setRoleLens(raceDayTools.RoleLens.PerformanceEngineer)
raceDayTools.showSavedDriverProfile()
```

```ghost
raceDayTools.setRoleLens(raceDayTools.RoleLens.Strategist)
raceDayTools.setRoleLens(raceDayTools.RoleLens.SoftwareEngineer)
raceDayTools.setRoleLens(raceDayTools.RoleLens.DataAnalyst)
```

## Step 6 - Save the Setup

Store the tradeoff choice for later stages.

* Keep the `if` structure so setup focus depends on speed.
* Save the setup as `Pace` for high speed or `Balance` for lower speed.

```blocks
//@highlight
if (driveSpeed > 100) {
    //@validate-exists
    raceDayTools.saveTeamSetup(driveSpeed, efficiencyDrain, raceDayTools.SetupFocus.Pace)
    game.splash("Performance engineer", "You chose raw pace. Watch energy use.")
} else {
    //@validate-exists
    raceDayTools.saveTeamSetup(driveSpeed, efficiencyDrain, raceDayTools.SetupFocus.Balance)
    game.splash("Sustainability engineer", "You chose a more efficient setup.")
}
```

```ghost
raceDayTools.saveTeamSetup(driveSpeed, efficiencyDrain, raceDayTools.SetupFocus.Balance)
raceDayTools.saveTeamSetup(driveSpeed, efficiencyDrain, raceDayTools.SetupFocus.Pace)
```

## Complete

You built a real engineering tradeoff.

Physics idea: increasing speed raises system demand.

Computer science idea: variables plus conditionals let one program adapt to different design choices.
