let cars = [
    { make: "Aston Martin", price: 50000, year: 2012 },
    { make: "BMW", price: 30000, year: 2014 },
    { make: "Chevrolet", price: 20000, year: 2013 },
    { make: "Datsun", price: 2000, year: 2001 },
  ];
  
  // Display all cars and update stats
  function displayCars() {
    const list = document.getElementById("carList");
    list.innerHTML = "";
  
    cars.forEach((car, index) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${car.make}</td>
        <td>£${car.price.toLocaleString()}</td>
        <td>${car.year}</td>
        <td><button onclick="showDetails(${index})">View</button></td>
      `;
      list.appendChild(row);
    });
  
    // Update stats
    document.getElementById("avgPrice").textContent = `Average Price: £${averagePrice().toLocaleString()}`;
    document.getElementById("oldestCar").textContent = `Oldest Car: ${oldestCar().make} (${oldestCar().year})`;
    document.getElementById("mostExpensiveCar").textContent = `Most Expensive Car: ${mostExpensiveCar().make} (£${mostExpensiveCar().price.toLocaleString()})`;
  }
  
  // Calculate average price
  function averagePrice() {
    const total = cars.reduce((sum, car) => sum + car.price, 0);
    return Math.round(total / cars.length);
  }
  
  // Find oldest car
  function oldestCar() {
    return cars.reduce((oldest, car) => (car.year < oldest.year ? car : oldest));
  }
  
  // Find most expensive car
  function mostExpensiveCar() {
    return cars.reduce((expensive, car) => (car.price > expensive.price ? car : expensive));
  }
  
  // Show single car detail page
  function showDetails(index) {
    document.getElementById("page1").classList.add("hidden");
    document.getElementById("page2").classList.remove("hidden");
  
    const car = cars[index];
    document.getElementById("carDetails").innerHTML = `
      <p><strong>Make:</strong> ${car.make}</p>
      <p><strong>Price:</strong> £${car.price.toLocaleString()}</p>
      <p><strong>Year:</strong> ${car.year}</p>
    `;
  }
  
  // Go back to main page
  function goBack() {
    document.getElementById("page2").classList.add("hidden");
    document.getElementById("page1").classList.remove("hidden");
  }
  
  // Validate and add new car
  document.getElementById("carForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const makeInput = document.getElementById("make").value.trim();
    const priceInput = document.getElementById("price").value.trim();
    const yearInput = document.getElementById("year").value.trim();
  
    // RegEx validation
    const makeRegex = /^[a-zA-Z\s\-']+$/;         // only letters, spaces, dashes, apostrophes
    const priceRegex = /^[1-9]\d{2,6}$/;           // 3 to 7 digits, cannot start with 0
    const yearRegex = /^(19|20)\d{2}$/;            // Year between 1900 and 2099
  
    if (!makeRegex.test(makeInput)) {
      alert("Invalid make. Use letters and spaces only.");
      return;
    }
  
    if (!priceRegex.test(priceInput)) {
      alert("Invalid price. Enter a number between 100 and 9999999.");
      return;
    }
  
    if (!yearRegex.test(yearInput)) {
      alert("Invalid year. Use a valid year from 1900 onward.");
      return;
    }
  
    cars.push({
      make: makeInput,
      price: parseInt(priceInput),
      year: parseInt(yearInput),
    });
  
    this.reset(); // Clear the form
    displayCars();
  });
  
  window.onload = displayCars;
  