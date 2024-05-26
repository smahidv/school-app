import Select from "react-select";
import axiosClient from "../../src/axios";
import { useState, useEffect } from "react";

export default function ReactSelect({ isMulti, endpoint, onChange ,value}) {
    const [options, setOptions] = useState([]);

  
    useEffect(() => {
        axiosClient.get(endpoint).then(({ data }) => {
            setOptions(data.map(item => ({ value: item.name, label: item.name,id:item.id })));
        });
    }, [endpoint]);

   

    return (
        <Select
            onChange={onChange}// the selected option(s) as its argument(s)
            menuPlacement="auto"
            options={options} //the entire list of options
            isMulti={isMulti}
            value={value}
        />
    );
}
