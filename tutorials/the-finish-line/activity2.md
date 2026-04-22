# Reflect and Review

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Results Review @showdialog

Real teams do not stop at the finish line. They review evidence and decide what to test next.

In this activity, you will read saved race data and generate a next-test recommendation.

```template
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.setTeamName("Apex Lab")
raceDayTools.setCarName("Velocity")
raceDayTools.setRoleLens(raceDayTools.RoleLens.DataAnalyst)
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
raceDayTools.setNextTestFocus("Review the data and test again.")
```

## Step 1 - Create Review Variables

Create variables to hold run data.

* Open `||variables:Variables||`.
* Create `reviewScore`, `reviewEfficiency`, `reviewStrategy`, and `pitStopsVisited`.
* Set each variable to `0`.

```blocks
//@highlight
//@validate-exists
let reviewScore = 0
//@validate-exists
let reviewEfficiency = 0
//@validate-exists
let reviewStrategy = 0
//@validate-exists
let pitStopsVisited = 0
```

## Step 2 - Read Saved Results

Load saved data into those variables.

* Open `Driven by STEM`.
* Start review stage.
* Read last performance, efficiency, strategy, and pit-stop count.

```blocks
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.Review)
reviewScore = raceDayTools.lastPerformanceResult()
reviewEfficiency = raceDayTools.lastEfficiencyResult()
reviewStrategy = raceDayTools.lastStrategyResult()
pitStopsVisited = raceDayTools.savedPitStopCount()
```

## Step 3 - Show Data Summary

Display one concise debrief line.

* Open `||game:Game||`.
* Add splash text with the three result values.

```blocks
//@highlight
//@validate-exists
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
```

## Step 4 - Choose Next Test Focus

Set a recommendation from evidence.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* Open `||logic:Logic||` and build an `if / else if / else` chain.
* If efficiency is low, set an efficiency-focused recommendation.
* Else if strategy is low, set an adaptation-focused recommendation.
* Else set a balanced recommendation.

```blocks
//@highlight
//@validate-exists
if (reviewEfficiency < 3) {
    //@validate-exists
    raceDayTools.setNextTestFocus("Protect efficiency during longer runs.")
} else if (reviewStrategy < 3) {
    //@validate-exists
    raceDayTools.setNextTestFocus("Adapt sooner when conditions change.")
} else {
    //@validate-exists
    raceDayTools.setNextTestFocus("Your setup stayed balanced under pressure.")
}
game.splash("Next test focus", raceDayTools.nextTestFocus())
```

## Step 5 - Connect Results to Role

Tie the run to team behavior.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* Open `||logic:Logic||`.
* If pit stops were visited, show a data-use message.
* Otherwise show a message about using mid-run data next time.

```blocks
//@highlight
//@validate-exists
if (pitStopsVisited > 0) {
    game.splash(raceDayTools.roleLens(), "You used pit information during the run.")
} else {
    game.splash(raceDayTools.roleLens(), "Next time, use more mid-run data.")
}
```

## Complete

Computer science idea: stored values become usable evidence when the program reads them and makes a decision.

Engineering idea: review is part of the system, not a separate afterthought.
