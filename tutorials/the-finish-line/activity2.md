# Reflect and Review

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Reflect and Review @showdialog

![Drew - UX/Game Designer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/drew.png)

Nice to see you again, I'm Drew, UX and game designer on the team. Since you've already met me, here's something new: a big part of my job is watching for the exact moment someone hesitates. If a player pauses, clicks the wrong thing, or asks "What am I supposed to do now?", that's useful design data. I turn those moments into clearer prompts, better screen layouts, and simpler next steps.

In this gate, you'll turn your run into a simple story: one choice, one result, one next test. Designers call it "clear over clever." Once you can read what your data is actually telling you, you'll be ready to make your final call before the winners circle. The next-test focus you save here becomes Kai's closing handoff.

## {1. Create review variables}

**Prepare Data Containers for Analysis**

---

Before you can analyze performance, you need somewhere to store the evidence. Creating these four variables establishes named containers that will soon hold your actual run results. This separation between structure (the variables) and content (the loaded data) is a fundamental pattern in data analysis workflows.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Keep Building On Your Last Stage</h4>
            <p>This activity continues the project you already updated in Final Challenge. You will add new review blocks to that same project instead of starting over.</p>
            <p>The start vehicle test track block is still available in the Driven by STEM category if you want to run the full track again and compare results. When you return to this lesson, keep your Review stage blocks connected so your analysis still works.</p>
        </div>
    </div>

* :paper plane: Open `||variables:Variables||` and create `||variables:reviewScore`, `||variables:reviewEfficiency`, `reviewStrategy`, and `||variables:pitStopsVisited`.
* :keyboard: Set each variable to `0`. This means nothing has loaded yet.

~hint Can't find your variable? ⌨️

---

If you can't find a variable later, check spelling first. One letter off or a different capital is the most common cause.

hint~

```blocks
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

Saved data becomes meaningful when you load it for analysis. Starting the Review stage and reading your latest saved Performance and Efficiency snapshot, plus your running Strategy score and pit-stop total, brings the abstract numbers from the full session into concrete variables you can compare, evaluate, and act upon. This is the moment raw results become insight.

* :binoculars: In `||loops(noclick):on start||`, find the `||drivenByStem:start stage||` block that is currently set to **Final Challenge**.
* :racing car: Change that same block so it is set to **Review**.
* :racing car: Use the saved results blocks to read the last Performance (`||drivenByStem:lastPerformanceResult||`), Efficiency `||drivenByStem:lastEfficiencyResult||`, and Strategy scores `||drivenByStem:lastStrategyResult||` into your variables.
* :racing car: Read the saved pit stop count `||drivenByStem:savedPitStopCount||` into `||variables:pitStopsVisited||`.

~hint All values still zero? 🔢

---

If all your values are still zero, the final run probably didn't save. The review has nothing real to read yet.

hint~

```blocks
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

```ghost
drivenByStem.startVehicleTestTrack()
```

## {3. Show a one-screen summary}

**Present Key Metrics Clearly**

---

Numbers in variables are invisible to players. A well-designed summary screen takes your three core metrics and presents them in a single, readable snapshot that anyone can understand at a glance. Clear presentation turns data into communication, making results accessible to the entire team.

* :game pad: Open `||game:Game||` and add a `||game:splash||` block.
* :keyboard: Build the message to show `||variables:Perf||`, `||variables:Eff||`, and `||variables:Strat||` using your three variables.

~hint Summary hard to read? 👀

---

If the summary feels hard to read, trim it. Short labels and fewer numbers usually land better than more explanation.

hint~

```blocks
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
* :racing car: If `||variables:reviewEfficiency||` is low (less than 3), use `||drivenByStem:Driven by STEM||` to set an efficiency-focused next-test focus; else if `||variables:reviewStrategy||` is low (less than 3), set an adaptation-focused focus; otherwise set a balanced focus.
* :game pad: Add a `||game:splash||` block after your `if / else if / else` chain.
* :keyboard: In the first text box, type `||game:Next test focus||` so players know what message they are reading.
* :racing car: In the second text box, use `||drivenByStem:nextTestFocus||` to show the recommendation your code just saved.

~hint Which lens to pick? 🤔

---

There's no single correct answer here. Use whichever lens scored lowest as your starting point.

hint~

```blocks
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

Every role on a racing team views data differently. By checking whether you used pit stops across the session, you're evaluating strategic adaptation—a skill that data analysts and strategists value highly. Connecting your results to a professional role helps you see how these decisions map to real career pathways.

This step has no single correct answer. Try your own logic.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :paper plane: Open `||logic:Logic||`.
* :game pad: If `pitStopsVisited` > `0`, show a message about using information during the session.
* :game pad: Otherwise show a message about using more mid-run data next time.

~hint How to frame the message? 💬

---

Keep the tone forward-looking. "Next test" language beats "I messed up" language. Same facts, better learning vibe.

hint~

```blocks
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

You used the data from your run to make a real team decision. By looking at your performance, efficiency, strategy, and pit-stop results together, you figured out what your car handled well and what your team should pay attention to next.

That is an important computer science idea: saved information matters when your program brings it back, compares it, and helps you choose what to do.

That is also real engineering work. Teams do not just test and move on. They pause, review what happened, and use that evidence to plan a smarter next run.

In this activity, you were thinking like a UX/game designer, strategist, and data analyst all at once.
