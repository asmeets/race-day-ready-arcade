# Mission Briefing

### @diffs true

```package
settings-blocks=github:microsoft/pxt-settings-blocks#v1.0.0
```

```customts
/**
 * Custom blocks for the Driven by STEM skillmap.
 */
//% shim=drivenByStemSupport::startVehicleTestTrack
declare function drivenByStemSupportStartVehicleTestTrack(): void

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
    const SPEED_UNIT_KEY = "speedDisplayUnit"
    const FUEL_UNIT_KEY = "fuelDisplayUnit"

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

    export enum SpeedUnit {
        //% block="km/h"
        KilometersPerHour,
        //% block="mph"
        MilesPerHour
    }

    export enum FuelUnit {
        //% block="gallons"
        Gallons,
        //% block="liters"
        Liters
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

    function speedUnitName(unit: SpeedUnit): string {
        switch (unit) {
            case SpeedUnit.MilesPerHour:
                return "mph"
            case SpeedUnit.KilometersPerHour:
            default:
                return "km/h"
        }
    }

    function fuelUnitName(unit: FuelUnit): string {
        switch (unit) {
            case FuelUnit.Liters:
                return "L"
            case FuelUnit.Gallons:
            default:
                return "gal"
        }
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
        ensureStringSetting(SPEED_UNIT_KEY, "mph")
        ensureStringSetting(FUEL_UNIT_KEY, "gal")
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
     * Build the team's base car and apply the saved starting speed.
     */
    //% block="build base car with image $carImage"
    //% blockId=raceday_build_base_car
    //% carImage.shadow=screen_image_picker
    //% group="Session" weight=65
    export function buildBaseCar(carImage: Image): void {
        let car = sprites.allOfKind(SpriteKind.Player)[0]
        if (!car) {
            car = sprites.create(carImage, SpriteKind.Player)
        } else {
            car.setImage(carImage.clone())
        }
        car.setFlag(SpriteFlag.StayInScreen, true)
        const startingSpeed = settings.exists(DRIVE_SPEED_KEY) ? settings.readNumber(DRIVE_SPEED_KEY) : 80
        controller.moveSprite(car, startingSpeed, startingSpeed)
    }

    /**
     * Update the saved player's car controls to use a new speed value.
     */
    //% block="set base car speed to $speed"
    //% blockId=raceday_set_base_car_speed
    //% speed.defl=80 speed.min=0 speed.max=200
    //% group="Session" weight=59
    export function setBaseCarSpeed(speed: number): void {
        const car = sprites.allOfKind(SpriteKind.Player)[0]
        if (!car) return
        controller.moveSprite(car, speed, speed)
        car.setFlag(SpriteFlag.StayInScreen, true)
    }

    /**
     * Set the speed display unit for the shakedown dashboard.
     */
    //% block="set speed display unit to $unit"
    //% blockId=raceday_set_speed_display_unit
    //% unit.defl=SpeedUnit.MilesPerHour
    //% group="Session" weight=58
    export function setSpeedDisplayUnit(unit: SpeedUnit): void {
        settings.writeString(SPEED_UNIT_KEY, speedUnitName(unit))
    }

    /**
     * Set the fuel display unit for the shakedown dashboard.
     */
    //% block="set fuel display unit to $unit"
    //% blockId=raceday_set_fuel_display_unit
    //% unit.defl=FuelUnit.Gallons
    //% group="Session" weight=57
    export function setFuelDisplayUnit(unit: FuelUnit): void {
        settings.writeString(FUEL_UNIT_KEY, fuelUnitName(unit))
    }

    /**
     * Start the optional pseudo-3D test track using the saved setup values.
     */
    //% block="start vehicle test track"
    //% blockId=raceday_start_vehicle_test_track
    //% group="Session" weight=56
    export function startVehicleTestTrack(): void {
        loadRaceProfile(80, 5)
        drivenByStemSupportStartVehicleTestTrack()
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
    //% block="save team setup speed $speed efficiency $efficiency efficiency cost $efficiencyCost focus $focus"
    //% blockId=raceday_save_setup
    //% speed.defl=80 efficiency.defl=5 efficiencyCost.defl=1
    //% group="Setup" weight=100
    export function saveTeamSetup(speed: number, efficiency: number, efficiencyCost: number, focus: SetupFocus): void {
        settings.writeNumber(DRIVE_SPEED_KEY, speed)
        settings.writeNumber(EFFICIENCY_KEY, efficiency)
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

## Mission Briefing @showdialog

![Sam - Software Engineer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/sam.png)

**Hi, I'm Sam, your software engineer on this team.** I got into coding by remixing games and following tutorials. No formal degree at first, just curiosity and small projects with friends. Later I added structured courses and certifications as I got more serious, and that mix of self-taught plus structured learning is what got me here.

On a real racing team, I write and test control code, fix unexpected behavior, and keep the dashboard reliable when it matters most. In this gate, you'll do that same foundational work: get the game running, build your car sprite, wire up the controls, and set up your dashboard. That's the setup every project starts with, and the team identity you save here will carry forward through the whole path.

## {1. Set the Garage Background}

**Creating the Visual Environment**

---

Every game starts with a scene. Setting the garage background gives your game a clear location from the moment it launches. This is the first thing players experience, and it helps the whole racing setup feel like a real team workspace.

* :tree: Open `||scene:Scene||` and drag `||scene:set background image to||` into `||loops(noclick):on start||`.
* :mouse pointer: Select the gray image square on the block to open the image picker.
* :mouse pointer: Select the "My Assets" button and choose the garage background image, `garageBg`.

~hint Garage image missing? 🔍

---

If the garage scene does not appear, make sure the block is snapped into the `on start` stack. Then open the gray image square, go to `My Assets`, and check that `garageBg` is selected.

hint~

```blocks
//@highlight
//@validate-exists
scene.setBackgroundImage(assets.image`garageBg`)
```

## {2. Add a Mission Message}

**Communicating the Player's Goal**

---

Clear communication is essential in both games and engineering. A mission message tells players what they're about to do and why it matters. Think of it like a team briefing before a test session - everyone needs to know the objective.

* :game pad: Open `||game:Game||` and drag `||game:splash||` under the background block in `||loops(noclick):on start||`.
* :keyboard: Type a short, one-sentence mission line like "Miami test session."
* :keyboard: Select the + icon in the `||game:splash||` block to add a second line that provides what the player will do like "Build a car you can explain."

~hint Message too long? ⚡

---

Keep this message short. If a player has to read a paragraph at launch, it's too much.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
//@highlight
//@validate-exists
game.splash("Miami test session", "Build a car you can explain.")
```

