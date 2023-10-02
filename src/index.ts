import { PriceCalculatorForYear2020 } from "./PriceCalculatorForYear2020";
import { PriceCalculatorForYear2021 } from "./PriceCalculatorForYear2021";
import { PriceCalculatorForYear2022 } from "./PriceCalculatorForYear2022";
import { PriceCalculatorStrategyBase } from "./PriceCalculatorStrategyBase";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType; }
) => {
    if (action.type === "Select") {
        if (previouslySelectedServices.includes(action.service) || !containsRequiredService(action.service, previouslySelectedServices)) {
            return previouslySelectedServices;
        }
        return previouslySelectedServices.concat(action.service);
    }
    const relatedServices = parentToRelatedServices[action.service];
    const servicesToDeselect = relatedServices.filter(s => getParentServiceCount(s, previouslySelectedServices) > 1)
        .concat(action.service);
    return previouslySelectedServices.filter(service => !servicesToDeselect.includes(service));
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
    const strategy = getStrategyForYear(selectedYear);
    return strategy.calculatePrices(selectedServices);
};

function containsRequiredService(service: ServiceType, actual: ServiceType[]): boolean {
    if (service == "BlurayPackage") {
        return actual.includes("VideoRecording");
    }
    if (service == "TwoDayEvent") {
        return actual.includes("VideoRecording") || actual.includes("Photography");
    }
    return true;
}

function getParentServiceCount(service: ServiceType, actual: ServiceType[]): number {
    return actual.filter(s => parentToRelatedServices[s].includes(service)).length;
}

const parentToRelatedServices: Record<ServiceType, ServiceType[]> = {
    "VideoRecording": ["BlurayPackage", "TwoDayEvent"],
    "Photography": ["TwoDayEvent"],
    "BlurayPackage": [],
    "TwoDayEvent": [],
    "WeddingSession": []
};

function getStrategyForYear(year: ServiceYear): PriceCalculatorStrategyBase {
    switch (year) {
        case 2020:
            return new PriceCalculatorForYear2020();
        case 2021:
            return new PriceCalculatorForYear2021();
        case 2022:
            return new PriceCalculatorForYear2022();
        default:
            throw {
                message: "Year is not supported"
            };
    }
}
