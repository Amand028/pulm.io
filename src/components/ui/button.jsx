export function Button({ className = "", ...props }) {
  return (
    <button
      className={
        "px-4 py-2 rounded-md font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition " +
        className
      }
      {...props}
    />
  );
}
