# Winners Circle

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Winners Circle @showdialog

The last screen should show what the student did, what ideas they used, and which roles connect to those decisions.

In this activity, you will close the path with a summary based on saved data.

```template
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.setTeamName("Apex Lab")
raceDayTools.setCarName("Velocity")
raceDayTools.setRoleLens(raceDayTools.RoleLens.Strategist)
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
raceDayTools.setNextTestFocus("Review the data and test again.")
```

## Step 1 - Set Final Scene

Create a summary atmosphere.

* Open `||scene:Scene||` and set background color.
* Open `||effects:Effects||` and start confetti.
* Open `Driven by STEM` and start winners circle stage.

```blocks
//@highlight
//@validate-exists
scene.setBackgroundColor(8)
//@validate-exists
effects.confetti.startScreenEffect()
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.WinnersCircle)
```

## Step 2 - Create Closing Variables

Create variables before reading saved values.

* Open `||variables:Variables||`.
* Create `nextTestFocus` text variable and `finalStrategy` number variable.

```blocks
//@highlight
//@validate-exists
let nextTestFocus = ""
//@validate-exists
let finalStrategy = 0
```

## Step 3 - Read Closing Data

Load saved reflection values.

* Open `Driven by STEM`.
* Set `nextTestFocus` from saved recommendation.
* Set `finalStrategy` from saved strategy result.
* Show saved driver profile.

```blocks
//@highlight
nextTestFocus = raceDayTools.nextTestFocus()
finalStrategy = raceDayTools.lastStrategyResult()
//@validate-exists
raceDayTools.showSavedDriverProfile()
```

## Step 4 - Connect Setup to Career Lens

Link setup focus to role framing.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* Open `||logic:Logic||`.
* If setup focus was `Pace`, show performance engineer message.
* Else show strategist message.

```blocks
//@highlight
//@validate-exists
if (raceDayTools.setupFocusIs(raceDayTools.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
```

## Step 5 - Show CS Takeaway

State the coding idea clearly.

* Open `||game:Game||`.
* Add one splash summarizing events, variables, and saved data.

```blocks
//@highlight
//@validate-exists
game.splash("Computer science mattered", "Events, variables, and saved data carried your choices forward.")
```

## Step 6 - End with Next Test Idea

Close with an iteration-focused message.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* Open `||logic:Logic||`.
* If strategy is strong, show adaptation success.
* Otherwise show saved next-test focus.

```blocks
//@highlight
//@validate-exists
if (finalStrategy >= 3) {
    game.splash("Engineering takeaway", "You adapted well across the full run.")
} else {
    game.splash("Engineering takeaway", nextTestFocus)
}
```

## Complete

You finished a cumulative engineering project.

Roles connected across the path: software engineer, systems engineer, performance engineer, strategist, data analyst, reliability engineer, and operations team.
