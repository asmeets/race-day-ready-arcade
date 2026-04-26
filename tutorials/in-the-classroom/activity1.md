# Intro to MakeCode Arcade
### @explicitHints true
### @hideDone true

## {Introduction @unplugged}

**Are you ready to start coding?**

Complete this tutorial to learn how to:
- follow tutorial prompts
- find blocks in the toolbox
- build code in the workspace
- run your project in the simulator (the mini game window)

Once you've mastered these skills, you'll be ready to build your own F1 racing simulator!


## {step 1}

**⭐ Welcome ⭐**

You've just discovered the most important part of following a tutorial — **reading instructions**!

- :lightbulb: Sometimes you'll need to scroll to read all of the instructions.

- :arrow right: When you're ready to move to the next step, click **Next** to continue.



## {step 2}

We like to hide extra info in "clue boxes" to shorten the instructions.

- :mouse pointer: Click the clue box below to see what's inside.

~hint Click here to see a clue 🕵🏽

---

**Congrats!**

You found a clue!

hint~


Sometimes, we like to show you recommended blocks for a step.

- :mouse pointer: Click the round lightbulb button below to see an example.




#### ~ tutorialhint
```blocks
game.splash("You found me!")
```



## {Using the workspace}

Your [__*workspace*__](#workIt "The area where you build code")
is the area where you'll connect code blocks to build your program.

---

- :mouse pointer:  Click inside the ``||game(noclick):splash " "||`` block that's already in the workspace
and **change the message** to something you'd like to say.

~hint What's a workspace? 🕵🏽

---

![The Workspace](/static/tutorials/interface/workspace.png " " )

The **workspace** is the area to the right of the toolbox where you build your program.

Only blocks connected in the workspace will be run by the computer.

hint~


#### ~ tutorialhint
```blocks
game.splash("Let's start coding!")
```


## Meet the Blocks  @showdialog

Blocks can be dragged out from the  [__*toolbox*__](#tools "The strip to the left of your workspace that lists block categories."), <br/>
connected, duplicated, and deleted.

Keep going to learn more about blocks.

![Block Animation](/static/skillmap/interface/use_blocks.gif "Blocks appear, duplicate, and delete." )



## {Your Toolbox}

**Blocks don't always start in the workspace.**

When you need to add a block, we will either suggest it using an image like this:
```block
game.splash(" ")
```
or with highlighted text, like this:<br/>
 ``||game:splash " "||``<br/>



~hint Wanna see something cool? 🕵🏽

---

When you need to find a block in the toolbox and we use highlighted text in the instruction, you can click the colored section of text and it will automatically open the toolbox category you need.

Try it now by clicking the block below!<br/>

``||game:splash " "||``<br/>

hint~



## {Your Toolbox 2}

**Let's see how this works**

- :tree:  Find the<br/>
``||scene:set background color to [ ]||``<br/>
block and snap it in **at the top of**
the<br/>
``||loops(noclick):on start||``<br/>
container already in the workspace.

- :paint brush:  Click the empty square to set the background to your favorite color.

#### ~ tutorialhint
```blocks
scene.setBackgroundColor(7)
game.splash("Let's start coding!")
```



## {The Exception}

If you can't find the block you need, click the highlighted text and the correct category will open for you.

- :paper plane:  Snap
<br/>``||variables(sprites):set [my sprite] to sprite [ ] of kind [Player]||``<br/>
into **the end** of the <br/>
``||loops(noclick):on start||`` container.


- :paint brush:  Click the empty box to draw a [__*sprite*__](#sprote "A 2-D image that moves on the screen")
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




## {Simulator}

Make sure to keep checking your [__*simulator*__](#gamez "simulator that shows the result of the code you have written") as you go.

- :binoculars: Take a look at the simulator. <br/>
Do you see a message that needs to be cleared? Then do you see the sprite you chose?


![Look for the simulator in the lower right](/static/skillmap/assets/game-window.png "Click the mini simulator to pop open the bigger view.")






## Container Blocks  @showdialog

This is a [__*container block*__](#blockIt "Block that holds other blocks").


Container blocks have a flat edge at the the top and bottom with an open space
in the middle where other blocks connect. Container blocks control when the code inside runs.

Here is an example:

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {})
```

_(This block runs code when the A button is pressed.)_





## {Use a container block}

- :game:   Find the<br/>
``||controller:on [A] button pressed ||`` <br/>
container and drag it into **an empty area of** the workspace.



#### ~ tutorialhint

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let mySprite: Sprite = null
})
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




## {Standard Blocks 2}

- :paper plane:   Find a <br/>
``||sprites:[mySprite] start [spray] effect ⊕||``<br/>
block and snap it into the  <br/>
``||controller(noclick):on [A] button pressed||``<br/>
container that's already in your workspace...then choose a new effect!

- :mouse pointer:   Click the **+** to the right of the new block to pop open an
extra option.



#### ~ tutorialhint
```blocks
let mySprite: Sprite = null;

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.startEffect(effects.confetti, 500)
})
```



## Value Blocks  @showdialog

Finally, we have [__*value blocks*__](#aBlockIt "special pieces that provide values for other blocks").
Value blocks are special pieces that add information to other
blocks. Sometimes they're pointy, sometimes they're rounded,
but they always need another block to snap into. Value blocks look something like this:

![Value Blocks](/static/skillmap/interface/parameter-blocks.png "This is what the shape of an value block looks like" )

_💡 Value blocks have different shapes
depending on what kind of information they add. Each value will only
fit in certain types of spaces._




## {Value Blocks 2}


- :calculator:   From the ``||math:Math||`` category, grab a <br/>
``||math: pick random [0] to [10]||``<br/>
value block and snap it in to replace **500**.

- :mouse pointer:   Change the random range to pick between **100** and **600**.



#### ~ tutorialhint
```blocks
let mySprite: Sprite = null;

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
  mySprite.startEffect(effects.confetti, randint(100,600))
}
```






## {Test Time}

**🕹️ Time to test 🕹️**

- :binoculars: Take a look at the simulator and click the **Ⓐ** button (or space bar) to clear your splash screen message.

- :game: Now click **Ⓐ** over and over again to see your effects!





## {Putting it Together}

**🎨 Now get creative 🎨**

Take a look at all of the extra blocks in the toolbox.

It's okay if you don't know what they all do.
Try adding them to see what happens!

If something doesn't work the way you expect, that's normal! You can always undo (Ctrl+Z or Cmd+Z) or click the Reset button to start fresh.

---

_💡 Test your code in the simulator after every couple of steps to make sure
it's behaving the way you want it to!_




## {Finale @unplugged}

**🎈 Congratulations 🎈**

You've completed the **"Intro to MakeCode Arcade"** tutorial!

You now know how to:
- ✅ Follow tutorial instructions
- ✅ Find blocks in the toolbox
- ✅ Build code in the workspace
- ✅ Test your work in the simulator

---

**Ready for the next challenge?**

Head to the **Garage** where you'll join the Mercedes F1 team as an engineer. You'll build your own racing simulator, make engineering decisions about speed and efficiency, and test your code on the track.

Let's go! 🏎️



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


```template
game.splash("Ready to learn MakeCode Arcade!")

```