import {Modal, ModalBody, ModalHeader} from "reactstrap";
import React from "react";
import {B2Button} from "../index";
import i18n from "../../translations/i18n";
import uiVariables from "../../config/uiVariables";
import K2Button from "../k2Button/k2Button";

const B2Modal = ({isOpen, className, children, setModal, modal, title, withoutBG, width="100%", onConfirm}) => {
    const toggle = () => setModal(!modal);

    let node;
    if (withoutBG) {
        node = (
            <>
                {children}
                <K2Button size={"lg"} onClick={onConfirm}>{i18n.t("common.claim")}</K2Button>
            </>
        )
    } else {
        node = (
            <>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </>
        )
    }
    return (
        <Modal title={title} isOpen={isOpen} className={className} toggle={toggle} style={{width:width}}>
            {node}
        </Modal>
    )
}

export default B2Modal