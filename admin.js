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
            hp: 0, zero60: 'N/A', topSpeed: 0, // Примерен пълнеж
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