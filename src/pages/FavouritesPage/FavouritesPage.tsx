import { useSelector } from "react-redux";
import {
    getIsAuthenticated,
    getUser,
} from "entities/User/model/selectors/getUser.ts";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import {
    useFavouriteList,
    useItemsProducersList,
    useItemsTypesList,
} from "entities/Item/api/itemsApi.ts";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { SearchInput } from "shared/SearchInput/SearchInput.tsx";
import MultipleSelect from "shared/MultipleSelect/MultipleSelect.tsx";
import ItemCard from "src/widgets/ItemCard/ItemCard.tsx";
import { E_UserRole } from "entities/User/model/types/User.ts";

export const FavouritesPage = () => {
    const isAuthenticated = useSelector(getIsAuthenticated);
    const user = useSelector(getUser);

    const [name, setName] = useState("");

    const [selectedItemTypes, setSelectedItemTypes] = useState<number[]>([]);
    const [selectedItemProducers, setSelectedItemProducers] = useState<
        number[]
    >([]);

    const [debouncedName] = useDebounce(name, 250);

    const { data: itemsList, refetch } = useFavouriteList({
        searchParams: [debouncedName, selectedItemTypes, selectedItemProducers],
    });

    const { data: itemsTypes } = useItemsTypesList();

    const { data: itemsProducers } = useItemsProducersList();

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
            {itemsList && itemsList?.length > 0 ? (
                <Box>
                    <Grid2
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {itemsList.map((item) => (
                            <Grid2 key={item.id} size={{ xs: 2, sm: 3, md: 3 }}>
                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    showAddToDraftOrderBtn={
                                        isAuthenticated &&
                                        user?.role == E_UserRole.Buyer
                                    }
                                    onToggleFavourite={() => refetch()}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            ) : (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 15 }}>
                    <Typography variant="h4" color="text.secondary">
                        Список избранного пуст
                    </Typography>
                </Box>
            )}
        </Container>
    );
};
