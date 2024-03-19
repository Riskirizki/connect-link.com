// Deklarasi data kontak awal
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

// Fungsi untuk menampilkan daftar kontak
function displayContactsList(filteredContacts = contacts) {
  const contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";

  // Membuat elemen HTML untuk setiap kontak dan menambahkannya ke daftar kontak
  filteredContacts.forEach((contact) => {
    const contactItem = document.createElement("div");
    contactItem.innerHTML = `<p>${contact.name}</p>`;
    // Menambahkan event listener untuk menampilkan detail kontak saat diklik
    contactItem.addEventListener("click", () => showContactDetails(contact));
    contactList.appendChild(contactItem);
  });
}

// Fungsi untuk menampilkan detail kontak
function showContactDetails(contact) {
  const contactDetails = document.getElementById("contact-details");
  contactDetails.style.display = "block";
  // Menampilkan detail kontak beserta tombol Edit dan Delete
  contactDetails.innerHTML = `
    <p>Name: ${contact.name}</p>
    <p>Phone: ${contact.phone}</p>
    <p>Email: ${contact.email}</p>
    <p>Address: ${contact.address}</p>
    <button onclick="editContact(${contact.id})">Edit</button>
    <button onclick="deleteContact(${contact.id})">Delete</button>
`;
}

// Fungsi untuk menampilkan formulir tambah kontak
function showAddContactForm() {
  const addContactForm = document.getElementById("add-contact-form");
  addContactForm.style.display = "block";
  // Menampilkan formulir tambah kontak dengan input untuk setiap informasi kontak
  addContactForm.innerHTML = `
    <input type="text" id="name" placeholder="Name">
    <input type="tel" id="phone" placeholder="Phone">
    <input type="email" id="email" placeholder="Email">
    <input type="text" id="address" placeholder="Address">
    <button onclick="addContact()">Save</button>
`;
}

// Fungsi untuk menambahkan kontak baru
function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  // Membuat objek kontak baru dan menambahkannya ke daftar kontak
  const newContact = {
    id: contacts.length + 1,
    name,
    phone,
    email,
    address,
  };

  contacts.push(newContact);
  displayContactsList(); // Memperbarui daftar kontak dengan kontak baru yang ditambahkan
  hideAddContactForm(); // Menyembunyikan formulir tambah kontak setelah kontak baru disimpan
}

// Fungsi untuk menyembunyikan formulir tambah kontak
function hideAddContactForm() {
  const addContactForm = document.getElementById("add-contact-form");
  addContactForm.style.display = "none";
}

// Fungsi untuk mengedit kontak
function editContact(id) {
  const contact = contacts.find((contact) => contact.id === id);
  const editContactForm = document.createElement("div");
  // Menampilkan formulir edit kontak dengan nilai yang sudah ada
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

// Fungsi untuk menyimpan kontak yang sudah diedit
function saveEditedContact(id) {
  const name = document.getElementById("edit-name").value;
  const phone = document.getElementById("edit-phone").value;
  const email = document.getElementById("edit-email").value;
  const address = document.getElementById("edit-address").value;

  // Mencari indeks kontak yang akan diedit dan memperbarui informasinya
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts[index] = { id, name, phone, email, address };
    displayContactsList();
  }
}

// Fungsi untuk menghapus kontak
function deleteContact(id) {
  contacts = contacts.filter((contact) => contact.id !== id);
  displayContactsList();
}

// Event listener untuk fitur pencarian kontak
document.getElementById("search").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  // Melakukan filter pada daftar kontak berdasarkan kata kunci pencarian
  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm)
    );
  });
  displayContactsList(filteredContacts);
});

// Menampilkan daftar kontak pada awalnya
displayContactsList();
