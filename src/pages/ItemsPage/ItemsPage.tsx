import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { SearchInput } from "shared/SearchInput/SearchInput.tsx";
import MultipleSelect from "src/shared/MultipleSelect/MultipleSelect";
import ItemCard from "src/widgets/ItemCard/ItemCard.tsx";
import ItemsTable from "src/widgets/ItemsTable/ItemsTable.tsx";
import { useDebounce } from "use-debounce";

const ItemsPage: React.FC = () => {
  const isBuyer = useSelector(getIsBuyer);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isProducer = useSelector(getIsProducer);
  const isModerator = useSelector(getIsModerator);

  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState<string>(searchParams.get("name") || "");
  const [selectedItemTypeNames, setSelectedItemTypeNames] = useState<string[]>(
    searchParams.get("types") ? searchParams.get("types")!.split(",") : []
  );
  const [selectedItemProducerNames, setSelectedItemProducerNames] = useState<string[]>(
    searchParams.get("producers") ? searchParams.get("producers")!.split(",") : []
  );
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const { data: itemsTypes } = useItemsTypesList();
  const { data: itemsProducers } = useItemsProducersList();

  const [debouncedName] = useDebounce(name, 250);

  const selectedTypeIds = selectedItemTypeNames
    .map(name => itemsTypes?.find(item => item.name === name)?.id)
    .filter((id): id is number => typeof id === "number");

  const selectedProducerIds = selectedItemProducerNames
    .map(name => itemsProducers?.find(item => item.name === name)?.id)
    .filter((id): id is number => typeof id === "number");

  const { data: itemsList, refetch } = useItemsList({
    searchParams: [debouncedName, selectedTypeIds, selectedProducerIds],
    page,
  });

  useEffect(() => {
    const params: Record<string, string> = {};
    if (name) params.name = name;
    if (selectedItemTypeNames.length) params.types = selectedItemTypeNames.join(",");
    if (selectedItemProducerNames.length) params.producers = selectedItemProducerNames.join(",");
    if (page !== 1) params.page = String(page);

    setSearchParams(params);
  }, [name, selectedItemTypeNames, selectedItemProducerNames, page, setSearchParams]);

  const handleChange = (_: React.ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedName]);

  const handleResetFilters = () => {
    setName("");
    setSelectedItemTypeNames([]);
    setSelectedItemProducerNames([]);
    setPage(1);
  };

  if (isProducer || isModerator) {
    return (
      <Container>
        <Box mb={5} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <SearchInput value={name} onChange={setName} onIconClick={refetch} />
          <Stack gap={2} direction="row" alignItems="center">
            <MultipleSelect label="Категория" options={itemsTypes || []} value={selectedItemTypeNames} onChange={setSelectedItemTypeNames} />
            <MultipleSelect label="Производитель" options={itemsProducers || []} value={selectedItemProducerNames} onChange={setSelectedItemProducerNames} />
            <Button variant="outlined" color="primary" sx={{ height: 40 }} onClick={handleResetFilters}>
              Сбросить фильтры
            </Button>
          </Stack>
        </Box>
        <ItemsTable items={itemsList?.items || []} />
      </Container>
    );
  }

  if (!isBuyer && isAuthenticated) return null;

  return (
    <Container>
      <Box mb={5} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <SearchInput value={name} onChange={setName} onIconClick={refetch} />
        <Stack gap={2} direction="row" alignItems="center">
          <MultipleSelect label="Категория" options={itemsTypes || []} value={selectedItemTypeNames} onChange={setSelectedItemTypeNames} />
          <MultipleSelect label="Производитель" options={itemsProducers || []} value={selectedItemProducerNames} onChange={setSelectedItemProducerNames} />
          <Button variant="outlined" color="primary" sx={{ height: 40 }} onClick={handleResetFilters}>
            Сбросить фильтры
          </Button>
        </Stack>
      </Box>
      {itemsList?.items?.length ? (
        <>
          <Grid2 container spacing={{ xs: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}>
            {itemsList.items.map(item => (
              <Grid2 key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} alignItems="stretch">
                <ItemCard key={item.id} item={item} showAddToDraftOrderBtn={isAuthenticated && isBuyer} />
              </Grid2>
            ))}
          </Grid2>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Pagination count={itemsList.total_pages} page={page} onChange={handleChange} />
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 15 }}>
          <Typography variant="h4" color="text.secondary">Оборудование не найдено</Typography>
        </Box>
      )}
    </Container>
  );
};

export default ItemsPage;