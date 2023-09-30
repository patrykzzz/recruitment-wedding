import { ServiceType } from ".";
import { PriceCalculatorStrategyBase } from "./PriceCalculatorStrategyBase";

export class PriceCalculatorForYear2021 extends PriceCalculatorStrategyBase {
    baseServicePrices: Record<ServiceType, number> = {
        Photography: 1800,
        VideoRecording: 1800,
        WeddingSession: 600,
        BlurayPackage: 300,
        TwoDayEvent: 400
    };

    getRebates(services: ServiceType[]): number[] {
        let rebates = [0];
        if (services.includes("Photography") && services.includes("VideoRecording")) {
            rebates = rebates.concat(1300);
        }
        if (services.includes("WeddingSession") && (services.includes("Photography") || services.includes("VideoRecording"))) {
            rebates = rebates.concat(300);
        }
        return rebates;
    }
}