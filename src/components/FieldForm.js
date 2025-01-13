import React from "react";
import OptionsManager from "./OptionsManager";

const FieldForm = ({
  newField,
  setNewField,
  radioOptions,
  setRadioOptions,
  checkboxOptions,
  setCheckboxOptions,
  handleNewFieldChange,
  handleAddField,
}) => {
  const handleOptionChange = (type, index, value) => {
    if (type === "radio") {
      const updatedOptions = [...radioOptions];
      updatedOptions[index] = value;
      setRadioOptions(updatedOptions);
      setNewField((prev) => ({
        ...prev,
        options: updatedOptions.map((option) => ({
          label: option,
          value: option,
        })),
      }));
    } else if (type === "checkbox") {
      const updatedOptions = [...checkboxOptions];
      updatedOptions[index] = value;
      setCheckboxOptions(updatedOptions);
      setNewField((prev) => ({
        ...prev,
        options: updatedOptions.map((option) => ({
          label: option,
          value: option,
        })),
      }));
    }
  };

  const handleRemoveOption = (type, index) => {
    if (type === "radio") {
      const updatedOptions = radioOptions.filter((_, i) => i !== index);
      setRadioOptions(updatedOptions);
      setNewField((prev) => ({
        ...prev,
        options: updatedOptions.map((option) => ({
          label: option,
          value: option,
        })),
      }));
    } else if (type === "checkbox") {
      const updatedOptions = checkboxOptions.filter((_, i) => i !== index);
      setCheckboxOptions(updatedOptions);
      setNewField((prev) => ({
        ...prev,
        options: updatedOptions.map((option) => ({
          label: option,
          value: option,
        })),
      }));
    }
  };

  const handleAddOption = (type) => {
    if (type === "radio") {
      setRadioOptions((prevOptions) => [...prevOptions, ""]);
    } else if (type === "checkbox") {
      setCheckboxOptions((prevOptions) => [...prevOptions, ""]);
    }
  };

  // Capitalize the first letter of the Field Label
  // const capitalizeFirstLetter = (string) => {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // };
  const capitalizeFirstLetter = (string) => {
    return string.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };


  const handleFieldChangeWithCapitalization = (e) => {
    const { name, value } = e.target;

    if (name === "label") {
      setNewField((prev) => ({
        ...prev,
        [name]: capitalizeFirstLetter(value),
      }));
    } else {
      handleNewFieldChange(e);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-[5cqw] md:gap-[1.2cqw]">
        <div>
          <label className="label-text">Field Label:</label>
          <input
            type="text"
            name="label"
            value={newField.label}
            onChange={handleFieldChangeWithCapitalization}
            className="input-field"
          />
        </div>

        <div>
          <label className="label-text">Field Name:</label>
          <input
            type="text"
            name="name"
            value={newField.name}
            onChange={handleNewFieldChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="label-text">Field Type:</label>
          <select
            name="type"
            value={newField.type}
            onChange={(e) => {
              handleNewFieldChange(e);
              if (e.target.value !== "radio" && e.target.value !== "checkbox") {
                setRadioOptions([]);
                setCheckboxOptions([]);
                setNewField((prev) => ({ ...prev, options: [] }));
              }
            }}
            className="input-field"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="number">Number</option>
          </select>
        </div>

        {newField.type === "number" && (
          <div>
            <label className="label-text">Number Type:</label>
            <select
              name="subtype"
              value={newField.subtype}
              onChange={handleNewFieldChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="general">General Number</option>
              <option value="phone">Phone Number (+91)</option>
            </select>
          </div>
        )}

        {(newField.type === "radio" || newField.type === "checkbox") && (
          <OptionsManager
            type={newField.type}
            options={newField.type === "radio" ? radioOptions : checkboxOptions}
            handleOptionChange={handleOptionChange}
            handleRemoveOption={handleRemoveOption}
            handleAddOption={() => handleAddOption(newField.type)}
          />
        )}

        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="required"
              checked={newField.required}
              onChange={(e) =>
                setNewField({ ...newField, required: e.target.checked })
              }
              className="form-checkbox md:h-4 aspect-square"
            />
            <span className="md: ml-[0.8cqw] label-text capitalize">Required</span>
          </label>
        </div>
      </div>
      <button onClick={(e) => { e.preventDefault(); handleAddField(); }} className="btn-small mt-[3cqw] md:mt-[1.2cqw] w-auto">
        Add Field
      </button>

    </div>
  );
};

export default FieldForm;
