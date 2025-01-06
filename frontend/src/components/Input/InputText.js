import { useState, useEffect } from "react";

function InputText({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  readOnly = false,
  value, // Tambahkan properti untuk controlled component
  placeholder,
  updateFormValue,
  updateType,
  isDropdown = false, // Tambahkan properti untuk dropdown
  options = [], // Tambahkan properti untuk opsi dropdown
}) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  // Sinkronisasi dengan nilai default
  useEffect(() => {
    if (defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue]);

  // Sinkronisasi dengan controlled value
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleInputChange = (val) => {
    setInternalValue(val);
    if (updateFormValue) {
      updateFormValue({ updateType, value: val });
    }
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label font-bold">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      {isDropdown ? (
        <div className="relative">
          <select
            value={internalValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="input input-bordered w-full appearance-none pr-10"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Tambahkan ikon dropdown */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      ) : (
        <input
          type={type || "text"}
          value={internalValue}
          placeholder={placeholder || ""}
          onChange={(e) => {
            if (!readOnly) {
                updateFormValue({ value: e.target.value });
            }
          }}
          readOnly={readOnly}
          className="input input-bordered w-full"
        />
      )}
    </div>
  );
}

export default InputText;
