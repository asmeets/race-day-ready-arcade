# Setup and Tradeoffs

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Setup Tradeoffs @showdialog

Hi, I'm Riley — a performance engineer on the race team. I got hooked on engineering by one question: why did that change make it *better*... or *worse*? I studied physics and math in college, though great performance engineers also come through technical programs, apprenticeships, or the military — what matters is learning to test ideas with evidence. On a real team I run A/B tests, translate driver feedback into data, and tune the car so it's fast and controllable. In this gate you'll tune the car's speed setting, make a prediction before you test, and add a rule that captures a core engineering truth: every strong option costs something somewhere else.

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

## Step 1 - Start the Setup Stage and Make a Prediction

Set the session context and record your prediction before you change any values.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* Open `||raceDayTools:Driven by STEM||` and add `start stage` set to **Garage Setup** inside `||loops(noclick):on start||`.
* Set `driveSpeed` to `saved drive speed` so your tuning carries in from the last gate.
* Open `||game:Game||` and add a `splash` that asks: "Predict first: What will more speed do to control and energy?"

> **Riley tip:** If your prediction splash doesn't show up, check placement — make sure it's inside `on start` and not inside another event.

```blocks
//@highlight
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
//@highlight
driveSpeed = raceDayTools.savedDriveSpeed()
//@highlight
game.splash("Predict first", "What will more speed do to control and energy?")
```

## Step 2 - Tune Speed

Set the speed variable that all movement will read from.

* Open `||variables:Variables||` and drag `set driveSpeed to` into `||loops(noclick):on start||`.
* Change the value to `110`.

> **Riley tip:** If the car still feels slow, something is probably resetting your speed later — scan your stacks and look for another place where `driveSpeed` gets set.

```blocks
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
driveSpeed = raceDayTools.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
//@highlight
//@validate-exists
driveSpeed = 110
```

## Step 3 - Make Movement Use driveSpeed

Wire movement to your variable so speed changes flow from one place to the whole game.

* Open `||controller:Controller||` and find `move mySprite with buttons`.
* Replace any number values in the speed fields with the `driveSpeed` variable.

> **Riley tip:** If you still see numbers in the movement block, the tuning isn't connected yet — replace those numbers with the `driveSpeed` bubble so your change actually takes effect.

```blocks
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
driveSpeed = raceDayTools.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
//@highlight
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
```

## Step 4 - Create the Efficiency Variable

Create the cost-per-mistake variable before you use it in the tradeoff rule.

* Open `||variables:Variables||`, click **Make a Variable**, and name it `efficiencyDrain`.
* Add `set efficiencyDrain to 1` in `||loops(noclick):on start||`.

> **Riley tip:** If you can't find `efficiencyDrain` in a dropdown, it usually means it was created with a different spelling — double-check the exact variable name.

```blocks
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
driveSpeed = raceDayTools.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
//@highlight
//@validate-exists
let efficiencyDrain = 1
```

## Step 5 - Add the Tradeoff Rule

Build the conditional that automatically raises the efficiency cost when speed is high.

* Open `||logic:Logic||` and add `if then else` in `||loops(noclick):on start||` with the condition `driveSpeed > 100`.
* In the `then` branch, set `efficiencyDrain` to `2`; in the `else` branch, set it to `1`.

> **Riley tip:** If your tradeoff rule never seems to kick in, check that `driveSpeed` is set before the `if` block runs — order matters when you're building a rule.

```blocks
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
driveSpeed = raceDayTools.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
let efficiencyDrain = 1
//@highlight
//@validate-exists
if (driveSpeed > 100) {
    efficiencyDrain = 2
} else {
    efficiencyDrain = 1
}
```

## Step 6 - Choose a Role Lens

Pick the engineer perspective that best matches what you're focusing on in this run.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* Open `||raceDayTools:Driven by STEM||` and set a role lens: Performance Engineer, Strategist, Software Engineer, or Data Analyst.
* Add `show saved driver profile` to display the current profile.

> **Riley tip:** There isn't one correct role here — pick the lens that matches what you're watching: speed, efficiency, reliability, or data.

```blocks
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
driveSpeed = raceDayTools.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
let efficiencyDrain = 1
if (driveSpeed > 100) {
    efficiencyDrain = 2
} else {
    efficiencyDrain = 1
}
//@highlight
raceDayTools.setRoleLens(raceDayTools.RoleLens.PerformanceEngineer)
//@highlight
raceDayTools.showSavedDriverProfile()
```

```ghost
raceDayTools.setRoleLens(raceDayTools.RoleLens.Strategist)
raceDayTools.setRoleLens(raceDayTools.RoleLens.SoftwareEngineer)
raceDayTools.setRoleLens(raceDayTools.RoleLens.DataAnalyst)
```

## Step 7 - Save the Setup Focus

Store your speed and efficiency choices so later gates can build on this setup.

* In `||raceDayTools:Driven by STEM||`, use `save team setup` inside the `if driveSpeed > 100` structure.
* Set the setup focus to `Pace` in the `then` branch and `Balance` in the `else` branch.
* Add a `splash` in each branch that explains the tradeoff choice.

> **Riley tip:** If later gates don't seem to remember your setup, check when you save — make sure it happens after your speed and efficiency choices are finalized.

```blocks
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
driveSpeed = raceDayTools.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
let efficiencyDrain = 1
if (driveSpeed > 100) {
    efficiencyDrain = 2
} else {
    efficiencyDrain = 1
}
raceDayTools.setRoleLens(raceDayTools.RoleLens.PerformanceEngineer)
raceDayTools.showSavedDriverProfile()
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

You built a real engineering tradeoff. Physics idea: increasing speed raises system demand. Computer science idea: variables plus conditionals let one program adapt to different design choices.

Team roles in this node: performance engineer, sustainability engineer, and systems engineer.
