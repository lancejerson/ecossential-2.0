document.addEventListener("DOMContentLoaded", () => {
    const deliveryButton = document.getElementById("delivery");
    const pickupButton = document.getElementById("pickup");
    const willDeliverCheckbox = document.getElementById('will-deliver');
    const willPickupCheckbox = document.getElementById('will-pickup');

    let isDelivery = true;

    deliveryButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (!isDelivery) {
            isDelivery = true;
            deliveryButton.classList.toggle('bg-violet-400');
            deliveryButton.classList.toggle('text-violet-400');
            deliveryButton.classList.toggle('text-black');
            deliveryButton.classList.toggle('bg-white');

            pickupButton.classList.remove('bg-violet-400', 'text-violet-400', 'text-black', 'bg-white');

            willDeliverCheckbox.checked = true;
            willPickupCheckbox.checked = false;

            deliveryButton.disabled = true;
            pickupButton.disabled = false;
        }
    });

    pickupButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (isDelivery) {
            isDelivery = false;
            pickupButton.classList.toggle('bg-violet-400');
            pickupButton.classList.toggle('text-violet-400');
            pickupButton.classList.toggle('text-black');
            pickupButton.classList.toggle('bg-white');

            deliveryButton.classList.remove('bg-violet-400', 'text-violet-400', 'text-black', 'bg-white');

            willPickupCheckbox.checked = true;
            willDeliverCheckbox.checked = false;

            pickupButton.disabled = true;
            deliveryButton.disabled = false;
        }
    });
});
