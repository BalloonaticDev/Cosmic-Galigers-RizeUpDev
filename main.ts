function mainMenu () {
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Start a run!"),
    miniMenu.createMenuItem("Upgrades!"),
    miniMenu.createMenuItem("Stats!")
    )
    miniMenu.onButtonPressed(myMenu, miniMenu.Button.A, function (selection, selectedIndex) {
        miniMenu.close(myMenu)
        if (selectedIndex == 0) {
            startGame()
        } else if (selectedIndex == 1) {
            upgradesMenu()
        } else if (selectedIndex == 2) {
            game.showLongText("You are Galiger No. " + galigerNo + ", with " + kills + " kills in your career!", DialogLayout.Center)
            mainMenu()
        }
    })
}
function upgradesMenu () {
    myMenu2 = miniMenu.createMenu(
    miniMenu.createMenuItem("Back"),
    miniMenu.createMenuItem("Ammo Increase -- 5 kills per increase"),
    miniMenu.createMenuItem("SMG Strike -- 50 kills"),
    miniMenu.createMenuItem("Piercing Shots -- 70 kills")
    )
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (canShoot) {
        projectile = sprites.createProjectileFromSprite(img`
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            .....................4..
            ...................2224.
            .....................4..
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `, mySprite, 200, 0)
        info.changeScoreBy(-1)
    }
})
function startGame () {
    enemiesCanCome = true
    canShoot = true
    score = 0
    mySprite = sprites.create(img`
        ........................
        ........................
        ........................
        ....82..................
        ....1111.....9999.......
        ....22222...999999......
        .444.866666669999666....
        444.6666666666666666666.
        444.66666666668882666666
        .44.6888866668888266666.
        ..44.888....888882......
        ...........888882.......
        ..........888882........
        ........................
        ........................
        ........................
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, 170, 150)
    mySprite.setStayInScreen(true)
    statusbar = statusbars.create(5, 100, StatusBarKind.Health)
    statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    statusbar.x = 7
    info.setScore(ammo)
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    sprites.destroy(mySprite)
    myTextSprite2 = fancyText.create("Game Over!", 0, 0, fancyText.rounded_large)
    enemiesCanCome = false
    canShoot = false
    enemiesCanCome = false
    pause(1500)
    game.reset()
})
info.onScore(0, function () {
    canShoot = false
    myTextSprite = fancyText.create("Reloading...", 0, 0, fancyText.bold_sans_7)
    pause(randint(1500, 2500))
    sprites.destroy(myTextSprite)
    canShoot = true
    info.setScore(15)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy()
    statusbar.value += 5
    score += 1
    kills += 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    scene.cameraShake(4, 500)
    statusbar.value += -10
})
let mySprite2: Sprite = null
let myTextSprite: fancyText.TextSprite = null
let myTextSprite2: fancyText.TextSprite = null
let statusbar: StatusBarSprite = null
let score = 0
let enemiesCanCome = false
let mySprite: Sprite = null
let projectile: Sprite = null
let canShoot = false
let myMenu2: Sprite = null
let myMenu: Sprite = null
let galigerNo = 0
let ammo = 0
let kills = 0
if (!(blockSettings.exists("playedBefore"))) {
    blockSettings.writeNumber("playedBefore", 1)
    blockSettings.writeNumber("galigerNo", randint(1, 99))
    blockSettings.writeNumber("kills", 0)
    blockSettings.writeNumber("ammoAmount", 15)
}
kills = blockSettings.readNumber("kills")
ammo = blockSettings.readNumber("ammoAmount")
galigerNo = blockSettings.readNumber("galigerNo")
let myTextSprite3 = fancyText.create("Cosmic Galigers", 0, 0, fancyText.rounded_small)
let myTextSprite4 = fancyText.create("Press 'A' to start!", 0, 0, fancyText.defaultArcade)
myTextSprite3.y = 50
myTextSprite4.y = 70
pauseUntil(() => controller.A.isPressed())
sprites.destroy(myTextSprite3)
sprites.destroy(myTextSprite4)
mainMenu()
game.onUpdate(function () {
    blockSettings.writeNumber("galigerNo", galigerNo)
    blockSettings.writeNumber("kills", kills)
    blockSettings.writeNumber("ammoAmount", ammo)
})
game.onUpdateInterval(500, function () {
    if (enemiesCanCome) {
        mySprite2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 9 9 . . . . . . 5 . . . 
            . . . 9 9 9 9 . . . . 5 5 . . . 
            2 2 2 2 9 9 2 2 2 2 2 2 f 4 4 . 
            . . 2 2 2 2 5 5 5 5 2 2 f 4 4 4 
            . . . . . . 5 5 5 5 . . . . . . 
            . . . . . . . 5 5 5 . . . . . . 
            . . . . . . . . 5 5 . . . . . . 
            . . . . . . . . . 5 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        mySprite2.setVelocity(-100, 0)
        mySprite2.setPosition(160, randint(5, 115))
        mySprite2.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
