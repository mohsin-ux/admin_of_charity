import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  onSnapshot,
  orderBy,
  collection,
  where,
  getDocs,
  getDoc,
  snapshotEqual,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC54ZjiJ0O3lVVjBZt-Dlks50Uv9s-DWTs",
  authDomain: "charity-management-sys.firebaseapp.com",
  databaseURL: "https://charity-management-sys-default-rtdb.firebaseio.com",
  projectId: "charity-management-sys",
  storageBucket: "charity-management-sys.appspot.com",
  messagingSenderId: "427586135785",
  // collections_bookmark
  appId: "1:427586135785:web:59b83746a3abf6b97cf278",
  measurementId: "G-EMS1PCG6XC",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//------------ initialize services --------------
const db = getFirestore(app);

// -------------- initialize collection -------------
const donationColRef = collection(db, "add donations");
const volunteerColRef = collection(db, "volunteers");
const contactColRef = collection(db, "contacts");

let current = "";

// ---------------------- get collection data of donation form ---------------------
const displayDonations = async (searchValue) => {
  current = "donation";
  const donationData = document.querySelector(".donationData");
  const select = document.querySelector("#select");
  console.log(select.options);
  // for (let i = 0; i <= 11; i++) {
  //   select.option.addEventListener("onClick", () => displayDonations());
  // }
  // select.option.addEventListener("onClick", () => displayDonations());
  const table = document.createElement("table");
  const heading = document.createElement("h1");
  heading.innerText = "Donation Form Data";
  table.classList.add("table");

  let users = [];
  // const querySnapshot = await getDocs(donationColRef);
  try {
    users = [];
    onSnapshot(donationColRef, (snapshot) => {
      snapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc });
      });
      update(users);
    });
  } catch (err) {
    console.log(err.message);
  }

  // ----------- update function
  let arr = [];
  const update = (users) => {
    let value = true;
    console.log(users);

    if (value) {
      arr = [];
      donationData.innerHTML = "";
      arr.push(`
          <tr>
            <th>Fullname</th>
            <th>Email</th>
            <th>Causes</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>created At</th>
          </tr>
    
        `);
      value = false;
    }

    users.forEach((user) => {
      let data = user.createdAt * 1000;
      let day = new Date(data);
      // let date = day.getDate();
      let month = day.toLocaleDateString("default", { month: "long" });
      // let year = day.getFullYear();

      //       console.log('filter bhae jan')
      if (
        searchValue
          ? user.fullname
              .trim()
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          : true &&
            month.toLocaleLowerCase() === select.value.toLocaleLowerCase()
      ) {
        arr.push(`
            <tr>    
              <td>${user.fullname}</td>
              <td>${user.email}</td>
              <td>${user.option}</td>
              <td>${user.amount}</td>
              <td>${user.method}</td> 
              <td>${month}</td>
            </tr>
          `);
      }
    });

    table.innerHTML = arr.join("");
    donationData.append(heading);
    donationData.appendChild(table);
  };
};
window.displayDonations = displayDonations;

// -------------------- get collection data of volunteer form -------------------------

const displayVolunteer = async (searchValue) => {
  console.log(`volunteer ${searchValue}`);
  current = "volunteer";
  // e.preventDefault()
  const donationData = document.querySelector(".donationData");
  const select = document.querySelector("#select");
  const table = document.createElement("table");
  const heading = document.createElement("h1");
  heading.innerText = "Volunteer Form Data";
  table.classList.add("table");

  let users = [];
  // const querySnapshot = await getDocs(donationColRef);

  try {
    users = [];
    const unsubscribe = onSnapshot(volunteerColRef, (snapshot) => {
      snapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc });
      });
      update(users);
    });
  } catch (err) {
    console.log(err.message);
  }

  let arr = [];
  const update = (users) => {
    let value = true;
    console.log(users);

    // if(user){
    if (value) {
      arr = [];
      donationData.innerHTML = "";
      arr.push(`
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>District</th>
              <th>Date of Birth</th>
              <th>Area of interest</th>
              <th>Message</th>
              <th>Created At</th>
            </tr>
      
          `);
      value = false;
    }
    users.forEach((user) => {
      let data = user.createdAt * 1000;
      let day = new Date(data);
      // let date = day.getDate();
      let month = day.toLocaleDateString("default", { month: "long" });
      // let year = day.getFullYear();

      if (
        searchValue
          ? user.name
              .trim()
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase())
          : true
      ) {
        arr.push(`
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.mobile}</td>
              <td>${user.district}</td>
              <td>${user.dob}</td>
              <td>${user.area_of_interest}</td>
              <td>${user.message}</td>
              <td>${month}</td>
            </tr>
          `);
      }
    });

    table.innerHTML = arr.join("");
    donationData.appendChild(heading);

    donationData.appendChild(table);
  };
};

window.displayVolunteer = displayVolunteer;

// -------------------- get collection data of contact form -------------------------

const displayContacts = async (searchValue) => {
  console.log(`contact ${searchValue}`);
  current = "contact";
  // e.preventDefault()
  const donationData = document.querySelector(".donationData");
  const select = document.querySelector("#select");

  const table = document.createElement("table");
  const heading = document.createElement("h1");
  heading.innerText = "Contact Form Data";
  table.classList.add("table");

  let users = [];
  // const querySnapshot = await getDocs(donationColRef);

  try {
    users = [];
    const unsubscribe = onSnapshot(contactColRef, (snapshot) => {
      snapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc });
      });
      update(users);
    });
  } catch (err) {
    console.log(err.message);
  }

  let arr = [];
  const update = (users) => {
    let value = true;
    console.log(users);

    if (value) {
      arr = [];
      donationData.innerHTML = "";
      arr.push(`
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Subject</th>
            </tr>
      
          `);
      value = false;
    }
    users.forEach((user) => {
      if (
        searchValue
          ? user.name
              .trim()
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase())
          : true
      ) {
        arr.push(`
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.message}</td>
              <td>${user.subject}</td>
            </tr>
          `);
      }
    });

    // });

    table.innerHTML = arr.join("");
    donationData.appendChild(heading);

    donationData.appendChild(table);
  };
};

window.displayContacts = displayContacts;

const search = (value) => {
  console.log(value);
  if (current === "donation") {
    displayDonations(value);
  } else if (current === "volunteer") {
    displayVolunteer(value);
  } else {
    displayContacts(value);
  }
};

window.search = search;
