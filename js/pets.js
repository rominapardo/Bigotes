// pets.js

document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display the list of pets
    console.log("DOMContentLoaded event fired");
    fetchPets();

    // Add event listener for the petForm submission
    document.getElementById("petForm").addEventListener("submit", function (event) {
        event.preventDefault();
        addPet();
    });

    // Add event listener for the fetchPetsButton click
    document.getElementById("fetchPetsButton").addEventListener("click", function () {
        fetchPets();
    });
});



// desplego lista de pets desde la base
function fetchPets() {
    const timestamp = new Date().getTime();
    fetch(`https://rfpardo.pythonanywhere.com/pets?timestamp=${timestamp}`)
        .then(response => response.json())
        .then(pets => {
            const petsTable = document.getElementById("petsTable");
            petsTable.innerHTML = "";

            const headerRow = document.createElement("tr");
            headerRow.innerHTML = "<th>Nombre</th><th>Especie</th><th>Sexo</th><th>Perfil</th><th>Foto</th><th>Acciones</th>";
            petsTable.appendChild(headerRow);

            pets.forEach(pet => {
                const row = document.createElement("tr");

                // Cells for Name, Species, Sex, and Perfil
                const nameCell = document.createElement("td");
                nameCell.textContent = pet.nombre;
                row.appendChild(nameCell);

                const speciesCell = document.createElement("td");
                speciesCell.textContent = pet.especie;
                row.appendChild(speciesCell);

                const sexCell = document.createElement("td");
                sexCell.textContent = pet.sexo;
                row.appendChild(sexCell);

                const perfilCell = document.createElement("td");
                perfilCell.textContent = pet.perfil;
                row.appendChild(perfilCell);

                //celda imagen
                const imgCell = document.createElement("td");
                const img = document.createElement("img");
                img.src = pet.foto;
                img.alt = "Pet Photo";
                img.style.maxWidth = "100%"; // Adjust as needed
                imgCell.appendChild(img);
                row.appendChild(imgCell);

                //boton eliminar
                const deleteCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("deleteButton");
                deleteButton.setAttribute("data-pet-id", pet.id);
                deleteButton.textContent = "Eliminar";
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);

                petsTable.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching pets:", error));
}





// Funcion para agregar una mascota nueva
function addPet() {
    const formData = new FormData(document.getElementById("petForm"));
    const petData = {};
    formData.forEach((value, key) => {
        petData[key] = value;
    });

console.log("petData:", petData);
    fetch("https://rfpardo.pythonanywhere.com/pets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(petData)
    })
        .then(response => response.json())
        .then(newPet => {
            console.log("New pet added:", newPet);
            // Updateo la lista de mascotas
            fetchPets();
        })
        .catch(error => console.error("Error adding pet:", error));
}

// Formato fecha en formulario igual a base
document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#nacimiento, #ingreso", {
        dateFormat: "Y-m-d",
        allowInput: true,
    });

    // Other code...
});

//Funcion para borrar la mascota (por id))
function deletePet(id) {
    fetch(`https://rfpardo.pythonanywhere.com/pets/${id}`, {
        method: "DELETE",
    })
        .then(response => {
            if (response.ok) {
                console.log(`Pet with ID ${id} deleted successfully.`);
                fetchPets(); // Update the pet list after deletion
            } else {
                console.error(`Error deleting pet with ID ${id}.`);
            }
        })
        .catch(error => console.error("Error deleting pet:", error));
}


petsTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteButton")) {
        const id = event.target.getAttribute("data-pet-id");
        deletePet(id);
    }
});