import { ServiceType } from ".";
import { PriceCalculatorStrategyBase } from "./PriceCalculatorStrategyBase";

export class PriceCalculatorForYear2022 extends PriceCalculatorStrategyBase {

    baseServicePrices: Record<ServiceType, number> = {
        Photography: 1900,
        VideoRecording: 1900,
        WeddingSession: 600,
        BlurayPackage: 300,
        TwoDayEvent: 400
    };

    getRebates(services: ServiceType[]): number[] {
        let rebates = [0];
        if (services.includes("Photography") && services.includes("VideoRecording")) {
            rebates = rebates.concat(1300);
        }
        if (services.includes("WeddingSession") && services.includes("VideoRecording")) {
            rebates = rebates.concat(300);
        }
        if (services.includes("Photography") && services.includes("WeddingSession")) {
            rebates = rebates.concat(600);
        }
        return rebates;
    }
}