document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loaded")

    const links = document.querySelectorAll("a")

    links.forEach(link => {

        if(link.hostname === window.location.hostname){

            link.addEventListener("click", function(e){

                e.preventDefault()

                const url = this.href

                document.body.classList.remove("loaded")

                setTimeout(() => {
                    window.location.href = url
                }, 400)

            })

        }

    })

})