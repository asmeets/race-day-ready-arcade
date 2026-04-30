# Intro to MakeCode Arcade
### @explicitHints true

```template
// Pre-load all assets so they appear in the gallery
let __sprites = [assets.image`playerCar`, assets.image`garageCone`, assets.image`trackObstacle`, assets.image`pitMarker`, assets.image`rainPuddle`, assets.image`telemetryScreen`, assets.image`finishBanner`, assets.image`teamBadge`]
let __backgrounds = [assets.image`garageBg`, assets.image`trackBg`, assets.image`finishBg`, assets.image`weatherBg`]
game.splash("Ready to learn MakeCode Arcade!")
```

## Welcome! Let's Learn the Essentials @showdialog

![Drew - UX/Game Designer](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/guides/drew.png)

Hi, I'm Drew, UX and game designer on the team. I got into this field by being the person who always asked "Wait... what am I supposed to do?" I started self-taught, watching tutorials and redesigning menus in my own projects, then added a formal design class and a lot of play testing with friends. 

Before you join Sam in the garage to build your racing simulator, you need to learn the essentials of MakeCode Arcade: following instructions, finding blocks, building code, and testing your work. These are the same skills I use when I test game flow, write clearer prompts, and figure out where players get stuck.

- **Why blocks?** Block-based coding lets you drag and snap together visual pieces instead of typing syntax. It's how I learned — you focus on logic and problem-solving first, then typing comes naturally later. Many professional developers still use visual tools for prototyping because they're fast and clear.

- **Why 8-bit style?** Arcade uses classic pixel art and simple mechanics so you can build complete games quickly. The constraints teach you to solve problems creatively — the same way Formula 1 engineers work within strict regulations to build the fastest cars. Simple foundations, powerful results.

You've already started by reading these instructions — that's the most important step! Let's get you ready to join the team.

## {1. Reading Tutorial Instructions}

**Your First Essential Skill**

---

I'll be guiding you through each step. Reading instructions carefully is how I learned to code, and it's still how I work today. Every tutorial gives you clear guidance to build something new.

- :lightbulb: Sometimes you'll need to scroll to read all of the instructions.

- :arrow right: When you're ready to move to the next step, select **Next** to continue.

## {2. Finding Hidden Hints}

**Discovering Tutorial Features**

---

I like to hide extra info in "clue boxes" to keep the main instructions focused. These collapsible hints give you troubleshooting tips, definitions, and extra guidance — the same kind of notes I write when we're playtesting and figuring out where someone got stuck.

- :mouse pointer: Select the clue box below to reveal what's inside.

~hint Select here to reveal a clue 🕵🏽

---

**Congrats!**

You found a clue!

hint~


Sometimes, I like to show you recommended blocks for a step.

- :mouse pointer: Select the round lightbulb button below to reveal an example.




#### ~ tutorialhint
```blocks
game.splash("You found me!")
```



## {3. Using the Workspace}

**Building Your First Code**

---

