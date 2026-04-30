# Winners Circle

### @diffs true

```package
settings-blocks=github:microsoft/pxt-settings-blocks#v1.0.0
```


```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Winners Circle @showdialog

![Kai - Operations Lead](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/kai.png)

![Winners circle banner](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/sprites/finishBanner.png)

Hi, I'm Kai, your operations lead. I got into this work the hands-on way: setting up equipment, keeping things running, and figuring out systems by doing them. Over time I added project planning and process design, because reliability isn't luck, it's something you build. On a real team I coordinate timelines, make sure resets go smoothly, and create handoffs so the next shift can pick up right where we left off.

In this last gate, you'll use your saved data to celebrate what you built, explore where these skills connect to real careers, and leave with a clear next-step idea. Finishing is great, and a good handoff means the work keeps going. This final screen works because every earlier tutorial saved one more piece of the story.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">One More Tool You Can Still Use</h4>
            <p>The start vehicle test track block is still available in the Driven by STEM category if you want one more full-track run in the simulator before you celebrate your results.</p>
        </div>
    </div>


## {1. Start Winners Circle stage}

**Transition to Celebration Mode**

---

You've completed the challenge, and now it's time to celebrate and reflect. Setting the stage to Winners Circle signals that the competitive phase is over and the focus shifts to recognizing achievement, reviewing what you built, and connecting your work to broader career pathways and CS concepts.

* :binoculars: Open `||loops(noclick):on start||` and find your setup code.
* :racing car: Locate your `||drivenByStem:start stage||` block in `||loops(noclick):on start||`, then set it to `Winners Circle`.

~hint Still feels like gameplay? 🎮

---

If this still feels like gameplay, some older spawners are still running. Scan for any "update every" blocks that don't check the Winners Circle stage.

hint~

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
```

```ghost
drivenByStem.startVehicleTestTrack()
```

## {2. Set the celebration scene}

**Create a Victory Environment**

---

Visuals matter for closure. A bright background and celebratory screen effect immediately communicate that this is a different moment—not a challenge, but a celebration. These visual cues help players transition from performance pressure to reflection mode, setting the right tone for reviewing achievements.

* :tree: Open `||scene:Scene||` and set the background image to `finishBg`.
* :paint brush: Open `||effects:Effects||` and start confetti or another screen effect.

~hint Text hard to read? 🎉

---

If confetti makes the text hard to read, tone it down. A good finish is clear first, flashy second.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
//@highlight
//@validate-exists
scene.setBackgroundImage("finishBg")
//@highlight
//@validate-exists
effects.confetti.startScreenEffect()
```

## {3. Create closing variables}

**Prepare for Summary Data Display**

---

The Winners Circle displays both recommendations (text) and performance scores (numbers). Creating the right variable types before loading data ensures that your summary can present both qualitative insights and quantitative results cleanly, giving you a complete picture of what you accomplished.

* :paper plane: Open `||variables:Variables||` and create a text variable named `||variables:nextTestFocus||`.
* :paper plane: Create a second variable named `||variables:finalStrategy||` and give it a starting value of `0`.

~hint Variables not loading? 💾

---

If saved values won't drop into your variables, check that you created them first. Always create variables before you load data into them.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
//@highlight
//@validate-exists
let nextTestFocus = ""
//@highlight
//@validate-exists
let finalStrategy = 0
```

## {4. Read closing data}

**Retrieve Your Personal Journey Evidence**

---

The celebration is meaningful because it's personalized to your choices. Loading your `||variables:nextTestFocus||`, session strategy total, and driver profile ensures that every message you see reflects the actual decisions you made throughout the experience, making the reflection authentic rather than generic.

* :racing car: Open `||drivenByStem:Driven by STEM||` and set `||variables:nextTestFocus||` from the `next test focus` reporter.
* :racing car: Set `||variables:finalStrategy||` from the saved strategy result.
* :racing car: Drag `||drivenByStem:show saved driver profile||` into `||on start||`.

~hint Recommendation blank? 🔍

---

