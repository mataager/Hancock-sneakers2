function disableInteractions(event) {
  if (event) event.preventDefault();
  document.body.style.pointerEvents = "none";
}

function enableInteractions() {
  document.body.style.pointerEvents = "auto";
}
