// Initial contacts data
let contacts = [
  {
    id: 1,
    name: "Michel",
    phone: "+62 812-3456-7890",
    email: "mic@gmail.com",
    address: "Kota Bandung",
  },
  {
    id: 2,
    name: "Risky",
    phone: "+62 821-2345-6789",
    email: "riskyz@gmail.com",
    address: "Kecamatan Bandung Wetan",
  },
];

// Function to display contact list
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

// Function to display contact details
function showContactDetails(contact) {
  const contactDetails = document.getElementById("contact-details");
  contactDetails.style.display = "block";

  contactDetails.innerHTML = `
    <p>Name: ${contact.name}</p>
    <p>Phone: ${contact.phone}</p>
    <p>Email: ${contact.email}</p>
    <p>Address: ${contact.address}</p>
    <button onclick="editContact(${contact.id})">Edit</button>
    <button onclick="deleteContact(${contact.id})">Delete</button>
  `;
}

// Function to display add contact form
function showAddContactForm() {
  const addContactForm = document.getElementById("add-contact-form");
  addContactForm.style.display = "block";

  addContactForm.innerHTML = `
    <input type="text" id="name" placeholder="Name">
    <input type="tel" id="phone" placeholder="Phone">
    <input type="email" id="email" placeholder="Email">
    <input type="text" id="address" placeholder="Address">
    <button onclick="addContact()">Save</button>
  `;
}

// Function to add a new contact
function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  const newContact = {
    id: contacts.length + 1,
    name,
    phone,
    email,
    address,
  };

  contacts.push(newContact);
  displayContactsList();
  hideAddContactForm();
}

// Function to hide add contact form
function hideAddContactForm() {
  const addContactForm = document.getElementById("add-contact-form");
  addContactForm.style.display = "none";
}

// Function to edit a contact
function editContact(id) {
  const contact = contacts.find((contact) => contact.id === id);
  const editContactForm = document.createElement("div");

  editContactForm.innerHTML = `
    <input type="text" id="edit-name" value="${contact.name}">
    <input type="tel" id="edit-phone" value="${contact.phone}">
    <input type="email" id="edit-email" value="${contact.email}">
    <input type="text" id="edit-address" value="${contact.address}">
    <button onclick="saveEditedContact(${contact.id})">Save</button>
  `;

  const contactDetails = document.getElementById("contact-details");
  contactDetails.innerHTML = "";
  contactDetails.appendChild(editContactForm);
}

// Function to save edited contact
function saveEditedContact(id) {
  const name = document.getElementById("edit-name").value;
  const phone = document.getElementById("edit-phone").value;
  const email = document.getElementById("edit-email").value;
  const address = document.getElementById("edit-address").value;

  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts[index] = { id, name, phone, email, address };
    displayContactsList();
  }
}

// Function to delete a contact
function deleteContact(id) {
  contacts = contacts.filter((contact) => contact.id !== id);
  displayContactsList();
}

// Event listener for contact search feature
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

// Display contact list initially
displayContactsList();
