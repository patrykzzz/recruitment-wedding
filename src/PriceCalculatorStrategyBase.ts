import { ServiceType } from ".";

export abstract class PriceCalculatorStrategyBase {
    abstract baseServicePrices: Record<ServiceType, number>;
    abstract getRebates(services: ServiceType[]): number[];
    calculatePrices(services: ServiceType[]): ({ basePrice: number, finalPrice: number; }) {
        const basePrice = services.reduce((acc, currentService, _, __) => {
            return this.baseServicePrices[currentService] + acc;
        }, 0);

        const rebates = this.getRebates(services);
        const highestRebate = rebates.sort()[rebates.length - 1];
        return {
            basePrice,
            finalPrice: basePrice - highestRebate
        };
    }
}