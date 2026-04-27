# Garage Shakedown

### @diffs true

```package
settings-blocks=github:microsoft/pxt-settings-blocks#v1.0.0
```

```customts
/**
 * Custom blocks for the Driven by STEM skillmap.
 */
//% color=#b40707 weight=100 icon="\uf1b9" block="Driven by STEM" groups='["Session", "Profile", "Setup", "Telemetry", "Review"]'
namespace drivenByStem {
    const DRIVE_SPEED_KEY = "driveSpeed"
    const EFFICIENCY_KEY = "efficiencyRating"
    const STRATEGY_KEY = "strategyPoints"
    const DRAIN_KEY = "efficiencyDrain"
    const WEATHER_KEY = "weatherCondition"
    const STAGE_KEY = "currentStage"
    const SETUP_FOCUS_KEY = "setupFocus"
    const COLLISION_KEY = "collisionCount"
    const PIT_STOPS_KEY = "pitStopsVisited"
    const LAST_SCORE_KEY = "lastResultScore"
    const LAST_EFFICIENCY_KEY = "lastResultEfficiency"
    const LAST_STRATEGY_KEY = "lastResultStrategy"
    const NEXT_FOCUS_KEY = "nextTestFocus"
    const TEAM_NAME_KEY = "teamName"
    const CAR_NAME_KEY = "carName"
    const ROLE_LENS_KEY = "roleLens"
    const CAR_STYLE_KEY = "carStyle"

    export enum RaceStage {
        //% block="garage"
        Garage,
        //% block="garage setup"
        GarageSetup,
        //% block="garage shakedown"
        GarageShakedown,
        //% block="track"
        Track,
        //% block="pit stop"
        PitStop,
        //% block="weather"
        Weather,
        //% block="final challenge"
        FinalChallenge,
        //% block="review"
        Review,
        //% block="winner's circle"
        WinnersCircle
    }

    export enum SetupFocus {
        //% block="balance"
        Balance,
        //% block="pace"
        Pace
    }

    export enum WeatherMode {
        //% block="dry"
        Dry,
        //% block="rain"
        Rain
    }

    export enum RoleLens {
        //% block="performance engineer"
        PerformanceEngineer,
        //% block="strategist"
        Strategist,
        //% block="software engineer"
        SoftwareEngineer,
        //% block="data analyst"
        DataAnalyst
    }

    export enum CarStyle {
        //% block="silver flash"
        SilverFlash,
        //% block="volt lime"
        VoltLime,
        //% block="heat red"
        HeatRed
    }

    function stageName(stage: RaceStage): string {
        switch (stage) {
            case RaceStage.Garage:
                return "garage"
            case RaceStage.GarageSetup:
                return "garage-setup"
            case RaceStage.GarageShakedown:
                return "garage-shakedown"
            case RaceStage.Track:
                return "track"
            case RaceStage.PitStop:
                return "pit-stop"
            case RaceStage.Weather:
                return "weather"
            case RaceStage.FinalChallenge:
                return "final"
            case RaceStage.Review:
                return "review"
            case RaceStage.WinnersCircle:
                return "winner"
        }
        return "garage"
    }

    function setupFocusName(focus: SetupFocus): string {
        switch (focus) {
            case SetupFocus.Pace:
                return "pace"
            case SetupFocus.Balance:
            default:
                return "balance"
        }
    }

    function weatherName(weather: WeatherMode): string {
        switch (weather) {
            case WeatherMode.Rain:
                return "rain"
            case WeatherMode.Dry:
            default:
                return "dry"
        }
    }

    function roleLensName(role: RoleLens): string {
        switch (role) {
            case RoleLens.Strategist:
                return "strategist"
            case RoleLens.SoftwareEngineer:
                return "software engineer"
            case RoleLens.DataAnalyst:
                return "data analyst"
            case RoleLens.PerformanceEngineer:
            default:
                return "performance engineer"
        }
    }

    function carStyleName(style: CarStyle): string {
        switch (style) {
            case CarStyle.VoltLime:
                return "volt lime"
            case CarStyle.HeatRed:
                return "heat red"
            case CarStyle.SilverFlash:
            default:
                return "silver flash"
        }
    }

    function applyCarPalette(target: Sprite, bodyColor: number, accentColor: number, trimColor: number): void {
        let styled = target.image.clone()
        styled.replace(6, bodyColor)
        styled.replace(8, accentColor)
        styled.replace(5, trimColor)
        target.setImage(styled)
    }

    function ensureNumberSetting(name: string, value: number): void {
        if (!(settings.exists(name))) {
            settings.writeNumber(name, value)
        }
    }

    function ensureStringSetting(name: string, value: string): void {
        if (!(settings.exists(name))) {
            settings.writeString(name, value)
        }
    }

    /**
     * Load a race profile, or create one if this device has not saved setup data yet.
     */
    //% block="load race profile with drive speed $defaultSpeed and efficiency $defaultEfficiency"
    //% blockId=raceday_load_profile
    //% defaultSpeed.defl=80 defaultEfficiency.defl=5
    //% group="Session" weight=100
    export function loadRaceProfile(defaultSpeed: number, defaultEfficiency: number): void {
        ensureNumberSetting(DRIVE_SPEED_KEY, defaultSpeed)
        ensureNumberSetting(EFFICIENCY_KEY, defaultEfficiency)
        ensureNumberSetting(STRATEGY_KEY, 0)
        ensureNumberSetting(DRAIN_KEY, 1)
        ensureStringSetting(WEATHER_KEY, "dry")
        ensureStringSetting(STAGE_KEY, "garage")
        ensureStringSetting(SETUP_FOCUS_KEY, "balance")
        ensureNumberSetting(COLLISION_KEY, 0)
        ensureNumberSetting(PIT_STOPS_KEY, 0)
        ensureNumberSetting(LAST_SCORE_KEY, 0)
        ensureNumberSetting(LAST_EFFICIENCY_KEY, defaultEfficiency)
        ensureNumberSetting(LAST_STRATEGY_KEY, 0)
        ensureStringSetting(NEXT_FOCUS_KEY, "Review the data and test again.")
        ensureStringSetting(TEAM_NAME_KEY, "Apex Lab")
        ensureStringSetting(CAR_NAME_KEY, "Velocity")
        ensureStringSetting(ROLE_LENS_KEY, "performance engineer")
        ensureStringSetting(CAR_STYLE_KEY, "silver flash")
    }

    /**
     * Start a named stage in the skillmap run.
     */
    //% block="start stage $stage"
    //% blockId=raceday_start_stage
    //% group="Session" weight=90
    export function startStage(stage: RaceStage): void {
        settings.writeString(STAGE_KEY, stageName(stage))
    }

    /**
     * Check whether the current run is in a specific stage.
     */
    //% block="current stage is $stage"
    //% blockId=raceday_stage_is
    //% group="Session" weight=80
    export function stageIs(stage: RaceStage): boolean {
        return settings.readString(STAGE_KEY) == stageName(stage)
    }

    /**
     * Reset all saved session data on a shared device.
     */
    //% block="reset saved session"
    //% blockId=raceday_reset_session
    //% group="Session" weight=70
    export function resetSavedSession(): void {
        settings.clear()
    }

    /**
     * Save the team's name.
     */
    //% block="set team name to $name"
    //% blockId=raceday_set_team_name
    //% name.defl="Apex Lab"
    //% group="Profile" weight=100
    export function setTeamName(name: string): void {
        settings.writeString(TEAM_NAME_KEY, name)
    }

    /**
     * Read the team's name.
     */
    //% block="team name"
    //% blockId=raceday_team_name
    //% group="Profile" weight=90
    export function teamName(): string {
        return settings.readString(TEAM_NAME_KEY)
    }

    /**
     * Save the car's name.
     */
    //% block="set car name to $name"
    //% blockId=raceday_set_car_name
    //% name.defl="Velocity"
    //% group="Profile" weight=80
    export function setCarName(name: string): void {
        settings.writeString(CAR_NAME_KEY, name)
    }

    /**
     * Read the car's name.
     */
    //% block="car name"
    //% blockId=raceday_car_name
    //% group="Profile" weight=70
    export function carName(): string {
        return settings.readString(CAR_NAME_KEY)
    }

    /**
     * Save the student's role lens.
     */
    //% block="set role lens to $role"
    //% blockId=raceday_set_role_lens
    //% group="Profile" weight=60
    export function setRoleLens(role: RoleLens): void {
        settings.writeString(ROLE_LENS_KEY, roleLensName(role))
    }

    /**
     * Read the saved role lens.
     */
    //% block="role lens"
    //% blockId=raceday_role_lens
    //% group="Profile" weight=50
    export function roleLens(): string {
        return settings.readString(ROLE_LENS_KEY)
    }

    /**
     * Save the car's style.
     */
    //% block="set car style to $style"
    //% blockId=raceday_set_car_style
    //% group="Profile" weight=40
    export function setCarStyle(style: CarStyle): void {
        settings.writeString(CAR_STYLE_KEY, carStyleName(style))
    }

    /**
     * Apply the saved style colors to the player's car sprite.
     */
    //% block="apply saved car style"
    //% blockId=raceday_apply_car_style
    //% group="Profile" weight=30
    export function applySavedCarStyle(): void {
        const car = sprites.allOfKind(SpriteKind.Player)[0]
        if (!car) return
        switch (settings.readString(CAR_STYLE_KEY)) {
            case "volt lime":
                applyCarPalette(car, 7, 6, 1)
                break
            case "heat red":
                applyCarPalette(car, 2, 4, 1)
                break
            case "silver flash":
            default:
                applyCarPalette(car, 1, 9, 8)
                break
        }
    }

    /**
     * Show the saved team profile.
     */
    //% block="show saved driver profile"
    //% blockId=raceday_show_profile
    //% group="Profile" weight=20
    export function showSavedDriverProfile(): void {
        game.splash(teamName(), carName() + " | " + roleLens())
    }

    /**
     * Save the team's garage setup choices.
     */
    //% block="save team setup speed $speed efficiency cost $efficiencyCost focus $focus"
    //% blockId=raceday_save_setup
    //% speed.defl=80 efficiencyCost.defl=1
    //% group="Setup" weight=100
    export function saveTeamSetup(speed: number, efficiencyCost: number, focus: SetupFocus): void {
        settings.writeNumber(DRIVE_SPEED_KEY, speed)
        settings.writeNumber(DRAIN_KEY, efficiencyCost)
        settings.writeString(SETUP_FOCUS_KEY, setupFocusName(focus))
    }

    /**
     * Read the saved drive speed.
     */
    //% block="saved drive speed"
    //% blockId=raceday_saved_drive_speed
    //% group="Setup" weight=90
    export function savedDriveSpeed(): number {
        return settings.readNumber(DRIVE_SPEED_KEY)
    }

    /**
     * Read the saved efficiency value.
     */
    //% block="saved efficiency"
    //% blockId=raceday_saved_efficiency
    //% group="Setup" weight=80
    export function savedEfficiency(): number {
        return settings.readNumber(EFFICIENCY_KEY)
    }

    /**
     * Read the saved efficiency cost.
     */
    //% block="saved efficiency cost"
    //% blockId=raceday_saved_efficiency_cost
    //% group="Setup" weight=75
    export function savedEfficiencyCost(): number {
        return settings.readNumber(DRAIN_KEY)
    }

    /**
     * Read the saved strategy points.
     */
    //% block="saved strategy points"
    //% blockId=raceday_saved_strategy
    //% group="Setup" weight=70
    export function savedStrategyPoints(): number {
        return settings.readNumber(STRATEGY_KEY)
    }

    /**
     * Check the saved setup focus.
     */
    //% block="saved setup focus is $focus"
    //% blockId=raceday_setup_focus_is
    //% group="Setup" weight=60
    export function setupFocusIs(focus: SetupFocus): boolean {
        return settings.readString(SETUP_FOCUS_KEY) == setupFocusName(focus)
    }

    /**
     * Set the current weather condition.
     */
    //% block="set weather $weather"
    //% blockId=raceday_set_weather
    //% group="Telemetry" weight=100
    export function setWeather(weather: WeatherMode): void {
        settings.writeString(WEATHER_KEY, weatherName(weather))
    }

    /**
     * Check the current weather condition.
     */
    //% block="weather is $weather"
    //% blockId=raceday_weather_is
    //% group="Telemetry" weight=90
    export function weatherIs(weather: WeatherMode): boolean {
        return settings.readString(WEATHER_KEY) == weatherName(weather)
    }

    /**
     * Reset collision tracking for the current stage.
     */
    //% block="reset collision count"
    //% blockId=raceday_reset_collisions
    //% group="Telemetry" weight=80
    export function resetCollisionCount(): void {
        settings.writeNumber(COLLISION_KEY, 0)
    }

    /**
     * Record a collision as score loss, efficiency loss, and telemetry.
     */
    //% block="record collision score penalty $scorePenalty efficiency penalty $efficiencyPenalty"
    //% blockId=raceday_record_collision
    //% scorePenalty.defl=3 efficiencyPenalty.defl=1
    //% group="Telemetry" weight=70
    export function recordCollision(scorePenalty: number, efficiencyPenalty: number): void {
        info.changeScoreBy(0 - scorePenalty)
        info.changeLifeBy(0 - efficiencyPenalty)
        settings.writeNumber(COLLISION_KEY, settings.readNumber(COLLISION_KEY) + 1)
        settings.writeNumber(EFFICIENCY_KEY, info.life())
    }

    /**
     * Read the current collision count.
     */
    //% block="collision count"
    //% blockId=raceday_collision_count
    //% group="Telemetry" weight=60
    export function collisionCount(): number {
        return settings.readNumber(COLLISION_KEY)
    }

    /**
     * Record a pit stop visit.
     */
    //% block="record pit stop visit"
    //% blockId=raceday_record_pit_stop
    //% group="Telemetry" weight=50
    export function recordPitStopVisit(): void {
        settings.writeNumber(PIT_STOPS_KEY, settings.readNumber(PIT_STOPS_KEY) + 1)
    }

    /**
     * Read the saved pit stop count.
     */
    //% block="saved pit stop count"
    //% blockId=raceday_pit_stop_count
    //% group="Telemetry" weight=40
    export function savedPitStopCount(): number {
        return settings.readNumber(PIT_STOPS_KEY)
    }

    /**
     * Award strategy points and save them.
     */
    //% block="award strategy points $amount"
    //% blockId=raceday_award_strategy
    //% amount.defl=1
    //% group="Telemetry" weight=30
    export function awardStrategyPoints(amount: number): void {
        settings.writeNumber(STRATEGY_KEY, settings.readNumber(STRATEGY_KEY) + amount)
    }

    /**
     * Save the current run results for the review activities.
     */
    //% block="save current run results"
    //% blockId=raceday_save_results
    //% group="Review" weight=100
    export function saveCurrentRunResults(): void {
        settings.writeNumber(LAST_SCORE_KEY, info.score())
        settings.writeNumber(LAST_EFFICIENCY_KEY, info.life())
        settings.writeNumber(LAST_STRATEGY_KEY, settings.readNumber(STRATEGY_KEY))
        settings.writeNumber(EFFICIENCY_KEY, info.life())
    }

    /**
     * Read the last performance result.
     */
    //% block="last performance result"
    //% blockId=raceday_last_performance
    //% group="Review" weight=90
    export function lastPerformanceResult(): number {
        return settings.readNumber(LAST_SCORE_KEY)
    }

    /**
     * Read the last efficiency result.
     */
    //% block="last efficiency result"
    //% blockId=raceday_last_efficiency
    //% group="Review" weight=80
    export function lastEfficiencyResult(): number {
        return settings.readNumber(LAST_EFFICIENCY_KEY)
    }

    /**
     * Read the last strategy result.
     */
    //% block="last strategy result"
    //% blockId=raceday_last_strategy
    //% group="Review" weight=70
    export function lastStrategyResult(): number {
        return settings.readNumber(LAST_STRATEGY_KEY)
    }

    /**
     * Save the team's next test focus.
     */
    //% block="set next test focus $note"
    //% blockId=raceday_set_next_focus
    //% note.defl="Review the data and test again."
    //% group="Review" weight=60
    export function setNextTestFocus(note: string): void {
        settings.writeString(NEXT_FOCUS_KEY, note)
    }

    /**
     * Read the team's next test focus.
     */
    //% block="next test focus"
    //% blockId=raceday_next_focus
    //% group="Review" weight=50
    export function nextTestFocus(): string {
        return settings.readString(NEXT_FOCUS_KEY)
    }
}
```