## {3. Create the Player Car}

**Building the Interactive Game Object**

---

In racing games and simulations, the car is more than just an image — it's an interactive object with properties like position, speed, and collision detection.<br><br>Building and designing a sprite gives you a programmable object you can control, move, and respond to events. This is how digital simulations represent real-world objects.

* :paper plane: Open `||sprites:Sprites||` and drag `||sprites:set mySprite to sprite of kind Player||` into `||loops(noclick):on start||`.
* :mouse pointer: Select the `mySprite` drop-down in the `||sprites:set mySprite to sprite of kind Player||` block and select `||variables(sprites):Rename variable...||`
* :keyboard: Rename the variable to `raceCar`.
* :mouse pointer: Select the image square to choose a car from My Assets or draw your own car.

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
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
//@highlight
//@validate-exists
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
```

## {4. Turn On Movement}

**Connecting Input to Action**

---

A car that can't move isn't much of a simulator. Wiring up controller input to sprite movement is how you transform button presses into on-screen action. Real racing simulators do the same thing — they translate driver input (steering, throttle, brakes) into vehicle behavior. Here you're building that connection.

* :game pad: Open `||controller:Controller||` and drag `||controller:move mySprite with buttons||` into `||loops(noclick):on start||`.
* :keyboard: Select the + icon and enter `80` for both horizontal and vertical velocity values (vx and vy).
* :paper plane: Open `||sprites:Sprites||` and add `||sprites:set mysprite auto destroy off||`.
* :mouse pointer: In the `||sprites:set raceCar auto destroy off||` change "auto destroy" to "stay in screen".
* :mouse pointer: In the `||sprites:set raceCar auto destroy off||` change the "Off" to "On" so your car can't leave the view.

~hint Car won't move? 🔧

---

If the car won't move, check which sprite the controller block is targeting. This is usually a naming issue.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
//@highlight
//@validate-exists
controller.moveSprite(raceCar, 80, 80)
//@highlight
//@validate-exists
raceCar.setFlag(SpriteFlag.StayInScreen, true)
```

## {5. Load Saved Race State}

**Building Persistent Systems**

---

Professional race teams don't start from scratch every session — they load saved setups, previous lap data, and driver preferences. Your game does the same thing. Loading saved data lets your choices carry forward across different stages, just like real engineering systems that remember past configurations and results.

* :game pad: We first need to load our game defaults. Open `||drivenByStem:Driven by STEM||` and add `||drivenByStem:load race profile||` to `||loops(noclick):on start||`.
* :game pad: Next we need to set the current stage of our game. Add the `||drivenByStem:start stage (Garage)||` block in the `||loops(noclick):on start||`. 
* :mouse pointer: To set our car's speed we need to add the `||drivenByStem:set base car speed to||` block to `||loops(noclick):on start||`.
* :racing car: Then we set the speed using the `||drivenByStem:saved drive speed||` variable from the ||`drivenByStem`|| toolbox in the `||drivenByStem:set base car speed to||` on top of the existing "80" value.

