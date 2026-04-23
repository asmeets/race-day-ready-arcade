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

## {1. Set the Garage Background}

**Creating the Visual Environment**

---

Every game starts with a scene. Setting the background color gives your game a visual identity from the moment it launches. This is the first thing players see, and it sets the tone for the entire racing experience.

* :tree: Open `||scene:Scene||` and drag `set background color` into `||loops(noclick):on start||`.

~hint Background not changing? 🔍

---

If the background doesn't change, make sure the block is snapped into the `on start` stack. A block sitting nearby won't run.

hint~

```blocks
//@highlight
//@validate-exists
scene.setBackgroundColor(6)
```

## {2. Add a Mission Message}

**Communicating the Player's Goal**

---

Clear communication is essential in both games and engineering. A mission message tells players what they're about to do and why it matters. Think of it like a team briefing before a test session — everyone needs to know the objective.

* :game pad: Open `||game:Game||` and drag `splash` under the background block in `||loops(noclick):on start||`.
* :keyboard: Type a short, one-sentence mission line.

~hint Message too long? ⚡

---

Keep this message short. If a player has to read a paragraph at launch, it's too much.

hint~

```blocks
scene.setBackgroundColor(6)
//@highlight
//@validate-exists
game.splash("Miami test session", "Build a car you can explain.")
```

## {3. Create the Player Car}

**Building the Interactive Game Object**

---

In racing games and simulations, the car is more than just an image — it's an interactive object with properties like position, speed, and collision detection. Creating a sprite gives you a programmable object you can control, move, and respond to events. This is how digital simulations represent real-world objects.

* :paper plane: Open `||sprites:Sprites||` and drag `set mySprite to sprite of kind Player` into `||loops(noclick):on start||`.
* :keyboard: Rename the variable to `raceCar`, then click the image square to choose or draw a car.

~hint What's a sprite? 💡

---

In Arcade, each character or image that does something is called a **SPRITE**.

Sprites have properties that you can use and change — things like position, speed, and image are all properties of sprites.

Your race car will be a sprite, too.

hint~

~hint Variable names confusing? 🎯

---

Use `raceCar` consistently. One mismatched name can make the right blocks feel wrong.

hint~

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

## {4. Turn On Movement}

**Connecting Input to Action**

---

A car that can't move isn't much of a simulator. Wiring up controller input to sprite movement is how you transform button presses into on-screen action. Real racing simulators do the same thing — they translate driver input (steering, throttle, brakes) into vehicle behavior. Here you're building that connection.

* :binoculars: The template already includes `driveSpeed`. Use it as the speed value throughout.
* :game pad: Open `||controller:Controller||` and drag `move mySprite with buttons` into `||loops(noclick):on start||`, targeting `raceCar` with `driveSpeed`.
* :paper plane: Open `||sprites:Sprites||` and add `stay in screen` so the car can't leave the view.

~hint Car won't move? 🔧

---

If the car won't move, check which sprite the controller block is targeting. This is usually a naming issue.

hint~

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

## {5. Load Saved Race State}

**Building Persistent Systems**

---

Professional race teams don't start from scratch every session — they load saved setups, previous lap data, and driver preferences. Your game does the same thing. Loading saved data lets your choices carry forward across different stages, just like real engineering systems that remember past configurations and results.

* :racing_car: Open `||drivenByStem:Driven by STEM||` and add `load race profile` and `start stage` (Garage) in `||loops(noclick):on start||`.
* :racing_car: Set `driveSpeed` from the saved value.

~hint Blocks missing? 👀

---

If the blocks are missing, scroll the toolbox. Custom categories can hide farther down the list.

hint~

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
drivenByStem.loadRaceProfile(80, 5)
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
//@highlight
//@validate-exists
driveSpeed = drivenByStem.savedDriveSpeed()
```

## {6. Save Team Identity}

**Creating Personalized Experience**

---

Every racing team has an identity — a name, a car livery, a style. Setting these values personalizes your simulation and creates a sense of ownership. More importantly, saving these choices means the system remembers who you are across multiple sessions, just like how real team data persists across race weekends.

* :id card: Still in `||drivenByStem:Driven by STEM||`, set your team name, car name, and car style.
* :id card: Add blocks to apply the saved style to `raceCar` and show the driver profile.

~hint Why consistency matters? 💭

---

Consistent names and styles help you spot what's actually changing in the code. If everything looks different, it's harder to debug.

hint~

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
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
driveSpeed = drivenByStem.savedDriveSpeed()
//@highlight
//@validate-exists
drivenByStem.setTeamName("Apex Lab")
//@validate-exists
drivenByStem.setCarName("Velocity")
//@validate-exists
drivenByStem.setCarStyle(drivenByStem.CarStyle.SilverFlash)
//@validate-exists
drivenByStem.applySavedCarStyle(raceCar)
//@validate-exists
drivenByStem.showSavedDriverProfile()
```

```ghost
drivenByStem.setCarStyle(drivenByStem.CarStyle.VoltLime)
drivenByStem.setCarStyle(drivenByStem.CarStyle.HeatRed)
```

## {7. Add the Dashboard}

**Displaying Real-Time Performance Data**

---

Racing drivers rely on dashboard displays to monitor speed, fuel, tire wear, and system health in real time. Your game's HUD (Heads-Up Display) does the same thing — it shows score and efficiency so players can make informed decisions. Visible data turns abstract numbers into actionable information.

* :game pad: Open `||info:Info||` and set score to `0` and life to saved efficiency in `||loops(noclick):on start||`.

~hint Life value looks wrong? 🐛

---

If your life value looks wrong, make sure you're pulling the saved efficiency value, not leaving it at a default.

hint~

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
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
driveSpeed = drivenByStem.savedDriveSpeed()
drivenByStem.setTeamName("Apex Lab")
drivenByStem.setCarName("Velocity")
drivenByStem.setCarStyle(drivenByStem.CarStyle.SilverFlash)
drivenByStem.applySavedCarStyle(raceCar)
drivenByStem.showSavedDriverProfile()
//@highlight
//@validate-exists
info.setScore(0)
//@validate-exists
info.setLife(drivenByStem.savedEfficiency())
```

## {8. Add a Reset Button}

**Preparing for Shared Use**

---

In a classroom or activation event, multiple students will use the same device. A reset button clears saved data so each new group starts fresh. This is good systems thinking — designing for the context where your project will actually be used.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :game pad: Open `||controller:Controller||` and drag `on button pressed` into the workspace outside of `||loops(noclick):on start||`.
* :mouse pointer: Change the button to `B`.
* :racing_car: Inside the event, add `reset saved session` and `game reset`.

~hint Button not working? ⚠️

---

If pressing B does nothing, check that this event is standalone. Events don't work when nested inside another stack.

hint~

```blocks
//@highlight
//@validate-exists
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    drivenByStem.resetSavedSession()
    game.reset()
})
```

## Complete

**You did it!** You just built the foundation of a working race simulator. You created a car sprite, wired up controller movement, connected the game to saved data, and set up a live dashboard that tracks performance and efficiency. A faster car is useful only if the whole system can still control and support it.

Roles in this tutorial: software engineer, systems engineer, and track engineer.
