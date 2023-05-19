function createTitle() {
    const h1 = document.createElement("h1");
    h1.innerText = "Can I haz cheezburger???";
    document.body.appendChild(h1);

}


function createMainDiv() {
    const div = document.createElement("div");
    div.setAttribute("class", "main-div")
    document.body.appendChild(div);
    return div
}

let meow = new Audio("/audio/meow.wav")
console.log(meow)
meow.play()


function newButtonFunc(div, image, score, scoreSpan) {
    const newButton = document.createElement("button")
    console.log()

    newButton.innerText = "new Cat"
    newButton.classList.add("new")

    div.appendChild(newButton)


    newButton.addEventListener("click", async () => {
        image.setAttribute("src", await getImageUrl())
        meow.play()
        scoreSpan.innerText = ` ${score}`
    }
    )




}

// let reset = () => {
//     commentsDiv.innerHTML = ""
//     score = 0;
// }


async function getImageUrl() {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json();

    localStorage.setItem("currentUrl", data[0].url)
    console.log(data)
    return data[0].url
}


async function createCatPage() {


    createTitle();

    let div = createMainDiv();

    let divIb = document.createElement("div")
    divIb.setAttribute("class", "imgB")
    div.appendChild(divIb)

    const image = document.createElement("img");



    let currentUrl = localStorage.getItem("currentUrl")
    if (currentUrl) {
        image.setAttribute("src", currentUrl)
    } else {
        image.setAttribute("src", await getImageUrl())
    }

    // image.src=data.url;

    divIb.appendChild(image)





    // create everthing for new button and what it interacts with
    const popularityText = document.createElement("p")
    popularityText.innerText = "Cheezeburger Score:"

    const scoreSpan = document.createElement("span")
    let score;

    let storedScore = localStorage.getItem("score")
    if (storedScore) {
        score = storedScore
    } else {
        score = 0
    }


    localStorage.setItem("score", score)
    scoreSpan.innerText = ` ${score}`
    popularityText.appendChild(scoreSpan)

    newButtonFunc(divIb, image, score, scoreSpan)

    //adding the upvote and down vote button to the page and functionality of buttons
    const buttonUp = document.createElement("button")
    const buttonDown = document.createElement("button")
    const buttonDiv = document.createElement("div")
    buttonDiv.className = "vote-div"
    div.appendChild(buttonDiv)
    buttonDiv.appendChild(popularityText)
    buttonUp.innerText = "yes you can";
    buttonDown.innerText = "No cheeszburges for you :(";

    buttonDiv.appendChild(buttonUp)
    buttonDiv.appendChild(buttonDown)

    let happyCat = new Audio("/audio/happyCat.wav")
    buttonUp.addEventListener("click", () => {
        happyCat.play()
        score++;
        localStorage.setItem("score", score)
        scoreSpan.innerText = ` ${score}`
    })


    let madCat = new Audio("/audio/mad.wav")
    buttonDown.addEventListener("click", () => {
        if (score > 0) {
            madCat.play()
            score--;
            localStorage.setItem("score", score)
            scoreSpan.innerText = ` ${score}`

        }
    })



    // adding comment area
    // p  input button div        div.comments

    const commentP = document.createElement("p")
    // <textarea  rows="4" cols="50">
    const commentInput = document.createElement("textarea")
    const commentSubmit = document.createElement("button")
    const commentDiv = document.createElement("div")
    const commentsDiv = document.createElement("div")

    commentP.innerText = "Comment:"
    commentInput.setAttribute("rows", "4")
    commentInput.setAttribute("cols", "40")
    commentInput.setAttribute("placeholder", "add a comment...")
    commentSubmit.innerText = "Submit"

    commentDiv.setAttribute("class", "comment-div")
    commentsDiv.setAttribute("class", "comments-div")
    commentDiv.appendChild(commentP)
    commentDiv.appendChild(commentInput)
    commentDiv.appendChild(commentSubmit)
    div.appendChild(commentDiv)
    div.appendChild(commentsDiv)

    // check comments exist
    // if so, grab commetns array json, parse it
    // itterate and make lis and add


    // if not just make comments div    may not need an else


    const ul = document.createElement("ul")
    commentsDiv.appendChild(ul)

    if (localStorage.getItem("comments")) {
        let arrayString = localStorage.getItem("comments")
        console.log(arrayString)
        let commentsArray = JSON.parse(arrayString);
        console.log(Array.isArray(commentsArray))

        commentsArray.forEach(comment => {
            let newComment = document.createElement("li")


            newComment.innerText = comment
            ul.appendChild(newComment)



        })
    }
    commentSubmit.addEventListener("click", async (e) => {
        e.preventDefault()
        let commentValue = commentInput.value

        if (localStorage.getItem("comments")) {
            let arrayString = localStorage.getItem("comments")
            let commentsArray = await JSON.parse(arrayString);
            commentsArray.push(commentValue)
            let stringedCommentArray = JSON.stringify(commentsArray)

            localStorage.setItem("comments", stringedCommentArray)

        } else {


            let newCommentsArr = [commentValue]

            let stringedCommentsArr = JSON.stringify(newCommentsArr)

            localStorage.setItem("comments", stringedCommentsArr)

        }



        let newComment = document.createElement("li")


        newComment.innerText = commentValue




        ul.appendChild(newComment)
        commentInput.value = ""
    })







    // EXTRA STUFF
    let myspace = document.createElement("p")
    let linkMySpace = document.createElement("a")
    // myspace.innerHTML(linkMySpace)
    // myspace.innerText = "check out my page "

    linkMySpace.innerText = "Checkout my MySpace!!! >.<"
    linkMySpace.setAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1s")
    linkMySpace.setAttribute("target", "_blank")
    myspace.classList.add("mySpace")
    let openRick = () => {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
    }

    linkMySpace.addEventListener("click", () => {
        setTimeout(openRick, 20000)


    })

    myspace.appendChild(linkMySpace)
    commentsDiv.appendChild(myspace)
}








window.onload = () => {
    createCatPage();
    meow()
};
