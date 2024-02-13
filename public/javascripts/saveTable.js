document.addEventListener('DOMContentLoaded', function () {
    const pdfButton = document.getElementById('toPDF_history');
    
    pdfButton.addEventListener('click', function () {
        const table = document.querySelector('table');
        const tableData = [];
        const rows = table.querySelectorAll('tr');

        rows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll('td');

            cells.forEach(cell => {
                rowData.push(cell.innerText);
            });

            tableData.push(rowData);
        });


        const doc = new jsPDF('p', 'pt', 'a4');
        doc.setFont('times');
        doc.autoTable({
            head: [['Time', 'City Name', 'Humidity', 'Wind Speed', 'Description', 'Pressure']],
            body: tableData
        });
        doc.save('weather_history.pdf');
    });
});

