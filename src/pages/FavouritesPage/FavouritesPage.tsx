import { Box, Container, Grid2, Typography, Button, Stack } from "@mui/material";
import {
    useFavouriteList,
    useItemsProducersList,
    useItemsTypesList,
} from "entities/Item/api/itemsApi.ts";
import {
    getIsAuthenticated,
    getUser,
} from "entities/User/model/selectors/getUser.ts";
import { E_UserRole } from "entities/User/model/types/User.ts";
import { useState } from "react";
import { useSelector } from "react-redux";
import MultipleSelect from "shared/MultipleSelect/MultipleSelect.tsx";
import { SearchInput } from "shared/SearchInput/SearchInput.tsx";
import ItemCard from "src/widgets/ItemCard/ItemCard.tsx";
import { useDebounce } from "use-debounce";

export const FavouritesPage = () => {
    const isAuthenticated = useSelector(getIsAuthenticated);
    const user = useSelector(getUser);

    const [name, setName] = useState("");

    const [selectedItemTypes, setSelectedItemTypes] = useState<string[]>([]);

    const [selectedItemProducers, setSelectedItemProducers] = useState<string[]>([]);

    const [debouncedName] = useDebounce(name, 250);
    
    const selectedTypeIds = selectedItemTypes
    .map(name => itemsTypes?.find(item => item.name === name)?.id)
    .filter((id): id is number => typeof id === "number");

    const selectedProducerIds = selectedItemProducers
    .map(name => itemsProducers?.find(item => item.name === name)?.id)
    .filter((id): id is number => typeof id === "number");

    const { data: itemsList, refetch } = useFavouriteList({
    searchParams: [debouncedName, selectedTypeIds, selectedProducerIds],
    });


    const { data: itemsTypes } = useItemsTypesList();

    const { data: itemsProducers } = useItemsProducersList();

    const handleResetFilters = () => {
        setSelectedItemTypes([]);
        setSelectedItemProducers([]);
    };

    return (
        <Container>
            <Box
                mb={5}
                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
                <SearchInput
                    value={name}
                    onChange={setName}
                    onIconClick={refetch}
                />
                <Stack direction="row" gap={2} alignItems="center">
                    <MultipleSelect
                        label="Категория"
                        options={itemsTypes || []}
                        value={selectedItemTypes}
                        onChange={setSelectedItemTypes}
                    />
                    <MultipleSelect
                        label="Производитель"
                        options={itemsProducers || []}
                        value={selectedItemProducers}
                        onChange={setSelectedItemProducers}
                    />
                    <Button variant="outlined" color="secondary" sx={{ height: 40 }} onClick={handleResetFilters}>
                        Сбросить фильтры
                    </Button>
                </Stack>
            </Box>

            {itemsList && itemsList.length > 0 ? (
                <Grid2 container spacing={{ xs: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {itemsList.map((item) => (
                        <Grid2 key={item.id} size={{ xs: 2, sm: 3, md: 3 }}>
                            <ItemCard
                                key={item.id}
                                item={item}
                                showAddToDraftOrderBtn={isAuthenticated && user?.role === E_UserRole.Buyer}
                                onToggleFavourite={refetch}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 15 }}>
                    <Typography variant="h4" color="text.secondary">Список избранного пуст</Typography>
                </Box>
            )}
        </Container>
    );
};
