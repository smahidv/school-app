import Select from "react-select";
import axiosClient from "../../src/axios";
import { useState, useEffect } from "react";

export default function ReactSelect({ name, onChange, value }) {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axiosClient.get(`/classes`).then(({ data }) => {
            setClasses(data);
        });
    }, []);

    let options = classes.map((classItem) => ({
        value: classItem.name,
        label: classItem.name
    }));

    return (
        <Select
            name={name}
            onChange={onChange}  
            value={options.find(option => option.value === value)}
            menuPlacement="top"
            options={options}
        />
    );
}
