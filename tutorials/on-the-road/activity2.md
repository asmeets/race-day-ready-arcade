# Pit Stop Briefings

### @diffs true

## Pit Stop Briefings @showdialog

![Morgan - Strategist](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/morgan.png)

Hey, I'm Morgan, your strategist. I didn't start out crunching data; I started in track operations, learning timing and logistics by doing the work and talking with the engineers and analysts around me. On a real team, I monitor live conditions, weigh safer options against riskier ones, and help everyone make fast calls with different pieces of information.

In this gate, you'll build a pit stop that reads the setup choice you saved earlier and turns it into a real decision with real consequences. The call you make here won't just happen and disappear. Each pit stop visit you record here shows up again in Reflect and Review.

## {1. Start the Pit Stop stage}

**Activating the Pit Wall Environment**

---

Strategy only works when the whole system knows it's in strategy mode. I came up through track operations, and the thing I learned fastest is that every subsystem on a pit wall — the timing board, the radio channel, the fuel calculator — needs to be tuned to the same phase of the race. If one part thinks you're still in qualifying while everyone else is managing a live pit window, the call falls apart. Switching the stage here is that synchronization signal: every event block, every timer, every handler now knows the pit phase is active.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Something Looks Familiar...</h4>
            <p>This activity continues the code you already built in Hit the Track. You will keep updating that same project instead of rebuilding it.</p>
            <p>You can still find the start vehicle test track block in the Driven by STEM category anytime you want another full-track test in the simulator. For the required steps here, keep your Pit Stop stage blocks connected.</p>
        </div>
    </div>

* :binoculars: Open `||loops(noclick):on start||` and find the `||drivenByStem:start stage||` block you already changed to **Track** in the last activity.
* :racing car: Change that same `||drivenByStem:start stage||` block from **Track** to **Pit Stop**.

~hint Show me the blocks 👀

---

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
```

hint~

```ghost
drivenByStem.startVehicleTestTrack()
```

## {2. Show a short briefing}

**Communicating Context to the Driver**

---

In live race operations, the briefing is the fastest thing on the pit wall. When conditions shift, I don't have time for a paragraph — I need one sentence that tells the driver what changed and what to do. Short, direct, and focused on the decision in front of them. This splash is that briefing: the driver knows they have left the track and entered a decision space where data matters more than pace. If a player has to read for more than a few seconds, the message is too long.

* :game pad: Drag `||game:splash||` (with text `Pit wall` and `Use data before you make the next call.`) from the toolbox into `||loops(noclick):on start||`.

~hint Message too long? ⚡

---

Keep this briefing tight. If you need more than a few seconds to explain it, the prompt should be clearer, not longer.

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
//@highlight
//@validate-exists
game.splash("Pit wall", "Use data before you make the next call.")
```

hint~

```ghost
game.splash("Pit wall", "Use data before you make the next call.")
```

## {3. Track pit stops visited}

**Recording Strategic Decisions**

---

Strategy without a ledger is just instinct. I track pit visits because frequency is one of the most informative signals in a race — teams that pit often are either managing a problem or buying speed in short bursts. Teams that rarely pit are betting on their baseline setup. Neither is always right, but both leave a footprint in the data. This counter gives you that footprint. When the Review gate reads it back, your pit-stop total becomes part of the story of how you ran the race.

* :paper plane: Drag `||variables:set pitStopsVisited to 0||` from the toolbox into `||loops(noclick):on start||`.

~hint Lost evidence? 📊

---

