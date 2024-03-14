let contacts = [
  {
    id: 1,
    name: "John Doe",
    phone: "123-456-7890",
    email: "john@example.com",
    address: "123 Main St",
    notes: "Friend",
    category: "Friends",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "987-654-3210",
    email: "jane@example.com",
    address: "456 Elm St",
    notes: "Colleague",
    category: "Work",
  },
];

function displayContactsList(filteredContacts = contacts) {
  const contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";

  filteredContacts.forEach((contact) => {
    const contactItem = document.createElement("div");
    contactItem.innerHTML = `<p>${contact.name}</p>`;
    contactItem.addEventListener("click", () => showContactDetails(contact));
    contactList.appendChild(contactItem);
  });
}

function showContactDetails(contact) {
  const contactDetails = document.getElementById("contact-details");
  contactDetails.style.display = "block";
  contactDetails.innerHTML = `
          <p>Name: ${contact.name}</p>
          <p>Phone: ${contact.phone}</p>
          <p>Email: ${contact.email}</p>
          <p>Address: ${contact.address}</p>
          <p>Notes: ${contact.notes}</p>
          <button onclick="editContact(${contact.id})">Edit</button>
          <button onclick="deleteContact(${contact.id})">Delete</button>
        `;
}

function showAddContactForm() {
  const addContactForm = document.getElementById("add-contact-form");
  addContactForm.style.display = "block";
  addContactForm.innerHTML = `
          <input type="text" id="name" placeholder="Name">
          <input type="tel" id="phone" placeholder="Phone">
          <input type="email" id="email" placeholder="Email">
          <input type="text" id="address" placeholder="Address">
          <input type="text" id="notes" placeholder="Notes">
          <select id="category">
            <option value="Friends">Friends</option>
            <option value="Family">Family</option>
            <option value="Work">Work</option>
          </select>
          <button onclick="addContact()">Save</button>
        `;
}

function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const notes = document.getElementById("notes").value;
  const category = document.getElementById("category").value;

  const newContact = {
    id: contacts.length + 1,
    name,
    phone,
    email,
    address,
    notes,
    category,
  };

  contacts.push(newContact);
  displayContactsList(); // Update contact list with the new contact added
  hideAddContactForm(); // Hide add contact form after saving
}

function hideAddContactForm() {
  const addContactForm = document.getElementById("add-contact-form");
  addContactForm.style.display = "none";
}

function editContact(id) {
  const contact = contacts.find((contact) => contact.id === id);
  const editContactForm = document.createElement("div");
  editContactForm.innerHTML = `
          <input type="text" id="edit-name" value="${contact.name}">
          <input type="tel" id="edit-phone" value="${contact.phone}">
          <input type="email" id="edit-email" value="${contact.email}">
          <input type="text" id="edit-address" value="${contact.address}">
          <input type="text" id="edit-notes" value="${contact.notes}">
          <button onclick="saveEditedContact(${contact.id})">Save</button>
        `;
  const contactDetails = document.getElementById("contact-details");
  contactDetails.innerHTML = "";
  contactDetails.appendChild(editContactForm);
}

function saveEditedContact(id) {
  const name = document.getElementById("edit-name").value;
  const phone = document.getElementById("edit-phone").value;
  const email = document.getElementById("edit-email").value;
  const address = document.getElementById("edit-address").value;
  const notes = document.getElementById("edit-notes").value;

  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts[index] = { id, name, phone, email, address, notes };
    displayContactsList();
  }
}

function deleteContact(id) {
  contacts = contacts.filter((contact) => contact.id !== id);
  displayContactsList();
}

document.getElementById("search").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm)
    );
  });
  displayContactsList(filteredContacts);
});

displayContactsList(); // Initial display of contacts
