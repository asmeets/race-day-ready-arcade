# Mission Briefing

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
game.splash("Ready to build your F1 simulator!")
```

## Welcome to the Garage @showdialog

![Sam - Software Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/sam.png)

**Hi, I'm Sam, your software engineer on this team.** I got into coding by remixing games and following tutorials. No formal degree at first, just curiosity and small projects with friends. Later I added structured courses and certifications as I got more serious, and that mix of self-taught plus structured learning is what got me here.

On a real racing team, I write and test control code, fix unexpected behavior, and keep the dashboard reliable when it matters most. In this gate, you'll do that same foundational work: get the game running, build your car sprite, wire up the controls, and set up your dashboard. That's the setup every project starts with, and the team identity you save here will carry forward through the whole path.

## {1. Set the Garage Background}

**Creating the Visual Environment**

---

Every project starts somewhere. When I begin building a new system — a dashboard, a control interface, or a game — I always set the scene first. A garage background tells everyone instantly "we are in the engineering space now." Context matters: a blank screen gives users nothing to work with, and the first thing people see shapes how much they trust the whole system.

* :tree: Drag `||scene:set background image to garageBg||` from the toolbox into `||loops(noclick):on start||`.

~hint Garage image missing? 🔍

---

If the garage scene does not appear, make sure the block is snapped into the `on start` stack. Then open the gray image square, go to `the Gallery`, and check that `garageBg` is selected.

hint~

```blocks
//@highlight
//@validate-exists
scene.setBackgroundImage(assets.image`garageBg`)
```

```ghost
scene.setBackgroundImage(assets.image`garageBg`)
```

## {2. Add a Mission Message}

**Communicating the Player's Goal**

---

A clear opening message is something I think about carefully in every project. In software engineering, the first screen a user reads sets expectations for everything that follows. I have shipped dashboards where the opening text was ambiguous, and that one moment of uncertainty made people hesitant about the whole system. Short, direct, and honest — that is the standard. Think of this splash like a team radio call before a session: everyone needs the same objective before anything starts.

* :game pad: Open `||game:Game||` and drag `||game:splash||` under the background block in `||loops(noclick):on start||`.
* :keyboard: Type a short, one-sentence mission line like "Miami test session."
* :keyboard: Select the + icon in the `||game:splash||` block to add a second line that provides what the player will do like "Build a car you can explain."

~hint Message too long? ⚡

---

Keep this message short. If a player has to read a paragraph at launch, it's too much.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
//@highlight
//@validate-exists
game.splash("Miami test session", "Build a car you can explain.")
```

```ghost
game.splash("Miami test session", "Build a car you can explain.")
```

## {3. Create the Player Car}

**Building the Interactive Game Object**

---

When I first started remixing games, sprites were the moment object-oriented thinking clicked for me. An image stopped being just a picture — it became an object with properties: position, speed, collision type. Once you understand that an image is actually a data structure you can program, building interactive systems starts to make sense in a completely new way. Your race car is exactly that kind of object.

* :paper plane: Open `||sprites:Sprites||` and drag `||sprites:set mySprite to sprite of kind Player||` into `||loops(noclick):on start||`.
* :mouse pointer: Select the `mySprite` drop-down in the `||sprites:set mySprite to sprite of kind Player||` block and select `||variables(sprites):Rename variable...||`
* :keyboard: Rename the variable to `raceCar`.
* :mouse pointer: Select the image square to choose a car from the Gallery or draw your own car.

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
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
//@highlight
//@validate-exists
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
```

```ghost
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
```

## {4. Turn On Movement}

**Connecting Input to Action**

---

Movement is always the first thing I test when I start a new project. If the thing I'm controlling doesn't respond to input, nothing else matters yet. Wiring controller input to sprite movement is the most fundamental software loop there is: user acts, system responds. Real racing simulators do the same with physical hardware — steering wheel turns, sensors detect the input, code translates it into vehicle behavior. You're building that same connection right here.

* :game pad: Drag `||controller:move [raceCar] with buttons vx [80] vy [80]||` from the toolbox into `||loops(noclick):on start||`.
* :paper plane: Drag `||sprites:set [raceCar] stay in screen [On]||` under it.

~hint Car won't move? 🔧

---

If the car won't move, check which sprite the controller block is targeting. This is usually a naming issue.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
//@highlight
//@validate-exists
controller.moveSprite(raceCar, 80, 80)
//@highlight
//@validate-exists
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

```ghost
let raceCar: Sprite = null
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## {5. Load Saved Race State}

**Building Persistent Systems**

---

State management is one of the most important software engineering concepts you can learn. How a system saves and restores data is the difference between a prototype that works once and a system you can actually rely on run after run. Real race teams don't start each session from scratch — they load saved setups, previous lap data, and driver preferences. Your game does the same thing. The choices you save here will carry forward through every later stage of the experience.

