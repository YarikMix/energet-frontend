// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import {
    deleteItem,
    updateItem,
    updateItemImage,
    useItem,
    useItemsProducersList,
    useItemsTypesList,
} from "entities/Item/api/itemsApi.ts";
import { E_ItemStatus } from "entities/Item/model/types/Item.ts";
import getIsModerator from "entities/User/model/selectors/isModerator.ts";
import getIsProducer from "entities/User/model/selectors/isProducer.ts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "shared/Dropdown/Dropdown.tsx";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { ItemImageUploader } from "src/widgets/ItemImageUploader/ItemImageUploader.tsx";

const ItemEditPage = () => {
    const { id } = useParams<{ id: number }>();
    const isProducer = useSelector(getIsProducer);
    const isModerator = useSelector(getIsModerator);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data: item, isLoading } = useItem(id as number);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [power, setPower] = useState("");
    const [weight, setWeight] = useState("");
    const [warehouse_count, setWarehouseCount] = useState("");

    const [type, setType] = useState<number>(null);
    const [producer, setProducer] = useState<number>(null);

    const { data: itemsTypes } = useItemsTypesList();

    const { data: itemsProducers } = useItemsProducersList();

    useEffect(() => {
        if (item) {
            setName(item.name);
            setPrice(item.price as string);
            setPower(item.power as string);
            setWeight(item.weight as string);
            setType(item.item_type.id);
            setProducer(item.item_producer.id);
            setWarehouseCount(item.warehouse_count);
        }
    }, [item]);

    useEffect(() => {
        if (!isProducer && !isModerator) {
            navigate("/");
        }
    }, [isProducer, isModerator, navigate]);

    if (isLoading || !item || !id) {
        return null;
    }

    if (item.status == E_ItemStatus.Deleted) {
        return (
            <Container>
                <Stack gap={4}>
                    <Typography variant="h5">
                        Данное оборудование снято с продажи
                    </Typography>
                    <Button
                        onClick={() => navigate("/")}
                        variant="contained"
                        sx={{ width: "200px" }}
                    >
                        Назад
                    </Button>
                </Stack>
            </Container>
        );
    }

    const handleSaveItem = async () => {
        await dispatch(
            updateItem({
                id,
                data: {
                    name,
                    price,
                    power,
                    weight,
                    item_type: type,
                    item_producer: producer,
                    warehouse_count: warehouse_count,
                },
            })
        );
        navigate("/");
    };

    const handleDeleteItem = async () => {
        await dispatch(deleteItem(id));
        navigate("/");
    };

    const handleChangeItemType = (itemType) => {
        setType(itemType);
    };

    const handleChangeItemProducer = (itemProducer) => {
        setProducer(itemProducer);
    };

    const onImageChange = (image: File) => {
        dispatch(updateItemImage({ item_id: id, image }));
    };

    if (!itemsTypes || !itemsProducers || !item || !type) {
        return;
    }

    return (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="column" gap={5} width={400}>
                <Typography variant="h5" align="center">
                    Редактирование оборудования
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
                <TextField
                    label="Кол-во на складе"
                    value={warehouse_count}
                    type="number"
                    onChange={(e) => setWarehouseCount(e.target.value)}
                />
                <ItemImageUploader
                    defaultImage={`/images/${item.image}`}
                    onChange={onImageChange}
                />
                <Stack gap={4} direction="row">
                    <Button
                        onClick={handleSaveItem}
                        variant="contained"
                        fullWidth
                    >
                        Сохранить
                    </Button>
                    <Button
                        onClick={handleDeleteItem}
                        variant="outlined"
                        fullWidth
                    >
                        Снять с продажи
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};

export default ItemEditPage;
