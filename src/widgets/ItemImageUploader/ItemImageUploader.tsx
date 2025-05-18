import { Button, CardMedia, Stack } from "@mui/material";
import { updateItemImage } from "entities/Item/api/itemsApi.ts";
import { T_Item } from "entities/Item/model/types/Item.ts";
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";

export const ItemImageUploader = ({ item }: { item: T_Item }) => {
    const [images, setImages] = useState<ImageListType>([]);

    const dispatch = useAppDispatch();

    const getItemImageSrc = (imageList: ImageListType) => {
        if (imageList.length === 0) {
            return `/images/${item.image}`;
        }

        return imageList[0].data_url;
    };

    const onImageChange = (imageList: ImageListType) => {
        setImages(imageList);
        dispatch(
            updateItemImage({ item_id: item.id, image: imageList[0].file })
        );
    };

    return (
        <ImageUploading
            value={images}
            onChange={onImageChange}
            dataURLKey="data_url"
        >
            {({ imageList, onImageUpload }) => (
                <Stack
                    gap={3}
                    alignItems
                    sx={{ width: "100%", height: "100%" }}
                >
                    <CardMedia
                        component="img"
                        src={getItemImageSrc(imageList)}
                    />
                    <Button onClick={onImageUpload}>
                        Изменить изображение
                    </Button>
                </Stack>
            )}
        </ImageUploading>
    );
};
