# Setup and Tradeoffs

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Setup Tradeoffs @showdialog

![Riley - Performance Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/riley.png)

Hi, I'm **Riley**, a performance engineer on the race team. I got hooked on engineering by one question: why did that change make it *better*... or *worse*? I studied physics and math in college, though great performance engineers also come through technical programs, apprenticeships, or the military. What matters is **learning to test ideas with evidence**.

On a real team I run A/B tests, translate driver feedback into data, and tune the car so it's **fast and controllable**. In this gate you'll tune the car's speed setting, **make a prediction before you test**, and add a rule that captures a core engineering truth: **every strong option costs something somewhere else**.

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
raceDayTools.applySavedCarStyle(raceCar)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
info.setLife(raceDayTools.savedEfficiency())
```

## {1. Start the Setup Stage and Make a Prediction}

**Establishing Good Engineering Practice**

---

Real engineers don't just change things and hope for the best — they predict outcomes first, then test. Making a prediction forces you to think through cause and effect before you make changes. This is how you turn random experiments into structured learning.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :racing_car: Open `||raceDayTools:Driven by STEM||` and add `start stage` set to **Garage Setup** inside `||loops(noclick):on start||`.
* Set `driveSpeed` to `saved drive speed` so your tuning carries in from the last gate.
* :game pad: Open `||game:Game||` and add a `splash` that asks: "Predict first: What will more speed do to control and energy?"

~hint Splash not showing? 📍

---

If your prediction splash doesn't show up, check placement. Make sure it's inside `on start` and not inside another event.

hint~

```blocks
//@highlight
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
//@highlight
driveSpeed = raceDayTools.savedDriveSpeed()
//@highlight
game.splash("Predict first", "What will more speed do to control and energy?")
```

## {2. Tune Speed}

**Adjusting a Key Performance Parameter**

---

Speed is one of the most important variables in racing. Changing it affects everything — how quickly you navigate, how much energy you use, how hard it is to control the car. By storing speed in a variable, you create a single point of control that you can tune and test systematically.

* :paper plane: Open `||variables:Variables||` and drag `set driveSpeed to` into `||loops(noclick):on start||`.
* Change the value to `110`.

~hint What's a variable? 📦

---

In programming, a **VARIABLE** is a named container that holds a value you can use and change.

Think of it like a labeled box: you can put a number in the box, check what's in the box, or replace the contents. The label stays the same, but what's inside can change.

In this project, `driveSpeed` is a variable that holds the car's speed value.

hint~

~hint Car still slow? 👀

---

If the car still feels slow, something is probably resetting your speed later. Scan your stacks and look for another place where `driveSpeed` gets set.

hint~

```blocks
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
driveSpeed = raceDayTools.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
//@highlight
//@validate-exists
driveSpeed = 110
```

## {3. Make Movement Use driveSpeed}

**Connecting Variables to Behavior**

---

A variable is only useful if your code actually reads it. By wiring your movement system to the `driveSpeed` variable, you ensure that changes to that one value immediately affect how the car moves. This is how engineers create centralized control — change one setting, update the whole system.

* :game pad: Open `||controller:Controller||` and find `move mySprite with buttons`.
* Replace any number values in the speed fields with the `driveSpeed` variable.

~hint Speed not changing? 🔌

---

If you still see numbers in the movement block, the tuning isn't connected yet. Replace those numbers with the `driveSpeed` bubble so your change actually takes effect.

hint~

```blocks
raceDayTools.startStage(raceDayTools.RaceStage.GarageSetup)
driveSpeed = raceDayTools.savedDriveSpeed()
game.splash("Predict first", "What will more speed do to control and energy?")
driveSpeed = 110
//@highlight
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
```

## {4. Create the Efficiency Variable}

**Modeling System Costs**

---

In real racing, every decision has a cost. Going faster burns more fuel and stresses components. In your simulation, the `efficiencyDrain` variable represents how much energy each mistake costs. Creating this variable lets you model tradeoffs — a core concept in engineering and game balance.

* :paper plane: Open `||variables:Variables||`, click **Make a Variable**, and name it `efficiencyDrain`.
* Add `set efficiencyDrain to 1` in `||loops(noclick):on start||`.

~hint Can't find your variable? ⌨️

---

If you can't find `efficiencyDrain` in a dropdown, it usually means it was created with a different spelling. Double-check the exact variable name.

hint~

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

## {5. Add the Tradeoff Rule}

**Programming Decision Logic**

---

This is where your simulation gets smart. A conditional statement lets your code make different choices based on the current situation. In this case, you're programming a realistic tradeoff: higher speed means higher energy cost. This is how engineers encode real-world physics into software systems.

* :paper plane: Open `||logic:Logic||` and add `if then else` in `||loops(noclick):on start||` with the condition `driveSpeed > 100`.
* In the `then` branch, set `efficiencyDrain` to `2`; in the `else` branch, set it to `1`.

~hint What's a conditional? 🔀

---

In programming, a **CONDITIONAL** (or if-else statement) lets your code make decisions and do different things based on whether something is true or false.

The structure is: **IF** (condition is true) **THEN** do this, **ELSE** do that instead.

In this step, you're building a rule: IF speed is high, THEN efficiency costs more, ELSE it costs less.

hint~

~hint Rule not working? 🔢

---

If your tradeoff rule never seems to kick in, check that `driveSpeed` is set before the `if` block runs. Order matters when you're building a rule.

hint~

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

## {6. Choose a Role Lens}

**Selecting Your Engineering Perspective**

---

On a real race team, different engineers focus on different things — some watch performance, others track efficiency, some monitor reliability. Choosing a role lens determines how you'll interpret the data you collect. There's no single "right" lens, just different ways of looking at the same system.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :racing_car: Open `||raceDayTools:Driven by STEM||` and set a role lens: Performance Engineer, Strategist, Software Engineer, or Data Analyst.
* Add `show saved driver profile` to display the current profile.

~hint Which role should I pick? ✨

---

There isn't one correct role here. Pick the lens that matches what you're watching: speed, efficiency, reliability, or data.

hint~

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
//@highlight
raceDayTools.showSavedDriverProfile()
```

