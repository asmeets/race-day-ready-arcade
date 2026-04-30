# Pit Stop Briefings

### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Pit Stop Briefings @showdialog

![Morgan - Strategist](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/morgan.png)

Hey, I'm Morgan, your strategist. I didn't start out crunching data; I started in track operations, learning timing and logistics by doing the work and talking with the engineers and analysts around me. On a real team, I monitor live conditions, weigh safer options against riskier ones, and help everyone make fast calls with different pieces of information.

In this gate, you'll build a pit stop that reads the setup choice you saved earlier and turns it into a real decision with real consequences. The call you make here won't just happen and disappear. Each pit stop visit you record here shows up again in Reflect and Review.

## {1. Start the Pit Stop stage}

**Activating the Pit Wall Environment**

---

Before any pit decisions can happen, the game needs to know which mode it's running in. Setting the stage tells all your event blocks whether they should execute pit logic or stay quiet. This is how real systems coordinate different operational modes—one clear signal that every subsystem can check.

<div class="ui info message">
        <div class="content">
            <h4 id="diffs-in-tutorials">Something Looks Familiar...</h4>
            <p>This activity continues the code you already built in Hit the Track. You will keep updating that same project instead of rebuilding it.</p>
            <p>You can still find the start vehicle test track block in the Driven by STEM category anytime you want another full-track test in the simulator. For the required steps here, keep your Pit Stop stage blocks connected.</p>
        </div>
    </div>

* :binoculars: Open `||loops(noclick):on start||` and find the `||drivenByStem:start stage||` block you already changed to **Track** in the last activity.
* :racing car: Change that same `||drivenByStem:start stage||` block from **Track** to **Pit Stop**.

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
```

```ghost
drivenByStem.startVehicleTestTrack()
```

## {2. Show a short briefing}

**Communicating Context to the Driver**

---

In racing, clear communication prevents mistakes. A quick message at the start of the pit phase tells the player they've transitioned from driving to decision-making. This mirrors how race engineers brief drivers over the radio before critical moments—short, direct, and focused on what matters right now.

* :game pad: Open `||game:Game||` and add a `||game:splash||` block below your existing stage setter in `||loops(noclick):on start||`.
* :keyboard: Set the first field to `||game:Pit wall||` and the second field to `||game:Use data before you make the next call.||`

~hint Message too long? ⚡

---

Keep this briefing tight. If you need more than a few seconds to explain it, the prompt should be clearer, not longer.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
//@highlight
//@validate-exists
game.splash("Pit wall", "Use data before you make the next call.")
```

## {3. Track pit stops visited}

**Recording Strategic Decisions**

---

Every pit stop costs time, so teams track how often they use them to evaluate their strategy later. Creating a counter variable gives you measurable evidence of your decision-making patterns. This is the same principle data analysts use when they review race logs to identify what worked and what didn't.

* :paper plane: Open `||variables:Variables||` and make a new variable named `||variables:pitStopsVisited||`.
* :paper plane: Drag `||variables:set pitStopsVisited to 0||` into `||loops(noclick):on start||` below the splash.

~hint Lost evidence? 📊

---

