document.addEventListener("DOMContentLoaded", function() {
    // Function to create a copy button
    function createCopyButton(pre) {
        var button = document.createElement("button");
        button.classList.add("copy-button")
        button.innerHTML = '📋 Copy Code';
        button.addEventListener("click", function() {
            var code = pre.querySelector("code").innerText;
            navigator.clipboard.writeText(code).then(function() {
                button.innerText = "🥳 Copied!!";
                button.classList.add("copied");
                setTimeout(()=>{
                    button.classList.remove("copied");
                    button.innerHTML = '📋 Copy Code';
                },3000);
            }, function(err) {
                console.error("Could not copy text: ", err);
            });
        });
        return button;
    }

    // Find all pre elements containing code elements
    var pres = document.querySelectorAll("pre");

    pres.forEach(function(pre) {
        // Insert the copy button before the pre element
        var button = createCopyButton(pre);
        pre.parentNode.insertBefore(button, pre);
    });
});
