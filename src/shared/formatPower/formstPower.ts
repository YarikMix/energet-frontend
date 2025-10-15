export const formatPower = (power: number, itemTypeName: string): string => {
    const isBattery = itemTypeName === "Аккумулятор";
    
    if (isBattery) {
        return power < 1000 
            ? `${power} Вт*ч` 
            : `${(power / 1000)} кВт*ч`;
    } else {
        return power < 1000 
            ? `${power} Вт` 
            : `${(power / 1000)} кВт`;
    }
};