Your [__*workspace*__](#workIt "The area where you build code") is where you'll connect code blocks to build your program. I spend a lot of my day in a workspace like this, building and testing interactions so the next step feels clear. Only blocks connected in the workspace will run when your game starts.

- :mouse pointer: Select inside the ``||game(noclick):splash " "||`` block that's already in the workspace and **change the message** to something you'd like to say.

~hint What's a workspace? 🕵🏽

---

![The Workspace](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/intro/workspace.png " " )

The **workspace** is the area to the right of the toolbox where you build your program.

Only blocks connected in the workspace will be run by the computer.

hint~


#### ~ tutorialhint
```blocks
game.splash("Let's start coding!")
```


## Meet the Blocks  @showdialog

Blocks can be dragged out from the  [__*toolbox*__](#tools "The strip to the left of your workspace that lists block categories."), connected, duplicated, and deleted.

Keep going to learn more about blocks.

![Block Animation](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/intro/use_blocks.gif "Blocks appear, duplicate, and delete." )



## {4. Finding Blocks in the Toolbox}

**Navigating Your Block Categories**

---

Blocks don't always start in the workspace. The toolbox on the left organizes hundreds of blocks into categories. When I'm prototyping menus, tutorials, or HUD screens, I need to find the right block quickly — learning to navigate your tools fast is an essential skill that will serve you well.

When you need to add a block, I'll either suggest it using an image like this:
```block
game.splash(" ")
```
or with highlighted text, like this:
 ``||game:splash " "||``



~hint Want to discover something cool? 🕵🏽

---

When you need to find a block in the toolbox and we use highlighted text in the instruction, you can select the colored section of text and it will automatically open the toolbox category you need.

Try it now by selecting the block below!<br/>

``||game:splash " "||``

hint~



## {5. Setting the Scene}

**Creating Your Game Environment**

---

Let's see how this works. Every game needs a visual environment, and setting the background color is often the first step. When I'm building a dashboard or simulator, I start with the basics like this. Simple choices like color set the mood and make your work instantly recognizable.

- :tree: Find the ``||scene:set background color to [ ]||`` block and snap it in **at the top of**
the ``||loops(noclick):on start||`` container already in the workspace.

- :paint brush:  Select the empty square to set the background to your favorite color.

#### ~ tutorialhint
```blocks
scene.setBackgroundColor(7)
game.splash("Let's start coding!")
```

```ghost
scene.setBackgroundColor(7)
```



## {6. Creating Your First Sprite}

**Adding a Character to Your Game**

---

If you can't find the block you need, select the highlighted text and the correct category will open for you. Now let's add a character! In game development, any character or moving object is called a sprite. When I prototype a game, I use objects with properties like position, speed, and state to test how the experience feels. Sprites work the same way, and they're the foundation of almost every game you'll build.

- :paper plane: Snap ``||variables(sprites):set [my sprite] to sprite [ ] of kind [Player]||`` into **the end** of the ``||loops(noclick):on start||`` container.


- :paint brush:  Select the empty box to draw a [__*sprite*__](#sprote "A 2-D image that moves on the screen")
 or switch to the **Gallery** to pick one of ours.


 ~hint What's a sprite? 🕵🏽

---

In Arcade, each character or image that does something is called a **SPRITE**.

Sprites have properties that you can use and change — things like scale, position, and lifespan are all properties of sprites.

hint~


#### ~ tutorialhint

```blocks
scene.setBackgroundColor(5)
game.splash("Let's start coding!")
let mySprite = sprites.create(img`
. . . . . f f f f f . . . . . .
. . . . f e e e e e f . . . . .
. . . f d d d d d d e f . . . .
. . f d f f d d f f d f f . . .
. c d d d e e d d d d e d f . .
. c d c d d d d c d d e f f . .
. c d d c c c c d d d e f f f f
. . c d d d d d d d e f f b d f
. . . c d d d d e e f f f d d f
. . . . f f f e e f e e e f f f
. . . . f e e e e e e e f f f .
. . . f e e e e e e f f f e f .
. . f f e e e e f f f f f e f .
. f b d f e e f b b f f f e f .
. f d d f f f f d d b f f f f .
. f f f f f f f f f f f f f . .
`, SpriteKind.Player)


```

```ghost
let mySprite = sprites.create(assets.image`playerCar`, SpriteKind.Player)
```




## {7. Testing in the Simulator}

**Seeing Your Code in Action**

---

Make sure to keep checking your [__*simulator*__](#gamez "simulator that shows the result of the code you have written") as you go. The simulator is your testing lab — it shows you exactly what your code does. I test my code constantly during development. Testing frequently helps you catch bugs early and track your progress, just like running a systems check before the race.

- :binoculars: Check the simulator. <br/>
Is there a message that needs to be cleared? Then check if the sprite you chose is present.


![Find the simulator in the lower right](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/intro/game-window.png "Select the mini simulator to open the bigger view.")






## Container Blocks  @showdialog

This is a [__*container block*__](#blockIt "Block that holds other blocks").


Container blocks have a flat edge at the the top and bottom with an open space
in the middle where other blocks connect. Container blocks control when the code inside runs.

Here is an example:

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {})
```

_(This block runs code when the A button is pressed.)_





## {8. Adding Player Controls}

**Responding to Button Presses**

---

Now let's give players control! Container blocks like this one run code when specific events happen — in this case, when the player presses a button. In the race car, our control systems respond to sensor events in real time. Event-driven programming is how we build responsive systems, and it's how games respond to player actions.

- :game pad: Find the ``||controller:on [A] button pressed||`` container and drag it into **an empty area of** the workspace.



#### ~ tutorialhint

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
})
```

```ghost
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {})
```



## Standard Blocks  @showdialog

Next, there are [__*standard blocks*__](#sBlockIt "Single line blocks that make up the majority of most programs").

Standard blocks are single-line blocks with notches at the top and bottom that
allow them to attach to other pieces. These blocks run in order from top
to bottom in the container where they're placed.

Here is an example of a standard block:

```block
let mySprite: Sprite = null;
mySprite.startEffect(effects.spray)
```

_(This block sends water spraying from the center of your sprite.)_




## {9. Adding Visual Effects}

**Making Your Game More Engaging**

---

Visual effects make games more exciting and give players instant feedback. When you trigger an effect from a button press, players immediately experience the result of their action. In our race dashboards, instant feedback tells the driver exactly what's happening — this feedback loop is essential to both racing and good game design.

- :paper plane: Find a ``||sprites:[mySprite] start [spray] effect ⊕||`` block and snap it into the ``||controller(noclick):on [A] button pressed||`` container that's already in your workspace...then choose a new effect!

- :mouse pointer: Select the **+** to the right of the new block to reveal an extra option.



#### ~ tutorialhint
```blocks
let mySprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.startEffect(effects.confetti, 500)
})
```
```ghost
let mySprite: Sprite = null
mySprite.startEffect(effects.confetti, 500)
```


## Value Blocks  @showdialog

Finally, we have [__*value blocks*__](#aBlockIt "special pieces that provide values for other blocks").
Value blocks are special pieces that add information to other
blocks. Sometimes they're pointy, sometimes they're rounded,
but they always need another block to snap into. Value blocks look something like this:

![Value Blocks](https://raw.githubusercontent.com/asmeets/driven-by-stem/main/assets/intro/parameter-blocks.png "This is what the shape of an value block looks like" )

_💡 Value blocks have different shapes
depending on what kind of information they add. Each value will only
fit in certain types of spaces._




## {10. Adding Randomness}

**Making Your Game More Dynamic**

---

Randomness makes games unpredictable and replayable. Instead of the same effect duration every time, we'll use a random value so each button press creates a slightly different experience. In playtesting, small variations help me check whether an interaction still feels fun and readable each time. This technique keeps players engaged and tests their adaptability.

- :calculator: From the ``||math:Math||`` category, grab a ``||math: pick random [0] to [10]||`` value block and snap it in to replace **500**.

- :mouse pointer: Update the random range to pick between **100** and **600**.



#### ~ tutorialhint
```blocks
let mySprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.startEffect(effects.confetti, randint(100, 600))
})
```

```ghost
let mySprite: Sprite = null
mySprite.startEffect(effects.confetti, randint(100, 600))
```






## {11. Testing Your Interactive Game}

**Playing What You Built**

---

**Time to test!** This is how I work every day — add a feature, test it, make sure it works as expected. Testing frequently helps you catch bugs early and track your progress. On race day, we don't get second chances, so we test everything thoroughly beforehand.

- :binoculars: Check the simulator and press the **Ⓐ** button (or space bar) to clear your splash screen message.

- :game pad: Now press **Ⓐ** over and over again to activate your effects!

## {Finale @unplugged}

**Congratulations!**

You've completed the Intro to MakeCode Arcade tutorial!

You now know how to:
- ✅ Follow tutorial instructions
- ✅ Find blocks in the toolbox
- ✅ Build code in the workspace
- ✅ Test your work in the simulator

**Ready for the next challenge?**

Now you're ready to head into the **Garage** and meet **Sam**, the software engineer on the team. You'll build your own racing simulator, make real engineering decisions about speed and efficiency, and test your code on the track. Sam will guide you through that next stage. **Let's go!** 🏎️

```ghost
let mySprite: Sprite = null;
scene.setBackgroundColor(9)
scene.setBackgroundImage()
mySprite.startEffect(effects.spray)
mySprite.startEffect(effects.confetti)
mySprite.x += 0
mySprite.y += 0
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {})
controller.moveSprite(mySprite)
game.splash("")
randint(0, 10)
```