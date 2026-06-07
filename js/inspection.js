document.addEventListener('DOMContentLoaded', function () {

    const stalls = [
        {
            name: 'Kofu',
            owner: 'Gao Jia Rong',
            cuisine: 'Chinese',
            checklist: {
                Cleanliness: true,
                'Food Handling': true,
                'Food Storage': false,
                'Hygiene Practices': true
            }
        },
        {
            name: 'Spice Route',
            owner: 'Ravi Kumar',
            cuisine: 'Indian',
            checklist: {
                Cleanliness: true,
                'Food Handling': true,
                'Food Storage': true,
                'Hygiene Practices': true
            }
        },
        {
            name: 'Nasi Power',
            owner: 'Siti Aminah',
            cuisine: 'Malay',
            checklist: {
                Cleanliness: true,
                'Food Handling': false,
                'Food Storage': false,
                'Hygiene Practices': true
            }
        }
    ];

    let index = 0;

    const stallName = document.getElementById('stallName');
    const ownerName = document.getElementById('ownerName');
    const cuisine = document.getElementById('cuisine');
    const checklistDiv = document.getElementById('checklist');
    const gradeOutput = document.getElementById('gradeOutput');

    function renderStall(i) {
        const stall = stalls[i];

        stallName.textContent = stall.name;
        ownerName.textContent = stall.owner;
        cuisine.textContent = stall.cuisine;

        checklistDiv.innerHTML = '';

        let passed = 0;
        const total = Object.keys(stall.checklist).length;

        for (let item in stall.checklist) {
            const checked = stall.checklist[item];
            if (checked) passed++;

            checklistDiv.innerHTML += `
                <div class="check-item">
                    <input type="checkbox" ${checked ? 'checked' : ''} disabled>
                    <label>${item}</label>
                </div>
            `;
        }

        let grade = 'D';
        if (passed === total) grade = 'A';
        else if (passed === total - 1) grade = 'B';
        else if (passed >= 2) grade = 'C';

        gradeOutput.textContent = `Hygiene Grade: ${grade}`;
        gradeOutput.style.color =
            grade === 'A' ? 'green' :
            grade === 'B' ? 'orange' :
            grade === 'C' ? '#ff9800' :
            'red';
    }

    document.getElementById('nextStall').addEventListener('click', () => {
        index = (index + 1) % stalls.length;
        renderStall(index);
    });

    document.getElementById('prevStall').addEventListener('click', () => {
        index = (index - 1 + stalls.length) % stalls.length;
        renderStall(index);
    });

    renderStall(index);
});