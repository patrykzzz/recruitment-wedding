import { ServiceType } from ".";

export abstract class PriceCalculatorStrategyBase {
    abstract baseServicePrices: Record<ServiceType, number>;
    abstract getDiscounts(services: ServiceType[]): number[];
    calculatePrices(services: ServiceType[]): ({ basePrice: number, finalPrice: number; }) {
        const basePrice = services.reduce((acc, currentService) => {
            return this.baseServicePrices[currentService] + acc;
        }, 0);

        const discounts = this.getDiscounts(services);
        const highestDiscount = discounts.length > 0 ? discounts.sort((a, b) => a - b)[discounts.length - 1] : 0;
        return {
            basePrice,
            finalPrice: basePrice - highestDiscount
        };
    }
}