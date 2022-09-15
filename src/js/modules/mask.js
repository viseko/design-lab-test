export default function addMask(inputElem, mask) {
  function eventHandler(event) {
    const type = event.type;
    const input = event.target;
    const value = input.value;

    const maskDigits = mask.replace(/\D/g, "");
    const valueDigits = value.replace(/\D/g, "");

    // Focus
    if (type === "focus" && value === "") {
      const sliceIndex = mask.indexOf("_");
      input.value = mask.slice(0, sliceIndex);
      return;
    }

    // Blur
    if (type === "blur" && maskDigits === valueDigits) {
      input.value = "";
      return;
    }

    // Input
    if (type === "input") {
      const enteredDigits = valueDigits.slice(maskDigits.length);

      if (enteredDigits.length === 0) {
        const sliceIndex = mask.indexOf("_");
        input.value = mask.slice(0, sliceIndex);
      } else {
        let newValue = mask;
        let i = 0;

        while (/_/.test(newValue) && i < enteredDigits.length) {
          newValue = newValue.replace(/_/, enteredDigits[i++]);
        }

        const slicePos = newValue.search(/\d(?=\D*$)/);
        input.value = newValue.slice(0, slicePos + 1);
      }
    }
  }

  // Hang the handler for all necessary events
  ["focus", "blur", "input"].forEach((ev) => {
    inputElem.addEventListener(ev, eventHandler);
  });
}
