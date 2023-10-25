export function FormInput({ label, disabled, name, value, onchange }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        disabled={disabled}
        value={value}
        onChange={(e) => onchange(e.target.value)}
      />
    </>
  );
}
