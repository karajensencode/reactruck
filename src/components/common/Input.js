const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-50";

const Input = ({ labelText, labelFor, type, id, placeholder, value, onChange }) => {
  return(
    <div className="mb-4">
      <label
        htmlFor={labelFor}
        className="block text-sm font-medium text-gray-700"
      >
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={fixedInputClass}
      />
    </div>
  )
}

export default Input;