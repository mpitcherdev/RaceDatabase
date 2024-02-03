import React, { useState } from "react";
import { useNavigate } from "react-router";
import MaskedInput from "react-text-mask";




export default function Create() {

    const [form, setForm] = useState({
        date: "",
        lastName: "",
        track: "",
        lapTimes: [""],
        notes: "",       
        condition: "",
    });
    const navigate = useNavigate();
    
    const updateForm = (value   ) => setForm((prev) => ({ ...prev, ...value }))

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

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newRecord = { ...form };

        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecord),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ date: "", lastName: "", track: "", lapTimes: [""], notes:"", condition: "",});
        navigate("/");
    }
    // This following section will display the form that takes the input from the user.
    return (
        
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-wrapper">
                    <h3>New Race</h3>
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
                        
                    <button type="button" class="btn btn-secondary" id="addButton" onClick={addLapTime}>Add lap time</button>
                    
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
                    <h4>Track Conditions</h4>              
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
