'use strict'

class Calculator {

	constructor() {
		this.banNum = 5000;      // amount of bananas from farm
		this.distance = 5000;    // distance between farm and market
		this.banCost = 1;         // cost of feeding one camel per Km
	}

	// updates the front end slider display value
	updateDisplay(event) {
		var sliderDisplay = event.target.nextElementSibling;
		sliderDisplay.textContent = event.target.value;
	}

	// updates attributes of class
	updateData(event) {
		const input = event.target.getAttribute("name");
		const value = event.target.value;

		switch (input) {
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

	// compute maximum amount of banana to arrive at  Market
	computeNetBan() {

		let movedKm = 0; //	distance covered
		let expCamels = this.banNum / 1000;	//	number of camels expected to carry banana from farm
		let distance = this.distance;
		let banNum = this.banNum;
		let banCost = this.banCost

		let message;
		let tip;

		if (distance => banNum) {
			message = "No Banana left to sell";
			tip = "reduce banana cost per KM or distance to Market";

			return { message, tip }
		}

		while (true) {

			banNum -= 1000; // reducing banana number by amount to be consumed;
			movedKm += 1000 / (expCamels * banCost); // distance moved at 1,000 bananas consumed;
			distance -= movedKm;

			if (distance <= 0) {	// journey completed
				const excKm = -1 * distance; //	surplus kilometer
				const costExc = excKm * banCost * expCamels; //	cost of surplus kilometer
				banNum += costExc;
				message = `You have ${Math.round(banNum)} bananas to sell at the Market`;
				tip = "";
				break
			}
	
			if (banNum === 0) {	// banana is exhausted before destination
				message = "No Banana left to sell";
				tip = "reduce banana cost per KM or distance to Market";
				break
			}

			expCamels -= 1; //	reducing camel number to reduce cost
		}

		return { message, tip }

	}
}

function compute(event, calculator) {
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
	sliders.addEventListener("change", (event) => compute(event, calculator) );
}

main()
