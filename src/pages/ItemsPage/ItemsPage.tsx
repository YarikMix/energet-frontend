import ItemCard from "src/widgets/ItemCard/ItemCard.tsx";
import {
    useItemsList,
    useItemsProducersList,
    useItemsTypesList,
} from "entities/Item/api/itemsApi.ts";
import { Box, Container, Grid2 } from "@mui/material";
import MultipleSelect from "shared/MultipleSelect/MultipleSelect.tsx";
import { SearchInput } from "shared/SearchInput/SearchInput.tsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDebounceValue } from "usehooks-ts";

const ItemsPage = () => {
    const [name, setName] = useState("");

    const [selectedItemTypes, setSelectedItemTypes] = useState<number[]>([]);
    const [selectedItemProducers, setSelectedItemProducers] = useState<
        number[]
    >([]);

    const [searchParams] = useDebounceValue(
        [name, selectedItemTypes, selectedItemProducers],
        250
    );

    const { data, refetch } = useItemsList({ searchParams });

    const { data: itemsTypes } = useItemsTypesList();

    const { data: itemsProducers } = useItemsProducersList();

    return (
        <Container>
            <Box
                mb={5}
                pt={3}
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
            <motion.div className="group-list-wrapper">
                <AnimatePresence>
                    <Grid2
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {data?.map((item) => (
                            <Grid2
                                item
                                key={item.id}
                                size={{ xs: 2, sm: 3, md: 3 }}
                            >
                                <ItemCard {...item} />
                            </Grid2>
                        ))}
                    </Grid2>
                </AnimatePresence>
            </motion.div>
        </Container>
    );
};

export default ItemsPage;
