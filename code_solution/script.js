const studentMarks = [
    { id: 1, name: "Janu", English: 50, Maths: 86, Science: 77, SocialScience: 88 },
    { id: 2, name: "Thanu", English: 75, Maths: 96, Science: 67, SocialScience: 91 },
    { id: 3, name: "Tara", English: 90, Maths: 35, Science: 86, SocialScience: 100 },
    { id: 4, name: "Glen", English: 79, Maths: 68, Science: 77, SocialScience: 78 },
    { id: 5, name: "Zara", English: 80, Maths: 85, Science: 96, SocialScience: 68 },
    { id: 6, name: "Arun", English: 70, Maths: 65, Science: 88, SocialScience: 85 },
    { id: 7, name: "Meena", English: 85, Maths: 78, Science: 92, SocialScience: 81 },
    { id: 8, name: "Kiran", English: 60, Maths: 70, Science: 80, SocialScience: 75 },
    { id: 9, name: "Ravi", English: 55, Maths: 60, Science: 70, SocialScience: 65 },
    { id: 10, name: "Anu", English: 95, Maths: 90, Science: 85, SocialScience: 90 },
];

const tableBody = document.querySelector("#studentTable tbody");
const subjectDropdown = document.getElementById("subject");
const filterButtons = document.getElementsByName("filter");
const filterValue1 = document.getElementById("filterValue1");
const filterValue2 = document.getElementById("filterValue2");
const filterButton = document.getElementById("filter");
const clearButton = document.getElementById("clear");
const tableHeaders = document.querySelectorAll("#studentTable th");
const rowsPerPage = 5; // Number of rows to display per page
let currentPage = 1; // Current page number
let currentSort = { column: null, direction: null };
let filteredData = [...studentMarks];
let highlightIds = [];

function renderTable(students) {
    tableBody.innerHTML = ""; // Clear the table body

    // Pagination logic: calculate start and end indices
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, students.length);

    const pageData = students.slice(startIndex, endIndex);

    pageData.forEach(student => {
        const row = document.createElement("tr");

        // Add the highlight class if the student's ID is in the highlightIds array
        if (highlightIds.includes(student.id)) {
            row.classList.add("highlight");
        }

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.English}</td>
            <td>${student.Maths}</td>
            <td>${student.Science}</td>
            <td>${student.SocialScience}</td>
        `;
        tableBody.appendChild(row);
    });
    

    renderPagination(students.length); // Update pagination controls
}

function renderPagination(totalRows) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // Clear pagination controls

    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Create Previous button
    const prevButton = document.createElement("button");
    prevButton.textContent = "<";
    prevButton.disabled = currentPage === 1; // Disable if on the first page
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(filteredData); // Refresh the table with the new page
        }
    });
    pagination.appendChild(prevButton);

    // Create page indicator (e.g., "1 of 2")
    const pageIndicator = document.createElement("span");
    pageIndicator.textContent = ` ${currentPage} of ${totalPages} `;
    pagination.appendChild(pageIndicator);

    // Create Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = ">";
    nextButton.disabled = currentPage === totalPages; // Disable if on the last page
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable(filteredData); // Refresh the table with the new page
        }
    });
    pagination.appendChild(nextButton);
}

renderTable(studentMarks);

function applyFilter() {
    const subject = subjectDropdown.value;
    const filterType = [...filterButtons].find(button => button.checked).value;
    const value1 = parseInt(filterValue1.value);
    filteredData = [...studentMarks]; 

    if (filterType === "Above") {
        highlightIds = studentMarks.filter(student => student[subject] > value1).map(student => student.id);
    } else if (filterType === "Below") {
        highlightIds = studentMarks.filter(student => student[subject] < value1).map(student => student.id);
    } else if (filterType === "Between") {
        let minValue = Math.min(parseInt(filterValue1.value), filterValue2.value); 
        let maxValue = Math.max(parseInt(filterValue1.value), filterValue2.value);
        highlightIds = studentMarks.filter(student => student[subject] >= minValue && student[subject] <= maxValue).map(student => student.id);
    }
    currentPage = 1; // Reset/go back to the first page
    renderTable(filteredData);
}

function sortTable(column) {
    const direction = currentSort.column === column && currentSort.direction === "asc" ? "desc" : "asc";
    currentSort = { column, direction }; // Update sort settings
    highlightIds = []; // Clear highlighted IDs
    
    // Sort filteredData based on the selected column
    const sortedData = [...filteredData].sort((a, b) => {
        if (typeof a[column] === "string") {
            // String comparison for names (case-insensitive)
            return direction === "asc" ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
        } else {
            // Numeric comparison for other columns
            return direction === "asc" ? a[column] - b[column] : b[column] - a[column];
        }
    });

    currentPage = 1; // Reset to the first page
    renderTable(sortedData); // Refresh table with sorted data
}

tableHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const column = header.dataset.column;
        if (column) {
            sortTable(column);
        }
    });
});

filterButton.addEventListener("click", applyFilter);

clearButton.addEventListener("click", () => {
    filteredData = [...studentMarks]; // Reset to original data
    highlightIds = []; // Clear highlighted IDs
    currentPage = 1; // Reset to the first page
    renderTable(studentMarks); // Render original table
    filterValue1.value = "";
    filterValue2.value = "";
});

filterButtons.forEach(button => {
    button.addEventListener("change", () => {
        filterValue2.style.display = button.value === "Between" ? "inline-block" : "none";
    });
});


