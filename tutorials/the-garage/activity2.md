# Setup and Tradeoffs

### @diffs true
### @explicitHints true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Setup Tradeoffs @showdialog

![Riley - Performance Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/riley.png)

Hi, I'm Riley, a performance engineer on the race team. I got hooked on engineering by one question: why did that change make it *better*... or *worse*? I studied physics and math in college, though great performance engineers also come through technical programs, apprenticeships, or the military. What matters is learning to test ideas with evidence.

On a real team I run A/B tests, translate driver feedback into data, and tune the car so it's fast and controllable. In this gate you'll tune the car's speed setting, make a prediction before you test, and add a rule that captures a core engineering truth: every strong option costs something somewhere else. Your custom car design stays in the project, and your dashboard unit choices carry forward from the last gate while you tune the setup. Before you leave the garage, you'll preview the setup on a test bed so the data grows with your build.

```template
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## {1. Start the Setup Stage and Make a Prediction}

**Establishing Good Engineering Practice**

---

The question I ask before every test is: **what do I expect to happen, and why?** If you change a setting without a prediction, you're just observing noise. When you make a prediction first, you create a standard to measure against. That's what separates engineering from guessing. Before you change a single number in this gate, pause and answer: if speed goes up, what do you expect to happen to control and energy use? Write it down. The answer you give now becomes your hypothesis, and the data you collect becomes your evidence.
<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Something Looks Familiar...</h4>
            <p>This activity continues your Garage code from the last activity. You will continue <b>updating</b> that existing setup instead of <i>rebuilding it</i>.</p>
        </div>
    </div>

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :racing car: Find the `||drivenByStem:start stage||` block already in `||loops(noclick):on start||` and change its value from **Garage** to **Garage Setup**.
* :paper plane: Drag `||variables:set driveSpeed to saved drive speed||` from the toolbox into `||loops(noclick):on start||` below `||sprites(noclick):set raceCar to sprite of kind Player||`.
* :wrench: Leave the existing `||drivenByStem:set base car speed to||` block alone for now. In Step 3, you will swap it from `||drivenByStem:saved drive speed||` to `||variables:driveSpeed||` so one variable controls the tuning.
* :game pad: Before you test, pause and make a quick prediction with your team: what might more speed do to control and energy use?

~hint What's a variable? 📦

---

In programming, a **variable** is a named container that holds a value you can use and change.

Think of it like a labeled box: you can put a number in the box, check what's in the box, or replace the contents. The label stays the same, but what's inside can change.

In this project, `driveSpeed` is a variable that holds the car's speed value.

hint~

~hint Can't find driveSpeed yet? 📍

---

If you do not see `driveSpeed` in the Variables toolbox yet, create it first with **Make a Variable**. The `set driveSpeed to` block only appears after the variable exists.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
drivenByStem.setBaseCarSpeed(drivenByStem.savedDriveSpeed())
drivenByStem.setTeamName("Apex Lab")
drivenByStem.setCarName("Velocity")
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
//@highlight
let driveSpeed = drivenByStem.savedDriveSpeed()
```
```ghost
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = drivenByStem.savedDriveSpeed()
```

## {2. Tune Speed}

**Adjusting a Key Performance Parameter**

---

Speed is the variable everyone wants to tune first, which is exactly why I teach people to be careful with it. In physics, increasing velocity increases kinetic energy — and kinetic energy scales with the square of speed. That means a small speed increase creates a much larger energy demand. Storing speed in a variable gives you one place to change, one number to report, and one value to trace when something goes wrong. That is the single-source-of-truth principle, and it is one of the most valuable habits in both software engineering and performance analysis.

* :mouse pointer: Find the `||variables:set driveSpeed to||` block you added in Step 1 inside `||loops(noclick):on start||`.
* :keyboard: Change its value from `||drivenByStem:saved drive speed||` to `110`.

~hint Car still slow? 👀

---

