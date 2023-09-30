export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType; }
) => {
    if (action.type === "Select") {
        if (previouslySelectedServices.some(s => s == action.service)) {
            return previouslySelectedServices;
        }
        if (containsRequiredService(action.service, previouslySelectedServices)) {
            return previouslySelectedServices.concat(action.service);
        }
    }
    return previouslySelectedServices.filter(service => service != action.service && !getRelatedServices(action.service).some(s => s == service));
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => ({ basePrice: 0, finalPrice: 0 });

export function containsRequiredService(service: ServiceType, actual: ServiceType[]): boolean {
    if (service == "BlurayPackage") {
        return actual.some(s => s == "VideoRecording");
    }
    if (service == "TwoDayEvent") {
        return actual.some(s => s === "VideoRecording") || actual.some(s => s === "Photography");
    }
    return true;
}

export function getRelatedServices(service: ServiceType): ServiceType[] {
    if (service == "VideoRecording") {
        return ["BlurayPackage", "TwoDayEvent"];
    }
    if (service == "Photography") {
        return ["TwoDayEvent"];
    }
    return [];
}