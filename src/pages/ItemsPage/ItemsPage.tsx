import {
    Box,
    Container,
    Grid2,
    Pagination,
    Stack,
    Typography,
} from "@mui/material";
import {
    useItemsList,
    useItemsProducersList,
    useItemsTypesList,
} from "entities/Item/api/itemsApi.ts";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import getIsBuyer from "entities/User/model/selectors/isBuyer.ts";
import getIsModerator from "entities/User/model/selectors/isModerator.ts";
import getIsProducer from "entities/User/model/selectors/isProducer.ts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MultipleSelect from "shared/MultipleSelect/MultipleSelect.tsx";
import { SearchInput } from "shared/SearchInput/SearchInput.tsx";
import ItemCard from "src/widgets/ItemCard/ItemCard.tsx";
import ItemsTable from "src/widgets/ItemsTable/ItemsTable.tsx";
import { useDebounce } from "use-debounce";

const ItemsPage = () => {
    const isBuyer = useSelector(getIsBuyer);
    const isAuthenticated = useSelector(getIsAuthenticated);
    const isProducer = useSelector(getIsProducer);
    const isModerator = useSelector(getIsModerator);

    const [name, setName] = useState("");

    const [selectedItemTypes, setSelectedItemTypes] = useState<number[]>([]);
    const [selectedItemProducers, setSelectedItemProducers] = useState<
        number[]
    >([]);

    const [debouncedName] = useDebounce(name, 250);

    const [page, setPage] = useState(1);

    const { data: itemsList, refetch } = useItemsList({
        searchParams: [debouncedName, selectedItemTypes, selectedItemProducers],
        page,
    });

    const { data: itemsTypes } = useItemsTypesList();

    const { data: itemsProducers } = useItemsProducersList();

    const handleChange = (e, pageIdx) => {
        setPage(pageIdx);
    };

    useEffect(() => {
        setPage(1);
    }, [debouncedName, selectedItemTypes, selectedItemProducers]);

    if (!itemsList) {
        return null;
    }

    if (isProducer || isModerator) {
        return (
            <Container>
                <Box
                    mb={5}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <SearchInput onChange={setName} onIconClick={refetch} />
                    <Stack gap={2} direction="row" alignItems="center">
                        <MultipleSelect
                            label="Категория"
                            options={itemsTypes}
                            onChange={setSelectedItemTypes}
                        />
                        <MultipleSelect
                            label="Производитель"
                            options={itemsProducers}
                            onChange={setSelectedItemProducers}
                        />
                    </Stack>
                </Box>
                <ItemsTable items={itemsList.items} />
            </Container>
        );
    }

    if (!isBuyer && isAuthenticated) {
        return null;
    }

    return (
        <Container>
            <Box
                mb={5}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <SearchInput onChange={setName} onIconClick={refetch} />
                <Box>
                    <MultipleSelect
                        label="Категория"
                        options={itemsTypes}
                        onChange={setSelectedItemTypes}
                    />
                    <MultipleSelect
                        label="Производитель"
                        options={itemsProducers}
                        onChange={setSelectedItemProducers}
                    />
                </Box>
            </Box>
            {itemsList.items?.length > 0 ? (
                <Box>
                    <Grid2
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
                    >
                        {itemsList.items.map((item) => (
                            <Grid2
                                key={item.id}
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                alignItems="stretch"
                            >
                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    showAddToDraftOrderBtn={
                                        isAuthenticated && isBuyer
                                    }
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 5,
                        }}
                    >
                        <Pagination
                            count={itemsList?.total_pages}
                            page={page}
                            onChange={handleChange}
                        />
                    </Box>
                </Box>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 15 }}>
                    <Typography variant="h4" color="text.secondary">
                        Оборудование не найдено
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default ItemsPage;
