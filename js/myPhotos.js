const user = JSON.parse(localStorage.getItem("user"));

if(!user) {
	redirectToLogin();
}

document.querySelector(
  "#name"
).innerHTML = `${user.firstname} ${user.lastname}`;

document.getElementById('logout-btn').addEventListener('click', redirectToLogin)

function redirectToLogin() {
	localStorage.removeItem('user');
	window.location.href = '../index.html';
}
const gallery = document.getElementById('image-gallery')
axios
.get(`http://localhost:4000/photos?userId=${user.id}`)
.then((res)=>{
	const images = res.data
	console.log(images);
	images.map((image)=>{
		gallery.innerHTML +=`
		 <div class="card">
			<img src="${image.url}" alt="">
			<div class="actions">

				<button class="like">❤️</button>
				<button class="delete" onclick="deletePhoto(${image.id})">
					🗑️
				</button>
			</div>
		</div>
		`
	})
})

function deletePhoto(id) {
	axios
	  .delete(`http://localhost:4000/photos/${id}`)
	  .then((res) => {
		document.getElementById(`${id}`).remove();
		console.log(res);
	  })
	  .catch((err) => {
		console.log(err);
	  });
}