# Garage Shakedown

### @diffs true

```package
settings-blocks=github:microsoft/pxt-settings-blocks#v1.0.0
```


```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Garage Shakedown @showdialog

![Jordan - Test Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/jordan.png)

Hey, I'm Jordan, the test engineer on this crew. I didn't start out coding; I came up through hands-on troubleshooting, learning to document problems clearly before I ever touched an automated test. What hooked me was realizing you can turn "I think the car handles well" into "I know it does, and here's the data." **A shakedown run is just a short practice test to make sure the car is working before the real race begins.**

In this gate you'll launch a quick practice test track that reads your saved speed, fuel, and display units. The dashboard will show fuel, elapsed time, and speed while you drive. At the end, the system saves those results so the next stage can build on what you actually learned.

## {1. Set the Test Readout}

**Preparing the Test Data**

---

Before a good test starts, teams decide how they will read the data. Your edited car sprite already stays in the project from the garage steps, so here you can focus on the test readout. The track can show speed in `mph` or `km/h`, and fuel in `gallons` or `liters`. Setting those units now keeps your results readable and consistent when the run begins.

* :mouse pointer: Find the `||drivenByStem:preview garage test bed||` block from the last activity and drag it away from `||loops(noclick):on start||` so the garage preview does not open again.
* :mouse pointer: If `||drivenByStem:show saved driver profile||` is still connected in `||loops(noclick):on start||`, drag it away too so the shakedown can launch without an extra popup.
* :racing car: Find the `||drivenByStem:start stage||` block already in `||loops(noclick):on start||` from the last activity.
* :mouse pointer: Change the `||drivenByStem:start stage||` value from **Garage Setup** to **Garage Shakedown**.
* :racing car: From the `||drivenByStem:Driven by STEM||` Toolbox, add `||drivenByStem:set speed display unit to||` and `||drivenByStem:set fuel display unit to||` in your `||loops(noclick):on start||`.
* :mouse pointer: Choose the units your team wants to read by selecting the value from the dropdowns.

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

## {2. Launch the Test Track}

**Starting the Shakedown Run**

---

A shakedown needs a fair, repeatable test. The `||drivenByStem:start vehicle test track||` block opens the support track, uses your saved setup, and turns on the fuel, time, and speed dashboard automatically. That gives you one clean run to measure before you make the next decision.

* :racing car: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:start vehicle test track||` at the end of `||loops(noclick):on start||`.
* :game pad: Run the simulator and wait for the start lights before you drive. You can expand the simulator to full screen using the expand icon which is located at the top, above the sound icon.
* :game pad: Watch the dashboard as you drive so you can compare fuel use, elapsed time, and speed.

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

## {3. Add a Retry Button}

**Making the Test Repeatable**

---

One run gives you data. Two runs let you compare. Adding a retry button makes it easy to test again after a setup change and notice whether your pace, fuel use, or reaction improves. 

Engineers repeat tests so they can trust the pattern, not just one result.

* :game pad: Open `||controller:Controller||` and drag `||controller:on A button pressed||` into the workspace outside `||loops(noclick):on start||`.
* :mouse pointer: Inside the `||controller:on A button pressed||`, add `||drivenByStem:start vehicle test track||`.
* :game pad: After one run ends, press `A` to launch another run. When the second run finishes, the comparison will appear automatically.

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

## Nice work!

You just tested your car setup in a repeatable way, watched the dashboard data as you drove, and gave yourself a fast way to try again. That is what engineers do: test, notice patterns, and use the results to make better decisions.

In computer science, saved settings and reusable events help you run the same system more than once without rebuilding everything each time.

In engineering, repeated tests matter because they help you decide whether a result was a real improvement or just one lucky run.

In this activity, you worked like a test engineer, reliability engineer, and data engineer.
