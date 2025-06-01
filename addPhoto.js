document.getElementById("add-photo-btn").addEventListener("click", () => {
    axios
      .post("http://localhost:4000/photos", {
        url: document.getElementById("url").value,
        userId: JSON.parse(localStorage.getItem("user")).id,
      })
      .then((response) => {
        alert('Surat muvaffaqiyat ila joylashtirildi');
        window.location.href = `./myPhotos.html`
      })
      .catch((error) => {
        console.log(error);
      });
})
