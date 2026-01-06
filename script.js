
// Data booking
let bookingData = {
    name: '',
    email: '',
    phone: '',
    facility: '',
    date: '',
    time: '',
    duration: 1,
    totalPrice: 0
};

// Navigation function
function goToPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('page' + pageNumber).classList.add('active');
    window.scrollTo(0, 0);

    // Update summary when going to page 9
    if (pageNumber === 9) {
        updateSummary();
    }
}

// Update Summary
function updateSummary() {
    const prices = {
        'futsal': 100000,
        'voli': 100000
    };
    bookingData.totalPrice = prices[bookingData.facility] * bookingData.duration;

    document.getElementById('summaryName').textContent = bookingData.name;
    document.getElementById('summaryEmail').textContent = bookingData.email;
    document.getElementById('summaryPhone').textContent = bookingData.phone;
    document.getElementById('summaryFacility').textContent = bookingData.facility === 'futsal' ? 'Futsal' : 'Voli';
    document.getElementById('summaryDate').textContent = new Date(bookingData.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('summaryTime').textContent = bookingData.time;
    document.getElementById('summaryDuration').textContent = bookingData.duration + ' jam';
    document.getElementById('summaryTotal').textContent = 'Rp ' + bookingData.totalPrice.toLocaleString('id-ID');
}

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Form 1: Biodata
document.getElementById('biodataForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    const phone = document.getElementById('bookingPhone').value;

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }

    // Validasi phone
    if (phone.length < 10) {
        alert('Nomor telepon minimal 10 digit!');
        return;
    }

    bookingData.name = name;
    bookingData.email = email;
    bookingData.phone = phone;

    goToPage(5);
});

// Form 2: Facility
document.getElementById('facilityForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const facility = document.getElementById('bookingFacility').value;

    if (!facility) {
        alert('Mohon pilih jenis lapangan!');
        return;
    }

    bookingData.facility = facility;
    goToPage(6);
});

// Form 3: Date & Time
document.getElementById('dateTimeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;

    if (!date || !time) {
        alert('Mohon lengkapi tanggal dan waktu!');
        return;
    }

    bookingData.date = date;
    bookingData.time = time;
    goToPage(7);
});

// Form 4: Duration
document.getElementById('durationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const duration = parseInt(document.getElementById('bookingDuration').value);

    if (duration < 1 || duration > 8) {
        alert('Durasi harus antara 1-8 jam!');
        return;
    }

    bookingData.duration = duration;
    goToPage(8);
});

// Confirm Booking
function confirmBooking() {
    // Update jadwal
    updateSchedule(bookingData.date, bookingData.time);
    goToPage(10);
}

// Update Schedule
function updateSchedule(bookingDate, bookingTime) {
    const dateObj = new Date(bookingDate);
    const dayOfWeek = dateObj.getDay();
    const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek;

    const hour = parseInt(bookingTime.split(':')[0]);
    let rowIndex = -1;

    if (hour >= 8 && hour < 10) rowIndex = 0;
    else if (hour >= 10 && hour < 12) rowIndex = 1;
    else if (hour >= 14 && hour < 16) rowIndex = 2;
    else if (hour >= 16 && hour < 18) rowIndex = 3;
    else if (hour >= 18 && hour < 20) rowIndex = 4;

    if (rowIndex >= 0 && dayIndex >= 1 && dayIndex <= 5) {
        const table = document.getElementById('scheduleTable');
        const rows = table.getElementsByTagName('tbody')[0].rows;
        const cell = rows[rowIndex].cells[dayIndex];

        cell.className = 'table-danger';
        cell.textContent = 'Booked';
    }
}

// Set minimum date
const today = new Date().toISOString().split('T')[0];
document.getElementById('bookingDate').setAttribute('min', today);
