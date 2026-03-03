function Backdrop({ open, onClick }) {
  return (
    <button
      type="button"
      aria-label="Close sidebar overlay"
      onClick={onClick}
      className={`fixed inset-0 z-30 bg-black/45 transition-opacity md:hidden ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    />
  )
}

export default Backdrop
