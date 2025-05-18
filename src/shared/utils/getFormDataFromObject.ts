export const getFormDataFromObject = (object: object) => {
    const form_data = new FormData();
    for (const key in object) {
        form_data.append(key, object[key]);
    }

    return form_data;
};
