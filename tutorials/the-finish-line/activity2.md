# Reflect and Review

### @explicitHints true

## Introduction @unplugged

Great engineers do not just race. They reflect.

In this activity, you will add a results screen that shows the player what they achieved and connects their choices to real engineering thinking.

## Step 1

When the countdown ends, show a results splash.

```blocks
info.onCountdownEnd(function () {
    game.splash("Race Complete!", "Check your results")
})
```

## Step 2

Display the final score as a game-over screen so players can see their Performance Points.

```blocks
info.onCountdownEnd(function () {
    game.over(true, effects.confetti)
})
```

## Step 3

Before the game ends, add a quick reflection prompt. Engineers always ask: what would I change?

```blocks
info.onCountdownEnd(function () {
    game.splash("Engineer check:", "What would you tune next?")
    game.over(true, effects.confetti)
})
```

## Step 4

Think about your choices:

- Did you go fast or play it safe?
- Did you visit pit stops or skip them?
- Was your Efficiency score high or low?
- What would a data analyst say about your results?

## Complete

You reviewed your race like a real engineer.

Every test session teaches something. The best teams use their results to improve the next run.
