// Load data dari localStorage
let belum = JSON.parse(localStorage.getItem("belum")) || [];
let selesai = JSON.parse(localStorage.getItem("selesai")) || [];

function saveData() {
    localStorage.setItem("belum", JSON.stringify(belum));
    localStorage.setItem("selesai", JSON.stringify(selesai));
}

function renderList() {
    const belumList = document.getElementById("belumList");
    const selesaiList = document.getElementById("selesaiList");

    belumList.innerHTML = "";
    selesaiList.innerHTML = "";

    // List Belum Selesai
    belum.forEach((tugas, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${tugas}
            <div>
                <button class="done-btn" onclick="selesaikan(${index})">Selesai</button>
                <button class="delete-btn" onclick="hapusBelum(${index})">Hapus</button>
            </div>
        `;
        belumList.appendChild(li);
    });

    // List Sudah Selesai
    selesai.forEach((tugas, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${tugas}
            <div>
                <button class="undo-btn" onclick="kembalikan(${index})">Undo</button>
                <button class="delete-btn" onclick="hapusSelesai(${index})">Hapus</button>
            </div>
        `;
        selesaiList.appendChild(li);
    });
}

function tambahTugas() {
    const input = document.getElementById("tugasInput");
    const tugas = input.value.trim();
    
    if (tugas === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    belum.push(tugas);
    input.value = "";
    saveData();
    renderList();
}

function selesaikan(index) {
    selesai.push(belum[index]);
    belum.splice(index, 1);
    saveData();
    renderList();
}

function kembalikan(index) {
    belum.push(selesai[index]);
    selesai.splice(index, 1);
    saveData();
    renderList();
}

function hapusBelum(index) {
    belum.splice(index, 1);
    saveData();
    renderList();
}

function hapusSelesai(index) {
    selesai.splice(index, 1);
    saveData();
    renderList();
}

// Render saat pertama kali dibuka
renderList();
