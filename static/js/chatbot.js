async function make_promp() {
    const promp = document.getElementById("input").value;

    if (promp === "") { 
        Swal.fire({
            title: "Campos vacios",
            text: "Escribe algo e intenta de nuevo",
            icon: "error"
        });
        return; 
    }

    const chat_container = document.getElementById("chat-container");

    const burble_user = document.createElement("div");
    burble_user.className = "burble user";
    burble_user.innerText = promp;
    chat_container.appendChild(burble_user);

    const request = await fetch("http://localhost:3001/promp", {
        method:"post",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            "promp":promp
        })
    });

    const data = await request.json();
    console.log(data);

    if (data.status === 0) {
        Swal.fire({
            title: "Error del chatbot",
            text: "Los creditos del chatbot se han agotado intenda de nuevo mañana",
            icon: "error"
        });
        return;
    }

    const burble_bot = document.createElement("div");
    burble_bot.className = "burble bot";
    burble_bot.innerText = data.chat_response;
    chat_container.appendChild(burble_bot);
}