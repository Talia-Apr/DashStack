import React from "react";

function InputFilterText({ type, value, onChange, containerStyle, labelTitle, placeholder }) {
    const updateInputValue = (val) => {
        onChange(val); // Memanggil onChange yang diteruskan dari komponen induk
    };

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label font-bold">
                <span className="label-text">{labelTitle}</span>
            </label>
            <input
                type={type || "text"}
                value={value}
                placeholder={placeholder || ""}
                onChange={(e) => updateInputValue(e.target.value)} 
                className="input input-bordered w-full"
            />
        </div>
    );
}

export default InputFilterText;
