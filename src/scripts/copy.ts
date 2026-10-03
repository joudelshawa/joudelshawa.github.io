/** Copy buttons (her email): copy, then show "Copied" for two seconds. */
document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) => {
  const label = button.querySelector("span")
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? "")
      if (label) label.textContent = "Copied"
      window.setTimeout(() => label && (label.textContent = "Copy"), 2000)
    } catch {}
  })
})
