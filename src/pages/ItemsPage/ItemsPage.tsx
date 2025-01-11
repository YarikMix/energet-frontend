import ItemCard from "src/widgets/ItemCard/ItemCard.tsx";
import { useItemsList } from "entities/Item/api/itemsApi.ts";
import { Box, Container, Grid2 } from "@mui/material";
import MultipleSelect from "shared/MultipleSelect/MultipleSelect.tsx";
import { SearchInput } from "shared/SearchInput/SearchInput.tsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDebounceValue } from "usehooks-ts";

const ItemsPage = () => {
    const [name, setName] = useState("");

    const [searchParams] = useDebounceValue([name], 250);

    const { data, refetch } = useItemsList({ searchParams });

    const names = [
        "Oliver Hansen",
        "Van Henry",
        "April Tucker",
        "Ralph Hubbard",
        "Omar Alexander",
        "Carlos Abbott",
        "Miriam Wagner",
        "Bradley Wilkerson",
        "Virginia Andrews",
        "Kelly Snyder",
    ];

    const manufacturer = ["Oliver Hansen", "Van Henry", "April Tucker"];

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
                    <MultipleSelect label="Тип товара" options={names} />
                    <MultipleSelect
                        label="Производитель"
                        options={manufacturer}
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
