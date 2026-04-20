# Reflect and Review

### @explicitHints true
### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Results Review @showdialog

Real teams do not stop at the finish line. They review the run, compare evidence, and decide what to test next.

In this activity, you will turn saved race data into an engineering debrief.

```template
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.setTeamName("Apex Lab")
raceDayTools.setCarName("Velocity")
raceDayTools.setRoleLens(raceDayTools.RoleLens.DataAnalyst)
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
raceDayTools.setNextTestFocus("Review the data and test again.")
```

## Step 1

Create review variables.

```blocks
//@validate-exists
let reviewScore = 0
//@validate-exists
let reviewEfficiency = 0
//@validate-exists
let reviewStrategy = 0
//@validate-exists
let pitStopsVisited = 0
```

~hint
These variables hold the race data you are about to read. This makes the data-analysis step clearer in Blocks.
hint~

## Step 2

Read saved results.

```blocks
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.Review)
reviewScore = raceDayTools.lastPerformanceResult()
reviewEfficiency = raceDayTools.lastEfficiencyResult()
reviewStrategy = raceDayTools.lastStrategyResult()
pitStopsVisited = raceDayTools.savedPitStopCount()
```

~hint
This step turns saved gameplay data into variables students can inspect and discuss.
hint~

## Step 3

Show the data.

```blocks
//@validate-exists
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
```

~hint
Keep the first report simple. Students should notice the categories before they interpret them.
hint~

## Step 4

Choose the next test focus.

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
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

~hint
This step shows how a program can interpret results and turn them into a next-step recommendation.
hint~

## Step 5

Connect the result to a role.

```blocks
//@validate-exists
if (pitStopsVisited > 0) {
    game.splash(raceDayTools.roleLens(), "You used pit information during the run.")
} else {
    game.splash(raceDayTools.roleLens(), "Next time, use more mid-run data.")
}
```

~hint
The role lens helps students explain the result from a team perspective, not just as a score.
hint~

## Complete

Computer science idea: stored values become usable evidence when the program reads them back and makes a decision.

Engineering idea: review is part of the system, not an extra step after the work.
