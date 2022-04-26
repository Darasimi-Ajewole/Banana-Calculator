'use strict'

interface InputElementEvent extends Event {
	target: HTMLInputElement
}

interface Element {
    style: CSSStyleDeclaration
}

class Calculator {
	banNum: number
	distance: number
	banCost: number

	constructor() {
		this.banNum = 5000;      // amount of bananas from farm
		this.distance = 5000;    // distance between farm and market
		this.banCost = 1;         // cost of feeding one camel per Km
	}

	// updates the front end slider display value
	updateDisplay(event: InputElementEvent): void {
		const target: HTMLInputElement = event.target
		const sliderDisplay = target.nextElementSibling;
		sliderDisplay.textContent = target.value;
	}

	// updates attributes of class
	updateData(event: InputElementEvent) {
		const input: string = event.target.getAttribute("name");
		const value: number = Number(event.target.value);
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
	computeNetBan(): { message: string, tip: string} {

		let movedKm: number = 0; //	distance covered
		let expCamels: number = this.banNum / 1000;	//	number of camels expected to carry banana from farm
		let distance: number = this.distance;
		let banNum: number = this.banNum;
		let banCost: number = this.banCost

		let message: string;
		let tip: string;

		if (this.distance >= banNum) {
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

function compute(event: InputElementEvent, calculator: Calculator) {
	if (event.target.nodeName === "INPUT") {
		calculator.updateDisplay(event);
		calculator.updateData(event);

		const netBanValue = calculator.computeNetBan();
		const netBan: Element = document.querySelector(".netBan");
		const tip = document.querySelector(".tip");
		netBan.textContent = netBanValue.message;
		netBan.style.border = "3px solid goldenrod"
		tip.textContent = `*tip: ${netBanValue.tip}`;
	}
}

function main() {
	const calculator = new Calculator();
	const sliders = document.querySelector(".sliders");
	sliders.addEventListener("change", (event) => compute(<InputElementEvent>event, calculator) );
}

main()