If you skip the counter, you lose evidence. You should have at least one number you can point to: "We used the pit stop ___ times."

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
game.splash("Pit wall", "Use data before you make the next call.")
//@highlight
//@validate-exists
let pitStopsVisited = 0
```

hint~

```ghost
let pitStopsVisited = 0
```

## {4. Spawn pit markers}

**Creating Time-Limited Opportunities**

---

Pit windows are one of the most time-sensitive things in race strategy. They open, they close, and a team that hesitates too long misses the opportunity. Spawning markers on a timer with a limited lifespan models exactly that dynamic: the window is real, but it will not wait for you. Part of my job is designing these windows — knowing when to open them, how long to hold them, and when to close them based on the live situation. The timing values here are tunable; if your team finds the windows too short or too easy to hit, those numbers are the first things to adjust.

* :game pad: Drag the `||game:on game update every [8000] ms||` pit marker spawner from the toolbox into an empty area of the workspace — the stage check, `pitMarker` Food sprite, random position, and lifespan are already configured inside.

~hint Markers vanishing too fast? ⏱️

---

If markers vanish instantly, your lifespan is probably too short. Increase it a little and test again.

```blocks
//@highlight
game.onUpdateInterval(8000, function () {
    //@highlight
    if (drivenByStem.stageIs(drivenByStem.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        let pitMarker = sprites.create(assets.image`pitMarker`, SpriteKind.Food)
        //@highlight
        pitMarker.setPosition(randint(20, 140), randint(20, 100))
        //@highlight
        pitMarker.lifespan = 4000
    }
})
```

hint~

```ghost
game.onUpdateInterval(8000, function () {
if (drivenByStem.stageIs(drivenByStem.RaceStage.PitStop)) {
let pitMarker = sprites.create(assets.image`pitMarker`, SpriteKind.Food)
pitMarker.setPosition(randint(20, 140), randint(20, 100))
pitMarker.lifespan = 4000
}
})
```

## {5. Handle the pit choice}

**Applying Conditional Rewards Based on Setup**

---

The most important thing about a pit stop decision isn't whether you take it — it's whether the reward fits the situation. A car tuned for pace gets a score boost because pace teams are optimizing for position. A car tuned for balance gets efficiency back because balance teams are optimizing for the whole race distance. Same action, different consequence, based on context saved earlier. That is what strategy software actually does: it reads the situation and applies different rules to different teams. The conditional logic you're building here is the same pattern used in real-time race management tools.

* :paper plane: Open `||sprites:Sprites||` and add an `||sprites:on [Player] overlaps [Food]||` block.
* :racing car: Inside the overlap block, add an `||logic:if||` check using `||drivenByStem:stage is||` set to **Pit Stop**.
* :paper plane: Inside that `if` block, change `||variables:pitStopsVisited||` by 1.
* :racing car: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:record pit stop visit||`.
* :racing car: Add `||drivenByStem:award strategy points||` and set it to 1.
* :logic: Add an `||logic:if else||` block inside the pit stop check. (This is a nested if/else block.)
* :racing car: In the `||logic:if||` condition, use `||drivenByStem:setup focus is||` set to **Pace**.
* :score: In the true branch, add the pace reward by increasing score. (Hint: this block lives in `||info:Info||`.)
* :heart: In the else branch, add the balance reward by increasing life. (Hint: this block lives in `||info:Info||`.)

~hint Rewards feel backwards? 🔄

---

If rewards feel "backwards," double-check what you saved as your setup focus earlier. The pit logic is only as smart as the saved choice it reads.

```blocks
//@highlight
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    //@highlight
    if (drivenByStem.stageIs(drivenByStem.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        pitStopsVisited += 1
        //@highlight
        //@validate-exists
        drivenByStem.recordPitStopVisit()
        //@highlight
        //@validate-exists
        drivenByStem.awardStrategyPoints(1)
        //@highlight
        //@validate-exists
        if (drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Pace)) {
            //@highlight
            info.changeScoreBy(5)
        } else {
            //@highlight
            info.changeLifeBy(2)
        }
        //@highlight
        otherSprite.destroy()
    }
})
```

hint~

```ghost
drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Balance)
```

## {6. Save updated results}

**Persisting Decisions Across Stages**

---

A decision that isn't saved is a decision that doesn't exist in the next phase. On a real pit wall, every call I make gets logged — fuel delta, lap number, tire choice, time cost. That log is what the post-race debrief works from. If the data isn't there, the debrief is just opinions. Saving at the end of the countdown makes sure that your updated score, efficiency state, and strategy total all make it into the record that the Review gate will read. The pit-stop count is already tracked — this save captures the rest of the picture.

* :game pad: Open `||info:Info||` and add an `||info:on countdown end||` block so this stage saves the updated run state when the carried race timer finishes. Inside this block, add an `||logic:if||` using `||drivenByStem:stage is||` set to **Pit Stop**.
* :racing car: Inside the `||logic:if||` check, open `||drivenByStem:Driven by STEM||` and drag in `||drivenByStem:save current run results||`.

~hint Next gate forgot your choice? 💾

---

If the next gate doesn't seem to remember your updated score or efficiency, check two things: the carried countdown from Hit the Track still exists in your code, and this save happens after the pit decision changes something.

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.PitStop)) {
        //@highlight
        //@validate-exists
        drivenByStem.saveCurrentRunResults()
    }
})
```

hint~

```ghost
drivenByStem.recordPitStopVisit()
```

## Complete

You turned a pit stop into a real strategic decision. The system created timed windows, tracked how often you used them, applied a different reward based on your earlier setup choice, and saved those results for the next stage.

In computer science, conditionals and saved values let one choice affect what happens later in the program. In race strategy, the same principle applies: every call you make during a live session changes the landscape of decisions available to you afterward.

Strategists, operations coordinators, data analysts, and race engineers all build and use systems like this one. The underlying skill is learning to make a call with incomplete information — and design the system so the consequences of that call carry forward cleanly.
