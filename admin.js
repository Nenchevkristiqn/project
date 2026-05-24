document.addEventListener('DOMContentLoaded', () => {
    const carForm = document.getElementById('add-car-form');
    const adminCarList = document.getElementById('admin-car-list');

    let cars = JSON.parse(localStorage.getItem('stored_cars')) || [];

    const renderAdminTable = () => {
        adminCarList.innerHTML = cars.map((car, index) => `
            <tr>
                <td>${car.displayMarque}</td>
                <td>${car.model}</td>
                <td>${car.year}</td>
                <td>${car.hp ?? 0}</td>
                <td>${car.zero60 ?? 'N/A'}</td>
                <td>${car.topSpeed ?? 0}</td>
                <td><button class="btn-delete" onclick="deleteCar(${index})">ИЗТРИЙ</button></td>
            </tr>
        `).join('');
    };

    carForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newCar = {
            marque: document.getElementById('car-marque').value.toLowerCase(),
            displayMarque: document.getElementById('car-marque').value,
            model: document.getElementById('car-model').value,
            year: parseInt(document.getElementById('car-year').value),
            category: document.getElementById('car-category').value,
            hp: parseInt(document.getElementById('car-hp').value) || 0,
            zero60: document.getElementById('car-zero60').value || 'N/A',
            topSpeed: parseInt(document.getElementById('car-topSpeed').value) || 0,
            image: document.getElementById('car-image').value
        };

        cars.push(newCar);
        localStorage.setItem('stored_cars', JSON.stringify(cars));
        renderAdminTable();
        carForm.reset();
    });

    window.deleteCar = (index) => {
        cars.splice(index, 1);
        localStorage.setItem('stored_cars', JSON.stringify(cars));
        renderAdminTable();
    };

    renderAdminTable();
});
