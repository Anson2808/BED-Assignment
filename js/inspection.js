// Inspections now come from the backend database (Inspection table)
var API_BASE = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', function () {

    let inspections = [];
    let index = 0;

    const stallName = document.getElementById('stallName');
    const hawkerCentre = document.getElementById('hawkerCentre');
    const operatorName = document.getElementById('operatorName');
    const detailsDiv = document.getElementById('inspectionDetails');
    const gradeOutput = document.getElementById('gradeOutput');

    // Fetch all inspection records from the backend
    fetch(API_BASE + '/inspections')
        .then(response => {
            if (!response.ok) {
                throw new Error('Server returned ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            inspections = data;

            if (inspections.length === 0) {
                stallName.textContent = 'No inspections recorded yet.';
                return;
            }

            renderInspection(index);
        })
        .catch(error => {
            console.error('Failed to load inspections:', error);
            stallName.textContent = 'Could not load inspections.';
            detailsDiv.innerHTML = '<p>Make sure the backend server is running (npm run dev in hawker-backend).</p>';
        });

    function renderInspection(i) {
        const inspection = inspections[i];

        stallName.textContent = inspection.StallName;
        hawkerCentre.textContent = inspection.HCName;
        operatorName.textContent = inspection.OperatorName;

        const inspectionDate = new Date(inspection.InspectionDate).toLocaleDateString();

        detailsDiv.innerHTML = `
            <p><strong>Inspection Date:</strong> ${inspectionDate}</p>
            <p><strong>NEA Officer:</strong> ${inspection.OfficerName}</p>
            <p><strong>Remarks:</strong> ${inspection.InspectionRemark || 'No remarks'}</p>
            <p><strong>Record:</strong> ${i + 1} of ${inspections.length}</p>
        `;

        const grade = inspection.HygieneGrade;

        gradeOutput.textContent = `Hygiene Grade: ${grade}`;
        gradeOutput.style.color =
            grade === 'A' ? 'green' :
            grade === 'B' ? 'orange' :
            grade === 'C' ? '#ff9800' :
            'red';
    }

    document.getElementById('nextStall').addEventListener('click', () => {
        if (inspections.length === 0) return;
        index = (index + 1) % inspections.length;
        renderInspection(index);
    });

    document.getElementById('prevStall').addEventListener('click', () => {
        if (inspections.length === 0) return;
        index = (index - 1 + inspections.length) % inspections.length;
        renderInspection(index);
    });
});
