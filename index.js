const makanan = [
    {
        nama: "SOTO AYAM",
        harga: 10000,
        gambar: "soto.webp",
        deskripsi:
            "Soto adalah makanan khas Indonesia seperti sop yang terbuat dari kaldu daging dan sayuran. Daging yang paling sering digunakan adalah daging sapi dan daging ayam.",
        jumlahBeli: 0,
    },
    {
        nama: "SATE AYAM",
        harga: 20000,
        gambar: "sate.jpg",
        deskripsi:
            "Sate adalah makanan yang terbuat dari daging yang dipotong kecil-kecil dan ditusuk sedemikian rupa dengan tusukan kemudian dipanggang menggunakan bara arang kayu.",
        jumlahBeli: 0,
    },
    {
        nama: "AYAM GEPREK",
        harga: 15000,
        gambar: "Ayam_geprek.png",
        deskripsi:
            "Ayam geprek adalah makanan ayam goreng tepung khas Indonesia yang diulek atau dilumatkan bersama sambal bajak.",
        jumlahBeli: 0,
    },
    {
        nama: "NASI GORENG",
        harga: 15000,
        gambar: "nasgor.webp",
        deskripsi:
            "Nasi goreng adalah makanan berupa nasi yang digoreng dan dicampur dalam minyak goreng, margarin, atau mentega.",
        jumlahBeli: 0,
    },
    {
        nama: "BAKSO",
        harga: 20000,
        gambar: "bakso.webp",
        deskripsi:
            "Bakso adalah jenis bola daging yang lazim ditemukan pada masakan Indonesia. Bakso umumnya dibuat dari campuran daging sapi giling dan tepung tapioka.",
        jumlahBeli: 0,
    },
];

const minuman = [
    {
        nama: "ES KELAPA MUDA",
        harga: 5000,
        gambar: "degan.jpg",
        deskripsi:
            "Es kelapa muda atau es degan adalah minuman segar penyejuk dahaga dan pikiran yang sedang panas yang terbuat dari daging dan air kelapa yang masih muda.",
        jumlahBeli: 0,
    },
    {
        nama: "ES BUAH",
        harga: 10000,
        gambar: "es-buah.jpg",
        deskripsi:
            "Minuman dingin dan manis ini terbuat dari buah-buahan yang dipotong dadu dicampur dengan es serut atau es batu, dan diberi pemanis dengan gula cair atau sirup.",
        jumlahBeli: 0,
    },
    {
        nama: "DAWET IRENG",
        harga: 5000,
        gambar: "dawetireng.webp",
        deskripsi:
            "Dawet Ireng adalah jenis Es Dawet yang berasal dari daerah Butuh, Purworejo, Jawa Tengah. Kata ireng dari bahasa Jawa berarti hitam.",
        jumlahBeli: 0,
    },
    {
        nama: "ES TELER",
        harga: 10000,
        gambar: "teler.jpg",
        deskripsi:
            "Es teler adalah koktail buah asli Indonesia. Es teler dibuat dengan alpukat, kelapa muda, cincau, nangka, dan buah-buahan lainnya disajikan dengan santan, susu kental manis.",
        jumlahBeli: 0,
    },
];

// Show Product Array
const showProduct = (key, target) => {
    const container = document.getElementById(target);

    key.forEach((item) => {
        // Membuat elemen HTML untuk setiap makanan
        const keyElement = document.createElement("article");

        let productCost = item.harga.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });

        let picture = "images\\" + item.gambar;

        keyElement.classList.add(
            "border-2",
            "border-gray-800",
            "w-96",
            "hover:scale-110",
            "transition",
            "duration-500",
            "shrink-0",
            "rounded-lg",
            "h-96",
            "grid",
            "grid-cols-2",
            "justify-center",
            "items-center",
            "p-5"
        );
        keyElement.innerHTML = `
            <figure class="flex justify-center items-center">
                <img src="${picture}" alt="${item.nama}" width="150" height="150" class="rounded-lg" />
            </figure>
            <div class="flex flex-col gap-3">
                <h2 class="font-bold text-3xl">${item.nama}</h2>
                <p class="text-gray-400 font-semibold">${productCost}</p>
            </div>
            <p class="col-span-2 break-normal text-justify text-gray-100">
                ${item.deskripsi}
            </p>
            


            <div class="col-span-2 grid grid-cols-7 gap-2 w-full">
                <button class="bg-blue-700 text-gray-200 py-2 active:ring-2 active:ring-gray-400 rounded-md text-md font-bold" onclick="counter('${item.nama}', -1)">-</button>
                <input class="bg-blue-700 text-gray-200 col-span-2 py-2 rounded-md text-md font-bold text-center remove-arrow" type="number" for="${item.jumlahBeli}" id="${item.nama}" value="${item.jumlahBeli}">
                <button class="bg-blue-700 text-gray-200 py-2 active:ring-2 active:ring-gray-400 rounded-md text-md font-bold" onclick="counter('${item.nama}', 1)">+</button>
                <button type="submit" onclick="buyProduct('${item.nama}')" class="bg-green-700 active:ring-2 active:ring-green-400 text-gray-200 col-span-3 py-2 px-4 rounded-md text-md font-bold">BUY NOW</button>
            </div>`;

        // Menambahkan elemen makanan ke dalam container
        container.appendChild(keyElement);
    });
};

