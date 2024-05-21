document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const current_password = document.getElementById('currentPassword').value
        const new_password = document.getElementById('newPassword').value
        // console.log(current_password,confirm_password,new_password);
        const response = await fetch('/user/change-password', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                current_password: current_password,
                new_password: new_password
            })
        })

        const dataUbahPassword = await response.json()
        console.log(dataUbahPassword);
        if (dataUbahPassword.success) {

            // Informasi login sukses
            Swal.fire({
                title: dataUbahPassword.message,
                timer: 1500,
                icon: "success"
                    });
                    // window.location.href='/ubahpassword'
            // Fetch data setelah login sukses
            
        } else {
            // Informasi login gagal
            Swal.fire({
                title: dataUbahPassword.message,
                timer: 1500,
                icon: "error"
            });
        }
    })
})