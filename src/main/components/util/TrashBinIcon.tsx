import { SvgIcon } from '@mui/material';
import React from 'react';

const TrashBinIcon = props => {
    return (
        <SvgIcon color='primary' xmlns="http://www.w3.org/2000/svg" height={24} viewBox="0 96 960 960" width={24} {...props}>
            <path d="M256.478 950.131q-33.49 0-56.637-22.981-23.147-22.98-23.147-56.237V310.522h-50.609v-79.218h212.306v-40.175h282.653v40.175h212.871v79.218h-50.609v560.391q0 32.507-23.522 55.862-23.522 23.356-56.262 23.356H256.478Zm447.044-639.609H256.478v560.391h447.044V310.522Zm-343.87 478.913h69.609v-399h-69.609v399Zm171.087 0h70.174v-399h-70.174v399ZM256.478 310.522v560.391-560.391Z" />
        </SvgIcon>
    );
};

export default TrashBinIcon;