export default function DarkModeSwitch() {
  return (
    <button
      type="button"
      role="switch"
      aria-checked="false"
      aria-label="Dark Mode Switch"
      id="dark-mode-switch"
      className="dark-mode-switch"
    >
      <img
        src="../icons/moon-icon.png"
        alt="Dark Mode Theme Icon"
        className="dark-mode-switch__icon"
      />
      <label
        htmlFor="dark-mode-switch"
        className="dark-mode-switch__text"
      >
        Dark Mode
      </label>
    </button>
  );
}
