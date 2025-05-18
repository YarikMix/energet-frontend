import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import {
    createItem,
    useItemsProducersList,
    useItemsTypesList,
} from "entities/Item/api/itemsApi.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "shared/Dropdown/Dropdown.tsx";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { ItemImageUploader } from "src/widgets/ItemImageUploader/ItemImageUploader.tsx";

export const ItemAddPage = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [power, setPower] = useState("");
    const [weight, setWeight] = useState("");

    const [type, setType] = useState<number>(null);
    const [producer, setProducer] = useState<number>(null);

    const [image, setImage] = useState<File>();

    const { data: itemsTypes } = useItemsTypesList();

    const { data: itemsProducers } = useItemsProducersList();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChangeItemType = (itemType) => {
        setType(itemType);
    };

    const handleChangeItemProducer = (itemProducer) => {
        setProducer(itemProducer);
    };

    const handleCreateItem = async () => {
        await dispatch(
            createItem({
                name,
                price,
                power,
                weight,
                item_type: type,
                item_producer: producer,
                image,
            })
        );
        navigate("/");
    };

    const handleChangeImage = (image: File) => {
        setImage(image);
    };

    if (!itemsTypes || !itemsProducers) {
        return null;
    }

    return (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="column" gap={5} width={400}>
                <Typography variant="h5" align="center">
                    Создание оборудования
                </Typography>
                <TextField
                    label="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Цена"
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    label="Мощность"
                    value={power}
                    type="number"
                    onChange={(e) => setPower(e.target.value)}
                />
                <TextField
                    label="Вес"
                    value={weight}
                    type="number"
                    onChange={(e) => setWeight(e.target.value)}
                />
                <Dropdown
                    label="Тип"
                    value={type}
                    options={itemsTypes}
                    onChange={handleChangeItemType}
                />
                <Dropdown
                    label="Производитель"
                    value={producer}
                    options={itemsProducers}
                    onChange={handleChangeItemProducer}
                />
                <ItemImageUploader
                    defaultImage={"images/items/default.png"}
                    onChange={handleChangeImage}
                />
                <Stack gap={4} direction="row">
                    <Button
                        onClick={handleCreateItem}
                        variant="contained"
                        fullWidth
                    >
                        Добавить
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};
