# Setup and Tradeoffs

### @diffs true
### @explicitHints true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

```template
// Pre-load all assets so they appear in the gallery
let __sprites = [assets.image`playerCar`, assets.image`garageCone`, assets.image`trackObstacle`, assets.image`pitMarker`, assets.image`rainPuddle`, assets.image`telemetryScreen`, assets.image`finishBanner`, assets.image`teamBadge`]
let __backgrounds = [assets.image`garageBg`, assets.image`trackBg`, assets.image`finishBg`, assets.image`weatherBg`]
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

Engineers don't just change things and hope for the best — they predict outcomes first, then test. Making a prediction forces you to think through cause and effect before you make changes. This is how you turn random experiments into structured learning.
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

Speed is one of the most important variables in racing. Changing it affects everything — how quickly you navigate, how much energy you use, how hard it is to control the car. By storing speed in a variable, you create a single point of control that you can tune and test systematically.

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

A variable is only useful if your code actually reads it. By wiring your movement system to the `||variables:driveSpeed||` variable, you ensure that changes to that one value immediately affect how the car moves. This is how engineers create centralized control — change one setting, update the whole system.

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

In racing, every decision has a cost. Going faster burns more fuel and stresses components. In your simulation, `||variables:efficiencyRating||` represents how much energy the car starts with, and `||variables:efficiencyDrain||` represents how much each mistake costs. Creating both variables lets you model tradeoffs clearly.

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

This is where your simulation gets smart. A conditional statement lets your code make different choices based on the current situation. In this case, you're programming a realistic tradeoff: higher speed means higher energy cost. This is how engineers encode real-world physics into software systems.

* :paper plane: Open `||logic:Logic||` and add `||logic:if then else||` in `||loops(noclick):on start||` directly below your `||variables:set efficiencyDrain to 1||` block.
* :mouse pointer: In `||logic:Logic||` select the 0 < 0 condition and drag it over the "true" value.
* :mouse pointer: Select the `||variables:driveSpeed||` and drag it to the first 0 in the "if" block.
* :mouse pointer: Change the direction of the operator from < (less than) to > (greater than).
* :keyboard: Enter the value of `100` to replace the `0` value in the first line of the `||logic:if||` block.
* :paper plane: In the `then` branch, add `||variables:set efficiencyRating to||` and `||variables:set efficiencyDrain to 2||`.
* :mouse pointer: Open `||math:Math||`, drag a `||math:0 + 0||` block into `||variables:set efficiencyRating to||`, then change the `+` to `-`.
* :mouse pointer: Put `||drivenByStem:saved efficiency||` in the first math slot and `1` in the second slot so the rule becomes `||drivenByStem:saved efficiency - 1||`.
* :keyboard: In the `||logic:else||` branch, set `||variables:efficiencyRating||` to use `||drivenByStem:saved efficiency||` and `||drivenByStem:efficiencyDrain||` to `1`.

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

Engineers often use a test stand before a full track run. A garage test bed gives you a safe place to preview the exact values your code is building.

This is also a good moment to notice an important block programming rule: **blocks only run when they are connected to an event or another running stack**. Here, you will remove the repeated garage intro splash so testing stays quick, then preview the speed, efficiency, and drain values together.

* :mouse pointer: Find the `||game:splash||` block in your `||loops(noclick):on start||` and drag it away from the stack so it is no longer connected.
* :racing car: Drag `||drivenByStem:preview garage test bed driveSpeed efficiencyRating efficiencyDrain||` from the toolbox to the end of `||loops(noclick):on start||` — the three variables are already wired in.
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

On a real race team, different engineers focus on different things — some watch performance, others track efficiency, some monitor reliability. Choosing a role lens determines how you'll interpret the data you collect. There's no single "right" lens, just different ways of looking at the same system.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :book: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:setRoleLens||` near the top of your `||loops(noclick):on start||`.
* :mouse pointer: Using the drop-down in `||drivenByStem:setRoleLens||`, select a role lens: Performance Engineer, Strategist, Software Engineer, or Data Analyst.
* :id card: Then, add `||drivenByStem:showSavedDriverProfile||` to display your selected profile. 
* :lightbulb: Try changing your `||drivenByStem:setRoleLens||` value to review different information.

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

Engineering isn't just about making good decisions in the moment — it's about documenting those decisions so you can learn from them later. Saving your setup focus means future stages of your simulation will remember whether you prioritized speed or balance. This is how professional teams track setup changes across test sessions.

* :racing car: Drag `||drivenByStem:save team setup Pace||` from the toolbox into the **`if`** branch of your `||logic:if driveSpeed > 100||` block.
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

You tuned your car's speed setting, made a prediction before testing, built a conditional rule that captures a core engineering truth, and previewed the result on a garage test bed before a full shakedown. You also saved both the setup speed and the starting efficiency that later track and review steps will reuse.

You built a real engineering tradeoff! In physics, increasing speed can put more demand on the system. In computer science, variables and conditionals help one program respond to different design choices.
