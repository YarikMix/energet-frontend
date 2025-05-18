import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { deleteItem, updateItem, useItem } from "entities/Item/api/itemsApi.ts";
import { E_ItemStatus } from "entities/Item/model/types/Item.ts";
import getIsModerator from "entities/User/model/selectors/isModerator.ts";
import getIsProducer from "entities/User/model/selectors/isProducer.ts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

    useEffect(() => {
        if (item) {
            setName(item.name);
            setPrice(item.price as string);
            setPower(item.power as string);
        }
    }, [item]);

    useEffect(() => {
        if (!isProducer && !isModerator) {
            navigate("/");
        }
    }, [isProducer, isModerator]);

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
                },
            })
        );
        navigate("/");
    };

    const handleDeleteItem = async () => {
        await dispatch(deleteItem(id));
        navigate("/");
    };

    return (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="column" gap={5} width={400}>
                <Typography variant="h5">
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
                {/*<Dropdown label="Тип" value={type} />*/}
                {/*<Dropdown label="Производитель" value={producer} />*/}
                <ItemImageUploader item={item} />
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
