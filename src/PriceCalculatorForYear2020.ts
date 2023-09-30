import { PriceCalculatorStrategy, ServiceType } from ".";

export class PriceCalculatorForYear2020 implements PriceCalculatorStrategy {

    baseServicePrice: Record<ServiceType, number> = {
        Photography: 1700,
        VideoRecording: 1700,
        WeddingSession: 600,
        BlurayPackage: 300,
        TwoDayEvent: 400
    };

    calculate(services: ServiceType[]): ({ basePrice: number, finalPrice: number; }) {
        var basePrice = services.reduce((pv, cv, _, __) => {
            return this.baseServicePrice[cv] + pv;
        }, 0);
        let rebates = [0];
        if (services.includes("Photography") && services.includes("VideoRecording")) {
            rebates = rebates.concat(1200);
        }
        if (services.includes("WeddingSession") && (services.includes("Photography") || services.includes("VideoRecording"))) {
            rebates = rebates.concat(300);
        }
        const biggestRebate = rebates.sort()[rebates.length - 1];

        return { basePrice, finalPrice: basePrice - biggestRebate };
    }
}