~hint Blocks missing? 👀

---

If the blocks are missing, scroll the toolbox. Custom categories can hide farther down the list.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
//@highlight
//@validate-exists
drivenByStem.loadRaceProfile(80, 5)
//@highlight
//@validate-exists
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
//@highlight
//@validate-exists
drivenByStem.setBaseCarSpeed(drivenByStem.savedDriveSpeed())
```

## {6. Save Team Identity}

**Creating Personalized Experience**

---

Every racing team has an identity — a name, a car name, and a look. In this step, you'll save your team details and then edit the sprite directly so the car on screen feels like your own design. That gives students practice with the image editor while keeping the project personal and remixable.

* :id card: Set your own team name using the `||drivenByStem:set team name to||` block.
* :id card: Customize your car with a name using the `||drivenByStem:set car name to||` block.
* :mouse pointer: Click the image in your existing `||sprites(noclick):set raceCar to sprite of kind Player||` block and change a few colors, add a stripe, or add a number for your team.
* :game pad: Run the simulator and make sure your edited car shows up on screen.
* :mouse pointer: Lastly, add `||drivenByStem:show saved driver profile||` to check that your team details were saved.

~hint Car not changing? 🎨

---

If your car is not changing, edit the image inside the existing `raceCar` sprite block from Step 3. If you drag in a second sprite block, you may end up customizing the wrong car.

hint~

```validation.local
# BlocksExistValidator
* Enabled: false
```

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
drivenByStem.setBaseCarSpeed(drivenByStem.savedDriveSpeed())
//@highlight
//@validate-exists
drivenByStem.setTeamName("Apex Lab")
//@validate-exists
drivenByStem.setCarName("Velocity")
//@validate-exists
drivenByStem.showSavedDriverProfile()
```

## {7. Choose Dashboard Units}

**Preparing the Shakedown Readout**

---

Racing teams need data they can read fast. Your shakedown dashboard will show speed and fuel during the test track, so this step lets you choose the units your team wants to read. Small display choices like this help teams compare results clearly.

* :racing car: Add `||drivenByStem:set speed display unit to||` at the bottom of `||loops(noclick):on start||`.
* :mouse pointer: Select `mph` or `km/h` for the speed readout.
* :racing car: Add `||drivenByStem:set fuel display unit to||` at the bottom of `||loops(noclick):on start||`.
* :mouse pointer: Choose `gallons` or `liters` for the fuel readout.

~hint Wrong units later? 🐛

---

If the test track later shows the wrong units, check these blocks in `on start`. The last unit blocks in that stack are the settings the dashboard will use.

hint~

```blocks
scene.setBackgroundImage(assets.image`garageBg`)
game.splash("Miami test session", "Build a car you can explain.")
let raceCar = sprites.create(assets.image`playerCar`, SpriteKind.Player)
controller.moveSprite(raceCar, 80, 80)
raceCar.setFlag(SpriteFlag.StayInScreen, true)
drivenByStem.loadRaceProfile(80, 5)
drivenByStem.startStage(drivenByStem.RaceStage.Garage)
drivenByStem.setBaseCarSpeed(drivenByStem.savedDriveSpeed())
drivenByStem.setTeamName("Apex Lab")
drivenByStem.setCarName("Velocity")
drivenByStem.showSavedDriverProfile()
//@highlight
//@validate-exists
drivenByStem.setSpeedDisplayUnit(drivenByStem.SpeedUnit.MilesPerHour)
//@validate-exists
drivenByStem.setFuelDisplayUnit(drivenByStem.FuelUnit.Gallons)
```

## {8. Add a Reset Button}

**Preparing for Shared Use**

---

If you share your project with a friend, or multiple people want to try your game, a reset button clears saved data so each new group starts fresh. This is good systems thinking — designing for the context where your project will actually be used.

```validation.local
# BlocksExistValidator
* Enabled: false
```

* :game pad: Open `||controller:Controller||` and drag `||controller.on button pressed||` into the workspace outside of `||loops(noclick):on start||`.
* :mouse pointer: Change the button to `B`.
* :racing car: Inside the `||controller.on button pressed||` event, add `||drivenByStem.reset saved session||` and `||game.reset game||`.

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

**You did it!** You just built the foundation of a working race simulator. You created a car sprite, wired up controller movement, connected the game to saved data, customized your team's car, and chose how your shakedown dashboard will show speed and fuel. The team details you saved and the car you customized here are now ready to travel into the next tutorial.<br><br>In the next stage, you'll take this setup onto the test track and start collecting data on your car's performance. That data will be the key to improving your design and climbing the leaderboard, so get ready to put it to work!<br><br> Select the "Done" button to go to the next stage.