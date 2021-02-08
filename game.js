class Game{
    constructor(){
        roadimage=loadImage("road img.jpeg")
        bikeimage=loadImage("bike.jpg")
        track=loadImage("track.jpg")

    }
    getstate(){
        var gamestateref=database.ref("gamestate")
        gamestateref.on("value",(data)=>{
            gamestate=data.val()
        })
    }
    update(state){
        database.ref("/").update({
            gamestate:state
        })
    }
   async start(){
        if(gamestate===0){
            player=new Player()
            var playerref=await database.ref("playercount").once("value")
            if(playerref.exists()){
                playercount=playerref.val()
            player.getcount()
            }
            form=new Form()
            form.display()
        }
        bike1=createSprite(500,300)
        bike1.addImage(bikeimage)
        bike1.scale=0.8
        bike2=createSprite(400,300)
        bike2.addImage(bikeimage)
        bike2.scale=0.8
        bike3=createSprite(300,300)
        bike3.addImage(bikeimage)
        bike3.scale=0.8
        bike4=createSprite(200,300)
        bike4.addImage(bikeimage)
        bike4.scale=0.8
        bikes=[bike1,bike2,bike3,bike4]
    }
    play(){
        form.hide()
        text("GAME BEGIN",500,80)
        Player.getplayerinfo()
        if(allplayers!==undefined){
            background(222)
            image(track,-displayWidth*4,0,displayWidth*5,displayHeight)
            var index=0
            var x
            var y=0
            for(var pl in allplayers){
                index=index+1
                x=displayWidth-allplayers[pl].distance
                y=y+150
                bikes[index-1].x=x
                bikes[index-1].y=y
                if(index===player.index){
                    bikes[index-1].addImage(bikeimage)
                    camera.position.x=bikes[index-1].x
                    camera.position.y=displayHeight/2
                }
         
        }
    }
        if(keyDown(LEFT_ARROW)&&player.index!==null){
            player.distance+=5
            player.update()

           if(player.distance>6055){
              gamestate=2
             }
        }
        drawSprites()
    }
    end(){
     text("GAMEOVER",-displayWidth*4,displayHeight/2
         +20)
     }
    
    
    


}