document.addEventListener("DOMContentLoaded", () => {
    const featuredContainer = document.getElementById("featured-container");
    const popup = document.getElementById("popupForm");
    const openBtn = document.getElementById("openFormBtn");
    const closeBtn = document.getElementById("closeFormBtn");
    const form = document.getElementById("createPostForm");

    // load featured posts
    async function loadFeaturedPosts() {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
        const posts = await res.json();
        // console.log(posts)

        featuredContainer.innerHTML = posts.map(post => `
            <div class=post-card>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
            `).join('');
    }

    loadFeaturedPosts()

    //open form
    openBtn.addEventListener("click", () => popup.style.display = "block");
    closeBtn.addEventListener("click", () => popup.style.display = "none");

    // submit form
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const title = document.getElementById("title").value.trim();
        const body = document.getElementById("body").value.trim();
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({title, body, userId: 1}),
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        })
        if (res.ok) {
            alert("Post created successfully");
            form.reset();
            popup.style.display = "none"
        } else {
            alert("Failed to create post...")
        }
    })
})