If your `next test focus` text is blank, that's a clue the Review gate didn't write it yet. Trace where it's supposed to be saved.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
//@highlight
nextTestFocus = drivenByStem.nextTestFocus()
//@highlight
finalStrategy = drivenByStem.lastStrategyResult()
//@highlight
//@validate-exists
drivenByStem.showSavedDriverProfile()
```

## {5. Connect setup to a career lens}

**Map Choices to Professional Roles**

---

Your engineering focus reveals the kind of work you prioritized. Whether you emphasized raw performance or balanced sustainability, each approach connects to real roles on a racing team—from performance engineers who squeeze every millisecond from a setup to strategists who optimize the whole system. This helps you see how your choices reflect actual career pathways.

This step has no single correct answer. Try your own logic.

* :paper plane: Open `||logic:Logic||` and add an `if / else` block.
* :game pad: If setup focus was Pace, show `"Career link: performance engineer"`.
* :game pad: Otherwise show `"Career link: strategist/sustainability lead"`.

~hint How to write this? ✍️

---

Keep the message inclusive. If your text sounds like "only one right way," try rewriting it as "here's what this choice prioritized."

hint~

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
nextTestFocus = drivenByStem.nextTestFocus()
finalStrategy = drivenByStem.lastStrategyResult()
drivenByStem.showSavedDriverProfile()
//@highlight
if (drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
```

## {6. Show the CS takeaway}

**Highlight the Technical Foundation**

---

Behind every racing decision was a computer science concept. Events detected collisions and pit stops, variables stored your tuning choices, and saved data carried those choices across tutorials. Explicitly naming these CS ideas helps you recognize that the technical skills you practiced here apply far beyond racing games.

* :game pad: Open `||game:Game||` and drag a `splash` block into `on start`.
* :keyboard: Set the text to `"Events, variables, and saved data carried your choices forward."`.

~hint Message too long? 📱

---

If the takeaway is getting long, trim it. One clear line that's readable on a projector beats five lines nobody reads.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
nextTestFocus = drivenByStem.nextTestFocus()
finalStrategy = drivenByStem.lastStrategyResult()
drivenByStem.showSavedDriverProfile()
if (drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
//@highlight
//@validate-exists
game.splash("Computer science mattered", "Events, variables, and saved data carried your choices forward.")
```

## {7. End with a next-test idea}

**Leave With a Forward-Looking Focus**

---

Every great team finishes one test by planning the next. Whether your session strategy total is high or you identified an area to strengthen, closing with a specific next-test idea models how real engineering teams maintain momentum. Completion isn't the end—it's a handoff to the next iteration.

This step has no single correct answer. Try your own logic.

* :paper plane: Open `||logic:Logic||` and add an `if / else` block.
* :game pad: If `||variables:finalStrategy||` is `≥ 3`, show an "adaptation success" message.
* :game pad: Otherwise show `"Next test: "` joined with `||variables:nextTestFocus||`.

~hint Stuck on what to write? ✍️

---

If you're stuck on what to write, pick the lens that felt weakest and make that your next test.

hint~

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
nextTestFocus = drivenByStem.nextTestFocus()
finalStrategy = drivenByStem.lastStrategyResult()
drivenByStem.showSavedDriverProfile()
if (drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
game.splash("Computer science mattered", "Events, variables, and saved data carried your choices forward.")
//@highlight
if (finalStrategy >= 3) {
    game.splash("Engineering takeaway", "You adapted well across the full session.")
} else {
    game.splash("Engineering takeaway", "Next test: " + nextTestFocus)
}
```

## Complete

**You finished the full journey!** You built a celebration screen that reads saved data, displays your team identity, shows performance metrics, and connects your choices to real career pathways. Events, variables, and saved data let choices made in one tutorial carry forward into the next. That's how you built a system that remembers.

Computer science idea: events, variables, and saved data let choices made in one tutorial carry forward into the next.

Engineering idea: reliable teams celebrate results and leave a clear handoff for the next test.

Roles connected across the path: software engineer, systems engineer, performance engineer, strategist, data analyst, reliability engineer, and operations team.
