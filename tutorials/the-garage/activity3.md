# Garage Shakedown

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

```template
// Pre-load all assets so they appear in the gallery
let __sprites = [assets.image`playerCar`, assets.image`garageCone`, assets.image`trackObstacle`, assets.image`pitMarker`, assets.image`rainPuddle`, assets.image`telemetryScreen`, assets.image`finishBanner`, assets.image`teamBadge`]
let __backgrounds = [assets.image`garageBg`, assets.image`trackBg`, assets.image`finishBg`, assets.image`weatherBg`]
```

## Garage Shakedown @showdialog

![Jordan - Test Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/jordan.png)

Hey, I'm Jordan, the test engineer on this crew. I didn't start out coding; I came up through hands-on troubleshooting, learning to document problems clearly before I ever touched an automated test. What hooked me was realizing you can turn "I think the car handles well" into "I know it does, and here's the data." **A shakedown run is just a short practice test to make sure the car is working before the real race begins.**

In this gate you'll launch a quick practice test track that reads your saved speed, fuel, and display units. The dashboard will show fuel, elapsed time, and speed while you drive. At the end, the system saves those results so the next stage can build on what you actually learned.

## {1. Set the Test Readout}

**Preparing the Test Data**

---

The first thing I do before any test is set up how I am going to read it. A run with ambiguous units is a run I can't compare to anything. If speed is in `mph` now and `km/h` later, my two runs are measuring different things and I don't even know it. Consistent test conditions are what make data usable. Your car sprite and saved setup are already carrying forward from the last gate — here your job is to document the readout configuration before the run starts, exactly the way a test engineer prepares the measurement system before the car leaves the garage.

* :mouse pointer: Find the `||drivenByStem:preview garage test bed||` block and drag it away from `||loops(noclick):on start||` so the garage preview does not open again.
* :mouse pointer: If `||drivenByStem:show saved driver profile||` is still connected, drag it away too.
* :racing car: Find the `||drivenByStem:start stage||` block in `||loops(noclick):on start||` and change its value from **Garage Setup** to **Garage Shakedown**.
* :racing car: Drag `||drivenByStem:set speed display unit to [mph]||` and `||drivenByStem:set fuel display unit to [gallons]||` from the toolbox. Use the dropdowns to switch if your team prefers different units.

~hint Wrong units later? 🔍

---

If the track later shows the wrong units, check these blocks first. The last speed and fuel unit blocks in `on start` are the settings the shakedown will use.

hint~

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
//@highlight
//@validate-exists
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
//@validate-exists
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
```
```ghost
drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
```

## {2. Launch the Test Track}

**Starting the Shakedown Run**

---

A shakedown is not about going fast. It is about getting one clean, controlled run that you can actually point to. The whole point is to remove as many unknowns as possible so that what you observe reflects the setup, not chaos. When I run a shakedown on a real system, I am not trying to win anything — I am trying to collect a baseline I trust. This block loads your saved configuration and starts the dashboard automatically, so the conditions are the same every time you press run.

* :racing car: Drag `||drivenByStem:start vehicle test track||` from the toolbox to the end of `||loops(noclick):on start||`.
* :game pad: Run the simulator, wait for the start lights, and watch the dashboard as you drive.

~hint Track not starting?

---

If the track does not open, make sure `start vehicle test track` is in `on start` and not inside a button event or another block.

If the garage preview or driver profile keeps appearing first, check that those older blocks from Activity 2 are no longer connected to `on start`.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
//@highlight
//@validate-exists
drivenByStem.startVehicleTestTrack()
```
```ghost
drivenByStem.startVehicleTestTrack()
```

## {3. Add a Retry Button}

**Making the Test Repeatable**

---

One run gives you a number. Two runs let you ask whether that number is real. This is the part of test engineering that people underestimate: a single result tells you almost nothing because there is no way to separate signal from luck. When I document problems before automating them, the first thing I write down is whether I saw it more than once. The retry button is how you go from "I think that happened" to "I saw it twice and the numbers matched." That is the difference between an observation and evidence.

* :game pad: Drag the `||controller:on [A] button pressed||` event from the toolbox into an empty area of the workspace — `||drivenByStem:start vehicle test track||` is already inside.
* :game pad: After one run ends, press `A` to launch another. When the second run finishes, the comparison will appear automatically.

~hint A button does nothing? 🔁

---

If `A` does nothing, check that the button event is a separate stack. Button events do not work when they are nested inside `on start`.

hint~

```blocks
//@highlight
//@validate-exists
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    //@validate-exists
    drivenByStem.startVehicleTestTrack()
})
```
```ghost
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
drivenByStem.startVehicleTestTrack()
})
```

## Nice work!

You set up consistent test conditions, ran a controlled shakedown, and built a fast way to repeat the run. That is the core test engineering loop: prepare, run, observe, repeat.

The data you collect in a shakedown is the most honest data you will get. No obstacles yet, no weather changes, no strategy decisions — just the car and the setup. That clean baseline is what every later comparison is measured against.

In computer science, saved settings and reusable events let you run the same system more than once without rebuilding it. In test engineering, repeatability is what turns an observation into a fact you can defend.

In this activity you worked like a test engineer, reliability engineer, and data engineer — three roles that show up on every team that builds things people depend on.
