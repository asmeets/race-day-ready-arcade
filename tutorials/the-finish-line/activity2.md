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

Data review starts with a structure question: where does the information live, and what shape is it in? I think about this the same way I think about a UI layout. Before you can show anything clearly, you need named containers in the right places. Variables that are declared before they are needed give your code a predictable structure — and predictable structure is what makes a screen readable instead of chaotic. In UX work we call this "information architecture." In code, it is just good variable setup.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Keep Building On Your Last Stage</h4>
            <p>This activity continues the project you already updated in Final Challenge. You will add new review blocks to that same project instead of starting over.</p>
            <p>The start vehicle test track block is still available in the Driven by STEM category if you want to run the full track again and compare results. When you return to this lesson, keep your Review stage blocks connected so your analysis still works.</p>
        </div>
    </div>

* :paper plane: Drag `||variables:set reviewScore to 0||`, `||variables:set reviewEfficiency to 0||`, `||variables:set reviewStrategy to 0||`, and `||variables:set pitStopsVisited to 0||` from the toolbox into `||loops(noclick):on start||`.

~hint Can't find your variable? ⌨️

---

If you can't find a variable later, check spelling first. One letter off or a different capital is the most common cause.

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

hint~

```ghost
let reviewScore = 0
let reviewEfficiency = 0
let reviewStrategy = 0
let pitStopsVisited = 0
```

## {2. Start the Review stage and read saved results}

**Transform Stored Data into Usable Evidence**

---

This is the moment raw numbers become something you can actually read and act on. In UX design, the review screen is one of the hardest screens to get right because it has to hold a lot of information without overwhelming the person looking at it. Loading saved performance, efficiency, and strategy scores into named variables gives you the material to work with. The `Review` stage tag tells every block in the project that we are now in analysis mode — not collecting data anymore, but examining what we collected.

* :binoculars: In `||loops(noclick):on start||`, find the `||drivenByStem:start stage||` block that is currently set to **Final Challenge**.
* :racing car: Change that same block so it is set to **Review**.
* :racing car: Use the saved results blocks to read the last Performance (`||drivenByStem:last performance result||`), Efficiency (`||drivenByStem:last efficiency result||`), and Strategy scores (`||drivenByStem:last strategy result||`) into your variables.
* :racing car: Read the saved pit stop count (`||drivenByStem:saved pit stop count||`) into `||variables:pitStopsVisited||`.

~hint All values still zero? 🔢

---

If all your values are still zero, the final run probably didn't save. The review has nothing real to read yet.

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

hint~

```ghost
drivenByStem.startVehicleTestTrack()
```

## {3. Show a one-screen summary}

**Present Key Metrics Clearly**

---

"Clear over clever" is a principle I use every time I design a results screen. The temptation is to show everything — every metric, every subscore, every detail. But if a player has to parse for more than two seconds, the message has already failed. One screen. Three numbers. Short labels. That is the entire brief for this step. A readable summary is not a dumbed-down one. It is a designed one — and designing for clarity is harder than it looks.

* :game pad: Drag `||game:splash||` from the toolbox — it already formats your performance, efficiency, and strategy values into one message.

~hint Summary hard to read? 👀

---

If the summary feels hard to read, trim it. Short labels and fewer numbers usually land better than more explanation.

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

hint~

```ghost
game.splash("Race data", "Perf " + reviewScore + " Eff " + reviewEfficiency + " Strat " + reviewStrategy)
```

## {4. Choose a next-test focus}

**Turn Analysis into Actionable Next Steps**

---

The question I ask after every playtest is: "OK, and what does that mean we should do next?" If the answer is "we're not sure," the data isn't being read clearly enough. This step turns the lowest score into a concrete next-test suggestion — not a judgment about what went wrong, but a specific, actionable focus for the next run. Designers and engineers both work this way: close every feedback loop with a forward-looking action item, not just an observation.

This step has no single correct answer. Try your own logic.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :paper plane: Open `||logic:Logic||` and build an `if / else if / else` chain.
* :racing car: If `||variables:reviewEfficiency||` is low (less than 3), use `||drivenByStem:Driven by STEM||` to set an efficiency-focused next-test focus; else if `||variables:reviewStrategy||` is low (less than 3), set an adaptation-focused focus; otherwise set a balanced focus.
* :game pad: Add a `||game:splash||` block after your `if / else if / else` chain.
* :keyboard: In the first text box, type `Next test focus` so players know what message they are reading.
* :racing car: In the second text box, use `||drivenByStem:next test focus||` to show the recommendation your code just saved.

~hint Which lens to pick? 🤔

---

There's no single correct answer here. Use whichever lens scored lowest as your starting point.

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

hint~

```ghost
if (reviewEfficiency < 3) {
drivenByStem.setNextTestFocus("Protect efficiency during longer runs.")
} else if (reviewStrategy < 3) {
drivenByStem.setNextTestFocus("Adapt sooner when conditions change.")
} else {
drivenByStem.setNextTestFocus("Your setup stayed balanced under pressure.")
}
game.splash("Next test focus", drivenByStem.nextTestFocus())
```

## {5. Connect results to a role}

**Frame Results Through a Career Lens**

---

One of the most powerful UX patterns is connecting behavior to identity. When the screen says "you worked like a strategist" instead of just showing a score, it gives the player a frame for understanding what their choices actually meant. The pit-stop check is a proxy for strategic behavior — if you used the pit stops, you were actively managing information during the run. That behavior connects directly to careers in race strategy, data analysis, and operations. This is what it looks like when a number becomes a story.

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

hint~

```ghost
if (pitStopsVisited > 0) {
game.splash(drivenByStem.roleLens(), "You used pit information during the run.")
} else {
game.splash(drivenByStem.roleLens(), "Next time, use more mid-run data.")
}
```

## Complete

You used your run data to make a real team decision. Performance, efficiency, strategy, and pit-stop count, read together and turned into a forward-looking focus and a career connection.

That is the UX principle at work: information is not valuable because it exists. It is valuable when someone can read it quickly, understand what it means, and know what to do next. "Clear over clever" applies here the same way it applies to a game menu or a dashboard screen.

In computer science, saved information matters when your program brings it back, compares it, and helps someone choose what to do. In design, the review screen is the moment you find out whether the whole experience communicated clearly. In this activity you were thinking like a UX designer, strategist, and data analyst all at once.
