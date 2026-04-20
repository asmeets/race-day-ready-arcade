# Winners Circle

### @explicitHints true
### @diffs true

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Winners Circle @showdialog

The last screen should show what the student actually did, what ideas they used, and which careers connect to those decisions.

In this activity, you will close the path with a summary based on saved data, not a generic celebration screen.

```template
raceDayTools.loadRaceProfile(80, 5)
raceDayTools.setTeamName("Apex Lab")
raceDayTools.setCarName("Velocity")
raceDayTools.setRoleLens(raceDayTools.RoleLens.Strategist)
raceDayTools.setCarStyle(raceDayTools.CarStyle.SilverFlash)
raceDayTools.setNextTestFocus("Review the data and test again.")
```

## Step 1

Set the final scene.

```blocks
//@validate-exists
scene.setBackgroundColor(8)
//@validate-exists
effects.confetti.startScreenEffect()
//@validate-exists
raceDayTools.startStage(raceDayTools.RaceStage.WinnersCircle)
```

~hint
This scene should feel like a summary screen, not just a win screen.
hint~

## Step 2

Create closing variables.

```blocks
//@validate-exists
let nextTestFocus = ""
//@validate-exists
let finalStrategy = 0
```

~hint
Make the variables first, then load the saved values into them. That keeps the Blocks flow easier to follow.
hint~

## Step 3

Read the closing data.

```blocks
nextTestFocus = raceDayTools.nextTestFocus()
finalStrategy = raceDayTools.lastStrategyResult()
//@validate-exists
raceDayTools.showSavedDriverProfile()
```

~hint
Bring the saved profile back here so students feel that the ending belongs to their version of the project.
hint~

## Step 4

Connect choices to a role.

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
//@validate-exists
if (raceDayTools.setupFocusIs(raceDayTools.SetupFocus.Pace)) {
    game.splash("Career link", "You worked like a performance engineer.")
} else {
    game.splash("Career link", "You worked like a strategist balancing the whole system.")
}
```

~hint
This step connects gameplay choices to careers. The goal is for students to see their decisions as role-based thinking.
hint~

## Step 5

Show the CS takeaway.

```blocks
//@validate-exists
game.splash("Computer science mattered", "Events, variables, and saved data carried your choices forward.")
```

~hint
Name the computer science explicitly so students can connect the project to coding, not only to racing.
hint~

## Step 6

End with the next test idea.

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
//@validate-exists
if (finalStrategy >= 3) {
    game.splash("Engineering takeaway", "You adapted well across the full run.")
} else {
    game.splash("Engineering takeaway", nextTestFocus)
}
```

~hint
End with a takeaway that points toward iteration. Engineering is about what to test next, not only what already happened.
hint~

## Complete

You finished a cumulative engineering project.

Roles connected across the path: software engineer, systems engineer, performance engineer, strategist, data analyst, reliability engineer, and operations team.
