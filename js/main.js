class Calculator {
    constructor() {
        this.banNum = 5000 ;      //amount of bananas from farm
        this.distance = 5000 ;     // distance between farm and market
        this.banCost = 5;            //cost of feeding one camel per Km
    }
    
    //updates the front end slider display value
    updateDisplay (event) {
        var sliderDisplay = event.target.nextElementSibling;
        sliderDisplay.textContent = event.target.value;
        
    }
    
    //updates attributes of class
    updateData(event) {
        var input = event.target.getAttribute("name");
        var value = event.target.value;
        
        switch(input) {
            case "banNum":
                this.banNum = value;
                break;
            
            case "distance":
                this.distance = value;
                break;
            
            case "banCost":
                this.banCost = value;
                break
        }
        
    }
    
    //compute maximum amount of banana to arrive at  Market
    computeNetBan() { 
        
        var movedKm = 0; //distance covered
        var expCamels = this.banNum/1000;    //number of camels          //expected camels  to carry banana from farm
        var x = this.banNum;
        var y = this.distance;
        var k = this.banCost

        var message;
        var tip;

        while (true) {
            
            var dn = 1000/(expCamels * k); //distance moved at 1,000 bananas consumed
            movedKm += dn;
            
            //distance moved greater than y; distance between farm and market
            if (movedKm > y) { 
                var excKm =  movedKm - y; //excess kilometer
                var costExc = excKm * k * expCamels; //cost of excess kilometer
                x += costExc; 
                break;
            }
            
            expCamels -= 1; //reducing camel number to reduce cost
            x -= 1000; //reducing banana number
            
            //if one thousand banana left
            if (x == 1000) {
                var remKm = y - movedKm;
                if (remKm > x) { 
                    message = "No Banana left to sell";
                    tip = "reduce banana cost per KM or distance to Market";
                }
                else { 
                    x -= remKm;
                    message = `You have ${Math.round(x)} bananas to sell at the Market`;
                    tip = "";
                }
                var _dict = {
                    "message": message,
                    "tip": tip
                }
                return _dict
            }
        }
        
        message = `You have ${Math.round(x)} bananas to sell at the Market`;
        tip = "";

        var _dict = {
            "message": message,
            "tip": tip
        }
        return _dict
    }
}

function compute(event,calculator) {
    if (event.target.nodeName === "INPUT") {
        calculator.updateDisplay(event);
        calculator.updateData(event);
        
        var netBanValue = calculator.computeNetBan();
        var netBan = document.querySelector(".netBan");
        var tip = document.querySelector(".tip");
        netBan.textContent = netBanValue.message;
        netBan.style.border = "3px solid goldenrod"
        tip.textContent = `*tip: ${netBanValue.tip}`;
    }
}

function main() {
	var calculator = new Calculator(); 
	var sliders = document.querySelector(".sliders");
	sliders.addEventListener("change", (event)=> {compute(event,calculator)});	
	}

main()
