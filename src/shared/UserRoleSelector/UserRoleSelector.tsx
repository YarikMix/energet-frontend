// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { E_UserRole } from "entities/User/model/types/User.ts";
import { Controller } from "react-hook-form";

const UserRoleSelector = ({ control }) => {
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Роль</FormLabel>
            <Controller
                name="role"
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        row
                        value={field.value}
                        onChange={field.onChange}
                    >
                        <FormControlLabel
                            value={E_UserRole.Buyer}
                            control={<Radio />}
                            label="Покупатель"
                        />
                        <FormControlLabel
                            value={E_UserRole.Producer}
                            control={<Radio />}
                            label="Поставщик"
                        />
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
};

export default UserRoleSelector;
