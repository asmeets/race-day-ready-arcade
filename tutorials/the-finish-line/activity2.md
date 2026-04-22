# Reflect and Review

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Results Review @showdialog

![Drew - UX/Game Designer](/static/guides/drew.png)

Hey, I'm **Drew**, UX and game designer on the team. I got into this field by being the person who always asked "Wait… what am I supposed to do?" I started self-taught, watching tutorials and redesigning menus in my own projects, then added a formal design class and a lot of **playtesting with friends**. On a real team, I write clearer prompts, pick readable visuals, and run playtests to find exactly where people get confused.

In this gate, you'll turn your run into a simple story: **one choice, one result, one next test**. Designers call it **"clear over clever."** Once you can read what your data is actually telling you, you'll be ready to make your final call before the winners circle.

```template
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.setRoleLens(raceDayTools.RoleLens.DataAnalyst)
```

## Step 1 – Create review variables

Four variables give the program named containers to hold run data before it loads anything.

* :paper plane: Open `||variables:Variables||` and create `reviewScore`, `reviewEfficiency`, `reviewStrategy`, and `pitStopsVisited`.
* Set each variable to `0`. This means nothing has loaded yet.

> **Drew tip:** If you can't find a variable later, check spelling first. One letter off or a different capital is the most common cause.

```blocks
raceDayTools.loadRaceProfile(80, 5)
//@highlight
//@validate-exists
let reviewScore = 0
//@highlight
//@validate-exists
let reviewEfficiency = 0
//@highlight
//@validate-exists
let reviewStrategy = 0
//@highlight
//@validate-exists
let pitStopsVisited = 0
```

## Step 2 – Start the Review stage and read saved results

Starting the Review stage and reading stored values brings real run data into the program.

* :racing_car: Open `||raceDayTools:Driven by STEM||` and set start stage to `Review`.
* Use the saved results blocks to read the last Performance, Efficiency, and Strategy scores into your variables.
* Read the saved pit stop count into `pitStopsVisited`.

> **Drew tip:** If all your values are still zero, the final run probably didn't save. The review has nothing real to read yet.

```blocks
raceDayTools.loadRaceProfile(80, 5)
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.Review)
//@highlight
//@validate-exists
reviewScore = raceDayTools.lastPerformanceResult()
//@highlight
//@validate-exists
reviewEfficiency = raceDayTools.lastEfficiencyResult()
//@highlight
//@validate-exists
reviewStrategy = raceDayTools.lastStrategyResult()
//@highlight
//@validate-exists
pitStopsVisited = raceDayTools.savedPitStopCount()
```

## Step 3 – Show a one-screen summary

One splash screen turns the loaded numbers into something the team can actually read.

* :game pad: Open `||game:Game||` and add a `splash` block.
* Build the message to show Perf, Eff, and Strat using your three variables.

> **Drew tip:** If the summary feels hard to read, trim it. Short labels and fewer numbers usually land better than more explanation.

```blocks
raceDayTools.loadRaceProfile(80, 5)
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
raceDayTools.startStage(raceDayTools.RaceStage.Review)
reviewScore = raceDayTools.lastPerformanceResult()
reviewEfficiency = raceDayTools.lastEfficiencyResult()
reviewStrategy = raceDayTools.lastStrategyResult()
pitStopsVisited = raceDayTools.savedPitStopCount()
//@highlight
//@validate-exists
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
```

## Step 4 – Choose a next-test focus

An `if / else if / else` chain turns the weakest score into a concrete recommendation.

This step has no single correct answer. Try your own logic.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :paper plane: Open `||logic:Logic||` and build an `if / else if / else` chain.
* If `reviewEfficiency` is low, use `||raceDayTools:Driven by STEM||` to set an efficiency-focused next-test focus; else if `reviewStrategy` is low, set an adaptation-focused focus; otherwise set a balanced focus.
* Show the recommendation with a `splash` block.

> **Drew tip:** There's no single correct answer here. Use whichever lens scored lowest as your starting point.

```blocks
raceDayTools.loadRaceProfile(80, 5)
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
raceDayTools.startStage(raceDayTools.RaceStage.Review)
reviewScore = raceDayTools.lastPerformanceResult()
reviewEfficiency = raceDayTools.lastEfficiencyResult()
reviewStrategy = raceDayTools.lastStrategyResult()
pitStopsVisited = raceDayTools.savedPitStopCount()
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
//@highlight
if (reviewEfficiency < 3) {
    raceDayTools.setNextTestFocus("Protect efficiency during longer runs.")
} else if (reviewStrategy < 3) {
    raceDayTools.setNextTestFocus("Adapt sooner when conditions change.")
} else {
    raceDayTools.setNextTestFocus("Your setup stayed balanced under pressure.")
}
//@highlight
game.splash("Next test focus", raceDayTools.nextTestFocus())
```

## Step 5 – Connect results to a role

A short if/else checks whether the team used mid-run data and frames the next step in forward-looking language.

This step has no single correct answer. Try your own logic.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :paper plane: Open `||logic:Logic||`.
* If `pitStopsVisited` > `0`, show a message about using information during the run.
* Otherwise show a message about using more mid-run data next time.

> **Drew tip:** Keep the tone forward-looking. "Next test" language beats "I messed up" language. Same facts, better learning vibe.

```blocks
raceDayTools.loadRaceProfile(80, 5)
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
raceDayTools.startStage(raceDayTools.RaceStage.Review)
reviewScore = raceDayTools.lastPerformanceResult()
reviewEfficiency = raceDayTools.lastEfficiencyResult()
reviewStrategy = raceDayTools.lastStrategyResult()
pitStopsVisited = raceDayTools.savedPitStopCount()
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
if (reviewEfficiency < 3) {
    raceDayTools.setNextTestFocus("Protect efficiency during longer runs.")
} else if (reviewStrategy < 3) {
    raceDayTools.setNextTestFocus("Adapt sooner when conditions change.")
} else {
    raceDayTools.setNextTestFocus("Your setup stayed balanced under pressure.")
}
game.splash("Next test focus", raceDayTools.nextTestFocus())
//@highlight
if (pitStopsVisited > 0) {
    game.splash(raceDayTools.roleLens(), "You used pit information during the run.")
} else {
    game.splash(raceDayTools.roleLens(), "Next time, use more mid-run data.")
}
```

## Complete

**Nicely done!** You turned saved run data into readable evidence. You loaded Performance, Efficiency, and Strategy scores, built conditional logic to identify what needs attention next, and connected your pit stop count to a clear next-test recommendation. Stored values become usable evidence when the program reads them and makes a decision.

Computer science idea: stored values become usable evidence when the program reads them and makes a decision.

Engineering idea: review is part of the system, not a separate afterthought.
