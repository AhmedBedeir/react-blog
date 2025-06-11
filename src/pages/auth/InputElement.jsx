function InputElement({
  register,
  errors,
  dirtyFields,
  name,
  label,
  placeholder,
  icon,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}> {label} </label>
      <label
        className={`input w-full ${
          errors[name]?.message
            ? "input-error"
            : dirtyFields[name] && !errors[name]?.message
            ? "input-success"
            : "input-primary"
        }`}
      >
        {icon}
        <input
          type={type}
          id={`${name}`}
          {...register(name)}
          placeholder={placeholder}
        />
      </label>
      {errors[name]?.message && (
        <p className="text-error text-sm">{errors[name].message}</p>
      )}
    </div>
  );
}

export default InputElement;
