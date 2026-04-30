# Mission Briefing

### @diffs true

```package
settings-blocks=github:microsoft/pxt-settings-blocks#v1.0.0
```

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Mission Briefing @showdialog

![Sam - Software Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/sam.png)

**Hi, I'm Sam, your software engineer on this team.** I got into coding by remixing games and following tutorials. No formal degree at first, just curiosity and small projects with friends. Later I added structured courses and certifications as I got more serious, and that mix of self-taught plus structured learning is what got me here.

On a real racing team, I write and test control code, fix unexpected behavior, and keep the dashboard reliable when it matters most. In this gate, you'll do that same foundational work: get the game running, build your car sprite, wire up the controls, and set up your dashboard. That's the setup every project starts with, and the team identity you save here will carry forward through the whole path.

## {1. Set the Garage Background}

**Creating the Visual Environment**

---

Every game starts with a scene. Setting the garage background gives your game a clear location from the moment it launches. This is the first thing players experience, and it helps the whole racing setup feel like a real team workspace.

* :tree: Open `||scene:Scene||` and drag `||scene:set background image to||` into `||loops(noclick):on start||`.
* :mouse pointer: Select the gray image square on the block to open the image picker.
* :mouse pointer: Select the "Gallery" button and choose the garage background image, `garageBg`.

~hint Garage image missing? 🔍

---

If the garage scene does not appear, make sure the block is snapped into the `on start` stack. Then open the gray image square, go to `the Gallery`, and check that `garageBg` is selected.

hint~

```blocks
//@highlight
//@validate-exists
scene.setBackgroundImage(assets.image`garageBg`)
```

## {2. Add a Mission Message}

**Communicating the Player's Goal**

---

Clear communication is essential in both games and engineering. A mission message tells players what they're about to do and why it matters. Think of it like a team briefing before a test session - everyone needs to know the objective.

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

## {3. Create the Player Car}

**Building the Interactive Game Object**

---

In racing games and simulations, the car is more than just an image — it's an interactive object with properties like position, speed, and collision detection.<br><br>Building and designing a sprite gives you a programmable object you can control, move, and respond to events. This is how digital simulations represent real-world objects.

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

## {4. Turn On Movement}

**Connecting Input to Action**

---

A car that can't move isn't much of a simulator. Wiring up controller input to sprite movement is how you transform button presses into on-screen action. Real racing simulators do the same thing — they translate driver input (steering, throttle, brakes) into vehicle behavior. Here you're building that connection.

* :game pad: Open `||controller:Controller||` and drag `||controller:move mySprite with buttons||` into `||loops(noclick):on start||`.
* :keyboard: Select the + icon and enter `80` for both horizontal and vertical velocity values (vx and vy).
* :paper plane: Open `||sprites:Sprites||` and add `||sprites:set mysprite auto destroy off||`.
* :mouse pointer: In the `||sprites:set raceCar auto destroy off||` change "auto destroy" to "stay in screen".
* :mouse pointer: In the `||sprites:set raceCar auto destroy off||` change the "Off" to "On" so your car can't leave the view.

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

## {5. Load Saved Race State}

**Building Persistent Systems**

---

Professional race teams don't start from scratch every session — they load saved setups, previous lap data, and driver preferences. Your game does the same thing. Loading saved data lets your choices carry forward across different stages, just like real engineering systems that remember past configurations and results.

* :game pad: We first need to load our game defaults. Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:load race profile||` to `||loops(noclick):on start||`.
* :game pad: Next we need to set the current stage of our game. Add the `||drivenByStem:start stage (Garage)||` block in the `||loops(noclick):on start||`. 
* :mouse pointer: To set our car's speed we need to add the `||drivenByStem:set base car speed to||` block to `||loops(noclick):on start||`.
* :racing car: Then we set the speed using the `||drivenByStem:saved drive speed||` variable from the ||`drivenByStem`|| toolbox in the `||drivenByStem:set base car speed to||` on top of the existing "80" value.

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

## {6. Save Team Identity}

**Creating Personalized Experience**

---

Every racing team has an identity — a name, a car name, and a look. In this step, you'll save your team details and then edit the sprite directly so the car on screen feels like your own design. That gives students practice with the image editor while keeping the project personal and remixable.

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

## {7. Choose Dashboard Units}

**Preparing the Shakedown Readout**

---

Racing teams need data they can read fast. Your shakedown dashboard will show speed and fuel during the test track, so this step lets you choose the units your team wants to read. Small display choices like this help teams compare results clearly.

* :racing car: Add `||drivenByStem:set speed display unit to||` at the bottom of `||loops(noclick):on start||`.
* :mouse pointer: Select `mph` or `km/h` for the speed readout.
* :racing car: Add `||drivenByStem:set fuel display unit to||` at the bottom of `||loops(noclick):on start||`.
* :mouse pointer: Choose `gallons` or `liters` for the fuel readout.

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

## {8. Add a Reset Button}

**Preparing for Shared Use**

---

If you share your project with a friend, or multiple people want to try your game, a reset button clears saved data so each new group starts fresh. This is good systems thinking — designing for the context where your project will actually be used.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :game pad: Open `||controller:Controller||` and drag `||controller:on button pressed||` into the workspace outside of `||loops(noclick):on start||`.
* :mouse pointer: Change the button to `B`.
* :racing car: Inside the `||controller:on button pressed||` event, add `||drivenByStem:reset saved session||` and `||game:reset game||`.

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

**You did it!** You just built the foundation of a working race simulator. You created a car sprite, wired up controller movement, connected the game to saved data, customized your team's car, and chose how your shakedown dashboard will show speed and fuel. The team details you saved and the car you customized here are now ready to travel into the next tutorial.<br><br>In the next stage, you'll take this setup onto the test track and start collecting data on your car's performance. That data will be the key to improving your design and climbing the leaderboard, so get ready to put it to work!<br><br> Select the "Done" button to go to the next stage.