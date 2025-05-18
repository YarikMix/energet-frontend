export const formatConfiguratorResultParamValue = (
    param: string,
    value: number
) => {
    if (param == "RPS") {
        return 100 * value + " %";
    }

    if (param == "LCOE") {
        return value + " ₽ / киловатт-час";
    }

    if (param == "CapEx") {
        return value + " ₽";
    }

    if (param == "OpEx") {
        return value + " ₽ / год";
    }

    if (param == "Economy") {
        return value + " ₽";
    }

    return "";
};
