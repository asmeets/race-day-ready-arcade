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

Before a good test starts, teams decide how they will read the data. Your edited car sprite already stays in the project from the garage steps, so here you can focus on the test readout. The track can show speed in `mph` or `km/h`, and fuel in `gallons` or `liters`. Setting those units now keeps your results readable and consistent when the run begins.

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

A shakedown needs a fair, repeatable test. The `||drivenByStem:start vehicle test track||` block opens the support track, uses your saved setup, and turns on the fuel, time, and speed dashboard automatically. That gives you one clean run to measure before you make the next decision.

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

One run gives you data. Two runs let you compare. Adding a retry button makes it easy to test again after a setup change and notice whether your pace, fuel use, or reaction improves. 

Engineers repeat tests so they can trust the pattern, not just one result.

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

You just tested your car setup in a repeatable way, watched the dashboard data as you drove, and gave yourself a fast way to try again. That is what engineers do: test, notice patterns, and use the results to make better decisions.

In computer science, saved settings and reusable events help you run the same system more than once without rebuilding everything each time.

In engineering, repeated tests matter because they help you decide whether a result was a real improvement or just one lucky run.

In this activity, you worked like a test engineer, reliability engineer, and data engineer.
