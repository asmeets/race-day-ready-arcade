# Winners Circle

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Winners Circle @showdialog

Hi, I'm Kai, your operations lead. I got into this work the hands-on way: setting up equipment, keeping things running, and figuring out systems by doing them. Over time I added project planning and process design, because reliability isn't luck, it's something you build. On a real team I coordinate timelines, make sure resets go smoothly, and create handoffs so the next shift can pick up right where we left off. In this last gate, you'll use your saved data to celebrate what you built, explore where these skills connect to real careers, and leave with a clear next-step idea. Finishing is great, and a good handoff means the work keeps going.

```template
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.setRoleLens(raceDayTools.RoleLens.Strategist)
```

## Step 1 – Start Winners Circle stage

The Winners Circle is a closing phase, not a driving challenge. Start it now so everything that follows runs in the right context.

* Open `||loops(noclick):on start||` and find your setup code.
* :racing_car: Open `||raceDayTools:Driven by STEM||` and drag `start stage` into `on start`, then set it to `Winners Circle`.

> **Kai tip:** If this still feels like gameplay, some older spawners are still running. Scan for any "update every" blocks that don't check the Winners Circle stage.

```blocks
raceDayTools.loadRaceProfile(80, 5)
//@highlight
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.WinnersCircle)
```

## Step 2 – Set the celebration scene

A bright background and a screen effect signal to players that the race is over and it's time to reflect.

* :tree: Open `||scene:Scene||` and set the background to a bright color.
* :paint brush: Open `||effects:Effects||` and start confetti or another screen effect.

> **Kai tip:** If confetti makes the text hard to read, tone it down. A good finish is clear first, flashy second.

```blocks
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.startStage(raceDayTools.RaceStage.WinnersCircle)
//@highlight
//@validate-exists
scene.setBackgroundColor(8)
//@highlight
//@validate-exists
effects.confetti.startScreenEffect()
```

## Step 3 – Create closing variables

The program stores messages (text) and scores (numbers) differently, so create both types before loading any saved data.

* :paper plane: Open `||variables:Variables||` and create a text variable named `nextTestFocus`.
* Create a second variable named `finalStrategy` and give it a starting value of `0`.

> **Kai tip:** If saved values won't drop into your variables, check that you created them first. Always create variables before you load data into them.

```blocks
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.startStage(raceDayTools.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
//@highlight
//@validate-exists
let nextTestFocus = ""
//@highlight
//@validate-exists
let finalStrategy = 0
```

## Step 4 – Read closing data

Load the values saved earlier in the experience so the summary reflects what this player actually did.

* :racing_car: Open `||raceDayTools:Driven by STEM||` and set `nextTestFocus` from the saved recommendation.
* Set `finalStrategy` from the saved strategy result.
* Drag `show saved driver profile` into `on start`.

> **Kai tip:** If your saved recommendation is blank, that's a clue the Review gate didn't write it yet. Trace where it's supposed to be saved.

```blocks
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.startStage(raceDayTools.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
//@highlight
nextTestFocus = raceDayTools.nextTestFocus()
//@highlight
finalStrategy = raceDayTools.lastStrategyResult()
//@highlight
//@validate-exists
raceDayTools.showSavedDriverProfile()
```

## Step 5 – Connect setup to a career lens

This step has no single correct answer. Try your own logic.

* :paper plane: Open `||logic:Logic||` and add an `if / else` block.
* If setup focus was Pace, show `"Career link: performance engineer"`.
* Otherwise show `"Career link: strategist/sustainability lead"`.

> **Kai tip:** Keep the message inclusive. If your text sounds like "only one right way," try rewriting it as "here's what this choice prioritized."

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.startStage(raceDayTools.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
nextTestFocus = raceDayTools.nextTestFocus()
finalStrategy = raceDayTools.lastStrategyResult()
raceDayTools.showSavedDriverProfile()
//@highlight
if (raceDayTools.setupFocusIs(raceDayTools.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
```

## Step 6 – Show the CS takeaway

One clear splash tells players which computer science ideas powered the whole experience.

* :game pad: Open `||game:Game||` and drag a `splash` block into `on start`.
* Set the text to `"Events, variables, and saved data carried your choices forward."`.

> **Kai tip:** If the takeaway is getting long, trim it. One clear line that's readable on a projector beats five lines nobody reads.

```blocks
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.startStage(raceDayTools.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
nextTestFocus = raceDayTools.nextTestFocus()
finalStrategy = raceDayTools.lastStrategyResult()
raceDayTools.showSavedDriverProfile()
if (raceDayTools.setupFocusIs(raceDayTools.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
//@highlight
//@validate-exists
game.splash("Computer science mattered", "Events, variables, and saved data carried your choices forward.")
```

## Step 7 – End with a next-test idea

This step has no single correct answer. Try your own logic.

* :paper plane: Open `||logic:Logic||` and add an `if / else` block.
* If `finalStrategy` is `≥ 3`, show an "adaptation success" message.
* Otherwise show `"Next test: "` joined with `nextTestFocus`.

> **Kai tip:** If you're stuck on what to write, pick the lens that felt weakest and make that your next test.

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.startStage(raceDayTools.RaceStage.WinnersCircle)
scene.setBackgroundColor(8)
effects.confetti.startScreenEffect()
let nextTestFocus = ""
let finalStrategy = 0
nextTestFocus = raceDayTools.nextTestFocus()
finalStrategy = raceDayTools.lastStrategyResult()
raceDayTools.showSavedDriverProfile()
if (raceDayTools.setupFocusIs(raceDayTools.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
game.splash("Computer science mattered", "Events, variables, and saved data carried your choices forward.")
//@highlight
if (finalStrategy >= 3) {
    game.splash("Engineering takeaway", "You adapted well across the full run.")
} else {
    game.splash("Engineering takeaway", "Next test: " + nextTestFocus)
}
```

## Complete

Computer science idea: events, variables, and saved data let choices made in one gate carry forward into the next.

Roles connected across the path: software engineer, systems engineer, performance engineer, strategist, data analyst, reliability engineer, and operations team.
