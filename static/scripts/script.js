const modal = document.querySelector(".modal-container");
const cardContainer = document.querySelector(".catalog-card-block");
const sName = document.getElementById("m-name");
const sDesc = document.querySelector("#m-desc");
const sPrice = document.querySelector("#m-price");
const sFile = document.querySelector("#m-img");
const saveBtn = document.querySelector("#saveChanges");

let items, id;

const getItemsBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItemsBD = () => localStorage.setItem("dbfunc", JSON.stringify(items));

loadItems();

function loadItems() {
    items = getItemsBD();
    cardContainer.innerHTML = '';  // Limpar conteúdo anterior
    items.forEach((item, index) => {
        insertItem(item, index);
    });
}

function insertItem(item, index) {
    let card = document.createElement("div");

    card.innerHTML = `
    <div class="card-item">
        <img src="${item.file}" alt="" class="card-img">
        <div class="card-content">
            <h3>${item.name} - R$ ${item.price}</h3>
            <p>${item.desc}</p>
            <div class="actions">
                <button class="cart-btn">
                    <img src="sources/icons/shopping-cart.svg" alt="">
                </button>
                <button class="bookmark-btn">
                    <img src="sources/icons/bookmark.svg" alt="">
                </button>
                <button class="edit-btn" onclick="editItem(${index})">
                    <img src="sources/icons/edit.svg" alt="">
                </button>
                <button class="delete-btn" onclick="deleteItem(${index})">
                    <img src="sources/icons/delete.svg" alt="">
                </button>
            </div>
        </div>
    </div>
    `;

    cardContainer.appendChild(card);
}

function editItem(index) {
    openModal(true, index);
}

function deleteItem(index) {
    items.splice(index, 1);
    setItemsBD();
    loadItems();  // Recarregar a lista de itens após deletar
}

function openModal(edit = false, index = 0) {
    modal.classList.add("active");

    modal.onclick = e => {
        if (e.target.classList.contains("modal-container")) {
            modal.classList.remove("active");
        }
    }

    if (edit) {
        sName.value = items[index].name;
        sDesc.value = items[index].desc;
        sPrice.value = items[index].price;
        sFile.value = items[index].file;
        id = index;
    } else {
        sName.value = "";
        sDesc.value = "";
        sPrice.value = "";
        sFile.value = "";
    }
}

saveBtn.onclick = e => {
    e.preventDefault();

    if (sName.value === '' || sPrice.value === '' || sFile.value === '' || sDesc.value === '') {
        return;
    }

    if (id !== undefined) {
        items[id].name = sName.value;
        items[id].desc = sDesc.value;
        items[id].price = sPrice.value;
        items[id].file = sFile.value;
    } else {
        items.push({'name': sName.value, 'desc': sDesc.value, 'price': sPrice.value, 'file': sFile.value});
    }

    setItemsBD();

    modal.classList.remove('active');
    loadItems();
    id = undefined;
}
