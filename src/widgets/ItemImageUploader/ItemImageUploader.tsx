// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button, CardMedia, Stack } from "@mui/material";
import { useState } from "react";
import ImageUploading, {
    ImageListType,
    ImageType,
} from "react-images-uploading";

interface Props {
    defaultImage: string;
    onChange?: (value: ImageType) => void;
}

export const ItemImageUploader = ({ defaultImage, onChange }: Props) => {
    const [images, setImages] = useState<ImageListType>([]);

    const getItemImageSrc = (imageList: ImageListType) => {
        if (imageList.length === 0) {
            return defaultImage;
        }

        return imageList[0].data_url;
    };

    const onImageChange = (imageList: ImageListType) => {
        setImages(imageList);
        onChange?.(imageList[0].file);
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
