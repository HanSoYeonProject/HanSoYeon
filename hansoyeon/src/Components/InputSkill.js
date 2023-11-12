import React, { useState, useRef } from 'react';

const InputSkill = () => {
    const [skills, setSkills] = useState(["React", "Node js"]);
    const inputRef = useRef(null);

    const removeSkill = i => {
        const newSkills = [...skills];
        newSkills.splice(i, 1);
        setSkills(newSkills);
    };

    const addSkill = e => {
        const value = e.target.value;
        if (e.key === "Enter" && value) {
            // Check for duplicate skill
            if (skills.find(skill => skill.toLowerCase() === value.toLowerCase())) {
                return alert("No duplicate value allowed");
            }
            setSkills([...skills, value]);
            inputRef.current.value = null;
        } else if (e.key === "Backspace" && !value) {
            removeSkill(skills.length - 1);
        }
    };

    return (
        <>
            <h1 style={{ color: 'brown' }}>테마별</h1>
            <h4> 한소연에서 열리는 새로운 프로그램과 알림 </h4>
            <div className="skill">
                <ul>
                    {skills.map((skill, i) => (
                        <li key={i}>
                            {skill}
                            <button onClick={() => removeSkill(i)}>+</button>
                        </li>
                    ))}
                    <li className="input-skill">
                        <input onKeyDown={addSkill} type="text" size="4" ref={inputRef} />
                    </li>
                </ul>
            </div>
        </>
    );
};

export default InputSkill;