If you skip the counter, you lose evidence. You should have at least one number you can point to: "We used the pit stop ___ times."

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.PitStop)
game.splash("Pit wall", "Use data before you make the next call.")
//@highlight
//@validate-exists
let pitStopsVisited = 0
```

## {4. Spawn pit markers}

**Creating Time-Limited Opportunities**

---

Pit windows appear and disappear based on track position and race conditions. By spawning markers on a timer with a limited lifespan, you're modeling the reality that strategic opportunities don't wait forever. 

Engineers design systems that create these windows, and strategists decide when to use them—both roles rely on timing.

* :game pad: Open `||game:Game||` and add an `||game:on update every (8000) ms||` block. (Make sure you manually change 500 to 8000.)
* :racing car: Inside the `||game:on update every (8000) ms||` block, add an `||logic:if stage is Pit Stop||`. HINT: You will need to use two different blocks to accomplish this step.
* :mouse pointer: Create a new variable called `||variables:pitMarker||` which will represent a pit stop.
* :paper plane: Simiilar to how we created an "enemy" sprite, we are going to add a `||sprites:set mysprite to sprite of kind player||` sprite inside the `||logic:if||` block. After adding the block, change "Player" to "Food".
* :mouse pointer: Change `||sprites:mySprite||` to `||sprites:pitStop||`.
* :mouse pointer: Select the image block next to sprite and select the pitStop image in the Gallery.
* :racing car: Add `||sprites:set mySprite position to x0 y0||` under the previous block. Change `||sprites:mySprite||` to `||sprites:pitMarker||`.
* :racing car: To make sure pit stops are randomly placed add `||math:pick random 0 to 0||` to both "X" and "Y". 
* :mouse pointer: For "X" pick random numbers between 20 and 140. For "Y", pick random numbers between 20 and 100.
* :racing car: Add `||sprites:set mySprite x to 0||` under the previous block. Change `||sprites:mySprite||` to `||sprites:pitMarker||`.
* :racing car: Change "X" to lifespan and set the value to 4000 to make it a timed decision.

~hint Markers vanishing too fast? ⏱️

---

If markers vanish instantly, your lifespan is probably too short. Increase it a little and test again.

hint~

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

## {5. Handle the pit choice}

**Applying Conditional Rewards Based on Setup**

---

The pit stop doesn't give the same reward to everyone—it responds to the setup choice you saved earlier. If you optimized for pace, you get a score boost; if you optimized for balance, you get efficiency back. This conditional logic mirrors how real teams tune their strategies to their car's strengths and the current race situation.

* :paper plane: Open `||sprites:Sprites||` and add an `||sprites:on Player overlaps Food||` block.
* :racing car: Inside the overlap block, add an `||logic:if stage is Pit Stop||` check.
* :paper plane: Inside that `if` block, change `||variables:pitStopsVisited||` by 1.
* :racing car: Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:record pit stop visit||`.
* :racing car: Add `||drivenByStem:award strategy points||` and set it to 1.
* :logic: Add an `||logic:if/else||` block inside the pit stop check. (This is a nested if/else block.)
* :racing car: In the `||logic:if||` condition, use `||drivenByStem:saved setup focus is pace||`.
* :score: In the true branch, add the pace reward by increasing score. (Hint: this block lives in `||info||`.)
* :heart: In the else branch, add the balance reward by increasing life. (Hint: this block lives in `||info||`.)

~hint Rewards feel backwards? 🔄

---

If rewards feel "backwards," double-check what you saved as your setup focus earlier. The pit logic is only as smart as the saved choice it reads.

hint~

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

```ghost
drivenByStem.setupFocusIs(drivenByStem.SetupFocus.Balance)
```

## {6. Save updated results}

**Persisting Decisions Across Stages**

---

Your pit decision only matters if it carries forward to the next stage. Saving the updated results at the end of the countdown ensures that later gates can see the score, efficiency, and strategy impact of what you did here. The pit-stop total itself is already being recorded every time you use a marker, and this end-of-run save captures the rest of the session snapshot.

* :game pad: Open `||info:Info||` and add an `||info:on countdown end||` block so this stage saves the updated run state when the carried race timer finishes. Inside this block, add two blocks which will create an "if/then" for the curent stage is pit stop.
* :racing car: Inside the `||logic:if current stage is Pit Stop||` check, open `||drivenByStem:Driven by STEM||` and drag in `save current run results`.

~hint Next gate forgot your choice? 💾

---

If the next gate doesn't seem to remember your updated score or efficiency, check two things: the carried countdown from Hit the Track still exists in your code, and this save happens after the pit decision changes something.

hint~

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
```ghost
drivenByStem.recordPitStopVisit()
```

## Complete

You just turned a pit stop into a real strategy decision. You built a system that created pit chances, tracked when you used them, changed the reward based on your earlier setup choice, and saved those results for the next stage.

In computer science, conditionals and saved values help one choice affect what happens later in the project.

In engineering, strategy is about making the best next move with limited time and limited information.

In this activity, you worked like a strategist, pit crew teammate, data analyst, and operations lead.
