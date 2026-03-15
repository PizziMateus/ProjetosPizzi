// Light JS for filtering and sorting reports (front-end only)
(function () {
    'use strict';
    // utility: format number to BRL
    function toBRL(num) {
        return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    // table filter
    function initTableFilter(root) {
        const filterInput = root.querySelector('.js-filter-input');
        const table = root.querySelector('table');
        const tbody = table && table.tBodies[0];
        if (!filterInput || !tbody) return;
        filterInput.addEventListener('input', () => {
            const q = filterInput.value.trim().toLowerCase();
            Array.from(tbody.rows).forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(q) ? '' : 'none';
            });
        });
        // basic column sort
        Array.from(table.querySelectorAll('th.sortable')).forEach((th, index) => {
            th.style.cursor = 'pointer';
            th.addEventListener('click', () => {
                const dir = th.dataset.dir === 'asc' ? -1 : 1;
                th.dataset.dir = dir === 1 ? 'asc' : 'desc';
                const rows = Array.from(tbody.rows).sort((a, b) => {
                    const aText = a.cells[index].textContent.trim();
                    const bText = b.cells[index].textContent.trim();
                    // try numeric
                    const aNum = parseFloat(aText.replace(/[R$\.\s]/g, '').replace(',', '.'));
                    const bNum = parseFloat(bText.replace(/[R$\.\s]/g, '').replace(',', '.'));
                    if (!isNaN(aNum) && !isNaN(bNum)) return (aNum - bNum) * dir;
                    return aText.localeCompare(bText) * dir;
                });
                rows.forEach(r => tbody.appendChild(r));
            });
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.report-panel').forEach(initTableFilter);
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    const imgUrlInput = document.getElementById("produtoImgUrl");
    const previewImg = document.getElementById("produtoPreview");


    if (imgUrlInput) {
        imgUrlInput.addEventListener("input", () => {
            const url = imgUrlInput.value;
            if (url) {
                previewImg.src = url;
                previewImg.style.display = "block";
            } else {
                previewImg.style.display = "none";
            }
        });
    }
});