```ghost
raceDayTools.setRoleLens(raceDayTools.RoleLens.SoftwareEngineer)
```

## {7. Save the Setup Focus}

**Recording Your Configuration Choice**

---

Engineering isn't just about making good decisions in the moment — it's about documenting those decisions so you can learn from them later. Saving your setup focus means future stages of your simulation will remember whether you prioritized speed or balance. This is how professional teams track setup changes across test sessions.

* In `||raceDayTools:Driven by STEM||`, use `save team setup` inside the `if driveSpeed > 100` structure.
* Set the setup focus to `Pace` in the `then` branch and `Balance` in the `else` branch.
* Add a `splash` in each branch that explains the tradeoff choice.

~hint Setup not saving? ⏱️

---

If later gates don't seem to remember your setup, check when you save. Make sure it happens after your speed and efficiency choices are finalized.

hint~

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
raceDayTools.showSavedDriverProfile()
//@highlight
if (driveSpeed > 100) {
    //@validate-exists
    game.splash("Performance engineer", "You chose raw pace. Watch energy use.")
} else {
    //@validate-exists
    raceDayTools.saveTeamSetup(driveSpeed, efficiencyDrain, raceDayTools.SetupFocus.Balance)
    game.splash("Sustainability engineer", "You chose a more efficient setup.")
}
```

```ghost
raceDayTools.saveTeamSetup(driveSpeed, efficiencyDrain, raceDayTools.SetupFocus.Balance)
```

## Complete

**Nice work!** You tuned your car's speed setting, made a prediction before testing, and built a conditional rule that captures a core engineering truth: every strong option costs something somewhere else. You also chose a role lens that will shape how you see the data ahead.

You built a real engineering tradeoff. Physics idea: increasing speed raises system demand. Computer science idea: variables plus conditionals let one program adapt to different design choices.

Team roles in this tutorial: performance engineer, sustainability engineer, and systems engineer.