If your speed value keeps switching back, something is probably resetting it later. Scan your code stack and make sure there is only one `||variables:set driveSpeed to||` block in `on start`.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
//@highlight
//@validate-exists
let driveSpeed = 110
```
```ghost
let driveSpeed = 110
```

## {3. Make Movement Use driveSpeed}

**Connecting Variables to Behavior**

---

A variable that isn't connected to anything is just a label. The moment you wire `driveSpeed` into the movement system, it becomes a live parameter — change the number, the car responds. That's the difference between data and a control input. Performance engineers spend a lot of time making sure the right variables are actually driving the right behaviors. If a tuning change doesn't seem to do anything, the first question is always: is this variable actually connected to what I think it's connected to?

* :racing car: Find the `||drivenByStem:set base car speed to||` block that already uses `||drivenByStem:saved drive speed||`.
* :mouse pointer: Replace `||drivenByStem:saved drive speed||` with the `||variables:driveSpeed||` variable.

~hint Speed not changing? 🔌

---

If you still see `||drivenByStem:saved drive speed||` in the movement block, the tuning isn't connected yet. Replace it with the `||variables:driveSpeed||` bubble so your change actually takes effect.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
//@highlight
//@validate-exists
drivenByStem.setBaseCarSpeed(driveSpeed)
drivenByStem.setTeamName("Apex Lab")
drivenByStem.setCarName("Velocity")
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
```
```ghost
drivenByStem.setBaseCarSpeed(driveSpeed)
```

## {4. Create the Efficiency Variables}

**Modeling System Costs**

---

Every performance gain has a cost somewhere else in the system — that is one of the most important truths in engineering, and it also matters for sustainability. A car running at higher speed burns more fuel, generates more heat, and creates more wear on components. In your simulation, `efficiencyRating` models the energy budget you start with, and `efficiencyDrain` models what mistakes cost you. Together they let you ask the same question I ask on a real team: at what speed does the cost outweigh the gain?

* :paper plane: Drag `||variables:set efficiencyRating to saved efficiency||` and `||variables:set efficiencyDrain to 1||` from the toolbox into `||loops(noclick):on start||`.

~hint Can't find your variable? ⌨️

---

If you can't find one of the efficiency variables in a dropdown, it usually means it was created with a different spelling. Double-check the exact variable name.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
drivenByStem.setBaseCarSpeed(driveSpeed)
//@highlight
//@validate-exists
let efficiencyRating = drivenByStem.savedEfficiency()
//@highlight
//@validate-exists
let efficiencyDrain = 1
```
```ghost
let efficiencyRating = drivenByStem.savedEfficiency()
let efficiencyDrain = 1
```

## {5. Add the Tradeoff Rule}

**Programming Decision Logic**

---

This is where the physics becomes code. In the real world, a car running above a certain speed threshold crosses into a regime where aerodynamic drag and thermal load grow significantly — engineers call this the efficiency cliff. Your `if/else` rule encodes that same idea: above the threshold, the car starts with a smaller energy budget and each collision costs more. That is not an arbitrary game rule — it is a model. And modeling real-world behavior is exactly what simulation software is for. This is the kind of conditional logic that appears in every engineering system, from engine management software to climate models.

* :paper plane: Open `||logic:Logic||` and add `||logic:if else||` in `||loops(noclick):on start||` directly below your `||variables:set efficiencyDrain to 1||` block.
* :mouse pointer: In `||logic:Logic||` select the 0 < 0 condition and drag it over the "true" value.
* :mouse pointer: Select the `||variables:driveSpeed||` and drag it to the first 0 in the "if" block.
* :mouse pointer: Change the direction of the operator from < (less than) to > (greater than).
* :keyboard: Enter the value of `100` to replace the `0` value in the first line of the `||logic:if||` block.
* :paper plane: In the `then` branch, add `||variables:set efficiencyRating to||` and `||variables:set efficiencyDrain to 2||`.
* :mouse pointer: Open `||math:Math||`, drag a `||math:0 + 0||` block into `||variables:set efficiencyRating to||`, then change the `+` to `-`.
* :mouse pointer: Put `||drivenByStem:saved efficiency||` in the first math slot and `1` in the second slot so the rule subtracts one from the saved value.
* :keyboard: In the `||logic:else||` branch, set `||variables:efficiencyRating||` to use `||drivenByStem:saved efficiency||` and `||variables:efficiencyDrain||` to `1`.

~hint What's a conditional?

---

In programming, a **CONDITIONAL** (or if-else statement) lets your code make decisions and do different things based on whether something is true or false.

The structure is: **IF** (condition is true) **THEN** do this, **ELSE** do that instead.

In this step, you're building a rule: IF speed is high, THEN the car starts with less efficiency and each mistake costs more, ELSE it keeps the stronger baseline.

hint~

~hint Rule not working?

---

If your tradeoff rule never seems to kick in, check that `driveSpeed` is set before the `if` block runs. Order matters when you're building a rule.

hint~

~hint Need the minus block?

---

The subtraction part comes from `||math:Math||`. Drag in the `||math:0 + 0||` block, click the `+`, and switch it to `-`. Then place `||drivenByStem:saved efficiency||` on the left and `1` on the right.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
drivenByStem.setBaseCarSpeed(driveSpeed)
let efficiencyRating = drivenByStem.savedEfficiency()
let efficiencyDrain = 1
//@highlight
//@validate-exists
if (driveSpeed > 100) {
    //@validate-exists
    efficiencyRating = drivenByStem.savedEfficiency() - 1
    efficiencyDrain = 2
} else {
    //@validate-exists
    efficiencyRating = drivenByStem.savedEfficiency()
    efficiencyDrain = 1
}
```
```ghost
if (driveSpeed > 100) {
efficiencyRating = drivenByStem.savedEfficiency() - 1
efficiencyDrain = 2
} else {
efficiencyRating = drivenByStem.savedEfficiency()
efficiencyDrain = 1
}
```