// Counter
const counter = (target, quantity) => {
    let counter = parseInt(document.getElementById(target).value);
    counter += quantity;
    counter = Math.max(0, counter);
    document.getElementById(target).value = counter;
};

// Function Buy Product
const buyProduct = (itemName) => {
    const item = makanan
        .concat(minuman)
        .find((parameter) => parameter.nama === itemName);
    if (item) {
        const inputElement = document.getElementById(itemName);
        const quantity = parseInt(inputElement.value);
        if (quantity > 0) {
            item.jumlahBeli += quantity;
            inputElement.value = 0; // Reset input value after buying
        }
    }
    showNofif();
    showCart();
    totalCost();
    showingText();
};

// Cart Notification
const showNofif = () => {
    const item = makanan.concat(minuman).find((item) => item.jumlahBeli > 0);
    if (item) {
        document.getElementById("notif").classList.remove("hidden");
    } else {
        document.getElementById("notif").classList.add("hidden");
    }
};

// Horizontal Move
let mouseDown = false;
let startX, scrollLeft;
const slider = document.querySelectorAll("#menu-makanan, #menu-minuman");

slider.forEach((item) => {
    const startDragging = (e) => {
        mouseDown = true;
        startX = e.pageX - item.offsetLeft;
        scrollLeft = item.scrollLeft;
    };

    const stopDragging = (e) => {
        mouseDown = false;
    };

    const move = (e) => {
        e.preventDefault();
        if (!mouseDown) {
            return;
        }
        const x = e.pageX - item.offsetLeft;
        const scroll = x - startX;
        item.scrollLeft = scrollLeft - scroll;
    };

    item.addEventListener("mousemove", move, false);
    item.addEventListener("mousedown", startDragging, false);
    item.addEventListener("mouseup", stopDragging, false);
    item.addEventListener("mouseleave", stopDragging, false);
});

// Change Navbar Style in Different Section
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    const homeSection = document.getElementById("home");
    const changePoint = homeSection.offsetHeight;

    if (window.scrollY >= changePoint) {
        navbar.classList.remove("bg-transparent");
        navbar.classList.add("bg-gray-900/80");
    } else {
        navbar.classList.remove("bg-gray-900/80");
        navbar.classList.add("bg-transparent");
    }
});

// Show Modal Cart
const showModal = () => {
    var modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
};

// Close Modal Cart
const closeModal = () => {
    var modal = document.getElementById("modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
};

window.addEventListener("click", function (event) {
    var modal = document.getElementById("modal");

    if (event.target === modal) {
        closeModal();
    }
});

// Show Cart Product
const showCart = () => {
    const cart = document.getElementById("cart");
    cart.innerHTML = "";

    const list = makanan.concat(minuman);

    list.forEach((item) => {
        if (item.jumlahBeli > 0) {
            const listElement = document.createElement("article");
            listElement.classList.add(
                "grid",
                "grid-cols-6",
                "justify-between",
                "items-center",
                "border-b-[1px]",
                "border-gray-300",
                "p-1"
            );

            let totalCost = parseInt(item.harga) * parseInt(item.jumlahBeli);
            totalCost = totalCost.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            });

            listElement.innerHTML = `
              <h2 class="font-bold text-lg row-span-2 col-span-4">${item.nama}</h2>
              <div class="flex flex-col col-span-2">
                <p class="text-gray-400 font-semibold text-sm">Jumlah Beli : ${item.jumlahBeli}</p>
                <p class="text-gray-400 font-semibold text-sm">Total Harga : ${totalCost}</p>
              </div>
            `;
            cart.appendChild(listElement);
        }
    });
};

// Calculate Total Cost
const totalCost = () => {
    const button = document.getElementById("total");
    var total = 0;

    const list = makanan.concat(minuman);
    list.forEach((item) => {
        if (item.jumlahBeli > 0) {
            total = total + parseInt(item.harga) * parseInt(item.jumlahBeli);
            total = total.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            });
        }
    });

    button.innerHTML = `
        <span id="text1" class="text-gray-200 text-md font-bold">BUY NOW</span>
        <span id="text2" class="hidden text-gray-200 text-md font-bold">${total}</span>
    `;
};

// Show Total Cost Text in Buy Now Button
const showingText = () => {
    const text1 = document.getElementById("text1");
    const text2 = document.getElementById("text2");

    // Variabel untuk menentukan teks mana yang sedang ditampilkan
    let showingText1 = true;

    // Mengatur interval untuk mengubah teks secara bergantian
    setInterval(() => {
        if (showingText1) {
            // Menampilkan text1 dan menyembunyikan text2
            text1.classList.remove("hidden");
            text2.classList.add("hidden");
        } else {
            // Menampilkan text2 dan menyembunyikan text1
            text1.classList.add("hidden");
            text2.classList.remove("hidden");
        }

        // Mengubah status showingText1 untuk bergantian ke teks berikutnya
        showingText1 = !showingText1;
    }, 2000); // Mengatur interval ke 2 detik (2000 milidetik)
};

// Call Function
document.addEventListener("DOMContentLoaded", () => {
    showCart();
    showNofif();
    totalCost();
    showingText();
    showProduct(makanan, "menu-makanan");
    showProduct(minuman, "menu-minuman");
});
