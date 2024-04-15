document.addEventListener('DOMContentLoaded', function () {
    const ageInput = document.getElementById('age');
    const incomeInput = document.getElementById('income');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');
    const ageErrorIcon = document.getElementById('ageErrorIcon');
    const incomeErrorIcon = document.getElementById('incomeErrorIcon');
    const extraIncomeErrorIcon = document.getElementById('extraIncomeErrorIcon');
    const deductionsErrorIcon = document.getElementById('deductionsErrorIcon');
    const calculateButton = document.getElementById('calculateButton');
    const resultModal = document.getElementById('resultModal');
    const resultContent = document.getElementById('result');
    const closeButton = document.getElementsByClassName('close')[0];

    calculateButton.addEventListener('click', function () {
        const age = ageInput.value;
        const income = parseFloat(incomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value);
        const deductions = parseFloat(deductionsInput.value);

        let error = false;

        if (!age) {
            showError(ageErrorIcon, "Age is required");
            error = true;
        } else {
            hideError(ageErrorIcon);
        }

        if (isNaN(income)) {
            showError(incomeErrorIcon, "Income must be a number");
            error = true;
        } else {
            hideError(incomeErrorIcon);
        }

        if (isNaN(extraIncome)) {
            showError(extraIncomeErrorIcon, "Extra income must be a number");
            error = true;
        } else {
            hideError(extraIncomeErrorIcon);
        }

        if (isNaN(deductions)) {
            showError(deductionsErrorIcon, "Deductions must be a number");
            error = true;
        } else {
            hideError(deductionsErrorIcon);
        }

        if (!error) {
            const tax = calculateTax(age, income, extraIncome, deductions);
            resultContent.innerHTML = `<p>Tax to be paid: ${tax} lakhs <br> <b>after the deductions</b> </p>`;
            resultModal.style.display = "block";
        }
    });

    closeButton.onclick = function () {
        resultModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target === resultModal) {
            resultModal.style.display = "none";
        }
    };

    function showError(icon, message) {
        icon.style.display = "inline-block";
        icon.title = message;
    }

    function hideError(icon) {
        icon.style.display = "none";
    }

    function calculateTax(age, income, extraIncome, deductions) {
        const taxableIncome = income + extraIncome - deductions;
        let tax = 0;

        if (taxableIncome > 800000) {
            switch (age) {
                case "<40":
                    tax = 0.3 * (taxableIncome - 800000);
                    break;
                case "≥40 &lt;60":
                    tax = 0.4 * (taxableIncome - 800000);
                    break;
                case "≥60":
                    tax = 0.1 * (taxableIncome - 800000);
                    break;
                default:
                    break;
            }
        }

        return tax;
    }
});