```validation.global
# BlocksExistValidator
* markers: validate-exists
```

## Garage Shakedown @showdialog

![Jordan - Test Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/jordan.png)

![Shakedown cone concept](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/sprites/garageCone.png)

Hey, I'm **Jordan**, the test engineer on this crew. I didn't start out coding; I came up through hands-on troubleshooting, learning to **document problems clearly** before I ever touched an automated test. What hooked me was realizing you can turn "I think the car handles well" into **"I know it does, and here's the data."** That's exactly what a shakedown run is for: a short, controlled test before the real race begins.

In this gate you'll start a **15-second shakedown stage** and track every collision, your score, and your remaining life. At the end, you'll **save those results** so the next stage can react to what you actually learned. This short test is the evidence that powers Hit the Track.

```template
let driveSpeed = 110
let efficiencyDrain = 2
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
drivenByStem.loadRaceProfile(80, 5)
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
drivenByStem.applySavedCarStyle()
```

## {2. Turn On the HUD and Countdown}

**Establishing Performance Metrics and Time Limits**

---

A shakedown run needs clear boundaries — what are you measuring, and for how long? Setting the scoreboard and starting the countdown creates a fair, repeatable test window. Everyone gets the same 15 seconds to prove their setup works. This is how you make testing consistent and comparable.

* :game pad: Open `||info:Info||` and set score to `0` and life to your saved efficiency value.
* :game pad: Add `start countdown` set to `15` seconds.

~hint Countdown not starting? 📍

---

If the countdown doesn't start, search for where that block lives. Countdown setup works best in on start, not inside an overlap or timer event.

hint~

```blocks
drivenByStem.startStage(drivenByStem.RaceStage.GarageShakedown)
drivenByStem.resetCollisionCount()
efficiencyDrain = drivenByStem.savedEfficiencyCost()
drivenByStem.applySavedCarStyle()
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

If score climbs outside the shakedown, that's a sign your stage check is missing or mismatched. That's the first thing I'd audit.

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
        let cone = sprites.create(assets.image`garageCone`, SpriteKind.Enemy)
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

Computer science idea: timer events and saved data turn one short run into evidence the next stage can reuse.

Engineering idea: a shakedown checks whether design behavior matches design intent before full conditions.

Team roles in this tutorial: test engineer, reliability engineer, and data engineer.
