# Mission Briefing

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
    //% block="apply saved car style to $car"
    //% blockId=raceday_apply_car_style
    //% car.shadow=variables_get
    //% car.defl=raceCar
    //% group="Profile" weight=30
    export function applySavedCarStyle(car: Sprite): void {
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

## Garage Briefing @showdialog

![Sam - Software Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/sam.png)

Hi, I'm **Sam**, your software engineer on this team. I got into coding by remixing games and following tutorials. No formal degree at first, just curiosity and small projects with friends. Later I added structured courses and certifications as I got more serious, and that **mix of self-taught plus structured learning** is what got me here.

On a real racing team, I write and test control code, fix unexpected behavior, and keep the **dashboard reliable** when it matters most. In this gate, you'll do that same foundational work: **get the game running, build your car sprite, wire up the controls, and set up your dashboard**. That's the setup every project starts with, and you're ready for it.

```template
let driveSpeed = 80
let efficiencyDrain = 1
let raceCar: Sprite = null
```

## {1. Set the Garage Background}

**Creating the Visual Environment**

---

Every game starts with a scene. Setting the background color gives your game a visual identity from the moment it launches. This is the first thing players see, and it sets the tone for the entire racing experience.

* :tree: Open `||scene:Scene||` and drag `set background color` into `||loops(noclick):on start||`.

~hint Background not changing? 🔍

---

If the background doesn't change, make sure the block is snapped into the `on start` stack. A block sitting nearby won't run.

hint~

```blocks
//@highlight
//@validate-exists
scene.setBackgroundColor(6)
```

## {2. Add a Mission Message}

**Communicating the Player's Goal**

---

Clear communication is essential in both games and engineering. A mission message tells players what they're about to do and why it matters. Think of it like a team briefing before a test session — everyone needs to know the objective.

* :game pad: Open `||game:Game||` and drag `splash` under the background block in `||loops(noclick):on start||`.
* :keyboard: Type a short, one-sentence mission line.

~hint Message too long? ⚡

---

Keep this message short. If a player has to read a paragraph at launch, it's too much.

hint~

```blocks
scene.setBackgroundColor(6)
//@highlight
//@validate-exists
game.splash("Miami test session", "Build a car you can explain.")
```

## {3. Create the Player Car}

**Building the Interactive Game Object**

---

In racing games and simulations, the car is more than just an image — it's an interactive object with properties like position, speed, and collision detection. Creating a sprite gives you a programmable object you can control, move, and respond to events. This is how digital simulations represent real-world objects.

* :paper plane: Open `||sprites:Sprites||` and drag `set mySprite to sprite of kind Player` into `||loops(noclick):on start||`.
* :keyboard: Rename the variable to `raceCar`, then click the image square to choose or draw a car.

~hint What's a sprite? 💡

---

In Arcade, each character or image that does something is called a **SPRITE**.

Sprites have properties that you can use and change — things like position, speed, and image are all properties of sprites.

Your race car will be a sprite, too.

hint~

~hint Variable names confusing? 🎯

---

Use `raceCar` consistently. One mismatched name can make the right blocks feel wrong.

hint~

```blocks
scene.setBackgroundColor(6)
game.splash("Miami test session", "Build a car you can explain.")
//@highlight
//@validate-exists
raceCar = sprites.create(img`
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
```

## {4. Turn On Movement}

**Connecting Input to Action**

---

A car that can't move isn't much of a simulator. Wiring up controller input to sprite movement is how you transform button presses into on-screen action. Real racing simulators do the same thing — they translate driver input (steering, throttle, brakes) into vehicle behavior. Here you're building that connection.

* :binoculars: The template already includes `driveSpeed`. Use it as the speed value throughout.
* :game pad: Open `||controller:Controller||` and drag `move mySprite with buttons` into `||loops(noclick):on start||`, targeting `raceCar` with `driveSpeed`.
* :paper plane: Open `||sprites:Sprites||` and add `stay in screen` so the car can't leave the view.

~hint Car won't move? 🔧

---

If the car won't move, check which sprite the controller block is targeting. This is usually a naming issue.

hint~

```blocks
scene.setBackgroundColor(6)
game.splash("Miami test session", "Build a car you can explain.")
raceCar = sprites.create(img`
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
//@highlight
//@validate-exists
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
//@highlight
//@validate-exists
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## {5. Load Saved Race State}

**Building Persistent Systems**

---

Professional race teams don't start from scratch every session — they load saved setups, previous lap data, and driver preferences. Your game does the same thing. Loading saved data lets your choices carry forward across different stages, just like real engineering systems that remember past configurations and results.

* :racing_car: Open `||drivenByStem:Driven by STEM||` and add `load race profile` and `start stage` (Garage) in `||loops(noclick):on start||`.
* :racing_car: Set `driveSpeed` from the saved value.

~hint Blocks missing? 👀

---

If the blocks are missing, scroll the toolbox. Custom categories can hide farther down the list.

hint~

```blocks
scene.setBackgroundColor(6)
game.splash("Miami test session", "Build a car you can explain.")
raceCar = sprites.create(img`
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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
//@validate-exists
drivenByStem.loadRaceProfile(80, 5)
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
//@highlight
//@validate-exists
driveSpeed = drivenByStem.savedDriveSpeed()
```

## {6. Save Team Identity}

**Creating Personalized Experience**

---

Every racing team has an identity — a name, a car livery, a style. Setting these values personalizes your simulation and creates a sense of ownership. More importantly, saving these choices means the system remembers who you are across multiple sessions, just like how real team data persists across race weekends.

* :id card: Still in `||drivenByStem:Driven by STEM||`, set your team name, car name, and car style.
* :id card: Add blocks to apply the saved style to `raceCar` and show the driver profile.

~hint Why consistency matters? 💭

---

Consistent names and styles help you spot what's actually changing in the code. If everything looks different, it's harder to debug.

hint~

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
scene.setBackgroundColor(6)
game.splash("Miami test session", "Build a car you can explain.")
raceCar = sprites.create(img`
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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
driveSpeed = drivenByStem.savedDriveSpeed()
//@highlight
//@validate-exists
drivenByStem.setTeamName("Apex Lab")
//@validate-exists
drivenByStem.setCarName("Velocity")
//@validate-exists
drivenByStem.setCarStyle(drivenByStem.CarStyle.SilverFlash)
//@validate-exists
drivenByStem.applySavedCarStyle(raceCar)
//@validate-exists
drivenByStem.showSavedDriverProfile()
```

```ghost
drivenByStem.setCarStyle(drivenByStem.CarStyle.VoltLime)
drivenByStem.setCarStyle(drivenByStem.CarStyle.HeatRed)
```

## {7. Add the Dashboard}

**Displaying Real-Time Performance Data**

---

Racing drivers rely on dashboard displays to monitor speed, fuel, tire wear, and system health in real time. Your game's HUD (Heads-Up Display) does the same thing — it shows score and efficiency so players can make informed decisions. Visible data turns abstract numbers into actionable information.

* :game pad: Open `||info:Info||` and set score to `0` and life to saved efficiency in `||loops(noclick):on start||`.

~hint Life value looks wrong? 🐛

---

If your life value looks wrong, make sure you're pulling the saved efficiency value, not leaving it at a default.

hint~

```blocks
scene.setBackgroundColor(6)
game.splash("Miami test session", "Build a car you can explain.")
raceCar = sprites.create(img`
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
controller.moveSprite(raceCar, driveSpeed, driveSpeed)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
driveSpeed = drivenByStem.savedDriveSpeed()
drivenByStem.setTeamName("Apex Lab")
drivenByStem.setCarName("Velocity")
drivenByStem.setCarStyle(drivenByStem.CarStyle.SilverFlash)
drivenByStem.applySavedCarStyle(raceCar)
drivenByStem.showSavedDriverProfile()
//@highlight
//@validate-exists
info.setScore(0)
//@validate-exists
info.setLife(drivenByStem.savedEfficiency())
```

## {8. Add a Reset Button}

**Preparing for Shared Use**

---

In a classroom or activation event, multiple students will use the same device. A reset button clears saved data so each new group starts fresh. This is good systems thinking — designing for the context where your project will actually be used.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :game pad: Open `||controller:Controller||` and drag `on button pressed` into the workspace outside of `||loops(noclick):on start||`.
* :mouse pointer: Change the button to `B`.
* :racing_car: Inside the event, add `reset saved session` and `game reset`.

~hint Button not working? ⚠️

---

If pressing B does nothing, check that this event is standalone. Events don't work when nested inside another stack.

hint~

```blocks
//@highlight
//@validate-exists
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    drivenByStem.resetSavedSession()
    game.reset()
})
```

## Complete

**You did it!** You just built the foundation of a working race simulator. You created a car sprite, wired up controller movement, connected the game to saved data, and set up a live dashboard that tracks performance and efficiency. A faster car is useful only if the whole system can still control and support it.

Roles in this tutorial: software engineer, systems engineer, and track engineer.
