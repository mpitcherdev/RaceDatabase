import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
        <td>{props.record.date}</td>
        <td>{props.record.lastName}</td>    
        <td>{props.record.track}</td>
        <td>
            <ol>
                {props.record.lapTimes.map((lap) => <li>{lap}</li>)}
            </ol>
        </td>
        <td>
            <p className="notes-box">{props.record.notes}</p>
        </td>
        <td>{props.record.condition}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link>
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}>Delete
            </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div className="table-wrapper">
            <h3>My Data</h3><br></br>
            <table className="table table-striped">
                <thead>
                    <tr style={{ textAlign: "center"}}>
                        <th>Date</th>
                        <th>Last<br></br>Name</th>
                        <th>Track</th>
                        <th>Lap<br></br>Times</th>
                        <th>Notes</th>
                        <th>Track<br></br>Conditions</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center"}}>{recordList()}</tbody>
            </table>
        </div> 
    );
}