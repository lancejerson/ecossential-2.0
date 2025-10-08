document.addEventListener("DOMContentLoaded", () => {
    const deliveryButton = document.getElementById("delivery");
    const pickupButton = document.getElementById("pickup");
    const willDeliverCheckbox = document.getElementById('will-deliver');
    const willPickupCheckbox = document.getElementById('will-pickup');

    deliveryButton.addEventListener("click", (e) => {
        e.preventDefault();

        deliveryButton.classList.add('bg-violet-100', 'border-violet-400', 'text-violet-400', 'text-black');
        pickupButton.classList.remove('bg-violet-100', 'border-violet-400', 'text-violet-400', 'text-black');

        willDeliverCheckbox.checked = true;
        willPickupCheckbox.checked = false;
        willDeliverCheckbox.disabled = true;
        willPickupCheckbox.disabled = true;
        deliveryButton.disabled = true;
        pickupButton.disabled = false;
    });

    pickupButton.addEventListener("click", (e) => {
        e.preventDefault();

        pickupButton.classList.add('bg-violet-100', 'border-violet-400', 'text-violet-400', 'text-black');
        deliveryButton.classList.remove('bg-violet-100', 'border-violet-400', 'text-violet-400', 'text-black');

        willPickupCheckbox.checked = true;
        willDeliverCheckbox.checked = false;
        willPickupCheckbox.disabled = true;
        willDeliverCheckbox.disabled = true;
        pickupButton.disabled = true;
        deliveryButton.disabled = false;
    });
});
