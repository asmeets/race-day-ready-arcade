# Garage Shakedown

### @diffs true

```package
driven-by-stem=github:asmeets/driven-by-stem
```

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Shakedown Run @showdialog

![Jordan - Test Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/jordan.png)

Hey, I'm **Jordan**, the test engineer on this crew. I didn't start out coding; I came up through hands-on troubleshooting, learning to **document problems clearly** before I ever touched an automated test. What hooked me was realizing you can turn "I think the car handles well" into **"I know it does, and here's the data."** That's exactly what a shakedown run is for: a short, controlled test before the real race begins.

In this gate you'll start a **15-second shakedown stage** and track every collision, your score, and your remaining life. At the end, you'll **save those results** so the next stage can react to what you actually learned. Let's turn your guesses into evidence.

```template
let driveSpeed = 110
let efficiencyDrain = 2
let raceCar = sprites.create(img`
    . . . 6 6 6 6 . .
    . . 6 8 8 8 6 . .
    . 6 6 6 6 6 6 6 .
    . 6 5 6 6 6 5 6 .
    6 6 6 6 6 6 6 6 6
    . 6 6 6 6 6 6 6 .
    . 6 5 6 6 6 5 6 .
    . . 6 6 6 6 6 . .
    . . . 6 6 6 . . .
`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.setRoleLens(drivenByStem.RoleLens.DataAnalyst)
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## {1. Start the Shakedown Stage}

**Initializing the Test Environment**

---

Before you can run a meaningful test, you need to establish a clean starting state. This means setting the correct stage, resetting counters, loading your saved configuration, and applying your team's visual identity. Real test engineers do this every time — clear the old data, confirm the setup, then begin.

* :racing_car: Open `||drivenByStem:Driven by STEM||` and add `start stage` set to **Garage Shakedown** inside `||loops(noclick):on start||`.
* :racing_car: Reset the collision count, then load your saved efficiency cost into `efficiencyDrain`.
* :id card: Apply the saved car style to `raceCar`.

~hint Wrong events firing? 🔍

---

If the wrong events fire, my first check is the stage. Make sure you really started Garage Shakedown before the timers begin.

hint~

```blocks
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
//@highlight
//@validate-exists
drivenByStem.resetCollisionCount()
//@highlight
efficiencyDrain = drivenByStem.savedEfficiencyCost()
//@highlight
//@validate-exists
drivenByStem.applySavedCarStyle(raceCar)
```

## {2. Turn On the HUD and Countdown}

**Establishing Performance Metrics and Time Limits**

---

A shakedown run needs clear boundaries — what are you measuring, and for how long? Setting the scoreboard and starting the countdown creates a fair, repeatable test window. Everyone gets the same 15 seconds to prove their setup works. This is how you make testing consistent and comparable.

* :game pad: Open `||info:Info||` and set score to `0` and life to your saved efficiency value.
* :game pad: Add `start countdown` set to `15` seconds.

~hint Countdown not starting? 📍

---

If the countdown doesn't start, look for where that block lives. Countdown setup works best in on start, not inside an overlap or timer event.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
drivenByStem.resetCollisionCount()
efficiencyDrain = drivenByStem.savedEfficiencyCost()
drivenByStem.applySavedCarStyle(raceCar)
//@highlight
//@validate-exists
info.setScore(0)
//@highlight
//@validate-exists
info.setLife(drivenByStem.savedEfficiency())
//@highlight
//@validate-exists
info.startCountdown(15)
```

## {3. Add Performance Scoring Over Time}

**Rewarding Clean Driving**

---

In racing, staying on track and avoiding obstacles is as important as going fast. This timed event awards points every second you survive without crashing. It's a simple metric, but it captures something real: consistency matters. Engineers use metrics like this to measure reliability under pressure.

* :game pad: Open `||game:Game||` and add `on game update every` set to `1000` ms.
* :racing_car: Inside the event, check that the stage is Garage Shakedown.
* :game pad: Open `||info:Info||` and add score `+1` inside that check.

~hint What's an event? 💡

---

In Arcade, an **EVENT** is a block that runs automatically when something specific happens.

Events run on their own — you don't call them from other code. Examples include `on start`, `on button pressed`, `on overlap`, and `on game update every`.

hint~

~hint Score climbing everywhere? 🚨

---

If you notice score climbing outside the shakedown, that's a sign your stage check is missing or mismatched. That's the first thing I'd audit.

