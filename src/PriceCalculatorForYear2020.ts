import { ServiceType } from ".";
import { PriceCalculatorStrategyBase } from "./PriceCalculatorStrategyBase";

export class PriceCalculatorForYear2020 extends PriceCalculatorStrategyBase {
    baseServicePrices: Record<ServiceType, number> = {
        Photography: 1700,
        VideoRecording: 1700,
        WeddingSession: 600,
        BlurayPackage: 300,
        TwoDayEvent: 400
    };

    getDiscounts(services: ServiceType[]): number[] {
        let discounts = [0];
        if (services.includes("Photography") && services.includes("VideoRecording")) {
            discounts = discounts.concat(1200);
        }
        if (services.includes("WeddingSession") && (services.includes("Photography") || services.includes("VideoRecording"))) {
            discounts = discounts.concat(300);
        }
        return discounts;
    }
}