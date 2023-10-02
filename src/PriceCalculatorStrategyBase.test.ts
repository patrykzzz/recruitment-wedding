import { ServiceType } from ".";
import { PriceCalculatorStrategyBase } from "./PriceCalculatorStrategyBase";

let implementation: PriceCalculatorStrategyBase;

describe("PriceCalculatorStrategyBase", () => {
    beforeAll(() => {
        implementation = new TestImplementation();
    });

    test.each([
        [[], 0, 0],
        [["Photography", "VideoRecording"], 3, 3],
        [["BlurayPackage", "VideoRecording", "Photography"], 6, 4]
    ])("Calculates prices properly for services: %s", (services: ServiceType[], expectedBasePrice: number, expectedFinalPrice: number) => {
        const result = implementation.calculatePrices(services);

        expect(result.basePrice).toBe(expectedBasePrice);
        expect(result.finalPrice).toBe(expectedFinalPrice);
    });

    test("Applies only the highest discount", () => {
        const servicesWithDiscount: ServiceType[] = ["Photography", "TwoDayEvent", "BlurayPackage", "VideoRecording"];

        const result = implementation.calculatePrices(servicesWithDiscount);

        expect(result.finalPrice).toBe(result.basePrice - 2);
    });
});

class TestImplementation extends PriceCalculatorStrategyBase {
    baseServicePrices: Record<ServiceType, number> = {
        Photography: 1,
        VideoRecording: 2,
        BlurayPackage: 3,
        TwoDayEvent: 4,
        WeddingSession: 5
    };

    getDiscounts(services: ServiceType[]): number[] {
        return services.length > 2 ? [1, 2] : [];
    }
}