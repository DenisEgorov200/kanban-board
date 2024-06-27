export const CheckMark = () => {
  return (
    <div className="group h-5 w-5 cursor-pointer rounded-full border border-blue-600 p-0.5 transition-opacity">
      <img
        src="/icons/check.svg"
        alt="check"
        className="opacity-0 group-hover:opacity-100"
      />
    </div>
  )
}
