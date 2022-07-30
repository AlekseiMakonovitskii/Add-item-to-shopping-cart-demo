const addBtn = document.querySelector(`.addBtn`);
const nameInput = document.querySelector(`.nameInput`);
const amountInput = document.querySelector(`.amountInput`);
const items = document.querySelector(`.items`);

const cart = [];

const createItem = function () {
  cart.push({
    name: nameInput.value,
    amount: amountInput.value,
    id: Date.now(),
  });

  createLocalStorage(cart);
};

const renderItem = function (arr) {
  items.innerHTML = ``;

  arr.forEach(el => {
    const item = `<div class="item">
		<div class="itemHeader">
			<img src="./images/cart.jpg" alt="#">
		</div>
		<div class="itemBody">
			<h2>${el.name}</h2>
			<h4>$${el.amount}</h4>
		</div>
		<div class="itemFooter">
			<button class="closeBtn btn" id="${el.id}">x</button>
		</div>
	</div>`;
    items.insertAdjacentHTML(`afterbegin`, item);
    addEventListenersDelete();
  });

  nameInput.value = ``;
  amountInput.value = ``;
};

const addEventListenersDelete = function () {
  const btns = document.querySelectorAll(`.closeBtn`);
  btns.forEach(el =>
    el.addEventListener(`click`, e => {
      deleteItem(e, cart);
      renderItem(cart);
    })
  );
};

const deleteItem = function (e, arr) {
  e.preventDefault();
  const currentTargetId = e.currentTarget.id;
  const index = arr.indexOf(arr.find(el => el.id === Number(currentTargetId)));

  if (index !== -1) {
    arr.splice(index, 1);
    createLocalStorage(cart);
  }
};

const checkaddBtn = function (e) {
  e.preventDefault();
  if (nameInput.value.length > 0 && amountInput.value.length > 0) {
    createItem();
    renderItem(cart);
  }
};

const createLocalStorage = function (arr) {
  localStorage.setItem(`cart`, JSON.stringify(arr));
};

const getLocalStorage = function (arr) {
  const reloadedCart = JSON.parse(localStorage.getItem(`cart`));
  arr.push(...reloadedCart);
  renderItem(arr);
};

addBtn.addEventListener(`click`, checkaddBtn);
getLocalStorage(cart);