## {6. Preview the Garage Test Bed}

**Testing the Build Without Leaving the Garage**

---

Before any car goes on track, engineers run a bench test — they check every value in a controlled environment before adding the complexity of a live run. That is what the garage test bed does here: it surfaces the exact numbers your conditional rule is producing so you can verify them before you leave the garage. This is also a good moment to notice an important block programming rule: **blocks only run when they are connected to an event or another running stack**. A disconnected block is like a sensor that isn't plugged in — it does nothing. Here you will disconnect the intro splash so testing stays fast, then read the speed, efficiency rating, and drain values together to confirm your tradeoff rule is working the way you intended.

* :mouse pointer: Find the `||game:splash||` block in your `||loops(noclick):on start||` and drag it away from the stack so it is no longer connected.
* :racing car: Drag `||drivenByStem:preview garage test bed||` from the toolbox to the end of `||loops(noclick):on start||` — the three variables are already wired in.
* :game pad: Run the simulator and press the arrow keys to test the speed gauge.

~hint Preview looks wrong? 🧪

---

If the test bed still feels wrong, check three things. First, make sure the `Miami test session` splash is disconnected from `on start` so it is not interrupting each test. Second, make sure the preview block comes after the `if driveSpeed > 100` rule so it can read the final values. Third, remember that the arrows only affect the garage preview gauge here. The full driving test comes in the next lesson.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
drivenByStem.setBaseCarSpeed(driveSpeed)
let efficiencyRating = drivenByStem.savedEfficiency()
let efficiencyDrain = 1
if (driveSpeed > 100) {
    efficiencyRating = drivenByStem.savedEfficiency() - 1
    efficiencyDrain = 2
} else {
    efficiencyRating = drivenByStem.savedEfficiency()
    efficiencyDrain = 1
}
//@highlight
//@validate-exists
drivenByStem.previewGarageTestBed(driveSpeed, efficiencyRating, efficiencyDrain)
```
```ghost
drivenByStem.previewGarageTestBed(driveSpeed, efficiencyRating, efficiencyDrain)
```

## {7. Choose a Role Lens}

**Selecting Your Engineering Perspective**

---

On a real race team, everyone watches the same data but asks different questions. A performance engineer asks: is the car fast enough? A strategist asks: will that pace hold for the full race? A data analyst asks: what does the pattern tell us about future runs? Choosing a role lens sets the frame for how you interpret results. I switch lenses constantly — the same setup can look like a success or a problem depending on which metric you're prioritizing. There is no single right lens, and that is exactly the point.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :book: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:set role lens to||` near the top of your `||loops(noclick):on start||`.
* :mouse pointer: Using the drop-down in `||drivenByStem:set role lens to||`, select a role lens: Performance Engineer, Strategist, Software Engineer, or Data Analyst.
* :id card: Then, add `||drivenByStem:show saved driver profile||` to display your selected profile. 
* :lightbulb: Try changing your `||drivenByStem:set role lens to||` value to review different information.

