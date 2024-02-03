import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import MaskedInput from "react-text-mask";

export default function Edit() {
    const [form, setForm] = useState({
        date: "",
        lastName: "",
        track: "",
        lapTimes: [""],
        condition: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    const updateForm = (value) => setForm((prev) => ({ ...prev, ...value }))

    const addLapTime = () => updateForm({ lapTimes: [...form.lapTimes, '']})
    const updateLapTime = (lapTime, index) => {
        const lapTimes = [...form.lapTimes]
        lapTimes[index] = lapTime
        updateForm({ lapTimes })
        
    }

    const removeLapTime = (index) => {
        const lapTimes = [...form.lapTimes]
        lapTimes.splice(index, 1) // splice(X, Y) removes Y entries from the array starting at X
        updateForm({ lapTimes })
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedRace = {
            date: form.date,
            lastName: form.lastName,
            track: form.track,
            lapTimes: form.lapTimes,
            notes: form.notes,
            condition: form.condition,
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedRace),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-wrapper">
                    <h3>New Race Entry</h3>
                    <div className="form-group">
                        <label htmlFor="date"><b>Date</b></label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            onChange={(e) => updateForm({ date: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName"><b>Last Name</b></label>
                        <input
                            type="text"
                            placeholder="Enter last name"
                            className="form-control"
                            id="lastName"
                            value={form.lastName}
                            onChange={(e) => updateForm({ lastName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="track"><b>Track Name</b></label>
                        <input
                            type="text"
                            placeholder="Enter track name"
                            className="form-control"
                            id="track"
                            value={form.track}
                            onChange={(e) => updateForm({ track: e.target.value })}
                        />
                    </div>
                    <label htmlFor="lapTimes"><b>Lap Time(s)</b></label><br></br>
                    {
                        form.lapTimes.map((lapTime, i) => {
                            return (
                                <div className="form-group" key={i} id = "lapGroup">
                                    <span id="lapID">{i+1}:</span>
                                    <MaskedInput
                                        mask={[/[0-9]/, ':', /[0-5]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/]}
                                        className="form-control"
                                        placeholder="_:__.___"
                                        guide={true}
                                        id="lapMask"
                                        value={lapTime}
                                        onChange={(e) => updateLapTime(e.target.value, i)}
                                        />
                                <button type="button" id="remButton" class="btn btn-secondary" onClick={() => removeLapTime(i)}>Remove</button>
                                </div>
                            )
                        })
                        
                    }
                        
                    <button type="button" class="btn btn-secondary" onClick={addLapTime}>Add lap time</button>

                    <div className="form-group">
                        <label htmlFor="laps"></label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes"><b>Notes</b></label>
                        <textarea
                            type="text"
                            placeholder="Optional"
                            className="form-control"
                            id="notes"
                            value={form.notes}
                            onChange={(e) => updateForm({ notes: e.target.value })}
                        />
                    </div>                
                    <div className="form-group" id="dry-wet-buttons">
                        <input id="DryBtn"
                            type="submit"
                            value="Dry"
                            className="btn btn-primary"
                            onClick={(e) => updateForm({ condition: "Dry" })}
                        
                        />
                        <input id="WetBtn"
                            type="submit"
                            value="Wet"
                            className="btn btn-primary"
                            onClick={(e) => updateForm({ condition: "Wet" })}
                        />
                    </div>
                    
                </div>
            </form>
        </div>
    );
}