import {Table} from "reactstrap";
import React from "react";
import "./b2Table.scss"
const B2Table = ({headingList, children, headerColor, headerBg}) => {
    return (
        <Table borderless hover responsive striped>
            <thead style={{backgroundColor:headerBg}} className={"b2Table"}>
            <tr>
                {headingList?.map(d => {
                    return (
                        <th key={d} style={{color:headerColor}}>{d}</th>
                    )
                })}
            </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
        </Table>
    )
}

export default B2Table