~hint Which role should I pick? ✨

---

There isn't one correct role here. Pick the lens that matches what you're watching: speed, efficiency, reliability, or data.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
drivenByStem.setBaseCarSpeed(driveSpeed)
let efficiencyRating = drivenByStem.savedEfficiency()
let efficiencyDrain = 1
if (driveSpeed > 100) {
    efficiencyRating = drivenByStem.savedEfficiency() - 1
    efficiencyDrain = 2
} else {
    efficiencyRating = drivenByStem.savedEfficiency()
    efficiencyDrain = 1
}
//@highlight
drivenByStem.setRoleLens(drivenByStem.RoleLens.PerformanceEngineer)
//@highlight
drivenByStem.showSavedDriverProfile()
```

```ghost
drivenByStem.setRoleLens(drivenByStem.RoleLens.SoftwareEngineer)
drivenByStem.setRoleLens(drivenByStem.RoleLens.PerformanceEngineer)
drivenByStem.setRoleLens(drivenByStem.RoleLens.Strategist)
drivenByStem.setRoleLens(drivenByStem.RoleLens.DataAnalyst)
```

## {8. Save the Setup Focus}

**Recording Your Configuration Choice**

---

One of the most common mistakes I see in early engineering work is making a good decision and not recording it. The next session arrives, someone changes something, and nobody remembers why the previous setting existed. Saving your setup focus solves that problem: it documents not just what you set, but which priority drove the choice — pace or balance. Real engineering teams track setup changes with exactly this kind of metadata, and the teams that improve fastest are usually the ones with the most disciplined records.

* :racing car: Drag `||drivenByStem:save team setup [Pace]||` from the toolbox into the **`if`** branch of your `||logic:if||` block.
* :racing car: Duplicate it (right-click → Duplicate), drag the copy into the **`else`** branch, and change the focus dropdown to **Balance**.
* :game pad: Add a `||game:splash||` in each branch that explains the tradeoff choice to the player.

~hint Setup not saving? ⏱️

---

If later gates don't seem to remember your setup, check when you save. Make sure it happens after your speed and efficiency choices are finalized.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageSetup)
let driveSpeed = 110
drivenByStem.setBaseCarSpeed(driveSpeed)
let efficiencyRating = drivenByStem.savedEfficiency()
let efficiencyDrain = 1
if (driveSpeed > 100) {
    efficiencyRating = drivenByStem.savedEfficiency() - 1
    efficiencyDrain = 2
    //@validate-exists
    drivenByStem.saveTeamSetup(driveSpeed, efficiencyRating, efficiencyDrain, drivenByStem.SetupFocus.Pace)
    //@validate-exists
    game.splash("Pace setup", "You chose raw pace. Monitor energy use.")
} else {
    efficiencyRating = drivenByStem.savedEfficiency()
    efficiencyDrain = 1
    //@validate-exists
    drivenByStem.saveTeamSetup(driveSpeed, efficiencyRating, efficiencyDrain, drivenByStem.SetupFocus.Balance)
    game.splash("Balance setup", "You chose a more efficient setup.")
}
drivenByStem.setRoleLens(drivenByStem.RoleLens.PerformanceEngineer)
drivenByStem.showSavedDriverProfile()
```

```ghost
drivenByStem.saveTeamSetup(driveSpeed, efficiencyRating, efficiencyDrain, drivenByStem.SetupFocus.Pace)
drivenByStem.saveTeamSetup(driveSpeed, efficiencyRating, efficiencyDrain, drivenByStem.SetupFocus.Balance)
```

## Nice work!
![Riley - Performance Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/riley.png)

You just did what performance engineers do: you made a prediction, encoded a physical tradeoff into code, tested the result in a controlled environment, and recorded your configuration choice before moving forward. That sequence — hypothesis, model, test, document — is the core loop of engineering work at every level.

The speed and efficiency values you saved here will travel into every later stage. If a later run gives you unexpected results, the first place to check is whether this setup still reflects what you intended. Good setup documentation is what makes debugging fast.

In computer science, variables and conditionals let one program respond to different design choices. In engineering, modeling tradeoffs before you test saves time and resources — including energy. Both ideas show up in every serious STEM career.