* :racing car: Drag `||drivenByStem:load race profile||`, `||drivenByStem:start stage [Garage]||`, and `||drivenByStem:set base car speed to saved drive speed||` from the toolbox into `||loops(noclick):on start||` in that order.

~hint Blocks missing? 👀

---

If the blocks are missing, scroll the toolbox. Custom categories can hide farther down the list.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
//@validate-exists
drivenByStem.loadRaceProfile(80, 5)
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
//@highlight
//@validate-exists
drivenByStem.setBaseCarSpeed(drivenByStem.savedDriveSpeed())
```

```ghost
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
drivenByStem.setBaseCarSpeed(drivenByStem.savedDriveSpeed())
```

## {6. Save Team Identity}

**Creating Personalized Experience**

---

In software, user identity isn't a bonus feature — it is how a system shows it remembers you. When an app loads and shows your name, your settings, and your history, the experience feels personal and trustworthy. When it forgets everything, it feels broken. Saving your team name and customizing your car gives the whole experience that personal feel, and it is what makes this project genuinely yours to own and remix.

* :id card: Set your own team name using the `||drivenByStem:set team name to||` block.
* :id card: Customize your car with a name using the `||drivenByStem:set car name to||` block.
* :mouse pointer: Click the image in your existing `||sprites(noclick):set raceCar to sprite of kind Player||` block and change a few colors, add a stripe, or add a number for your team.
* :game pad: Run the simulator and make sure your edited car shows up on screen.
* :mouse pointer: Lastly, add `||drivenByStem:show saved driver profile||` to check that your team details were saved.

~hint Car not changing? 🎨

---

If your car is not changing, edit the image inside the existing `raceCar` sprite block from Step 3. If you drag in a second sprite block, you may end up customizing the wrong car.

hint~

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
drivenByStem.setBaseCarSpeed(drivenByStem.savedDriveSpeed())
//@highlight
//@validate-exists
drivenByStem.setTeamName("Apex Lab")
//@validate-exists
drivenByStem.setCarName("Velocity")
//@validate-exists
drivenByStem.showSavedDriverProfile()
```

```ghost
drivenByStem.setTeamName("Apex Lab")
drivenByStem.setCarName("Velocity")
drivenByStem.showSavedDriverProfile()
```

## {7. Choose Dashboard Units}

**Preparing the Shakedown Readout**

---

Data you can't read fast is data you can't use. A dashboard that shows speed in the wrong unit, or fuel in units nobody on your team uses, creates friction at exactly the moment when quick decisions matter. Localization choices like this are a real software problem that teams solve at every scale, from individual app settings to large international deployments. This same dashboard will later show fuel efficiency — so the units you set here are the first step in measuring sustainability too.

* :racing car: Drag `||drivenByStem:set speed display unit to [mph]||` and `||drivenByStem:set fuel display unit to [gallons]||` from the toolbox into `||loops(noclick):on start||`.
* :mouse pointer: Use the dropdowns to switch units if your team prefers `km/h` or `liters`.

~hint Wrong units later? 🐛

---

If the test track later shows the wrong units, check these blocks in `on start`. The last unit blocks in that stack are the settings the dashboard will use.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
drivenByStem.setBaseCarSpeed(drivenByStem.savedDriveSpeed())
drivenByStem.setTeamName("Apex Lab")
drivenByStem.setCarName("Velocity")
drivenByStem.showSavedDriverProfile()
//@highlight
//@validate-exists
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
//@validate-exists
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
```

```ghost
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
```

## {8. Add a Reset Button}

**Preparing for Shared Use**

---

Reset paths are the thing that gets skipped in first builds, and then someone hits a wall the first time they try to share the project. I learned this the hard way: built something I was proud of, tried to pass it to a friend, and there was no clean way for them to start fresh. A reset button is also essential for shared classroom use — each new team gets a fair start, and no leftover data from a previous group affects their run.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :game pad: Drag the `||controller:on [B] button pressed||` event from the toolbox into an empty area of the workspace — it already contains `||drivenByStem:reset saved session||` and `||game:reset game||`.

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

```ghost
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    drivenByStem.resetSavedSession()
    game.reset()
})
```

## Complete

**That was real software engineering work.** You created a car sprite, wired up controller input, connected saved state, customized your team's identity, and set up the dashboard readout — the same sequence you follow when standing up any new interactive system from scratch.<br><br>The team name, the car design, and the unit choices you made here will carry forward through every later stage. That is how real software is built: decisions made early travel with you through the whole project. Good setup makes everything that comes after it faster and more reliable.<br><br>Select **Done** to head into Setup and Tradeoffs with Riley.