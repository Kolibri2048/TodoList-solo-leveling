import React from 'react';
import {isDisabled} from "@testing-library/user-event/utils/misc/isDisabled";

type ButtonProps = {
    title: string
    onClick?: () => void
    isDisable?: boolean
    classes?: string
}

const Button = ({title, onClick, isDisable, classes}: ButtonProps) => {
    return (
        <button className={classes}
                disabled={isDisable}
                onClick={onClick}
        >{title}
        </button>
    );
};

export default Button;