import {EntryOptions} from "../../../enums/EntryOptions";
import React from "react";


const Entry = ({entry}) => {
    const option = EntryOptions[entry.type];
    return <li
        key={entry.id}
        className={`list-group-item d-flex justify-content-between ${option.color} text-white`}>
        <span>{`Entry from ${entry.start} to ${entry.end}`}</span>
        <span>{`${option.name} ${option.paid ? "is" : "is not"} paid`}</span>
    </li>;
}

export default Entry;