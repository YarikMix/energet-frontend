import ItemCard from "src/widgets/ItemCard/ItemCard.tsx";
import {
    useItemsList,
    useItemsProducersList,
    useItemsTypesList,
} from "entities/Item/api/itemsApi.ts";
import { Box, Container, Grid2, Pagination, Typography } from "@mui/material";
import MultipleSelect from "shared/MultipleSelect/MultipleSelect.tsx";
import { SearchInput } from "shared/SearchInput/SearchInput.tsx";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsAuthenticated,
    getUser,
} from "entities/User/model/selectors/getUser.ts";
import { E_UserRole } from "entities/User/model/types/User.ts";
import { handleFetchDraftOrder } from "entities/Order/lib/slices/DraftOrderSlice.ts";

const ItemsPage = () => {
    const isAuthenticated = useSelector(getIsAuthenticated);
    const user = useSelector(getUser);
    const dispatch = useDispatch();

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
                        label="Тип товара"
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
            {itemsList?.items?.length > 0 ? (
                <Box>
                    <Grid2
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {itemsList?.items?.map((item) => (
                            <Grid2
                                item
                                key={item.id}
                                size={{ xs: 2, sm: 3, md: 3 }}
                            >
                                <ItemCard
                                    item={item}
                                    showAddToDraftOrderBtn={
                                        isAuthenticated &&
                                        user?.role == E_UserRole.Buyer
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
