# Reflect and Review

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Results Review @showdialog

![Drew - UX/Game Designer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/drew.png)

Hey, I'm **Drew**, UX and game designer on the team. I got into this field by being the person who always asked "Wait… what am I supposed to do?" I started self-taught, watching tutorials and redesigning menus in my own projects, then added a formal design class and a lot of **playtesting with friends**. On a real team, I write clearer prompts, pick readable visuals, and run playtests to find exactly where people get confused.

In this gate, you'll turn your run into a simple story: **one choice, one result, one next test**. Designers call it **"clear over clever."** Once you can read what your data is actually telling you, you'll be ready to make your final call before the winners circle.

```template
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.setRoleLens(drivenByStem.RoleLens.DataAnalyst)
```

## {1. Create review variables}

**Prepare Data Containers for Analysis**

---

Before you can analyze performance, you need somewhere to store the evidence. Creating these four variables establishes named containers that will soon hold your actual run results. This separation between structure (the variables) and content (the loaded data) is a fundamental pattern in data analysis workflows.

* :paper plane: Open `||variables:Variables||` and create `reviewScore`, `reviewEfficiency`, `reviewStrategy`, and `pitStopsVisited`.
* :keyboard: Set each variable to `0`. This means nothing has loaded yet.

~hint Can't find your variable? ⌨️

---

If you can't find a variable later, check spelling first. One letter off or a different capital is the most common cause.

hint~

```blocks
drivenByStem.loadRaceProfile(80, 5)
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

## {2. Start the Review stage and read saved results}

**Transform Stored Data into Usable Evidence**

---

Saved data becomes meaningful when you load it for analysis. Starting the Review stage and reading your Performance, Efficiency, and Strategy scores brings the abstract numbers from your final run into concrete variables you can compare, evaluate, and act upon. This is the moment raw results become insight.

* :racing_car: Open `||drivenByStem:Driven by STEM||` and set start stage to `Review`.
* :racing_car: Use the saved results blocks to read the last Performance, Efficiency, and Strategy scores into your variables.
* :racing_car: Read the saved pit stop count into `pitStopsVisited`.

~hint All values still zero? 🔢

---

If all your values are still zero, the final run probably didn't save. The review has nothing real to read yet.

hint~

```blocks
drivenByStem.loadRaceProfile(80, 5)
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Review)
//@highlight
//@validate-exists
reviewScore = drivenByStem.lastPerformanceResult()
//@highlight
//@validate-exists
reviewEfficiency = drivenByStem.lastEfficiencyResult()
//@highlight
//@validate-exists
reviewStrategy = drivenByStem.lastStrategyResult()
//@highlight
//@validate-exists
pitStopsVisited = drivenByStem.savedPitStopCount()
```

## {3. Show a one-screen summary}

**Present Key Metrics Clearly**

---

Numbers in variables are invisible to players. A well-designed summary screen takes your three core metrics and presents them in a single, readable snapshot that anyone can understand at a glance. Clear presentation turns data into communication, making results accessible to the entire team.

* :game pad: Open `||game:Game||` and add a `splash` block.
* :keyboard: Build the message to show Perf, Eff, and Strat using your three variables.

~hint Summary hard to read? 👀

---

If the summary feels hard to read, trim it. Short labels and fewer numbers usually land better than more explanation.

hint~

```blocks
drivenByStem.loadRaceProfile(80, 5)
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
drivenByStem.startStage(drivenByStem.RaceStage.Review)
reviewScore = drivenByStem.lastPerformanceResult()
reviewEfficiency = drivenByStem.lastEfficiencyResult()
reviewStrategy = drivenByStem.lastStrategyResult()
pitStopsVisited = drivenByStem.savedPitStopCount()
//@highlight
//@validate-exists
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
```

## {4. Choose a next-test focus}

**Turn Analysis into Actionable Next Steps**

---

Reviewing data without deciding what to do next leaves teams stuck. By evaluating which metric scored lowest, your program can suggest a specific focus for the next test cycle. This transforms passive observation into active engineering iteration—the core of how real teams improve performance over time.

This step has no single correct answer. Try your own logic.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :paper plane: Open `||logic:Logic||` and build an `if / else if / else` chain.
* :racing_car: If `reviewEfficiency` is low, use `||drivenByStem:Driven by STEM||` to set an efficiency-focused next-test focus; else if `reviewStrategy` is low, set an adaptation-focused focus; otherwise set a balanced focus.
* :game pad: Show the recommendation with a `splash` block.

~hint Which lens to pick? 🤔

---

There's no single correct answer here. Use whichever lens scored lowest as your starting point.

hint~

```blocks
drivenByStem.loadRaceProfile(80, 5)
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
drivenByStem.startStage(drivenByStem.RaceStage.Review)
reviewScore = drivenByStem.lastPerformanceResult()
reviewEfficiency = drivenByStem.lastEfficiencyResult()
reviewStrategy = drivenByStem.lastStrategyResult()
pitStopsVisited = drivenByStem.savedPitStopCount()
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
//@highlight
if (reviewEfficiency < 3) {
    drivenByStem.setNextTestFocus("Protect efficiency during longer runs.")
} else if (reviewStrategy < 3) {
    drivenByStem.setNextTestFocus("Adapt sooner when conditions change.")
} else {
    drivenByStem.setNextTestFocus("Your setup stayed balanced under pressure.")
}
//@highlight
game.splash("Next test focus", drivenByStem.nextTestFocus())
```

## {5. Connect results to a role}

**Frame Results Through a Career Lens**

---

Every role on a racing team views data differently. By checking whether you used pit stops during the run, you're evaluating strategic adaptation—a skill that data analysts and strategists value highly. Connecting your results to a professional role helps you see how these decisions map to real career pathways.

This step has no single correct answer. Try your own logic.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :paper plane: Open `||logic:Logic||`.
* :game pad: If `pitStopsVisited` > `0`, show a message about using information during the run.
* :game pad: Otherwise show a message about using more mid-run data next time.

~hint How to frame the message? 💬

---

Keep the tone forward-looking. "Next test" language beats "I messed up" language. Same facts, better learning vibe.

hint~

```blocks
drivenByStem.loadRaceProfile(80, 5)
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
drivenByStem.startStage(drivenByStem.RaceStage.Review)
reviewScore = drivenByStem.lastPerformanceResult()
reviewEfficiency = drivenByStem.lastEfficiencyResult()
reviewStrategy = drivenByStem.lastStrategyResult()
pitStopsVisited = drivenByStem.savedPitStopCount()
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
if (reviewEfficiency < 3) {
    drivenByStem.setNextTestFocus("Protect efficiency during longer runs.")
} else if (reviewStrategy < 3) {
    drivenByStem.setNextTestFocus("Adapt sooner when conditions change.")
} else {
    drivenByStem.setNextTestFocus("Your setup stayed balanced under pressure.")
}
game.splash("Next test focus", drivenByStem.nextTestFocus())
//@highlight
if (pitStopsVisited > 0) {
    game.splash(drivenByStem.roleLens(), "You used pit information during the run.")
} else {
    game.splash(drivenByStem.roleLens(), "Next time, use more mid-run data.")
}
```

## Complete

**Nicely done!** You turned saved run data into readable evidence. You loaded Performance, Efficiency, and Strategy scores, built conditional logic to identify what needs attention next, and connected your pit stop count to a clear next-test recommendation. Stored values become usable evidence when the program reads them and makes a decision.

Computer science idea: stored values become usable evidence when the program reads them and makes a decision.

Engineering idea: review is part of the system, not a separate afterthought.
