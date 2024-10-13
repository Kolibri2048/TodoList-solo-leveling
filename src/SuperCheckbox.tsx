import React from 'react';
import Checkbox from "@mui/material/Checkbox";

type superCheckedBoxType = {
    checked: boolean,
    onChange: (e: boolean) => void
}

const SuperCheckedBox = ({checked, onChange}: superCheckedBoxType) => {
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)
    }
    return (<>
            <Checkbox
                checked={checked}
                onChange={onChangeHandler}
                color='primary'
            />
        </>
    );
};

export default SuperCheckedBox;