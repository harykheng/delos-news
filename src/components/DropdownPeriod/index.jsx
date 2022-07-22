import React from "react";
import {Dropdown, DropdownButton} from 'react-bootstrap';

import period from '../../constant/period';

const DropdownPeriod = ({data, onChange}) => {

    const handleClickDropdown = (data) => {
        onChange({
            value: data.value,
            label: data.label
        })
    }

    return(
        <DropdownButton variant="primary" title="Select period days">
            {period.map((item, index) => {
                return(
                <Dropdown.Item 
                    key={index} 
                    onClick={() => { handleClickDropdown(item) }} 
                    active={data.value === item.value}
                >
                    {item.label}
                </Dropdown.Item>
                )
            })}
        </DropdownButton>
    )
}

export default DropdownPeriod;