hint~

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(1000, function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.GarageShakedown)) {
        //@validate-exists
        info.changeScoreBy(1)
    }
})
```

## {4. Spawn Test Hazards}

**Creating Dynamic Challenges**

---

A test without obstacles isn't much of a test. This event spawns cones at random positions every 2 seconds, forcing you to react and adapt. Real racing tests include slalom courses, braking zones, and obstacle avoidance for the same reason — you need to prove the car handles unpredictable situations.

* :game pad: Open `||game:Game||` and add another `on game update every` set to `2000` ms.
* :paper plane: Inside the event, check the stage, then create an Enemy cone sprite at a random position.
* :paper plane: Give the cone a short `lifespan` so the screen doesn't fill up.

~hint Cones feel impossible? ⚖️

---

If cones start to feel impossible, it's usually a timing issue. Re-check the interval and lifespan so the test stays challenging but fair.

hint~

```blocks
//@highlight
//@validate-exists
game.onUpdateInterval(2000, function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.GarageShakedown)) {
        //@validate-exists
        let cone = sprites.create(img`
            . . . c . . .
            . . c a c . .
            . c a a a c .
            c a a a a a c
        `, SpriteKind.Enemy)
        cone.setPosition(randint(20, 140), randint(20, 100))
        //@validate-exists
        cone.lifespan = 1500
    }
})
```

## {5. Record Collisions}

**Tracking Mistakes and Their Costs**

---

Every collision has a consequence. In your simulator, hitting a cone costs efficiency based on your setup choice from the previous gate. Recording these collisions lets you measure how your speed-versus-efficiency tradeoff plays out in practice. This is how engineers turn abstract design choices into measurable outcomes.

* :paper plane: Open `||sprites:Sprites||` and add an `on overlap` event for `Player` and `Enemy`.
* :racing_car: Inside the event, check the stage, then use `||drivenByStem:Driven by STEM||` to record the collision with `efficiencyDrain`.
* :paint brush: Destroy the cone with an effect so the impact is visually obvious.

~hint What's an overlap event? 🎯

---

An **OVERLAP EVENT** is a special event that runs automatically whenever two sprites touch each other on screen.

You tell it which two kinds of sprites to watch (like Player and Enemy), and the code inside runs every time they collide. This is how games detect hits, pickups, and other touch-based interactions.

In this step, you're using overlap to detect when your car hits a cone.

hint~

~hint Collisions don't cost anything? 🔢

---

If collisions don't seem to "cost" anything, I'd confirm what value you loaded into `efficiencyDrain` before the overlap event runs.

hint~

```blocks
//@highlight
//@validate-exists
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.GarageShakedown)) {
        //@validate-exists
        drivenByStem.recordCollision(3, efficiencyDrain)
        otherSprite.destroy(effects.disintegrate, 200)
    }
})
```

## {6. Save Results and Award Strategy}

**Completing the Test Cycle**

---

A test isn't finished until you save the results. This event runs automatically when the countdown ends, checking your performance and storing the data. If you drove cleanly (1 collision or fewer), you earn a strategy bonus. Either way, the system remembers what happened so the next stage can build on this evidence.

* :game pad: Open `||info:Info||` and add an `on countdown end` event.
* :racing_car: Inside the event, check if collisions are `≤ 1` and use `||drivenByStem:Driven by STEM||` to award Strategy `+1`.
* :racing_car: Use `||drivenByStem:Driven by STEM||` to save the current run results.

~hint Nothing saving at the end? 🎯

---

If the shakedown ends but nothing saves, I'd look inside your countdown-end event. The save block has to be inside that event to run at the finish.

hint~

```blocks
//@highlight
//@validate-exists
info.onCountdownEnd(function () {
    if (drivenByStem.stageIs(drivenByStem.RaceStage.GarageShakedown)) {
        if (drivenByStem.collisionCount() <= 1) {
            //@validate-exists
            drivenByStem.awardStrategyPoints(1)
        }
        //@validate-exists
        drivenByStem.saveCurrentRunResults()
        game.splash("Shakedown complete", "This data powers your next decisions.")
    }
})
```

## Complete

**Well done!** You just ran your first controlled test. You built timed events that spawn hazards and award points, an overlap handler that records collisions, and a countdown-end event that saves the results. You completed the full engineering loop: predict, test, measure, store.

A shakedown tests whether design behavior matches design intent. That's exactly what you just proved.

Roles in this tutorial: test engineer, reliability engineer, and data engineer.
