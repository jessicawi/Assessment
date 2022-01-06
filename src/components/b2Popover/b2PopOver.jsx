import React, { useState } from 'react';
import { Popover, UncontrolledPopover, PopoverHeader, PopoverBody, Collapse } from 'reactstrap';

const B2Popover = ({children, title, target, placement, popoverOpen, setPopoverOpen})=>{
    const toggle = () => setPopoverOpen(!popoverOpen);

    return(
        <UncontrolledPopover trigger="legacy" placement={placement} target={target}>
        {/*<Popover placement={placement} isOpen={popoverOpen} target={target} toggle={toggle}>*/}
            {title &&<PopoverHeader>{title}</PopoverHeader>}
            <PopoverBody>
                {children}
            </PopoverBody>
        </UncontrolledPopover>
    )
}

export default B2Popover