# Winners Circle

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Winners Circle @showdialog

![Kai - Operations Lead](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/kai.png)

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

Every phase of an operation needs a clear transition signal. I learned this running resets on track days — if you don't announce the phase change, someone is still running warmup procedures while someone else is trying to close out the session. Setting the stage to Winners Circle is that announcement. Every block in the project that checks the stage will now behave correctly for the celebration phase. Operations work is full of moments like this: one clear signal, and every part of the system lines up.

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

The environment communicates the phase shift before a single word is read. In operations, we use visual and physical cues to signal to the whole crew that the session has changed — different lighting in a pit bay, a flag change on the wall, a specific broadcast message to the team channel. A celebration scene does the same thing: the background image and confetti tell the player immediately that they are no longer being tested. They finished. That distinction matters for how people experience the moment.

* :tree: Drag `||scene:set background image to finishBg||` and `||effects:start screen effect confetti||` from the toolbox.

~hint Text hard to read? 🎉

---

If confetti makes the text hard to read, tone it down. A good finish is clear first, flashy second.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.WinnersCircle)
//@highlight
//@validate-exists
scene.setBackgroundImage(assets.image`finishBg`)
//@highlight
//@validate-exists
effects.confetti.startScreenEffect()
```
```ghost
scene.setBackgroundImage(assets.image`finishBg`)
effects.confetti.startScreenEffect()
```

## {3. Create closing variables}

**Prepare for Summary Data Display**

---

Good operations work requires the right container for each piece of information. A text recommendation and a strategy score are fundamentally different types — one is a string, one is a number — and trying to store or display them incorrectly is a common source of silent bugs. Creating the right variable types before you load anything is a discipline I apply every time I set up a new process or system: get the containers right before you fill them.

* :paper plane: Drag `||variables:set nextTestFocus to ''||` and `||variables:set finalStrategy to 0||` from the toolbox into `||loops(noclick):on start||`.

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
```ghost
let nextTestFocus = ""
let finalStrategy = 0
```

## {4. Read closing data}

**Retrieve Your Personal Journey Evidence**

---

A good handoff is specific and personal. When I close out a shift or hand a project to the next team, the worst thing I can leave them is a generic note that could apply to anyone. Loading the saved next-test focus and strategy total — instead of hardcoding a placeholder — means every player who reaches this screen sees a celebration that reflects what they actually did. That personalization is not a small thing. It is the difference between a ceremony that feels earned and one that feels like wallpaper.

* :racing car: Drag `||variables:set nextTestFocus to next test focus||`, `||variables:set finalStrategy to last strategy result||`, and `||drivenByStem:show saved driver profile||` from the toolbox into `||loops(noclick):on start||`.

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
```ghost
nextTestFocus = drivenByStem.nextTestFocus()
finalStrategy = drivenByStem.lastStrategyResult()
drivenByStem.showSavedDriverProfile()
```

## {5. Connect setup to a career lens}

**Map Choices to Professional Roles**

---

Operations leads think about role match constantly. Every task on a team gets done better when it is assigned to someone whose strengths fit the work. Checking setup focus here and connecting it to a role isn't just a game mechanic — it is a career awareness exercise. If you optimized for pace, you were thinking like a performance engineer. If you balanced the whole system, you were thinking like a strategist or sustainability lead. Neither is the "right" answer. Both are real roles on real teams, and knowing which mode you naturally work in is genuinely useful self-knowledge.

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
```ghost
if (drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Pace)) {
game.splash("Career link", "You worked like a performance engineer.")
} else {
game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
```

## {6. Show the CS takeaway}

**Highlight the Technical Foundation**

---

I want you to notice something about this step: the message is already written and pre-loaded. That is a feature, not a shortcut. In operations, you prepare the closing communication in advance so it is reliable and consistent regardless of who is at the keyboard when it runs. Pre-loading critical messages is a standard reliability practice. If the message only works when someone types it correctly under pressure at the end of a session, it will eventually fail. Prepared, tested, and ready to fire — that is the operations standard.

* :game pad: Drag `||game:splash||` from the toolbox — the message text is already set.

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
```ghost
game.splash("Computer science mattered", "Events, variables, and saved data carried your choices forward.")
```

## {7. End with a next-test idea}

**Leave With a Forward-Looking Focus**

---

Every operation ends with a handoff. In my experience, the teams that improve fastest are not the teams with the best single run — they are the teams that close every session by naming what they learned and where they are going next. This final check does exactly that: if the strategy total is strong, the message confirms the session was well run. If it isn't, the next-test focus from the review gate becomes the opening brief for the next round. That is the operations loop: finish, document, hand off, restart.

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
```ghost
if (finalStrategy >= 3) {
game.splash("Engineering takeaway", "You adapted well across the full session.")
} else {
game.splash("Engineering takeaway", "Next test: " + nextTestFocus)
}
```

## Complete

**You finished the full journey.** You built a celebration screen that reads saved data, displays your team identity, shows performance metrics, connects your choices to real career pathways, and leaves a specific next-test handoff.

Reliability isn't luck. It is something you build, step by step, gate by gate: consistent setup, repeatable tests, saved results, clear communication, and a handoff that the next person can actually use. That is operations thinking. That is also what every role on this team has been practicing in their own way.

Computer science idea: events, variables, and saved data let choices made in one tutorial carry forward into the next. Engineering idea: reliable teams celebrate results and leave a clear handoff for the next test.

Roles connected across the full path: software engineer, systems engineer, performance engineer, strategist, sustainability lead, data analyst, test engineer, UX designer, and operations lead. Every one of those is a real career. Every one of them uses what you built here.
