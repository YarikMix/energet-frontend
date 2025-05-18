export const getConfiguratorResultParamDescription = (param: string) => {
    if (param == "RPS") {
        return "Надежность энергоснабжения";
    }

    if (param == "LCOE") {
        return "Стоимость электроэнергии";
    }

    if (param == "CapEx") {
        return "Капитальные затраты";
    }

    if (param == "OpEx") {
        return "Операционные затраты - обслуживание, покупка топлива и т.д";
    }

    if (param == "Economy") {
        return "Сколько человек экономит в год на электричестве";
    }

    return "";
};
