// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, List, ListItem, ListItemText, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { hideModal, setModal } from "entities/Modals/lib/slices/modalsSlice.ts";
import { getModal } from "entities/Modals/model/selectors/getModal.ts";
import * as React from "react";
import { useEffect } from "react";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import useLocalStorageState from "use-local-storage-state";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    height: "600px",
    borderRadius: "8px",
};

export default function OnboardingModal() {
    const dispatch = useAppDispatch();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        dispatch(setModal("onboarding"));
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(hideModal());
        setOpen(false);
    };

    const modal = useAppSelector(getModal);
    const [shown, setShown] = useLocalStorageState("onb_shown", {
        defaultValue: modal == "onboarding",
    });

    useEffect(() => {
        if (shown) {
            return;
        }

        handleOpen();
        setShown(true);
    }, [handleOpen, setShown, shown]);

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack sx={style} gap={2}>
                    <Box>
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            component="h2"
                            gutterBottom
                        >
                            Что это за платформа?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Энергет — это интеллектуальная система поддержки
                            принятия решений для проектирования оптимальных
                            систем энергоснабжения на основе возобновляемых
                            источников энергии (ВИЭ). Мы помогаем подобрать
                            идеальную конфигурацию энергосистемы именно под ваши
                            потребности и условия совершенно бесплатно. Ключевой
                            особенностью сервиса является интеграция
                            специализированного ПО для конфигурирования
                            ВИЭ-систем (конфигуратор) в маркетплейс оборудования
                            и услуг (каталог), что позволяет полностью
                            автоматизировать процесс проектирования (от
                            проведения технико-экономического обоснования
                            проекта до формирования комплекта поставки).
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            На кого ориентирован наш сервис?
                        </Typography>
                        <List sx={{ listStyleType: "disc", pl: 2 }}>
                            <ListItem sx={{ display: "list-item" }}>
                                <ListItemText primary="Частные домовладельцы — для автономного энергоснабжения дома и микрогенерации" />
                            </ListItem>
                            <ListItem sx={{ display: "list-item" }}>
                                <ListItemText primary="МСП — для снижения затрат на электроэнергию" />
                            </ListItem>
                            <ListItem sx={{ display: "list-item" }}>
                                <ListItemText primary="Проектировщики в области ВИЭ — для быстрого поиска оптимальных решений" />
                            </ListItem>
                        </List>
                    </Box>
                    <Box>
                        <Typography variant="h6">Как это работает?</Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Чтобы получить доступ к конфигуратору, для начала
                            необходимо зарегистрироваться/авторизироваться.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6">1. Укажите локацию</Typography>
                        <img
                            src="onboarding1.png"
                            alt=""
                            style={{ width: "100%" }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            2. Опишите энергопотребление
                        </Typography>
                        <img
                            src="onboarding2.png"
                            alt=""
                            style={{ width: "100%" }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            3. Выберите источники энергии и экономическую модель
                        </Typography>
                        <img
                            src="onboarding3.png"
                            alt=""
                            style={{ width: "100%" }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            4. Получите решение
                        </Typography>
                        <img
                            src="onboarding4.png"
                            alt=""
                            style={{ width: "100%" }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            5. Сформируйте комплект поставки
                        </Typography>
                        <img
                            src="onboarding5.png"
                            alt=""
                            style={{ width: "100%" }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Начните прямо сейчас! Зарегистрируйтесь и перейдите
                            в конфигуратор для создания вашей первой
                            энергосистемы.
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}>
                            Примечание: в настоящее время сервис работает в
                            демонстрационном формате. Некоторые функции,
                            представленные в данном описании сервиса, еще не
                            доступны. Товары, представленные в каталоге, носят
                            демонстрационный характер.
                        </Typography>
                    </Box>
                </Stack>
            </Modal>
        </>
    );
}
