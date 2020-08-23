class Food{
    constructor(){
        this.image=loadImage("images/Milk.png")
        this.foodStock
        this.lastFed
    }
    getFoodStock(){

    }
    updateFoodStock(){

    }
    deductFood(){

    }
    display(){
        var x=80, y=100;
        imageMode(center) 
        image(this.image,720,220,70,70)

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                }
            }
        }

    }
}